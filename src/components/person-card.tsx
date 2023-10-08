import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import PersonData from "../app/utils/types";
import {mailAdmin, sanitizeImageUrl} from "@/lib/utils";
import Link from "next/link";

export function PersonCard(data: PersonData) {
    const {firstName, lastName, contactName, identifyingDetails, contactPhone, image, missingPhone, lastSeen, notes, status, id} = data
    const subject = `היי, ראיתי אדם שנראה לאחרונה ואשמח אם תצרי איתי קשר לגבי ` + ` ${firstName} ${lastName} ${id}`;
    return (
        
            <Card className="w-[350px] text-right" >
                <CardHeader>
                    <CardTitle>{firstName} {lastName} </CardTitle>
                    <CardDescription>נראה לאחרונה {lastSeen}</CardDescription>
                </CardHeader>
                <Link href={`/profile/${id}`}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Image className="aspect-[14/13] dark:drop-shadow-[0_0_0.25rem_#ffffff70] w-full rounded-2xl object-cover cursor-pointer"
                                width={350}
                                height={350}
                                unoptimized={true}
                                style={{objectPosition:'0 22%'}}
                                src={sanitizeImageUrl(image)} alt="person image" />
                        </div>
                    </div>
                </CardContent>
                </Link>
                <CardFooter className="flex justify-between">
                    {/* <Button 
                onClick={() => window.open(`https://wa.me/+972${contactPhone}?text=היי%20אני%20רוצה%20לדווח%20על%20אדם%20שנראה%20לאחרונה%20אשמח%20אם%20תצרי%20איתי%20קשר%20לגבי%20זה`, '_blank')}
                >צור קשר</Button> */}
                    <Button
                        onClick={() => mailAdmin(subject)}
                        variant="outline">עדכן אותנו</Button>
                    <span>
                    סטטוס : {status}
                    </span>

                </CardFooter>
            </Card>
    )
}
