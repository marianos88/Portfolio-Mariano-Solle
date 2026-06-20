# CLAUDE.MD — Brief Técnico Unificado
## Portfolio Personal — Mariano Solle / Product Designer

> Este documento es el punto de partida para el agente de desarrollo.
> Contiene todas las decisiones tomadas en la etapa de diseño y define
> el alcance técnico del proyecto. No inventar ni asumir nada fuera de
> lo especificado aquí.

---

## 1. OBJETIVO DEL PROYECTO

Construir un **portfolio web personal y profesional** para Mariano Solle,
Product Designer especializado en apps móviles, banca digital, productos
SaaS, e-commerce, servicios y landing pages.

El sitio debe funcionar como carta de presentación para clientes y
recruiters, mostrando casos de estudio públicos y una sección privada
protegida por contraseña para proyectos bajo acuerdo NDA (Portfolio Plus).

El resultado final debe ser un sitio **publicable**, con código limpio,
mantenible y desplegable en plataformas como Vercel o Netlify.

---

## 2. REQUERIMIENTOS Y FUNCIONALIDADES

### 2.1 Secciones del sitio

| Ruta | Sección | Descripción |
|---|---|---|
| `/` | Home | Hero + grilla bento de proyectos destacados + banner Portfolio Plus |
| `/about` | Sobre mí | Texto basado en CV, herramientas, especialización por verticales |
| `/projects` | Proyectos | Grilla con todos los casos públicos (3–4 proyectos) |
| `/projects/[slug]` | Caso de estudio | Detalle individual: contexto, proceso, prototipo Figma embebido, resultado |
| `/portfolio-plus` | Portfolio Plus | Landing con formulario/campo de contraseña para desbloquear acceso |
| `/portfolio-plus/[slug]` | Caso NDA | Igual que caso público pero solo accesible con contraseña (2 proyectos) |
| `/contact` | Contacto | Formulario simple + links a LinkedIn y redes relevantes |

### 2.2 Funcionalidades obligatorias

- **Toggle de modo dark/light** visible en la navegación, con transición
  suave y persistencia de preferencia (localStorage).
- **Switch de idioma ES/EN** en la navegación, que traduce toda la
  interfaz al instante sin recargar la página.
- **Protección por contraseña** en la sección Portfolio Plus. La sección
  debe ser **visible pero bloqueada** desde afuera (no invisible), para
  generar intriga profesional. Al ingresar la contraseña correcta se
  desbloquean los casos NDA.
- **Embed de prototipos Figma** dentro de cada caso de estudio,
  presentado de forma atractiva e interactiva.
- **Diseño responsive** en todos los breakpoints (mobile, tablet, desktop).
- **Animaciones y micro-interacciones**: hover effects en cards, 
  transiciones suaves entre modos, efectos al hacer scroll.

### 2.3 Contenido

- **Proyectos públicos:** 3 a 4 casos de estudio con imágenes y
  prototipos de Figma ya desarrollados (solo requieren vinculación).
- **Portfolio Plus:** 2 casos bajo NDA, misma estructura que los públicos.
- **About:** basado en el CV existente de Mariano (sin incluir CV
  descargable), enfocado en narrative profesional y especialización.
- **Idiomas:** Español como idioma base; Inglés como segunda opción
  (switch ES/EN en nav).

---

## 3. DECISIONES DE DISEÑO

### 3.1 Estilo visual

- **Estilo general:** Bento grid modular. Layout con cards de distintos
  tamaños que crean jerarquía visual implícita. El card más grande
  (wide, span 2 columnas) se usa para el proyecto destacado.
- **Modo base:** Dark mode como default.
- **Tipografía:** Inter (Google Fonts) — pesos 300, 400, 500.
  - Títulos: `font-size` grande, `font-weight: 500`, `letter-spacing: -2px`.
  - Subtítulos/tags: `font-size: 11px`, `letter-spacing: 2px`, uppercase.
  - Cuerpo: `font-weight: 300`, `line-height: 1.7`.

### 3.2 Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `--color-mint` | `#AAEEC4` | Acento principal, tags, flechas, CTA en dark, resaltado en dark |
| `--color-off-white` | `#F8F8F8` | Fondo light, superficies en light |
| `--color-mid-gray` | `#3E3E3E` | Bordes, texto secundario en dark, fondo resaltado en light |
| `--color-dark` | `#222222` | Fondo dark base, texto principal en light, CTA en light |

### 3.3 Detalle del resaltado en el Hero

La frase destacada del hero ("de verdad." en ES / "works." en EN)
utiliza un resaltado tipo highlight con fondo de color y texto contrastante:

- **Dark mode:** `background: #AAEEC4` / `color: #3E3E3E`
- **Light mode:** `background: #3E3E3E` / `color: #AAEEC4`
- Estilos: `border-radius: 5px`, `padding: 0 8px 2px`, `display: inline`.

### 3.4 Componentes visuales clave

**Nav:**
- Logo a la izquierda: "Mariano Solle", Inter 500, 15px.
- Links a la derecha: Sobre mí / Proyectos / Portfolio plus / Contacto.
- Controles en nav (extremo derecho): switch ES|EN + toggle dark/light.
- Dark: fondo `#1a1a1a`, borde inferior `#3E3E3E`.
- Light: fondo `#FFFFFF`, borde inferior `#e0e0e0`.

**Hero:**
- Tag superior: "PRODUCT DESIGNER", uppercase, letter-spacing 2px,
  color `#AAEEC4` en dark / `#2a7a4a` en light.
- Título: ~46–50px, dos líneas, última palabra(s) con highlight.
- Descripción: 14px, 400px max-width, color `#888` en dark.
- CTAs: primario (Ver proyectos) + secundario (Sobre mí).

**Bento grid de proyectos:**
- Grid 2 columnas, gap 12px, padding 32px.
- Primer card: `grid-column: span 2` (proyecto destacado).
- Cards restantes: 1 columna c/u.
- Cada card: imagen/preview arriba + info abajo separada por borde.
- Dark: fondo card `#2e2e2e`, borde `#3E3E3E`.
- Light: fondo card `#FFFFFF`, borde `#e0e0e0`.

**Banner Portfolio Plus:**
- Posición: debajo de la grilla, antes del footer.
- Dark: fondo `#1e2e22`, borde `#AAEEC433`.
- Light: fondo `#d4f5e2`, borde `#88dda8`.
- Contenido: label "PORTFOLIO PLUS" + título + descripción + botón con 🔒.

### 3.5 UX y tendencias aplicadas

- Navegación clara y scannable: recruiters deben entender el perfil en
  segundos.
- Layouts consistentes entre secciones para reducir carga cognitiva.
- Profundidad demostrada por verticals: banca, SaaS, e-commerce —
  mostrar especialización, no generalismo.
- Micro-interacciones: hover en cards con elevación sutil, transición
  suave en toggle de modo (`transition: background 0.25s, color 0.25s`).

---

## 4. PILA TECNOLÓGICA PROPUESTA

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG, rutas dinámicas `[slug]`, ideal para portafolios con contenido mixto |
| Lenguaje | **TypeScript** | Tipado estricto, mejor mantenibilidad |
| Estilos | **Tailwind CSS v3** | Utility-first, fácil de mantener, excelente para dark/light mode |
| Animaciones | **Framer Motion** | Micro-interacciones, transiciones de página, scroll animations |
| Internacionalización | **next-intl** | Switch ES/EN sin recarga, compatible con App Router |
| Contenido | **MDX o JSON local** | Casos de estudio como archivos locales, sin CMS externo innecesario |
| Protección NDA | **Lógica custom con cookie cifrada** | Contraseña hasheada en `.env`, validación en middleware de Next.js |
| Deploy | **Vercel** | Integración nativa con Next.js, deploy automático desde GitHub |
| Control de versiones | **Git + GitHub** | Repositorio privado como base |

### Variables de entorno requeridas

```env
NEXT_PUBLIC_SITE_URL=https://marianosolle.com
PORTFOLIO_PLUS_PASSWORD_HASH=<bcrypt_hash_de_la_contraseña>
```

---

## 5. ARQUITECTURA SUGERIDA

```
marianosolle-portfolio/
│
├── public/
│   ├── images/
│   │   ├── projects/          # Imágenes de casos de estudio públicos
│   │   └── about/             # Foto o assets del about
│   └── favicon.ico
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Layout raíz: fuentes, providers, nav, footer
│   │   ├── page.tsx           # Home: hero + bento grid + banner plus
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx       # Grilla de proyectos públicos
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Caso de estudio individual
│   │   │
│   │   ├── portfolio-plus/
│   │   │   ├── page.tsx       # Landing con form de contraseña
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Caso NDA (protegido por middleware)
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   └── api/
│   │       └── unlock/
│   │           └── route.ts   # Endpoint para validar contraseña Portfolio Plus
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Nav con logo, links, switch idioma, toggle modo
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx       # Título con highlight + CTAs
│   │   │   ├── BentoGrid.tsx  # Grilla de proyectos
│   │   │   └── PlusBanner.tsx # Banner Portfolio Plus
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectGrid.tsx
│   │   │   └── FigmaEmbed.tsx # Componente para embed de prototipos Figma
│   │   │
│   │   ├── portfolio-plus/
│   │   │   └── PasswordGate.tsx # Form de contraseña + lógica de desbloqueo
│   │   │
│   │   └── ui/
│   │       ├── ThemeToggle.tsx   # Toggle dark/light
│   │       ├── LangSwitch.tsx    # Switch ES/EN
│   │       └── Highlight.tsx     # Componente de texto resaltado del hero
│   │
│   ├── content/
│   │   ├── projects/          # Datos de cada proyecto público (JSON o MDX)
│   │   │   ├── proyecto-01.json
│   │   │   ├── proyecto-02.json
│   │   │   └── ...
│   │   └── portfolio-plus/    # Datos de proyectos NDA
│   │       ├── caso-nda-01.json
│   │       └── caso-nda-02.json
│   │
│   ├── i18n/
│   │   ├── es.json            # Traducciones en español
│   │   └── en.json            # Traducciones en inglés
│   │
│   ├── lib/
│   │   ├── projects.ts        # Helpers para leer contenido de proyectos
│   │   └── auth.ts            # Lógica de validación de contraseña Portfolio Plus
│   │
│   ├── styles/
│   │   └── globals.css        # Variables CSS, fuentes, reset
│   │
│   └── middleware.ts          # Protección de rutas /portfolio-plus/[slug]
│
├── .env.local                 # Variables de entorno (no commitear)
├── .env.example               # Ejemplo de variables (sí commitear)
├── tailwind.config.ts         # Config Tailwind con colores custom y dark mode
├── next.config.ts             # Config Next.js
├── tsconfig.json
└── package.json
```

### Configuración de colores en Tailwind

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      mint:      '#AAEEC4',
      'off-white': '#F8F8F8',
      'mid-gray':  '#3E3E3E',
      dark:      '#222222',
    }
  }
}
```

### Estructura de un proyecto en JSON

```json
{
  "slug": "proyecto-01",
  "title": "Nombre del proyecto",
  "category": "Banca digital · App móvil",
  "description": "Descripción breve del caso.",
  "figmaEmbed": "https://www.figma.com/embed?embed_host=share&url=...",
  "images": ["/images/projects/proyecto-01/cover.png"],
  "featured": true,
  "tags": ["Mobile", "UX", "Banking"]
}
```

---

> **Nota para el agente:** Comenzar por instalar dependencias, configurar
> Tailwind con la paleta definida, crear el layout raíz con Navbar
> (incluyendo ThemeToggle y LangSwitch), y luego construir el Home con
> Hero y BentoGrid. Respetar estrictamente los tokens de color y la
> lógica de highlight definida en la sección 3.
