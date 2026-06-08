import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { DynamicIslandHeader } from '../components/DynamicIslandHeader';
import { Footer } from '../components/Footer';
import { FilmGrain } from '../components/FilmGrain';
import { NeonScene3D } from '../components/NeonScene3D';

const GOLD = '#D4A843';
const GOLD_DIM = 'rgba(212,168,67,0.65)';
const GOLD_BG = 'rgba(212,168,67,0.07)';
const GOLD_BORDER = 'rgba(212,168,67,0.2)';

export function WorkWithUs() {
  const { t, lang } = useLanguage();
  const w = t.workWithUs;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const [spName, setSpName] = useState('');
  const [spSkill, setSpSkill] = useState('');
  const [spPortfolio, setSpPortfolio] = useState('');
  const [spCvName, setSpCvName] = useState('');
  const [spSubmitting, setSpSubmitting] = useState(false);
  const [spSubmitted, setSpSubmitted] = useState(false);
  const [spFormError, setSpFormError] = useState('');

  const handleSpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spName || !spSkill) return;
    setSpSubmitting(true);
    setSpFormError('');
    try {
      const res = await fetch('/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'team',
          department: 'SPECIALISTS',
          contactName: spName,
          email: spPortfolio || 'N/A',
          phone: 'N/A',
          message: `[Specialist] ${spSkill}${spCvName ? ` | CV: ${spCvName}` : ''}`,
          language: lang,
        }),
      });
      if (!res.ok) throw new Error('failed');
      setSpSubmitted(true);
    } catch {
      setSpFormError(w.specialists.formError);
    } finally {
      setSpSubmitting(false);
    }
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !interest) return;
    setSubmitting(true);
    setFormError('');
    try {
      const res = await fetch('/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'team',
          department: 'PARTNERSHIPS',
          contactName: name,
          email: company,
          phone: 'N/A',
          message: `[${interest}] ${message}`,
          language: lang,
        }),
      });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
    } catch {
      setFormError(w.finalCta.formError);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(232,232,240,0.04)',
    border: '1px solid rgba(232,232,240,0.1)',
    color: '#E8E8F0',
  };

  const serviceRows = [
    [w.services.row1a, w.services.row1b, w.services.row1c],
    [w.services.row2a, w.services.row2b, w.services.row2c],
    [w.services.row3a, w.services.row3b, w.services.row3c],
    [w.services.row4a, w.services.row4b, w.services.row4c],
    [w.services.row5a, w.services.row5b, w.services.row5c],
  ];

  const studioCards = [
    { title: w.studio.card1Title, desc: w.studio.card1Desc },
    { title: w.studio.card2Title, desc: w.studio.card2Desc },
    { title: w.studio.card3Title, desc: w.studio.card3Desc },
    { title: w.studio.card4Title, desc: w.studio.card4Desc },
  ];

  const eventCards = [
    { title: w.events.card1Title, desc: w.events.card1Desc, num: '01' },
    { title: w.events.card2Title, desc: w.events.card2Desc, num: '02' },
    { title: w.events.card3Title, desc: w.events.card3Desc, num: '03' },
  ];

  const timeline = [
    { time: w.impactDay.time1, event: w.impactDay.event1 },
    { time: w.impactDay.time2, event: w.impactDay.event2 },
    { time: w.impactDay.time3, event: w.impactDay.event3 },
    { time: w.impactDay.time4, event: w.impactDay.event4 },
  ];

  return (
    <div
      className="relative overflow-x-hidden"
      style={{ background: '#080810', color: '#E8E8F0', fontFamily: "'Inter', sans-serif" }}
    >
      <FilmGrain />
      <DynamicIslandHeader />

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0">
          <NeonScene3D />
        </div>
        <div
          className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-[5] w-[min(100vw,1200px)] h-[90vh] pointer-events-none"
          style={{
            background:
              'radial-gradient(closest-side, rgba(6,6,15,0.93) 0%, rgba(6,6,15,0.82) 32%, rgba(6,6,15,0.5) 58%, rgba(6,6,15,0.18) 78%, transparent 100%)',
          }}
        />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pt-48 md:pt-56">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1
              className="mb-6 font-extrabold text-white mx-auto"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                fontSize: 'clamp(2rem, 4.5vw, 4.2rem)',
                textShadow: '0 2px 24px rgba(0,0,0,0.95)',
              }}
            >
              <span className="block whitespace-nowrap italic" style={{ color: 'rgba(232,232,240,0.7)', fontWeight: 400, fontSize: '0.9em' }}>
                {w.hero.headlineLine1}
              </span>
              <span className="block whitespace-nowrap">{w.hero.headlineLine2}</span>
            </h1>

            <p
              className="text-[#C4C9DA] text-base md:text-lg max-w-[620px] mx-auto leading-relaxed mb-12"
              style={{ textShadow: '0 1px 16px rgba(0,0,0,0.6)' }}
            >
              {w.hero.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => scrollTo('section-studio')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: GOLD_BG,
                  border: `1px solid ${GOLD_BORDER}`,
                  color: GOLD,
                }}
              >
                <ArrowRight size={14} />
                {w.hero.ctaSeeWork}
              </button>
              <button
                onClick={() => scrollTo('section-specialists')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: 'linear-gradient(135deg, #2D6EFF99, #2D6EFF55)',
                  border: '1px solid rgba(45,110,255,0.4)',
                }}
              >
                <ArrowRight size={14} />
                {w.hero.ctaContact}
              </button>
            </div>
          </motion.div>
        </div>
        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to bottom, transparent, #080810)' }}
        />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
          <div className="w-5 h-9 border border-[#E8E8F0]/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2.5 rounded-full" style={{ background: `linear-gradient(180deg, ${GOLD}, #2D6EFF)` }} />
          </div>
        </div>
      </section>

      {/* ── CSR SPONSORSHIP ── */}
      <section className="py-28 md:py-40 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 15% 50%, ${GOLD_BG} 0%, transparent 70%)` }}
        />
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-mono uppercase tracking-[0.25em] mb-5"
            style={{ color: GOLD_DIM }}
          >
            01 — CSR
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2
                className="font-bold text-[#E8E8F0] tracking-tight mb-6 leading-tight"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
              >
                {w.csr.title}
              </h2>
              <p className="text-[#E8E8F0]/65 text-base leading-relaxed mb-6">
                {w.csr.body}
              </p>

              {/* Tax callout — zero cost */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-xl p-5 flex gap-4 items-start"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}12 0%, ${GOLD}06 100%)`,
                  border: `1px solid ${GOLD}55`,
                }}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
                <div>
                  <p className="text-sm font-bold mb-1.5" style={{ color: GOLD }}>
                    {w.csr.taxBadge}
                  </p>
                  <p className="text-[#E8E8F0]/70 text-sm leading-relaxed">
                    {w.csr.taxNote}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {/* Visual calculator */}
              <div
                className="rounded-2xl p-8 mb-8 font-mono"
                style={{ background: GOLD_BG, border: GOLD_BORDER ? `1px solid ${GOLD_BORDER}` : undefined }}
              >
                {[
                  [w.csr.calcLabel1, w.csr.calcVal1, false],
                  [w.csr.calcLabel2, w.csr.calcVal2, false],
                  [w.csr.calcLabel3, w.csr.calcVal3, true],
                  [w.csr.calcLabel4, w.csr.calcVal4, false],
                ].map(([label, val, highlight], i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3"
                    style={{
                      borderBottom: i < 3 ? '1px solid rgba(212,168,67,0.12)' : undefined,
                    }}
                  >
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>{label as string}</span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: highlight ? GOLD : 'rgba(232,232,240,0.85)' }}
                    >
                      {val as string}
                    </span>
                  </div>
                ))}
              </div>

              {/* 3 sponsor type cards */}
              <div className="space-y-3 mb-5">
                {[
                  { title: w.csr.card1Title, desc: w.csr.card1Desc },
                  { title: w.csr.card2Title, desc: w.csr.card2Desc },
                  { title: w.csr.card3Title, desc: w.csr.card3Desc },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="flex gap-4 rounded-xl p-5"
                    style={{ background: 'rgba(232,232,240,0.03)', border: `1px solid ${GOLD_BORDER}` }}
                  >
                    <div
                      className="w-1.5 rounded-full flex-shrink-0 mt-1"
                      style={{ background: GOLD, minHeight: '1.2rem' }}
                    />
                    <div>
                      <p className="text-[#E8E8F0] font-semibold text-sm mb-1">{card.title}</p>
                      <p className="text-[#E8E8F0]/55 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES TABLE ── */}
      <section id="section-services" className="py-28 md:py-40 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-5" style={{ color: GOLD_DIM }}>
              02 — Services
            </p>
            <h2
              className="font-bold text-[#E8E8F0] tracking-tight"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {w.services.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(232,232,240,0.08)' }}
          >
            {/* Header row */}
            <div
              className="grid grid-cols-3 px-6 py-4"
              style={{ background: 'rgba(232,232,240,0.04)', borderBottom: '1px solid rgba(232,232,240,0.08)' }}
            >
              {[w.services.col1, w.services.col2, w.services.col3].map((col, i) => (
                <span key={i} className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: GOLD_DIM }}>
                  {col}
                </span>
              ))}
            </div>
            {/* Data rows */}
            {serviceRows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="grid grid-cols-3 px-6 py-5 group transition-colors"
                style={{
                  borderBottom: i < serviceRows.length - 1 ? '1px solid rgba(232,232,240,0.05)' : undefined,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = GOLD_BG)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span className="text-[#E8E8F0] font-semibold text-sm">{row[0]}</span>
                <span className="text-[#E8E8F0]/55 text-sm">{row[1]}</span>
                <span className="text-sm" style={{ color: GOLD_DIM }}>{row[2]}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SCAPESTUDIO ── */}
      <section id="section-studio" className="py-28 md:py-40 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 85% 50%, ${GOLD_BG} 0%, transparent 70%)` }}
        />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-5" style={{ color: GOLD_DIM }}>
              03 — Studio
            </p>
            <h2
              className="font-bold text-[#E8E8F0] tracking-tight"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {w.studio.title}
            </h2>
            <p className="text-xl mt-1 mb-8 italic" style={{ color: GOLD_DIM }}>
              {w.studio.subtitle}
            </p>
            <p className="text-[#E8E8F0]/65 text-base leading-relaxed max-w-2xl">
              {w.studio.body}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {studioCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                className="rounded-2xl p-7 flex flex-col gap-4"
                style={{ background: 'rgba(232,232,240,0.04)', border: `1px solid ${GOLD_BORDER}` }}
              >
                <span
                  className="text-3xl font-bold font-mono leading-none"
                  style={{ color: GOLD, opacity: 0.2 }}
                >
                  0{i + 1}
                </span>
                <div>
                  <p className="text-[#E8E8F0] font-bold text-sm mb-2">{card.title}</p>
                  <p className="text-[#E8E8F0]/60 text-sm leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-auto h-0.5 w-8 rounded-full" style={{ background: GOLD }} />
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-sm italic"
            style={{ color: 'rgba(232,232,240,0.35)' }}
          >
            {w.studio.note}
          </motion.p>
        </div>
      </section>

      {/* ── EVENTS PARTNERSHIPS ── */}
      <section className="py-28 md:py-40 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-14"
          >
            <div>
              <p className="text-sm font-mono uppercase tracking-[0.25em] mb-5" style={{ color: GOLD_DIM }}>
                04 — Events
              </p>
              <h2
                className="font-bold text-[#E8E8F0] tracking-tight mb-6 leading-tight"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
              >
                {w.events.title}
              </h2>
              <p className="text-[#E8E8F0]/65 text-base leading-relaxed">
                {w.events.body}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {eventCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl p-8 flex flex-col gap-5"
                style={{ background: 'rgba(232,232,240,0.04)', border: `1px solid ${GOLD_BORDER}` }}
              >
                <span
                  className="text-4xl font-bold font-mono leading-none"
                  style={{ color: GOLD, opacity: 0.15 }}
                >
                  {card.num}
                </span>
                <div>
                  <p className="text-[#E8E8F0] font-bold text-base mb-2">{card.title}</p>
                  <p className="text-[#E8E8F0]/60 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH IMPACT DAY ── */}
      <section className="py-28 md:py-40 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 50% at 50% 60%, ${GOLD_BG} 0%, transparent 70%)` }}
        />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-5" style={{ color: GOLD_DIM }}>
              05 — Tech Impact Day
            </p>
            <h2
              className="font-bold text-[#E8E8F0] tracking-tight"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {w.impactDay.title}
            </h2>
            <p className="text-xl mt-1 mb-8 italic" style={{ color: GOLD_DIM }}>
              {w.impactDay.subtitle}
            </p>
            <p className="text-[#E8E8F0]/65 text-base leading-relaxed max-w-2xl">
              {w.impactDay.body}
            </p>
          </motion.div>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* connecting line */}
            <div
              className="hidden md:block absolute top-6 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${GOLD}40, ${GOLD}40, transparent)` }}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col gap-3 pt-0 md:pt-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 relative z-10"
                      style={{ background: GOLD, boxShadow: `0 0 12px ${GOLD}66` }}
                    />
                    <span className="text-lg font-bold font-mono" style={{ color: GOLD }}>
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[#E8E8F0]/80 text-sm font-medium mt-2">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIALISTS & COLLABORATORS ── */}
      <section id="section-specialists" className="py-28 md:py-40 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 50% at 20% 50%, rgba(45,110,255,0.06) 0%, transparent 70%)' }}
        />
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-5" style={{ color: 'rgba(45,110,255,0.7)' }}>
              06 — Specialists
            </p>
            <h2
              className="font-bold text-[#E8E8F0] tracking-tight leading-tight mb-2"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {w.specialists.title}
            </h2>
            <p
              className="text-xl italic mb-8"
              style={{ color: 'rgba(45,110,255,0.65)' }}
            >
              {w.specialists.subtitle}
            </p>
            <p className="text-[#E8E8F0]/65 text-base leading-relaxed max-w-2xl">
              {w.specialists.body}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-8 md:p-10 mb-8"
            style={{ background: 'rgba(45,110,255,0.05)', border: '1px solid rgba(45,110,255,0.18)' }}
          >
            <AnimatePresence mode="wait">
              {spSubmitted ? (
                <motion.div
                  key="sp-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-5"
                    style={{ background: 'rgba(45,110,255,0.12)', border: '1px solid rgba(45,110,255,0.35)' }}
                  >
                    ✓
                  </div>
                  <p className="text-[#E8E8F0] font-semibold text-lg">{w.specialists.formSuccess}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="sp-form"
                  onSubmit={handleSpSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(45,110,255,0.6)' }}>
                        {w.specialists.namePh}
                      </label>
                      <input
                        type="text"
                        value={spName}
                        onChange={e => setSpName(e.target.value)}
                        required
                        placeholder="—"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(45,110,255,0.6)' }}>
                        {w.specialists.skillPh}
                      </label>
                      <input
                        type="text"
                        value={spSkill}
                        onChange={e => setSpSkill(e.target.value)}
                        required
                        placeholder="—"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(45,110,255,0.6)' }}>
                        {w.specialists.portfolioPh}
                      </label>
                      <input
                        type="text"
                        value={spPortfolio}
                        onChange={e => setSpPortfolio(e.target.value)}
                        placeholder="—"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <label
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm cursor-pointer transition-colors hover:border-[#2D6EFF]/40"
                      style={{ background: 'rgba(232,232,240,0.04)', border: '1px solid rgba(232,232,240,0.1)', color: 'rgba(232,232,240,0.5)' }}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={e => setSpCvName(e.target.files?.[0]?.name ?? '')}
                      />
                      <span style={{ color: '#2D6EFF' }}>{w.specialists.cvLabel}</span>
                      {spCvName && <span className="truncate max-w-[140px]" style={{ color: 'rgba(232,232,240,0.7)' }}>{spCvName}</span>}
                    </label>

                    <button
                      type="submit"
                      disabled={spSubmitting}
                      className="flex-shrink-0 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)' }}
                    >
                      {spSubmitting ? '...' : w.specialists.submit}
                    </button>
                  </div>

                  {spFormError && (
                    <p className="text-red-400 text-sm mt-3">{spFormError}</p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* WhatsApp pill */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(232,232,240,0.1)' }} />
            <p className="text-sm" style={{ color: 'rgba(232,232,240,0.4)' }}>
              {w.specialists.alreadyDecided}
            </p>
            <a
              href="https://chat.whatsapp.com/GAtJiZN895L8QxMhSz2snz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-[1.03]"
              style={{
                background: 'rgba(37,211,102,0.1)',
                border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366',
              }}
            >
              <span style={{ fontSize: '0.85em' }}>●</span>
              {w.specialists.whatsappLabel}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'rgba(37,211,102,0.7)', fontSize: '0.9em' }}><ArrowRight size={11} /> {w.specialists.whatsappCta}</span>
            </a>
          </motion.div>
        </div>
      </section>


      {/* ── FINAL CTA FORM ── */}
      <section id="section-contact" className="py-24 md:py-36 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-mono uppercase tracking-[0.25em] mb-5" style={{ color: GOLD_DIM }}>
              07 — Contact
            </p>
            <h2
              className="font-bold text-[#E8E8F0] tracking-tight"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              {w.finalCta.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-8 md:p-10"
            style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-5"
                    style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}44` }}
                  >
                    ✓
                  </div>
                  <p className="text-[#E8E8F0] font-semibold text-lg">{w.finalCta.formSuccess}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(212,168,67,0.55)' }}>
                        {w.finalCta.namePh}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        placeholder="—"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(212,168,67,0.55)' }}>
                        {w.finalCta.companyPh}
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        required
                        placeholder="—"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(212,168,67,0.55)' }}>
                      {w.finalCta.interestLabel}
                    </label>
                    <select
                      value={interest}
                      onChange={e => setInterest(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none cursor-pointer appearance-none"
                      style={inputStyle}
                    >
                      <option value="" disabled style={{ background: '#080810' }}>
                        {w.finalCta.interestDefault}
                      </option>
                      {w.finalCta.interests.map(opt => (
                        <option key={opt} value={opt} style={{ background: '#080810' }}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(212,168,67,0.55)' }}>
                      {w.finalCta.messagePh}
                    </label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={3}
                      placeholder="—"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                      style={inputStyle}
                    />
                  </div>

                  {formError && (
                    <p className="text-red-400/80 text-xs mb-4 font-mono">{formError}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3.5 rounded-xl text-sm font-bold text-[#080810] transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-40"
                      style={{ background: GOLD, letterSpacing: '0.05em' }}
                    >
                      {submitting ? '...' : w.finalCta.submit}
                    </button>
                    <span className="text-xs" style={{ color: 'rgba(232,232,240,0.35)' }}>
                      {w.finalCta.orEmail}{' '}
                      <a
                        href="mailto:partnership@scapelabs.ro"
                        className="hover:underline"
                        style={{ color: GOLD_DIM }}
                      >
                        partnership@scapelabs.ro
                      </a>
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
