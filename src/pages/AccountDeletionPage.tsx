import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Check, Copy, Mail, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ACCOUNT_DELETION_DOCUMENTS } from '../data/legalContent';

function renderTextWithEmail(text: string) {
  const email = 'support.fundiquotations@gmail.com';
  if (!text.includes(email)) {
    return text;
  }
  const parts = text.split(email);
  return (
    <>
      {parts.map((part, idx) => (
        <span key={idx}>
          {part}
          {idx < parts.length - 1 && (
            <a
              href={`mailto:${email}`}
              className="font-medium text-[#0B1F3A] underline decoration-[#D99B16] underline-offset-4 hover:text-[#163A66]"
            >
              {email}
            </a>
          )}
        </span>
      ))}
    </>
  );
}

export function AccountDeletionPage() {
  const { lang } = useLanguage();
  const [forceOriginalEn, setForceOriginalEn] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const activeLang = lang === 'sw' && !forceOriginalEn ? 'sw' : 'en';
  const doc = ACCOUNT_DELETION_DOCUMENTS[activeLang];

  async function handleCopySubject() {
    try {
      await navigator.clipboard.writeText(doc.exactSubjectLine);
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } catch {
      setCopiedSubject(false);
    }
  }

  const mailtoHref = `mailto:${doc.contactEmailValue}?subject=${encodeURIComponent(
    doc.exactSubjectLine
  )}`;

  return (
    <div className="bg-[#F4F6F9] min-h-[calc(100vh-8rem)]">
      <section className="bg-[#0B1F3A] text-white py-14 border-b border-[#163A66]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {doc.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
            <span>
              <strong className="font-semibold text-white">{doc.appNameLabel}:</strong>{' '}
              {doc.appNameValue}
            </span>
            <span aria-hidden="true" className="text-slate-500">
              ·
            </span>
            <span>
              <strong className="font-semibold text-white">{doc.developerLabel}:</strong>{' '}
              {doc.developerValue}
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {lang === 'sw' && (
          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-600">
              {forceOriginalEn
                ? 'Unasoma nakala halisi ya Kiingereza ya ukurasa wa Kufuta Akaunti.'
                : 'Unasoma tafsiri kamili ya Kiswahili ya ukurasa wa Kufuta Akaunti.'}
            </p>
            <button
              type="button"
              onClick={() => setForceOriginalEn((prev) => !prev)}
              className="self-start sm:self-auto px-3 py-1.5 text-xs font-semibold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {forceOriginalEn
                ? 'Onyesha Tafsiri ya Kiswahili'
                : 'Soma Nakala Halisi ya Kiingereza'}
            </button>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-10">
          {/* How to Request Account Deletion */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
              {doc.howToTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {doc.howToIntro}
            </p>

            <div className="grid grid-cols-1 gap-6">
              {/* Option 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-2.5">
                <div className="flex items-center gap-2.5 text-[#0B1F3A]">
                  <Smartphone className="w-5 h-5 text-[#D99B16] shrink-0" />
                  <h3 className="font-display text-lg font-bold">{doc.option1Title}</h3>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {doc.option1Body}
                </p>
              </div>

              {/* Option 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-[#0B1F3A]">
                  <Mail className="w-5 h-5 text-[#D99B16] shrink-0" />
                  <h3 className="font-display text-lg font-bold">{doc.option2Title}</h3>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {renderTextWithEmail(doc.option2Intro)}
                </p>

                <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-slate-500">{doc.subjectLabel}</div>
                    <div className="font-mono text-sm sm:text-base font-semibold text-[#0B1F3A] mt-0.5">
                      {doc.exactSubjectLine}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopySubject}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      {copiedSubject ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{doc.copiedSubjectBtn}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{doc.copySubjectBtn}</span>
                        </>
                      )}
                    </button>
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{doc.sendEmailBtn}</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>{doc.emailIncludeIntro}</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {doc.emailIncludeBullets.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm sm:text-base font-medium text-[#0B1F3A] bg-[#FEF3C7]/70 border border-[#FDE68A] rounded-lg px-4 py-3">
                  {doc.emailSecurityWarning}
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* What Happens After You Request Deletion? */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#0B1F3A]">
              {doc.whatHappensTitle}
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              {doc.whatHappensParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* Information That May Be Retained */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#0B1F3A]">
              {doc.retainedTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {doc.retainedIntro}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed">
              {doc.retainedBullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {doc.retainedOutro}
            </p>
          </section>

          <hr className="border-slate-200" />

          {/* Important Notice */}
          <section className="bg-amber-50/70 border border-amber-200 rounded-xl p-6 space-y-2">
            <div className="flex items-center gap-2.5 text-[#0B1F3A]">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              <h2 className="font-display text-lg font-bold">{doc.importantNoticeTitle}</h2>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {doc.importantNoticeBody}
            </p>
          </section>

          <hr className="border-slate-200" />

          {/* Contact Us */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[#0B1F3A]">
              {doc.contactTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {doc.contactIntro}
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-1.5 text-sm sm:text-base text-slate-700">
              <p className="font-semibold text-[#0B1F3A]">{doc.contactOrg}</p>
              <p>
                <span className="font-semibold text-[#0B1F3A]">{doc.contactEmailLabel}:</span>{' '}
                <a
                  href={`mailto:${doc.contactEmailValue}`}
                  className="font-medium text-[#0B1F3A] underline decoration-[#D99B16] underline-offset-4 hover:text-[#163A66]"
                >
                  {doc.contactEmailValue}
                </a>
              </p>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {doc.privacyOutroPrefix}
              <Link
                to="/privacy"
                className="font-medium text-[#0B1F3A] underline decoration-[#D99B16] underline-offset-4 hover:text-[#163A66]"
              >
                {doc.privacyLinkLabel}
              </Link>
              {doc.privacyOutroSuffix}
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
