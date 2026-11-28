import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
const sharp=createRequire(process.cwd()+"/package.json")("sharp");
const output="docs/qa/cooling";
await mkdir(output,{recursive:true});
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--remote-debugging-port=0", "--no-first-run", "--disable-background-networking", "--user-data-dir=" + path.join(tmpdir(), "ac-header-browser-qa"), "about:blank"], { windowsHide: true, stdio: ["ignore", "ignore", "pipe"] });
let socket;
try {
  const endpoint = await new Promise((resolve, reject) => {
    let log = "";
    const timer = setTimeout(() => reject(Error("Browser timeout: " + log)), 10000);
    chrome.stderr.on("data", data => {
      log += data;
      const match = log.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
    chrome.on("error", reject);
  });
  socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let counter = 0;
  const pending = new Map(), exceptions = [];
  socket.onmessage = event => {
    const msg = JSON.parse(event.data);
    if (msg.method === "Runtime.exceptionThrown") exceptions.push(msg.params.exceptionDetails);
    if (!msg.id) return;
    const promise = pending.get(msg.id);
    if (!promise) return;
    pending.delete(msg.id);
    if (msg.error) promise.reject(Error(JSON.stringify(msg.error)));
    else promise.resolve(msg.result);
  };
  function send(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      const id = ++counter;
      const timer = setTimeout(() => reject(Error("CDP timeout " + method)), 10000);
      pending.set(id, {resolve: value => {clearTimeout(timer); resolve(value);}, reject: error => {clearTimeout(timer); reject(error);}});
      socket.send(JSON.stringify({id, method, params, ...(sessionId ? {sessionId} : {})}));
    });
  }
  const { targetId } = await send("Target.createTarget", {url:"about:blank"});
  const { sessionId } = await send("Target.attachToTarget", {targetId, flatten:true});
  const call = (method, params) => send(method, params, sessionId);
  await call("Runtime.enable");
  await call("Page.enable");
  async function evaluate(expression) {
    const result = await call("Runtime.evaluate", {expression, awaitPromise:true, returnByValue:true});
    if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  }
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function until(expression) {
    for (let i=0; i<50; i++) { if (await evaluate(expression)) return; await pause(100); }
    throw Error("Condition failed: " + expression);
  }
  async function viewport(width, height=900) {
    await call("Emulation.setDeviceMetricsOverride", {width,height,deviceScaleFactor:1,mobile:width<768});
    await pause(100);
  }
  const origin=process.env.VAPOR_QA_URL || "http://localhost:3100";
  const report={scenes:[],layouts:[],checks:[]};
  const field=type=>'[data-vapor-field="'+type+'"]';
  async function canvas(selector){return Buffer.from((await evaluate('document.querySelector('+JSON.stringify(selector+" canvas")+').toDataURL("image/png")')).split(",")[1],"base64");}
  async function diff(first,second){
    const a=await sharp(first).flatten({background:"#091b30"}).removeAlpha().raw().toBuffer();
    const b=await sharp(second).flatten({background:"#091b30"}).removeAlpha().raw().toBuffer();
    let sum=0,changed=0;
    for(let i=0;i<a.length;i+=3){const delta=Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2]);sum+=delta;if(delta>6)changed++;}
    return {meanChannelChange:+(sum/a.length).toFixed(2),changedPercent:+(changed/(a.length/3)*100).toFixed(1)};
  }
  async function pageShot(name){
    const shot=await call("Page.captureScreenshot",{format:"png"});
    await sharp(Buffer.from(shot.data,"base64")).webp({quality:86}).toFile(output+"/"+name+".webp");
  }
  async function record(selector){
    return evaluate('(async function(){const c=document.querySelector('+JSON.stringify(selector+" canvas")+'),g=c.getContext("webgl"),draw=g.drawArrays.bind(g),savedWidth=c.width,savedHeight=c.height;if(c.height>320){c.width=Math.round(c.width*320/c.height);c.height=320;}g.drawArrays=(...args)=>{g.clearColor(9/255,27/255,48/255,1);g.clear(g.COLOR_BUFFER_BIT);g.enable(g.BLEND);g.blendFuncSeparate(g.SRC_ALPHA,g.ONE_MINUS_SRC_ALPHA,g.ONE,g.ONE_MINUS_SRC_ALPHA);draw(...args);g.disable(g.BLEND)};await new Promise(r=>setTimeout(r,100));return new Promise(resolve=>{const stream=c.captureStream(30),chunks=[];const mime=MediaRecorder.isTypeSupported("video/webm;codecs=vp8")?"video/webm;codecs=vp8":"video/webm";const recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:600000});recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};recorder.onstop=()=>{g.drawArrays=draw;g.disable(g.BLEND);c.width=savedWidth;c.height=savedHeight;stream.getTracks().forEach(t=>t.stop());const reader=new FileReader();reader.onloadend=()=>resolve(reader.result);reader.readAsDataURL(new Blob(chunks,{type:mime}));};recorder.start();setTimeout(()=>recorder.stop(),6400);});})()');
  }
  async function scene(name,selector,width,block="center"){
    await viewport(width,900);
    await evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:'+JSON.stringify(block)+'})');
    await until('document.querySelector('+JSON.stringify(selector)+')?.dataset.vaporState==="running" && !!document.querySelector('+JSON.stringify(selector+" canvas")+')');
    await pause(1000);
    const kind=await evaluate('document.querySelector('+JSON.stringify(selector+" canvas")+').dataset.renderer');
    if(kind!=="webgl")throw Error("Expected actual GPU renderer in browser, got "+kind);

    let previous;
    const changes=[],frames=[];
    const start=Date.now();
    for(let i=0;i<4;i++){
      if(i)await pause(Math.max(0,i*2000-(Date.now()-start)));
      const snapshot=await canvas(selector);
      const filename=name+"-"+i+".webp";
      await sharp(snapshot).flatten({background:"#091b30"}).webp({quality:90}).toFile(output+"/"+filename);
      frames.push({file:filename,seconds:+((Date.now()-start)/1000).toFixed(2)});
      if(previous)changes.push(await diff(previous,snapshot));
      previous=snapshot;
      if(i===0||i===3)await pageShot(name+"-page-"+i);
    }
    const video=await record(selector);
    await writeFile(output+"/"+name+".webm",Buffer.from(video.split(",")[1],"base64"));
    if(changes.some(x=>x.changedPercent<3))throw Error("Insufficient visible change in "+name+": "+JSON.stringify(changes));
    const result={name,width,renderer:kind,frames,changes,video:name+".webm"};
    report.scenes.push(result);console.log("6-second scene",JSON.stringify(result));
  }
  await viewport(1366,900);
  await call("Page.navigate",{url:origin});
  await until('document.readyState==="complete" && document.querySelector("[data-vapor-field=hero]")?.dataset.vaporState==="running"');
  if(await evaluate('document.querySelectorAll("[data-airflow-stream], [data-freezing-airflow], [data-cooling-layer]").length'))throw Error("Legacy effects overlap");
  if(await evaluate('document.querySelectorAll("main>section").length')!==9)throw Error("Homepage section count changed");
  if(!await evaluate('document.querySelector("[data-hero-visual] img").src.includes("ac-unit") && document.querySelector("[data-hero-visual]").textContent.includes("22")'))throw Error("Hero assets or indicator changed");
  await scene("hero-desktop",field("hero"),1366,"start");
  await scene("section-desktop","#ac-problem-finder "+field("section"),1366);
  await scene("cta-desktop",'section[aria-label="Get in touch"] '+field("transition"),1366);
  await scene("footer-desktop","footer "+field("footer"),1366,"end");
  await scene("hero-mobile",field("hero"),390);
  await scene("footer-mobile","footer "+field("footer"),390,"end");
  for(const width of [320,390,768,1024,1366,1920]){
    await viewport(width,900);
    for(const selector of ["main","#ac-problem-finder","footer"]){
      await evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:"start"})');
      await pause(100);
      if(await evaluate('document.documentElement.scrollWidth')>width)throw Error("Overflow "+width+" "+selector);
    }
    if(width>=1024&&await evaluate('document.querySelector("main>section").getBoundingClientRect().height')!==580)throw Error("Hero height changed");
    report.layouts.push(width);
  }
  await viewport(1366,900);
  await evaluate('window.scrollTo(0,0)');
  await until('document.querySelector("[data-vapor-field=hero]").dataset.vaporState==="running"');
  const selector=field("hero");
  async function framesPerSecond(width){
    await viewport(width,900);
    await evaluate('document.querySelector("[data-hero-visual]").scrollIntoView({block:"center"})');
    await pause(200);
    const value=await evaluate('(async()=>{const c=document.querySelector("[data-vapor-canvas=hero]"),g=c.getContext("webgl"),original=g.drawArrays.bind(g);let frames=0;g.drawArrays=(...args)=>{frames++;return original(...args)};const start=performance.now();await new Promise(r=>setTimeout(r,2000));g.drawArrays=original;return {fps:frames/((performance.now()-start)/1000),bufferWidth:c.width,bufferHeight:c.height}})()');
    if(value.fps<15||value.fps>(width<768?26:32))throw Error("Frame cap or rendering failure: "+JSON.stringify(value));
    report.checks.push({width,...value});console.log("Measured render cadence",JSON.stringify({width,...value}));
  }
  await framesPerSecond(1366);await framesPerSecond(390);
  await viewport(1366,900);
  await evaluate('document.querySelector("footer").scrollIntoView({block:"end"})');
  await until('document.querySelector("[data-vapor-field=hero]").dataset.vaporState==="paused"');
  const frozen=await canvas(selector);await pause(450);
  if(!frozen.equals(await canvas(selector)))throw Error("Offscreen canvas changed");
  await evaluate('Object.defineProperty(document,"hidden",{configurable:true,get:()=>true});document.dispatchEvent(new Event("visibilitychange"))');
  await until('[...document.querySelectorAll("[data-vapor-field]")].every(x=>x.dataset.vaporState==="paused")');
  const hidden=await canvas("footer "+field("footer"));await pause(400);
  if(!hidden.equals(await canvas("footer "+field("footer"))))throw Error("Hidden canvas changed");
  await evaluate('delete document.hidden;document.dispatchEvent(new Event("visibilitychange"))');
  await until('document.querySelector("footer [data-vapor-field]").dataset.vaporState==="running"');
  await call("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"reduce"}]});
  await until('[...document.querySelectorAll("[data-vapor-field]")].every(x=>x.dataset.vaporState==="static")');
  const reduced=await canvas("footer "+field("footer"));await pause(400);
  if(!reduced.equals(await canvas("footer "+field("footer"))))throw Error("Reduced motion changed");
  await call("Emulation.setEmulatedMedia",{features:[]});
  await until('document.querySelector("footer [data-vapor-field]").dataset.vaporState==="running"');
  await call("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"reduce"}]});
  await call("Page.navigate",{url:origin+"/services"});
  await until('document.readyState==="complete" && document.querySelector("main [data-vapor-field]")?.dataset.vaporState==="static"');
  await viewport(390,900);
  if(await evaluate('document.documentElement.scrollWidth')>390)throw Error("Service page mobile overflow");
  await call("Emulation.setEmulatedMedia",{features:[]});
  await call("Page.navigate",{url:origin});
  await until('document.querySelector("[data-vapor-field=hero]")?.dataset.vaporState==="running"');
  await viewport(1366,900);await evaluate('window.scrollTo(0,0)');
  await until('!!document.querySelector("[data-vapor-canvas=hero]")');
  await evaluate('window.loss=document.querySelector("[data-vapor-canvas=hero]").getContext("webgl").getExtension("WEBGL_lose_context");window.loss.loseContext()');
  await until('document.querySelector("[data-vapor-field=hero]").dataset.vaporState==="context-lost"');
  await pause(150);
  await evaluate('window.loss.restoreContext()');
  await until('document.querySelector("[data-vapor-field=hero]").dataset.vaporState==="running"');
  await pause(200);if(await evaluate('document.querySelector("[data-vapor-canvas=hero]").getContext("webgl").getError()')!==0)throw Error("Context restoration GL error");report.checks.push("Offscreen pause, tab pause/resume, reduced-motion and context restoration pass");
  await evaluate('document.querySelector("#ac-problem-finder").scrollIntoView({block:"center"})');
  await pause(300);
  await evaluate('[...document.querySelectorAll("#ac-problem-finder label")].find(x=>x.textContent.includes("Water Leaking")).click()');
  await pause(250);
  if(!await evaluate('document.querySelector("#ac-problem-finder a[target=_blank]").href.includes("Water%20Leaking")'))throw Error("Problem finder booking changed");
  if(!await evaluate('[...document.querySelectorAll("[data-vapor-field]")].every(x=>x.getAttribute("aria-hidden")==="true"&&getComputedStyle(x).pointerEvents==="none")'))throw Error("Decorations intercept input");
  report.checks.push("Problem selection, WhatsApp draft, original A/C/indicator and nine sections preserved");
  await call("Page.addScriptToEvaluateOnNewDocument",{source:'const native=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type.includes("webgl")?null:native.call(this,type,...args)};'});
  await call("Page.navigate",{url:origin});
  await until('document.querySelector("[data-vapor-canvas=hero]")?.dataset.renderer==="canvas2d"');
  await pause(1200);
  const fallback=await canvas(selector);await pause(1500);
  const fallbackDiff=await diff(fallback,await canvas(selector));
  if(fallbackDiff.changedPercent<3)throw Error("Fallback does not visibly animate");
  report.checks.push({fallback:fallbackDiff});
  await pageShot("fallback-desktop");
  if(exceptions.length)throw Error("Browser exceptions: "+JSON.stringify(exceptions));
  await writeFile(output+"/report.json",JSON.stringify(report,null,2));
  const html='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>ECME cooling motion review</title><style>body{background:#091b30;color:#eaf8fc;font:16px/1.6 system-ui;max-width:1200px;margin:32px auto;padding:0 20px}h1,h2{line-height:1.2}section{margin:48px 0;border-top:1px solid #123b5d;padding-top:24px}video{display:block;width:min(700px,100%);max-height:400px;background:#091b30}img{width:100%;height:auto}article{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}small{color:#90d9ed}a{color:#00c7e8}@media(max-width:600px){article{grid-template-columns:1fr}}</style><h1>ECME cooling motion review</h1><p>Actual browser captures over six seconds, with no simulated animation in this review. The video records the vapor Canvas; page frames show its placement behind the existing content.</p><p><a href="report.json">Frame differences, rendering cadence and checks</a></p>'+report.scenes.map(s=>'<section><h2>'+s.name+'</h2><small>'+s.width+'px viewport · '+s.changes.map(x=>x.changedPercent+'% of Canvas pixels visibly changed').join(' / ')+'</small><video controls loop muted playsinline src="'+s.video+'"></video><article><figure><img src="'+s.name+'-page-0.webp"><figcaption>Start of capture</figcaption></figure><figure><img src="'+s.name+'-page-3.webp"><figcaption>After six seconds</figcaption></figure></article></section>').join('')+'</html>';
  await writeFile(output+"/index.html",html);
  console.log("ALL CHECKS PASS. Review: "+output+"/index.html");
  await send("Browser.close");
}finally{socket?.close();chrome.kill();}
