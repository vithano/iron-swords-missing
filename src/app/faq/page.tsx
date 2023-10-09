"use client";

import { Button } from '@/components/ui/button';
import { mailAdmin } from '@/lib/utils';
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "מאיפה מגיע המידע?",
    answer:
      "אנחנו מנטרים את הרשתות החברתיות במטרה לעזור לבני המשפחות, כל המידע המפורסם הוא ציבורי ונאסף על ידי מתנדבים",
  },
  {
    question: "מצאתי טעות איך אפשר לעדכן?",
    answer:
      "שלחו לנו מייל על ידי הכפתור הכחול",
  },
  {
    question: "איך אפשר לעזור?",
    answer:
      "אנחנו פרויקט קוד פתוח ולא ממומן, נשמח לעזרה בכתיבת קוד ובהזנת נתונים",
  },
  // More questions...
]

export default function FAQ() {
  return (
    <div className="" dir="rtl">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-4xl font-bold leading-10 tracking-tight text-black dark:invert">שאלות נפוצות</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-black dark:invert">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-black dark:invert">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
          <Button onClick={()=>mailAdmin()}
        className={"w-full sm:w-20 sm:text-center bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"}>
        צור קשר
    </Button>
        </div>
      </div>
    </div>
  )
}
