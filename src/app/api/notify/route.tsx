import {ImageResponse} from 'next/server';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function POST(request: Request) {
    //const {searchParams} = new URL(request.url);
    console.log(request)
    const data = await request.json();
    console.log(data);

    // Now you can process the data...
    // For example, if Supabase sends the updated row data, you could extract it like so:
    const updatedRow = data.new;
    console.log(updatedRow);
    return new Response('Webhook handled', {
        headers: {
            'content-type': 'text/plain',
        },
    });
}