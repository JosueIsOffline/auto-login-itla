export class Crypto {
  public static encrypt(text: string, key: string): string {
    return CryptoJS.AES.encrypt(text, key).toString();
  }

  public static decrypt(ciphertext: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);

    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public static hash(text: string): string {
    return CryptoJS.SHA256(text).toString();
  }
}
