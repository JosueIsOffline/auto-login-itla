// ==UserScript==
// @name         Auto Login ITLA
// @namespace    https://github.com/JosueIsOffline
// @version      1.0.0
// @description  Automatiza el proceso de inicio de sesión en ITLA con encriptación de credenciales
// @author       JosueIsOffline
// @match        https://plataformavirtual.itla.edu.do/*
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @run-at       document-idle
// @license      MIT
// ==/UserScript==
(function () {
  "use strict";
  const STORAGE_USER = "itlaUser";
  const STORAGE_PASS = "itlaPass";
  const ENCRYPTION_KEY = getOrCreateDeviceKey();

  function getOrCreateDeviceKey() {
    const keyStorage = "itlaDeviceKey";
    let key = GM_getValue(keyStorage, null);

    if (!key) {
      // Generate a unique key based on characteristics of the navigator
      const deviceFingerprint =
        navigator.userAgent + navigator.language + screen.width + screen.height;
      key = CryptoJS.MD5(deviceFingerprint).toString();
      GM_setValue(keyStorage, key);
    }
    return key;
  }

  function encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
    } catch (error) {
      console.error("Error encriptando:", error);
      return data;
    }
  }

  function decryptData(encryptedData) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Error desencriptando:", error);
      return encryptedData;
    }
  }

  GM_registerMenuCommand("🗑 Borrar credenciales guardadas", async () => {
    await GM_setValue(STORAGE_USER, null);
    await GM_setValue(STORAGE_PASS, null);
    alert("Credenciales borradas. Recarga la página para ingresar nuevas.");
  });

  async function askCredentials() {
    let user = await GM_getValue(STORAGE_USER, null);
    let pass = await GM_getValue(STORAGE_PASS, null);

    if (user && pass) {
      user = decryptData(user);
      pass = decryptData(pass);

      if (!user || !pass || user.length < 3) {
        user = null;
        pass = null;
      }
    }

    if (!user || !pass) {
      user = prompt("Ingresa tu matrícula del ITLA:");
      pass = prompt("Ingresa tu contraseña:");

      if (user && pass) {
        const encryptedUser = encryptData(user.trim());
        const encryptedPass = encryptData(pass);
        await GM_setValue(STORAGE_USER, encryptedUser);
        await GM_setValue(STORAGE_PASS, encryptedPass);
      } else {
        alert("Debes ingresar ambos campos. Recarga para intentar de nuevo.");
        return null;
      }
    }

    return { user, pass };
  }

  async function fillLogin({ user, pass }) {
    const userInput = document.querySelector("input#username");
    const passInput = document.querySelector("input#password");
    const loginBtn = document.querySelector("button#loginbtn");

    if (userInput && passInput && loginBtn) {
      userInput.value = user;
      passInput.value = pass;

      setTimeout(() => {
        loginBtn.click();
      }, 300);
    } else {
      console.warn("No se encontraron los campos para hacer login.");
    }
  }

  (async () => {
    const creds = await askCredentials();
    if (creds) {
      fillLogin(creds);
    }
  })();
})();
