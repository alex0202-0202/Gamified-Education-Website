export type QuizResult = {
  id: string;
  studentName: string;
  className: string;
  score: number;
  total: number;
  pct: number;
  xpEarned: number;
  date: string;
};

export type LeaderboardEntry = {
  studentName: string;
  className: string;
  bestPct: number;
  bestScore: number;
  attempts: number;
  lastDate: string;
};

const STORAGE_KEY = 'dtlab_demo_gradebook';

export const gradebookStorageMode = 'demo-local' as const;

// Demo fallback only. Production storage must move to a secure server-side
// service with Supabase tables, RLS, teacher roles, class access, student
// privacy controls, consent records, and assessment audit history.
export const gradebookService = {
  loadResults(): QuizResult[] {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as QuizResult[]) : [];
    } catch {
      return [];
    }
  },

  persistResults(data: QuizResult[]) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Demo storage can be unavailable in private browsing or locked-down devices.
    }
  },

  clearResults() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Demo storage can be unavailable in private browsing or locked-down devices.
    }
  },
};
