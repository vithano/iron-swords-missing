import { NextResponse } from 'next/server';
import { getBaseUrl } from '@/lib/utils';
import { fetchNotifications,removeNotification,addNotification } from '@/services/notifications';
import { sendEmail } from '@/services/resend';
import { createDecipheriv } from "node:crypto";
import { isBlacklisted } from '@/services/blacklist';
export const runtime = 'nodejs';

const decrypt = (encryptedData: string, key: string) => {
  const [ivHex, ciphertext] = encryptedData.split(':');  // Split the IV and ciphertext
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// webhook to handle changes in the database
export async function POST(request: Request) {
    const data = await request.json();
    if(data.table === 'people') {
        await handlePeople(data);
    }
    else if(data.table === 'animals') {
        await handleAnimals(data);
    }
    return new NextResponse('Webhook handled', {
        headers: {
            'content-type': 'text/plain',
        },
    });
}
const getEmailsToNotify = async (id:string) => {
    const emails:string[] = [];
    const notifications = await fetchNotifications({notify_id:id});
    for(const notification of notifications) {
        const isBlackListed = await isBlacklisted({email:notification.email});
        if(!isBlackListed)
            emails.push(notification.email);
    }
    return emails;
};

const handlePeople = async (data: any) => {
    const oldRecord = data.old_record;
    const newRecord = data.record;
    if(oldRecord?.status !== newRecord?.status) {
        const emails = await getEmailsToNotify(newRecord.id);

        const fullName = `${newRecord.first_name}` + (newRecord.last_name && newRecord.last_name.toLowerCase() !== 'null'  ? ` ${newRecord.last_name}` : '');
        if(emails.length) {
            await sendEmail({
                email: emails,
                from: 'noreply@ironswords.org.il',
                subject: `עדכון סטטוס לגבי ${fullName}`,
                html: `שלום רב, היה עדכון בסטטוס של ${fullName}
                ניתן לעקוב אחרי העדכונים בקישור הבא: ${getBaseUrl()}/profile/${newRecord.id}`
            });
        }
    }
};

const handleAnimals = async (data: any) => {
    const oldRecord = data.old_record;
    const newRecord = data.record;
    if(oldRecord?.status !== newRecord?.status) {
        const emails = await getEmailsToNotify(newRecord.id);
        if(emails.length) {
            sendEmail({
                email: emails,
                from: 'noreply@ironswords.org.il',
                subject: `עדכון סטטוס לגבי ${newRecord.name}`,
                html: `שלום רב, היה עדכון בסטטוס של ${newRecord.name}
                ניתן לעקוב אחרי העדכונים בקישור הבא: ${getBaseUrl()}/profile/${newRecord.id}`
            });
        }
    }
};

// to add email to notifications table coming from the notify me button
export async function PUT(request: Request) {
    const json = await request.json();
    const encryptedValue = json.hash;
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if(!encryptedValue || !encryptionKey) {
        return NextResponse.json({ error: 'decryption failed' }, { status: 400 })
    }
    const decryptedValue = decrypt(encryptedValue, encryptionKey);
    const params = decryptedValue.split('&');
    const email = params[0];
    const notify_id = params[1];
    const isBlackListed = await isBlacklisted({email});
    if(isBlackListed) {
        return NextResponse.json({ error: 'email is blacklisted' }, { status: 400 })
    }
    if(email && notify_id) {
        const success = await addNotification({email, notify_id});
        if(success) {
            return NextResponse.json({ success: true }, { status: 200 })
        }
    }
    return NextResponse.json({ error: 'decryption failed' }, { status: 400 })
}
// remove email from notifications table coming from the notify page
export async function DELETE(request: Request) {
    const json = await request.json();
    const encryptedValue = json.hash;
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if(!encryptedValue || !encryptionKey) {
        return NextResponse.json({ error: 'decryption failed' }, { status: 400 })
    }
    const decryptedValue = decrypt(encryptedValue, encryptionKey);
    const params = decryptedValue.split('&');
    const email = params[0];
    const notify_id = params[1];
    if(email && notify_id) {
        const success = await removeNotification({email, notify_id});
        if(success) {
            return NextResponse.json({ success: true }, { status: 200 })
        }
    }
    return NextResponse.json({ error: 'decryption failed' }, { status: 400 })
}
