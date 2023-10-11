import { getBaseUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export const encrypt = (data: string, key: string) => {
  const iv = randomBytes(16);  // Generate a random 16-byte IV
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;  // Return IV with the encrypted data
};

export const decrypt = (encryptedData: string, key: string) => {
  const [ivHex, ciphertext] = encryptedData.split(':');  // Split the IV and ciphertext
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// encrypt/decrypt data
export async function POST(request: NextRequest) {
    if (!request.headers.get("referer")?.slice(0, -1).includes(getBaseUrl() as string)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if(!encryptionKey) {
        return NextResponse.json({error: 'encryption key is missing'}, {status: 500});
    }
    const data = await request.json();
    const hash = data.hash;
    if(!hash) {
        const email = data.email;
        const notify_id = data.notify_id;
        const table = data.table;
        const encryptionString = `${email}&${notify_id}&${table}`;
        const encryptedValue = encrypt(encryptionString, encryptionKey);
        return NextResponse.json({hash: encryptedValue});
    }
    else {
        const decryptedValue = decrypt(hash, encryptionKey);
        const params = decryptedValue.split('&');
        const email = params[0];
        const notify_id = params[1];
        const table = params[2];
        return NextResponse.json({email, notify_id, table});
    }

}
