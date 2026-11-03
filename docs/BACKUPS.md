# Copias de seguridad

El plan gratuito de Supabase no hace backups. El workflow `.github/workflows/backup-supabase.yml`
hace uno cada noche (02:17 UTC), lo cifra y lo guarda 90 días como *artifact* en GitHub Actions.

## Qué se guarda
| Fichero dentro del backup | Contenido |
|---|---|
| `public.sql` | Esquema `public` completo con todos sus datos: `progreso`, `reportes_preguntas`, `resultados`, `marcas`, `objetivos`, `diario`, `uso_api` y `banco_preguntas` (hace falta para que se puedan restaurar las claves ajenas de progreso y reportes) |
| `auth.sql` | Datos de `auth.users` y `auth.identities` (las cuentas de Google). El progreso va ligado al id de usuario: sin esto quedaría huérfano |

Comprimido y cifrado ocupa unos pocos MB.

## Puesta en marcha (una vez)
1. Supabase → botón **Connect** → pestaña *Connection string* → **Session pooler** → copia la URI
   (`postgresql://postgres.trmogvhslmtcsezrdxxl:[YOUR-PASSWORD]@aws-…pooler.supabase.com:5432/postgres`)
   y sustituye `[YOUR-PASSWORD]` por la contraseña de la base de datos
   (si no la recuerdas: Project Settings → Database → *Reset database password*).
   > Usa el *Session pooler*, no la conexión directa: en el plan gratuito la directa es solo IPv6 y GitHub no llega.
2. GitHub → repo → Settings → Secrets and variables → Actions → **New repository secret**:
   - `SUPABASE_DB_URL` = la URI del paso 1
   - `BACKUP_PASSPHRASE` = una contraseña larga (p. ej. `openssl rand -base64 32`).
     **Guárdala también en tu gestor de contraseñas**: sin ella los backups no se pueden abrir.
3. Actions → *Backup Supabase* → **Run workflow** para probarlo. Debe acabar en verde y dejar un artifact `backup-AAAA-MM-DD`.

> El repo es público: cualquiera con cuenta de GitHub puede descargar los artifacts, por eso van cifrados.
> Nunca añadas al workflow un paso que imprima datos en el log.
>
> GitHub desactiva los workflows programados de un repo público tras 60 días sin commits.
> Si pasa, te avisa por email: basta con volver a activarlo en la pestaña Actions.

## Restaurar
```bash
# 1. Descargar el artifact desde Actions (o con gh) y descifrar
gh run download --repo Horizon-Code/opo-bombero-zgz -n backup-2026-11-04
gpg --decrypt backup-2026-11-04.tar.gz.gpg > backup.tar.gz   # pide BACKUP_PASSPHRASE
mkdir backup && tar -xzf backup.tar.gz -C backup

# 2a. Recuperar SOLO una tabla en el proyecto actual (p. ej. progreso borrado por error):
#     extrae su bloque COPY de public.sql y cárgalo en una tabla temporal para comparar/restaurar.

# 2b. Restaurar en un proyecto NUEVO de Supabase (con el login de Google ya configurado):
psql "$NUEVA_DB_URL" -v ON_ERROR_STOP=1 -f backup/auth.sql     # primero las cuentas
psql "$NUEVA_DB_URL" -v ON_ERROR_STOP=1 -f backup/public.sql   # luego esquema + datos (incluye el banco)
```
Usa `psql` 17 o superior.
