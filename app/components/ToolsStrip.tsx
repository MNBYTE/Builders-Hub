import { STACK } from '../data/constants'

export default function ToolsStrip() {
  return (
    <section className="py-12 sm:py-16 bg-surface border-t border-edge">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 text-center">
        <span className="font-mono text-[10px] font-bold tracking-label uppercase text-muted block mb-6">
          Built with the best stack
        </span>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {STACK.map(tool => (
            <span
              key={tool}
              className="font-display font-semibold text-[15px] text-muted hover:text-blue transition-colors duration-200 cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
