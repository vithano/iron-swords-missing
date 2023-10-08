'use server'

import {fetchAllSheetData} from '@/services/fetch-sheet-data';

export async function fetchById({id}: {id: string}) {
  // !TODO fix this
  const res = await fetchAllSheetData();
  const profile = res.filter((person) => person.id == id);
  
  return profile[0];
}