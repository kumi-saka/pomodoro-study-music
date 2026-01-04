// Spotify認証関連のユーティリティ関数

const SPOTIFY_ACCESS_TOKEN_KEY = 'spotify_access_token';
const SPOTIFY_REFRESH_TOKEN_KEY = 'spotify_refresh_token';
const SPOTIFY_TOKEN_EXPIRES_AT_KEY = 'spotify_token_expires_at';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Spotify認証URLを取得
 */
export const getSpotifyAuthUrl = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/spotify/auth-url`);
    const data = await response.json();
    return data.authUrl;
  } catch (error) {
    console.error('Spotify認証URLの取得に失敗しました:', error);
    throw error;
  }
};

/**
 * 認証コードをトークンに交換
 */
export const exchangeCodeForToken = async (code) => {
  try {
    console.log('トークン交換APIを呼び出し:', `${API_BASE_URL}/spotify/callback`);
    const response = await fetch(`${API_BASE_URL}/spotify/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    console.log('トークン交換APIレスポンス:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('トークン交換エラー:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: errorText };
      }
      throw new Error(errorData.message || 'トークン交換に失敗しました');
    }

    const data = await response.json();
    console.log('トークン交換成功:', data);
    return data;
  } catch (error) {
    console.error('トークン交換に失敗しました:', error);
    throw error;
  }
};

/**
 * トークンを保存
 */
export const saveTokens = (tokenResponse) => {
  const expiresAt = Date.now() + (tokenResponse.expiresIn * 1000);
  localStorage.setItem(SPOTIFY_ACCESS_TOKEN_KEY, tokenResponse.accessToken);
  localStorage.setItem(SPOTIFY_REFRESH_TOKEN_KEY, tokenResponse.refreshToken);
  localStorage.setItem(SPOTIFY_TOKEN_EXPIRES_AT_KEY, expiresAt.toString());
};

/**
 * アクセストークンを取得
 */
export const getAccessToken = () => {
  return localStorage.getItem(SPOTIFY_ACCESS_TOKEN_KEY);
};

/**
 * リフレッシュトークンを取得
 */
export const getRefreshToken = () => {
  return localStorage.getItem(SPOTIFY_REFRESH_TOKEN_KEY);
};

/**
 * トークンが有効かチェック
 */
export const isTokenValid = () => {
  const accessToken = getAccessToken();
  const expiresAt = localStorage.getItem(SPOTIFY_TOKEN_EXPIRES_AT_KEY);

  if (!accessToken || !expiresAt) {
    return false;
  }

  return Date.now() < parseInt(expiresAt);
};

/**
 * 認証済みかチェック
 */
export const isAuthenticated = () => {
  return isTokenValid();
};

/**
 * トークンをクリア
 */
export const clearTokens = () => {
  localStorage.removeItem(SPOTIFY_ACCESS_TOKEN_KEY);
  localStorage.removeItem(SPOTIFY_REFRESH_TOKEN_KEY);
  localStorage.removeItem(SPOTIFY_TOKEN_EXPIRES_AT_KEY);
};

/**
 * Spotify認証を開始
 */
export const startSpotifyAuth = async () => {
  try {
    const authUrl = await getSpotifyAuthUrl();
    window.location.href = authUrl;
  } catch (error) {
    console.error('Spotify認証の開始に失敗しました:', error);
    throw error;
  }
};

