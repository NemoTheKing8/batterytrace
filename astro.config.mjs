import { defineConfig } from 'astro/config';
import { validateAll } from './src/schemas.ts';
import productsData from './src/data/products.json' with { type: 'json' };
import metricsData from './src/data/metrics.json' with { type: 'json' };
import brandsData from './src/data/brands.json' with { type: 'json' };

// Build-time data validation
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
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  }
});
