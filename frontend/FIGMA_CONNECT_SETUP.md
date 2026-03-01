# Figma Connect セットアップガイド

このガイドでは、Chromaticに公開されたStorybookをFigma Connectプラグインでリンクする手順を説明します。

## Storybookの公開URL

**ベースURL:**
```
https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/
```

**Chromaticダッシュボード:**
```
https://www.chromatic.com/setup?appId=695f311e6b1f9784a5cc8058
```

## 各コンポーネントのストーリーURL

### Common Components

#### Header
- **Default**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/components-common-header--default`
- **Mobile**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/components-common-header--mobile`

### UI Components

#### Button
- **Primary**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--primary`
- **Secondary**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--secondary`
- **Danger**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--danger`
- **Success**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--success`
- **Disabled**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--disabled`
- **Small**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--small`
- **Large**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--large`
- **ButtonGroup**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--button-group`
- **SettingsButtons**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-button--settings-buttons`

#### Card
- **Default**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-card--default`
- **Settings**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-card--settings`

#### FormInput
- **NumberInput**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-forminput--number-input`
- **SelectInput**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-forminput--select-input`
- **FormRow**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-forminput--form-row`

#### PlayerControls
- **Default**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-playercontrols--default`

#### TimerIndicator
- **Timer**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-timerindicator--timer`
- **ProgressBar**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-timerindicator--progress-bar`
- **Running**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-timerindicator--running`
- **Paused**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-timerindicator--paused`
- **Break**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-timerindicator--break`

#### TrackList
- **Default**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-tracklist--default`
- **Scrollable**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/ui-tracklist--scrollable`

### Page Components

#### TimerPage
- **Default**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/pages-timerpage--default`

#### SettingsPage
- **Default**: `https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/?path=/story/pages-settingspage--default`

## Figma Connectプラグインのセットアップ手順

### ステップ1: Figmaでプラグインをインストール

1. FigmaデスクトップアプリまたはWebアプリを開く
2. 任意のファイルを開く（または新規作成）
3. メニューバーから **Plugins** → **Browse plugins in Community** を選択
4. 検索バーに「**Storybook Connect**」と入力
5. 「Storybook Connect」プラグインを見つけて **Install** をクリック

### ステップ2: プラグインを起動

1. Figmaで **Plugins** → **Development** → **Storybook Connect** を選択
   - または、**Plugins** → **Recently used** から選択
2. プラグインのウィンドウが開きます

### ステップ3: Chromaticアカウントでサインイン

1. プラグインウィンドウで **Sign in with Chromatic** をクリック
2. ブラウザが開き、Chromaticの認証ページが表示されます
3. Chromaticアカウントでサインイン
4. 認証が完了すると、Figmaに戻ります

### ステップ4: プロジェクトを選択

1. プラグインウィンドウでプロジェクト一覧が表示されます
2. **pomodoro-study-music** プロジェクトを選択
3. プロジェクトが接続されると、Storybookのコンポーネント一覧が表示されます

### ステップ5: FigmaコンポーネントとStorybookストーリーをリンク

#### 方法1: コンポーネントを選択してリンク

1. Figmaでリンクしたいコンポーネント（またはフレーム）を選択
2. プラグインウィンドウで **Link to Storybook** をクリック
3. ストーリーを選択するか、URLを直接入力：
   - ドロップダウンからストーリーを選択
   - または、上記のストーリーURL一覧からURLをコピー＆ペースト
4. **Link** ボタンをクリック

#### 方法2: URLを直接入力

1. Figmaでリンクしたいコンポーネントを選択
2. プラグインウィンドウで **Enter Storybook URL** をクリック
3. 対応するストーリーのURLを貼り付け（上記のURL一覧から選択）
4. **Link** ボタンをクリック

### ステップ6: リンクの確認

リンクが成功すると：
- Figmaのコンポーネントに **Storybookアイコン** が表示されます
- コンポーネントを選択すると、プラグインウィンドウにリンクされたストーリーが表示されます
- アイコンをクリックすると、対応するStorybookストーリーがブラウザで開きます

## ストーリーURLの取得方法（手動）

もし上記のURLが正しく動作しない場合：

1. Chromaticのダッシュボードにアクセス：
   ```
   https://www.chromatic.com/setup?appId=695f311e6b1f9784a5cc8058
   ```
2. 公開されたStorybookを開く
3. 左側のサイドバーからリンクしたいストーリーを選択
4. ブラウザのURLバーからURLをコピー
5. Figma Connectプラグインに貼り付け

## トラブルシューティング

### プラグインが見つからない場合
- Figmaのプラグイン検索で「Chromatic」や「Storybook」でも検索してみてください
- プラグイン名は「Storybook Connect」です

### サインインできない場合
- Chromaticアカウントが正しく作成されているか確認
- ブラウザのポップアップブロッカーを無効化
- 別のブラウザで試す

### プロジェクトが表示されない場合
- Chromaticでプロジェクトが正しく作成されているか確認
- Chromaticアカウントでサインインしているか確認
- プロジェクト名が「pomodoro-study-music」であることを確認

### リンクが機能しない場合
- StorybookのURLが正しいか確認（上記のURL一覧を参照）
- StorybookがChromaticで公開されているか確認
- コンポーネントが正しく選択されているか確認

### ストーリーが見つからない場合
- Storybookのサイドバーでストーリーの正確なパスを確認
- URLのパス形式: `?path=/story/[title]--[story-name]`
- タイトルとストーリー名は小文字で、スペースはハイフンに変換されます

## 参考リンク

- [Chromatic公式ドキュメント](https://www.chromatic.com/docs/)
- [Figma Storybook Connect ヘルプ](https://help.figma.com/hc/ja/articles/360045003494-Storybook%E3%81%A8Figma)
- [Chromatic Figma Plugin ドキュメント](https://www.chromatic.com/docs/figma-plugin/)

