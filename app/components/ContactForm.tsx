'use client'

import { useState } from 'react'

type FormState = { name: string; email: string; company: string; budget: string; message: string }

const BUDGETS = ['Under $5k', '$5k – $15k', '$15k – $50k', '$50k+', 'Not sure yet']

export default function ContactForm() {
  const [form, setForm]       = useState<FormState>({ name:'', email:'', company:'', budget:'', message:'' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass = "w-full font-body text-[14px] text-body bg-surface border border-edge rounded-xl px-4 py-3.5 outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-muted/50"
  const labelClass = "font-mono text-[10px] font-bold tracking-label uppercase text-muted block mb-2"

  if (submitted) {
    return (
      <div className="bg-blue-soft border border-blue/15 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[480px]">
        <div className="w-16 h-16 bg-blue rounded-full flex items-center justify-center mb-6 text-2xl">✓</div>
        <h3 className="font-display font-black text-2xl text-body tracking-tight mb-3">Message received!</h3>
        <p className="font-body text-muted leading-relaxed max-w-[300px]">
          We&apos;ll review your brief and get back to you within 24 hours with honest thoughts and a clear next step.
        </p>
      </div>
    )
  }

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
            <input name="name" value={form.name} onChange={handleChange} placeholder="Alex Morgan" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="alex@company.com" className={inputClass} />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className={labelClass}>Company / Project</label>
          <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc." className={inputClass} />
        </div>

        {/* Budget */}
        <div>
          <label className={labelClass}>Estimated budget *</label>
          <select name="budget" value={form.budget} onChange={handleChange} className={inputClass}>
            <option value="" disabled>Select a range...</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className={labelClass}>Tell us about your project *</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="We're building a SaaS platform for... / We need a rebrand because..."
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue text-white font-body font-bold text-[15px] py-4 rounded-pill hover:bg-blue-dark transition-all duration-200 shadow-blue hover:shadow-blue-lift hover:-translate-y-0.5 mt-1"
        >
          Send message →
        </button>

        <p className="font-mono text-[10px] text-muted text-center tracking-wide">
          No spam. No pitch decks. Just a real conversation.
        </p>
      </div>
    </div>
  )
}
