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
import PersonData from "../utils/types";
import {sanitizeImageUrl} from "@/lib/utils";

export function PersonCard(data: PersonData) {
    const {firstName, lastName, contactName, identifyingDetails, contactPhone, image, missingPhone, lastSeen, notes, status} = data
    return (
        <Card className="w-[350px] text-right" >
            <CardHeader>
                <CardTitle>{firstName} {lastName} </CardTitle>
                <CardDescription>נראה לאחרונה {lastSeen}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Image className="aspect-[14/13] w-full rounded-2xl object-fill cursor-pointer"
                            width={350}
                            height={350}
                            onClick={()=>window.open(image, '_blank')}
                            src={sanitizeImageUrl(image)} alt="person image" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                {/* <Button 
                onClick={() => window.open(`https://wa.me/+972${contactPhone}?text=היי%20אני%20רוצה%20לדווח%20על%20אדם%20שנראה%20לאחרונה%20אשמח%20אם%20תצרי%20איתי%20קשר%20לגבי%20זה`, '_blank')}
                >צור קשר</Button> */}
                <Button 
                onClick={()=> window.open(`mailto:ironswordsoperation@gmail.com`)}
                variant="outline">עדכן אותנו</Button>
            </CardFooter>
        </Card>
    )
}
