import {
  Globe, Palette, Smartphone, TrendingUp, Compass, BarChart3,
  type LucideIcon,
} from 'lucide-react'

/* ── Navigation ──────────────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Projects', href: '/projects' },
  { label: 'Team',     href: '/team'     },
  { label: 'Contact',  href: '/contact'  },
] as const

/* ── Stats ────────────────────────────────────────────────────────── */
export const STATS = [
  { number: '150+', label: 'Projects shipped'  },
  { number: '80+',  label: 'Happy clients'     },
  { number: '8',    label: 'Years building'    },
  { number: '4.9★', label: 'Average rating'   },
] as const

/* ── Services bento ──────────────────────────────────────────────── */
export type Service = {
  id:          string
  eyebrow:     string
  title:       string
  description: string
  bentoClass:  string
  theme:       'dark' | 'blue' | 'light' | 'blue-soft'
  Icon:        LucideIcon
  list?:       string[]
  highlight?:  boolean
}

export const SERVICES: Service[] = [
  {
    id: '01', eyebrow: 'Core service',
    title: 'Web Design & Development',
    description: 'Full-stack websites and web apps, designed from scratch and built to perform at scale.',
    bentoClass: 'bento-web', theme: 'dark', Icon: Globe, highlight: true,
  },
  {
    id: '02', eyebrow: 'Branding',
    title: 'Brand Identity',
    description: 'Logo, visual systems, and guidelines that make you instantly recognisable.',
    bentoClass: 'bento-brand', theme: 'blue', Icon: Palette,
    list: ['Logo & Mark', 'Typography', 'Color system', 'Style guide'],
  },
  {
    id: '03', eyebrow: 'Mobile',
    title: 'Mobile Apps',
    description: 'iOS & Android apps built with React Native.',
    bentoClass: 'bento-mobile', theme: 'light', Icon: Smartphone,
  },
  {
    id: '04', eyebrow: 'Growth',
    title: 'SEO & Growth',
    description: 'Search, content, and paid ads that compound over time.',
    bentoClass: 'bento-seo', theme: 'blue-soft', Icon: TrendingUp,
  },
  {
    id: '05', eyebrow: 'Consulting',
    title: 'Strategy & Consulting',
    description: 'Competitive research, product roadmaps, and go-to-market plans.',
    bentoClass: 'bento-strategy', theme: 'dark', Icon: Compass,
  },
  {
    id: '06', eyebrow: 'Data',
    title: 'Analytics',
    description: 'Custom dashboards and insight reports that drive real decisions.',
    bentoClass: 'bento-analytics', theme: 'light', Icon: BarChart3,
  },
]

/* ── Projects ────────────────────────────────────────────────────── */
export type Project = {
  name:     string
  type:     string
  year:     string
  bg:       string
  accent:   string
  tags:     string[]
  metric:   string
  summary:  string
  slug:  string
}

export const PROJECTS: Project[] = [
  {
    name: 'BeeSeek', type: 'Service Marketplace', year: '2025',
    bg: '#0F1B3C', accent: '#F5C52C',
    tags: ['Nestjs', 'Postgres', 'Redis', 'React Native'], metric: '↑ 340% traffic',
    summary: 'A high-performance marketplace platform connecting users with local service providers in real time.',
    slug: 'beeseek.site',
  },
  {
    name: 'ExtraordinaryLife', type: 'WORKSPACE MANAGEMENT', year: '2024',
    bg: '#0A2A14', accent: '#4ADE80',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Postgres', 'SQL'], metric: '↑ 2× conversion',
    summary: 'A robust workspace management hub designed to coordinate team tasks, tracking, and operations.',
    slug: 'extraordinarylife.ng',
  },
  {
    name: 'D_HEIR International', type: 'LOGISTICS SERVICES', year: '2023',
    bg: '#1A0A2A', accent: '#A78BFA',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Postgres'], metric: '↑ $2M ARR',
    summary: 'A seamless logistics site offering parcel tracking, route configuration, and service schedules.',
    slug: 'dheirinternational.com',
  },
  {
    name: 'Leadflow', type: 'EMAIL INFRASTRUCTURE', year: '2023',
    bg: '#0A1A2A', accent: '#38BDF8',
    tags: ['Next.js', 'Supabase', 'AWS'], metric: '↓ 60% ops cost',
    summary: 'An automated transactional email delivery engine designed for heavy workloads and high deliverability.',
    slug: 'tryleadflow.ai',
  },
  {
    name: 'Spe UI', type: 'ACADEMIC PORTAL', year: '2023',
    bg: '#1A0A0A', accent: '#FB923C',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'], metric: '3× more leads',
    summary: 'A modern student portal built for the petroleum engineering student body to access resources and event notices.',
    slug: 'speui.org',
  },
  {
    name: 'SignSea', type: 'ESCROW INFRASTRUCTURE', year: '2022',
    bg: '#001A1A', accent: '#d4cc2d',
    tags: ['Next.js', 'Tailwind','Fastify','Postgres'], metric: '$5M processed',
    summary: 'A secure digital escrow application coordinating multi-party trade agreements and payouts.',
    slug: 'signsea.com',
  },
  {
    name: 'TracTrac MDM Agent', type: 'MOBILE DEVICE MANAGEMENT', year: '2022',
    bg: '#001A1A', accent: '#2d43d4',
    tags: ['React','Go','Kotlin','Java','Postgres','MinIO','MQTT','Redis'], metric: '$5M processed',
    summary: 'A robust mobile device agent administering remote device settings, telemetry data, and network traffic.',
    slug: 'tractrac-mdm-agent.com',
  },
]

/* ── Process ──────────────────────────────────────────────────────── */
export type Step = {
  number: string; title: string; body: string; highlighted: boolean
}

export const STEPS: Step[] = [
  {
    number: '01', title: 'DESIGN', highlighted: false,
    body: 'We sit with your problem before touching a pixel, construct bespoke layouts, dynamic interactive prototypes, high-converting interfaces, and modern design tokens tailored to your branding guidelines.',
  },
  {
    number: '02', title: 'CODE', highlighted: true,
    body: 'We write highly performant, type-safe Next.js, React, and Node.js software utilizing clean code principles, modular components, and automated testing suites.',
  },
  {
    number: '03', title: 'BUILD & SHIP', highlighted: false,
    body: 'We orchestrate multi-region database replication, cache-aside latency management, secure cloud hosting setups, and automated deployment pipelines.',
  },
]

/* ── Team ─────────────────────────────────────────────────────────── */
export type TeamMember = {
  name:      string
  role:      string
  bio:       string
  initials:  string
  color:     string
  skills:    string[]
  socials:   { linkedin?: string; twitter?: string; github?: string }
}

export const TEAM: TeamMember[] = [
  {
    name: 'Divine Wisdom', role: 'Founder & CEO', initials: 'DW', color: '#1A5FFF',
    bio: 'Serial entrepreneur with 10+ years shipping digital products for global brands. Passionate about turning ambitious ideas into scalable realities.',
    skills: ['Product Strategy', 'Business Development', 'UX'],
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Olakunle Fafure', role: 'Frontend Engineer', initials: 'SC', color: '#F5C52C',
    bio: 'Award-winning designer with a background in brand identity and interactive design. Believes every pixel should earn its place.',
    skills: ['UI/UX Design', 'Brand Identity', 'Figma'],
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Emmanuel Gyimah', role: 'Backend Engineer', initials: 'MW', color: '#10B981',
    bio: 'Full-stack architect who has led engineering at two successful startups. Obsessed with clean code, performance, and shipping fast.',
    skills: ['Next.js', 'Node.js', 'System Design'],
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Oluwa Brimz', role: 'Mobile Lead', initials: 'PN', color: '#A78BFA',
    bio: 'React Native specialist who has shipped 12+ apps to the App Store and Play Store. Makes mobile experiences feel genuinely native.',
    skills: ['React Native', 'iOS', 'Android'],
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Jordan Ellis', role: 'Growth Strategist', initials: 'JE', color: '#F97316',
    bio: 'Data-driven marketer who has grown organic traffic 5× for multiple clients. SEO, content, and paid channels are the toolkit.',
    skills: ['SEO', 'PPC', 'Analytics'],
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Amara Osei', role: 'Project Manager', initials: 'AO', color: '#EC4899',
    bio: 'PMP-certified PM who keeps every project on time, in scope, and on budget. The glue that holds every delivery together.',
    skills: ['Agile', 'Scrum', 'Stakeholder Mgmt'],
    socials: { linkedin: '#' },
  },
]

/* ── Testimonials ─────────────────────────────────────────────────── */
export type Testimonial = {
  quote: string; author: string; role: string; avatar: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Builders Hub turned a vague idea into a product our customers love. They brought structure, skill, and genuine care to every single stage.',
    author: 'Amara Osei', role: 'CEO, Vanta Finance', avatar: 'AO',
  },
  {
    quote: 'The rebrand completely changed how the market perceives us. Their process is tight and they actually explain the reasoning behind every decision.',
    author: 'Sophie Lin', role: 'Founder, Orchard Market', avatar: 'SL',
  },
  {
    quote: 'Our team ships 3× faster than before. The codebase they handed over is the cleanest we have ever inherited and we have worked with many agencies.',
    author: 'Kofi Mensah', role: 'CTO, Pulse Health', avatar: 'KM',
  },
]

/* ── Stack ────────────────────────────────────────────────────────── */
export const STACK = [
  'Next.js', 'React', 'TypeScript', 'Node.js',
  'Figma', 'Tailwind', 'Vercel', 'Framer',
] as const

/* ── Footer links ─────────────────────────────────────────────────── */
export const FOOTER_LINKS: Record<string, string[]> = {
  Company:  ['Team', 'Project'],
  Services: ['Web Develoment', 'Mobile Apps', 'Branding', 'SEO & Growth'],
  Connect:  ['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'],
}
