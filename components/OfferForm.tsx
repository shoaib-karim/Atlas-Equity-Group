"use client";

import { useId, useRef, useState } from "react";
import PlatFrame from "./PlatFrame";
import {
  STEP_FIELDS,
  STEP_LABELS,
  US_STATES,
  emptyOfferForm,
  errorMessages,
  validateOfferForm,
  validateStep,
  type OfferFormErrors,
  type OfferFormValues,
  type OfferSource,
} from "@/lib/validate";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "min-h-[52px] w-full rounded-input border bg-paper-raised px-4 text-base text-ink outline-none focus:border-field-green";

const LAST_STEP = STEP_FIELDS.length - 1;

export default function OfferForm({ source }: { source: OfferSource }) {
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeadingRef = useRef<HTMLParagraphElement>(null);

  const [step, setStep] = useState(0);
  const [values, setValues] = useState<OfferFormValues>({
    ...emptyOfferForm,
    source,
  });
  const [errors, setErrors] = useState<OfferFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const set =
    (name: keyof OfferFormValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;
      setValues((v) => ({ ...v, [name]: value }));
    };

  /** Focus the first field with an error so keyboard users land on it. */
  function focusFirstError(next: OfferFormErrors) {
    const first = Object.keys(next)[0];
    if (!first) return false;
    formRef.current
      ?.querySelector<HTMLElement>(`#${CSS.escape(fid(first))}`)
      ?.focus();
    return true;
  }

  function goToStep(next: number) {
    setStep(next);
    // Move focus to the step label so screen readers announce the change
    // instead of silently swapping the fields underneath.
    requestAnimationFrame(() => stepHeadingRef.current?.focus());
  }

  function handleNext() {
    const stepErrors = validateStep(values, step);
    setErrors(stepErrors);
    if (focusFirstError(stepErrors)) return;
    goToStep(Math.min(step + 1, LAST_STEP));
  }

  function handleBack() {
    setErrors({});
    goToStep(Math.max(step - 1, 0));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    // Revalidate everything, not just this step — a value could have been
    // cleared after passing an earlier step.
    const allErrors = validateOfferForm(values);
    setErrors(allErrors);

    const firstBadField = Object.keys(allErrors)[0] as
      | keyof OfferFormValues
      | undefined;

    if (firstBadField) {
      const owningStep = STEP_FIELDS.findIndex((f) =>
        f.includes(firstBadField)
      );
      if (owningStep !== -1 && owningStep !== step) {
        setStep(owningStep);
        requestAnimationFrame(() => focusFirstError(allErrors));
      } else {
        focusFirstError(allErrors);
      }
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setServerError(errorMessages.server);
    }
  }

  /* ---- Success state: swap card content, no redirect ---- */
  if (status === "success") {
    return (
      <PlatFrame className="surface-light mx-auto w-full max-w-[560px] rounded-card bg-paper-raised p-8 shadow-card">
        <div aria-live="polite">
          <h2 tabIndex={-1} className="outline-none">
            Received. Your Research Has Begun.
          </h2>
          <p className="mt-4 measure-narrow text-ink-soft">
            Thank you. Our team is now pulling county records for your parcel.
            Expect your written offer by email within 48 hours, signed by the
            person handling your file. If anything needs clarifying first, we
            will reach out using the contact method you provided.
          </p>
          <p className="mt-4 measure-narrow text-ink-soft">
            If the offer has not appeared within 48 hours, please check your
            spam or junk folder, or simply call us at{" "}
            <a href={site.phoneHref} className="link record">
              {site.phone}
            </a>
            .
          </p>
          <p className="mt-4 text-ink-soft">
            No action is needed from you until then.
          </p>
        </div>
      </PlatFrame>
    );
  }

  const progress = ((step + 1) / STEP_FIELDS.length) * 100;

  return (
    <PlatFrame className="surface-light mx-auto w-full max-w-[560px] rounded-card bg-paper-raised p-8 shadow-card">
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <h3 className="font-caslon text-xl font-bold text-ink">
          Tell Us About Your Land
        </h3>

        {/* Progress */}
        <div className="mt-5">
          <p
            ref={stepHeadingRef}
            tabIndex={-1}
            className="section-index outline-none"
          >
            <span>
              Step {step + 1} of {STEP_FIELDS.length} · {STEP_LABELS[step]}
            </span>
          </p>
          <div
            className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ink-wash"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={STEP_FIELDS.length}
            aria-label="Form progress"
          >
            <div
              className="h-full bg-field-green transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <input type="hidden" name="source" value={values.source} />

        <div className="mt-7 flex flex-col gap-5">
          {/* ---------------- Step 1 · Your details ---------------- */}
          {step === 0 && (
            <>
              <Field id={fid("name")} label="Full name" error={errors.name}>
                <input
                  id={fid("name")}
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={set("name")}
                  aria-invalid={!!errors.name}
                  className={`${inputBase} ${errors.name ? "border-error" : "border-plat-line"}`}
                />
              </Field>

              <Field
                id={fid("email")}
                label="Email address"
                error={errors.email}
              >
                <input
                  id={fid("email")}
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  className={`${inputBase} ${errors.email ? "border-error" : "border-plat-line"}`}
                />
              </Field>

              <Field
                id={fid("phone")}
                label="Phone number"
                optional
                helper="Optional. Only if you prefer we call."
              >
                <input
                  id={fid("phone")}
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={set("phone")}
                  className={`${inputBase} border-plat-line`}
                />
              </Field>
            </>
          )}

          {/* ---------------- Step 2 · Your land ---------------- */}
          {step === 1 && (
            <>
              <Field
                id={fid("state")}
                label="Property state"
                error={errors.state}
              >
                <select
                  id={fid("state")}
                  value={values.state}
                  onChange={set("state")}
                  aria-invalid={!!errors.state}
                  className={`${inputBase} ${errors.state ? "border-error" : "border-plat-line"}`}
                >
                  <option value="">Select a state</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id={fid("county")} label="County" error={errors.county}>
                <input
                  id={fid("county")}
                  type="text"
                  value={values.county}
                  onChange={set("county")}
                  aria-invalid={!!errors.county}
                  className={`${inputBase} ${errors.county ? "border-error" : "border-plat-line"}`}
                />
              </Field>

              <Field
                id={fid("parcel")}
                label="Parcel number or property address"
                optional
                helper="Found on your tax bill or our letter. Leave blank if unsure, we can locate it."
              >
                <input
                  id={fid("parcel")}
                  type="text"
                  value={values.parcel}
                  onChange={set("parcel")}
                  className={`${inputBase} border-plat-line record`}
                />
              </Field>

              <Field id={fid("acreage")} label="Approximate acreage" optional>
                <input
                  id={fid("acreage")}
                  type="text"
                  inputMode="decimal"
                  value={values.acreage}
                  onChange={set("acreage")}
                  className={`${inputBase} border-plat-line`}
                />
              </Field>
            </>
          )}

          {/* ---------------- Step 3 · Anything else ---------------- */}
          {step === 2 && (
            <>
              <Field
                id={fid("referenceCode")}
                label="Reference code from our letter"
                optional
                helper="If you received a letter from us, the code is in the top corner."
              >
                <input
                  id={fid("referenceCode")}
                  type="text"
                  value={values.referenceCode}
                  onChange={set("referenceCode")}
                  className={`${inputBase} border-plat-line record`}
                />
              </Field>

              <Field
                id={fid("message")}
                label="Anything we should know?"
                optional
                helper="Back taxes, shared ownership, access questions. The more we know, the more accurate your offer."
              >
                <textarea
                  id={fid("message")}
                  rows={4}
                  value={values.message}
                  onChange={set("message")}
                  className={`${inputBase} min-h-[120px] resize-y py-3`}
                />
              </Field>

              <div>
                <label
                  htmlFor={fid("consent")}
                  className="flex items-start gap-3 leading-[1.5]"
                >
                  <input
                    id={fid("consent")}
                    type="checkbox"
                    checked={values.consent}
                    onChange={set("consent")}
                    aria-invalid={!!errors.consent}
                    className="mt-1 h-6 w-6 shrink-0 accent-[color:var(--field-green)]"
                  />
                  <span className="text-sm text-ink-soft">
                    I agree that Atlas Equity Group may contact me about my
                    property using the details above. My information is never
                    sold or shared, and one request ends all contact.
                  </span>
                </label>
                {errors.consent ? (
                  <p className="mt-1 text-sm text-error" aria-live="polite">
                    {errors.consent}
                  </p>
                ) : null}
              </div>
            </>
          )}

          {/* ---------------- Controls ----------------
              Back reads first in the DOM so tab order matches the visual
              order on desktop; column-reverse keeps the primary action on
              top when they stack on narrow screens. */}
          <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-secondary w-full sm:w-auto sm:shrink-0"
              >
                Back
              </button>
            )}

            {step < LAST_STEP ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary w-full sm:flex-1"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary w-full sm:flex-1"
                disabled={status === "submitting"}
              >
                {status === "submitting"
                  ? "Sending…"
                  : "Send My Property Details"}
              </button>
            )}
          </div>

          {serverError ? (
            <p className="text-sm text-error" role="alert" aria-live="polite">
              {serverError}
            </p>
          ) : null}

          <p className="text-sm text-ink-soft">
            Submitting this form does not obligate you to sell. It starts our
            research, nothing more.
          </p>
        </div>
      </form>
    </PlatFrame>
  );
}

/* Field wrapper — label always above (never placeholder-as-label) */
function Field({
  id,
  label,
  optional = false,
  helper,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-sans text-sm font-semibold text-ink"
      >
        {label}
        {optional ? (
          <span className="font-normal text-ink-soft"> (optional)</span>
        ) : null}
      </label>
      {children}
      {helper ? <p className="mt-1 text-sm text-ink-soft">{helper}</p> : null}
      {error ? (
        <p className="mt-1 text-sm text-error" aria-live="polite">
          {error}
        </p>
      ) : null}
    </div>
  );
}
