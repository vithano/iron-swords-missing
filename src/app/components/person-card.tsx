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

export const sanitizeImageUrl = (url: string) => {
    if (url.includes('https://drive.google.com/')) {
        const id = url
            .replace('https://drive.google.com/file/d/', '')
            .replace('/view?usp=sharing', '')
            .replace('/view?usp=drive_link', '')
        return `https://drive.google.com/uc?export=view&id=${id}`
    }

    return url || '/no-image.png';
}

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
                        <Image className="aspect-[14/13] w-full rounded-2xl object-cover"
                            fill
                            src={sanitizeImageUrl(image)} alt="person image" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button >צור קשר</Button>
                <Button variant="outline">עדכן אותנו</Button>
            </CardFooter>
        </Card>
    )
}
