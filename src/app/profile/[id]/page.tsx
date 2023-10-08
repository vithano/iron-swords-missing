import {cn, sanitizeImageUrl} from "@/lib/utils";
import Image from "next/image"

import {fetchById} from "@/actions";
import Link from "next/link";
import StatusPill from "../../../components/status-pill";
import Head from "next/head";


export default async function Page({params}: {params: {id: string}}) {
    const {id} = params;
    const data = await fetchById({id});
    
    // go to home page if no data
    if(!data) {
        return <Link className="w-100 self-center text-center text-white" href={"/"}>לא נמצא</Link>
    }

    const {firstName, lastName, contactName, identifyingDetails, contactPhone, image, missingPhone, lastSeen, notes, status} = data;
    const imgUrl = sanitizeImageUrl(image);
    return (
        <>
        <Head>
        <meta property="og:image" content={imgUrl} />
      </Head>
        <div className="text-right text-white" dir="rtl">
            <div className="pb-16 pt-6 sm:pb-24">
                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-5 lg:col-start-8">
                            <div className="flex justify-between">
                                <h1 className="text-4xl font-medium ">{firstName} {lastName}</h1>
                            </div>
                            <div className="py-4">

                            <StatusPill status={status}/>
                            </div>

                        </div>

                        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                            <h2 className="sr-only">Image</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                <img                                    
                                    src={imgUrl}
                                    alt={firstName}
                                    className={cn(
                                        'lg:col-span-2 lg:row-span-2',
                                        'rounded-lg'
                                    )}
                                />
                            </div>
                        </div>

                        <div className="mt-8 lg:col-span-5">

                            {/*  details */}
                            <div className="mt-10">
                                <h2 className="text-2xl font-medium">פרטים</h2>

                                <div className="prose prose-sm mt-4 py-3 space-y-2">
                                    <p> שם : {firstName} {lastName}</p>
                                    <p> שם : {missingPhone ?? "--"}</p>
                                    <p> נצפה לאחרונה : {lastSeen}</p>
                                    <p> פרטים מזהים : {identifyingDetails ?? "--"}</p>
                                    <p> הערות : {notes ?? "--"}</p>
                                </div>
                            </div>

                            <section aria-labelledby="contact-heading" className="mt-10">
                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                <h2 className="text-2xl font-medium">איש קשר</h2>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                        <dt>
                                            <span className="mt-4 text-sm font-medium text-gray-900">{contactName}</span>
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-500">{contactPhone}</dd>
                                    </div>
                                </dl>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}