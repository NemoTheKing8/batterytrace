import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import { validateAll } from './src/schemas.ts';

// Build-time data validation (wrapped for Vercel compatibility)
const brandsData = JSON.parse(fs.readFileSync('./src/data/brands.json', 'utf-8'));
const productsData = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf-8'));
const metricsData = JSON.parse(fs.readFileSync('./src/data/metrics.json', 'utf-8'));
const result = validateAll(brandsData, productsData, metricsData);
if (!result.ok) {
  console.error('❌ Data validation failed:');
  result.errors.forEach(e => console.error('  -', e));
  process.exit(1);
}
console.log('✓ Data validated successfully');

export default defineConfig({
  output: 'static',
  site: 'https://batterytrace.org',
});
