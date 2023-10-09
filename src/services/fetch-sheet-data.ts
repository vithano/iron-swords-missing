import {PersonData} from '../app/utils/types';
import { getBaseUrl, translateKeys } from '@/lib/utils';

const endpoint = `${getBaseUrl()}/api/supabase`;
export async function fetchAllSheetData(name?: string): Promise<PersonData[]> {
  if(!name) return [];
  const nameEncoded = encodeURIComponent(name);
  const response = await fetch(`${endpoint}?name=${nameEncoded}`);
  const data = await response.json();
  // translate keys
  const translatedData = translateKeys(data);
  return translatedData;
}

export async function fetchSheetData({ name }: { name: string }): Promise<PersonData[]> {
  if (!name) return [];
  return await fetchAllSheetData(name);
}
export default fetchSheetData;