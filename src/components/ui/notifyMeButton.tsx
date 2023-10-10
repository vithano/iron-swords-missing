'use client';
import { adminMail, getBaseUrl } from "@/lib/utils";
import {Button} from "./button";
import {Dialog} from "./dialog";
import { Input } from "./input";
import { useState } from "react";
import validator from 'validator';
import { fetchById, sendEmail } from "@/actions";

const NotifyMeButton = ({notify_id,table}:{notify_id:string,table:string}) => {
    const [email, setEmail] = useState('');
    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        validator.isEmail(event.target.value) &&
        setEmail(event.target.value);
    }
    const notifyMe = async () => {
        try{
            
            const personData = await fetchById({id:notify_id});
            if(!personData) {
                return;
            }
            const fullName = `${personData.firstName} ${personData.lastName}`;
            
            const html = `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>אני מבקש שתרשמו אותי לעדכונים לגבי ${fullName}</title>
            </head>
            <body>
                <h1>Sign Up for Notifications</h1>
                <form action="${getBaseUrl()}/api/notify" method="put">
                    <input type="hidden" name="email" value=${email}>
                    <input type="hidden" name="notify_id" value=${notify_id}>
                    <button type="submit">עדכנו אותי</button>
                </form>
            </body>
            </html>`
            sendEmail({
                email,
                from: 'noreply@ironswords.org.il',
                subject: `עדכון סטטוס לגבי ${fullName}`,
                html
            });
        }
        catch(err) {
            console.error(err);
        }
    }
    const title = 'עדכנו אותי';
    const description = <div className="pt-4"><Input placeholder="example@email.com" onChange={onEmailChange}/></div>;
    const primaryButton = <Button onClick={notifyMe}>עדכנו אותי</Button>
    const BellIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
    </svg>;
  
    return (
        <Dialog
            description={description}
            primaryButton={primaryButton}
            title={title}
            replaceDescription={true}>
            {<Button variant="outline">{BellIcon}</Button>}
        </Dialog>)
}
export default NotifyMeButton;