import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Lock, Rocket, Target, Zap, CheckCircle2, Check } from 'lucide-react';
import backend from '~backend/client';

type Department = 'GROWTH' | 'COMMS' | 'INNOVATION' | null;

interface FormData {
  email: string;
}

const departmentThemes = {
  default: '#00F0FF',
  GROWTH: '#2962FF',
  COMMS: '#FF00FF',
  INNOVATION: '#FF9100',
};

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ email: '' });
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(null);
  const [isCommitted, setIsCommitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accentColor = selectedDepartment ? departmentThemes[selectedDepartment] : departmentThemes.default;

  const nextStep = () => {
    if (currentStep < 9) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      if (currentStep === 7) {
        setSelectedDepartment(null);
      }
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async () => {
    if (!selectedDepartment) return;
    
    setIsSubmitting(true);
    try {
      await backend.forms.submit({
        formType: 'team',
        contactName: 'Onboarding Volunteer',
        email: formData.email,
        phone: 'N/A',
        department: selectedDepartment,
      });
      nextStep();
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('A apărut o eroare. Te rugăm să încerci din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = formData.email.includes('@');
  const canProceedStep6 = selectedDepartment !== null;
  const canProceedStep8 = isCommitted;

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      <AnimatedBackground accentColor={accentColor} />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <AnimatePresence mode="wait">
            {currentStep === 1 && <Step1 key="step1" accentColor={accentColor} formData={formData} setFormData={setFormData} onNext={nextStep} canProceed={canProceedStep1} />}
            {currentStep === 2 && <Step2 key="step2" accentColor={accentColor} onNext={nextStep} onBack={prevStep} />}
            {currentStep === 3 && <Step3 key="step3" accentColor={accentColor} onNext={nextStep} onBack={prevStep} />}
            {currentStep === 4 && <Step4 key="step4" accentColor={accentColor} onNext={nextStep} onBack={prevStep} />}
            {currentStep === 5 && <Step5 key="step5" accentColor={accentColor} onNext={nextStep} onBack={prevStep} />}
            {currentStep === 6 && <Step6 key="step6" accentColor={accentColor} selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} onNext={nextStep} onBack={prevStep} canProceed={canProceedStep6} />}
            {currentStep === 7 && <Step7 key="step7" accentColor={accentColor} department={selectedDepartment!} onNext={nextStep} onBack={prevStep} />}
            {currentStep === 8 && <Step8 key="step8" accentColor={accentColor} isCommitted={isCommitted} setIsCommitted={setIsCommitted} onNext={handleFormSubmit} onBack={prevStep} canProceed={canProceedStep8} isSubmitting={isSubmitting} />}
            {currentStep === 9 && <Step9 key="step9" accentColor={accentColor} />}
          </AnimatePresence>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={9} accentColor={accentColor} />
      </div>
    </div>
  );
}

function AnimatedBackground({ accentColor }: { accentColor: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${accentColor}22 1px, transparent 1px),
            linear-gradient(90deg, ${accentColor}22 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity as any,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}11, transparent 70%)`,
        }}
      />
    </div>
  );
}

function ProgressBar({ currentStep, totalSteps, accentColor }: { currentStep: number; totalSteps: number; accentColor: string }) {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
      <motion.div
        className="h-full"
        style={{ backgroundColor: accentColor }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

function Step1({ accentColor, formData, setFormData, onNext, canProceed }: { accentColor: string; formData: FormData; setFormData: (data: FormData) => void; onNext: () => void; canProceed: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8 w-full px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight" style={{ color: accentColor }}>
        INTRODU ADRESA DE EMAIL PENTRU A ÎNCEPE INIȚIEREA.
      </h1>

      <div className="space-y-6 font-mono mt-12">
        <div>
          <label className="block text-sm mb-2 opacity-60">{'>'} EMAIL</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ email: e.target.value })}
            className="w-full bg-black/50 border-2 px-4 py-3 text-lg focus:outline-none focus:ring-2"
            style={{ borderColor: accentColor, boxShadow: `0 0 20px ${accentColor}33` }}
            placeholder="_"
          />
        </div>
      </div>

      <p className="text-sm text-white/40 text-center">
        Datele sunt confidențiale, folosite exclusiv pentru contractul de voluntariat și comunicarea internă.
      </p>

      <div className="flex justify-end">
        <NextButton accentColor={accentColor} onClick={onNext} disabled={!canProceed} />
      </div>
    </motion.div>
  );
}

function Step2({ accentColor, onNext, onBack }: { accentColor: string; onNext: () => void; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto text-center space-y-8"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <Lock className="w-24 h-24 mx-auto" style={{ color: accentColor }} />
      </motion.div>
      
      <h1 className="text-6xl md:text-8xl font-bold tracking-tight" style={{ color: accentColor }}>
        ACCESS GRANTED.
      </h1>
      
      <p className="text-2xl md:text-3xl text-white/80">
        Bine ai venit în Echipa de Fondare ScapeLabs Association.
      </p>
      
      <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mx-auto">
        Ai fost selectat pentru viziunea și potențialul tău. Ceea ce urmează este protocolul de inițiere. La final, vei fi membru cu drepturi depline în ecosistemul care rescrie interacțiunea dintre tehnologie, educație și spațiul public.
      </p>

      <div className="flex justify-between items-center">
        <BackButton accentColor={accentColor} onClick={onBack} />
        <NextButton accentColor={accentColor} onClick={onNext} />
      </div>
    </motion.div>
  );
}

function Step3({ accentColor, onNext, onBack }: { accentColor: string; onNext: () => void; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight" style={{ color: accentColor }}>
        VIITORUL NU SE ÎNTÂMPLĂ. NOI ÎL CONSTRUIM.
      </h1>

      <div className="text-lg md:text-xl text-white/80 leading-relaxed space-y-4">
        <p>
          Imaginează-ți un București în care fațadele clădirilor istorice prind viață noaptea prin proiecții care spun poveștile trecutului - dar nu proiecții statice - ci cu care poți interacționa si juca. Imaginează-ți săli de clasă unde elevii nu doar privesc imagini statice, ci pășesc în interiorul celulei umane sau explorează sistemul solar prin Realitate Augmentată. Imaginează-ți venues unde roboți sociali te ghidează și interacționează cu tine, transformând spațiul urban într-o experiență ludică.
        </p>
        <p>
          Aceasta nu este o fantezie. Este ScapeLabs Association. Suntem laboratorul de inovație care aduce tehnologia din SF în realitatea imediată, pentru a educa, a inspira și a conecta comunitatea. Nu suntem spectatori, suntem arhitecții noii realități.
        </p>
      </div>

      <div className="flex justify-between items-center pt-8">
        <BackButton accentColor={accentColor} onClick={onBack} />
        <NextButton accentColor={accentColor} onClick={onNext} />
      </div>
    </motion.div>
  );
}

function Step4({ accentColor, onNext, onBack }: { accentColor: string; onNext: () => void; onBack: () => void }) {
  const projects = [
    {
      title: 'TREASURE HUNT URBAN-DIGITAL',
      icon: Target,
      content: 'O aplicație mobilă care gamifică explorarea orașului. Utilizatorii vor rezolva indicii ascunse în arhitectura urbană, vor debloca conținut AR la locații cheie și vor concura în timp real. Transformăm orașul într-un imens teren de joacă inteligent.',
    },
    {
      title: 'PROIECȚIE INTERACTIVĂ (VIDEO MAPPING)',
      icon: Zap,
      content: 'O instalație de artă vizuală care transformă o clădire statică într-un ecran de joc interactiv. Folosind proiectoare de mare putere și telefoanele privitorilor, vom crea o experiență în care trecătorii pot influența vizualul de pe clădire prin mișcările lor, ștergând granița dintre spectator și artist.',
    },
    {
      title: 'ROBOT PENTRU WORKSHOPS',
      icon: Rocket,
      content: 'Vom dezvolta un robot social, prietenos, capabil să țină workshop-uri interactive pentru copii. Nu este o jucărie, ci un asistent educațional autonom, dotat cu senzori și inteligență, care va merge în școli și va preda lecții de tehnologie într-un mod revoluționar.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center" style={{ color: accentColor }}>
        CE CONSTRUIM ÎN Q1?
      </h1>

      <p className="text-lg text-white/60 text-center leading-relaxed">
        Acestea sunt direcțiile noastre inițiale, dar suntem deschiși să explorăm și alte proiecte în procesele de ideation alături de voi.
      </p>

      <div className="space-y-4">
        {projects.map((project, idx) => {
          const Icon = project.icon;
          
          return (
            <motion.div
              key={idx}
              className="border-2 overflow-hidden"
              style={{ borderColor: accentColor }}
            >
              <div className="p-6 flex items-center gap-4">
                <Icon className="w-8 h-8 flex-shrink-0" style={{ color: accentColor }} />
                <h3 className="text-xl md:text-2xl font-bold flex-1">{project.title}</h3>
              </div>
              
              <div className="px-6 pb-6">
                <p className="text-white/80 leading-relaxed">{project.content}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-8">
        <BackButton accentColor={accentColor} onClick={onBack} />
        <NextButton accentColor={accentColor} onClick={onNext} />
      </div>
    </motion.div>
  );
}

function Step5({ accentColor, onNext, onBack }: { accentColor: string; onNext: () => void; onBack: () => void }) {
  const objectives = [
    { label: 'FINANȚARE', value: 'Atragerea a peste 15.000 € din surse private și granturi pentru a finanța inovația.' },
    { label: 'IMPLEMENTARE', value: 'Finalizarea prototipurilor funcționale pentru cele 3 proiecte pilot.' },
    { label: 'LANSARE', value: 'Evenimente publice de amploare și chemarea presei pentru a prezenta rezultatele.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center" style={{ color: accentColor }}>
        ȚINTELE NOASTRE PENTRU Q1.
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {objectives.map((obj, idx) => (
          <motion.div
            key={idx}
            className="border-2 p-6 space-y-4"
            style={{ borderColor: accentColor }}
            whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${accentColor}66` }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-center" style={{ color: accentColor }}>
              {obj.label}
            </h3>
            <p className="text-white/80 text-center leading-relaxed">{obj.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-8">
        <BackButton accentColor={accentColor} onClick={onBack} />
        <NextButton accentColor={accentColor} onClick={onNext} />
      </div>
    </motion.div>
  );
}

function Step6({ accentColor, selectedDepartment, setSelectedDepartment, onNext, onBack, canProceed }: { accentColor: string; selectedDepartment: Department; setSelectedDepartment: (dept: Department) => void; onNext: () => void; onBack: () => void; canProceed: boolean }) {
  const departments = [
    { id: 'GROWTH' as Department, name: 'GROWTH & PARTNERSHIPS', color: departmentThemes.GROWTH },
    { id: 'COMMS' as Department, name: 'BRAND & COMMUNITY', color: departmentThemes.COMMS },
    { id: 'INNOVATION' as Department, name: 'URBAN INNOVATION LAB', color: departmentThemes.INNOVATION },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto space-y-8 px-4"
    >
      <h1 className="text-3xl md:text-5xl font-bold text-center" style={{ color: accentColor }}>
        CONFIRMĂ DEPARTAMENTUL PENTRU CARE AI FOST SELECTAT.
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const isSelected = selectedDepartment === dept.id;
          
          return (
            <motion.div
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className="border-2 p-8 cursor-pointer text-center space-y-4 relative overflow-hidden"
              style={{
                borderColor: isSelected ? dept.color : '#ffffff33',
                backgroundColor: isSelected ? dept.color : 'transparent',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl md:text-2xl font-bold relative z-10" style={{ color: isSelected ? '#ffffff' : dept.color }}>
                {dept.name}
              </h3>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative z-10"
                >
                  <Check className="w-12 h-12 mx-auto text-white" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-8">
        <BackButton accentColor={accentColor} onClick={onBack} />
        <NextButton accentColor={accentColor} onClick={onNext} disabled={!canProceed} />
      </div>
    </motion.div>
  );
}

function Step7({ accentColor, department, onNext, onBack }: { accentColor: string; department: Department; onNext: () => void; onBack: () => void }) {
  const content: Record<string, { title: string; role: string; arsenal: string[]; loot: string[] }> = {
    GROWTH: {
      title: 'GROWTH & PARTNERSHIPS',
      role: 'Ești motorul economic, strategul care transformă viziunea în resurse concrete. Împreună cu colegii tăi, vei construi punțile dintre ideile noastre radicale și capitalul necesar.',
      arsenal: [
        'Vânătoarea de "Angels": Identifici antreprenori vizionari, pregătești pitch-uri și participi la negocieri pentru a securiza "Parteneri Fondatori".',
        'Sistemul de Granturi: Cauți oportunități de finanțare și scrii aplicații câștigătoare (AFCN, Start ONG).',
        'Arhitectura Parteneriatelor: Definești pachete de beneficii pentru sponsori.',
      ],
      loot: [
        'Carieră Accelerată în Business Development.',
        'Networking de Elită cu CEO și directori.',
        'Comision & Oportunitate de Angajare ca Manager pe proiecte.',
      ],
    },
    COMMS: {
      title: 'BRAND & COMMUNITY',
      role: 'Ești vocea mișcării. Îți oferim "microfonul", iar tu traduci tehnologia în emoție și viralitate. Construiești comunitatea ScapeLabs Association, pe toate canalele posibile. De asemenea, skill-urile tale vizuale sunt foarte valoroase echipei de Inovare.',
      arsenal: [
        'Expertiză AI: Vei avea acces la unelte de ultimă oră (inclusiv Nano Banana Pro) și prompt-uri high-end pentru a genera vizualuri spectaculoase.',
        'Socials: Creezi conținut video scurt (Reels/TikTok), carusele educaționale și interacționezi activ cu comunitatea (reposts, stories, LinkedIn).',
        'Media Relations: Construiești parteneriate cu presa și blogurile.',
      ],
      loot: [
        'Skill-uri "Future-Proof" în AI content creation.',
        'Portofoliu vizual de impact.',
        'Libertate creativă și șansa de angajare ca Brand Manager.',
      ],
    },
    INNOVATION: {
      title: 'URBAN INNOVATION LAB',
      role: 'Ești inginerul sau artistul sistemului. Tu faci lucrurile să se miște, să interacționeze și să gândească.',
      arsenal: [
        'Game & App Dev: Dezvolți în Unity 3D și faci Web Development avansat.',
        'Hardware Hacking: Prototipare cu Arduino, Raspberry Pi, senzori și te vei folosi de mecanică pentru robotică.',
        'Visual Magic: Modelare 3D, Artă 2D, Video Mapping și aplicații AR.',
        'AI Coding: Folosești AI pentru code generation și vibe coding.',
      ],
      loot: [
        'Acces la o echipă de specialiști cu care vei colabora pentru implementare, și acces la echipamente.',
        'Credit public pe proiecte ("Co-creat de...").',
        'Șansa de a fi angajat în firma ScapeLabs pentru dezvoltarea comercială a produselor.',
      ],
    },
  };

  const data = department ? content[department] : content.GROWTH;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center" style={{ color: accentColor }}>
        {data.title}
      </h1>

      <div className="space-y-6 text-lg text-white/80 leading-relaxed">
        <div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: accentColor }}>Rolul Tău:</h2>
          <p>{data.role}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: accentColor }}>Arsenalul Tău:</h2>
          <ul className="space-y-2">
            {data.arsenal.map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <span style={{ color: accentColor }}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: accentColor }}>Loot:</h2>
          <ul className="space-y-2">
            {data.loot.map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <span style={{ color: accentColor }}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8">
        <BackButton accentColor={accentColor} onClick={onBack} />
        <NextButton accentColor={accentColor} onClick={onNext} />
      </div>
    </motion.div>
  );
}

function Step8({ accentColor, isCommitted, setIsCommitted, onNext, onBack, canProceed, isSubmitting }: { accentColor: string; isCommitted: boolean; setIsCommitted: (val: boolean) => void; onNext: () => void; onBack: () => void; canProceed: boolean; isSubmitting: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center" style={{ color: accentColor }}>
        MODUL DE LUCRU.
      </h1>

      <div className="space-y-6 text-lg text-white/80 leading-relaxed">
        <div className="flex gap-4">
          <span className="font-bold" style={{ color: accentColor }}>Flexibilitate:</span>
          <p>Implicarea estimată este de câteva ore pe săptămână, flexibil, în funcție de proiecte și obiectivele stabilite împreună.</p>
        </div>

        <div className="flex gap-4">
          <span className="font-bold" style={{ color: accentColor }}>Comunicare:</span>
          <p>Rapidă pe WhatsApp. Avem și call-uri de sincronizare săptămânale cu departamentul.</p>
        </div>

        <div className="flex gap-4">
          <span className="font-bold" style={{ color: accentColor }}>Proactivitate:</span>
          <p>Propui idei, iei inițiativă.</p>
        </div>

        <div className="flex gap-4">
          <span className="font-bold" style={{ color: accentColor }}>Legal:</span>
          <p>Contractul de voluntariat se semnează după finalizarea înființării juridice (estimat Februarie 2026).</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-6 border-2 cursor-pointer" style={{ borderColor: accentColor }} onClick={() => setIsCommitted(!isCommitted)}>
        <div
          className="w-6 h-6 border-2 flex items-center justify-center flex-shrink-0"
          style={{ borderColor: accentColor }}
        >
          {isCommitted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4"
              style={{ backgroundColor: accentColor }}
            />
          )}
        </div>
        <span className="text-lg">Sunt gata să încep.</span>
      </div>

      <div className="flex justify-between items-center pt-8">
        <BackButton accentColor={accentColor} onClick={onBack} />
        <NextButton accentColor={accentColor} onClick={onNext} disabled={!canProceed || isSubmitting} label={isSubmitting ? 'SE TRIMITE...' : undefined} />
      </div>
    </motion.div>
  );
}

function Step9({ accentColor }: { accentColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="max-w-2xl mx-auto text-center space-y-8 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        <CheckCircle2 className="w-32 h-32 mx-auto" style={{ color: accentColor }} />
      </motion.div>

      <h1 className="text-4xl md:text-6xl font-bold" style={{ color: accentColor }}>
        INIȚIERE FINALIZATĂ.
      </h1>

      <p className="text-xl text-white/80 leading-relaxed">
        Mulțumim! Aplicația ta a fost înregistrată. Vei fi contactat în scurt timp pentru următorii pași.
      </p>

      <motion.a
        href="https://association.scapelabs.io"
        className="inline-block px-12 py-4 text-xl font-bold tracking-wider border-2 mt-12"
        style={{ borderColor: accentColor, color: accentColor }}
        whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${accentColor}66` }}
        whileTap={{ scale: 0.95 }}
      >
        ÎNAPOI LA PAGINA PRINCIPALĂ
      </motion.a>
    </motion.div>
  );
}

function NextButton({ accentColor, onClick, disabled = false, label }: { accentColor: string; onClick: () => void; disabled?: boolean; label?: string }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="group relative p-6 rounded-full border-2 disabled:opacity-30 disabled:cursor-not-allowed"
      style={{ borderColor: accentColor }}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      animate={!disabled ? { boxShadow: [`0 0 20px ${accentColor}66`, `0 0 40px ${accentColor}99`, `0 0 20px ${accentColor}66`] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {label ? (
        <span className="text-sm font-bold" style={{ color: accentColor }}>{label}</span>
      ) : (
        <ArrowRight className="w-8 h-8" style={{ color: accentColor }} />
      )}
    </motion.button>
  );
}

function BackButton({ accentColor, onClick }: { accentColor: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative p-6 rounded-full border-2"
      style={{ borderColor: accentColor }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowLeft className="w-8 h-8" style={{ color: accentColor }} />
    </motion.button>
  );
}
