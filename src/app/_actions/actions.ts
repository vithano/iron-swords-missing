'use server'

import fetchSheetData from '../utils/fetch-sheet-data';

export async function fetchData({name}: {name: string}) {
  return await fetchSheetData({name})
}

export async function fetchById({id}: {id: string}) {
  // !TODO fix this
  const res = await fetchSheetData({name: "א"});
  return res[0];
}