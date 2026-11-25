/**
 * Security Rule Adversarial Test Suite (Dirty Dozen Verification)
 * Run against Firebase Emulator Suite (`@firebase/rules-unit-testing`) when testing locally.
 */
export const dirtyDozenPayloads = [
  {
    name: '01_unpublished_apk_read',
    collection: 'appVersions',
    operation: 'list',
    actor: 'public',
    queryFilter: { status: 'draft' },
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '02_admin_apk_channel_spoof',
    collection: 'appVersions',
    operation: 'create',
    actor: 'admin',
    payload: { apkChannel: 'admin', status: 'published' },
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '03_shadow_field_support_message',
    collection: 'supportMessages',
    operation: 'create',
    actor: 'public',
    payload: {
      customerName: 'Test Customer',
      email: 'test@example.com',
      subject: 'Need help',
      message: 'This is a valid test support message.',
      language: 'en',
      status: 'new',
      adminNotes: '',
      isAdminApproved: true
    },
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '04_pre_escalated_support_status',
    collection: 'supportMessages',
    operation: 'create',
    actor: 'public',
    payload: {
      customerName: 'Test Customer',
      email: 'test@example.com',
      subject: 'Need help',
      message: 'This is a valid test support message.',
      language: 'en',
      status: 'resolved',
      adminNotes: ''
    },
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '05_pii_scraping_support_messages',
    collection: 'supportMessages',
    operation: 'list',
    actor: 'authenticated_non_admin',
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '06_unverified_admin_email_spoof',
    collection: 'appVersions',
    operation: 'create',
    actor: { email: 'agripachotamasege23@gmail.com', email_verified: false },
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '07_privilege_self_assignment',
    collection: 'admins',
    operation: 'create',
    actor: 'authenticated_non_admin',
    payload: { role: 'super_admin' },
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '08_orphaned_download_statistic',
    collection: 'downloadStatistics',
    operation: 'create',
    actor: 'public',
    payload: {
      versionId: 'nonexistent-version-id',
      versionName: '1.0.0',
      apkChannel: 'customer',
      sourcePage: 'download',
      language: 'en'
    },
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '09_client_timestamp_tampering',
    collection: 'supportMessages',
    operation: 'create',
    actor: 'public',
    payload: { createdAt: '2020-01-01T00:00:00Z' },
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '10_path_variable_id_poisoning',
    collection: 'supportMessages',
    docId: '../invalid_id_slash',
    operation: 'create',
    actor: 'public',
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '11_value_poisoning_oversized_string',
    collection: 'supportMessages',
    operation: 'create',
    actor: 'public',
    payload: { subject: 'A'.repeat(500) },
    expected: 'PERMISSION_DENIED'
  },
  {
    name: '12_draft_tutorial_scraping',
    collection: 'tutorials',
    operation: 'list',
    actor: 'public',
    queryFilter: { status: 'draft' },
    expected: 'PERMISSION_DENIED'
  }
];
