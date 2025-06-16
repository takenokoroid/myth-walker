import { LocationCard } from '@/types';

export const locationCards: LocationCard[] = [
  // 近場
  { id: 'loc-1', text: '最寄りのコンビニ', category: 'near' },
  { id: 'loc-2', text: '近所の公園', category: 'near' },
  { id: 'loc-3', text: '最寄り駅', category: 'near' },
  { id: 'loc-4', text: '近くの交差点', category: 'near' },
  { id: 'loc-5', text: '自宅から見える場所', category: 'near' },
  
  // 中距離
  { id: 'loc-6', text: '二駅先の駅', category: 'medium' },
  { id: 'loc-7', text: '隣町の商店街', category: 'medium' },
  { id: 'loc-8', text: '歩いて15分の場所', category: 'medium' },
  { id: 'loc-9', text: '知らない通り', category: 'medium' },
  { id: 'loc-10', text: '最寄りの川や橋', category: 'medium' },
  
  // 遠距離
  { id: 'loc-11', text: '電車で30分の駅', category: 'far' },
  { id: 'loc-12', text: '行ったことのない区や市', category: 'far' },
  { id: 'loc-13', text: '終点の駅', category: 'far' },
  { id: 'loc-14', text: '地図で見つけた気になる場所', category: 'far' },
  
  // ランダム
  { id: 'loc-15', text: 'バスに乗って適当に降りた場所', category: 'random' },
  { id: 'loc-16', text: 'サイコロで決めた方角に歩いた先', category: 'random' },
  { id: 'loc-17', text: '今日の日付の数だけ駅を進んだ場所', category: 'random' },
];