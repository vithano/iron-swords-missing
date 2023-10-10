'use server'

import { fetchDbData } from '@/services/fetch-db-data';
export const revalidate = 0;
export async function fetchData({name}: {name: string}) {
  return await fetchDbData({name})
}
