"use server";
import supabase from "./supabase";
import validator from "validator";

type Props = {
  email?: string;
};
export async function isBlacklisted(props?: Props): Promise<boolean> {
  const { email } = props ?? { email: "" };
  const sanitizedEmail = validator.escape(email || "");
  if (!sanitizedEmail) return false;

  const isBlacklisted = await supabase
    .from("blacklist_emails")
    .select("email")
    .eq("email", sanitizedEmail)
    .single();
  if (isBlacklisted.data) {
    return true;
  }
  return false;
}
