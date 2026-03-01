import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import '../../styles/common.css';

export default {
  title: 'Components/Common/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{
          fontFamily: 'var(--font-family-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'アプリケーションのヘッダーコンポーネント。ロゴと設定アイコンを表示します。',
      },
    },
  },
};

export const Default = {
  render: () => <Header />,
};

export const Mobile = {
  render: () => <Header />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

