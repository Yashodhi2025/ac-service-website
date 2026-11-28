"use client";

import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { activeServices } from "@/data/services";
import { colomboToday, createBookingSchema } from "@/lib/forms";
import type { BookingValues } from "@/lib/forms";
import { getWhatsAppUrl } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useLanguage } from "@/i18n/language-provider";
import { buildBookingWhatsAppMessage } from "@/i18n/whatsapp";
import ui from "@/components/ui/site-ui.module.css";
import css from "./form.module.css";

const stepFields: FieldPath<BookingValues>[][] = [
  ["service"],
  ["acType", "brand", "units", "issue"],
  ["name", "phone", "location"],
  ["date"],
  ["acknowledgement"],
];

const acTypeValues = ["Wall-mounted split", "Cassette", "Ducted", "Other / not sure"] as const;

export function BookingForm({ initialService = "" }: { initialService?: string }) {
  const { messages } = useLanguage();
  const [step, setStep] = useState(0);
  const [draftMessage, setDraftMessage] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  const schema = useMemo(() => createBookingSchema(messages.validation), [messages.validation]);
  const resolver = useMemo(() => zodResolver(schema), [schema]);

  const {
    register,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver,
    defaultValues: {
      service: activeServices.some((s) => s.slug === initialService) ? initialService : "",
      acType: undefined,
      brand: "",
      units: 1,
      issue: "",
      name: "",
      phone: "",
      location: "",
      date: "",
      acknowledgement: false,
    },
  });

  function changeStep(nextStep: number) {
    setStep(nextStep);
    setDraftMessage(null);
    requestAnimationFrame(() => heading.current?.focus());
  }

  async function next() {
    if (await trigger(stepFields[step], { shouldFocus: true })) changeStep(step + 1);
  }

  function submit(data: BookingValues) {
    // Always draft automatic WhatsApp booking message in natural Sinhala-English.
    const message = buildBookingWhatsAppMessage({
      serviceSlug: data.service,
      acType: data.acType,
      brand: data.brand,
      units: data.units,
      issue: data.issue,
      name: data.name,
      phone: data.phone,
      location: data.location,
      date: data.date,
    });
    setDraftMessage(message);
  }

  const values = getValues();
  const labels = messages.bookingForm.reviewLabels;
  const error = (field: keyof BookingValues) =>
    errors[field] ? (
      <p className={css.error} id={`booking-${field}-error`}>
        {errors[field]?.message}
      </p>
    ) : null;
  const inputProps = (field: keyof BookingValues) => ({
    "aria-required": field !== "brand",
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `booking-${field}-error` : undefined,
  });

  const getLocalizedServiceName = (slug: string) => {
    const found = activeServices.find((s) => s.slug === slug);
    if (!found) return slug;
    return messages.servicesCatalogue[found.id]?.name ?? found.name;
  };

  return (
    <form
      className={css.form}
      noValidate
      onSubmit={
        step === 4
          ? handleSubmit(submit)
          : (event) => {
              event.preventDefault();
              void next();
            }
      }
      onChange={(event) => {
        if ((event.target as HTMLElement).id !== "booking-draft-editor") {
          setDraftMessage(null);
        }
      }}
    >
      <ol className={css.steps} aria-label={messages.bookingForm.progressAria}>
        {messages.bookingForm.steps.map((label, index) => (
          <li key={index} aria-current={step === index ? "step" : undefined}>
            <span>{index < step ? <Check size={14} aria-hidden="true" /> : index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <h2 ref={heading} tabIndex={-1}>
        {messages.bookingForm.stepHeadings[step]}
      </h2>

      {step === 0 && (
        <div className={css.field}>
          <label htmlFor="booking-service">{messages.bookingForm.selectServiceLabel}</label>
          <select id="booking-service" {...register("service")} {...inputProps("service")}>
            <option value="">{messages.bookingForm.chooseServicePlaceholder}</option>
            {activeServices.map((s) => (
              <option key={s.slug} value={s.slug}>
                {messages.servicesCatalogue[s.id]?.name ?? s.name}
              </option>
            ))}
          </select>
          {error("service")}
          <p className={css.hint}>{messages.bookingForm.serviceHint}</p>
        </div>
      )}

      {step === 1 && (
        <div className={css.fields}>
          <div className={css.row}>
            <div className={css.field}>
              <label htmlFor="booking-acType">{messages.bookingForm.acTypeLabel}</label>
              <select id="booking-acType" {...register("acType")} {...inputProps("acType")}>
                <option value="">{messages.bookingForm.chooseTypePlaceholder}</option>
                {acTypeValues.map((type) => (
                  <option key={type} value={type}>
                    {messages.bookingForm.acTypes[type] ?? type}
                  </option>
                ))}
              </select>
              {error("acType")}
            </div>
            <div className={css.field}>
              <label htmlFor="booking-units">{messages.bookingForm.unitsLabel}</label>
              <input
                id="booking-units"
                type="number"
                inputMode="numeric"
                min={1}
                max={50}
                {...register("units", { valueAsNumber: true })}
                {...inputProps("units")}
              />
              {error("units")}
            </div>
          </div>
          <div className={css.field}>
            <label htmlFor="booking-brand">{messages.bookingForm.brandLabel}</label>
            <input id="booking-brand" {...register("brand")} {...inputProps("brand")} />
            {error("brand")}
          </div>
          <div className={css.field}>
            <label htmlFor="booking-issue">{messages.bookingForm.issueLabel}</label>
            <textarea id="booking-issue" {...register("issue")} {...inputProps("issue")} />
            {error("issue")}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={css.fields}>
          <div className={css.row}>
            <div className={css.field}>
              <label htmlFor="booking-name">{messages.bookingForm.nameLabel}</label>
              <input id="booking-name" autoComplete="name" {...register("name")} {...inputProps("name")} />
              {error("name")}
            </div>
            <div className={css.field}>
              <label htmlFor="booking-phone">{messages.bookingForm.phoneLabel}</label>
              <input id="booking-phone" type="tel" autoComplete="tel" {...register("phone")} {...inputProps("phone")} />
              {error("phone")}
            </div>
          </div>
          <div className={css.field}>
            <label htmlFor="booking-location">{messages.bookingForm.locationLabel}</label>
            <textarea
              id="booking-location"
              autoComplete="street-address"
              {...register("location")}
              {...inputProps("location")}
            />
            {error("location")}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={css.field}>
          <label htmlFor="booking-date">{messages.bookingForm.dateLabel}</label>
          <input id="booking-date" type="date" min={colomboToday()} {...register("date")} {...inputProps("date")} />
          {error("date")}
          <p className={css.hint}>{messages.bookingForm.dateHint}</p>
        </div>
      )}

      {step === 4 && (
        <div>
          <dl className={css.review}>
            {(Object.keys(labels) as (keyof typeof labels)[]).map((key) => {
              let displayValue = String(values[key] || messages.common.notProvided);
              if (key === "service") displayValue = getLocalizedServiceName(values.service);
              if (key === "acType") displayValue = messages.bookingForm.acTypes[values.acType] ?? values.acType;
              return (
                <div key={key}>
                  <dt>{labels[key]}</dt>
                  <dd>{displayValue}</dd>
                </div>
              );
            })}
          </dl>
          <label className={css.check}>
            <input type="checkbox" {...register("acknowledgement")} {...inputProps("acknowledgement")} />
            <span>{messages.bookingForm.acknowledgementText}</span>
          </label>
          {error("acknowledgement")}
        </div>
      )}

      <div className={css.actions}>
        {step > 0 && (
          <button type="button" className={ui.outlineButton} onClick={() => changeStep(step - 1)}>
            {messages.bookingForm.backButton}
          </button>
        )}
        {step < 4 ? (
          <button type="button" className={ui.button} onClick={next}>
            {messages.bookingForm.continueButton}
          </button>
        ) : (
          <button type="submit" className={ui.button}>
            {messages.bookingForm.prepareButton}
          </button>
        )}
      </div>

      {draftMessage !== null && (
        <div className={css.prepared} role="status">
          <h3>{messages.bookingForm.preparedTitle}</h3>
          <p>{messages.bookingForm.preparedBody}</p>
          <div className={css.draftField}>
            <label htmlFor="booking-draft-editor">{messages.bookingForm.editMessageLabel}</label>
            <textarea
              id="booking-draft-editor"
              className={css.draftEditor}
              value={draftMessage}
              onChange={(event) => setDraftMessage(event.target.value)}
            />
            <span className={css.hint}>{messages.bookingForm.editMessageHint}</span>
          </div>
          <a
            className={`${ui.button} mt-5`}
            href={getWhatsAppUrl(draftMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon width={21} height={21} />
            {messages.bookingForm.openWhatsAppButton}
          </a>
        </div>
      )}
    </form>
  );
}
