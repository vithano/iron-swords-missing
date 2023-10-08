'use server'

import fetchSheetData from '../app/utils/fetch-sheet-data';

export async function fetchById({id}: {id: string}) {
  // !TODO fix this
  const res = await fetchSheetData({name: "א"});
  return res[0];
}