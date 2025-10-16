// ==UserScript==
// @name         Auto Login ITLA Dev
// @namespace    https://github.com/JosueIsOffline
// @version      2.0.0
// @description  Automatiza el proceso de inicio de sesión en ITLA con encriptación de credenciales
// @author       JosueIsOffline
// @match        https://plataformavirtual.itla.edu.do/*
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @connect      raw.githubusercontent.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @resource     INTERNAL_CSS https://raw.githubusercontent.com/JosueIsOffline/auto-login-itla/refs/heads/main/styles.css
// @run-at       document-idle
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    class Crypto {
        static encrypt(text, key) {
            return CryptoJS.AES.encrypt(text, key).toString();
        }
        static decrypt(ciphertext, key) {
            const bytes = CryptoJS.AES.decrypt(ciphertext, key);
            return bytes.toString(CryptoJS.enc.Utf8);
        }
        static hash(text) {
            return CryptoJS.SHA256(text).toString();
        }
    }

    class DOM {
        static async waitForElement(selector, timeout = 5000) {
            return new Promise((resolve) => {
                const element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                    return;
                }
                const observer = new MutationObserver(() => {
                    const element = document.querySelector(selector);
                    if (element) {
                        observer.disconnect();
                        clearTimeout(timeoutId);
                        resolve(element);
                    }
                });
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
                const timeoutId = setTimeout(() => {
                    observer.disconnect();
                    resolve(null);
                }, timeout);
            });
        }
        static async waitForElements(selectors, timeout = 5000) {
            return Promise.all(selectors.map((selector) => this.waitForElement(selector, timeout)));
        }
        static fillInput(input, value) {
            input.value = value;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
        }
        static safeClick(element) {
            if (typeof element.click === "function") {
                element.click();
            }
            else {
                const event = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                });
                element.dispatchEvent(event);
            }
        }
        static getInput(identifier) {
            let input = document.querySelector(`input[name="${identifier}"]`);
            if (!input) {
                input = document.querySelector(`#${identifier}`);
            }
            if (!input) {
                input = document.querySelector(identifier);
            }
            return input;
        }
        static getButton(identifier) {
            let button = document.querySelector(`#${identifier}`);
            if (!button) {
                button = document.querySelector(identifier);
            }
            if (!button) {
                const buttons = Array.from(document.querySelectorAll("button"));
                button =
                    buttons.find((btn) => btn.textContent
                        ?.trim()
                        .toLowerCase()
                        .includes(identifier.toLowerCase())) || null;
            }
            return button;
        }
        static isOnPage(urlPattern) {
            const pattern = urlPattern.replace(/\*/g, ".*").replace(/\?/g, "\\?");
            const regex = new RegExp(pattern);
            return regex.test(window.location.href);
        }
        static onDOMReady(callback) {
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", callback);
            }
            else {
                callback();
            }
        }
        static observerElemnt(element, callback, options = {
            childList: true,
            subtree: true,
            attributes: true,
        }) {
            const observer = new MutationObserver(callback);
            observer.observe(element, options);
            return observer;
        }
    }

    class MonkeyStorage {
        async set(key, value) {
            const serialized = JSON.stringify(value);
            await GM.setValue(key, serialized);
        }
        async get(key, defaultValue) {
            const serialized = await GM.getValue(key, null);
            if (serialized === null) {
                return defaultValue ?? null;
            }
            try {
                return JSON.parse(serialized);
            }
            catch (e) {
                console.error(`Error parsing key "${key}":`, e);
                return defaultValue ?? null;
            }
        }
        async remove(key) {
            await GM.deleteValue(key);
        }
        async has(key) {
            return await GM.listValues().then((values) => values.includes(key));
        }
        async clear() {
            await GM.listValues().then((values) => values.forEach((value) => this.remove(value)));
        }
        async keys() {
            return await GM.listValues();
        }
    }

    function getOrCreateKey() {
        let deviceFingerPrint = navigator.userAgent + navigator.language + screen.width + screen.height;
        return Crypto.hash(deviceFingerPrint);
    }

    const ENCRYPTION_KEY = getOrCreateKey();
    const STORAGE_USER = "itlaUser";
    const STORAGE_PASS = "itlaPass";

    class AutoLogin {
        name = "AutoLogin";
        storage = new MonkeyStorage();
        shouldRun() {
            return DOM.isOnPage("https://plataformavirtual.itla.edu.do/login/*");
        }
        async init() {
            const creds = await this.asycAskCredentials();
            if (creds)
                this.login(creds);
        }
        async asycAskCredentials() {
            let user = await this.storage.get(STORAGE_USER);
            let pass = await this.storage.get(STORAGE_PASS);
            if (user && pass) {
                user = Crypto.decrypt(user, ENCRYPTION_KEY);
                pass = Crypto.decrypt(pass, ENCRYPTION_KEY);
                if (!user || !pass || user.length < 8) {
                    user = null;
                    pass = null;
                }
            }
            if (!user || !pass) {
                user = prompt("Ingresa tu matrícula del ITLA:");
                pass = prompt("Ingresa tu contraseña:");
                if (user && pass) {
                    const encryptedUser = Crypto.encrypt(user, ENCRYPTION_KEY);
                    const encryptedPass = Crypto.encrypt(pass, ENCRYPTION_KEY);
                    await this.storage.set(STORAGE_USER, encryptedUser);
                    await this.storage.set(STORAGE_PASS, encryptedPass);
                }
                else {
                    alert("Debes ingresar ambos campos. Recarga para intentar de nuevo.");
                    return null;
                }
            }
            return {
                user,
                pass,
            };
        }
        login({ user, pass }) {
            if (!user || !pass) {
                console.error("Username or password wans't provide");
                return;
            }
            const userInput = DOM.getInput("username");
            const passInput = DOM.getInput("password");
            const loginBtn = DOM.getButton("Log in");
            if (userInput && passInput && loginBtn) {
                DOM.fillInput(userInput, user);
                DOM.fillInput(passInput, pass);
                setTimeout(() => {
                    loginBtn.click();
                }, 200);
            }
        }
    }

    class CoursePointsTracker {
        name = "CoursePointsTracker";
        url = "";
        shouldRun() {
            return DOM.isOnPage("https://plataformavirtual.itla.edu.do/course/view.php?id=*");
        }
        async init() {
            const grades = await this.getGrades();
            this.createBoxComponent(grades, this.url);
        }
        async getGrades() {
            try {
                const url = await DOM.waitForElement(".list-group [data-key='grades']");
                if (!url) {
                    console.warn(`[${this.name}] No subject selected`);
                    return 0;
                }
                this.url = url.href;
                const data = await GM.xmlHttpRequest({ url: url.href });
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.responseText, "text/html");
                const grades = Array.from(doc.querySelectorAll(".user-grade .column-grade"));
                let total = 0;
                for (let grade of grades) {
                    const absoluteGrade = parseFloat(grade.innerText);
                    if (!isNaN(absoluteGrade) && absoluteGrade <= 20) {
                        total += absoluteGrade;
                    }
                }
                return Math.round(total);
            }
            catch (err) {
                console.error(`[${this.name}] Error getting table grades`, err);
                return 0;
            }
        }
        async createBoxComponent(accumGrade, url) {
            const div = document.createElement("div");
            div.id = "custom-container";
            div.innerHTML = `
        <p>
          Acumulado: <span id="custom-grade">0</span>
        </p>
    `;
            document.addEventListener("click", () => {
                window.location.href = url;
            });
            document.body.appendChild(div);
            const customGrade = await DOM.waitForElement("#custom-grade");
            if (customGrade) {
                this.animateCounter(customGrade, accumGrade);
                this.gradeStatus(customGrade, accumGrade);
                customGrade?.classList.remove("animate");
                void customGrade?.offsetWidth;
                customGrade?.classList.add("animate");
            }
        }
        animateCounter(element, total) {
            let current = 0;
            const increment = Math.ceil(total / 20);
            const interval = setInterval(() => {
                current += increment;
                if (current >= total) {
                    current = total;
                    clearInterval(interval);
                }
                element.innerText = String(current);
            }, 50);
        }
        gradeStatus(element, grade) {
            if (grade >= 80) {
                element.style.color = "green";
            }
            else if (grade >= 70) {
                element.style.color = "orange";
            }
            else {
                element.style.color = "red";
            }
        }
    }

    class Core {
        plugins = [];
        register(plugins) {
            this.plugins = plugins;
        }
        async init() {
            for (const plugin of this.plugins) {
                try {
                    if (plugin.shouldRun()) {
                        console.log(`[Core] Running plugin: ${plugin.name}`);
                        await plugin.init();
                    }
                }
                catch (error) {
                    console.error(`[Core] Error in plugin ${plugin.name}:`, error);
                }
            }
        }
    }

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

})();
//# sourceMappingURL=itla-plus.user.js.map
