"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);
export const sendEmail = async ({
  from,
  email,
  subject,
  html,
  text,
}: {
  from: string;
  email: string | string[];
  subject: string;
  html?: string;
  text?: string;
}) => {
  if (!email || !subject || (!html && !text)) return false;
  const htmlOrText: any = {
    ...(html && !text && { html }),
    ...(text && !html && { text }),
  };
  const response = await resend.sendEmail({
    from,
    to: email,
    subject,
    ...htmlOrText,
  });
  return response;
};
