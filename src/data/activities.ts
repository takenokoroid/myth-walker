import { ActivityCard } from '@/types';

export const activityCards: ActivityCard[] = [
  // 観察系
  { id: 'act-1', text: '10分間そこにある物を観察する', category: 'observe' },
  { id: 'act-2', text: '聞こえる音を全て書き出す', category: 'observe' },
  { id: 'act-3', text: '一番古そうなものを探す', category: 'observe' },
  { id: 'act-4', text: '色を5つ集める', category: 'observe' },
  { id: 'act-5', text: '人の流れを5分間観察する', category: 'observe' },
  
  // 交流系
  { id: 'act-6', text: '誰かに道を聞く', category: 'interact' },
  { id: 'act-7', text: 'お店の人におすすめを聞く', category: 'interact' },
  { id: 'act-8', text: '挨拶をする', category: 'interact' },
  { id: 'act-9', text: '地元の人に歴史を聞く', category: 'interact' },
  
  // 創作系
  { id: 'act-10', text: '写真を3枚撮る', category: 'create' },
  { id: 'act-11', text: 'スケッチをする', category: 'create' },
  { id: 'act-12', text: '俳句を作る', category: 'create' },
  { id: 'act-13', text: '地図を描く', category: 'create' },
  { id: 'act-14', text: '10秒の動画を撮る', category: 'create' },
  
  // 消費系
  { id: 'act-15', text: '知らない雑誌や本を買う', category: 'consume' },
  { id: 'act-16', text: '初めての飲み物を買う', category: 'consume' },
  { id: 'act-17', text: '100円以内で何か買う', category: 'consume' },
  { id: 'act-18', text: 'その場所らしいものを食べる', category: 'consume' },
  { id: 'act-19', text: '地元のお店で買い物をする', category: 'consume' },
];