'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Users, Calendar, DollarSign, Briefcase } from 'lucide-react';

const ease = [0.4, 0, 0.2, 1] as const;

// ─── Data ───────────────────────────────────────────────────────

const services = [
  { id: 'enterprise-arch', label: 'Enterprise Architecture', icon: '🏗️' },
  { id: 'tech strategy', label: 'Technology Strategy', icon: '🎯' },
  { id: 'mgmt consulting', label: 'Management Consulting', icon: '📊' },
  { id: 'software solutions', label: 'Software Solutions', icon: '💻' },
  { id: 'cloud migration', label: 'Cloud Migration', icon: '☁️' },
  { id: 'devops', label: 'DevOps', icon: '⚙️' },
];

const timelineOptions = [
  { id: '1-3', label: '1 to 3 months', detail: 'Quick win projects' },
  { id: '3-6', label: '3 to 6 months', detail: 'Medium engagement' },
  { id: '6-12', label: '6 to 12 months', detail: 'Full transformation' },
  { id: '12+', label: '12+ months', detail: 'Enterprise rollout' },
];

const budgetOptions = [
  { value: 0, label: '$10K–$50K', min: 10000, max: 50000 },
  { value: 1, label: '$50K–$100K', min: 50000, max: 100000 },
  { value: 2, label: '$100K–$250K', min: 100000, max: 250000 },
  { value: 3, label: '$250K–$500K', min: 250000, max: 500000 },
  { value: 4, label: '$500K+', min: 500000, max: 999999 },
];

const teamSizeOptions = [
  { id: '1-5', label: '1–5', detail: 'Small team' },
  { id: '6-15', label: '6–15', detail: 'Medium team' },
  { id: '16-50', label: '16–50', detail: 'Large team' },
  { id: '50+', label: '50+', detail: 'Enterprise' },
];

// ─── Types ──────────────────────────────────────────────────────

interface WizardData {
  selectedServices: string[];
  description: string;
  timeline: string;
  budget: number;
  teamSize: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

const initialData: WizardData = {
  selectedServices: [],
  description: '',
  timeline: '',
  budget: 1,
  teamSize: '',
  name: '',
  email: '',
  phone: '',
  company: '',
};

// ─── Animation variants ────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.35, ease },
  }),
};

// ─── Progress Bar ───────────────────────────────────────────────

function ProgressBar({ currentStep }: { currentStep: number }) {
  const progress = (currentStep / 3) * 100;
  return (
    <div className="w-full h-1 bg-[#e5e7eb] dark:bg-white/[0.06] rounded-full overflow-hidden mb-6">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, #FF4800, #ff6a33)',
        }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease }}
      />
    </div>
  );
}

// ─── Selectable Card (for services) ─────────────────────────────

function SelectableCard({
  selected,
  onClick,
  label,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex items-center gap-3 px-4 py-3.5 min-h-[44px] rounded-lg border cursor-pointer transition-all duration-200 text-left w-full ${
        selected
          ? 'bg-[#FF4800]/10 border-[#FF4800] text-[#1a1a2e] dark:text-white'
          : 'bg-[#f8f8fc] dark:bg-[#1e1a3f] border-[#e5e7eb] dark:border-white/[0.08] text-[#6b7280] dark:text-[#A1A1A1] hover:border-[#d1d5db] dark:hover:border-white/20'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium flex-1">{label}</span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-5 h-5 rounded-full bg-[#FF4800] flex items-center justify-center shrink-0"
        >
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
}

// ─── Option Card (for timeline / team size) ─────────────────────

function OptionCard({
  selected,
  onClick,
  label,
  detail,
  icon: Icon,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  detail?: string;
  icon: React.ElementType;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex flex-col items-center gap-2 px-5 py-4 min-h-[44px] rounded-xl border cursor-pointer transition-all duration-200 text-center ${
        selected
          ? 'bg-[#FF4800]/10 border-[#FF4800] text-[#1a1a2e] dark:text-white shadow-[0_0_20px_rgba(255,72,0,0.15)]'
          : 'bg-[#f8f8fc] dark:bg-[#1e1a3f] border-[#e5e7eb] dark:border-white/[0.08] text-[#6b7280] dark:text-[#A1A1A1] hover:border-[#d1d5db] dark:hover:border-white/20'
      }`}
    >
      <Icon className={`w-5 h-5 ${selected ? 'text-[#FF4800]' : 'text-[#9ca3af] dark:text-[#52525B]'} transition-colors`} />
      <span className="text-[15px] font-semibold">{label}</span>
      {detail && (
        <span className="text-[11px] opacity-60">{detail}</span>
      )}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FF4800] flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
}

// ─── Success Animation ──────────────────────────────────────────

function SuccessAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-[#FF4800] flex items-center justify-center mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.5 }}
        >
          <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease }}
        className="text-2xl md:text-3xl font-semibold text-[#1a1a2e] dark:text-white mb-3"
      >
        Request Submitted!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease }}
        className="text-[#6b7280] dark:text-[#A1A1A1] text-base max-w-sm"
      >
        We&apos;ll be in touch within 24 hours to discuss your project needs.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease }}
        className="flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-[#FF4800]/10 border border-[#FF4800]/20"
      >
        <DollarSign className="w-4 h-4 text-[#FF4800]" />
        <span className="text-[13px] text-[#FF4800]">Free initial consultation included</span>
      </motion.div>
    </motion.div>
  );
}

// ─── Step 1: Project Details ────────────────────────────────────

function Step1({
  data,
  onChange,
}: {
  data: WizardData;
  onChange: (update: Partial<WizardData>) => void;
}) {
  const toggleService = useCallback(
    (id: string) => {
      const current = data.selectedServices;
      const next = current.includes(id)
        ? current.filter((s) => s !== id)
        : [...current, id];
      onChange({ selectedServices: next });
    },
    [data.selectedServices, onChange]
  );

  return (
    <motion.div
      key="step1"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a2e] dark:text-white mb-1 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#FF4800]" />
          Project Details
        </h3>
        <p className="text-[#6b7280] dark:text-[#A1A1A1] text-sm">
          Select the services you&apos;re interested in and describe your project.
        </p>
      </div>

      {/* Service Selection */}
      <div>
        <label className="text-sm font-medium text-[#6b7280] dark:text-[#A1A1A1] mb-3 block">
          Which services are you interested in? <span className="text-[#FF4800]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((svc) => (
            <SelectableCard
              key={svc.id}
              selected={data.selectedServices.includes(svc.id)}
              onClick={() => toggleService(svc.id)}
              label={svc.label}
              icon={svc.icon}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="wizard-description" className="text-sm font-medium text-[#6b7280] dark:text-[#A1A1A1] mb-3 block">
          Project Description
        </label>
        <textarea
          id="wizard-description"
          rows={4}
          placeholder="Tell us about your project goals, challenges, and what success looks like..."
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full bg-[#f8f8fc] dark:bg-[#1e1a3f] border border-[#e5e7eb] dark:border-white/[0.08] focus:border-[#FF4800] text-[#1a1a2e] dark:text-white rounded-lg px-4 py-3 text-[15px] placeholder-[#9ca3af] dark:placeholder-[#52525B] outline-none transition-colors resize-none"
        />
      </div>
    </motion.div>
  );
}

// ─── Step 2: Timeline & Budget ──────────────────────────────────

function Step2({
  data,
  onChange,
}: {
  data: WizardData;
  onChange: (update: Partial<WizardData>) => void;
}) {
  return (
    <motion.div
      key="step2"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a2e] dark:text-white mb-1 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FF4800]" />
          Timeline & Budget
        </h3>
        <p className="text-[#6b7280] dark:text-[#A1A1A1] text-sm">
          Help us understand your project scope and resource expectations.
        </p>
      </div>

      {/* Timeline Selector */}
      <div>
        <label className="text-sm font-medium text-[#6b7280] dark:text-[#A1A1A1] mb-3 block">
          <Calendar className="w-4 h-4 inline mr-1.5 text-[#FF4800]" />
          Expected Timeline <span className="text-[#FF4800]">*</span>
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {timelineOptions.map((opt) => (
            <OptionCard
              key={opt.id}
              selected={data.timeline === opt.id}
              onClick={() => onChange({ timeline: opt.id })}
              label={opt.label}
              detail={opt.detail}
              icon={Calendar}
            />
          ))}
        </div>
      </div>

      {/* Budget Slider */}
      <div>
        <label className="text-sm font-medium text-[#6b7280] dark:text-[#A1A1A1] mb-3 block">
          <DollarSign className="w-4 h-4 inline mr-1.5 text-[#FF4800]" />
          Estimated Budget
        </label>
        <div className="bg-[#f8f8fc] dark:bg-[#1e1a3f] border border-[#e5e7eb] dark:border-white/[0.08] rounded-lg px-6 py-5">
          <div className="flex justify-between mb-3">
            <span className="text-[11px] text-[#9ca3af] dark:text-[#52525B] uppercase tracking-wider">$10K</span>
            <motion.span
              key={data.budget}
              initial={{ scale: 1.2, color: '#FF4800' }}
              animate={{ scale: 1, color: '#FF4800' }}
              transition={{ duration: 0.3 }}
              className="text-base font-semibold text-[#FF4800]"
            >
              {budgetOptions[data.budget].label}
            </motion.span>
            <span className="text-[11px] text-[#9ca3af] dark:text-[#52525B] uppercase tracking-wider">$500K+</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={4}
              step={1}
              value={data.budget}
              onChange={(e) => onChange({ budget: Number(e.target.value) })}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #FF4800 0%, #FF4800 ${(data.budget / 4) * 100}%, rgba(0,0,0,0.08) ${(data.budget / 4) * 100}%, rgba(0,0,0,0.08) 100%)`,
              }}
            />
            <style jsx>{`
              input[type='range']::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background: #FF4800;
                border: 3px solid #ffffff;
                box-shadow: 0 0 10px rgba(255, 72, 0, 0.4);
                cursor: pointer;
                transition: box-shadow 0.2s;
              }
              input[type='range']::-webkit-slider-thumb:hover {
                box-shadow: 0 0 18px rgba(255, 72, 0, 0.6);
              }
              input[type='range']::-moz-range-thumb {
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background: #FF4800;
                border: 3px solid #ffffff;
                box-shadow: 0 0 10px rgba(255, 72, 0, 0.4);
                cursor: pointer;
              }
            `}</style>
          </div>
          {/* Budget milestone markers */}
          <div className="flex justify-between mt-2 px-1">
            {budgetOptions.map((opt) => (
              <div
                key={opt.value}
                className={`text-[10px] transition-colors ${
                  data.budget >= opt.value ? 'text-[#FF4800]/60' : 'text-[#9ca3af] dark:text-[#52525B]'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full mx-auto mb-1 transition-colors ${
                    data.budget >= opt.value ? 'bg-[#FF4800]' : 'bg-[#d1d5db] dark:bg-[#52525B]'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Size Selector */}
      <div>
        <label className="text-sm font-medium text-[#6b7280] dark:text-[#A1A1A1] mb-3 block">
          <Users className="w-4 h-4 inline mr-1.5 text-[#FF4800]" />
          Team Size Involved <span className="text-[#FF4800]">*</span>
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {teamSizeOptions.map((opt) => (
            <OptionCard
              key={opt.id}
              selected={data.teamSize === opt.id}
              onClick={() => onChange({ teamSize: opt.id })}
              label={opt.label}
              detail={opt.detail}
              icon={Users}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step 3: Contact Information ────────────────────────────────

const contactInputClasses =
  'w-full bg-[#f8f8fc] dark:bg-[#1e1a3f] border border-[#e5e7eb] dark:border-white/[0.08] focus:border-[#FF4800] text-[#1a1a2e] dark:text-white rounded-lg px-4 min-h-[44px] py-2.5 text-[15px] placeholder-[#9ca3af] dark:placeholder-[#52525B] outline-none transition-colors';

function Step3({
  data,
  onChange,
}: {
  data: WizardData;
  onChange: (update: Partial<WizardData>) => void;
}) {
  return (
    <motion.div
      key="step3"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-5"
    >
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a2e] dark:text-white mb-1">
          Contact Information
        </h3>
        <p className="text-[#6b7280] dark:text-[#A1A1A1] text-sm">
          How should we reach you to discuss your project?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wizard-name" className="sr-only">Full Name</label>
          <input
            id="wizard-name"
            type="text"
            required
            placeholder="Full Name *"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className={contactInputClasses}
          />
        </div>
        <div>
          <label htmlFor="wizard-company" className="sr-only">Company</label>
          <input
            id="wizard-company"
            type="text"
            required
            placeholder="Company *"
            value={data.company}
            onChange={(e) => onChange({ company: e.target.value })}
            className={contactInputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wizard-email" className="sr-only">Work Email</label>
          <input
            id="wizard-email"
            type="email"
            required
            placeholder="Work Email *"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className={contactInputClasses}
          />
        </div>
        <div>
          <label htmlFor="wizard-phone" className="sr-only">Phone</label>
          <input
            id="wizard-phone"
            type="tel"
            placeholder="Phone (optional)"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className={contactInputClasses}
          />
        </div>
      </div>

      {/* Summary preview */}
      <div className="bg-[#f8f8fc] dark:bg-[#1e1a3f]/60 rounded-lg p-4 border border-[#e5e7eb] dark:border-white/[0.06]">
        <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] dark:text-[#52525B] mb-2">Project Summary</p>
        <div className="flex flex-wrap gap-1.5">
          {data.selectedServices.length > 0 ? (
            data.selectedServices.map((id) => {
              const svc = services.find((s) => s.id === id);
              return (
                <span
                  key={id}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-[#FF4800]/10 text-[#FF4800] border border-[#FF4800]/20"
                >
                  {svc?.icon} {svc?.label}
                </span>
              );
            })
          ) : (
            <span className="text-[13px] text-[#9ca3af] dark:text-[#52525B]">No services selected</span>
          )}
        </div>
        {data.timeline && (
          <p className="text-[13px] text-[#6b7280] dark:text-[#A1A1A1] mt-2">
            <Calendar className="w-3 h-3 inline mr-1" />
            Timeline: {timelineOptions.find((t) => t.id === data.timeline)?.label}
            {' · '}
            <DollarSign className="w-3 h-3 inline mr-1" />
            Budget: {budgetOptions[data.budget].label}
            {' · '}
            <Users className="w-3 h-3 inline mr-1" />
            Team: {teamSizeOptions.find((t) => t.id === data.teamSize)?.label || 'Not set'}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Wizard Component ──────────────────────────────────────

export default function ProjectRequestWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [data, setData] = useState<WizardData>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((update: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...update }));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.selectedServices.length > 0;
      case 2:
        return data.timeline !== '' && data.teamSize !== '';
      case 3:
        return data.name.trim() !== '' && data.email.trim() !== '' && data.company.trim() !== '';
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    console.log('Project request submitted:', data);
  };

  const resetWizard = useCallback(() => {
    setData(initialData);
    setCurrentStep(1);
    setDirection(0);
    setIsSubmitted(false);
  }, []);

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-xl border border-[#e5e7eb] dark:border-white/[0.08] bg-white dark:bg-[#121212] p-6 sm:p-8 md:p-10"
      style={{
        boxShadow: '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
    >
      {/* Progress Bar */}
      <ProgressBar currentStep={isSubmitted ? 3 : currentStep} />

      {/* Step Content */}
      <div className="relative overflow-hidden" style={{ minHeight: '380px' }}>
        <AnimatePresence mode="wait" custom={direction}>
          {isSubmitted ? (
            <SuccessAnimation />
          ) : currentStep === 1 ? (
            <Step1 data={data} onChange={handleChange} />
          ) : currentStep === 2 ? (
            <Step2 data={data} onChange={handleChange} />
          ) : (
            <Step3 data={data} onChange={handleChange} />
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {!isSubmitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center justify-between mt-8 pt-6 border-t border-[#e5e7eb] dark:border-white/[0.06]"
        >
          <button
            type="button"
            onClick={goBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-5 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'opacity-0 pointer-events-none'
                : 'text-[#6b7280] dark:text-[#A1A1A1] hover:text-[#1a1a2e] dark:hover:text-white hover:bg-[#f0f0f4] dark:hover:bg-white/[0.05]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 ${
                canProceed()
                  ? 'bg-[#FF4800] hover:bg-[#e63f00] text-white shadow-[0_0_20px_rgba(255,72,0,0.2)] hover:shadow-[0_0_30px_rgba(255,72,0,0.3)] btn-shine'
                  : 'bg-[#f0f0f4] dark:bg-white/[0.06] text-[#9ca3af] dark:text-[#52525B] cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className={`flex items-center gap-2 px-8 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 ${
                canProceed() && !isSubmitting
                  ? 'bg-[#FF4800] hover:bg-[#e63f00] text-white shadow-[0_0_20px_rgba(255,72,0,0.2)] hover:shadow-[0_0_30px_rgba(255,72,0,0.3)] btn-shine'
                  : 'bg-[#f0f0f4] dark:bg-white/[0.06] text-[#9ca3af] dark:text-[#52525B] cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-[#FF4800]/30 border-t-[#FF4800] rounded-full"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </motion.div>
      )}

      {/* Reset button after success */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center mt-6"
        >
          <button
            type="button"
            onClick={resetWizard}
            className="text-[13px] text-[#9ca3af] dark:text-[#52525B] hover:text-[#6b7280] dark:hover:text-[#A1A1A1] transition-colors underline underline-offset-4"
          >
            Submit another request
          </button>
        </motion.div>
      )}
    </div>
  );
}
