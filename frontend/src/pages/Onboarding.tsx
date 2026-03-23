import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Lock, Rocket, Target, Zap, CheckCircle2, Check } from 'lucide-react';
import backend from '~backend/client';
import { useLanguage } from '../i18n/LanguageContext';

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
  const { t, lang } = useLanguage();
  const ot = t.onboarding;

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
        language: lang,
      });
      nextStep();
    } catch (error) {
      console.error('Form submission failed:', error);
      alert(ot.errorMsg);
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
            {currentStep === 1 && <Step1 key="step1" accentColor={accentColor} formData={formData} setFormData={setFormData} onNext={nextStep} canProceed={canProceedStep1} ot={ot} />}
            {currentStep === 2 && <Step2 key="step2" accentColor={accentColor} onNext={nextStep} onBack={prevStep} ot={ot} />}
            {currentStep === 3 && <Step3 key="step3" accentColor={accentColor} onNext={nextStep} onBack={prevStep} ot={ot} />}
            {currentStep === 4 && <Step4 key="step4" accentColor={accentColor} onNext={nextStep} onBack={prevStep} ot={ot} />}
            {currentStep === 5 && <Step5 key="step5" accentColor={accentColor} onNext={nextStep} onBack={prevStep} ot={ot} />}
            {currentStep === 6 && <Step6 key="step6" accentColor={accentColor} selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} onNext={nextStep} onBack={prevStep} canProceed={canProceedStep6} ot={ot} />}
            {currentStep === 7 && <Step7 key="step7" accentColor={accentColor} department={selectedDepartment!} onNext={nextStep} onBack={prevStep} ot={ot} />}
            {currentStep === 8 && <Step8 key="step8" accentColor={accentColor} isCommitted={isCommitted} setIsCommitted={setIsCommitted} onNext={handleFormSubmit} onBack={prevStep} canProceed={canProceedStep8} isSubmitting={isSubmitting} ot={ot} />}
            {currentStep === 9 && <Step9 key="step9" accentColor={accentColor} ot={ot} />}
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

function NextButton({ accentColor, onClick, disabled }: { accentColor: string; onClick: () => void; disabled?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      className="flex items-center gap-2 px-8 py-4 font-bold text-black disabled:opacity-30 disabled:cursor-not-allowed"
      style={{ backgroundColor: accentColor }}
    >
      <ArrowRight className="w-5 h-5" />
    </motion.button>
  );
}

function BackButton({ accentColor, onClick }: { accentColor: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center gap-2 px-8 py-4 font-bold border-2"
      style={{ borderColor: accentColor, color: accentColor }}
    >
      <ArrowLeft className="w-5 h-5" />
    </motion.button>
  );
}

function Step1({ accentColor, formData, setFormData, onNext, canProceed, ot }: { accentColor: string; formData: FormData; setFormData: (data: FormData) => void; onNext: () => void; canProceed: boolean; ot: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8 w-full px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight" style={{ color: accentColor }}>
        {ot.step1.title}
      </h1>

      <div className="space-y-6 font-mono mt-12">
        <div>
          <label className="block text-sm mb-2 opacity-60">{ot.step1.emailLabel}</label>
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
        {ot.step1.privacy}
      </p>

      <div className="flex justify-end">
        <NextButton accentColor={accentColor} onClick={onNext} disabled={!canProceed} />
      </div>
    </motion.div>
  );
}

function Step2({ accentColor, onNext, onBack, ot }: { accentColor: string; onNext: () => void; onBack: () => void; ot: any }) {
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
        {ot.step2.title}
      </h1>
      
      <p className="text-2xl md:text-3xl text-white/80">
        {ot.step2.welcome}
      </p>
      
      <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mx-auto">
        {ot.step2.body}
      </p>

      <div className="flex justify-between items-center">
        <BackButton accentColor={accentColor} onClick={onBack} />
        <NextButton accentColor={accentColor} onClick={onNext} />
      </div>
    </motion.div>
  );
}

function Step3({ accentColor, onNext, onBack, ot }: { accentColor: string; onNext: () => void; onBack: () => void; ot: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight" style={{ color: accentColor }}>
        {ot.step3.title}
      </h1>

      <div className="text-lg md:text-xl text-white/80 leading-relaxed space-y-4">
        <p>{ot.step3.p1}</p>
        <p>{ot.step3.p2}</p>
      </div>

      <div className="flex justify-between items-center pt-8">
        <BackButton accentColor={accentColor} onClick={onBack} />
        <NextButton accentColor={accentColor} onClick={onNext} />
      </div>
    </motion.div>
  );
}

function Step4({ accentColor, onNext, onBack, ot }: { accentColor: string; onNext: () => void; onBack: () => void; ot: any }) {
  const icons = [Target, Zap, Rocket];
  const projects = ot.step4.projects.map((p: any, i: number) => ({ ...p, icon: icons[i] }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center" style={{ color: accentColor }}>
        {ot.step4.title}
      </h1>

      <p className="text-lg text-white/60 text-center leading-relaxed">
        {ot.step4.subtitle}
      </p>

      <div className="space-y-4">
        {projects.map((project: any, idx: number) => {
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

function Step5({ accentColor, onNext, onBack, ot }: { accentColor: string; onNext: () => void; onBack: () => void; ot: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center" style={{ color: accentColor }}>
        {ot.step5.title}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {ot.step5.objectives.map((obj: any, idx: number) => (
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

function Step6({ accentColor, selectedDepartment, setSelectedDepartment, onNext, onBack, canProceed, ot }: { accentColor: string; selectedDepartment: Department; setSelectedDepartment: (dept: Department) => void; onNext: () => void; onBack: () => void; canProceed: boolean; ot: any }) {
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
        {ot.step6.title}
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

function Step7({ accentColor, department, onNext, onBack, ot }: { accentColor: string; department: Department; onNext: () => void; onBack: () => void; ot: any }) {
  const deptKey = department || 'GROWTH';
  const data = {
    title: deptKey,
    ...ot.step7.departments[deptKey],
  };

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
          <h2 className="text-2xl font-bold mb-3" style={{ color: accentColor }}>{ot.step7.yourRole}</h2>
          <p>{data.role}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: accentColor }}>{ot.step7.yourArsenal}</h2>
          <ul className="space-y-2">
            {data.arsenal.map((item: string, idx: number) => (
              <li key={idx} className="flex gap-3">
                <span style={{ color: accentColor }}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: accentColor }}>{ot.step7.loot}</h2>
          <ul className="space-y-2">
            {data.loot.map((item: string, idx: number) => (
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

function Step8({ accentColor, isCommitted, setIsCommitted, onNext, onBack, canProceed, isSubmitting, ot }: { accentColor: string; isCommitted: boolean; setIsCommitted: (val: boolean) => void; onNext: () => void; onBack: () => void; canProceed: boolean; isSubmitting: boolean; ot: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center" style={{ color: accentColor }}>
        {ot.step8.title}
      </h1>

      <div className="space-y-6 text-lg text-white/80 leading-relaxed">
        <div className="flex gap-4">
          <span className="font-bold" style={{ color: accentColor }}>{ot.step8.flexibility}</span>
          <p>{ot.step8.flexibilityText}</p>
        </div>
        <div className="flex gap-4">
          <span className="font-bold" style={{ color: accentColor }}>{ot.step8.communication}</span>
          <p>{ot.step8.communicationText}</p>
        </div>
        <div className="flex gap-4">
          <span className="font-bold" style={{ color: accentColor }}>{ot.step8.proactivity}</span>
          <p>{ot.step8.proactivityText}</p>
        </div>
        <div className="flex gap-4">
          <span className="font-bold" style={{ color: accentColor }}>{ot.step8.legal}</span>
          <p>{ot.step8.legalText}</p>
        </div>
      </div>

      <div
        className="flex items-center gap-4 p-6 border-2 cursor-pointer"
        style={{ borderColor: accentColor }}
        onClick={() => setIsCommitted(!isCommitted)}
      >
        <div
          className="w-8 h-8 border-2 flex items-center justify-center flex-shrink-0"
          style={{ borderColor: accentColor, backgroundColor: isCommitted ? accentColor : 'transparent' }}
        >
          {isCommitted && <CheckCircle2 className="w-5 h-5 text-black" />}
        </div>
        <p className="text-white/80">{ot.step8.commitment}</p>
      </div>

      <div className="flex justify-between items-center pt-8">
        <BackButton accentColor={accentColor} onClick={onBack} />
        <motion.button
          onClick={onNext}
          disabled={!canProceed || isSubmitting}
          whileHover={canProceed && !isSubmitting ? { scale: 1.05 } : {}}
          className="px-8 py-4 font-bold text-black disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ backgroundColor: accentColor }}
        >
          {isSubmitting ? ot.step8.submitting : ot.step8.submit}
        </motion.button>
      </div>
    </motion.div>
  );
}

function Step9({ accentColor, ot }: { accentColor: string; ot: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto text-center space-y-8"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <CheckCircle2 className="w-32 h-32 mx-auto" style={{ color: accentColor }} />
      </motion.div>

      <h1 className="text-6xl md:text-8xl font-bold tracking-tight" style={{ color: accentColor }}>
        {ot.step9.title}
      </h1>

      <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
        {ot.step9.body}
      </p>

      <p className="text-sm font-mono" style={{ color: accentColor }}>
        {ot.step9.systemOnline}
      </p>
    </motion.div>
  );
}
