import React from 'react';
import '../../styles/design-tokens.css';
import '../../styles/common.css';

export default {
  title: 'Design/Typography',
  tags: ['autodocs'],
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <div style={{
        fontFamily: 'var(--font-family-primary)',
        padding: '40px',
        background: '#121212',
        color: '#ffffff',
        minHeight: '100vh',
      }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'アプリケーションで使用されるタイポグラフィシステム。フォントファミリー、サイズ、ウェイトが定義されています。',
      },
    },
  },
};

export const FontFamilies = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Font Families</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
            --font-family-primary
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', marginBottom: '10px', fontWeight: 'bold', padding: '8px 12px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', fontWeight: 'normal' }}>フォント名:</span> -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
          </div>
          <div style={{ fontFamily: 'var(--font-family-primary)', fontSize: '18px' }}>
            The quick brown fox jumps over the lazy dog
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> body, ボタン (.btn), フォーム (.form-input, .form-select), 音楽タイトル (.music-title), 音楽アーティスト (.music-artist), 次の曲リスト (.next-track-title, .next-track-artist), セクションタイトル (.section-title)
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
            --font-family-heading
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', marginBottom: '10px', fontWeight: 'bold', padding: '8px 12px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', fontWeight: 'normal' }}>フォント名:</span> Inter, sans-serif
          </div>
          <div style={{ fontFamily: 'var(--font-family-heading)', fontSize: '18px' }}>
            The quick brown fox jumps over the lazy dog
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> タイマー表示 (.timer-time) - デスクトップ80px、モバイル42px/55px/60px
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
            --font-family-logo
          </div>
          <div style={{ fontSize: '14px', color: '#ffffff', marginBottom: '10px', fontWeight: 'bold', padding: '8px 12px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', fontWeight: 'normal' }}>フォント名:</span> Comfortaa, cursive
          </div>
          <div style={{ fontFamily: 'var(--font-family-logo)', fontSize: '18px' }}>
            The quick brown fox jumps over the lazy dog
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> ヘッダーロゴ (.logo) - 18px
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FontSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Font Sizes</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <div style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-primary)' }}>
            Extra Small (12px) - --font-size-xs
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> フォームヒント (.form-hint), 小さい補助テキスト
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family-primary)' }}>
            Small (14px) - --font-size-sm
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> セッションタイプラベル (.session-type-label), フォームラベル (.form-label), プログレステキスト (.progress-text), 次の曲リスト (.next-track-title, .next-track-artist)
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-base)', fontFamily: 'var(--font-family-primary)' }}>
            Base (16px) - --font-size-base
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> ボタン (.btn), フォーム入力 (.form-input, .form-select), ボディテキスト, プレイリスト選択ボタン (.playlist-select-btn)
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-lg)', fontFamily: 'var(--font-family-primary)' }}>
            Large (18px) - --font-size-lg
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> ヘッダーロゴ (.logo), 音楽タイトル (.music-title), 音楽アーティスト (.music-artist)
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-xl)', fontFamily: 'var(--font-family-primary)' }}>
            Extra Large (28px) - --font-size-xl
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> セクションタイトル (.section-title) - 設定ページなど
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-2xl)', fontFamily: 'var(--font-family-heading)' }}>
            XX Large (42px) - --font-size-2xl
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> タイマー表示 (.timer-time) - iPhone SEなどの小さい画面
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontFamily: 'var(--font-family-heading)' }}>
            XXX Large (55px) - --font-size-3xl
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> タイマー表示 (.timer-time) - 小さいモバイル画面 (max-width: 400px)
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-4xl)', fontFamily: 'var(--font-family-heading)' }}>
            XXXX Large (60px) - --font-size-4xl
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> タイマー表示 (.timer-time) - モバイル画面 (max-width: 768px)
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-5xl)', fontFamily: 'var(--font-family-heading)' }}>
            XXXXX Large (80px) - --font-size-5xl
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> タイマー表示 (.timer-time) - デスクトップ画面
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FontWeights = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Font Weights</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'var(--font-weight-light)', fontFamily: 'var(--font-family-heading)' }}>
            Light (300) - --font-weight-light
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> タイマー表示 (.timer-time)
          </div>
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'var(--font-weight-normal)', fontFamily: 'var(--font-family-heading)' }}>
            Normal (400) - --font-weight-normal
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> ボディテキスト、フォーム入力、通常のテキスト
          </div>
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'var(--font-weight-medium)', fontFamily: 'var(--font-family-heading)' }}>
            Medium (500) - --font-weight-medium
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> ナビゲーションリンク (.nav-link), 一部のラベル
          </div>
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'var(--font-weight-semibold)', fontFamily: 'var(--font-family-heading)' }}>
            Semibold (600) - --font-weight-semibold
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> ボタン (.btn), プログレステキスト (.progress-text), フォームラベル (.form-label)
          </div>
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'var(--font-weight-bold)', fontFamily: 'var(--font-family-heading)' }}>
            Bold (700) - --font-weight-bold
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> セクションタイトル (.section-title), プライマリボタン (.btn-primary), ロゴ (.logo), セッションタイプラベル (.session-type-label)
          </div>
        </div>
      </div>
    </div>
  ),
};

export const TypographyScale = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Typography Scale</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <div style={{
            fontSize: 'var(--font-size-5xl)',
            fontFamily: 'var(--font-family-heading)',
            fontWeight: 'var(--font-weight-light)',
            marginBottom: '10px',
          }}>
            Timer Display
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> .timer-time (デスクトップ)<br />
            --font-size-5xl (80px) + --font-family-heading + --font-weight-light
          </div>
        </div>

        <div>
          <div style={{
            fontSize: 'var(--font-size-xl)',
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: '10px',
          }}>
            Section Title
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> .section-title (設定ページなど)<br />
            --font-size-xl (28px) + --font-family-primary + --font-weight-bold
          </div>
        </div>

        <div>
          <div style={{
            fontSize: 'var(--font-size-lg)',
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: '10px',
          }}>
            Music Title
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> .music-title<br />
            --font-size-lg (18px) + --font-family-primary + --font-weight-bold
          </div>
        </div>

        <div>
          <div style={{
            fontSize: 'var(--font-size-base)',
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: '10px',
          }}>
            Button Text
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> .btn<br />
            --font-size-base (16px) + --font-family-primary + --font-weight-semibold
          </div>
        </div>

        <div>
          <div style={{
            fontSize: 'var(--font-size-base)',
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 'var(--font-weight-normal)',
            marginBottom: '10px',
          }}>
            Body Text
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> 通常のテキスト、フォーム入力<br />
            --font-size-base (16px) + --font-family-primary + --font-weight-normal
          </div>
        </div>

        <div>
          <div style={{
            fontSize: 'var(--font-size-sm)',
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: '10px',
          }}>
            Session Type Label
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> .session-type-label (作業時間/休憩時間)<br />
            --font-size-sm (14px) + --font-family-primary + --font-weight-bold
          </div>
        </div>

        <div>
          <div style={{
            fontSize: 'var(--font-size-lg)',
            fontFamily: 'var(--font-family-logo)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: '10px',
          }}>
            Logo Text
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <strong>使用箇所:</strong> .logo (ヘッダー)<br />
            --font-size-lg (18px) + --font-family-logo + --font-weight-bold
          </div>
        </div>
      </div>
    </div>
  ),
};

