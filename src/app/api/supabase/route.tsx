import {ImageResponse} from 'next/server';
// App router includes @vercel/og.
// No need to install it.
import supabase from "@/services/supabase";
import { PersonDataSql } from '@/app/utils/types';
export const runtime = 'edge';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const id = url.searchParams.get('id');
    let data: PersonDataSql[] = [];
    let response: any = {};

    if(name) {
    response = await supabase
      .from('people')
      .select('*')
      .ilike('first_name', `%${name}%`)
        .or(`last_name.ilike.%${name}%`);
    }
    if(id) {
    response = await supabase
          .from('people')
          .select('*')
          .eq('id', id);
        }
    if (response.error) {
        return new Response(response.error.message, {status: 500});
    }
    if (response.data) {
        data = response.data;
    };
    return new Response(JSON.stringify(data), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}