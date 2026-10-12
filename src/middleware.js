import { NextResponse } from "next/server";

// Red de seguridad del login con Google.
// La app pide a Supabase volver a /app, pero si esa dirección no está en la lista de
// «Redirect URLs» de Supabase, Supabase devuelve al usuario a la «Site URL» (la portada)
// con el código de login (?code=…). La portada no inicia sesión, así que el usuario se
// quedaba en la landing. Aquí se le pasa a /app con el mismo código y la sesión se completa.
export function middleware(req) {
  const { searchParams } = req.nextUrl;
  if (searchParams.has("code") || searchParams.has("error_description")) {
    const url = req.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };
