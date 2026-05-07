export const DEMO_AUTH_CONFIG = {
  mode: import.meta.env.VITE_AUTH_MODE ?? 'demo',
  enableDemoAdmin: import.meta.env.VITE_ENABLE_DEMO_ADMIN === 'true',
  demoAdminAccessCode: import.meta.env.VITE_DEMO_ADMIN_ACCESS_CODE ?? '',
};

export const isDemoAuthMode = DEMO_AUTH_CONFIG.mode !== 'supabase';

// TODO: Replace demo login with Supabase Auth before school deployment.
// Required model: teacher/admin accounts, student accounts or class invitations,
// role-based access control, school tenancy, class membership, audit logs, and RLS.
