const { google } = require('googleapis');
const client = new google.auth.JWT(
    process.env.SERVICE_ACCOUNT_EMAIL!,
    null,
    process.env.SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
  );
export default client;