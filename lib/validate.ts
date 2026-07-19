import { site } from "./site";

/**
 * Shared client + server validation (design §10 lib/validate.ts).
 * Error strings are the exact microcopy from webcopy v1.2 (FORM ERROR STATES).
 */

export type OfferSource = "home" | "get-offer";

export type OfferFormValues = {
  name: string;
  email: string;
  phone: string;
  state: string;
  county: string;
  parcel: string;
  acreage: string;
  referenceCode: string;
  message: string;
  consent: boolean;
  source: OfferSource;
};

export type OfferFormErrors = Partial<
  Record<keyof OfferFormValues, string>
>;

export const emptyOfferForm: OfferFormValues = {
  name: "",
  email: "",
  phone: "",
  state: "",
  county: "",
  parcel: "",
  acreage: "",
  referenceCode: "",
  message: "",
  consent: false,
  source: "home",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const errorMessages = {
  name: "Please tell us your name so we can address your offer correctly.",
  email: "We need a valid email to send your written offer.",
  state: "Select the state where your land is located.",
  county: "The county helps us pull the right records.",
  consent:
    "Please check the box so we can contact you about your property.",
  server: `Something went wrong on our end, not yours. Please try again, or email us directly at ${site.email}.`,
} as const;

export function validateOfferForm(
  values: OfferFormValues
): OfferFormErrors {
  const errors: OfferFormErrors = {};

  if (!values.name.trim()) errors.name = errorMessages.name;
  if (!EMAIL_RE.test(values.email.trim())) errors.email = errorMessages.email;
  if (!values.state.trim()) errors.state = errorMessages.state;
  if (!values.county.trim()) errors.county = errorMessages.county;
  if (!values.consent) errors.consent = errorMessages.consent;

  return errors;
}

/**
 * Which fields live on which step of <OfferForm />. Order matters: it drives
 * both what renders and what gets validated before advancing.
 */
export const STEP_FIELDS: (keyof OfferFormValues)[][] = [
  ["name", "email", "phone"],
  ["state", "county", "parcel", "acreage"],
  ["referenceCode", "message", "consent"],
];

export const STEP_LABELS = [
  "Your details",
  "Your land",
  "Anything else",
] as const;

/** Validate only the fields belonging to `step`. */
export function validateStep(
  values: OfferFormValues,
  step: number
): OfferFormErrors {
  const all = validateOfferForm(values);
  const fields = STEP_FIELDS[step] ?? [];
  const errors: OfferFormErrors = {};
  for (const field of fields) {
    if (all[field]) errors[field] = all[field];
  }
  return errors;
}

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
] as const;
