import React from 'react';
import '../../styles/common.css';

const Button = ({
  variant = 'primary',
  label = 'Button',
  onClick,
  disabled = false,
  size = 'medium'
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const classes = `${baseClass} ${variantClass}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      style={{ fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px' }}
    >
      {label}
    </button>
  );
};

export default {
  title: 'UI/Button',
  component: Button,
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
        component: 'アプリケーションで使用されるボタンコンポーネント。Primary、Secondary、Danger、Successの4種類があります。',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success'],
      description: 'ボタンのバリアント（種類）',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    label: {
      control: 'text',
      description: 'ボタンに表示するテキスト',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'ボタンのサイズ',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'ボタンを無効化するかどうか',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'ボタンクリック時のハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
  args: {
    onClick: () => console.log('Button clicked'),
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    label: '開始',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    label: 'リセット',
  },
};

export const Danger = {
  args: {
    variant: 'danger',
    label: 'リセット',
  },
};

export const Success = {
  args: {
    variant: 'success',
    label: '保存',
  },
};

export const Disabled = {
  args: {
    variant: 'primary',
    label: '無効',
    disabled: true,
  },
};

export const Small = {
  args: {
    variant: 'primary',
    label: '小さいボタン',
    size: 'small',
  },
};

export const Large = {
  args: {
    variant: 'primary',
    label: '大きいボタン',
    size: 'large',
  },
};

export const ButtonGroup = {
  render: () => (
    <div className="btn-group">
      <button className="btn btn-primary">開始</button>
      <button className="btn btn-secondary">リセット</button>
    </div>
  ),
};

export const SettingsButtons = {
  render: () => (
    <div className="btn-group settings-page">
      <button className="btn btn-primary">保存</button>
      <button className="btn btn-secondary">キャンセル</button>
    </div>
  ),
};
