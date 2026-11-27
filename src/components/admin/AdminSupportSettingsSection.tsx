import React, { useEffect, useState } from 'react';
import {
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { AlertCircle, CheckCircle2, Save, Trash2 } from 'lucide-react';
import { db, formatFirestoreActionError, OperationType } from '../../lib/firebase';
import { SupportMessage, SupportStatus, WebsiteSettings } from '../../types/portal';

interface SupportSectionProps {
  messages: SupportMessage[];
  onRefresh: () => Promise<void>;
}

export function AdminSupportSection({ messages, onRefresh }: SupportSectionProps) {
  const [filter, setFilter] = useState<'all' | SupportStatus>('all');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [supportError, setSupportError] = useState<string | null>(null);

  const filtered = messages.filter((m) => filter === 'all' || m.status === filter);

  const handleUpdateMessage = async (msg: SupportMessage, nextStatus: SupportStatus) => {
    setBusyId(msg.id);
    setSupportError(null);
    try {
      const notes = notesDraft[msg.id] !== undefined ? notesDraft[msg.id] : msg.adminNotes;
      await updateDoc(doc(db, 'supportMessages', msg.id), {
        status: nextStatus,
        adminNotes: notes.slice(0, 1000),
        updatedAt: serverTimestamp()
      });
      await onRefresh();
    } catch (err) {
      setSupportError(
        formatFirestoreActionError(err, OperationType.UPDATE, `supportMessages/${msg.id}`)
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    setBusyId(id);
    setSupportError(null);
    try {
      await deleteDoc(doc(db, 'supportMessages', id));
      await onRefresh();
    } catch (err) {
      setSupportError(
        formatFirestoreActionError(err, OperationType.DELETE, `supportMessages/${id}`)
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-5">
      {supportError && (
        <div
          role="alert"
          className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{supportError}</span>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {(['all', 'new', 'in_progress', 'resolved'] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg border ${
              filter === status
                ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {status.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-600">
          No support messages match this filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-display text-base font-bold text-[#0B1F3A]">
                    {msg.subject}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {msg.customerName} · {msg.email} · Lang: {msg.language.toUpperCase()}
                  </p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-[#0B1F3A]">
                  {msg.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {msg.message}
              </p>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <input
                  type="text"
                  placeholder="Internal admin note..."
                  value={notesDraft[msg.id] ?? msg.adminNotes}
                  onChange={(e) =>
                    setNotesDraft((prev) => ({ ...prev, [msg.id]: e.target.value }))
                  }
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    disabled={busyId === msg.id}
                    onClick={() => void handleUpdateMessage(msg, 'in_progress')}
                    className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-md hover:bg-slate-50"
                  >
                    In Progress
                  </button>
                  <button
                    type="button"
                    disabled={busyId === msg.id}
                    onClick={() => void handleUpdateMessage(msg, 'resolved')}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0B1F3A] rounded-md hover:bg-[#163A66]"
                  >
                    Resolve
                  </button>
                  <button
                    type="button"
                    disabled={busyId === msg.id}
                    onClick={() => void handleDeleteMessage(msg.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface SettingsSectionProps {
  settings: WebsiteSettings;
  adminUid: string;
  onRefresh: () => Promise<void>;
}

export function AdminSettingsSection({
  settings,
  adminUid,
  onRefresh
}: SettingsSectionProps) {
  const [form, setForm] = useState<WebsiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      await setDoc(doc(db, 'websiteSettings', 'global'), {
        brandName: form.brandName.trim(),
        supportEmail: form.supportEmail.trim(),
        supportPhone: form.supportPhone.trim(),
        whatsappNumber: form.whatsappNumber.trim(),
        officeAddressEn: form.officeAddressEn.trim(),
        officeAddressSw: form.officeAddressSw.trim(),
        heroHeadlineEn: form.heroHeadlineEn.trim(),
        heroHeadlineSw: form.heroHeadlineSw.trim(),
        heroSubheadlineEn: form.heroSubheadlineEn.trim(),
        heroSubheadlineSw: form.heroSubheadlineSw.trim(),
        showDownloadCounter: Boolean(form.showDownloadCounter),
        updatedBy: adminUid,
        updatedAt: serverTimestamp()
      });
      setSaved(true);
      await onRefresh();
    } catch (err) {
      setSaveError(
        formatFirestoreActionError(err, OperationType.WRITE, 'websiteSettings/global')
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={(e) => void handleSave(e)}
      className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5"
    >
      <h2 className="font-display text-lg font-bold text-[#0B1F3A]">
        Global Portal Settings
      </h2>

      {saveError && (
        <div
          role="alert"
          className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {saved && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Website settings updated live.</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name</label>
          <input
            type="text"
            required
            value={form.brandName}
            onChange={(e) => setForm({ ...form, brandName: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Support Email</label>
          <input
            type="email"
            required
            value={form.supportEmail}
            onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Support Phone</label>
          <input
            type="text"
            required
            value={form.supportPhone}
            onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            WhatsApp Number
          </label>
          <input
            type="text"
            required
            value={form.whatsappNumber}
            onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Office Address (English)
          </label>
          <input
            type="text"
            required
            value={form.officeAddressEn}
            onChange={(e) => setForm({ ...form, officeAddressEn: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Office Address (Kiswahili)
          </label>
          <input
            type="text"
            required
            value={form.officeAddressSw}
            onChange={(e) => setForm({ ...form, officeAddressSw: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Hero Headline (English)
          </label>
          <input
            type="text"
            required
            value={form.heroHeadlineEn}
            onChange={(e) => setForm({ ...form, heroHeadlineEn: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Hero Headline (Kiswahili)
          </label>
          <input
            type="text"
            required
            value={form.heroHeadlineSw}
            onChange={(e) => setForm({ ...form, heroHeadlineSw: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Hero Subheadline (English)
          </label>
          <textarea
            rows={3}
            required
            value={form.heroSubheadlineEn}
            onChange={(e) => setForm({ ...form, heroSubheadlineEn: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Hero Subheadline (Kiswahili)
          </label>
          <textarea
            rows={3}
            required
            value={form.heroSubheadlineSw}
            onChange={(e) => setForm({ ...form, heroSubheadlineSw: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <label className="inline-flex items-center gap-2 text-sm text-[#0B1F3A]">
          <input
            type="checkbox"
            checked={form.showDownloadCounter}
            onChange={(e) => setForm({ ...form, showDownloadCounter: e.target.checked })}
            className="w-4 h-4 rounded border-slate-300"
          />
          <span>Enable public download stats counter</span>
        </label>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>
    </form>
  );
}
