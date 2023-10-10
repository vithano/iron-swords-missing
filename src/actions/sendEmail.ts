'use server'
import { cookies } from 'next/headers'

import { sendEmail as sendEmailResend } from '@/services/resend';
export async function sendEmail({from, email, subject, html, text}:{from:string,email: string | string[], subject: string, html?: string, text?: string}) {
  const _cookies = cookies()
  const success = await sendEmailResend({from, email, subject, html, text});
  return success;
}