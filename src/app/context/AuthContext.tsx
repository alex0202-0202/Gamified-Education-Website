import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { DEMO_AUTH_CONFIG, isDemoAuthMode } from '../../features/auth/authConfig';

export type AuthRole = 'admin' | 'student';

export interface AuthUser {
  id: string;
  role: AuthRole;
  displayName: string;
}

interface AuthState {
  user: AuthUser | null;
  login: (role: AuthRole, id: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (role: AuthRole, id: string, password: string): { ok: boolean; error?: string } => {
    const trimmedId = id.trim();

    if (role === 'admin') {
      if (!isDemoAuthMode) {
        return { ok: false, error: '請使用學校身份驗證登入 · Use the school authentication provider' };
      }
      if (!DEMO_AUTH_CONFIG.enableDemoAdmin) {
        return { ok: false, error: '管理員示範登入未啟用 · Demo admin login is disabled' };
      }
      if (!trimmedId) return { ok: false, error: '請輸入管理員名稱 · Enter an admin name' };
      if (!DEMO_AUTH_CONFIG.demoAdminAccessCode || password !== DEMO_AUTH_CONFIG.demoAdminAccessCode) {
        return { ok: false, error: '示範管理員存取碼錯誤 · Incorrect demo admin access code' };
      }
      setUser({ id: trimmedId, role: 'admin', displayName: trimmedId });
      return { ok: true };
    }

    if (!isDemoAuthMode) {
      return { ok: false, error: '請使用學校學生帳戶登入 · Use your school student account' };
    }
    if (!trimmedId) return { ok: false, error: '請輸入學生 ID 或姓名 · Enter your student ID or name' };
    setUser({ id: trimmedId, role: 'student', displayName: trimmedId });
    return { ok: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
