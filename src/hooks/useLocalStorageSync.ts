import { useEffect, useState } from 'react';

export const useLocalStorageSync = (key: string) => {
  const [storageValue, setStorageValue] = useState<string | null>(null);

  useEffect(() => {
    // 初期値を取得
    setStorageValue(localStorage.getItem(key));

    // storage イベントリスナーを追加（他のタブでの変更を検知）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setStorageValue(e.newValue);
      }
    };

    // カスタムイベントリスナーを追加（同一タブでの変更を検知）
    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStorageValue(e.detail.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange as EventListener);
    };
  }, [key]);

  return storageValue;
};