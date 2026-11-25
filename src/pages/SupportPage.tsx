import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { CheckCircle2, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortalData } from '../context/PortalDataContext';
import { db } from '../lib/firebase';

interface FormErrors {
  customerName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function SupportPage() {
  const { lang, t } = useLanguage();
  const { settings } = usePortalData();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    const trimmedName = customerName.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      next.customerName = t.support.validation.nameRequired;
    }
    if (
      trimmedEmail.length < 5 ||
      trimmedEmail.length > 160 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      next.email = t.support.validation.emailInvalid;
    }
    if (trimmedSubject.length < 2 || trimmedSubject.length > 160) {
      next.subject = t.support.validation.subjectRequired;
    }
    if (trimmedMessage.length < 10 || trimmedMessage.length > 3000) {
      next.message = t.support.validation.messageMin;
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'supportMessages'), {
        customerName: customerName.trim().slice(0, 100),
        email: email.trim().slice(0, 160),
        subject: subject.trim().slice(0, 160),
        message: message.trim().slice(0, 3000),
        language: lang,
        status: 'new',
        adminNotes: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setSubmitted(true);
      setCustomerName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Unable to send your message right now. Please try again.';
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F4F6F9] min-h-[calc(100vh-8rem)]">
      <section className="bg-[#0B1F3A] text-white py-14 border-b border-[#163A66]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {t.support.pageTitle}
          </h1>
          <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-2xl">
            {t.support.pageSubtitle}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-[#0B1F3A]">
              {t.support.formTitle}
            </h2>

            {submitted ? (
              <div className="mt-6 p-6 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-base font-bold text-emerald-950">
                      {t.support.successTitle}
                    </h3>
                    <p className="mt-1 text-sm text-emerald-900 leading-relaxed">
                      {t.support.successBody}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#0B1F3A] rounded-lg hover:bg-[#163A66]"
                    >
                      {t.support.sendAnotherBtn}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => void handleSubmit(e)} noValidate className="mt-6 space-y-5">
                {submitError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800"
                  >
                    {submitError}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="support-name"
                    className="block text-sm font-semibold text-[#0B1F3A] mb-1.5"
                  >
                    {t.support.nameLabel}
                  </label>
                  <input
                    id="support-name"
                    type="text"
                    required
                    maxLength={100}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t.support.namePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                  />
                  {errors.customerName && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="support-email"
                    className="block text-sm font-semibold text-[#0B1F3A] mb-1.5"
                  >
                    {t.support.emailLabel}
                  </label>
                  <input
                    id="support-email"
                    type="email"
                    required
                    maxLength={160}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.support.emailPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="support-subject"
                    className="block text-sm font-semibold text-[#0B1F3A] mb-1.5"
                  >
                    {t.support.subjectLabel}
                  </label>
                  <input
                    id="support-subject"
                    type="text"
                    required
                    maxLength={160}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t.support.subjectPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="support-message"
                    className="block text-sm font-semibold text-[#0B1F3A] mb-1.5"
                  >
                    {t.support.messageLabel}
                  </label>
                  <textarea
                    id="support-message"
                    rows={5}
                    required
                    maxLength={3000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.support.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] disabled:opacity-60 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? t.support.submittingBtn : t.support.submitBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct Channels */}
          <aside className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="font-display text-xl font-bold text-[#0B1F3A]">
              {t.support.directChannelsTitle}
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#F4F6F9] border border-slate-200 flex items-center justify-center text-[#0B1F3A] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    {t.support.emailChannelLabel}
                  </div>
                  <a
                    href={`mailto:${settings.supportEmail}`}
                    className="mt-0.5 inline-block text-sm font-semibold text-[#0B1F3A] hover:underline decoration-[#D99B16] underline-offset-4 break-all"
                  >
                    {settings.supportEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#F4F6F9] border border-slate-200 flex items-center justify-center text-[#0B1F3A] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    {t.support.phoneChannelLabel}
                  </div>
                  <a
                    href={`tel:${settings.supportPhone.replace(/\s+/g, '')}`}
                    className="mt-0.5 inline-block font-mono text-sm font-semibold text-[#0B1F3A] tabular-nums hover:underline decoration-[#D99B16] underline-offset-4"
                  >
                    {settings.supportPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#F4F6F9] border border-slate-200 flex items-center justify-center text-[#0B1F3A] shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    {t.support.whatsappChannelLabel}
                  </div>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber
                      .replace(/[^0-9]/g, '')
                      .replace(/^0/, '255')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-block font-mono text-sm font-semibold text-[#0B1F3A] tabular-nums hover:underline decoration-[#D99B16] underline-offset-4"
                  >
                    {settings.whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#F4F6F9] border border-slate-200 flex items-center justify-center text-[#0B1F3A] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    {t.support.officeLabel}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-[#0B1F3A]">
                    {lang === 'sw' ? settings.officeAddressSw : settings.officeAddressEn}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
