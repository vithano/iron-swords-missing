import {ImageResponse} from 'next/server';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function POST(request: Request) {
    //const {searchParams} = new URL(request.url);
    console.log(request)
}