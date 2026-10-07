'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { OPEN_ROLES, OPEN_APPLICATION_SLUG } from './roles';

const ease = [0.16, 1, 0.3, 1] as const;

type FormState = 'idle' | 'loading' | 'success' | 'error';

const inputCls =
  'w-full rounded-xl px-4 py-1.5 text-base sm:text-[16px] font-medium text-black dark:text-white bg-white dark:bg-[#111122] border border-neutral-300 dark:border-neutral-700 shadow-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500 hover:border-neutral-400 dark:hover:border-neutral-600 focus:outline-none focus:border-[#FF4800] focus:ring-4 focus:ring-[#FF4800]/15 transition duration-200';

const labelCls =
  'block text-sm sm:text-[15px] font-bold text-black dark:text-white mb-2 tracking-tight';

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  whyJoin: string;
  resume: string;
}

const EMPTY_FORM: ApplicationForm = {
  name: '',
  email: '',
  phone: '',
  linkedin: '',
  portfolio: '',
  whyJoin: '',
  resume: '',
};

// ── ApplyForm ─────────────────────────────────────────────────────────────────

function ApplyForm({
  roleTitle,
  onClose,
}: {
  roleTitle: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ApplicationForm>({
    ...EMPTY_FORM,
  });

  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set =
    (key: keyof ApplicationForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.resume.trim()) {
      setErrorMsg('Please provide a link to your resume.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const fd = new FormData();

      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('portfolio', form.portfolio || form.linkedin);
      fd.append('message', form.whyJoin);

      // Automatically selected role
      fd.append('position', roleTitle);

      fd.append('formType', 'career');
      fd.append('resume', form.resume);

      const formspreeUrl = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_CAREER_ID}`;

      const res = await fetch(formspreeUrl, {
        method: 'POST',
        body: fd,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong.');
      }

      setStatus('success');
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to submit. Please try again.';

      setStatus('error');
      setErrorMsg(msg);
    }
  };

  if (status === 'success') {
    return (
      <div
        className="px-6 py-12 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: 'rgba(255,72,0,0.1)' }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF4800"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
          Application Submitted!
        </h3>

        <p className="font-normal text-base text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          We&apos;ve received your application for{' '}
          <strong className="text-black dark:text-white">{roleTitle}</strong>.
          We will review it and get back to you within 3–5 business days.
        </p>

        <button
          onClick={onClose}
          className="mt-8 inline-flex items-center justify-center rounded-xl px-7 py-3 text-sm font-bold text-white transition-all"
          style={{ background: '#FF4800' }}
        >
          Return to Open Roles
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
      className="p-6 sm:p-8 md:p-10"
    >
      {/* Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 mb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF4800]">
            Application Form
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-black dark:text-white">
            Apply — {roleTitle}
          </h2>
        </div>
        <span className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full bg-orange-50 dark:bg-orange-950/40 px-3.5 py-1.5 text-xs font-bold text-[#FF4800] border border-orange-200 dark:border-orange-900/60">
          <span className="h-2 w-2 rounded-full bg-[#FF4800] animate-pulse" />
          Actively Hiring
        </span>
      </div>

      {/* AUTO SELECTED ROLE */}
      <div className="mb-6">
        <label className={labelCls}>Position</label>
        <input
          value={roleTitle}
          readOnly
          className="w-full rounded-xl px-4 py-3.5 text-base sm:text-[16px] font-bold text-black dark:text-white bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-300 dark:border-neutral-700 cursor-default shadow-sm"
        />
      </div>

      {/* Full Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelCls}>
            Full Name <span className="text-[#FF4800]">*</span>
          </label>
          <input
            required
            value={form.name}
            onChange={set('name')}
            placeholder="Your name"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>
            Email <span className="text-[#FF4800]">*</span>
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>
      </div>

      {/* Phone & LinkedIn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelCls}>
            Phone <span className="text-[#FF4800]">*</span>
          </label>
          <input
            required
            value={form.phone}
            onChange={set('phone')}
            placeholder="+91 98000 00000"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>LinkedIn URL</label>
          <input
            value={form.linkedin}
            onChange={set('linkedin')}
            placeholder="linkedin.com/in/you"
            className={inputCls}
          />
        </div>
      </div>

      {/* Portfolio / GitHub */}
      <div className="mb-6">
        <label className={labelCls}>Portfolio / GitHub</label>
        <input
          value={form.portfolio}
          onChange={set('portfolio')}
          placeholder="github.com/you or yoursite.com"
          className={inputCls}
        />
      </div>

      {/* Why Straveda */}
      <div className="mb-6">
        <label className={labelCls}>
          Why do you want to join Straveda?{' '}
          <span className="text-[#FF4800]">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={form.whyJoin}
          onChange={set('whyJoin')}
          placeholder="Tell us what excites you about this role..."
          className={inputCls + ' resize-none'}
        />
      </div>

      {/* Resume Link */}
      <div className="mb-8">
        <label className={labelCls}>
          Resume Link (Google Drive) <span className="text-[#FF4800]">*</span>
        </label>
        <input
          required
          type="url"
          value={form.resume}
          onChange={set('resume')}
          placeholder="Google Drive link (Make sure it is public)"
          className={inputCls}
        />
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          Please make sure link sharing is set to &ldquo;Anyone with the link can view&rdquo;.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
            {errorMsg}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="pt-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-base font-bold text-white shadow-[0_4px_18px_rgba(255,72,0,0.3)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          style={{ background: '#FF4800' }}
        >
          {status === 'loading'
            ? 'Submitting Application…'
            : 'Submit Application →'}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl px-6 py-3.5 text-base font-semibold text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ── OpenApplicationForm ───────────────────────────────────────────────────────

function OpenApplicationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatYouBuild: '',
  });

  const [resume, setResume] = useState('');
  const [resumeError, setResumeError] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({
        ...f,
        [key]: e.target.value,
      }));

  // Resume file validation
  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setResumeError('');
    setResumeFile(null);

    if (!file) return;

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!extension || !allowedExtensions.includes(extension)) {
      setResumeError('Only PDF, DOC, and DOCX files are allowed.');
      e.target.value = '';
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setResumeError('Resume file must be less than 5 MB.');
      e.target.value = '';
      return;
    }

    setResumeFile(file);
    setResume('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume.trim() && !resumeFile) {
      setErrorMsg(
        'Please provide a Google Drive resume link or upload your resume.'
      );
      return;
    }

    if (resumeError) {
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const fd = new FormData();

      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('message', form.whatYouBuild);
      fd.append('position', 'Open Application');
      fd.append('formType', 'career');

      if (resume.trim()) {
        fd.append('resume', resume);
      }

      if (resumeFile) {
        fd.append('resume_file', resumeFile);
      }

      const formspreeUrl = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_CAREER_ID}`;

      const res = await fetch(formspreeUrl, {
        method: 'POST',
        body: fd,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong.');
      }

      setStatus('success');
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to submit. Please try again.';

      setStatus('error');
      setErrorMsg(msg);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: 'rgba(255,72,0,0.1)',
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF4800"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
          We&apos;ve Got Your Application!
        </h3>

        <p className="font-normal text-base text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          If there&apos;s a fit, our team will reach out directly. Thank you for your interest in Straveda.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 mb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF4800]">
            Open Application
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-black dark:text-white">
            General Consideration
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelCls}>
            Full Name <span className="text-[#FF4800]">*</span>
          </label>
          <input
            required
            value={form.name}
            onChange={set('name')}
            placeholder="Your name"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>
            Email <span className="text-[#FF4800]">*</span>
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelCls}>
            Phone <span className="text-[#FF4800]">*</span>
          </label>
          <input
            required
            value={form.phone}
            onChange={set('phone')}
            placeholder="+91 98000 00000"
            className={inputCls}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className={labelCls}>
          What do you build & why Straveda?{' '}
          <span className="text-[#FF4800]">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={form.whatYouBuild}
          onChange={set('whatYouBuild')}
          placeholder="Tell us about yourself, your skills, and what excites you about working with us..."
          className={inputCls + ' resize-none'}
        />
      </div>

      {/* RESUME */}
      <div className="mb-8">
        <label className={labelCls}>
          Resume <span className="text-[#FF4800]">*</span>
        </label>

        {/* Google Drive Link */}
        <input
          type="url"
          value={resume}
          onChange={(e) => {
            setResume(e.target.value);
            setResumeFile(null);
            setResumeError('');
            setErrorMsg('');
          }}
          placeholder="Google Drive resume link"
          className={inputCls}
        />

        <p className="mt-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          OR upload your resume file
        </p>

        {/* PDF / DOC / DOCX */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeFileChange}
          className="mt-2 block w-full text-sm text-neutral-700 dark:text-neutral-300
            file:mr-4 file:rounded-xl file:border-0
            file:bg-orange-50 file:px-4 file:py-2.5
            file:text-sm file:font-semibold
            file:text-[#FF4800]
            hover:file:bg-orange-100 dark:file:bg-orange-950/40 cursor-pointer"
        />

        {resumeFile && (
          <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            Selected: {resumeFile.name}
          </p>
        )}

        {resumeError && (
          <p className="mt-2 text-sm text-red-500 font-medium">
            {resumeError}
          </p>
        )}

        <p className="mt-2 text-xs text-neutral-400">
          Accepted formats: PDF, DOC, DOCX • Max size: 5 MB
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
            {errorMsg}
          </p>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-base font-bold text-white shadow-[0_4px_18px_rgba(255,72,0,0.3)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          style={{ background: '#FF4800' }}
        >
          {status === 'loading'
            ? 'Submitting…'
            : 'Send Open Application →'}
        </button>
      </div>
    </form>
  );
}

// ── Main Page Component ───────────────────────────────────────────────────────

export default function CareerApplyPage({ slug }: { slug: string }) {
  const router = useRouter();

  // Normalize slug (decode URI, lowercase, remove trailing slashes)
  const normalizedSlug = decodeURIComponent(slug || '')
    .toLowerCase()
    .replace(/\/+$/, '')
    .trim();

  const isOpen =
    normalizedSlug === OPEN_APPLICATION_SLUG ||
    normalizedSlug === 'open' ||
    normalizedSlug === 'general' ||
    !normalizedSlug;

  // Find matching role by slug, slugified title, or title match
  const role = OPEN_ROLES.find(
    (r) =>
      r.slug === normalizedSlug ||
      r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalizedSlug ||
      r.title.toLowerCase() === normalizedSlug
  );

  // Active role guaranteed — if specific slug requested was not found, fallback to first open role
  const displayRole = role || (!isOpen ? OPEN_ROLES[0] : null);

  return (
    <div className="bg-white dark:bg-[#0a0a14] min-h-screen">
      <section className="pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Centered container with reduced spread */}
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Navigation at left side corner */}
          <div className="mb-6 flex justify-start">
            <Link
              href="/careers#open-roles"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-[#FF4800] dark:text-neutral-400 dark:hover:text-[#FF4800] transition-colors"
            >
              ← Back to all open roles
            </Link>
          </div>

          {/* Section Heading & Paragraph matching Homepage Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 text-left"
          >
            <span className="text-xs font-bold text-center uppercase tracking-[0.25em] text-[#FF4800] block mb-2">
              Career Application
            </span>

            <h1
              className="font-bold text-black text-center dark:text-white"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                lineHeight: 1.15,
                letterSpacing: '-1.5px',
              }}
            >
              {isOpen
                ? "Don't see your role?"
                : displayRole
                  ? displayRole.title
                  : 'Open Application'}
            </h1>

            <p className="mt-2 text-base text-center text-neutral-600 dark:text-neutral-400">
              {isOpen
                ? 'We create roles for exceptional people. Drop your resume and tell us what you build.'
                : displayRole
                  ? displayRole.desc
                  : 'Drop your resume and tell us what you build. We read every application.'}
            </p>
          </motion.div>

          {/* Form Card: Wide Left-to-Right Spread, Professional Surface */}
          <div className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#0d0d1a] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {isOpen ? (
              <OpenApplicationForm />
            ) : displayRole ? (
              <ApplyForm
                roleTitle={displayRole.title}
                onClose={() => router.push('/careers#open-roles')}
              />
            ) : (
              <OpenApplicationForm />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
