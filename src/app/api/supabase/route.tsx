import {ImageResponse} from 'next/server';
// App router includes @vercel/og.
// No need to install it.
import supabase from "@/services/supabase";
export const runtime = 'nodejs';

export async function GET(request: Request) {


    let { data, error } = await supabase
    .from('people')
    .select('id')
  
    console.log(111,{data, error});
    return new Response(JSON.stringify(data), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}