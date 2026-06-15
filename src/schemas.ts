import { z } from 'zod';

// ── Enums ──
export const ChemistryEnum = z.enum(["LFP", "NCM", "LCO", "Li-polymer", "Li-ion"]);
export type Chemistry = z.infer<typeof ChemistryEnum>;

export const MetricTypeEnum = z.enum(["carbon", "water", "toxic", "degrade", "recycle", "energy"]);
export type MetricType = z.infer<typeof MetricTypeEnum>;

// ── Brand ──
export const BrandSchema = z.object({
  id: z.string(),
  name: z.string(),
  name_en: z.string(),
  logo: z.string(),
  country: z.string(),
});
export type Brand = z.infer<typeof BrandSchema>;

// ── Product ──
export const ProductSchema = z.object({
  id: z.string(),
  brand_id: z.string(),
  name: z.string(),
  capacity_mah: z.number().positive(),
  chemistry: ChemistryEnum,
  power_w: z.number().positive(),
  weight_g: z.number().positive(),
  price_cny: z.number().positive(),
  purchase_url: z.string().url(),
  image: z.string(),
  in_production: z.boolean(),
});
export type Product = z.infer<typeof ProductSchema>;

// ── Equivalence ──
export const EquivalenceSchema = z.object({
  metric_type: MetricTypeEnum,
  text: z.string(),
  value: z.number(),
  unit: z.string(),
});
export type Equivalence = z.infer<typeof EquivalenceSchema>;

// ── Metrics ──
export const MetricsSchema = z.object({
  product_id: z.string(),
  carbon_kg_co2eq: z.number(),
  carbon_industry_low: z.number(),
  carbon_industry_avg: z.number(),
  carbon_industry_high: z.number(),
  water_liters: z.number(),
  water_industry_low: z.number(),
  water_industry_avg: z.number(),
  water_industry_high: z.number(),
  cobalt_g: z.number(),
  nickel_g: z.number(),
  lithium_g: z.number(),
  manganese_g: z.number(),
  toxic_soil_dilution_tonnes: z.number(),
  cobalt_soil_dilution_tonnes: z.number(),
  nickel_soil_dilution_tonnes: z.number(),
  plastic_degradation_years: z.number(),
  aluminum_degradation_years: z.number(),
  pcb_degradable: z.boolean(),
  cell_degradation_years: z.number(),
  recyclable_pct: z.number().min(0).max(100),
  recyclable_industry_avg: z.number(),
  recovery_rate: z.number().min(0).max(1).optional(),
  carbon_disposal_landfill: z.number().optional(),
  carbon_disposal_recycle: z.number().optional(),
  water_disposal_landfill: z.number().optional(),
  water_disposal_recycle: z.number().optional(),
  ctue_landfill: z.number().optional(),
  ctue_recycle: z.number().optional(),
  production_energy_mj: z.number(),
  energy_per_full_cycle_mj: z.number(),
  break_even_cycles: z.number(),
  equivalences: z.object({
    carbon: z.array(EquivalenceSchema).length(5),
    water: z.array(EquivalenceSchema).length(5),
    toxic: z.array(EquivalenceSchema).length(5),
    degrade: z.array(EquivalenceSchema).length(5),
    recycle: z.array(EquivalenceSchema).length(5),
    energy: z.array(EquivalenceSchema).length(5),
  }),
});
export type Metrics = z.infer<typeof MetricsSchema>;

// ── Cross-file validation ──
export function validateAll(
  brands: unknown,
  products: unknown,
  metrics: unknown
): { ok: true } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  const brandsResult = z.array(BrandSchema).safeParse(brands);
  if (!brandsResult.success) {
    brandsResult.error.issues.forEach(i =>
      errors.push(`brands.json: ${i.path.join('.')}: ${i.message}`)
    );
    return { ok: false, errors };
  }

  const productsResult = z.array(ProductSchema).safeParse(products);
  if (!productsResult.success) {
    productsResult.error.issues.forEach(i =>
      errors.push(`products.json: ${i.path.join('.')}: ${i.message}`)
    );
  }

  const metricsResult = z.array(MetricsSchema).safeParse(metrics);
  if (!metricsResult.success) {
    metricsResult.error.issues.forEach(i =>
      errors.push(`metrics.json: ${i.path.join('.')}: ${i.message}`)
    );
  }

  if (!productsResult.success || !metricsResult.success) {
    return { ok: false, errors };
  }

  const brandIds = new Set(brandsResult.data.map(b => b.id));
  const productSlugs = new Set(productsResult.data.map(p => p.id));
  const metricsProductIds = new Set(metricsResult.data.map(m => m.product_id));

  // Every product.brand_id must exist in brands
  for (const p of productsResult.data) {
    if (!brandIds.has(p.brand_id)) {
      errors.push(`products.json: product "${p.id}" references unknown brand_id "${p.brand_id}"`);
    }
  }

  // Every product must have matching metrics
  for (const slug of productSlugs) {
    if (!metricsProductIds.has(slug)) {
      errors.push(`metrics.json: missing metrics for product "${slug}"`);
    }
  }

  // Every metrics entry must reference an existing product (no orphaned metrics)
  for (const m of metricsResult.data) {
    if (!productSlugs.has(m.product_id)) {
      errors.push(`metrics.json: orphaned metrics for unknown product "${m.product_id}"`);
    }
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true };
}
