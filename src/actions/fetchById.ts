'use server'

import { getBaseUrl } from "@/lib/utils";

const endpoint = `${getBaseUrl()}/api/supabase`;
export async function fetchById({id}: {id: string}) {
  const response = await fetch(`${endpoint}?id=${id}`);
  const data = await response.json();
  return data[0];
}