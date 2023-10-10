import { NextResponse } from 'next/server';
import { adminMail, getBaseUrl } from '@/lib/utils';
import { fetchNotifications,addNotification, sendEmail } from '@/actions';

export const runtime = 'edge';

export async function POST(request: Request) {
    const data = await request.json();
    if(data.table === 'people') {
        handlePeople(data);
    }
    else if(data.table === 'animals') {
        handleAnimals(data);
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
        emails.push(notification.email);
    }
    return emails;
};

const handlePeople = async (data: any) => {
    const oldRecord = data.old_record;
    const newRecord = data.record;
    if(oldRecord?.status !== newRecord?.status) {
        const emails = await getEmailsToNotify(newRecord.id);
        const fullName = `${newRecord.first_name} ${newRecord.last_name}`;
        if(emails.length) {
            sendEmail({
                email: emails,
                from: adminMail,
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
                from: adminMail,
                subject: `עדכון סטטוס לגבי ${newRecord.name}`,
                html: `שלום רב, היה עדכון בסטטוס של ${newRecord.name}
                ניתן לעקוב אחרי העדכונים בקישור הבא: ${getBaseUrl()}/profile/${newRecord.id}`
            });
        }
    }
};
// show page with success message
const successPageHtml = `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>עדכוני סטטוס</title>
    </head>
    <body>
        <h1>נרשמת בהצלחה לעדכוני סטטוס</h1>
        <p>ישלח לך מייל אם נקבל עדכון לגבי הנעדר שלך</p>
        <p>מאחלים בשורות טובות בלבד</p>
    </body>
</html>
`
const errorPageHtml = `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>עדכוני סטטוס</title>
    </head>
    <body>
        <h1>משהו השתבש</h1>
        <p>נסו שוב מאוחר יותר</p>
    </body>
</html>
`
// to add email to notifications table coming from the notify me button
export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const notify_id = searchParams.get('notify_id');
    if(email && notify_id) {
        const success = await addNotification({email, notify_id});
        if(success) {
            return new NextResponse(successPageHtml, {
                headers: {
                    'content-type': 'text/html',
                },
            });
        }
    }
    return new NextResponse(errorPageHtml, {
        headers: {
            'content-type': 'text/html',
        },
    });
}