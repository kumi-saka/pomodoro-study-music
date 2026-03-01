import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SettingsPage from './SettingsPage';
import '../../styles/common.css';
import '../../styles/settings.css';

export default {
  title: 'Pages/SettingsPage',
  component: SettingsPage,
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
        component: '設定ページ。作業時間、休憩時間、通知設定などを変更できます。',
      },
    },
  },
};

export const Default = {
  render: () => <SettingsPage />,
};

export const Mobile = {
  render: () => <SettingsPage />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

