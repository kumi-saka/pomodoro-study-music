import React from 'react';
import '../../styles/common.css';
import '../../styles/timer.css';

const dummyTracks = [
  {
    title: 'Lofi Hip Hop - Beats to Study To',
    artist: 'ChilledCow',
    image: 'https://picsum.photos/800/400?random=1'
  },
  {
    title: 'Focus Music - Deep Concentration',
    artist: 'Brain.fm',
    image: 'https://picsum.photos/800/400?random=2'
  },
  {
    title: 'Peaceful Piano - Calm & Relaxing',
    artist: 'Spotify',
    image: 'https://picsum.photos/800/400?random=3'
  },
  {
    title: 'Jazz for Work - Productive Vibes',
    artist: 'Coffee Shop Jazz',
    image: 'https://picsum.photos/800/400?random=4'
  },
  {
    title: 'Nature Sounds - Forest Ambience',
    artist: 'Nature Sounds',
    image: 'https://picsum.photos/800/400?random=5'
  },
];

export default {
  title: 'UI/TrackList',
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
        component: '次の曲リストを表示するコンポーネント。スクロール可能で、各トラックのサムネイル、タイトル、アーティスト名を表示します。',
      },
    },
  },
};

export const Default = {
  render: () => (
    <div className="next-tracks-list">
      {dummyTracks.map((track, index) => (
        <div key={index} className="next-track-item">
          <div className="next-track-thumbnail">
            <img src={track.image} alt={track.title} />
          </div>
          <div className="next-track-info">
            <div className="next-track-title">{track.title}</div>
            <div className="next-track-artist">{track.artist}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Scrollable = {
  render: () => (
    <div style={{ height: '300px', width: '500px' }}>
      <div className="next-tracks-list" style={{ maxHeight: '300px' }}>
        {[...dummyTracks, ...dummyTracks, ...dummyTracks].map((track, index) => (
          <div key={index} className="next-track-item">
            <div className="next-track-thumbnail">
              <img src={track.image} alt={track.title} />
            </div>
            <div className="next-track-info">
              <div className="next-track-title">{track.title}</div>
              <div className="next-track-artist">{track.artist}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

