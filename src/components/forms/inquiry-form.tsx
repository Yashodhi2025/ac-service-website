"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInquirySchema } from "@/lib/forms";
import type { InquiryValues } from "@/lib/forms";
import { activeServices } from "@/data/services";
import { getWhatsAppUrl } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useLanguage } from "@/i18n/language-provider";
import { buildInquiryWhatsAppMessage } from "@/i18n/whatsapp";
import ui from "@/components/ui/site-ui.module.css";
import css from "./form.module.css";

export function InquiryForm() {
  const { messages } = useLanguage();
  const [draftMessage, setDraftMessage] = useState<string | null>(null);

  const schema = useMemo(() => createInquirySchema(messages.validation), [messages.validation]);
  const resolver = useMemo(() => zodResolver(schema), [schema]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryValues>({
    resolver,
    defaultValues: { name: "", phone: "", service: "", message: "" },
  });

  function submit(data: InquiryValues) {
    // Always generate automatic WhatsApp inquiry in natural Sinhala-English.
    const message = buildInquiryWhatsAppMessage({
      name: data.name,
      phone: data.phone,
      serviceSlug: data.service,
      message: data.message,
    });
    setDraftMessage(message);
  }

  return (
    <form
      className={css.form}
      noValidate
      onSubmit={handleSubmit(submit)}
      onChange={(event) => {
        if ((event.target as HTMLElement).id !== "inquiry-draft-editor") {
          setDraftMessage(null);
        }
      }}
    >
      <h2>{messages.inquiryForm.title}</h2>
      <p className={`${css.hint} mb-5`}>{messages.inquiryForm.requiredHint}</p>
      <div className={css.fields}>
        <div className={css.row}>
          <div className={css.field}>
            <label htmlFor="inquiry-name">{messages.inquiryForm.nameLabel}</label>
            <input
              id="inquiry-name"
              required
              autoComplete="name"
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "inquiry-name-error" : undefined}
            />
            {errors.name && (
              <p className={css.error} id="inquiry-name-error">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className={css.field}>
            <label htmlFor="inquiry-phone">{messages.inquiryForm.phoneLabel}</label>
            <input
              id="inquiry-phone"
              required
              type="tel"
              autoComplete="tel"
              {...register("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "inquiry-phone-error" : undefined}
            />
            {errors.phone && (
              <p className={css.error} id="inquiry-phone-error">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
        <div className={css.field}>
          <label htmlFor="inquiry-service">{messages.inquiryForm.serviceLabel}</label>
          <select id="inquiry-service" {...register("service")}>
            <option value="">{messages.inquiryForm.generalInquiryOption}</option>
            {activeServices.map((s) => (
              <option key={s.slug} value={s.slug}>
                {messages.servicesCatalogue[s.id]?.name ?? s.name}
              </option>
            ))}
          </select>
        </div>
        <div className={css.field}>
          <label htmlFor="inquiry-message">{messages.inquiryForm.messageLabel}</label>
          <textarea
            id="inquiry-message"
            required
            {...register("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "inquiry-message-error" : undefined}
          />
          {errors.message && (
            <p className={css.error} id="inquiry-message-error">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>
      <p className={`${css.hint} mt-5`}>{messages.inquiryForm.draftHint}</p>
      <div className={css.actions}>
        <button type="submit" className={ui.button}>
          {messages.inquiryForm.prepareButton}
        </button>
      </div>
      {draftMessage !== null && (
        <div className={css.prepared} role="status">
          <h3>{messages.inquiryForm.preparedTitle}</h3>
          <p>{messages.inquiryForm.preparedBody}</p>
          <div className={css.draftField}>
            <label htmlFor="inquiry-draft-editor">{messages.inquiryForm.editMessageLabel}</label>
            <textarea
              id="inquiry-draft-editor"
              className={css.draftEditor}
              value={draftMessage}
              onChange={(event) => setDraftMessage(event.target.value)}
            />
            <span className={css.hint}>{messages.inquiryForm.editMessageHint}</span>
          </div>
          <a
            className={`${ui.button} mt-5`}
            href={getWhatsAppUrl(draftMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width={21} height={21} />
            {messages.inquiryForm.openWhatsAppButton}
          </a>
        </div>
      )}
    </form>
  );
}
