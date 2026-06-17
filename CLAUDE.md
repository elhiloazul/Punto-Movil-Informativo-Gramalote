# Contexto del Proyecto: Punto Movil Informativo Gramalote

Aplicación Angular 19 que funciona como cliente kiosco interactivo para la campaña de Gramalote. Se ejecuta en dispositivos físicos con pantalla táctil y consume la API del backend `apps/kiosco` del monorepo `kiosco-system`.

---

## 🏗️ Arquitectura General

- **Framework:** Angular 19, standalone components, sin NgModules.
- **Renderizado:** SSR configurado (Angular Universal + Express), aunque el modo principal es cliente.
- **Persistencia local:** `localStorage` vía `UserProgressService`.
- **Backend:** API NestJS en `kiosco-system/apps/kiosco`. Todos los datos dinámicos vienen de ahí.
- **Autenticación:** Header `x-api-key` con el API Key del kiosco registrado.

---

## 📁 Estructura de Carpetas

```
src/app/
├── components/          # Componentes reutilizables
│   ├── footer/          # Barra inferior (volumen, inicio, repetir, gamepad)
│   ├── header/          # Encabezado
│   ├── inactive/        # Pantalla de inactividad
│   ├── mic/             # Visualizador de micrófono
│   └── slide-*-component/  # Renderizadores por tipo de slide
│       ├── slide-text-component/
│       ├── slide-video-component/
│       ├── slide-image-component/
│       ├── slide-document-component/
│       └── slide-custom-component/
│           └── games/   # Juegos interactivos embebidos
├── pages/               # Páginas principales (rutas)
│   ├── home/            # Onboarding + tutorial de footer
│   ├── menu/            # Menú de actividades + tutorial de menú
│   └── activity-orchestrator/  # Ejecutor de actividades/slides
├── services/            # Servicios de negocio
├── core/logger/         # Logger con niveles configurables
├── models/              # Interfaces TypeScript
└── environments/        # Configuración por ambiente
```

---

## 🔄 Flujo de Navegación

```
/home  →  /menu  →  /activity/:id  →  /menu
```

1. `/home` — Recoge nombre, edad y dirección del usuario vía voz o teclado. Muestra tutorial del footer si es la primera vez.
2. `/menu` — Lista las actividades disponibles. Muestra tutorial del menú si es la primera vez.
3. `/activity/:id` — Orquesta y renderiza los slides de la actividad seleccionada.
4. Al terminar o por inactividad → regresa a `/menu` o `/home`.

---

## 🌐 Integración con el Backend

### Endpoint principal
```
GET /kiosk/v1/menu
x-api-key: <apiKey del kiosco>
```
Retorna las actividades configuradas como menú, ordenadas por `menuOrder`, con su `menuConfig` (audio del tutorial y descripción del popover).

### Configuración en `environment.ts`
```typescript
export const environment = {
  apiUrl: 'http://localhost:3000',   // URL del backend
  apiKey: '<api-key-del-kiosco>',    // API Key del kiosco registrado
  // ...resto de campos
};
```

### Interceptor HTTP
Existe un interceptor que adjunta automáticamente el header `x-api-key` a todas las requests al backend. No es necesario agregarlo manualmente en cada servicio.

---

## 🛠️ Servicios Clave

| Servicio | Responsabilidad |
|:---------|:----------------|
| `ActivityService` | Obtiene actividades/menú desde el backend (`GET /kiosk/v1/menu`) |
| `TutorialService` | Define los pasos del tutorial de driver.js — los datos del menú vienen de la API |
| `UserProgressService` | Gestiona estado del usuario en `localStorage` (introSeen, menuSeen, completedActivities) |
| `SlideNavigationService` | Controla navegación entre slides (índice actual, canGoBack) |
| `VoiceService` | Web Speech API — reconocimiento de voz en español |
| `InactivityService` | Timeout de 3 minutos — resetea al usuario a `/home` |
| `OpenaiService` | Síntesis de voz (TTS) usando OpenAI |

---

## 📋 Reglas de Desarrollo

1. **Standalone components:** Todos los componentes usan `standalone: true`. Sin NgModules.
2. **Control Flow moderno:** Usar `@if`, `@for`, `@switch`. No usar `*ngIf`, `*ngFor`.
3. **Signals para estado local:** Usar `signal()` y `computed()`. No usar `BehaviorSubject` para estado de componente.
4. **HTTP solo desde servicios:** Nunca hacer llamadas HTTP directamente desde un componente.
5. **API Key nunca hardcodeada:** Siempre desde `environment.apiKey`.
6. **`localStorage` solo en `UserProgressService`:** No acceder a `localStorage` desde otros servicios o componentes.
7. **Tipado estricto:** No usar `any`. Definir interfaces en `models/`.

---

## 🔐 Seguridad

- La `apiKey` del kiosco se configura en `environment.ts` y se adjunta vía interceptor.
- La API key de OpenAI **no debe estar en el código fuente**. Debe venir de una variable de entorno del servidor (SSR) o de un endpoint proxy en el backend.

---

## 🧩 Tipos de Slides

El orquestador renderiza dinámicamente el componente correcto según el tipo:

| Tipo | Componente |
|:-----|:-----------|
| `text` | `SlideTextComponentComponent` |
| `video` | `SlideVideoComponentComponent` |
| `image` | `SlideImageComponentComponent` |
| `document` | `SlideDocumentComponentComponent` |
| `custom` | `SlideCustomComponentComponent` |

---

## 📦 Dependencias Notables

- **driver.js** — Tutoriales interactivos con highlights y popovers
- **Angular Material** — Componentes UI base
- **RxJS** — Reactividad y observables
- **Web Speech API** — Reconocimiento de voz nativo del navegador
- **OpenAI TTS** — Síntesis de voz de alta calidad
