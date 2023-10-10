'use server'

import { cookies } from 'next/headers'
import { addNotification as addNotificationToDb } from '@/services/notifications'
import type { NotificationData } from '@/app/utils/types'
export async function addNotification({email,notify_id}:Partial<NotificationData>) {
  const _cookies = cookies()
  const data = await addNotificationToDb({email,notify_id});
  return data;
}
