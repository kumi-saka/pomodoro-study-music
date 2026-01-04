// Spotify Web Playback SDK統合ユーティリティ

let player = null;
let deviceId = null;
let isPlayerReady = false;

// Spotify Web Playback SDKの初期化
export const initializeSpotifyPlayer = (accessToken, onReady, onNotReady, onPlayerStateChanged) => {
  return new Promise((resolve, reject) => {
    if (!window.Spotify) {
      reject(new Error('Spotify Web Playback SDKが読み込まれていません'));
      return;
    }

    player = new window.Spotify.Player({
      name: 'Pomodoro Study Music',
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
      volume: 0.5,
    });

    // デバイスが準備できたとき
    player.addListener('ready', ({ device_id }) => {
      console.log('Spotify Player Ready with Device ID', device_id);
      deviceId = device_id;
      isPlayerReady = true;
      if (onReady) onReady(device_id);
      resolve(device_id);
    });

    // デバイスが準備できなかったとき
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Spotify Player Not Ready', device_id);
      isPlayerReady = false;
      if (onNotReady) onNotReady(device_id);
    });

    // プレイヤーの状態が変更されたとき
    player.addListener('player_state_changed', (state) => {
      if (onPlayerStateChanged) {
        onPlayerStateChanged(state);
      }
    });

    // エラーが発生したとき
    player.addListener('authentication_error', ({ message }) => {
      console.error('Spotify Player Authentication Error:', message);
      reject(new Error(message));
    });

    player.addListener('account_error', ({ message }) => {
      console.error('Spotify Player Account Error:', message);
      reject(new Error(message));
    });

    player.addListener('playback_error', ({ message }) => {
      console.error('Spotify Player Playback Error:', message);
    });

    // プレイヤーに接続
    player.connect().then((success) => {
      if (success) {
        console.log('Spotify Player接続成功');
      } else {
        reject(new Error('Spotify Player接続に失敗しました'));
      }
    }).catch((error) => {
      reject(error);
    });
  });
};

// プレイリストを再生
export const playPlaylist = async (playlistId, accessToken) => {
  if (!isPlayerReady || !deviceId) {
    throw new Error('プレイヤーが準備できていません');
  }

  try {
    // プレイリストのトラックを取得
    const response = await fetch(`http://localhost:8080/api/spotify/playlists/${playlistId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('プレイリストのトラック取得に失敗しました');
    }

    const data = await response.json();
    const trackUris = data.tracks.map(track => track.uri);

    // Spotify APIで再生を開始
    const playResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: trackUris,
      }),
    });

    if (!playResponse.ok) {
      const errorText = await playResponse.text();
      console.error('再生エラー:', playResponse.status, errorText);
      throw new Error('再生に失敗しました');
    }

    console.log('プレイリスト再生開始');
  } catch (error) {
    console.error('プレイリスト再生エラー:', error);
    throw error;
  }
};

// 再生を開始
export const play = () => {
  if (player && isPlayerReady) {
    player.resume();
  }
};

// 一時停止
export const pause = () => {
  if (player && isPlayerReady) {
    player.pause();
  }
};

// 次の曲
export const nextTrack = () => {
  if (player && isPlayerReady) {
    player.nextTrack();
  }
};

// 前の曲
export const previousTrack = () => {
  if (player && isPlayerReady) {
    player.previousTrack();
  }
};

// 音量を設定（0-1の範囲）
export const setVolume = (volume) => {
  if (player && isPlayerReady) {
    player.setVolume(volume);
  }
};

// プレイヤーを切断
export const disconnectPlayer = () => {
  if (player) {
    player.disconnect();
    player = null;
    deviceId = null;
    isPlayerReady = false;
  }
};

// プレイヤーの状態を取得
export const getPlayerState = () => {
  if (player && isPlayerReady) {
    return player.getCurrentState();
  }
  return null;
};

// デバイスIDを取得
export const getDeviceId = () => {
  return deviceId;
};

// プレイヤーが準備できているか確認
export const isReady = () => {
  return isPlayerReady;
};

