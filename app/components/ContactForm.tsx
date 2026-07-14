'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

type FormState = {
  name:    string
  email:   string
  company: string
  budget:  string
  message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const BUDGETS = ['Under $2k', '$2k – $5k', '$5k – $15k', '$15k+', 'Not sure yet']

const ENDPOINT = process.env.NEXT_PUBLIC_XANO_CONTACT_URL!

export default function ContactForm() {
  const [form, setForm]     = useState<FormState>({ name: '', email: '', company: '', budget: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError]   = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    // Basic validation
    if (!form.name || !form.email || !form.budget || !form.message) {
      setError('Please fill in all required fields.')
      return
    }

    setStatus('loading')
    setError(null)

    try {
      const res = await fetch(ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message ?? `Request failed (${res.status})`)
      }

      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly.'
      )
    }
  }

  const inputClass =
    'w-full font-body text-[14px] text-body bg-base border border-edge rounded-xl px-4 py-3.5 outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-muted/50 disabled:opacity-50'
  const labelClass =
    'font-mono text-[10px] font-bold tracking-label uppercase text-muted block mb-2'

  /* ── Success state ─────────────────────────────────────────── */
  if (status === 'success') {
    return (
      <div className="bg-blue-soft border border-blue/15 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[480px]">
        <div className="w-16 h-16 bg-blue rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={28} className="text-white" />
        </div>
        <h3 className="font-display font-black text-2xl text-body tracking-tight mb-3">
          Message received!
        </h3>
        <p className="font-body text-muted leading-relaxed max-w-[300px]">
          We&apos;ll review your brief and get back within 24 hours with
          honest thoughts and a clear next step.
        </p>
      </div>
    )
  }

  /* ── Form ──────────────────────────────────────────────────── */
  const isLoading = status === 'loading'

  return (
    <div className="bg-surface border border-edge rounded-2xl p-6 sm:p-8 shadow-blue">
      <h3 className="font-display font-black text-xl text-body tracking-tight mb-6">
        Tell us about your project
      </h3>

      <div className="flex flex-col gap-5">
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Your name *</label>
            <input
              name="name" value={form.name} onChange={handleChange}
              placeholder="Alex Morgan" className={inputClass} disabled={isLoading}
            />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input
              name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="alex@company.com" className={inputClass} disabled={isLoading}
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className={labelClass}>Company / Project</label>
          <input
            name="company" value={form.company} onChange={handleChange}
            placeholder="Acme Inc." className={inputClass} disabled={isLoading}
          />
        </div>

        {/* Budget */}
        <div>
          <label className={labelClass}>Estimated budget *</label>
          <select
            name="budget" value={form.budget} onChange={handleChange}
            className={inputClass} disabled={isLoading}
          >
            <option value="" disabled>Select a range...</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className={labelClass}>Tell us about your project *</label>
          <textarea
            name="message" value={form.message} onChange={handleChange}
            rows={5} disabled={isLoading}
            placeholder="We're building a SaaS platform for..."
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* Error banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="font-body text-[13px] text-red-600">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue text-white font-body font-bold text-[15px] py-4 rounded-full hover:bg-blue-dark transition-all duration-200 shadow-blue hover:shadow-blue-lift hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 mt-1"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            'Send message →'
          )}
        </button>

        <p className="font-mono text-[10px] text-muted text-center tracking-wide">
          No spam. No pitch decks. Just a real conversation.
        </p>
      </div>
    </div>
  )
}