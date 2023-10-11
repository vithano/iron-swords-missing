'use client'
import { getBaseUrl } from '@/lib/utils';

export async function encrypt({email,notify_id,table}:{email:string,notify_id:string,table:string}) {
  const data = await fetch(`${getBaseUrl()}/api/encryption`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email,notify_id,table}),
  })
  return data;
}

export async function decrypt({hash}:{hash:string}) {
  const data = await fetch(`${getBaseUrl()}/api/encryption`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({hash}),
  })
  return data;
}