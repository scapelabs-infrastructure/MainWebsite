import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const WA_LINK = 'https://chat.whatsapp.com/GLOwIzmGZl21VmQsYqnsgN';
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

function OidBadge({ label, value, note }: { label: string; value: string; note: string }) {
  const [displayed, setDisplayed] = useState('??????????????????');
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
          let tick = 0;
          const total = 28;
          const id = setInterval(() => {
            tick++;
            if (tick >= total) {
              clearInterval(id);
              setDisplayed(value);
            } else {
              const progress = Math.floor(((tick - 10) / (total - 10)) * value.length);
              setDisplayed(
                Array.from({ length: value.length }, (_, i) =>
                  tick > 10 && i < progress
                    ? value[i]
                    : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                ).join('')
              );
            }
          }, 55);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, revealed]);

  return (
    <div
      ref={ref}
      className="inline-flex flex-col gap-1.5 rounded-2xl px-7 py-5 mt-8"
      style={{
        background: 'rgba(45,110,255,0.07)',
        border: '1px solid rgba(45,110,255,0.22)',
      }}
    >
      <span className="text-xs font-mono text-[#2D6EFF]/50 uppercase tracking-widest">{label}</span>
      <span className="text-xl md:text-2xl font-bold font-mono text-[#2D6EFF] tracking-wider">{displayed}</span>
      <span className="text-xs text-[#E8E8F0]/30 mt-0.5">{note}</span>
    </div>
  );
}

function WaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function JoinUs() {
  const { t, lang } = useLanguage();
  const j = t.joinUs;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !selectedTrack) return;
    setSubmitting(true);
    setFormError('');
    try {
      const res = await fetch('/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'team',
          department: 'ACADEMY',
          contactName: name,
          email,
          phone: 'N/A',
          message: `Academy Track: ${selectedTrack}`,
          language: lang,
        }),
      });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
    } catch {
      setFormError(j.academy.formError);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    background: 'rgba(232,232,240,0.04)',
    border: '1px solid rgba(232,232,240,0.1)',
    color: '#E8E8F0',
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: '#080810', color: '#E8E8F0', fontFamily: "'Inter', sans-serif" }}
    >
      {/* Back nav */}
      <div className="fixed top-6 left-6 z-50">
        <a
          href="/"
          className="text-xs font-mono text-[#E8E8F0]/25 hover:text-[#E8E8F0]/55 transition-colors"
        >
          ← scapelabs.ro
        </a>
      </div>

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 50% 40%, rgba(45,110,255,0.08) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-xs font-mono text-[#2D6EFF]/50 uppercase tracking-[0.3em] mb-6 block">
            ScapeLabs
          </span>
          <h1
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-[#E8E8F0] tracking-tight leading-[1.06] mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {j.hero.headline}
          </h1>
          <p className="text-[#E8E8F0]/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-14">
            {j.hero.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollTo('section-community')}
              className="px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2.5"
              style={{
                background: 'rgba(45,110,255,0.1)',
                border: '1px solid rgba(45,110,255,0.32)',
                color: '#E8E8F0',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6EFF] animate-pulse inline-block" />
              {j.hero.pillCommunity}
            </button>
            <button
              onClick={() => scrollTo('section-academy')}
              className="px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2.5"
              style={{
                background: 'linear-gradient(135deg, rgba(45,110,255,0.15), rgba(123,63,228,0.18))',
                border: '1px solid rgba(123,63,228,0.38)',
                color: '#E8E8F0',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B3FE4] animate-pulse inline-block" />
              {j.hero.pillAcademy}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#E8E8F0]/15 mx-auto" />
        </motion.div>
      </section>

      {/* ── COMMUNITY ── */}
      <section id="section-community" className="py-28 md:py-40 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 60% at 15% 50%, rgba(45,110,255,0.05) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="text-xs font-mono text-[#2D6EFF]/45 uppercase tracking-[0.25em] mb-5 block">
              01 — Community
            </span>
            <h2
              className="text-4xl md:text-6xl font-bold text-[#E8E8F0] tracking-tight mb-8 max-w-3xl leading-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {j.community.title}
            </h2>
            <p className="text-[#E8E8F0]/55 text-base md:text-lg leading-relaxed max-w-2xl mb-14">
              {j.community.body}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {[
              { title: j.community.card1Title, desc: j.community.card1Desc, glyph: '⟨/⟩' },
              { title: j.community.card2Title, desc: j.community.card2Desc, glyph: '◎' },
              { title: j.community.card3Title, desc: j.community.card3Desc, glyph: '★' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl p-6"
                style={{
                  background: 'rgba(8,8,16,0.7)',
                  border: '1px solid rgba(232,232,240,0.07)',
                }}
              >
                <span className="text-lg text-[#2D6EFF]/35 mb-4 block font-mono">{card.glyph}</span>
                <p className="text-[#E8E8F0] font-semibold text-sm mb-2">{card.title}</p>
                <p className="text-[#E8E8F0]/45 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              letterSpacing: '0.04em',
            }}
          >
            <WaIcon size={18} />
            {j.community.cta}
          </motion.a>
        </div>
      </section>

      {/* ── EU TICKET ── */}
      <section id="section-eu" className="py-28 md:py-40 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 60% at 85% 50%, rgba(123,63,228,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="text-xs font-mono text-[#7B3FE4]/45 uppercase tracking-[0.25em] mb-5 block">
                02 — EU Strategy
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#E8E8F0] tracking-tight mb-6 leading-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {j.eu.title}
              </h2>
              <p className="text-[#E8E8F0]/55 text-base leading-relaxed mb-2">
                {j.eu.body}
              </p>
              <OidBadge label={j.eu.oidLabel} value={j.eu.oidValue} note={j.eu.oidNote} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="space-y-3 lg:pt-16"
            >
              {[
                { flag: '🇪🇺', label: 'Erasmus+', desc: j.eu.erasmusDesc },
                { flag: '🌍', label: 'European Solidarity Corps', desc: j.eu.escDesc },
                { flag: '✈️', label: j.eu.travelLabel, desc: j.eu.travelDesc },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  className="flex gap-4 items-start rounded-xl p-5"
                  style={{
                    background: 'rgba(8,8,16,0.6)',
                    border: '1px solid rgba(123,63,228,0.1)',
                  }}
                >
                  <span className="text-2xl flex-shrink-0">{item.flag}</span>
                  <div>
                    <p className="text-[#E8E8F0] font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-[#E8E8F0]/45 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ACADEMY ── */}
      <section id="section-academy" className="py-28 md:py-40 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(123,63,228,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-16"
          >
            <span className="text-xs font-mono text-[#7B3FE4]/45 uppercase tracking-[0.25em] mb-5 block">
              03 — Academy
            </span>
            <h2
              className="text-4xl md:text-6xl font-bold text-[#E8E8F0] tracking-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {j.academy.title}
            </h2>
            <p
              className="text-xl md:text-2xl mt-2 mb-8"
              style={{ color: 'rgba(123,63,228,0.65)', fontStyle: 'italic', fontFamily: "'Inter', sans-serif" }}
            >
              {j.academy.subtitle}
            </p>
            <p className="text-[#E8E8F0]/55 text-base leading-relaxed max-w-2xl">
              {j.academy.body}
            </p>
          </motion.div>

          {/* 3 tracks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {[
              { title: j.academy.track1Title, desc: j.academy.track1Desc, color: '#2D6EFF', num: '01' },
              { title: j.academy.track2Title, desc: j.academy.track2Desc, color: '#7B3FE4', num: '02' },
              { title: j.academy.track3Title, desc: j.academy.track3Desc, color: '#0EA5E9', num: '03' },
            ].map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl p-7 flex flex-col gap-4"
                style={{
                  background: 'rgba(8,8,16,0.7)',
                  border: `1px solid ${track.color}18`,
                }}
              >
                <span
                  className="text-4xl font-bold font-mono leading-none"
                  style={{ color: track.color, opacity: 0.18 }}
                >
                  {track.num}
                </span>
                <div>
                  <p className="text-[#E8E8F0] font-bold text-base mb-2">{track.title}</p>
                  <p className="text-[#E8E8F0]/48 text-sm leading-relaxed">{track.desc}</p>
                </div>
                <div
                  className="mt-auto h-0.5 w-10 rounded-full"
                  style={{ background: track.color }}
                />
              </motion.div>
            ))}
          </div>

          {/* Inline pre-register form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: 'rgba(8,8,16,0.85)',
              border: '1px solid rgba(123,63,228,0.18)',
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-5"
                    style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)' }}
                  >
                    ✓
                  </div>
                  <p className="text-[#E8E8F0] font-semibold text-lg mb-7">{j.academy.formSuccess}</p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                  >
                    <WaIcon size={16} />
                    {j.academy.formSuccessCta}
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-[#E8E8F0]/35 uppercase tracking-[0.2em] mb-2">
                        {j.academy.formName}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        placeholder="—"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
                        style={inputStyle}
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-[#E8E8F0]/35 uppercase tracking-[0.2em] mb-2">
                        {j.academy.formEmail}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="—"
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
                        style={inputStyle}
                      />
                    </div>
                    {/* Track */}
                    <div>
                      <label className="block text-xs font-mono text-[#E8E8F0]/35 uppercase tracking-[0.2em] mb-2">
                        {j.academy.formTrack}
                      </label>
                      <select
                        value={selectedTrack}
                        onChange={e => setSelectedTrack(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none cursor-pointer appearance-none"
                        style={inputStyle}
                      >
                        <option value="" disabled style={{ background: '#080810' }}>
                          {j.academy.formTrackDefault}
                        </option>
                        {j.academy.trackOptions.map(opt => (
                          <option key={opt} value={opt} style={{ background: '#080810' }}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {formError && (
                    <p className="text-red-400/80 text-xs mb-4 font-mono">{formError}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-40"
                      style={{
                        background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {submitting ? j.academy.formSubmitting : j.academy.formSubmit}
                    </button>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs transition-colors"
                      style={{ color: 'rgba(37,211,102,0.55)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(37,211,102,0.85)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(37,211,102,0.55)')}
                    >
                      <WaIcon size={13} />
                      {j.academy.orJoinCommunity}
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── THE VIBE ── */}
      <section id="section-vibe" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono text-[#E8E8F0]/20 uppercase tracking-[0.25em] mb-8"
          >
            04 — {j.vibe.title}
          </motion.p>
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{
              border: '1px solid rgba(232,232,240,0.06)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {[
              { title: j.vibe.stat1, desc: j.vibe.stat1Desc, accent: '#2D6EFF' },
              { title: j.vibe.stat2, desc: j.vibe.stat2Desc, accent: '#7B3FE4' },
              { title: j.vibe.stat3, desc: j.vibe.stat3Desc, accent: '#0EA5E9' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8"
                style={{
                  background: '#080810',
                  borderRight: i < 2 ? '1px solid rgba(232,232,240,0.06)' : undefined,
                }}
              >
                <div
                  className="w-8 h-0.5 rounded-full mb-6"
                  style={{ background: stat.accent }}
                />
                <p className="text-[#E8E8F0] font-bold text-base mb-2">{stat.title}</p>
                <p className="text-[#E8E8F0]/42 text-sm leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(232,232,240,0.07)' }}
          >
            {/* Community */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="p-10 md:p-12 flex flex-col justify-between gap-8"
              style={{
                background: 'rgba(45,110,255,0.04)',
                borderRight: '1px solid rgba(232,232,240,0.07)',
              }}
            >
              <div>
                <span className="text-xs font-mono text-[#2D6EFF]/45 uppercase tracking-[0.2em] mb-4 block">
                  Community
                </span>
                <p className="text-[#E8E8F0] text-xl md:text-2xl font-semibold leading-snug">
                  {j.finalCta.leftTitle}
                </p>
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.03]"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
              >
                <WaIcon size={15} />
                {j.finalCta.leftCta}
              </a>
            </motion.div>

            {/* Academy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="p-10 md:p-12 flex flex-col justify-between gap-8"
              style={{ background: 'rgba(123,63,228,0.04)' }}
            >
              <div>
                <span className="text-xs font-mono text-[#7B3FE4]/45 uppercase tracking-[0.2em] mb-4 block">
                  Academy
                </span>
                <p className="text-[#E8E8F0] text-xl md:text-2xl font-semibold leading-snug">
                  {j.finalCta.rightTitle}
                </p>
              </div>
              <button
                onClick={() => scrollTo('section-academy')}
                className="self-start px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.03]"
                style={{ background: 'linear-gradient(135deg, #2D6EFF, #7B3FE4)' }}
              >
                {j.finalCta.rightCta}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pb-12 px-6 text-center">
        <p className="text-[#E8E8F0]/12 text-xs font-mono">
          © Asociația ScapeLabs · București, România
        </p>
      </div>
    </div>
  );
}
