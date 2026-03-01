import React, { useState } from 'react';
import '../../styles/common.css';
import '../../styles/settings.css';

export default {
  title: 'UI/FormInput',
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
    layout: 'padded',
    docs: {
      description: {
        component: 'フォーム入力コンポーネント。数値入力、セレクトボックス、横並びフォームなどに対応しています。',
      },
    },
  },
};

export const NumberInput = {
  render: () => {
    const [value, setValue] = useState(25);

    return (
      <div className="form-group">
        <label className="form-label" htmlFor="workMinutes">作業時間</label>
        <input
          type="number"
          className="form-input"
          id="workMinutes"
          name="workMinutes"
          min="1"
          max="60"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
        />
        <div className="form-hint">1分以上60分以下</div>
      </div>
    );
  },
};

export const SelectInput = {
  render: () => {
    const [value, setValue] = useState('default');

    return (
      <div className="form-group">
        <label className="form-label" htmlFor="notificationSound">通知音</label>
        <select
          className="form-select"
          id="notificationSound"
          name="notificationSound"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="default">デフォルト</option>
          <option value="sound1">音1</option>
          <option value="sound2">音2</option>
          <option value="sound3">音3</option>
        </select>
      </div>
    );
  },
};

export const FormRow = {
  render: () => {
    const [workMinutes, setWorkMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);

    return (
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="workMinutes">作業時間</label>
          <input
            type="number"
            className="form-input"
            id="workMinutes"
            name="workMinutes"
            min="1"
            max="60"
            value={workMinutes}
            onChange={(e) => setWorkMinutes(parseInt(e.target.value))}
          />
          <div className="form-hint">1分以上60分以下</div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="breakMinutes">休憩時間</label>
          <input
            type="number"
            className="form-input"
            id="breakMinutes"
            name="breakMinutes"
            min="1"
            max="30"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(parseInt(e.target.value))}
          />
          <div className="form-hint">1分以上30分以下</div>
        </div>
      </div>
    );
  },
};

