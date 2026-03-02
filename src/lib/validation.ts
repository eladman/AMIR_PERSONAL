export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  lifeStatus: string;
  referralSource: string;
  reason: string;
}

export type RegistrationErrors = Partial<Record<keyof RegistrationData, string>>;

export const REFERRAL_OPTIONS = [
  "אינסטגרם",
  "פייסבוק",
  "חבר/ה",
  "גוגל",
  "לינקדאין",
  "אחר",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^0(5[0-9]|7[0-9])\d{7}$/;

export function validateRegistration(data: RegistrationData): RegistrationErrors {
  const errors: RegistrationErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "נא להזין שם מלא";
  }

  if (!data.email.trim()) {
    errors.email = "נא להזין כתובת אימייל";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "כתובת אימייל לא תקינה";
  }

  const cleanPhone = data.phone.replace(/[\s\-]/g, "");
  if (!cleanPhone) {
    errors.phone = "נא להזין מספר טלפון";
  } else if (!PHONE_REGEX.test(cleanPhone)) {
    errors.phone = "מספר טלפון לא תקין (נייד ישראלי)";
  }

  if (!data.lifeStatus.trim()) {
    errors.lifeStatus = "נא לספר מה אתה עושה בחיים";
  }

  if (!data.referralSource) {
    errors.referralSource = "נא לבחור איך הגעת אלינו";
  }

  if (!data.reason.trim()) {
    errors.reason = "נא לכתוב למה אתה רוצה להשתתף";
  }

  return errors;
}
