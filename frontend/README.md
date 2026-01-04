# Pomodoro Study Music - フロントエンド

学習用ポモドーロアプリのReactフロントエンドアプリケーションです。

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは `http://localhost:5173` で起動します。

## プロジェクト構造

```
src/
├── components/
│   ├── common/          # 共通コンポーネント
│   │   └── Header.jsx   # ヘッダーコンポーネント
│   └── pages/           # ページコンポーネント
│       ├── TimerPage.jsx    # メイン画面（タイマー）
│       └── SettingsPage.jsx # 設定画面
├── styles/              # CSSスタイル
│   ├── common.css      # 共通スタイル
│   ├── timer.css       # タイマー画面スタイル
│   ├── settings.css    # 設定画面スタイル
│   └── modal.css       # モーダルスタイル
├── App.jsx             # メインアプリケーションコンポーネント
└── main.jsx            # エントリーポイント
```

## 機能

- ポモドーロタイマー（作業時間・休憩時間の設定と実行）
- 設定画面（タイマー時間、通知設定）
- Spotify認証（準備中）
- プレイリスト選択（準備中）

## API連携

バックエンドAPI（Spring Boot）は `http://localhost:8080/api` で実行されている必要があります。

### 使用API

- `GET /api/settings/{deviceId}` - 設定取得
- `PUT /api/settings` - 設定更新
- `GET /api/spotify/auth-url` - Spotify認証URL取得
- `GET /api/spotify/playlists` - プレイリスト一覧取得

## ビルド

```bash
npm run build
```

## 注意事項

- バックエンドAPIが起動している必要があります
- CORS設定が正しく行われている必要があります
