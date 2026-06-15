// Vercel serverless function — admin save → GitHub commit
// Route: POST /api/commit
// Requires env vars: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO

import { z } from 'zod';
import { ProductSchema, MetricsSchema, validateAll } from '../src/schemas.ts';
import brands from '../src/data/brands.json' with { type: 'json' };

const RequestSchema = z.object({
  products: z.array(ProductSchema),
  metrics: z.array(MetricsSchema),
});

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();

    // Validate request body
    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
      return new Response(JSON.stringify({ success: false, error: `数据格式错误：${errors.join('；')}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Cross-file integrity check
    const validation = validateAll(brands, parsed.data.products, parsed.data.metrics);
    if (!validation.ok) {
      return new Response(JSON.stringify({ success: false, error: `数据完整性校验失败：${validation.errors.join('；')}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      return new Response(JSON.stringify({
        success: false,
        error: '服务器未配置 GitHub 环境变量 (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO)。请在 Vercel 后台设置。'
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/src/data`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'batterytrace-admin'
    };

    // Write products.json
    const productsContent = JSON.stringify(parsed.data.products, null, 2);
    const productsBase64 = btoa(unescape(encodeURIComponent(productsContent)));

    // Get current file SHA
    let productsSha: string | undefined;
    try {
      const getRes = await fetch(`${baseUrl}/products.json`, { headers });
      if (getRes.ok) {
        const data = await getRes.json() as any;
        productsSha = data.sha;
        // Skip if unchanged
        if (data.content && data.content.replace(/\n/g, '') === productsBase64) {
          // Content unchanged — only write metrics if needed
        }
      }
    } catch {}

    const productsPutRes = await fetch(`${baseUrl}/products.json`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `admin: update products [${new Date().toISOString()}]`,
        content: productsBase64,
        ...(productsSha ? { sha: productsSha } : {})
      })
    });

    if (!productsPutRes.ok) {
      const err = await productsPutRes.json() as any;
      if (productsPutRes.status === 409) {
        return new Response(JSON.stringify({
          success: false,
          error: '检测到冲突：数据在编辑期间已被他人修改。请刷新页面后重新编辑。'
        }), { status: 409, headers: { 'Content-Type': 'application/json' } });
      }
      if (productsPutRes.status === 403) {
        return new Response(JSON.stringify({
          success: false,
          error: 'GitHub API 请求频率超限，请稍后重试（60 分钟后自动恢复）。'
        }), { status: 403, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({
        success: false,
        error: `GitHub API 错误 (${productsPutRes.status}): ${err.message || '未知错误'}`
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // Write metrics.json
    const metricsContent = JSON.stringify(parsed.data.metrics, null, 2);
    const metricsBase64 = btoa(unescape(encodeURIComponent(metricsContent)));

    let metricsSha: string | undefined;
    try {
      const getRes = await fetch(`${baseUrl}/metrics.json`, { headers });
      if (getRes.ok) {
        const data = await getRes.json() as any;
        metricsSha = data.sha;
      }
    } catch {}

    const metricsPutRes = await fetch(`${baseUrl}/metrics.json`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `admin: update metrics [${new Date().toISOString()}]`,
        content: metricsBase64,
        ...(metricsSha ? { sha: metricsSha } : {})
      })
    });

    if (!metricsPutRes.ok) {
      const err = await metricsPutRes.json() as any;
      return new Response(JSON.stringify({
        success: false,
        error: `Metrics 写入失败 (${metricsPutRes.status}): ${err.message || '未知错误'}。Products 已保存。`
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      success: true,
      message: '已保存，Vercel 将在 1-2 分钟内自动部署。'
    }), { headers: { 'Content-Type': 'application/json' } });

  } catch (e: any) {
    return new Response(JSON.stringify({
      success: false,
      error: `服务器内部错误：${e.message}。请使用页面下方的手动备份 JSON 代码。`
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
