import { motion } from 'framer-motion'
import { FOCUS_POINTS } from '../data/focusPoints'

// 履历数据（双语）。英文为译稿，可按需润色。
interface ResumeGroup {
  heading?: string
  sub?: string
  items?: string[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  groups?: ResumeGroup[]
}
const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Résumé',
    entries: [
      {
        period: 'Apr 2025 – Dec 2025',
        place: 'Insta360 · Innovation Design Center',
        role: 'Senior Product Designer',
        points: [
          'Own UI/UX for the store and official website purchase journeys, campaign pages, and after-sales experiences across mobile and desktop.',
          'Led Amazon Prime integration, guest checkout optimization, and the 0–1 drone storefront experience.',
          'Guest checkout optimization increased conversion by 14%; Amazon API integration improved GMV conversion by 6%.',
        ],
      },
      {
        period: 'Jun 2021 – Aug 2024',
        place: 'SHEIN · Global Operations Center',
        role: 'Senior Interaction Designer',
        points: [
          'Led checkout experiences across cart, checkout, orders, returns, login, and registration for mobile and web.',
          'Cart and checkout redesign increased UV sales by 18%, conversion by 35%, and GMV by 12%.',
          'Order journey improvements reduced complaints by 60% and cut about 3.2M repeated daily inquiries.',
        ],
      },
      {
        period: 'Sep 2019 – Jun 2021',
        place: 'AKULAKU · User Experience Center',
        role: 'Senior Interaction Designer',
        points: [
          'Designed experiences for Akulaku e-commerce, BNC banking, Asetku wealth products, and growth campaigns.',
          'Built a design library with 80+ base components, 100+ composite components, and 20+ templates, improving design efficiency by 39.3%.',
          'Promoted from T5 to T6 within one year.',
        ],
      },
      {
        period: 'Jun 2018 – Sep 2019',
        place: 'Shenzhen Meizan Information Technology',
        role: 'Experience Designer',
        points: [
          'Independently designed the end-to-end experience of the Mini Token digital-asset trading app.',
          'Covered home, assets, wealth management, and account modules.',
        ],
      },
      {
        period: 'Jul 2017 – Jun 2018',
        place: 'Chongqing Renyi Online Tourism',
        role: 'UI Designer',
        points: [
          'Designed the Hongya Cave smart-scenic-area monitoring dashboard, B2B admin system, and official website.',
        ],
        groups: [
          {
            heading: 'Chongqing University of Education',
            sub: 'B.A. · Visual Communication · 2013–2017',
          },
        ],
      },
    ],
  },
  zh: {
    title: 'Résumé',
    entries: [
      {
        period: '2025.4 – 2025.12',
        place: 'Insta360 · 创新设计中心',
        role: '高级产品设计师',
        points: [
          '负责商城与官网购买流程、活动页面，以及售后模块移动端和 PC 端的 UI/UX 设计。',
          '主导亚马逊 Prime 会员接入、访客下单优化，并参与从 0–1 建立无人机独立站。',
          '访客下单优化使转化率提升 14%；亚马逊 API 全站接入使 GMV 转化提升 6%。',
        ],
      },
      {
        period: '2021.6 – 2024.8',
        place: 'SHEIN · 全球运营中心',
        role: '高级交互设计师',
        points: [
          '负责购物车、下单页、订单列表、退货退款，以及登录注册等移动端和 PC 端结算链路设计。',
          '购物车与下单页改版带来 UV 提升 18%、转化率提升 35%、GMV 提升 12%。',
          '订单链路优化使客诉下降 60%，日均减少约 320 万次重复客询。',
        ],
      },
      {
        period: '2019.9 – 2021.6',
        place: 'AKULAKU · 用户体验中心',
        role: '高级交互设计师',
        points: [
          '负责 Akulaku 电商、BNC 银行、Asetku 理财业务线及用户增长活动的体验设计。',
          '建立 80+ 基础组件、100+ 复合组件与 20+ 复合模板，设计效率提高 39.3%。',
          '一年内由 T5 晋升至 T6。',
        ],
      },
      {
        period: '2018.6 – 2019.9',
        place: '深圳美赞信息技术有限公司 · 技术部',
        role: '体验设计师',
        points: [
          '独立完成 Mini Token 数字资产交易 App 的完整体验设计。',
          '覆盖首页、资产、理财和个人中心等核心模块。',
        ],
      },
      {
        period: '2017.7 – 2018.6',
        place: '重庆仁义在线旅游产业服务有限公司',
        role: 'UI 设计师',
        points: [
          '负责洪崖洞智慧景区舆情监控可视化系统、B 端管理系统和景区官网设计。',
        ],
        groups: [
          {
            heading: '重庆第二师范学院',
            sub: '本科 · 视觉传达 · 2013.9–2017.7',
          },
        ],
      },
    ],
  },
}

// 履历条目依次对应 glb 里的聚焦锚点（相机停靠点），顺序须与 entries 一致。
// 名单是唯一真源，见 data/focusPoints.ts（Scene.tsx 也从那里取）。
const POINT_ORDER = FOCUS_POINTS

const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        <span>{group.heading}</span>
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容（点保持在外做时间轴标记）：移动端可给它加卡片衬底，
          且它紧贴内容高度，不含 tl-entry 用于排布的大 padding。
          用普通 div（非 motion）：framer 变体经 React context 穿透它，叶子元素仍是
          tl-entry 的直接 stagger 子级，入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}
