import { Crypto } from "../modules/services";

export function getOrCreateKey(): string {
  let deviceFingerPrint =
    navigator.userAgent + navigator.language + screen.width + screen.height;
  return Crypto.hash(deviceFingerPrint);
}
