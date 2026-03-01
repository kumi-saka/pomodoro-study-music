import React from 'react';
import '../src/styles/design-tokens.css';
import '../src/styles/common.css';
import '../src/styles/timer.css';
import '../src/styles/settings.css';
import '../src/styles/modal.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
  globalTypes: {
    // グローバルタイプの設定（必要に応じて）
  },
  decorators: [
    (Story) => {
      // Storybookでフォントが確実に読み込まれるようにする
      return React.createElement(
        'div',
        { style: { fontFamily: 'var(--font-family-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)' } },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;