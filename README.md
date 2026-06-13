# Opo Bombero ZGZ — versión multiusuario

Aplicación web (Next.js 14 + Supabase) para opositores a bombero del Ayuntamiento de Zaragoza: tests con IA generados del temario, estadísticas por tema, marcas físicas con objetivos y diario de hábitos. Login con Google, datos privados por usuario.

## Arquitectura

```
Navegador (React + Recharts)
   │
   ├── Supabase JS  ──► Postgres (temas, resultados, marcas, objetivos, diario)
   │                    con Row Level Security: cada usuario solo ve lo suyo
   │                    + Auth con Google OAuth
   │
   └── /api/generate-test (Next.js, servidor)
            └──► API de Anthropic (la clave NUNCA sale del servidor)
                 con límite de 20 tests/usuario/día (tabla uso_api)
```

## Puesta en marcha (≈30 minutos)

### 1. Supabase
1. Crea un proyecto en https://supabase.com (plan gratuito sirve para empezar).
2. SQL Editor → pega y ejecuta `supabase/schema.sql` (crea tablas + RLS).
3. Project Settings → API: copia la **URL** y la **anon key**.

### 2. Login con Google
1. En https://console.cloud.google.com crea un proyecto → APIs & Services → Credentials → **Create OAuth client ID** (tipo "Web application").
2. En "Authorized redirect URIs" añade la que te indica Supabase en:
   Authentication → Providers → Google (es del tipo `https://TU-PROYECTO.supabase.co/auth/v1/callback`).
3. Copia el **Client ID** y **Client Secret** de Google y pégalos en ese mismo panel de Supabase. Activa el provider.
4. En Supabase → Authentication → URL Configuration: añade tu dominio de producción (y `http://localhost:3000` para desarrollo) en "Redirect URLs".

### 3. Clave de Anthropic
1. En https://console.anthropic.com crea una API key.
2. Ponle un **límite de gasto mensual** en la consola (Billing → Limits). Con Sonnet, un test de 10 preguntas cuesta del orden de céntimos, pero si abres la app a más gente, el límite diario por usuario (constante `LIMITE_DIARIO` en `src/app/api/generate-test/route.js`) y el tope de gasto son tu red de seguridad.

### 4. Local
```bash
cp .env.example .env.local   # rellena las 3 variables
npm install
npm run dev                  # http://localhost:3000
```

### 5. Producción (Vercel)
1. Sube el repo a GitHub.
2. En https://vercel.com → New Project → importa el repo.
3. Añade las 3 variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ANTHROPIC_API_KEY`).
4. Deploy. Añade el dominio de Vercel a las Redirect URLs de Supabase (paso 2.4).

## Seguridad ya incluida
- **RLS en todas las tablas**: aunque alguien manipule el cliente, Postgres solo le devuelve sus filas.
- **API key de Anthropic solo en servidor**: el navegador llama a `/api/generate-test`, nunca a Anthropic.
- **Generación solo para usuarios autenticados** + límite diario por usuario.

## Ideas de evolución
- Subida de PDF del temario con extracción de texto en el servidor (en vez de pegar texto).
- Repetición espaciada: re-preguntar automáticamente las falladas a los 3 y 7 días.
- Rankings opcionales entre opositores (tabla pública con consentimiento).
- Plan semanal precargado por fases con check de cumplimiento.
- Pagos (Stripe) si quieres convertirlo en producto para otros opositores.

## Aviso
Las marcas objetivo por defecto son orientativas. Las oficiales se publican en las bases de cada convocatoria (BOPZ): ajústalas en la pestaña «Marcas físicas» cuando salgan.
