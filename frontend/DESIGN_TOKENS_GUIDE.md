# デザイントークン共有ガイド

このプロジェクトのデザイントークンをFigma Variablesと共有する方法を説明します。

## デザイントークンファイル

### CSS変数
- **ファイル**: `src/styles/design-tokens.css`
- **用途**: CSSで使用するデザイントークン
- **形式**: CSS Custom Properties (`--variable-name`)

### JSON形式
- **ファイル**: `src/styles/tokens.json`
- **用途**: Figma Variablesやその他のツールで使用
- **形式**: JSON

## Figma Variablesへのインポート方法

### 方法1: Figma Variablesに手動で設定

1. **FigmaでVariablesを作成**
   - Figmaで **Variables** パネルを開く
   - **+** ボタンで新しい変数セットを作成
   - セット名: `Design Tokens`

2. **色をインポート**
   - `tokens.json`の`colors`セクションを参照
   - 各色をFigma Variablesに追加：
     - `background.primary`: #121212
     - `background.secondary`: #2a2a2a
     - `text.primary`: #ffffff
     - `button.primary.bg`: #ffffff
     - など

3. **スペーシングをインポート**
   - `spacing`セクションを参照
   - Figma Variablesで数値型の変数を作成：
     - `spacing.xs`: 4
     - `spacing.sm`: 6
     - `spacing.md`: 12
     - など

4. **タイポグラフィをインポート**
   - `typography.fontSize`を参照
   - Figma Variablesで数値型の変数を作成：
     - `fontSize.xs`: 12
     - `fontSize.sm`: 14
     - `fontSize.base`: 16
     - など

### 方法2: Figmaプラグインを使用（推奨）

#### Tokens Studio for Figma プラグイン

1. **プラグインをインストール**
   - Figmaで **Plugins** → **Browse plugins**
   - 「**Tokens Studio for Figma**」を検索してインストール

2. **JSONファイルをインポート**
   - プラグインを起動
   - **Import tokens** を選択
   - `tokens.json`ファイルをアップロード
   - トークンが自動的にFigma Variablesに変換されます

#### その他のプラグイン
- **Figma Tokens**: JSON形式のトークンをインポート可能
- **Style Dictionary**: デザイントークンを複数の形式に変換

## CSS変数の使用方法

### 既存のCSSファイルで使用

```css
/* 例: common.css */
body {
  background: var(--color-background-primary);
  color: var(--color-text-primary);
  font-family: var(--font-family-primary);
}

.btn-primary {
  background: var(--color-button-primary-bg);
  color: var(--color-button-primary-text);
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-md);
}
```

### 段階的な移行

1. `design-tokens.css`をインポート
2. 既存のCSSファイルでハードコードされた値を段階的にCSS変数に置き換え

## トークンの更新フロー

### 1. トークンを更新
- `design-tokens.css`と`tokens.json`を更新

### 2. CSSを更新
- 既存のCSSファイルで変数を使用

### 3. Figma Variablesを更新
- FigmaでVariablesを手動で更新
- または、Tokens Studioプラグインで再インポート

## トークン一覧

### 色 (Colors)

#### 背景色
- `--color-background-primary`: #121212
- `--color-background-secondary`: #2a2a2a
- `--color-background-tertiary`: rgba(0, 0, 0, 0.3)
- `--color-background-overlay`: rgba(255, 255, 255, 0.1)

#### テキスト色
- `--color-text-primary`: #ffffff
- `--color-text-secondary`: rgba(255, 255, 255, 0.6)
- `--color-text-tertiary`: rgba(255, 255, 255, 0.5)
- `--color-text-inverse`: #000000

#### ボタン色
- `--color-button-primary-bg`: #ffffff
- `--color-button-primary-text`: #000000
- `--color-button-primary-hover`: #f0f0f0
- `--color-button-secondary-bg`: transparent
- `--color-button-secondary-text`: #ffffff
- `--color-button-secondary-border`: #404040
- `--color-button-secondary-hover`: rgba(255, 255, 255, 0.1)

### タイポグラフィ (Typography)

#### フォントファミリー
- `--font-family-primary`: システムフォント
- `--font-family-heading`: 'Inter', sans-serif
- `--font-family-logo`: 'Comfortaa', cursive

#### フォントサイズ
- `--font-size-xs`: 12px
- `--font-size-sm`: 14px
- `--font-size-base`: 16px
- `--font-size-lg`: 18px
- `--font-size-xl`: 28px
- `--font-size-2xl`: 42px
- `--font-size-3xl`: 55px
- `--font-size-4xl`: 60px
- `--font-size-5xl`: 80px

#### フォントウェイト
- `--font-weight-light`: 300
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700

### スペーシング (Spacing)
- `--spacing-xs`: 4px
- `--spacing-sm`: 6px
- `--spacing-md`: 12px
- `--spacing-lg`: 16px
- `--spacing-xl`: 20px
- `--spacing-2xl`: 24px
- `--spacing-3xl`: 30px
- `--spacing-4xl`: 35px

### ボーダー半径 (Border Radius)
- `--radius-sm`: 8px
- `--radius-md`: 10px
- `--radius-lg`: 12px
- `--radius-xl`: 50px
- `--radius-full`: 50px

## 参考リンク

- [Figma Variables ドキュメント](https://help.figma.com/hc/en-us/articles/15339657135383)
- [Tokens Studio for Figma](https://tokens.studio/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)

