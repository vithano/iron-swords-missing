import {ImageResponse} from 'next/server';
import {getDeployments, getLastDeploymentTime} from '@/services/vercel';

export const runtime = 'edge';

export async function GET(request: Request) {
    const res = await getLastDeploymentTime();
    return new Response(JSON.stringify(res), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}