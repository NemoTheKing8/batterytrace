export async function GET() {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://batterytrace.org/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
