# FundiQuotations Web Portal — Security Specification

## 1. Data Invariants
1. **Customer-Only APK Exposure**: Only `appVersions` documents with `status == 'published'` and `apkChannel == 'customer'` may ever be read by public visitors. Draft, archived, or non-customer entries are strictly admin-only.
2. **Admin Authorization & Email Verification**: Admin actions require `request.auth != null` AND `request.auth.token.email_verified == true` AND either the bootstrapped owner email (`agripachotamasege23@gmail.com`) or an active record in `/admins/{request.auth.uid}`.
3. **PII Isolation on Support Messages**: `supportMessages` documents contain customer PII (`customerName`, `email`). Public visitors may only `create` messages with `status == 'new'`, empty `adminNotes`, and `createdAt == request.time`. Only verified admins may read, update, or delete support messages.
4. **Verified Download Statistics**: `downloadStatistics` records can only be created for an existing `appVersions` document whose `status == 'published'` and `apkChannel == 'customer'`, with server-enforced `createdAt == request.time`. Only admins may list or read raw download statistic records.
5. **Immutable Audit & Identity Bounds**: All `createdAt` fields are immutable once created (`incoming().createdAt == existing().createdAt`). Document IDs must match `^[a-zA-Z0-9_\-]+$` (max 128 chars), and all strings enforce explicit `.size()` limits.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Unpublished APK Read**: Public visitor queries `appVersions` where `status == 'draft'` -> DENIED (`allow list` requires `resource.data.status == 'published'`).
2. **Admin APK Channel Spoof**: Admin or attacker creates `appVersions` with `apkChannel: 'admin'` -> DENIED (`apkChannel == 'customer'` enforced in `isValidAppVersion`).
3. **Shadow Field Injection on Support Message**: Attacker submits `supportMessages` with extra field `isAdminApproved: true` -> DENIED (`keys().hasOnly(...)` rejects unknown keys).
4. **Pre-Escalated Support Message Status**: Public visitor submits `supportMessages` with `status: 'resolved'` -> DENIED (create rule enforces `status == 'new'`).
5. **PII Scraping on Support Messages**: Signed-in non-admin user calls `getDocs(collection(db, 'supportMessages'))` -> DENIED (`allow list, get: if isAdmin()`).
6. **Email Spoofing Without Verification**: Attacker has unverified token (`email_verified: false`) matching admin email -> DENIED (`isAdmin()` requires `email_verified == true`).
7. **Privilege Self-Assignment**: Non-admin authenticated user attempts to write `/admins/{uid}` -> DENIED (`allow write: if isAdmin()`).
8. **Orphaned Download Statistic**: Attacker logs download for non-existent or draft `versionId` -> DENIED (`exists` + `get` check ensures `status == 'published'`).
9. **Client Timestamp Tampering**: Attacker sets `createdAt` to a backdated timestamp on `supportMessages` or `downloadStatistics` -> DENIED (`createdAt == request.time`).
10. **Path Variable ID Poisoning**: Attacker writes to `/supportMessages/` with a 500-char ID or `../evil` -> DENIED (`isValidId(messageId)`).
11. **Value Poisoning (1MB String)**: Attacker sends 200KB string in `subject` or `customerName` -> DENIED (`size() <= 160` / `size() <= 100`).
12. **Draft Tutorial/FAQ Scraping**: Public visitor reads `tutorials` or `faqs` with `status == 'draft'` -> DENIED (`allow get, list` enforces `resource.data.status == 'published'`).
