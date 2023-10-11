'use client'

import { removeNotification } from "@/actions";
import { LoadingPage } from "@/components/ui/loadingPage";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

const ErrorPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-24" dir="rtl">
        <div className={"max-w-[400px] bg-inherit shadow flex flex-col my-4 p-6"}>
        <p className={"text-xl font-semibold pb-5"}>שגיאה</p>
        <p className={"pb-2"}>הקישור שנשלח אינו תקין</p>
        </div>
        </main>
    )
}
const SuccessPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-24" dir="rtl">
        <div className={"max-w-[400px] bg-inherit shadow flex flex-col my-4 p-6"}>
        <p className={"text-xl font-semibold pb-5"}>הצלחה</p>
        <p className={"pb-2"}>הקישור שנשלח אומת בהצלחה</p>
        <p className={"pb-2"}>האימייל שלך לא יקבל יותר עדכונים עבור אף אדם</p>
        </div>
        </main>
    )
}
export default function Notify() {
const [showSuccess, setShowSuccess] = useState<boolean | null>(null);
const [showError, setShowError] = useState<boolean | null>(null);
const queryParams = useSearchParams();
useEffect(()=>{
    const hash = queryParams.get("hash");
    if(!hash) {
        setShowError(true);
        return;
    }
    removeNotification({hash,blacklist:true}).then((res)=>{
        if(res){
            res.json().then((res)=>{
                if(!res.error){
                    setShowSuccess(true);
                }
                else{
                    setShowError(true);
                }
            })
        }
        else{
            setShowError(true);
        }
    });
},[])

if(!showSuccess && !showError) return <LoadingPage />;
if(showSuccess) return SuccessPage();
if(showError) return ErrorPage();

}
