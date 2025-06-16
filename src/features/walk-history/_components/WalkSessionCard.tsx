import { WalkSession } from '@/types';
import { Button } from '@/components/Button';
import { useSnackbar } from 'notistack';

interface WalkSessionCardProps {
  session: WalkSession;
  onToggleComplete?: (sessionId: string, completed: boolean) => void;
  onDelete?: (sessionId: string) => void;
  onAddNotes?: (sessionId: string, notes: string) => void;
}

export const WalkSessionCard = ({ 
  session, 
  onToggleComplete, 
  onDelete, 
  onAddNotes 
}: WalkSessionCardProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleToggleComplete = () => {
    onToggleComplete?.(session.id, !session.completed);
    const message = !session.completed ? '散歩完了にしました！' : '散歩を未完了にしました';
    enqueueSnackbar(message, { variant: 'info' });
  };

  const handleDelete = () => {
    if (window.confirm('この散歩記録を削除しますか？')) {
      onDelete?.(session.id);
      enqueueSnackbar('散歩記録を削除しました', { variant: 'warning' });
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAddNotes?.(session.id, e.target.value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm text-gray-500">
          {formatDate(session.createdAt)}
        </div>
        <div className="flex items-center gap-2">
          {session.completed && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              完了
            </span>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
          >
            削除
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-700 mb-2">どこへ行く？</h3>
            <p className="text-gray-800">{session.locationCard.text}</p>
            <div className="text-xs text-blue-600 mt-1">
              {getCategoryLabel(session.locationCard.category)}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-purple-700 mb-2">何をする？</h3>
            <p className="text-gray-800">{session.activityCard.text}</p>
            <div className="text-xs text-purple-600 mt-1">
              {getCategoryLabel(session.activityCard.category)}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            メモ
          </label>
          <textarea
            value={session.notes || ''}
            onChange={handleNotesChange}
            placeholder="散歩の感想や発見を記録しましょう..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          <Button
            variant={session.completed ? "secondary" : "primary"}
            size="sm"
            onClick={handleToggleComplete}
          >
            {session.completed ? '未完了にする' : '散歩完了！'}
          </Button>
        </div>
      </div>
    </div>
  );
};

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    // Location categories
    near: '近場',
    medium: '中距離',
    far: '遠距離',
    random: 'ランダム',
    // Activity categories
    observe: '観察',
    interact: '交流',
    create: '創作',
    consume: '消費',
  };
  return labels[category] || category;
}