import { Crypto, MonkeyStorage } from "../modules/services";

export async function getOrCreateKey(): Promise<string> {
  const storage = new MonkeyStorage();

  let encryptionKey = await storage.get<string>("encryptionKey");

  if (!encryptionKey) {
    let deviceFingerPrint =
      navigator.userAgent + navigator.language + screen.width + screen.height;

    encryptionKey = Crypto.hash(deviceFingerPrint);
    await storage.set("encryptionKey", encryptionKey);
    return encryptionKey;
  }

  return encryptionKey;
}
