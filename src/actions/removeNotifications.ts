'use server'

import { cookies } from 'next/headers'
import { removeNotification as removeNotificationFromDb } from '@/services/notifications'
import type { NotificationData } from '@/app/utils/types'
export async function removeNotification({email,notify_id}:Partial<NotificationData>) {
  const _cookies = cookies()
  const data = await removeNotificationFromDb({email,notify_id});
  return data;
}
