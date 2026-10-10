import { SITE } from "../lib/site";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/app"] }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
