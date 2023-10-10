'use server'

import {fetchDbData} from '@/services/fetch-db-data';
export const revalidate = 0;
export async function fetchById({id}: {id: string}) {
  const data = await fetchDbData({id});
  return data[0];
}