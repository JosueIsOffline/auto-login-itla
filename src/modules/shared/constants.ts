import { getOrCreateKey } from "../../utils/key-handler";

const ENCRYPTION_KEY = getOrCreateKey();
const STORAGE_USER = "itlaUser";
const STORAGE_PASS = "itlaPass";

export { ENCRYPTION_KEY, STORAGE_USER, STORAGE_PASS };
