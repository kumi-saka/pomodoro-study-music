# Storybookでタイポグラフィを登録する方法

Storybookのストーリーコンポーネントにタイポグラフィを登録する方法を説明します。

## 方法1: ストーリーファイルでdecoratorを使用

各ストーリーファイルでdecoratorを使用して、タイポグラフィを適用できます。

### 例: Button.stories.jsx

```javascript
export default {
  title: 'UI/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'var(--font-family-primary)' }}>
        <Story />
      </div>
    ),
  ],
  // ...
};
```

## 方法2: グローバルにタイポグラフィを設定

`.storybook/preview.js`でグローバルにタイポグラフィを設定できます。

### preview.jsの設定

```javascript
const preview = {
  decorators: [
    (Story) => (
      <div style={{
        fontFamily: 'var(--font-family-primary)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 1.5
      }}>
        <Story />
      </div>
    ),
  ],
};
```

## 方法3: 各ストーリーに個別にスタイルを適用

個別のストーリーにタイポグラフィを設定できます。

### 例

```javascript
export const Primary = {
  args: {
    variant: 'primary',
    label: '開始',
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};
```

## 方法4: CSS変数を使用

デザイントークンのCSS変数を使用して、タイポグラフィを統一できます。

### 例

```javascript
export default {
  title: 'UI/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div style={{
        fontFamily: 'var(--font-family-primary)',
        fontSize: 'var(--font-size-base)',
        fontWeight: 'var(--font-weight-normal)',
      }}>
        <Story />
      </div>
    ),
  ],
};
```

## 方法5: Storybookのタイポグラフィアドオン（オプション）

より高度なタイポグラフィ管理が必要な場合は、アドオンを使用できます。

### インストール

```bash
npm install --save-dev @storybook/addon-typography
```

### 設定

`.storybook/main.js`に追加：

```javascript
addons: [
  '@storybook/addon-typography',
  // ...
],
```

## 推奨アプローチ

現在のプロジェクトでは、**方法4（CSS変数を使用）**を推奨します：

1. デザイントークン（`design-tokens.css`）でタイポグラフィを定義済み
2. すべてのストーリーで一貫したタイポグラフィを使用可能
3. メンテナンスが容易

## 実装例

各ストーリーファイルで以下のように設定：

```javascript
export default {
  title: 'UI/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div style={{
        fontFamily: 'var(--font-family-primary, -apple-system, sans-serif)',
      }}>
        <Story />
      </div>
    ),
  ],
  // ...
};
```

これにより、すべてのストーリーで統一されたタイポグラフィが適用されます。

