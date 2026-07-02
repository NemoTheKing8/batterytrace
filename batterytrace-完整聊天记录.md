# batterytrace — 完整聊天记录

> 项目：充电宝环境代价计算器（batterytrace）  
> 框架：Astro 4.x 静态站点  
> 导出日期：2026-06-13

---

## 一、项目起源

用户想搭建一个网站，展示充电宝（移动电源）的全生命周期环境代价。通过多轮深度访谈（12 轮 Socratic 访谈）确定需求，再用共识规划（Planner → Architect → Critic ×2）确定技术方案，最后用 Ralph（持久化迭代执行）完成实现。

---

## 二、需求确定（Deep Interview）

- 第一版只做一个品牌：**酷态科 Cuktech**
- 3 个页面：首页（品牌选择）→ 品牌产品列表 → 产品详情页
- 产品详情页显示 6 个 ESG 报告风格的环境指标卡片
- 每个指标 5 组等价类比（如"≈ 驾车 61 公里"），每次随机显示 1-2 条
- 隐藏 Admin 页面 `/admin/edit` 用于产品 CRUD
- 数据通过 Vercel serverless function 提交到 GitHub
- Zod schema 作为单源真相（build + admin + API 共用）
- 纯中文，无英文 i18n，无对比模式
- 产品图片两步走（先占位，后替换）

---

## 三、技术方案（omc-plan consensus）

**选型决策：**
- Astro 4.x 静态生成 (`output: 'static'`)
- Zod 验证：`validateAll()` 跨文件引用完整性检查
- Vercel serverless function: `api/commit.ts` 直接写 GitHub Contents API
- 数据文件：`brands.json` / `products.json` / `metrics.json`
- CSS custom properties 提取自设计稿
- 等价类比：服务端渲染 + 客户端 JS 随机替换（SEO 友好）
- 进度条动画：`requestAnimationFrame` + CSS transition
- `data-*` 属性传输 JSON（Astro 不解析 `<script>` 内的表达式）

**架构师发现的 Bug（已修复）：**
1. CSS 未打包 — `<link href="/src/styles/..."` → 改为 frontmatter `import`
2. JSON 嵌入不生效 — `<script type="application/json">` → 改为 `data-eqs` 属性
3. Admin 页面同理
4. `<meta robots>` 落在 `<body>` — 添加 `<slot name="head" />`

---

## 四、实现完成（Ralph 执行）

**6 个用户故事全部通过：**

| Story | 内容 | 状态 |
|-------|------|------|
| US-001 | 项目骨架 + Zod Schema | ✅ |
| US-002 | 核心组件（BaseLayout, Breadcrumb, ProductButton, Methodology） | ✅ |
| US-003 | 3 个公共页面（首页、品牌页、产品详情页） | ✅ |
| US-004 | Admin 数据管理页面 | ✅ |
| US-005 | Serverless 函数 + SEO + 部署配置 | ✅ |
| US-006 | 初始数据录入（3 款虚构产品） | ✅ |

**构建结果：7 页，0 errors，1.42s**

---

## 五、数据修正

### 5.1 化学类型纠正
用户指出酷态科官方只写"锂离子电池"，不应替品牌编细分类型。
- `Li-polymer` / `NCM` → 统一改为 `Li-ion`
- Schema `ChemistryEnum` 新增 `"Li-ion"`

### 5.2 替换虚构产品
用户发送充电头网拆解文章（21 款酷态科产品拆解），发现之前 3 款产品参数全是编的。
- 删除 3 款虚构产品
- 新增真实产品：**酷态科 6号超级电能块 PB060**
  - 6000mAh, 55W, 151g, ¥129
  - 2×18650（长虹三杰 INR18650-3000）
  - TFT 数显屏, 2×USB-C, PC 阻燃外壳

### 5.3 删除指标
- 删除"能量回收时间"和"材料降解时间"两个指标卡片
- 详情页从 6 张卡减到 4 张：碳足迹、水足迹、有毒物质、可回收率

---

## 六、前端重设计

### 6.1 污染计算器（首页重构）

模仿麦当劳营养计算器的设计模式：
- **顶部**：计算器汇总面板（sticky），6 参数实时累加
- **中部**：品牌一级窗口（酷态科）
- **底部**：产品选择区域

功能：
- 勾选产品 → 自动累加到计算器
- 已选商品列表带数量增减（`+` `−` 按钮）
- 每行显示单品小计
- 清空按钮重置
- 数值变动有 pulse 动画

### 6.2 图片选择形式

产品卡片改为正方形图片按钮：
- 图片来自拆解报告实拍（`.avif` 格式）
- 点击图片选中（金色边框 + ✓ 标记）
- hover 图片放大
- 产品信息在图片下方

### 6.3 "了解更多"弹窗

- 全屏 modal 展示产品内部组件及污染物来源
- 点击遮罩 / ✕ / Esc 关闭
- 5 个组件：18650 电芯、PCB 电路板、TFT 屏幕、PC 外壳、USB-C 接口
- 2 列卡片网格（移动端单列）
- 深色主题 + 透明卡片边框

### 6.4 文案简化

- 删除 emoji 图标
- 去除环境后果解释（不写"焚烧产生二噁英"之类）
- 只描述污染物/material 是什么

### 6.5 浮点数修复

`3.5999999...g` → `3.6g`（`.toFixed(1)`）

---

## 七、数据方法论

详见桌面文件：`batterytrace-数据方法论文献引用.md`

11 篇论文引用，涵盖：
- 碳足迹：LCA 排放因子法（Peters 2017, GREET 2024, Ecoinvent 3.10）
- 水足迹：阶段耗水因子法（Flexer 2018, Stamp 2012）
- 有毒金属：NCM 正极化学计量比法（Majeau-Bettez 2011, US EPA RSL）
- 可回收率：文献直接引用（Harper 2019 Nature, Melin 2019）

---

## 八、当前状态

### 文件结构

```
batterytrace/
├── src/
│   ├── pages/
│   │   ├── index.astro          ← 污染计算器首页
│   │   ├── brand/[slug].astro   ← 品牌产品列表
│   │   ├── product/             ← 产品详情（暂时禁用）
│   │   │   └── _[slug].astro.disabled
│   │   ├── admin/edit.astro     ← 隐藏 Admin
│   │   ├── 404.astro
│   │   └── robots.txt.ts
│   ├── components/
│   │   ├── Breadcrumb.astro
│   │   ├── Methodology.astro
│   │   └── ProductButton.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── data/
│   │   ├── brands.json
│   │   ├── products.json        ← PB060 真实数据
│   │   └── metrics.json         ← 环境指标
│   ├── styles/
│   │   └── global.css
│   └── schemas.ts               ← Zod 单源真相
├── api/
│   └── commit.ts                ← Vercel serverless
├── public/
│   └── images/
│       └── cuktech-pb060.avif   ← 产品实拍图
├── astro.config.mjs
└── package.json
```

### 页面

| URL | 功能 |
|-----|------|
| `/` | 污染计算器（主页） |
| `/brand/cuktech` | 酷态科产品列表 |
| `/admin/edit` | 数据管理 |
| `/product/cuktech-pb060` | 产品详情（暂时禁用） |

### 待办

- [ ] 添加更多酷态科产品
- [ ] 恢复产品详情页
- [ ] 部署到 Vercel
- [ ] 论文引用加入 Methodology 组件
- [ ] 多品牌扩展（V2）

---

## 九、关键技术决策记录

1. **Astro 静态生成**：首屏性能最优，SEO 友好，Vercel 免费部署
2. **Zod 单源真相**：schema.ts 同时用于 build 验证、admin 表单验证、API 验证
3. **`data-*` 传 JSON**：Astro 不在 `<script>` 标签内插值表达式，用 HTML 属性传递数据
4. **CSS import 而非 `<link>`**：`<link>` 路径 `/src/` 在 dist/ 中不存在，必须用 Vite 打包
5. **Complete-dataset-overwrite 模型**：Admin 保存时覆盖整个 JSON 文件，避免 patch 冲突
6. **USB-C 协议不做**：保持环境计算器纯粹性，不加入快充协议对比
