import {ImageResponse} from 'next/server';
// App router includes @vercel/og.
// No need to install it.
import supabase from "@/services/supabase";
export const runtime = 'edge';

export async function GET(request: Request) {


    let {data, error} = await supabase
        .from('people')
        .select("*")
        .limit(1)
        

    return new Response(JSON.stringify(data,null,4), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}