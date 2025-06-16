# MythWalker

## 概要

MythWalker は、日常の散歩を冒険に変える体験型 WEB アプリです。2 枚のカードを引くことで、散歩の「場所」と「アクティビティ」をランダムに決定し、新しい発見や楽しみを提供します。

### 遊び方

1. 「散歩を始める」ボタンをクリック
2. 最初のカード（場所）が自動的に引かれます
3. 「次のカードを引く」をクリック
4. 2 枚目のカード（アクティビティ）が引かれます
5. 指示に従って散歩を楽しみましょう！

**例**: 「二駅先の駅」×「知らない雑誌を買う」

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: CSS Transform 3D

## セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/botan-party/myth-walker.git
cd myth-walker

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーが起動したら、[http://localhost:3000](http://localhost:3000) にアクセスしてください。

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プロダクション実行
npm start
```

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
├── components/            # 汎用的なコンポーネント
│   ├── Button/
│   └── Card/
├── features/              # ドメイン固有の機能
│   ├── card-draw/        # カード引き機能
│   │   ├── _components/  # feature固有のコンポーネント
│   │   └── hooks/        # カスタムフック
│   └── walk-history/     # 散歩履歴機能（未実装）
├── data/                  # カードデータ
├── types/                 # TypeScript型定義
└── utils/                 # ユーティリティ関数
```
