'use client';

import { useWalkHistory } from '../hooks/useWalkHistory';
import { WalkSessionCard } from './WalkSessionCard';
import { Button } from '@/components/Button';
import { useSnackbar } from 'notistack';

interface WalkHistoryListProps {
  limit?: number;
  showHeader?: boolean;
}

export const WalkHistoryList = ({ limit, showHeader = true }: WalkHistoryListProps) => {
  const { 
    history, 
    isLoading, 
    updateSession, 
    deleteSession, 
    clearHistory,
    getRecentSessions 
  } = useWalkHistory();
  
  const { enqueueSnackbar } = useSnackbar();

  const handleToggleComplete = (sessionId: string, completed: boolean) => {
    updateSession(sessionId, { completed });
  };

  const handleAddNotes = (sessionId: string, notes: string) => {
    updateSession(sessionId, { notes });
  };

  const handleClearHistory = () => {
    if (window.confirm('全ての散歩履歴を削除しますか？この操作は取り消せません。')) {
      clearHistory();
      enqueueSnackbar('全ての散歩履歴を削除しました', { variant: 'warning' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">履歴を読み込み中...</div>
      </div>
    );
  }

  const sessionsToShow = limit ? getRecentSessions(limit) : history.sessions;

  if (sessionsToShow.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">
          まだ散歩の記録がありません
        </div>
        <div className="text-sm text-gray-400">
          カードを引いて散歩を始めましょう！
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">散歩履歴</h2>
            <p className="text-gray-600">
              総散歩回数: {history.totalWalks}回
              {history.lastWalk && (
                <span className="text-sm text-gray-500 ml-2">
                  最後の散歩: {new Intl.DateTimeFormat('ja-JP', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(history.lastWalk))}
                </span>
              )}
            </p>
          </div>
          
          {!limit && history.sessions.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClearHistory}
              className="text-red-600 hover:text-red-800"
            >
              履歴をクリア
            </Button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {sessionsToShow.map((session) => (
          <WalkSessionCard
            key={session.id}
            session={session}
            onToggleComplete={handleToggleComplete}
            onDelete={deleteSession}
            onAddNotes={handleAddNotes}
          />
        ))}
      </div>

      {limit && history.sessions.length > limit && (
        <div className="text-center">
          <Button variant="secondary">
            すべての履歴を見る ({history.sessions.length}件)
          </Button>
        </div>
      )}
    </div>
  );
};