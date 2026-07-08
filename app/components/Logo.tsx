import Link  from 'next/link'
import Image from 'next/image'

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  const textColor = inverted ? 'text-white' : 'text-ink'
  const subColor  = inverted ? 'text-white/40' : 'text-muted'

  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Logo image */}
      <div className="relative w-9 h-9 flex-shrink-0">
        <Image
          src="/imgs/logobuilder.png"
          alt="Builders Hub logo"
          fill
          className="object-contain"
          sizes="36px"
          priority
        />
      </div>

      {/* Wordmark */}
      <div className="leading-none">
        <div className={`font-display font-black text-[15px] tracking-tight ${textColor} leading-tight`}>
          BUILDERS{' '}
          <span className="text-gold">HUB</span>
        </div>
        <div className={`font-mono text-[8px] tracking-[0.18em] ${subColor} mt-0.5`}>
          BUILD · LAUNCH · GROW
        </div>
      </div>
    </Link>
  )
}