// 作品集数据（双语）。点击项目可展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.jsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…'05'
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: 'Works',
    closeLabel: '返回',
    openLabel: '展开作品',
    hint: '继续下滑',
    awardsLabel: '获奖',
    visitLabel: '访问作品',
    detailPlaceholder: '你的作品介绍',
    phImageLabel: '图片 / 视频',
    phButtonLabel: '跳转按钮',
    countLabel: (n) => `${n} 件作品`,
    sections: [
      {
        id: 'growth',
        no: '01',
        title: '设计助力增长',
        tagline: 'SHEIN · 结算体验',
        items: [
          {
            name: '购物车优化增长专项',
            meta: '独立交互设计',
            tags: ['增长设计', '体验优化'],
            slug: 'shein-cart-growth',
          },
          {
            name: '一键购设计',
            meta: '0–1 体验设计',
            tags: ['创新方案', '结算链路'],
            slug: 'one-click-buy',
          },
        ],
      },
      {
        id: 'efficiency',
        no: '02',
        title: '设计提升效率',
        tagline: 'SHEIN · 履约与账户体验',
        items: [
          {
            name: '履约场景改版设计',
            meta: '订单与物流体验',
            tags: ['数据分析', '效率设计'],
            slug: 'order-fulfillment-redesign',
          },
          {
            name: '登录注册流程优化',
            meta: '链路重塑',
            tags: ['用户调研', '转化提升'],
            slug: 'login-registration-optimization',
          },
        ],
      },
      {
        id: 'campaigns',
        no: '03',
        title: '活动页面',
        tagline: 'Insta360 · 营销与互动',
        items: [
          {
            name: '活动落地页设计',
            meta: '分享赚积分 · 全景活动游戏',
            tags: ['UI/UX', '互动设计'],
            slug: 'campaign-pages',
          },
        ],
      },
      {
        id: 'capabilities',
        no: '04',
        title: '其他能力',
        tagline: '团队影响力与设计体系',
        items: [
          {
            name: '设计团队能力建设',
            meta: '新人培训 · 项目复盘 · 组件库',
            tags: ['DesignOps', '知识分享'],
            slug: 'design-capabilities',
          },
        ],
      },
    ],
  },
  en: {
    title: 'Works',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Awards',
    visitLabel: 'Visit site',
    detailPlaceholder: 'Your work description',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link button',
    countLabel: (n) => `${n} works`,
    sections: [
      {
        id: 'growth',
        no: '01',
        title: 'Design for Growth',
        tagline: 'SHEIN · Checkout Experience',
        items: [
          {
            name: 'Cart Growth Redesign',
            meta: 'Lead interaction design',
            tags: ['Growth', 'UX'],
            slug: 'shein-cart-growth',
          },
          {
            name: 'One-click Purchase',
            meta: '0–1 experience design',
            tags: ['Innovation', 'Checkout'],
            slug: 'one-click-buy',
          },
        ],
      },
      {
        id: 'efficiency',
        no: '02',
        title: 'Design for Efficiency',
        tagline: 'SHEIN · Fulfillment & Account',
        items: [
          {
            name: 'Fulfillment Journey Redesign',
            meta: 'Orders & logistics',
            tags: ['Data', 'Efficiency'],
            slug: 'order-fulfillment-redesign',
          },
          {
            name: 'Login & Registration Optimization',
            meta: 'Journey redesign',
            tags: ['Research', 'Conversion'],
            slug: 'login-registration-optimization',
          },
        ],
      },
      {
        id: 'campaigns',
        no: '03',
        title: 'Campaign Pages',
        tagline: 'Insta360 · Marketing & Interaction',
        items: [
          {
            name: 'Campaign Landing Pages',
            meta: 'Referral points · 360 campaign game',
            tags: ['UI/UX', 'Interaction'],
            slug: 'campaign-pages',
          },
        ],
      },
      {
        id: 'capabilities',
        no: '04',
        title: 'Other Capabilities',
        tagline: 'Design systems & team impact',
        items: [
          {
            name: 'Design Team Enablement',
            meta: 'Mentoring · Reviews · Component library',
            tags: ['DesignOps', 'Sharing'],
            slug: 'design-capabilities',
          },
        ],
      },
    ],
  },
}

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位，放入图片后自动点亮。
export const SECTION_COVERS: Record<string, string> = {
  // 个人项目封面待补充；缺图时自动使用编号渐变占位。
}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
