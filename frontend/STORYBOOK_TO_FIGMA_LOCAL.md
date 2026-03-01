# ローカルStorybookでFigmaにインポートする方法

ChromaticのStorybookがプライベートのため、story.to.designプラグインから直接アクセスできません。ローカルでStorybookを起動して使用する方法です。

## 手順

### ステップ1: ローカルでStorybookを起動

ターミナルで以下のコマンドを実行：

```bash
cd frontend
npm run storybook
```

Storybookが起動すると、以下のURLでアクセスできます：
```
http://localhost:6006
```

### ステップ2: story.to.designプラグインで接続

1. Figmaでstory.to.designプラグインを開く
2. StorybookのURLに以下を入力：
   ```
   http://localhost:6006
   ```
3. **Connect**または**Import**ボタンをクリック

### ステップ3: コンポーネントをインポート

1. プラグインでコンポーネント一覧が表示されます
2. インポートしたいコンポーネントを選択
3. Figmaにインポート

## 注意点

- Storybookが起動している間は、ターミナルを閉じないでください
- ローカルURLなので、同じマシン上でFigmaとStorybookが動作している必要があります
- ポート6006が使用されている場合は、別のポートで起動される可能性があります

## トラブルシューティング

### Storybookが起動しない場合

1. ポート6006が使用中か確認
2. 依存関係を再インストール：
   ```bash
   npm install
   ```
3. Storybookを再ビルド：
   ```bash
   npm run build-storybook
   ```

### プラグインが接続できない場合

1. Storybookが正常に起動しているか確認（ブラウザで`http://localhost:6006`を開く）
2. ファイアウォールがポート6006をブロックしていないか確認
3. プラグインを再起動

## 代替方法: HTML to Designプラグイン

story.to.designが使えない場合は、HTML to Designプラグインを使用：

1. Figmaで「HTML to Design」プラグインをインストール
2. ブラウザで`http://localhost:6006`を開く
3. 開発者ツール（F12）でHTMLを取得
4. プラグインでインポート

