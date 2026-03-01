import React from 'react';
import '../../styles/common.css';
import '../../styles/settings.css';

export default {
  title: 'UI/Card',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        fontFamily: 'var(--font-family-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'カードコンポーネント。設定画面などで使用されるコンテナコンポーネントです。',
      },
    },
  },
};

export const Default = {
  render: () => (
    <div className="card">
      <h2 className="section-title">タイマー設定</h2>
      <p style={{ color: '#ffffff', margin: 0 }}>
        カードコンポーネントのサンプルです。
      </p>
    </div>
  ),
};

export const SettingsCard = {
  render: () => (
    <div className="card">
      <div className="settings-section">
        <h2 className="section-title">タイマー設定</h2>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">作業時間</label>
            <input type="number" className="form-input" defaultValue={25} min="1" max="60" />
            <div className="form-hint">1分以上60分以下</div>
          </div>
          <div className="form-group">
            <label className="form-label">休憩時間</label>
            <input type="number" className="form-input" defaultValue={5} min="1" max="30" />
            <div className="form-hint">1分以上30分以下</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

