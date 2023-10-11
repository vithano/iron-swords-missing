import { getBaseUrl } from '@/lib/utils';

export async function sendEmail({from, email, subject, html, text,type = 'notify_me'}:{from:string,email: string | string[], subject: string, html?: string, text?: string,type?:string}) {
  const success = await fetch(`${getBaseUrl()}/api/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({from, email, subject, html, text, type}),
  }).catch((err) => {
    console.error(err)
    return false;
  });
  return success;
}