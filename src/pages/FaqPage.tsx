import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortalData } from '../context/PortalDataContext';

export function FaqPage() {
  const { lang, t } = useLanguage();
  const { faqs } = usePortalData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return ['all', ...Array.from(set)];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return faqs.filter((item) => {
      const catOk = selectedCategory === 'all' || item.category === selectedCategory;
      if (!catOk) return false;
      if (!q) return true;
      const question = (lang === 'sw' ? item.questionSw : item.questionEn).toLowerCase();
      const answer = (lang === 'sw' ? item.answerSw : item.answerEn).toLowerCase();
      return question.includes(q) || answer.includes(q);
    });
  }, [faqs, searchQuery, selectedCategory, lang]);

  return (
    <div className="bg-[#F4F6F9] min-h-[calc(100vh-8rem)]">
      <section className="bg-[#0B1F3A] text-white py-14 border-b border-[#163A66]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {t.faq.pageTitle}
          </h1>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            {t.faq.pageSubtitle}
          </p>

          <div className="mt-7 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.faq.searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-[#0B1F3A] placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
            />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Interactive Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat === 'all' ? t.faq.allCategories : cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-200">
          {filteredFaqs.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-600">{t.faq.noResults}</div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              const q = lang === 'sw' ? faq.questionSw : faq.questionEn;
              const a = lang === 'sw' ? faq.answerSw : faq.answerEn;
              return (
                <div key={faq.id} className="px-6 py-5">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-4 text-left"
                  >
                    <div>
                      <span className="block text-xs font-medium text-[#9A6B06] mb-1">
                        {faq.category}
                      </span>
                      <span className="font-display text-base sm:text-lg font-semibold text-[#0B1F3A]">
                        {q}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#0B1F3A]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed pr-6">
                      {a}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-lg font-bold text-[#0B1F3A]">
              {t.faq.stillNeedHelpTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{t.faq.stillNeedHelpBody}</p>
          </div>
          <Link
            to="/support"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {t.faq.contactSupportBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
