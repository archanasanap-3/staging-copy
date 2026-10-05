'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { OPEN_ROLES, OPEN_APPLICATION_SLUG } from './roles';

const ease = [0.16, 1, 0.3, 1] as const;

const H2_CLASS = 'font-normal heading-gradient';
const H2_STYLE = {
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  lineHeight: 1.0,
  letterSpacing: '-2px',
} as const;
const EYEBROW = 'text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF4800] mb-5';
const LEAD = 'font-normal text-[16px] leading-[1.75] text-[#6b7280] dark:text-[#9ca3af]';

type FormState = 'idle' | 'loading' | 'success' | 'error';
const inputCls = "w-full rounded-lg px-4 py-2.5 text-[18px] border border-black/[0.1] dark:border-white/[0.1] bg-white/60 dark:bg-white/[0.04] text-[#1a1a2e] dark:text-[#f0f0f5] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#FF4800]/40 transition";

interface ApplicationForm {
  name: string; email: string; phone: string;
  linkedin: string; portfolio: string; whyJoin: string; resume: string;
}
const EMPTY_FORM: ApplicationForm = { name: '', email: '', phone: '', linkedin: '', portfolio: '', whyJoin: '', resume: '' };

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
        className="px-7 pb-8 pt-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(255,72,0,0.1)' }}
        >
          <svg
            width="22"
            height="22"
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

        <p className="text-[15px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5] mb-1">
          Application submitted!
        </p>

        <p className="font-normal text-[13px] text-[#6b7280] dark:text-[#9ca3af]">
          We&apos;ll review it and get back to you within 5 business days.
        </p>

        <button
          onClick={onClose}
          className="mt-5 text-[12px] text-[#FF4800] font-medium hover:underline"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
      className="px-7 pb-8 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <p className="text-[12px] font-normal uppercase tracking-widest text-[#FF4800] mb-5 mt-5">
        Apply — {roleTitle}
      </p>

      {/* AUTO SELECTED ROLE */}
      <div className="mb-4">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
          Position
        </label>

        <input
          value={roleTitle}
          readOnly
          className={
            inputCls +
            ' bg-[#fff7f2] text-[#FF4800] font-medium cursor-default'
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
            Full Name *
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
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
            Email
          </label>

          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
            Phone *
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
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
            LinkedIn URL
          </label>

          <input
            value={form.linkedin}
            onChange={set('linkedin')}
            placeholder="linkedin.com/in/you"
            className={inputCls}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
          Portfolio / GitHub
        </label>

        <input
          value={form.portfolio}
          onChange={set('portfolio')}
          placeholder="github.com/you or yoursite.com"
          className={inputCls}
        />
      </div>

      <div className="mb-3">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
          Why do you want to join Straveda? *
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

      <div className="mb-5">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
          Resume Link (Google Drive) *
        </label>

        <input
          required
          type="url"
          value={form.resume}
          onChange={set('resume')}
          placeholder="Google Drive link (Make sure it is public)"
          className={inputCls}
        />
      </div>

      {errorMsg && (
        <p className="font-normal text-[12px] text-red-500 mb-3">
          {errorMsg}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg px-6 py-2.5 text-[13px] font-medium text-white transition-all duration-200 disabled:opacity-60"
          style={{ background: '#FF4800' }}
          onMouseEnter={(e) => {
            if (status !== 'loading') {
              e.currentTarget.style.background = '#e03e00';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FF4800';
          }}
        >
          {status === 'loading'
            ? 'Submitting…'
            : 'Submit Application →'}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

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
      (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) =>
        setForm((f) => ({
          ...f,
          [key]: e.target.value,
        }));

  // Resume file validation
  const handleResumeFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    setResumeError('');
    setResumeFile(null);

    if (!file) return;

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!extension || !allowedExtensions.includes(extension)) {
      setResumeError(
        'Only PDF, DOC, and DOCX files are allowed.'
      );
      e.target.value = '';
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setResumeError(
        'Resume file must be less than 5 MB.'
      );
      e.target.value = '';
      return;
    }

    setResumeFile(file);

    // Clear Google Drive link when file is selected
    setResume('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // At least one resume option is required
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

      // Google Drive resume
      if (resume.trim()) {
        fd.append('resume', resume);
      }

      // Uploaded resume file
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
        throw new Error(
          data.error ?? 'Something went wrong.'
        );
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
<div className="text-center py-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'rgba(255,72,0,0.1)',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
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

                <p className="text-[15px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5] mb-1">
                  We&apos;ve got your application!
                </p>

                <p className="font-normal text-[15px] text-[#6b7280] dark:text-[#9ca3af]">
                  If there&apos;s a fit, you&apos;ll hear from us directly.
                </p>
              </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[15px] font-semibold text-[#6b7280] mb-1">
                      Full Name *
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
                    <label className="block text-[15px] font-semibold text-[#6b7280] mb-1">
                      Email
                    </label>

                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[15px] font-semibold text-[#6b7280] mb-1">
                      Phone *
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

                <div className="mb-4">
                  <label className="block text-[15px] font-semibold text-[#6b7280] mb-1">
                    What do you build & why Straveda? *
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
                <div className="mb-5">
                  <label className="block text-[15px] font-semibold text-[#6b7280] mb-1">
                    Resume *
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

                  <p className="mt-2 text-[11px] text-[#9ca3af]">
                    OR upload your resume
                  </p>

                  {/* PDF / DOC / DOCX */}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeFileChange}
                    className="mt-2 block w-full text-[12px] text-[#6b7280]
                      file:mr-3 file:rounded-lg file:border-0
                      file:bg-[#fff7f2] file:px-4 file:py-2
                      file:text-[12px] file:font-medium
                      file:text-[#FF4800]
                      hover:file:bg-[#fff0e8]"
                  />

                  {resumeFile && (
                    <p className="mt-2 text-[12px] text-[#6b7280]">
                      Selected: {resumeFile.name}
                    </p>
                  )}

                  {resumeError && (
                    <p className="mt-2 text-[12px] text-red-500">
                      {resumeError}
                    </p>
                  )}

                  <p className="mt-1 text-[11px] text-[#9ca3af]">
                    Accepted formats: PDF, DOC, DOCX • Max size: 5 MB
                  </p>
                </div>

                {errorMsg && (
                  <p className="font-normal text-[12px] text-red-500 mb-3">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-lg px-7 py-3 text-[13px] font-medium text-white transition-all duration-200 disabled:opacity-60"
                  style={{ background: '#FF4800' }}
                  onMouseEnter={(e) => {
                    if (status !== 'loading') {
                      e.currentTarget.style.background = '#e03e00';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FF4800';
                  }}
                >
                  {status === 'loading'
                    ? 'Submitting…'
                    : 'Send Open Application →'}
                </button>
              </form>
  );
}

export default function CareerApplyPage({ slug }: { slug: string }) {
  const router = useRouter();
  const isOpen = slug === OPEN_APPLICATION_SLUG;
  const role = OPEN_ROLES.find((r) => r.slug === slug);

  return (
    <div className="bg-white dark:bg-[#0d0d1a] min-h-screen">
      <section className="pt-32 pb-16 px-5">
        <div className="max-w-[860px] mx-auto">
          <Link href="/careers#open-roles" className="text-[14px] text-[#6b7280] hover:text-[#FF4800] transition-colors">
            ← Back to careers
          </Link>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mt-8 mb-10">
            <p className={EYEBROW}>{isOpen ? 'Open Application' : 'Apply'}</p>
            <h1 className={H2_CLASS} style={H2_STYLE}>
              {isOpen ? "Don't see your role?" : role ? role.title : 'Role not found'}
            </h1>
            <p className={`${LEAD} mt-6 max-w-2xl`}>
              {isOpen
                ? 'We sometimes create roles for exceptional people. Drop your resume and tell us what you build. We read every application.'
                : role
                  ? role.desc
                  : 'This role is no longer open. You can still send an open application.'}
            </p>
          </motion.div>

          <div className="glass-card rounded-2xl overflow-hidden">
            {isOpen ? (
              <div className="px-8 py-8 md:px-10">
                <OpenApplicationForm />
              </div>
            ) : role ? (
              <ApplyForm roleTitle={role.title} onClose={() => router.push('/careers#open-roles')} />
            ) : (
              <div className="px-8 py-8">
                <Link href={`/careers/apply/${OPEN_APPLICATION_SLUG}`} className="text-[#FF4800] font-medium hover:underline">
                  Send an open application →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
