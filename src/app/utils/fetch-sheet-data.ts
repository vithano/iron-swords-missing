const { google } = require('googleapis');
import client from './google-client';
import { PersonData } from './types';
const KeysInHebrewToEnglish: {[key: string]: string} = {
  'שם פרטי': 'firstName',
  'שם משפחה': 'lastName',
  'טלפון הנעדר': 'missingPhone',
  'תמונה': 'image',
  'שם איש קשר': 'contactName',
  'טלפון איש קשר': 'contactPhone',
  'סטטוס': 'status',
  'נצפה לאחרונה': 'lastSeen',
  'פרטים מזהים': 'identifyingDetails',
  'הערות': 'notes',
} as const;

export default async function fetchSheetData({name}: {name: string}):Promise<[PersonData] | []> {
  if(!name) return [];
  const sheets = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = process.env.SPREAD_SHEET_ID!;
  const sheetName = 'Sheet1';

  const res = await sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges: [`${sheetName}`],
    valueRenderOption: 'UNFORMATTED_VALUE',
    dateTimeRenderOption: 'FORMATTED_STRING',
    majorDimension: 'ROWS',
  });

  const rows = res.data.valueRanges[0].values;
  const fuzzyFoundRows = rows.slice(1).filter((row: any) => 
  row.slice(0, 2).some((cell: any) => cell.includes(name))
);
  // turn rows into an array of objects
  const keys = rows[0];
  const keysInEnglish = keys.map((key: string) => KeysInHebrewToEnglish[key]);
  const fuzzyFoundRowsWithKeys = fuzzyFoundRows.map((row: any) => {
    const rowWithKeys:Partial<PersonData> = {};
    keysInEnglish.forEach((key: string, i: number) => {
      rowWithKeys[key as keyof PersonData] = row[i];
    });
    return rowWithKeys;
  });
  return fuzzyFoundRowsWithKeys;
}