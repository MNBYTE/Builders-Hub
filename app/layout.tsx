import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Builders Hub — Digital Solutions Agency',
  description:
    'Builders Hub turns ambitious ideas into exceptional digital products. We design and build websites, mobile apps, and SaaS platforms.',
  keywords: ['digital agency', 'web design', 'app development', 'branding', 'SaaS'],
  openGraph: {
    title: 'Builders Hub — Digital Solutions Agency',
    description: 'We build digital experiences that drive growth.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,600,500,400&f[]=satoshi@700,600,500,400,300&display=swap"
        />
      </head>
      <body className="font-body bg-base text-body antialiased">
        {children}
      </body>
    </html>
  )
}
