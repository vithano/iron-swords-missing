'use server'

import fetchSheetData from '../app/utils/fetch-sheet-data';

export async function fetchData({name}: {name: string}) {
  return await fetchSheetData({name})
}
