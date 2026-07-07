'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { NAV_LINKS } from '../data/constants'

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname                  = usePathname()
  const isHome                    = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* On the home page the nav starts transparent over the hero image */
  const isTransparent = isHome && !scrolled && !menuOpen
  const navBg = isTransparent
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-lg border-b border-edge shadow-sm'

  const linkColor = isTransparent ? 'text-white/80 hover:text-white' : 'text-muted hover:text-body'
  const activeColor = isTransparent ? 'text-white' : 'text-blue'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex items-center justify-between h-[70px]">

        {/* Logo */}
        <Logo inverted={isTransparent} />

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`text-[13.5px] font-body font-medium transition-colors duration-200 ${
                  isActive ? activeColor + ' font-semibold' : linkColor
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 bg-blue text-white font-body font-semibold text-[13px] px-5 py-2.5 rounded-pill hover:bg-blue-dark transition-colors duration-200 shadow-blue"
        >
          Let&apos;s Build →
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 -mr-2 rounded-lg"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen
            ? <X size={22} className={isTransparent ? 'text-white' : 'text-ink'} />
            : <Menu size={22} className={isTransparent ? 'text-white' : 'text-ink'} />
          }
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden border-t border-edge"
        style={{
          maxHeight: menuOpen ? 420 : 0,
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height .35s ease, opacity .25s ease',
          background: 'rgba(255,255,255,0.98)',
        }}
      >
        <nav className="flex flex-col px-5 py-5 gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-body font-medium py-3 border-b border-edge last:border-0 transition-colors ${
                  isActive ? 'text-blue font-semibold' : 'text-muted hover:text-body'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 w-full text-center bg-blue text-white font-body font-semibold text-sm py-3.5 rounded-pill hover:bg-blue-dark transition-colors"
          >
            Let&apos;s Build Together →
          </Link>
        </nav>
      </div>
    </header>
  )
}
