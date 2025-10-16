declare const CryptoJS: {
  AES: {
    encrypt(
      message: string,
      key: string,
    ): {
      toString(): string;
    };
    decrypt(
      cipherText: string,
      key: string,
    ): {
      toString(encode: typeof CryptoJS.enc.Utf8): string;
    };
  };
  enc: {
    Utf8: any;
  };
  SHA256(message: string): {
    toString(): string;
  };
};

export default CryptoJS;
