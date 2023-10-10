import {NotificationData} from '../app/utils/types';
import supabase from './supabase';
import validator from 'validator';

type Props = {
  email?: string;
  notify_id?: string;
}
export async function addNotification(props?: Props): Promise<boolean> {
  const {email, notify_id} = props ?? {email: '', notify_id: ''};
  const sanitizedEmail = validator.escape(email || '');
  const sanitizedNotifyId = validator.escape(notify_id || '');
  console.log(sanitizedEmail, sanitizedNotifyId)
  if (!sanitizedEmail || !sanitizedNotifyId)
    return false;

    const isAlreadySubscribed = await supabase
    .from('notifications')
    .select('*')
    .eq('email', sanitizedEmail)
    .eq('notify_id', sanitizedNotifyId)
    .limit(1);
    console.log(isAlreadySubscribed)
    if(isAlreadySubscribed.error)
        return false;

    if (isAlreadySubscribed.data.length > 0) {
      return true;
    }
  const {data = []} = await supabase
    .from('notifications')
    .insert([
      {email: sanitizedEmail, notify_id: sanitizedNotifyId}
    ]);
  console.log(data)
  return true;
}
export async function removeNotification(props?: Props): Promise<boolean> {
    const {email, notify_id} = props ?? {email: '', notify_id: ''};
    const sanitizedEmail = validator.escape(email || '');
    const sanitizedNotifyId = validator.escape(notify_id || '');
    
    if (!sanitizedEmail || !sanitizedNotifyId)
        return false;
    
        const isAlreadySubscribed = await supabase
        .from('notifications')
        .select('*')
        .eq('email', sanitizedEmail)
        .eq('notify_id', sanitizedNotifyId);
        if(isAlreadySubscribed.error)
            return false;
    
        if (isAlreadySubscribed.data.length == 0) {
        return false;
        }
    const {data = []} = await supabase
        .from('notifications')
        .delete()
        .eq('email', sanitizedEmail)
        .eq('notify_id', sanitizedNotifyId);
    return true;
    }
export async function fetchNotifications(props?: Props): Promise<NotificationData[]> {
    const {email, notify_id} = props ?? {email: '', notify_id: ''};
    const sanitizedEmail = validator.escape(email || '');
    const sanitizedNotifyId = validator.escape(notify_id || '');
    
    if (!sanitizedEmail || !sanitizedNotifyId)
        return [];
    const orQuery = `or(email.eq.${sanitizedEmail},notify_id.eq.${sanitizedNotifyId})`;
    const {data = []} = await supabase
        .from('notifications')
        .select('*')
        .or(orQuery);

    return data?.map(({email, notify_id}) => ({
        email,
        notify_id
        })) ?? [];
}