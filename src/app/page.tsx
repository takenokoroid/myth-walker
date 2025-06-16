import { CardDeck } from '@/features/card-draw/_components/CardDeck';
import { WalkHistoryList } from '@/features/walk-history/_components/WalkHistoryList';
import Link from 'next/link';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            MythWalker
          </h1>
          <p className="text-xl text-gray-600">
            日常を冒険に変える、散歩の神託
          </p>
        </div>
        
        <div className="flex justify-center mb-16">
          <CardDeck />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">最近の散歩</h2>
            <Link href="/history">
              <Button variant="secondary" size="sm">
                履歴をすべて見る
              </Button>
            </Link>
          </div>
          <WalkHistoryList limit={3} showHeader={false} />
        </div>
      </main>
    </div>
  );
}