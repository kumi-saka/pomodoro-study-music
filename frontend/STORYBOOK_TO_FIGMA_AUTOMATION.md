# StorybookからFigmaへの自動化アプローチ

残念ながら、StorybookからFigmaへの**完全自動エクスポート**機能は現時点では存在しません。しかし、以下の方法で効率化できます。

## 現状の課題

- StorybookはReactコンポーネント（JavaScript/JSX）
- Figmaはベクターグラフィックツール
- 完全な自動変換は技術的に困難

## 実用的な代替案

### 1. Figma Connectで参照（推奨）

**メリット:**
- 実装されたコンポーネントをFigma内で直接確認可能
- デザインと実装の整合性を確認しやすい
- 自動的に最新の実装を反映

**デメリット:**
- Figmaで編集はできない（参照のみ）

**使い方:**
- 既に設定済みのChromatic + Figma Connectを使用
- Figmaでコンポーネントを選択してStorybookを参照

### 2. デザイントークンの共有

**メリット:**
- 色、フォント、スペーシングなどを統一
- デザインと実装の一貫性を保つ

**実装方法:**
1. CSS変数やJSONでデザイントークンを定義
2. FigmaのVariables機能と連携
3. Storybookで同じトークンを使用

### 3. StorybookのDocsを活用

**メリット:**
- コンポーネントの仕様を自動生成
- デザイナーが実装を理解しやすい

**使い方:**
- StorybookのDocsタブで各コンポーネントの仕様を確認
- デザイナーが参照してFigmaで再現

### 4. スクリーンショット自動化スクリプト（カスタム）

Playwrightを使用してStorybookの各ストーリーを自動的にスクリーンショットし、Figmaにアップロードするスクリプトを作成できます。

**実装例:**
```javascript
// scripts/screenshot-storybook.js
import { chromium } from 'playwright';

const storybookUrl = 'https://695f311e6b1f9784a5cc8058-ugtkuledfj.chromatic.com/';
const stories = [
  'ui-button--primary',
  'ui-button--secondary',
  'components-common-header--default',
  // ... 他のストーリー
];

async function screenshotStories() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const story of stories) {
    const url = `${storybookUrl}?path=/story/${story}`;
    await page.goto(url);
    await page.screenshot({
      path: `screenshots/${story}.png`,
      fullPage: true
    });
  }

  await browser.close();
}

screenshotStories();
```

**使い方:**
1. スクリプトを実行してスクリーンショットを生成
2. Figmaで一括インポート

### 5. Figma APIを使用した自動化（上級者向け）

Figma APIを使用して、プログラム的にコンポーネントを作成できますが、Storybookから直接変換するのは困難です。

## 推奨ワークフロー

### 現在のプロジェクトでの推奨アプローチ

1. **Figma Connectで参照**
   - 実装済みコンポーネントをFigma内で確認
   - デザインと実装の整合性をチェック

2. **デザイントークンの共有**
   - CSS変数でデザイントークンを定義
   - Figma Variablesと連携

3. **Storybook Docsを参照**
   - デザイナーがStorybookのDocsを確認
   - 仕様に基づいてFigmaでデザイン

4. **必要に応じて手動で再現**
   - 重要なコンポーネントのみFigmaで再現
   - HTML to Designプラグインを使用

## 今後の展望

- **Figma Dev Mode**: 実装を確認しやすい（編集は不可）
- **Figma Variables**: デザイントークンの共有が容易に
- **Storybook Addons**: より良い連携機能が追加される可能性

## まとめ

完全自動化は現時点では難しいですが、**Figma Connect + デザイントークン共有 + Storybook Docs**の組み合わせで、効率的にデザインと実装を連携できます。

実際のところ、多くのチームは：
- Figmaでデザインを作成
- Storybookで実装を確認
- Figma Connectで整合性をチェック

というワークフローを採用しています。

