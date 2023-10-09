'use client';

import { mailAdmin } from "@/lib/utils";
import { Button } from "./button";
import { Dialog } from "./dialog";

const SendEmailToAdminButton = ({subject}:{subject:string}) =>{
const adminMail = 'ironswordsoperation@gmail.com';
const content = `אם לא ניתן לשלוח מייל דרך הכפתור אנא שלחו לנו ב ${adminMail}`
const title = 'שלחו לנו מייל';
const description = `נשמח לעזור לכם לעדכן את הנעדרים שלכם.\n ${content}`;
const secondaryButton = {text:'שלח מייל', onClick:()=>mailAdmin(subject)};
    return (<Dialog secondaryButton={secondaryButton} description={description} closeButtonText="ביטול" title={title}><Button variant="outline">עדכן אותנו</Button></Dialog>)
}
export default SendEmailToAdminButton;