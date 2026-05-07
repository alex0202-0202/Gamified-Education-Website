import { useState, useCallback } from 'react';
import { gradebookService, gradebookStorageMode } from '../../features/gradebook/gradebookService';
import type { LeaderboardEntry, QuizResult } from '../../features/gradebook/gradebookService';
export type { LeaderboardEntry, QuizResult } from '../../features/gradebook/gradebookService';

export function useClassData() {
  const [results, setResults] = useState<QuizResult[]>(() => gradebookService.loadResults());

  const saveResult = useCallback(
    (partial: Omit<QuizResult, 'id' | 'date'>) => {
      const entry: QuizResult = {
        ...partial,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        date: new Date().toISOString(),
      };
      setResults((prev) => {
        const next = [entry, ...prev];
        gradebookService.persistResults(next);
        return next;
      });
    },
    []
  );

  const clearAll = useCallback(() => {
    setResults([]);
    gradebookService.clearResults();
  }, []);

  // Best-score leaderboard
  const leaderboard: LeaderboardEntry[] = (() => {
    const map = new Map<string, LeaderboardEntry>();
    for (const r of results) {
      const ex = map.get(r.studentName);
      if (!ex) {
        map.set(r.studentName, {
          studentName: r.studentName,
          className: r.className,
          bestPct: r.pct,
          bestScore: r.score,
          attempts: 1,
          lastDate: r.date,
        });
      } else {
        map.set(r.studentName, {
          ...ex,
          bestPct: Math.max(ex.bestPct, r.pct),
          bestScore: r.pct >= ex.bestPct ? r.score : ex.bestScore,
          attempts: ex.attempts + 1,
          lastDate: r.date > ex.lastDate ? r.date : ex.lastDate,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.bestPct - a.bestPct);
  })();

  const overallStats = {
    totalAttempts: results.length,
    uniqueStudents: new Set(results.map((r) => r.studentName)).size,
    avgPct:
      results.length > 0
        ? Math.round(results.reduce((s, r) => s + r.pct, 0) / results.length)
        : 0,
    topStudent: leaderboard[0] ?? null,
  };

  return { results, saveResult, clearAll, leaderboard, overallStats, storageMode: gradebookStorageMode };
}
