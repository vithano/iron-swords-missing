'use server'

import fetchSheetData from '../services/fetch-sheet-data';

export async function fetchData({name}: {name: string}) {
  return await fetchSheetData({name})
}
