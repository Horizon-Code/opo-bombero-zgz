# Opo Bombero ZGZ — versión multiusuario

Aplicación web (Next.js 14 + Supabase) para opositores a bombero del Ayuntamiento de Zaragoza: banco fijo de 27.425 preguntas del temario oficial con progreso por tema, subtema y apartado, simulacros con el formato del examen, marcas físicas con objetivos y diario de hábitos. Login con Google, datos privados por usuario.

## Arquitectura

```
Navegador (React + Recharts)
   │
   ├── src/data/estructura.json   árbol tema → subtema → apartado con los ids de sus preguntas
   │                              (pinta las bolitas y elige preguntas sin descargar el banco)
   │
   └── Supabase JS ──► Postgres
          · banco_preguntas: banco común, 27.425 preguntas del temario oficial (solo lectura, usuarios con sesión)
          · progreso: cada usuario, cada pregunta (vistas, aciertos, última respuesta)
          · resultados, marcas, objetivos, diario
          con Row Level Security + Auth con Google OAuth
```

Sin IA ni API de pago: el temario es fijo y las preguntas salen del corpus (`corpus-bombero/banco`).

### Cómo se mide el avance (las bolitas)
- **Porcentaje** = preguntas del tema, subtema o apartado cuya **última** respuesta fue correcta / total. Llega al 100 % cuando dominas todas.
- **Color** = tu acierto en lo que ya has visto: verde ≥ 80 %, ámbar 60-79 %, rojo < 60 %, gris sin empezar.
- El contenido compartido (p. ej. la Ley 31/1995 o la llave de ascensores) cuenta en su tema titular y también aparece en los temas que lo piden.

### Tests
- **De uno o varios temas** (casillas), de un **subtema** o de un **apartado** (botón «Test» en cada fila), **aleatorio** o **repaso de falladas**.
- Criterio: *inteligente* (primero falladas y no vistas), solo no vistas, solo falladas o al azar.
- Modo **práctica** (corrige cada pregunta con explicación y la frase del temario) o **examen** (corrige al final, 48 s por pregunta, se puede dejar en blanco).
- **Simulacro oficial**: 20 preguntas de la Parte I y 80 de la Parte II repartidas entre los 40 temas, 80 minutos, +0,10 / −0,025 / 0.

## Puesta en marcha

### 1. Supabase
1. Crea un proyecto en https://supabase.com (el plan gratuito sirve).
2. SQL Editor → ejecuta, en orden, `supabase/schema.sql`, `migracion_2.sql`, `migracion_3.sql` y `migracion_4.sql` (si ya tenías la app, basta con la 4).
3. Project Settings → API: copia la **URL**, la **anon key** y la **service role key** (esta última solo para cargar el banco, nunca en Vercel ni en git).

### 2. Login con Google
1. En https://console.cloud.google.com crea un proyecto → APIs & Services → Credentials → **Create OAuth client ID** (tipo "Web application").
2. En "Authorized redirect URIs" añade la que te indica Supabase en Authentication → Providers → Google (`https://TU-PROYECTO.supabase.co/auth/v1/callback`).
3. Pega el **Client ID** y el **Client Secret** en ese panel de Supabase y activa el provider.
4. Authentication → URL Configuration: añade tu dominio de producción y `http://localhost:3000` en "Redirect URLs".

### 3. Cargar el banco de preguntas
```bash
npm install
SUPABASE_SERVICE_ROLE_KEY=eyJ... node scripts/importar-banco.mjs /mnt/c/Users/ruben/Downloads/corpus-bombero/banco
```
Se puede repetir (actualiza por id). Si el banco cambia, regenera también la estructura y súbela al repo:
```bash
node scripts/generar-estructura.mjs /mnt/c/Users/ruben/Downloads/corpus-bombero
```

### 4. Local
```bash
cp .env.example .env.local   # rellena las 2 variables
npm install
npm run dev                  # http://localhost:3000
```

### 5. Producción (Vercel)
1. Sube el repo a GitHub.
2. En https://vercel.com → New Project → importa el repo.
3. Añade las 2 variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Deploy. Añade el dominio de Vercel a las Redirect URLs de Supabase (paso 2.4).

## Seguridad ya incluida
- **RLS en todas las tablas**: cada usuario solo lee y escribe su progreso, resultados, marcas y diario.
- **El banco no está en el repositorio** (es público y el temario cita literalmente manuales con licencia): vive en Supabase y solo lo leen usuarios con sesión; nadie puede modificarlo desde la app.

## Ideas de evolución
- Repetición espaciada: volver a preguntar las falladas a los 3 y 7 días.
- Restringir el acceso a una lista de correos (ahora entra cualquiera con cuenta de Google).
- Rankings opcionales entre opositores.

## Aviso
Las marcas objetivo por defecto son orientativas. Las oficiales se publican en las bases de cada convocatoria (BOPZ): ajústalas en la pestaña «Marcas físicas» cuando salgan.
