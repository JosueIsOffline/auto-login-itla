import { getOrCreateKey } from "./utils/key-handler";
import { MonkeyStorage } from "./modules/services";
import { STORAGE_PASS, STORAGE_USER } from "./modules/shared/constants";
import { AutoLogin, CoursePointsTracker } from "./modules/plugins";
import { Core } from "./core/core";

const mStorage = new MonkeyStorage();
const style = GM_getResourceText("INTERNAL_CSS");
GM_addStyle(style);

GM_registerMenuCommand("🗑 Borrar credenciales guardadas", async () => {
  await mStorage.set(STORAGE_USER, null);
  await mStorage.set(STORAGE_PASS, null);
  alert("Credenciales borradas. Recarga la página para ingresar nuevas.");
});

(async () => {
  const core = new Core();
  core.register([new AutoLogin(), new CoursePointsTracker()]);
  await core.init();
})();
