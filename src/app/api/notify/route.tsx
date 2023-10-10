'use client';
import { NextResponse } from 'next/server';
import supabase from '@/services/supabase';
import { adminMail, getBaseUrl } from '@/lib/utils';

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
    const { data, error } = await supabase
        .from('notifications')
        .select('email')
        .eq('notify_id', id)
        .limit(10);
    if(error) {
        console.error(error);
        return emails;
    }
    if(data) {
        data.forEach((row:any) => {
            emails.push(row.email);
        });
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
            const { Resend } = await import('resend');
            const resend = new Resend(process.env.RESEND_KEY);

            resend.emails.send({
                to: emails,
                from: adminMail,
                subject: `עדכון סטטוס לגבי ${fullName}`,
                text: `שלום רב, היה עדכון בסטטוס של ${fullName}
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
            const { Resend } = await import('resend');
            const resend = new Resend(process.env.RESEND_KEY);
            resend.emails.send({
                to: emails,
                from: adminMail,
                subject: `עדכון סטטוס לגבי ${newRecord.name}`,
                text: `שלום רב, היה עדכון בסטטוס של ${newRecord.name}
                ניתן לעקוב אחרי העדכונים בקישור הבא: ${getBaseUrl()}/profile/${newRecord.id}`
            });
        }
    }
};