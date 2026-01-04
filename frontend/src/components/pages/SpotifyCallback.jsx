import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { exchangeCodeForToken, saveTokens } from '../../utils/spotifyAuth';

const SpotifyCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      // デバッグ: URL全体を確認
      console.log('現在のURL:', window.location.href);
      console.log('URLパラメータ:', window.location.search);

      // URLパラメータを直接取得（useSearchParamsが動作しない場合のフォールバック）
      const urlParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code') || urlParams.get('code');
      const errorParam = searchParams.get('error') || urlParams.get('error');
      const state = searchParams.get('state') || urlParams.get('state');

      console.log('取得したパラメータ:');
      console.log('- code:', code);
      console.log('- error:', errorParam);
      console.log('- state:', state);
      console.log('- searchParams:', Object.fromEntries(searchParams.entries()));
      console.log('- urlParams:', Object.fromEntries(urlParams.entries()));

      if (errorParam) {
        console.error('Spotify認証エラー:', errorParam);
        setError(`Spotify認証エラー: ${errorParam}`);
        setLoading(false);
        setTimeout(() => {
          navigate('/');
        }, 3000);
        return;
      }

      if (!code) {
        console.error('認証コードが取得できませんでした');
        console.log('URL全体:', window.location.href);
        console.log('ハッシュ:', window.location.hash);

        // モックモードの場合、ダミーコードを使用
        if (window.location.href.includes('mock_code')) {
          console.log('モックモードを検出しました');
          const mockCode = 'mock_code_12345';
          try {
            console.log('モックコードをトークンに交換中...');
            const tokenResponse = await exchangeCodeForToken(mockCode);
            console.log('トークン交換成功:', tokenResponse);
            saveTokens(tokenResponse);
            console.log('トークンを保存しました');
            setLoading(false);
            setTimeout(() => {
              navigate('/', { replace: true });
              window.location.reload();
            }, 500);
            return;
          } catch (err) {
            console.error('モックトークン交換エラー:', err);
            setError(`認証に失敗しました: ${err.message || 'エラーが発生しました'}`);
            setLoading(false);
            setTimeout(() => {
              navigate('/');
            }, 3000);
            return;
          }
        }

        setError('認証コードが取得できませんでした。URLを確認してください。');
        setLoading(false);
        setTimeout(() => {
          navigate('/');
        }, 5000);
        return;
      }

      try {
        console.log('認証コードをトークンに交換中...');
        const tokenResponse = await exchangeCodeForToken(code);
        console.log('トークン交換成功:', tokenResponse);
        saveTokens(tokenResponse);
        console.log('トークンを保存しました');
        setLoading(false);
        // 認証成功後、メイン画面にリダイレクト（少し遅延させて状態を確実に更新）
        setTimeout(() => {
          navigate('/', { replace: true });
          // ページをリロードして認証状態を確実に更新
          window.location.reload();
        }, 500);
      } catch (err) {
        console.error('トークン交換エラー:', err);
        setError(`認証に失敗しました: ${err.message || 'エラーが発生しました'}`);
        setLoading(false);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        color: '#ffffff'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>Spotify認証を処理中...</div>
        <div className="loading-spinner">
          <span></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        color: '#ff4444'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>{error}</div>
        <div style={{ fontSize: '16px', color: '#ffffff' }}>3秒後にメイン画面に戻ります...</div>
      </div>
    );
  }

  return null;
};

export default SpotifyCallback;

