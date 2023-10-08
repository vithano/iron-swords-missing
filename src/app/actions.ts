'use server'
 
import fetchSheetData from './utils/fetch-sheet-data';
export default async function fetchData({name}:{name:string}) {
  return await fetchSheetData({name})
}