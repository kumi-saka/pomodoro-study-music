import React, { useState } from 'react';
import '../../styles/common.css';
import '../../styles/timer.css';

export default {
  title: 'UI/TimerIndicator',
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
        component: 'ポモドーロタイマーの表示とプログレスバーを含むインジケーターコンポーネント。作業時間と休憩時間を表示します。',
      },
    },
  },
};

export const TimerDisplay = {
  render: () => (
    <div className="timer-section">
      <div className="timer-header">
        <div className="session-type-label">作業時間</div>
        <div className="timer-time">25:00</div>
      </div>
    </div>
  ),
};

export const TimerWithProgress = {
  render: () => {
    const [progress, setProgress] = useState(50);

    return (
      <div className="timer-section">
        <div className="timer-header">
          <div className="session-type-label">作業時間</div>
          <div className="timer-time">12:30</div>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  },
};

export const ProgressBarOnly = {
  render: () => {
    const [progress, setProgress] = useState(30);

    return (
      <div style={{ width: '300px' }}>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  },
};

export const BreakTime = {
  render: () => (
    <div className="timer-section">
      <div className="timer-header">
        <div className="session-type-label">休憩時間</div>
        <div className="timer-time">05:00</div>
      </div>
    </div>
  ),
};

export const TimerControls = {
  render: () => (
    <div className="timer-section">
      <div className="timer-header">
        <div className="session-type-label">作業時間</div>
        <div className="timer-time">25:00</div>
      </div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: '0%' }}></div>
      </div>
      <div className="btn-group timer-controls">
        <button className="btn btn-primary">開始</button>
        <button className="btn btn-danger">リセット</button>
      </div>
    </div>
  ),
};

export const TimerRunning = {
  render: () => {
    const [progress, setProgress] = useState(65);

    return (
      <div className="timer-section">
        <div className="timer-header">
          <div className="session-type-label">作業時間</div>
          <div className="timer-time">08:45</div>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="btn-group timer-controls">
          <button className="btn btn-secondary">一時停止</button>
          <button className="btn btn-danger">リセット</button>
        </div>
      </div>
    );
  },
};

export const TimerPaused = {
  render: () => {
    const [progress, setProgress] = useState(65);

    return (
      <div className="timer-section">
        <div className="timer-header">
          <div className="session-type-label">作業時間</div>
          <div className="timer-time">08:45</div>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="btn-group timer-controls">
          <button className="btn btn-secondary">再開</button>
          <button className="btn btn-danger">リセット</button>
        </div>
      </div>
    );
  },
};

