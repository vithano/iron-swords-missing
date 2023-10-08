import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

const sheets = google.sheets('v4');

const jwtClient = new google.auth.JWT(
  process.env.SERVICE_ACCOUNT_EMAIL!,
  undefined,
  process.env.SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);

const getSheetData = async (req: NextApiRequest, res: NextApiResponse) => {
  jwtClient.authorize((err, tokens) => {
    if (err) {
      res.status(500).send('Error authorizing with Service Account');
      return;
    }

    sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId: process.env.SPREAD_SHEET_ID!,
      range: 'Sheet1',
    }, (err, response) => {
      if (err) {
        res.status(500).send('Error accessing Google Sheet');
        return;
      }
      res.status(200).json(response?.data?.values || []);
    });
  });
};

export default getSheetData;