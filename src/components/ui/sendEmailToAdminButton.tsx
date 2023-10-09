'use client';

import { mailAdmin } from "@/lib/utils";
import { Button } from "./button";
import { Dialog } from "./dialog";

const SendEmailToAdminButton = ({subject}:{subject:string}) =>{
const adminMail = 'ironswordsoperation@gmail.com';
const content = `אם לא ניתן לשלוח מייל דרך הכפתור אנא שלחו לנו ב ${adminMail}`
const title = 'שלחו לנו מייל';
const description = `נשמח לעזור לכם לעדכן את הנעדרים שלכם.\n ${content}`;
const primaryButton = {text:'שלח מייל', onClick:()=>mailAdmin(subject)};
const secondaryButton = {text:'העתק מייל', shouldClose:true, onClick:()=>navigator.clipboard.writeText(adminMail)};
    return (<Dialog secondaryButton={secondaryButton} description={description} primaryButton={primaryButton} title={title}><Button variant="outline">עדכן אותנו</Button></Dialog>)
}
export default SendEmailToAdminButton;