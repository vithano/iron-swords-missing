'use client'

import { getBaseUrl } from '@/lib/utils';
export async function removeNotification({hash,blacklist = false}:{hash:string,blacklist?:boolean}) {
  if(blacklist){
    const data = await fetch(`/api/notify/blacklist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({hash}),
    })
    return data;
  }
  const data = await fetch(`/api/notify`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({hash}),
  })
  return data;
}
