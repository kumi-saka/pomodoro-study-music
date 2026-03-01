# StorybookコンポーネントをFigmaに配置する方法

StorybookのコンポーネントをFigmaファイルに実際に配置する方法を説明します。

## 方法1: HTML to Designプラグインを使用（推奨）

StorybookのコンポーネントをHTMLとして取得し、Figmaの「HTML to Design」プラグインでインポートします。

### ステップ1: HTML to Designプラグインをインストール

1. Figmaを開く
2. **Plugins** → **Browse plugins in Community**
3. 「**HTML to Design**」を検索してインストール

### ステップ2: StorybookでコンポーネントのHTMLを取得

1. [Storybookを開く](https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/)
2. インポートしたいコンポーネントのストーリーを開く
3. ブラウザの開発者ツールを開く（F12 または Cmd+Option+I）
4. **Elements**タブで、コンポーネントのルート要素を選択
5. 右クリック → **Copy** → **Copy element** または **Copy outerHTML**

### ステップ3: CSSを取得

1. 開発者ツールの**Elements**タブで、コンポーネントのルート要素を選択
2. 右側の**Styles**パネルで、適用されているCSSを確認
3. 必要なCSSをコピー（または、**Computed**タブで計算されたスタイルを確認）

### ステップ4: Figmaにインポート

1. Figmaで**HTML to Design**プラグインを起動
2. コピーしたHTMLを貼り付け
3. CSSも必要に応じて追加
4. **Import**ボタンをクリック
5. Figmaのキャンバスにコンポーネントが配置されます

## 方法2: 画像としてエクスポートして配置

Storybookのコンポーネントを画像としてエクスポートし、Figmaに配置します。

### ステップ1: Storybookでコンポーネントを表示

1. [Storybookを開く](https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/)
2. エクスポートしたいコンポーネントのストーリーを開く

### ステップ2: スクリーンショットを撮る

1. ブラウザの開発者ツールを開く（F12）
2. **Device Toolbar**（Cmd+Shift+M）でデバイスサイズを設定
3. コンポーネント部分をスクリーンショット
   - Mac: Cmd+Shift+4 で範囲選択
   - Windows: Snipping Tool を使用

### ステップ3: Figmaに配置

1. Figmaで**Place Image**（Cmd+Shift+K）を選択
2. スクリーンショット画像を配置
3. 必要に応じてサイズを調整

## 方法3: StorybookのExport機能を使用（カスタム設定が必要）

Storybookにカスタムエクスポート機能を追加する方法もありますが、設定が複雑です。

## 推奨ワークフロー

### 各コンポーネントを個別にインポート

1. **Buttonコンポーネント**
   - Storybook URL: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--primary`
   - HTML to Designでインポート

2. **Headerコンポーネント**
   - Storybook URL: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/components-common-header--default`
   - HTML to Designでインポート

3. **その他のコンポーネント**
   - 同様の手順でインポート

## HTML to Designプラグインの詳細手順

### HTMLの取得方法（詳細）

1. Storybookでコンポーネントを表示
2. 開発者ツール（F12）を開く
3. **Elements**タブで、コンポーネントのルート要素を見つける
   - 例: `<button class="btn btn-primary">開始</button>`
4. 要素を右クリック → **Copy** → **Copy element**
5. 親要素も含める場合は、**Copy outerHTML**を選択

### CSSの取得方法

1. 開発者ツールの**Elements**タブで要素を選択
2. 右側の**Styles**パネルで、適用されているCSSを確認
3. 以下の方法でCSSを取得：
   - **Computed**タブで計算されたスタイルを確認
   - または、StorybookのソースコードからCSSファイルを参照
   - CSSファイル: `frontend/src/styles/common.css`, `frontend/src/styles/timer.css` など

### HTML to Designでの注意点

- 一部のCSSプロパティが正しく変換されない場合があります
- 複雑なレイアウトは手動で調整が必要な場合があります
- フォントはFigmaで利用可能なフォントに置き換えられる場合があります

## 各コンポーネントのStorybook URL

### Common Components
- **Header**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/components-common-header--default`

### UI Components
- **Button (Primary)**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--primary`
- **Button (Secondary)**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--secondary`
- **Card**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-card--default`
- **FormInput**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-forminput--number-input`

### Page Components
- **TimerPage**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/pages-timerpage--default`
- **SettingsPage**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/pages-settingspage--default`

## トラブルシューティング

### HTML to Designで正しく表示されない場合
- CSSが不足している可能性があります。CSSファイルを確認して追加してください
- 複雑なレイアウトは手動で調整が必要です
- フォントはFigmaで利用可能なフォントに置き換えてください

### 画像がぼやける場合
- スクリーンショットの解像度を上げる
- ブラウザのズームを100%に設定
- Retinaディスプレイの場合は、2倍の解像度でスクリーンショットを撮る

## 参考リンク

- [HTML to Design プラグイン](https://www.figma.com/community/plugin/1159123024924461424/html-to-design)
- [Storybook](https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/)

