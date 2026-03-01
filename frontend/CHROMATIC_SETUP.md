# ChromaticとFigma Connectのセットアップガイド

このガイドでは、StorybookをChromaticで公開し、Figma Connectでリンクする手順を説明します。

## 1. Chromaticアカウントの作成とプロジェクトセットアップ

### ステップ1: Chromaticアカウントを作成
1. [Chromatic](https://www.chromatic.com/)にアクセス
2. GitHubアカウントでサインイン（推奨）またはメールアドレスで登録

### ステップ2: プロジェクトを作成
1. Chromaticのダッシュボードで「New Project」をクリック
2. プロジェクト名を入力（例: `pomodoro-study-music`）
3. GitHubリポジトリを選択（オプション）
4. プロジェクトが作成されたら、**Project Token**をコピー

### ステップ3: Chromatic CLIをセットアップ
```bash
cd frontend
npm install --save-dev chromatic
```

### ステップ4: package.jsonの更新
`package.json`の`chromatic`スクリプトに、コピーしたProject Tokenを設定：

```json
"chromatic": "npx chromatic --project-token=YOUR_PROJECT_TOKEN"
```

`YOUR_PROJECT_TOKEN`を実際のトークンに置き換えてください。

## 2. StorybookをChromaticに公開

### 初回公開
```bash
cd frontend
npm run chromatic
```

これにより：
- Storybookがビルドされます
- Chromaticにアップロードされます
- 公開URLが生成されます

**現在の公開URL:**
```
https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/
```

**Chromaticダッシュボード:**
```
https://www.chromatic.com/setup?appId=695f311e6b1f9784a5cc8058
```

### 継続的な公開
GitHub ActionsやCI/CDパイプラインに組み込むことで、自動的に公開できます。

## 3. Figma Connectプラグインのセットアップ

詳細な手順は **`FIGMA_CONNECT_SETUP.md`** を参照してください。

### クイックスタート

1. **Figmaでプラグインをインストール**
   - Figmaで「Storybook Connect」プラグインを検索してインストール

2. **Chromaticアカウントでサインイン**
   - プラグインを起動してChromaticアカウントでサインイン
   - 「pomodoro-study-music」プロジェクトを選択

3. **コンポーネントをリンク**
   - Figmaでコンポーネントを選択
   - プラグインで対応するStorybookストーリーを選択
   - リンクを完了

### ストーリーURL一覧

各コンポーネントのストーリーURLは `FIGMA_CONNECT_SETUP.md` に記載されています。

## 4. リンクの確認

リンクが成功すると：
- FigmaのコンポーネントにStorybookのアイコンが表示されます
- クリックすると、対応するStorybookストーリーが開きます
- デザインと実装の整合性を確認できます

## トラブルシューティング

### Chromaticへの公開が失敗する場合
- Project Tokenが正しいか確認
- Storybookが正常にビルドできるか確認（`npm run build-storybook`）
- Chromaticのドキュメントを確認: https://www.chromatic.com/docs/

### Figma Connectでリンクできない場合
- Chromaticアカウントでサインインしているか確認
- Storybookが公開されているか確認
- ストーリーURLが正しいか確認

## 参考リンク
- [Chromatic公式ドキュメント](https://www.chromatic.com/docs/)
- [Figma Storybook Connect](https://help.figma.com/hc/ja/articles/360045003494-Storybook%E3%81%A8Figma)
- [Chromatic Figma Plugin](https://www.chromatic.com/docs/figma-plugin/)

