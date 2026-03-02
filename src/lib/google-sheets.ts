import { google } from "googleapis";
import type { RegistrationData } from "./validation";

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getAuth() {
  const email = getEnvVar("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const key = getEnvVar("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendRegistration(data: RegistrationData): Promise<void> {
  const sheetId = getEnvVar("GOOGLE_SHEET_ID");
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const timestamp = new Date().toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
  });

  const row = [
    timestamp,
    data.fullName,
    data.email,
    data.phone,
    data.lifeStatus,
    data.referralSource,
    data.reason,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}
