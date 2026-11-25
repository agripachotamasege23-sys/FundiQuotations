import React, { useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Plus, Trash2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType, storage } from '../../lib/firebase';
import {
  AppScreenshot,
  ContentStatus,
  FaqItem,
  InstallationGuideStep,
  TutorialSection
} from '../../types/portal';

interface ContentSectionProps {
  section: 'screenshots' | 'guides' | 'tutorials' | 'faqs';
  screenshots: AppScreenshot[];
  guides: InstallationGuideStep[];
  tutorials: TutorialSection[];
  faqs: FaqItem[];
  onRefresh: () => Promise<void>;
}

export function AdminContentSection({
  section,
  screenshots,
  guides,
  tutorials,
  faqs,
  onRefresh
}: ContentSectionProps) {
  const [busy, setBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Screenshot form state
  const [shotTitleEn, setShotTitleEn] = useState('');
  const [shotTitleSw, setShotTitleSw] = useState('');
  const [shotCapEn, setShotCapEn] = useState('');
  const [shotCapSw, setShotCapSw] = useState('');
  const [shotUrl, setShotUrl] = useState('');
  const [shotOrder, setShotOrder] = useState('1');
  const [shotStatus, setShotStatus] = useState<ContentStatus>('published');

  // Guide step form state
  const [stepNum, setStepNum] = useState('1');
  const [guideTitleEn, setGuideTitleEn] = useState('');
  const [guideTitleSw, setGuideTitleSw] = useState('');
  const [guideDescEn, setGuideDescEn] = useState('');
  const [guideDescSw, setGuideDescSw] = useState('');
  const [guideTipEn, setGuideTipEn] = useState('');
  const [guideTipSw, setGuideTipSw] = useState('');
  const [guideImgUrl, setGuideImgUrl] = useState('');
  const [guideStatus, setGuideStatus] = useState<ContentStatus>('published');

  // Tutorial form state
  const [tutSlug, setTutSlug] = useState('');
  const [tutCat, setTutCat] = useState('Documents');
  const [tutOrder, setTutOrder] = useState('1');
  const [tutTitleEn, setTutTitleEn] = useState('');
  const [tutTitleSw, setTutTitleSw] = useState('');
  const [tutSumEn, setTutSumEn] = useState('');
  const [tutSumSw, setTutSumSw] = useState('');
  const [tutBodyEn, setTutBodyEn] = useState('');
  const [tutBodySw, setTutBodySw] = useState('');
  const [tutImgUrl, setTutImgUrl] = useState('');
  const [tutVideoUrl, setTutVideoUrl] = useState('');
  const [tutStatus, setTutStatus] = useState<ContentStatus>('published');

  // FAQ form state
  const [faqCat, setFaqCat] = useState('General');
  const [faqOrder, setFaqOrder] = useState('1');
  const [faqQEn, setFaqQEn] = useState('');
  const [faqQSw, setFaqQSw] = useState('');
  const [faqAEn, setFaqAEn] = useState('');
  const [faqASw, setFaqASw] = useState('');
  const [faqStatus, setFaqStatus] = useState<ContentStatus>('published');

  const handleImageUpload = async (
    file: File,
    folder: 'screenshots' | 'guides' | 'tutorials',
    onUrl: (url: string) => void
  ) => {
    setBusy(true);
    setStatusMessage(null);
    try {
      const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const storageRef = ref(storage, `media/${folder}/${safeName}`);
      await uploadBytes(storageRef, file, { contentType: file.type });
      const url = await getDownloadURL(storageRef);
      onUrl(url);
      setStatusMessage('Image uploaded to Firebase Storage.');
    } catch (err) {
      setStatusMessage(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setBusy(false);
    }
  };

  const toggleStatus = async (colName: string, id: string, current: ContentStatus) => {
    setBusy(true);
    try {
      await updateDoc(doc(db, colName, id), {
        status: current === 'published' ? 'draft' : 'published',
        updatedAt: serverTimestamp()
      });
      await onRefresh();
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `${colName}/${id}`);
    } finally {
      setBusy(false);
    }
  };

  const removeItem = async (colName: string, id: string) => {
    setBusy(true);
    try {
      await deleteDoc(doc(db, colName, id));
      await onRefresh();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${colName}/${id}`);
    } finally {
      setBusy(false);
    }
  };

  const createScreenshot = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await addDoc(collection(db, 'appScreenshots'), {
        titleEn: shotTitleEn.trim(),
        titleSw: shotTitleSw.trim(),
        captionEn: shotCapEn.trim(),
        captionSw: shotCapSw.trim(),
        imageUrl: shotUrl.trim(),
        storagePath: '',
        sortOrder: Number(shotOrder) || 1,
        status: shotStatus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setShotTitleEn('');
      setShotTitleSw('');
      setShotCapEn('');
      setShotCapSw('');
      setShotUrl('');
      setStatusMessage('Screenshot saved.');
      await onRefresh();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'appScreenshots');
    } finally {
      setBusy(false);
    }
  };

  const createGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await addDoc(collection(db, 'installationGuides'), {
        stepNumber: Math.max(1, Number(stepNum) || 1),
        titleEn: guideTitleEn.trim(),
        titleSw: guideTitleSw.trim(),
        descriptionEn: guideDescEn.trim(),
        descriptionSw: guideDescSw.trim(),
        tipEn: guideTipEn.trim(),
        tipSw: guideTipSw.trim(),
        imageUrl: guideImgUrl.trim(),
        status: guideStatus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setGuideTitleEn('');
      setGuideTitleSw('');
      setGuideDescEn('');
      setGuideDescSw('');
      setGuideTipEn('');
      setGuideTipSw('');
      setGuideImgUrl('');
      setStatusMessage('Installation guide step saved.');
      await onRefresh();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'installationGuides');
    } finally {
      setBusy(false);
    }
  };

  const createTutorial = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const cleanSlug = tutSlug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-|-$/g, '');
    try {
      await addDoc(collection(db, 'tutorials'), {
        slug: cleanSlug || `tutorial-${Date.now()}`,
        category: tutCat.trim(),
        sortOrder: Number(tutOrder) || 1,
        titleEn: tutTitleEn.trim(),
        titleSw: tutTitleSw.trim(),
        summaryEn: tutSumEn.trim(),
        summarySw: tutSumSw.trim(),
        contentEn: tutBodyEn.trim(),
        contentSw: tutBodySw.trim(),
        imageUrl: tutImgUrl.trim(),
        videoUrl: tutVideoUrl.trim(),
        status: tutStatus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setTutSlug('');
      setTutTitleEn('');
      setTutTitleSw('');
      setTutSumEn('');
      setTutSumSw('');
      setTutBodyEn('');
      setTutBodySw('');
      setTutImgUrl('');
      setTutVideoUrl('');
      setStatusMessage('Tutorial saved.');
      await onRefresh();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'tutorials');
    } finally {
      setBusy(false);
    }
  };

  const createFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await addDoc(collection(db, 'faqs'), {
        category: faqCat.trim(),
        sortOrder: Number(faqOrder) || 1,
        questionEn: faqQEn.trim(),
        questionSw: faqQSw.trim(),
        answerEn: faqAEn.trim(),
        answerSw: faqASw.trim(),
        status: faqStatus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setFaqQEn('');
      setFaqQSw('');
      setFaqAEn('');
      setFaqASw('');
      setStatusMessage('FAQ saved.');
      await onRefresh();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'faqs');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 text-sm text-[#0B1F3A]">
          {statusMessage}
        </div>
      )}

      {section === 'screenshots' && (
        <>
          <form
            onSubmit={(e) => void createScreenshot(e)}
            className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
          >
            <h2 className="font-display text-base font-bold text-[#0B1F3A]">
              Add App Screenshot
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Title (English)"
                value={shotTitleEn}
                onChange={(e) => setShotTitleEn(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                required
                placeholder="Title (Kiswahili)"
                value={shotTitleSw}
                onChange={(e) => setShotTitleSw(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                required
                placeholder="Caption (English)"
                value={shotCapEn}
                onChange={(e) => setShotCapEn(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                required
                placeholder="Caption (Kiswahili)"
                value={shotCapSw}
                onChange={(e) => setShotCapSw(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <input
                type="url"
                required
                placeholder="HTTPS Image URL or upload below"
                value={shotUrl}
                onChange={(e) => setShotUrl(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleImageUpload(f, 'screenshots', setShotUrl);
                }}
                className="text-xs text-slate-600"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  value={shotOrder}
                  onChange={(e) => setShotOrder(e.target.value)}
                  className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                />
                <select
                  value={shotStatus}
                  onChange={(e) => setShotStatus(e.target.value as ContentStatus)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Save Screenshot</span>
            </button>
          </form>

          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            {screenshots.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-sm text-[#0B1F3A]">
                    #{item.sortOrder} · {item.titleEn} / {item.titleSw}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.status}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void toggleStatus('appScreenshots', item.id, item.status)}
                    className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-md hover:bg-slate-50"
                  >
                    {item.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void removeItem('appScreenshots', item.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {section === 'guides' && (
        <>
          <form
            onSubmit={(e) => void createGuide(e)}
            className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
          >
            <h2 className="font-display text-base font-bold text-[#0B1F3A]">
              Add Installation Guide Step
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="number"
                min={1}
                required
                placeholder="Step #"
                value={stepNum}
                onChange={(e) => setStepNum(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              />
              <input
                type="text"
                required
                placeholder="Step Title (English)"
                value={guideTitleEn}
                onChange={(e) => setGuideTitleEn(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                required
                placeholder="Step Title (Kiswahili)"
                value={guideTitleSw}
                onChange={(e) => setGuideTitleSw(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <textarea
                rows={2}
                required
                placeholder="Description (English)"
                value={guideDescEn}
                onChange={(e) => setGuideDescEn(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <textarea
                rows={2}
                required
                placeholder="Description (Kiswahili)"
                value={guideDescSw}
                onChange={(e) => setGuideDescSw(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Helpful Tip (English, optional)"
                value={guideTipEn}
                onChange={(e) => setGuideTipEn(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Helpful Tip (Kiswahili, optional)"
                value={guideTipSw}
                onChange={(e) => setGuideTipSw(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <input
                type="url"
                placeholder="Optional HTTPS Image URL"
                value={guideImgUrl}
                onChange={(e) => setGuideImgUrl(e.target.value)}
                className="flex-1 min-w-[200px] px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <select
                value={guideStatus}
                onChange={(e) => setGuideStatus(e.target.value as ContentStatus)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>
            </div>
          </form>

          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            {guides.map((g) => (
              <div key={g.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-sm text-[#0B1F3A]">
                    Step {g.stepNumber}: {g.titleEn}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {g.titleSw} · {g.status}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void toggleStatus('installationGuides', g.id, g.status)}
                    className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-md"
                  >
                    {g.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void removeItem('installationGuides', g.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {section === 'tutorials' && (
        <>
          <form
            onSubmit={(e) => void createTutorial(e)}
            className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
          >
            <h2 className="font-display text-base font-bold text-[#0B1F3A]">
              Add User Guide Tutorial
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="slug (e.g. pdf-sharing)"
                value={tutSlug}
                onChange={(e) => setTutSlug(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              />
              <input
                type="text"
                required
                placeholder="Category (e.g. Documents)"
                value={tutCat}
                onChange={(e) => setTutCat(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="number"
                min={0}
                value={tutOrder}
                onChange={(e) => setTutOrder(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Title (English)"
                value={tutTitleEn}
                onChange={(e) => setTutTitleEn(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                required
                placeholder="Title (Kiswahili)"
                value={tutTitleSw}
                onChange={(e) => setTutTitleSw(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                required
                placeholder="Summary (English)"
                value={tutSumEn}
                onChange={(e) => setTutSumEn(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                required
                placeholder="Summary (Kiswahili)"
                value={tutSumSw}
                onChange={(e) => setTutSumSw(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <textarea
                rows={4}
                required
                minLength={10}
                placeholder="Full Instructions (English)"
                value={tutBodyEn}
                onChange={(e) => setTutBodyEn(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <textarea
                rows={4}
                required
                minLength={10}
                placeholder="Full Instructions (Kiswahili)"
                value={tutBodySw}
                onChange={(e) => setTutBodySw(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <input
                type="url"
                placeholder="Optional Screenshot URL"
                value={tutImgUrl}
                onChange={(e) => setTutImgUrl(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="url"
                placeholder="Optional HTTPS Video Link"
                value={tutVideoUrl}
                onChange={(e) => setTutVideoUrl(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <select
                value={tutStatus}
                onChange={(e) => setTutStatus(e.target.value as ContentStatus)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Save Tutorial</span>
            </button>
          </form>

          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            {tutorials.map((tut) => (
              <div key={tut.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-sm text-[#0B1F3A]">
                    {tut.sortOrder}. {tut.titleEn}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {tut.category} · {tut.status}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void toggleStatus('tutorials', tut.id, tut.status)}
                    className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-md"
                  >
                    {tut.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void removeItem('tutorials', tut.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {section === 'faqs' && (
        <>
          <form
            onSubmit={(e) => void createFaq(e)}
            className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
          >
            <h2 className="font-display text-base font-bold text-[#0B1F3A]">Add FAQ Entry</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="Category (e.g. Offline)"
                value={faqCat}
                onChange={(e) => setFaqCat(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="number"
                min={0}
                value={faqOrder}
                onChange={(e) => setFaqOrder(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              />
              <select
                value={faqStatus}
                onChange={(e) => setFaqStatus(e.target.value as ContentStatus)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                minLength={5}
                placeholder="Question (English)"
                value={faqQEn}
                onChange={(e) => setFaqQEn(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                required
                minLength={5}
                placeholder="Question (Kiswahili)"
                value={faqQSw}
                onChange={(e) => setFaqQSw(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <textarea
                rows={3}
                required
                minLength={5}
                placeholder="Answer (English)"
                value={faqAEn}
                onChange={(e) => setFaqAEn(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <textarea
                rows={3}
                required
                minLength={5}
                placeholder="Answer (Kiswahili)"
                value={faqASw}
                onChange={(e) => setFaqASw(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Save FAQ</span>
            </button>
          </form>

          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-sm text-[#0B1F3A]">{faq.questionEn}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {faq.category} · {faq.status}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void toggleStatus('faqs', faq.id, faq.status)}
                    className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-md"
                  >
                    {faq.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void removeItem('faqs', faq.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
