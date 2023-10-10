'use server'

import { cookies } from 'next/headers'
import { fetchNotifications as fetchNotificationData } from '@/services/notifications'
import type { NotificationData } from '@/app/utils/types'
export async function fetchNotifications({email,notify_id}:Partial<NotificationData>) {
  const _cookies = cookies()
  const data = await fetchNotificationData({email,notify_id});
  return data;
}
