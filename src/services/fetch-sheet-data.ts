import {google} from 'googleapis';
import client from './google-client';
import {PersonData} from '../app/utils/types';

const keyTranslationMap: {[key: string]: string} = {
  'id': 'id',
  'first_name': 'firstName',
  'last_name': 'lastName',
  'image': 'image',
  'contact_name': 'contactName',
  'contact_phone': 'contactPhone',
  'status': 'status',
  'last_seen': 'lastSeen',
  'details': 'identifyingDetails',
  'notes': 'notes',
} as const;
const endpoint = '/api/supabase';

export async function fetchAllSheetData(name?: string): Promise<PersonData[]> {
  if(!name) return [];
  const nameEncoded = encodeURIComponent(name);
  const response = await fetch(`${endpoint}?name=${nameEncoded}`);
  const data = await response.json();
  // translate keys
  const translatedData = data.map((row: any) => {
    const translatedRow: any = {};
    Object.keys(row).forEach((key) => {
      translatedRow[keyTranslationMap[key]] = row[key];
    });
    return translatedRow;
  });
  return translatedData;
}

export async function fetchSheetData({ name }: { name: string }): Promise<PersonData[]> {
  if (!name) return [];
  return await fetchAllSheetData(name);
}
export default fetchSheetData;