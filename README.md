# Personal Gym Website

完全なパーソナルジムウェブサイト - Next.js + TypeScript + Prisma + AI

## 🚀 機能

- 🔐 **認証システム** - NextAuthによる管理者・顧客ロール管理
- 📝 **ブログCMS** - 記事の作成・編集・公開機能
- 🤖 **AIブログ自動生成** - Claude 3.5 Sonnetによる記事自動生成
- 📅 **予約システム** - トレーナー予約とカレンダー管理
- 👥 **顧客管理** - ユーザープロフィールと履歴管理
- 📧 **メールマガジン** - 購読者管理と配信機能
- 📊 **管理者ダッシュボード** - 統計情報と一元管理
- 📱 **レスポンシブデザイン** - モバイル対応

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 15.3 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データベース**: SQLite (開発) / PostgreSQL (本番推奨)
- **ORM**: Prisma
- **認証**: NextAuth.js
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **メール**: Nodemailer

## 📋 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` を `.env` にコピーして、必要な値を設定：

```bash
cp .env.example .env
```

必要な環境変数：
- `DATABASE_URL` - データベース接続URL
- `NEXTAUTH_URL` - アプリケーションのURL
- `NEXTAUTH_SECRET` - NextAuth認証用シークレット
- `ANTHROPIC_API_KEY` - Anthropic APIキー（Claude 3.5 SonnetでのAIブログ生成用）

### 3. データベースのセットアップ

```bash
# データベースの初期化
npx prisma db push

# シードデータの投入
npm run db:seed
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアクセス可能

## 🔑 デモアカウント

- **管理者**: admin@personalgym.com / admin123
- **顧客**: tanaka@example.com / customer123

## 🤖 AIブログ自動生成機能

### 手動生成
管理者ダッシュボードから「AIブログ生成」をクリックして、以下を選択：
- カテゴリ（トレーニング、栄養学、ライフスタイル、リカバリー）
- トピック（事前定義またはカスタム）
- 公開設定

### 自動生成（Vercel Cron）
`vercel.json` で設定済み：
- 毎週月・水・金の午前9時に自動実行
- 週3記事まで自動生成・公開

### カスタマイズ
`src/lib/openai.ts` でプロンプトとトピックを編集可能

## 📁 プロジェクト構成

```
src/
├── app/                # Next.js App Router
│   ├── admin/         # 管理者ページ
│   ├── api/           # APIエンドポイント
│   ├── auth/          # 認証ページ
│   ├── blog/          # ブログページ
│   ├── booking/       # 予約ページ
│   └── dashboard/     # ユーザーダッシュボード
├── components/        # Reactコンポーネント
├── lib/              # ユーティリティ関数
└── types/            # TypeScript型定義
```

## 🚀 デプロイ

### Vercel
1. GitHubリポジトリをVercelに接続
2. 環境変数を設定
3. デプロイ

### その他のプラットフォーム
- Netlify
- Railway
- Render

## 📝 ライセンス

MIT License

## 🤝 貢献

プルリクエストを歓迎します！

---

🤖 Generated with [Claude Code](https://claude.ai/code)
