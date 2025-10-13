import { Phone, Mail, MapPin, CheckCircle2, ArrowRight, Stethoscope, ShieldCheck, HeartHandshake, FileText, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LazyReferralForm, LazyContactForm } from "../components/lazy-components";

// Inline SVG logo (wordmark + emblem) to ensure it renders without external assets
function GraceLogo({ className = "w-40" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="GRACE emblem">
        <circle cx="32" cy="32" r="30" stroke="#0A3C5F" strokeWidth="4" />
        <path d="M18 33c0-8 6.5-15 14.5-15S47 25 47 33" stroke="#22A39A" strokeWidth="4" strokeLinecap="round"/>
        <path d="M18 33c0 8 6.5 15 14.5 15S47 41 47 33" stroke="#0A3C5F" strokeWidth="4" strokeLinecap="round"/>
      </svg>
      <div className="leading-tight">
        <div className="text-xl font-semibold tracking-wide text-[#0A3C5F]">GRACE</div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Integrated Health</div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <GraceLogo />
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-[#0A3C5F]">Services</a>
            <a href="#about" className="hover:text-[#0A3C5F]">About</a>
            <a href="#process" className="hover:text-[#0A3C5F]">Process</a>
            <a href="#contact" className="hover:text-[#0A3C5F]">Contact</a>
            <a href="/privacy" className="hover:text-[#0A3C5F]">Privacy</a>
          </nav>
          <a href="#contact" className="ml-4 hidden sm:inline-block">
            <Button className="rounded-2xl px-5">Book a Consultation</Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E6F4F2] via-white to-white"/>
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 animate-fade-in">
              Evidence‑based care for older adults.
            </h1>
            <p className="mt-4 text-slate-600 md:text-lg">
              GRACE (Geriatric Residential Aged Care Evaluations) provides modern, nurse practitioner‑led assessments and integrated care planning for residents, families, RACFs and GPs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact"><Button className="rounded-2xl">Book an Assessment <ArrowRight className="ml-2 h-4 w-4"/></Button></a>
              <a href="#services"><Button variant="outline" className="rounded-2xl">Our Services</Button></a>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#0A3C5F]"/> PBS & guideline‑aligned</div>
              <div className="flex items-center gap-2"><Stethoscope className="h-5 w-5 text-[#22A39A]"/> NP‑led, GP‑collaborative</div>
              <div className="flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-[#0A3C5F]"/> Family‑centred</div>
            </div>
          </div>
          <LazyReferralForm />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Services</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">Comprehensive assessments and ongoing support tailored to residential aged‑care environments.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {icon: <HeartHandshake className="h-6 w-6"/>, title: "Residential Aged Care Facilities", desc: "Specialising in respite admission, transitional care, palliative care and medication charts."},
            {icon: <FileText className="h-6 w-6"/>, title: "Comprehensive Health Assessment", desc: "Holistic H&P, medication review, diagnostics, and evidence‑based plan."},
            {icon: <ShieldCheck className="h-6 w-6"/>, title: "Behaviour Support", desc: "Structured plans, non‑pharmacological strategies, and review of antipsychotic use."},
            {icon: <Stethoscope className="h-6 w-6"/>, title: "Chronic Disease Management", desc: "Heart failure, pain, falls, skin integrity, and palliative care pathways."}
          ].map((s, i)=> (
            <Card key={i} className="rounded-2xl hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 rounded-xl bg-[#E6F4F2] text-[#0A3C5F]">{s.icon}</div>
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">{s.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">About GRACE</h2>
            <p className="mt-3 text-slate-600">
              GRACE stands for <strong>Geriatric Residential Aged Care Evaluations</strong>. We partner with RACFs, GPs and families to deliver safe, timely, guideline‑aligned care. Our approach blends compassionate bedside practice with robust clinical governance.
            </p>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-[#22A39A]"/> AHPRA‑endorsed Nurse Practitioner service model</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-[#22A39A]"/> PBS‑aware prescribing and deprescribing where appropriate</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-[#22A39A]"/> Clear documentation aligned to RACF workflows</li>
            </ul>
          </div>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#0A3C5F]">Key Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> 0433 778 876</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> NP@GRACEIntegratedHealth.com.au</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Port Macquarie, NSW</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">How it works</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {title: "Refer", desc: "RACF/GP sends referral with recent notes and medication chart.", icon: <FileText className="h-5 w-5"/>},
            {title: "Assess", desc: "NP conducts bedside assessment, reviews meds, orders diagnostics as needed.", icon: <Stethoscope className="h-5 w-5"/>},
            {title: "Plan & Review", desc: "Evidence‑based plan shared with GP & RACF; follow‑up and monitoring.", icon: <Calendar className="h-5 w-5"/>}
          ].map((step, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 rounded-xl bg-[#E6F4F2] text-[#0A3C5F]">{step.icon}</div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">{step.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#E6F4F2] to-transparent"/>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Contact</h2>
              <p className="mt-2 text-slate-600 max-w-prose">Have a resident who would benefit from a comprehensive review? Send a message and we'll respond within one business day.</p>
              <div className="mt-6 space-y-2 text-slate-700">
                <div className="flex items-center gap-2"><Phone className="h-5 w-5 text-[#0A3C5F]"/> 0433 778 876</div>
                <div className="flex items-center gap-2"><Mail className="h-5 w-5 text-[#0A3C5F]"/> NP@GRACEIntegratedHealth.com.au</div>
                <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-[#0A3C5F]"/> Port Macquarie, NSW</div>
              </div>
            </div>
            <LazyContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <GraceLogo className="w-36" />
          <div className="text-xs text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} GRACE Integrated Health. All rights reserved. | <a href="/privacy" className="hover:underline">Privacy</a> | <a href="/terms" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
