import { WalkHistory, WalkSession } from '@/types';

const WALK_HISTORY_KEY = 'mythwalker-history';

export const getWalkHistory = (): WalkHistory => {
  if (typeof window === 'undefined') {
    return { sessions: [], totalWalks: 0 };
  }

  try {
    const stored = localStorage.getItem(WALK_HISTORY_KEY);
    if (!stored) {
      return { sessions: [], totalWalks: 0 };
    }

    const parsed = JSON.parse(stored);
    // Date オブジェクトを復元
    return {
      ...parsed,
      sessions: parsed.sessions.map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
      })),
      lastWalk: parsed.lastWalk ? new Date(parsed.lastWalk) : undefined,
    };
  } catch (error) {
    console.error('Failed to parse walk history from localStorage:', error);
    return { sessions: [], totalWalks: 0 };
  }
};

const dispatchStorageChange = (key: string, newValue: string | null) => {
  // カスタムイベントを発火して同一タブでの変更を通知
  const event = new CustomEvent('localStorageChange', {
    detail: { key, newValue }
  });
  window.dispatchEvent(event);
};

export const saveWalkHistory = (history: WalkHistory): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const serialized = JSON.stringify(history);
    localStorage.setItem(WALK_HISTORY_KEY, serialized);
    dispatchStorageChange(WALK_HISTORY_KEY, serialized);
  } catch (error) {
    console.error('Failed to save walk history to localStorage:', error);
  }
};

export const addWalkSession = (session: WalkSession): void => {
  const currentHistory = getWalkHistory();
  const newHistory: WalkHistory = {
    sessions: [session, ...currentHistory.sessions],
    totalWalks: currentHistory.totalWalks + 1,
    lastWalk: session.createdAt,
  };
  saveWalkHistory(newHistory);
};

export const updateWalkSession = (sessionId: string, updates: Partial<WalkSession>): void => {
  const currentHistory = getWalkHistory();
  const updatedSessions = currentHistory.sessions.map(session =>
    session.id === sessionId ? { ...session, ...updates } : session
  );
  
  const newHistory: WalkHistory = {
    ...currentHistory,
    sessions: updatedSessions,
  };
  saveWalkHistory(newHistory);
};

export const deleteWalkSession = (sessionId: string): void => {
  const currentHistory = getWalkHistory();
  const filteredSessions = currentHistory.sessions.filter(session => session.id !== sessionId);
  
  const newHistory: WalkHistory = {
    sessions: filteredSessions,
    totalWalks: filteredSessions.length,
    lastWalk: filteredSessions.length > 0 ? filteredSessions[0].createdAt : undefined,
  };
  saveWalkHistory(newHistory);
};

export const clearWalkHistory = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(WALK_HISTORY_KEY);
    dispatchStorageChange(WALK_HISTORY_KEY, null);
  } catch (error) {
    console.error('Failed to clear walk history from localStorage:', error);
  }
};