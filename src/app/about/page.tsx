'use client'

import { Button } from "@/components/ui/button"
import {mailAdmin} from "@/lib/utils"
export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" style={{direction:'rtl'}}>
    <div className={"max-w-[400px] bg-inherit shadow flex flex-col my-4 p-6"}>
    <p className={"text-xl font-semibold pb-5"}>עלינו</p>
    <p className={"pb-2"}>האתר נועד לעזור ולאתר את הנעדרים של מלחמת חרבות ברזל
    האתר נבנה ללא מטרות רווח והוא פתוח לשימוש חופשי
    </p>
    <p className="pb-2">האתר נבנה בפרויקט קוד פתוח וכל המידע בו מוזן על ידי מתנדבים</p>
    <Button onClick={()=>mailAdmin()}
        className={"w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"}>
        צור קשר
    </Button>
    </div>
    </main>
  )
}
