import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TimerPage from './TimerPage';
import '../../styles/common.css';
import '../../styles/timer.css';
import '../../styles/modal.css';

export default {
  title: 'Pages/TimerPage',
  component: TimerPage,
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
        component: 'ポモドーロタイマーのメインページ。タイマー機能と音楽プレイヤーを統合したページです。',
      },
    },
  },
};

export const Default = {
  render: () => <TimerPage />,
};

export const Mobile = {
  render: () => <TimerPage />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

