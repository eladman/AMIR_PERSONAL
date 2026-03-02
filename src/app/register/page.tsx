import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "הרשמה | מאפס לאחד",
  description: "הרשמה לסדנה מאפס לאחד של עמיר מנחם",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
