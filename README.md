# ITLA Auto Login UserScript

Un userscript para automatizar el proceso de inicio de sesión en la plataforma virtual del ITLA (Instituto Tecnológico de Las Américas).

## 🚀 Características

- **Login automático**: Rellena y envía automáticamente tus credenciales
- **🔐 Almacenamiento seguro y encriptado**: Guarda tus credenciales con encriptación AES-256 en el storage interno de Tampermonkey
- **🛡️ Seguridad mejorada**: Las credenciales se encriptan usando una clave única generada para tu dispositivo
- **Gestión fácil**: Opción para borrar credenciales guardadas desde el menú
- **Compatibilidad**: Funciona con Tampermonkey, Greasemonkey y otros gestores de userscripts
- **Ligero**: Código simple y eficiente con dependencias mínimas

## 📋 Requisitos

1. Un navegador web (Chrome, Firefox, Edge, etc.)
2. Una extensión de userscripts instalada:
   - [Tampermonkey](https://www.tampermonkey.net/) (Recomendado)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)
   - [Violentmonkey](https://violentmonkey.github.io/)

## 🔧 Instalación

### Paso 1: Instalar Tampermonkey

#### Para Google Chrome:

1. Ve a [Chrome Web Store](https://chrome.google.com/webstore/category/extensions)
2. Busca "Tampermonkey"
3. Haz clic en "Agregar a Chrome"
4. Confirma haciendo clic en "Agregar extensión"
5. Verás el ícono de Tampermonkey en la barra de herramientas

#### Para Mozilla Firefox:

1. Ve a [Firefox Add-ons](https://addons.mozilla.org/)
2. Busca "Tampermonkey"
3. Haz clic en "Agregar a Firefox"
4. Confirma la instalación
5. Reinicia Firefox si es necesario

#### Para Microsoft Edge:

1. Ve a [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/)
2. Busca "Tampermonkey"
3. Haz clic en "Obtener"
4. Confirma haciendo clic en "Agregar extensión"

### Paso 2: Instalar el script ITLA Auto Login

#### Método 1: Instalación directa (Recomendado)

1. Asegúrate de tener Tampermonkey (u otro gestor) instalado
2. Haz clic en el archivo `itla-auto-login.user.js` en este repositorio
3. Haz clic en el botón "Raw"
4. Tampermonkey detectará automáticamente el script y te preguntará si quieres instalarlo
5. Haz clic en "Instalar"

#### Método 2: Instalación manual

1. Copia el código del archivo `itla-auto-login.user.js`
2. Abre Tampermonkey en tu navegador
3. Haz clic en "Crear un nuevo script"
4. Pega el código copiado
5. Presiona `Ctrl+S` para guardar

## 🎯 Uso

1. **Primera vez**: Ve a [plataformavirtual.itla.edu.do](https://plataformavirtual.itla.edu.do)
2. El script te pedirá tu matrícula y contraseña mediante ventanas emergentes
3. Ingresa tus credenciales correctas
4. El script guardará automáticamente las credenciales **encriptadas** y hará login
5. **Siguientes visitas**: El login será completamente automático

### Gestión de credenciales

#### 🗑️ Borrar credenciales guardadas (Si ingresaste datos incorrectos)

**Opción 1: Desde el menú de Tampermonkey**

1. Haz clic en el ícono de Tampermonkey en tu navegador (🐵)
2. Busca "ITLA Auto Login" en la lista
3. Haz clic en "🗑 Borrar credenciales guardadas"
4. Aparecerá un mensaje de confirmación
5. Haz clic en "Aceptar"
6. **Importante**: Recarga la página para ingresar nuevas credenciales

**Opción 2: Desactivar temporalmente el script**

1. Haz clic en el ícono de Tampermonkey (🐵)
2. Ve a "Dashboard" (Panel de control)
3. Busca "Auto Login ITLA" en la lista
4. Haz clic en el interruptor para desactivarlo (debe verse gris)
5. Ve a la plataforma del ITLA e ingresa manualmente
6. Una vez que confirmes tus credenciales correctas, reactiva el script

#### 📍 ¿Dónde encuentro el menú de Tampermonkey?

- **Chrome/Edge**: Esquina superior derecha, junto a la barra de direcciones
- **Firefox**: En la barra de herramientas (si no lo ves, haz clic derecho en la barra → Personalizar)
- El ícono es una cara de mono (🐵) o dice "TM"

## 🔐 Seguridad y Encriptación

### Características de seguridad implementadas:

#### 🛡️ Encriptación AES-256

- **Tus credenciales se almacenan completamente encriptadas** usando encriptación AES-256
- **Clave única por dispositivo**: Se genera una clave de encriptación única basada en las características de tu navegador y dispositivo
- **Sin acceso externo**: La clave nunca sale de tu computadora ni se envía a servidores externos

#### 🔒 Cómo funciona la encriptación:

1. **Generación de clave**: Se crea una clave única usando tu user agent, idioma y resolución de pantalla
2. **Encriptación**: Tus credenciales se encriptan antes de guardarse
3. **Desencriptación**: Solo tu dispositivo puede desencriptar las credenciales guardadas
4. **Protección**: Incluso si alguien accede al storage de Tampermonkey, solo verá datos encriptados

### Tu responsabilidad como usuario:

- **Mantén tus credenciales seguras**: Solo usa este script en computadoras de confianza
- **No compartas tu cuenta**: Tus credenciales son personales e intransferibles
- **Verifica la fuente**: Solo instala el script desde este repositorio oficial
- **Uso académico**: Este script está diseñado únicamente para facilitar el acceso a la plataforma educativa

### Limitaciones y garantías de privacidad:

- **📍 Almacenamiento local**: Las credenciales encriptadas se almacenan únicamente en el storage de Tampermonkey en tu computadora
- **🌐 Sin conexiones externas**: El script no envía información a servidores externos
- **💻 Solo en tu dispositivo**: Los datos permanecen exclusivamente en tu computadora
- **🔐 Encriptación robusta**: Usa estándares de encriptación reconocidos internacionalmente
- **🚫 Sin responsabilidad por mal uso**: No me hago responsable del mal uso de las credenciales
- **📋 Cumplimiento**: Cumple con las políticas de uso del ITLA

## 🔧 Solución de problemas

### El script no funciona

**Posibles causas y soluciones:**

1. **Script no se ejecuta**

   - Verifica que Tampermonkey esté habilitado
   - Confirma que el script esté activado en el panel de Tampermonkey
   - Recarga la página

2. **No aparecen las ventanas para ingresar credenciales**

   - Verifica que tu navegador permita ventanas emergentes para el dominio
   - Borra las credenciales guardadas y recarga la página

3. **El login falla constantemente**
   - **Paso 1**: Verifica que tu matrícula y contraseña sean correctas ingresando manualmente
   - **Paso 2**: Si las credenciales son correctas pero el script falla:
     - Haz clic en el ícono de Tampermonkey (🐵)
     - Selecciona "🗑 Borrar credenciales guardadas"
     - Recarga la página
     - Ingresa las credenciales nuevamente cuando se te soliciten
   - **Paso 3**: Si persiste el problema, desactiva temporalmente el script:
     - Tampermonkey → Dashboard → Busca "Auto Login ITLA" → Desactivar switch

### Errores comunes

#### ❌ "Matrícula incorrecta" o "Credenciales inválidas"

**Pasos para solucionarlo:**

1. **Primero verifica manualmente**: Ve a la plataforma y prueba ingresar a mano
2. **Si funciona manualmente, borra los datos del script**:
   - Haz clic en Tampermonkey (🐵) → "🗑 Borrar credenciales guardadas"
   - Recarga la página
   - Ingresa los datos correctos cuando aparezcan las ventanas emergentes
3. **Formato correcto de matrícula**:
   - ✅ Solo números (ej: `20231234`)
   - ❌ Sin espacios antes o después
   - ❌ Sin guiones ni otros caracteres especiales
   - ❌ No incluyas letras

#### ❌ "Contraseña incorrecta"

**Pasos para solucionarlo:**

1. **Verifica manualmente primero**: Ingresa tu contraseña a mano en la plataforma
2. **Si funciona manualmente**:
   - Tampermonkey (🐵) → "🗑 Borrar credenciales guardadas"
   - Recarga la página y reingresa la contraseña
3. **Puntos a verificar**:
   - No tengas Caps Lock activado
   - Escribe la contraseña exactamente como la tienes registrada
   - Si olvidaste tu contraseña, restablécela en la plataforma oficial primero

#### ❌ "Los campos no se rellenan automáticamente"

- La página puede haber cambiado su estructura
- Intenta recargar la página
- Verifica que estés en la URL correcta: `https://plataformavirtual.itla.edu.do/`

#### ❌ "Error de encriptación/desencriptación"

- Esto puede ocurrir si cambias de navegador o computadora
- **Solución**: Borra las credenciales guardadas y vuelve a ingresarlas
- Las credenciales están vinculadas al dispositivo específico por seguridad

### Cambiar credenciales guardadas

**Si necesitas cambiar tu matrícula o contraseña guardada:**

1. **Haz clic en el ícono de Tampermonkey** (🐵) en tu navegador
2. **Busca "ITLA Auto Login"** en el menú desplegable
3. **Haz clic en "🗑 Borrar credenciales guardadas"**
4. **Confirma** haciendo clic en "Aceptar" en la ventana emergente
5. **Recarga la página** de la plataforma ITLA
6. **Ingresa las nuevas credenciales** cuando aparezcan las ventanas emergentes

**💡 Tip**: También puedes ir a Tampermonkey → Dashboard → Buscar "Auto Login ITLA" → Desactivar el switch temporalmente si prefieres ingresar manualmente.

## 🔄 Actualización del script

El script se actualizará automáticamente a través de Tampermonkey cuando haya nuevas versiones disponibles.

Para forzar una actualización:

1. Ve al panel de Tampermonkey
2. Busca "ITLA Auto Login"
3. Haz clic en "Buscar actualizaciones"

## 🐛 Reportar problemas

Si encuentras algún problema:

1. **Verifica primero** que tus credenciales sean correctas
2. **Prueba** borrando credenciales guardadas y reingresándolas
3. **Reporta el issue** en este repositorio con:
   - Descripción del problema
   - Pasos para reproducirlo
   - Navegador y versión
   - Versión del userscript

## 📝 Notas adicionales

- **🔐 Privacidad y encriptación**: Tus credenciales se almacenan encriptadas con AES-256 únicamente en el storage de Tampermonkey en tu computadora
- **🎯 Compatibilidad**: Diseñado específicamente para la plataforma virtual del ITLA
- **⚡ Rendimiento**: Mínimo impacto en la velocidad de carga de la página
- **🔄 Actualizaciones**: Se mantiene actualizado con los cambios de la plataforma
- **💻 Código limpio**: Dependencias mínimas necesarias, código simple y mantenible
- **🛡️ Seguridad por diseño**: Implementa mejores prácticas de seguridad para proteger tus datos

## 🔐 Detalles técnicos de seguridad

### Implementación de encriptación:

- **Algoritmo**: AES-256 (Advanced Encryption Standard)
- **Biblioteca**: CryptoJS v4.1.1 desde CDN confiable
- **Generación de clave**: Hash MD5 de características únicas del dispositivo
- **Almacenamiento**: Solo datos encriptados se guardan en el storage local

### Proceso de encriptación:

1. Se genera una clave única basada en `userAgent + language + screen dimensions`
2. Las credenciales se encriptan usando AES-256 antes del almacenamiento
3. Al recuperar, se desencriptan solo cuando es necesario usar las credenciales
4. La clave de encriptación nunca se almacena en texto plano

## 📄 Licencia

MIT License - Puedes usar, modificar y distribuir este código libremente.

---

**⚠️ Disclaimer**: Este script es un proyecto independiente y no está oficialmente respaldado por el ITLA. Úsalo bajo tu propia responsabilidad y siguiendo siempre las políticas institucionales.
