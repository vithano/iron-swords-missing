'use client';

import { mailAdmin } from "@/lib/utils";
import { Button } from "./button";

const SendEmailToAdminButton = ({subject}:{subject:string}) =>{
return (<Button onClick={() => mailAdmin(subject)} variant="outline">עדכן אותנו</Button>)}
export default SendEmailToAdminButton;