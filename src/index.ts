import { GoogleAuth, MonkeyStorage } from "./modules/services";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_SCOPE,
  STORAGE_PASS,
  STORAGE_USER,
  WORKER_URL,
} from "./modules/shared/constants";
import {
  AutoLogin,
  CoursePointsTracker,
  ExportAssignments,
} from "./modules/plugins";
import { Core } from "./core/core";
import { openSettingsModal, UI } from "./modules/components";
import { SettingsModal } from "./modules/components/settings-modal";

const mStorage = new MonkeyStorage();
const auth = new GoogleAuth(WORKER_URL);

const style = GM_getResourceText("INTERNAL_CSS");
GM_addStyle(style);

GM_registerMenuCommand("⚙️ Configuración ITLA Plus", () => {
  const modal = new SettingsModal(auth, mStorage);
  modal.mount();

  UI.toggle(modal);
});

(async () => {
  const existingToken = await mStorage.get("googleTokenData");

  let token = existingToken ? await auth.getValidToken() : null;

  if (token) {
    setInterval(
      async () => {
        token = await auth.getValidToken();
      },
      50 * 60 * 1000,
    );
  }

  const core = new Core();
  core.register([
    new AutoLogin(),
    new CoursePointsTracker(),
    new ExportAssignments(token),
  ]);

  await core.init();
})();
