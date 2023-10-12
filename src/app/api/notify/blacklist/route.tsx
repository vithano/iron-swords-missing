import { blacklistEmail } from "@/services/notifications";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
import { createDecipheriv } from "node:crypto";

const decrypt = (encryptedData: string, key: string) => {
  const [ivHex, ciphertext] = encryptedData.split(":"); // Split the IV and ciphertext
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);
  let decrypted = decipher.update(ciphertext, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export async function POST(request: Request) {
  const json = await request.json();
  const encryptedValue = json.hash;
  const encryptionKey = process.env.ENCRYPTION_KEY;

  if (!encryptedValue || !encryptionKey) {
    return NextResponse.json({ error: "decryption failed" }, { status: 400 });
  }
  const decryptedValue = await decrypt(encryptedValue, encryptionKey);
  const params = decryptedValue.split("&");
  const email = params[0];
  if (email) {
    const success = await blacklistEmail({ email });
    if (success) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
  }
  return NextResponse.json({ error: "decryption failed" }, { status: 400 });
}
