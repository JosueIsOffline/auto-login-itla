# 🚀 ITLA Plus

Suite modular de herramientas para mejorar la experiencia en la plataforma virtual del ITLA. Desarrollado en TypeScript como un userscript profesional compatible con Tampermonkey y otros gestores.

## Descripción General

**ITLA Plus** es una suite de plugins diseñada para optimizar y enriquecer la experiencia del estudiante en la plataforma virtual del ITLA. Su arquitectura modular permite añadir nuevas funcionalidades de forma independiente, sin comprometer los módulos existentes ni el rendimiento general.


## Características Principales

- **Arquitectura modular**: Cada funcionalidad se implementa como un plugin independiente
- **Encriptación robusta**: Almacenamiento seguro de credenciales con AES-256
- **Actualizaciones automáticas**: Recibe mejoras sin intervención manual
- **Clave única por dispositivo**: Generada mediante fingerprint del navegador
- **100% local**: Sin conexiones externas, todo procesa en tu dispositivo
- **Máxima compatibilidad**: Tampermonkey, Greasemonkey y Violentmonkey


## Plugins Disponibles

### 🔐 AutoLogin

Automatiza el proceso de inicio de sesión en la plataforma virtual.

**Características:**

- Almacenamiento cifrado de matrícula y contraseña
- Autenticación automática en visitas posteriores
- Gestión sencilla de credenciales desde el menú
- Eliminación segura de datos almacenados

### 📊 Points Tracker

Visualiza el acumulado de calificaciones por curso en tiempo real.

**Características:**

- Contador flotante con actualización automática
- Sistema de indicadores visuales por rendimiento:
  - 🟢 Verde: 80 puntos o más
  - 🟠 Naranja: 70–79 puntos
  - 🔴 Rojo: Menos de 70 puntos
- Interfaz minimalista y no intrusiva

### 🗓️ Export Assignments  
Sincroniza automáticamente tus asignaciones con **Google Calendar** para recibir recordatorios antes de la fecha de entrega.

**Características:**
- Creación automática de eventos para cada asignación del aula virtual  
- Recordatorios por correo (2 días antes) y notificación emergente (2 horas antes)  
- Sincronización segura mediante **OAuth 2.0**  
- Integración transparente con tu cuenta de Google  

> [!WARNING]  
> Esta integración utiliza un permiso sensible de Google Calendar.  
> Es posible que al iniciar sesión, Google muestre una advertencia indicando que la aplicación no ha sido verificada aún.  
> Puedes continuar de forma segura: ITLA Plus **solo accede a tu calendario personal para crear eventos académicos** y **no almacena ni comparte tus datos**.

## Arquitectura Técnica

### Estructura del Proyecto

```
src/
├── core/
│   ├── Plugin.ts              # Gestor central de plugins
│   └── core.ts                # Ciclo de vida y hooks
├── modules/
│   ├── plugins/
│   │   ├── AutoLogin.plugin.ts       # Plugin de autenticación
│   │   └── PointsTracker.plugin.ts   # Plugin de calificaciones
│   ├── services/
│   │   ├── Crypto.ts          # Servicio de encriptación
│   │   ├── MonkeyStorage.ts   # Gestión de almacenamiento
│   │   └── DOM.ts             # Manipulación del DOM
│   ├── utils/
│   │   └── helpers.ts         # Utilidades compartidas
│   └── shared/
│       ├── constants.ts       # Constantes globales
└── index.ts                    # Punto de entrada principal
```

### Interfaz de Plugin

Cada plugin debe implementar esta interfaz para integrarse al sistema:

```typescript
export interface Plugin {
  name: string; // Identificador único
  shouldRun(): boolean; // Condición de ejecución
  init(): Promise<void> | void; // Inicialización
}
```

Esta estructura garantiza consistencia, escalabilidad y facilita el mantenimiento del código.

## 📦 Instalación

### Requisitos Previos

Necesitas un gestor de userscripts instalado en tu navegador.

### Paso 1: Instalar Tampermonkey

Elige tu navegador:

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/tampermonkey/)
- **Edge**: [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey)
- **Safari/Opera**: Disponible en sus respectivas tiendas de extensiones

### Paso 2: Instalar ITLA Plus
**Método automático (recomendado):**

Haz clic en el siguiente enlace:

**[▶️ Instalar ITLA Plus](https://github.com/JosueIsOffline/itla-plus/releases/latest/download/itla-plus.user.js)**

Tampermonkey abrirá automáticamente la ventana de instalación. Confirma haciendo clic en **"Instalar"**.

**Método manual:**

1. Abre Tampermonkey y selecciona **"Crear un nuevo script"**
2. Descarga el archivo `itla-plus.user.js` desde [releases](https://github.com/JosueIsOffline/itla-plus/releases)
3. Copia el contenido completo del archivo
4. Pega en el editor de Tampermonkey
5. Guarda con `Ctrl + S` (o `Cmd + S` en Mac)

## Actualizaciones Automáticas

El script está configurado para recibir actualizaciones automáticas. Tampermonkey detectará nuevas versiones y las descargará sin intervención. Tendrás acceso a nuevos plugins y mejoras de forma transparente.

## Uso

**Primera ejecución:**

- AutoLogin solicitará tu matrícula y contraseña (se guardan cifradas localmente)

**Siguientes visitas:**

- Acceso automático sin necesidad de introducir credenciales
- Points Tracker mostrará tu acumulado al entrar en cada curso

## 🔒 Seguridad y Privacidad

| Aspecto                 | Detalles                                                           |
| ----------------------- | ------------------------------------------------------------------ |
| **Encriptación**        | AES-256 mediante CryptoJS                                          |
| **Clave de cifrado**    | Generada con fingerprint único del navegador                       |
| **Almacenamiento**      | Solo en el storage de Tampermonkey (sin sincronización en la nube) |
| **Conexiones externas** | Ninguna. Todo procesa localmente                                   |
| **Rastreo**             | No se recopilan datos de uso                                       |

**Recomendaciones de seguridad:**

- Usa el script solo en dispositivos personales de confianza
- Si cambias de dispositivo, elimina las credenciales guardadas desde Tampermonkey
- No compartas tu dispositivo si tienes credenciales almacenadas

## Contribuir

Este proyecto está abierto a contribuciones. Si deseas agregar nuevas funcionalidades o mejorar las existentes, sigue estas pautas:

### Cómo Contribuir

1. Haz **fork** del repositorio en GitHub
2. Crea una rama para tu funcionalidad: `git checkout -b feature/nueva-funcionalidad`
3. Implementa tu código siguiendo la estructura de plugins existente
4. Asegúrate de que tu plugin implemente la interfaz `Plugin`
5. Realiza un **Pull Request** describiendo los cambios realizados

### Directrices de Desarrollo

- El código debe estar en TypeScript
- Mantén la estructura modular: cada plugin en su archivo independiente
- Incluye JSDoc para funciones públicas
- Verifica que no afecte el rendimiento de otros plugins
- Documenta cualquier dependencia nueva que agregues

## 🐛 Reportar Problemas

¿Encontraste un bug o tienes una sugerencia? Abre un issue en [GitHub Issues](https://github.com/JosueIsOffline/itla-plus/issues).

**Por favor incluye:**

- Descripción clara del problema o sugerencia
- Pasos para reproducir (si es un bug)
- Versión del navegador y del script
- Capturas de pantalla si es relevante

## Licencia

MIT License — Uso libre con atribución.

Este es un proyecto independiente no afiliado oficialmente al ITLA.

## Autor

Desarrollado por **[Josué Hernández](https://github.com/JosueIsOffline)**

Estudiante de Desarrollo de Software — ITLA
