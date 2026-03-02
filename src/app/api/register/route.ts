import { NextResponse } from "next/server";
import { validateRegistration, type RegistrationData } from "@/lib/validation";
import { appendRegistration } from "@/lib/google-sheets";

export async function POST(request: Request) {
  try {
    const data: RegistrationData = await request.json();
    const errors = validateRegistration(data);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Save to Google Sheets — critical, fail if this errors
    await appendRegistration(data);

    // Trigger n8n webhook — non-critical, log failures but return success
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error("Failed to trigger n8n webhook:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json(
      { success: false, errors: { server: "שגיאה בשרת, נסה שוב מאוחר יותר" } },
      { status: 500 }
    );
  }
}
