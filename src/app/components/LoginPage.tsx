import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, User, Eye, EyeOff, GraduationCap, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { AuthRole } from '../context/AuthContext';
import { DEMO_AUTH_CONFIG, isDemoAuthMode } from '../../features/auth/authConfig';

export const LoginPage = () => {
  const { login } = useAuth();
  const [tab, setTab] = useState<AuthRole>('student');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const switchTab = (role: AuthRole) => {
    setTab(role);
    setId('');
    setPassword('');
    setError('');
    setShowPw(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = login(tab, id, password);
    if (!result.ok) setError(result.error ?? '登入失敗 · Login failed');
  };

  const isAdmin = tab === 'admin';
  const needsAccessCode = isAdmin && isDemoAuthMode && DEMO_AUTH_CONFIG.enableDemoAdmin;
  const canSubmit = isAdmin ? Boolean(id.trim() && password.trim()) : Boolean(id.trim());

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D5896F]/10 border border-[#D5896F]/20 mb-4">
            <GraduationCap className="w-8 h-8 text-[#D5896F]" />
          </div>
          <h1 className="text-2xl font-bold text-[#2C2A26]">Design Technology Lab</h1>
          <p className="text-sm text-[#6B665E] mt-1">IB Design Technology · HKDSE DAT</p>
          <p className="text-xs text-[#A8A29A] mt-1">Design project, portfolio, IA and SBA support</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-[#E5E0D8]">
            <button
              type="button"
              onClick={() => switchTab('student')}
              className={`flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${
                tab === 'student'
                  ? 'bg-white text-[#D5896F] border-b-2 border-[#D5896F]'
                  : 'bg-[#F9F8F6] text-[#8C857B] hover:text-[#4A4741]'
              }`}
            >
              <User className="w-4 h-4" />
              學生 · Student
            </button>
            <button
              type="button"
              onClick={() => switchTab('admin')}
              className={`flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${
                tab === 'admin'
                  ? 'bg-white text-[#7B8FA1] border-b-2 border-[#7B8FA1]'
                  : 'bg-[#F9F8F6] text-[#8C857B] hover:text-[#4A4741]'
              }`}
            >
              <Shield className="w-4 h-4" />
              管理員 · Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Context hint */}
            <div className={`rounded-xl px-4 py-3 text-xs leading-relaxed ${
              isAdmin
                ? 'bg-[#EEF2F5] text-[#7B8FA1]'
                : 'bg-[#FFF5F0] text-[#C4785E]'
            }`}>
              {isAdmin
                ? '正式學校版本須使用 Supabase Auth / 學校帳戶及角色權限。此頁只保留受控示範登入。 · Production schools must use Supabase Auth or school SSO with role-based access. This page only keeps controlled demo access.'
                : '示範模式只需輸入學生 ID 或姓名。正式學校版本應使用受保護學生帳戶及班級授權。 · Demo mode only requires a student ID or name. Production schools should use protected student accounts and class access.'}
            </div>

            {/* ID / Username */}
            <div>
              <label htmlFor="login-id" className="block text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">
                {isAdmin ? '帳號 · Username' : '學生 ID · Student ID'}
              </label>
              <input
                id="login-id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder={isAdmin ? '輸入示範管理員名稱' : '輸入你的學生 ID 或姓名'}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] focus:outline-none focus:border-[#D5896F] bg-[#F9F8F6] text-sm text-[#2C2A26] placeholder:text-[#C4BEB8]"
                autoComplete="username"
                autoCapitalize="off"
              />
            </div>

            {isAdmin && (
              <div>
                <label htmlFor="login-access-code" className="block text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">
                  示範存取碼 · Demo Access Code
                </label>
                <div className="relative">
                  <input
                    id="login-access-code"
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={needsAccessCode ? '輸入示範存取碼' : '示範管理員登入未啟用'}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-[#E5E0D8] focus:outline-none focus:border-[#D5896F] bg-[#F9F8F6] text-sm text-[#2C2A26] placeholder:text-[#C4BEB8] disabled:opacity-60"
                    autoComplete="current-password"
                    disabled={!needsAccessCode}
                    aria-describedby="admin-demo-note"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29A] hover:text-[#6B665E] disabled:opacity-40"
                    aria-label="Toggle access code visibility"
                    disabled={!needsAccessCode}
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p id="admin-demo-note" className="text-[10px] text-[#A8A29A] mt-1.5">
                  {needsAccessCode
                    ? '只可用於本機示範；正式版本必須接駁學校身份驗證。'
                    : '如需本機示範管理員模式，請在 .env 設定 VITE_ENABLE_DEMO_ADMIN=true 及示範存取碼。'}
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#FFF0EB] border border-[#D5896F]/30 rounded-xl px-4 py-3 text-sm text-[#C4785E] font-medium"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                isAdmin
                  ? 'bg-[#7B8FA1] hover:bg-[#6A7E90]'
                  : 'bg-[#D5896F] hover:bg-[#C4785E]'
              }`}
            >
              <LogIn className="w-4 h-4" />
              {isAdmin ? '以管理員身份登入 · Admin Login' : '進入學習 · Enter'}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-[#C4BEB8] mt-5">
          Design Technology Lab · demo access only · production data must use protected school storage
        </p>
      </motion.div>
    </div>
  );
};
