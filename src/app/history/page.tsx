import { WalkHistoryList } from '@/features/walk-history/_components/WalkHistoryList';
import Link from 'next/link';
import { Button } from '@/components/Button';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/">
            <Button variant="secondary" size="sm">
              ← ホームに戻る
            </Button>
          </Link>
        </div>
        
        <WalkHistoryList />
      </main>
    </div>
  );
}