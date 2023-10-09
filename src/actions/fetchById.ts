'use server'

import { getBaseUrl, translateKeys } from "@/lib/utils";
const endpoint = `${getBaseUrl()}/api/supabase`;
export async function fetchById({id}: {id: string}) {
  const response = await fetch(`${endpoint}?id=${id}`);
  const data = await response.json();
  const translatedData = translateKeys(data);
  return translatedData[0];
}