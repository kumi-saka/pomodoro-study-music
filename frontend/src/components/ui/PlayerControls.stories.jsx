import React, { useState } from 'react';
import '../../styles/common.css';
import '../../styles/timer.css';

export default {
  title: 'UI/PlayerControls',
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
        component: '音楽プレイヤーのコントロールボタン。前の曲、再生/一時停止、次の曲のボタンを含みます。',
      },
    },
  },
};

export const Default = {
  render: () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
      <div className="player-controls">
        <button className="player-btn player-btn-prev" aria-label="前の曲">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6h2v12H6V6zm11 6l-8-6v12l8-6z" fill="currentColor"/>
          </svg>
        </button>
        <button
          className="player-btn player-btn-play"
          aria-label={isPlaying ? "一時停止" : "再生"}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
            </svg>
          )}
        </button>
        <button className="player-btn player-btn-next" aria-label="次の曲">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 18V6h-2v12h2zm-11 0l8-6-8-6v12z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    );
  },
};

