# Portfolio Assets Guidelines

## Objetivo

Esta guía define la arquitectura oficial de assets del portfolio y establece las convenciones que deben seguirse en todo momento. Su propósito es evitar inconsistencias de nombres, rutas rotas, duplicación de archivos y dificultades de mantenimiento a medida que el portfolio crece con nuevos proyectos.

Seguir estas convenciones garantiza que cualquier incorporación futura de assets sea predecible, escalable y libre de errores.

---

## Estructura de carpetas

Todos los assets del sitio se organizan bajo `public/`, separados en dos ramas principales: imágenes y videos. Cada proyecto tiene su propia carpeta dentro de cada rama.

```
public/
├── images/
│   ├── shared/
│   ├── sportclub/
│   ├── mercadopago/
│   ├── ambition/
│   ├── imajine-studio/
│   ├── bank/
│   ├── internal-monitoring/
│   ├── vanish/
│   └── finish/
│
└── videos/
    ├── shared/
    ├── sportclub/
    ├── mercadopago/
    ├── ambition/
    ├── imajine-studio/
    ├── bank/
    ├── internal-monitoring/
    ├── vanish/
    └── finish/
```

---

## Convención de nombres

Todos los assets deben cumplir las siguientes reglas sin excepción:

- **Minúsculas** — nunca usar mayúsculas en ninguna parte del nombre.
- **kebab-case** — separar palabras con guiones (`-`), nunca con espacios ni guiones bajos.
- **Sin espacios** — un nombre con espacios rompe rutas en múltiples entornos.
- **Sin acentos ni caracteres especiales** — usar equivalentes sin tilde (`u` en lugar de `ú`, `o` en lugar de `ó`).
- **Nombres descriptivos** — el nombre debe indicar qué contiene el archivo, no cuándo fue creado ni en qué iteración está.
- **Evitar nombres temporales** — nombres como `nuevo`, `final`, `v2`, `copia` no aportan contexto y generan confusión.
- **Evitar incluir el nombre del proyecto dentro del archivo** — el nombre del proyecto ya está dado por la carpeta que lo contiene.

---

## Ejemplos

**Correcto:**

```
portada.png
hero.png
hero-video.mp4
user-flow.png
wireframes-alta.png
wireframes-baja.png
research-overview.png
mapa-empatia.png
identidad-visual.png
competidores.png
```

**Incorrecto:**

```
Portada-Meli.png        # mayúsculas y nombre del proyecto en el archivo
FINAL.png               # mayúsculas y nombre no descriptivo
nuevo.png               # nombre temporal sin contexto
imagen-final.png        # nombre ambiguo
Video Sportclub.mp4     # espacios y nombre del proyecto en el archivo
wireframes_alta.png     # guion bajo en lugar de kebab-case
```

---

## Organización de assets

Cada proyecto debe mantener completamente separados sus imágenes y sus videos. No deben mezclarse assets entre proyectos ni combinarse imágenes con videos dentro de una misma carpeta.

**Recursos reutilizables entre proyectos** — logos, backgrounds, texturas, íconos, mockups genéricos y animaciones comunes — deben almacenarse exclusivamente en:

```
public/images/shared/
public/videos/shared/
```

Nunca colocar un asset reutilizable dentro de la carpeta de un proyecto específico.

---

## Flujo de migración

Este es el proceso oficial para incorporar o migrar assets de cualquier proyecto:

1. **Preparar assets localmente** — exportar o recopilar todos los archivos necesarios antes de subirlos.
2. **Renombrar siguiendo la convención** — aplicar kebab-case, minúsculas, sin acentos y nombres descriptivos antes del primer commit.
3. **Subir assets al repositorio** — colocarlos en la carpeta correspondiente dentro de `public/images/<proyecto>/` o `public/videos/<proyecto>/`.
4. **Actualizar referencias** — modificar los archivos JSON del proyecto y cualquier componente que apunte a las rutas anteriores.
5. **Ejecutar build** — correr `next build` localmente para confirmar que no existen errores de TypeScript ni rutas rotas.
6. **Validar visualmente** — verificar en el entorno de preview (Vercel) que todas las imágenes y videos cargan correctamente.
7. **Eliminar assets antiguos** — solo después de validar en producción, eliminar los archivos de la ubicación anterior mediante `git rm` y commitear la limpieza por separado.

---

## Checklist

Usar esta checklist antes de considerar terminada la migración o incorporación de assets de cualquier proyecto:

### Assets
- [ ] Todos los archivos siguen la convención kebab-case y minúsculas.
- [ ] Ningún nombre contiene espacios, acentos ni mayúsculas.
- [ ] Ningún nombre incluye el nombre del proyecto (ya lo define la carpeta).
- [ ] Imágenes y videos están en carpetas separadas (`images/` y `videos/`).
- [ ] Los assets reutilizables están en `shared/` y no en carpetas de proyecto.

### Referencias
- [ ] Todas las rutas en los archivos JSON apuntan a la nueva ubicación.
- [ ] No queda ninguna referencia a rutas antiguas en `src/`.
- [ ] No hay imports rotos en componentes ni páginas.

### Build y validación
- [ ] `next build` finaliza sin errores.
- [ ] No hay errores de TypeScript.
- [ ] El proyecto se visualiza correctamente en preview.
- [ ] Todas las imágenes cargan sin errores 404.
- [ ] Todos los videos reproducen correctamente.

### Limpieza
- [ ] Los assets antiguos fueron eliminados del repositorio con `git rm`.
- [ ] El commit de limpieza es independiente del commit de actualización de referencias.
