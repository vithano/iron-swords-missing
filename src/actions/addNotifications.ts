import { getBaseUrl } from '@/lib/utils'
export async function addNotification({hash}:{hash:string}) {
  const data = await fetch(`${getBaseUrl()}/api/notify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({hash}),
  })
  return data;
}
