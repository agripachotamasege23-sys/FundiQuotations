import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TERMS_DOCUMENTS } from '../data/legalContent';

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

export function TermsPage() {
  const { lang, t } = useLanguage();
  const [forceOriginalEn, setForceOriginalEn] = useState(false);
  const activeLang = lang === 'sw' && !forceOriginalEn ? 'sw' : 'en';
  const doc = TERMS_DOCUMENTS[activeLang];

  return (
    <div className="bg-[#F4F6F9] min-h-[calc(100vh-8rem)]">
      <section className="bg-[#0B1F3A] text-white py-14 border-b border-[#163A66]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {doc.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
            <span>
              <strong className="font-semibold text-white">{doc.effectiveDateLabel}:</strong>{' '}
              {doc.effectiveDateValue}
            </span>
            <span aria-hidden="true" className="text-slate-500">
              ·
            </span>
            <span>
              <strong className="font-semibold text-white">{doc.developerLabel}:</strong>{' '}
              {doc.developerValue}
            </span>
            <span aria-hidden="true" className="text-slate-500">
              ·
            </span>
            <span>
              <strong className="font-semibold text-white">{doc.contactEmailLabel}:</strong>{' '}
              <a
                href={`mailto:${doc.contactEmailValue}`}
                className="text-[#EAB308] hover:underline"
              >
                {doc.contactEmailValue}
              </a>
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {lang === 'sw' && (
          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-600">
              {forceOriginalEn
                ? 'Unasoma nakala halisi ya Kiingereza ya Sheria na Masharti.'
                : 'Unasoma tafsiri kamili ya Kiswahili ya Sheria na Masharti.'}
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

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10">
          <div className="divide-y divide-slate-200 space-y-8">
            {doc.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="pt-8 first:pt-0 scroll-mt-24">
                <h2 className="font-display text-xl font-bold text-[#0B1F3A]">
                  {sec.heading}
                </h2>

                {sec.paragraphs && sec.paragraphs.length > 0 && (
                  <div className="mt-3 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {sec.paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx}>{renderTextWithEmail(paragraph)}</p>
                    ))}
                  </div>
                )}

                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {sec.bullets.map((item, bIdx) => (
                      <li key={bIdx}>
                        {item.lead ? (
                          <>
                            <strong className="font-semibold text-[#0B1F3A]">{item.lead}</strong>
                            {' — '}
                            {renderTextWithEmail(item.text)}
                          </>
                        ) : (
                          renderTextWithEmail(item.text)
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                {sec.afterParagraphs && sec.afterParagraphs.length > 0 && (
                  <div className="mt-3 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {sec.afterParagraphs.map((paragraph, pIdx) => (
                      <p key={pIdx}>{renderTextWithEmail(paragraph)}</p>
                    ))}
                  </div>
                )}

                {sec.contactDetails && sec.contactDetails.length > 0 && (
                  <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 text-sm sm:text-base text-slate-700">
                    {sec.contactDetails.map((row) => (
                      <div key={row.label} className="flex flex-wrap items-center gap-x-2">
                        <span className="font-semibold text-[#0B1F3A]">{row.label}:</span>
                        {row.isEmail ? (
                          <a
                            href={`mailto:${row.value}`}
                            className="inline-flex items-center gap-1.5 font-medium text-[#0B1F3A] underline decoration-[#D99B16] underline-offset-4 hover:text-[#163A66]"
                          >
                            <Mail className="w-4 h-4 text-[#D99B16]" />
                            <span>{row.value}</span>
                          </a>
                        ) : (
                          <span>{row.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {sec.relatedPolicyLinks && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      to="/privacy"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{t.nav.privacy}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/account-deletion"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#0B1F3A] bg-[#FEF3C7] hover:bg-[#FDE68A] border border-[#FCD34D] rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{t.nav.accountDeletion}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
