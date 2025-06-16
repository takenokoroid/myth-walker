import { useState, useEffect, useCallback } from 'react';
import { WalkHistory, WalkSession } from '@/types';
import { 
  getWalkHistory, 
  addWalkSession, 
  updateWalkSession, 
  deleteWalkSession, 
  clearWalkHistory 
} from '@/utils/localStorage';
import { useLocalStorageSync } from '@/hooks/useLocalStorageSync';

export const useWalkHistory = () => {
  const [history, setHistory] = useState<WalkHistory>({ sessions: [], totalWalks: 0 });
  const [isLoading, setIsLoading] = useState(true);
  
  // LocalStorageの変更を監視
  const storageValue = useLocalStorageSync('mythwalker-history');

  const loadHistory = useCallback(() => {
    setIsLoading(true);
    try {
      const loadedHistory = getWalkHistory();
      setHistory(loadedHistory);
    } catch (error) {
      console.error('Failed to load walk history:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 初回読み込み
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // LocalStorageの変更時に履歴を再読み込み
  useEffect(() => {
    if (storageValue !== null) {
      loadHistory();
    }
  }, [storageValue, loadHistory]);

  const addSession = useCallback((session: WalkSession) => {
    try {
      addWalkSession(session);
      // LocalStorageの変更は自動で検知されるため、手動での再読み込みは不要
    } catch (error) {
      console.error('Failed to add walk session:', error);
      throw error;
    }
  }, []);

  const updateSession = useCallback((sessionId: string, updates: Partial<WalkSession>) => {
    try {
      updateWalkSession(sessionId, updates);
      // LocalStorageの変更は自動で検知されるため、手動での再読み込みは不要
    } catch (error) {
      console.error('Failed to update walk session:', error);
    }
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    try {
      deleteWalkSession(sessionId);
      // LocalStorageの変更は自動で検知されるため、手動での再読み込みは不要
    } catch (error) {
      console.error('Failed to delete walk session:', error);
    }
  }, []);

  const clearHistory = useCallback(() => {
    try {
      clearWalkHistory();
      setHistory({ sessions: [], totalWalks: 0 });
    } catch (error) {
      console.error('Failed to clear walk history:', error);
    }
  }, []);

  const getRecentSessions = useCallback((count: number = 5) => {
    return history.sessions.slice(0, count);
  }, [history.sessions]);

  const getSessionsByCategory = useCallback((category: string) => {
    return history.sessions.filter(session => 
      session.locationCard.category === category || 
      session.activityCard.category === category
    );
  }, [history.sessions]);

  const getCompletedSessions = useCallback(() => {
    return history.sessions.filter(session => session.completed);
  }, [history.sessions]);

  return {
    history,
    isLoading,
    addSession,
    updateSession,
    deleteSession,
    clearHistory,
    getRecentSessions,
    getSessionsByCategory,
    getCompletedSessions,
    refresh: loadHistory,
  };
};