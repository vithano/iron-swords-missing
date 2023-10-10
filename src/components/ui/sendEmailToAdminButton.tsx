'use client';

import { adminMail, mailAdmin } from "@/lib/utils";
import { Button } from "./button";
import { Dialog } from "./dialog";
import CopyButton from "./copyButton";

const SendEmailToAdminButton = ({children,text = 'צור קשר',subject}:{children?:React.ReactNode,text?:string,subject?:string}) =>{
const content = `אם לא ניתן לשלוח מייל דרך הכפתור אנא שלחו לנו ב ${adminMail}`
const title = 'שלחו לנו מייל';
const description = <span>נשמח לעזור לכם לעדכן את הנעדרים שלכם.<br/> {content}</span>;
const primaryButton = <Button onClick={()=>mailAdmin(subject)}>שלח מייל</Button>
const secondaryButton = <CopyButton text={adminMail}/>
    return (<Dialog secondaryButton={secondaryButton} description={description} primaryButton={primaryButton} title={title}>{children? children : <Button variant="outline">{text}</Button>}</Dialog>)
}
export default SendEmailToAdminButton;