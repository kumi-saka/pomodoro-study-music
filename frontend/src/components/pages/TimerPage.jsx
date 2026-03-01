import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../styles/timer.css';
import '../../styles/modal.css';
import { isAuthenticated, startSpotifyAuth, getAccessToken } from '../../utils/spotifyAuth';
import {
  initializeSpotifyPlayer,
  playPlaylist,
  play,
  pause,
  disconnectPlayer,
  isReady as isPlayerReady
} from '../../utils/spotifyPlayer';

const API_BASE_URL = 'http://localhost:8080/api';

// ダミートラックデータ
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
  {
    title: 'Ambient Study - Background Focus',
    artist: 'Study Music Lab',
    image: 'https://picsum.photos/800/400?random=6'
  },
  {
    title: 'Classical for Studying - Mozart',
    artist: 'Classical Collection',
    image: 'https://picsum.photos/800/400?random=7'
  },
  {
    title: 'Rain Sounds - Cozy Study',
    artist: 'Rainy Day Music',
    image: 'https://picsum.photos/800/400?random=8'
  },
  {
    title: 'Electronic Focus - Deep Work',
    artist: 'Electronic Vibes',
    image: 'https://picsum.photos/800/400?random=9'
  },
  {
    title: 'Acoustic Guitar - Study Session',
    artist: 'Acoustic Dreams',
    image: 'https://picsum.photos/800/400?random=10'
  }
];

const TimerPage = () => {
  const [timerTime, setTimerTime] = useState(25 * 60); // 25分を秒で表現
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5); // 休憩時間
  const [progress, setProgress] = useState(0);
  const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(() => isAuthenticated());
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sessionType, setSessionType] = useState('WORK'); // 'WORK' or 'BREAK'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null); // Spotify再生中の曲情報
  const [displayTrack, setDisplayTrack] = useState({
    title: 'Lofi Hip Hop - Beats to Study To',
    artist: 'ChilledCow',
    image: 'https://picsum.photos/800/400?random=1'
  }); // 表示用のトラック（ダミーまたはSpotify）
  // 初期状態でダミートラックを設定
  const initialTracks = dummyTracks.map((track, index) => ({
    id: `dummy_track_${index}`,
    ...track
  }));
  const [tracks, setTracks] = useState(initialTracks); // プレイリストのトラックリスト（初期値はダミートラック）
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // 現在のトラックインデックス
  const [playerInitialized, setPlayerInitialized] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [smallImageLoaded, setSmallImageLoaded] = useState(false);
  const heroImageRef = useRef(null);
  const gradientAnimationRef = useRef(null);
  const gradientAngleRef = useRef(0);
  const colorPositionRef = useRef(0);
  const timerCompleteHandledRef = useRef(false);
  const [deviceId] = useState(() => {
    // LocalStorageからデバイスIDを取得、なければ生成
    let id = localStorage.getItem('deviceId');
    if (!id) {
      id = 'device-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('deviceId', id);
    }
    return id;
  });

  // 認証状態を確認（ページ読み込み時とコールバック後の更新用）
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      console.log('認証状態をチェック:', authStatus);
      setIsSpotifyAuthenticated(authStatus);
    };
    checkAuth();
    // ストレージ変更を監視（別タブでの認証完了を検知）
    window.addEventListener('storage', checkAuth);
    // 定期的に認証状態をチェック（コールバック後の更新用）
    const interval = setInterval(checkAuth, 1000);
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  // 設定を取得
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/settings/${deviceId}`);
        const data = await response.json();
        setWorkMinutes(data.workMinutes || 25);
        setBreakMinutes(data.breakMinutes || 5);
        setTimerTime((data.workMinutes || 25) * 60);
      } catch (error) {
        console.error('設定の取得に失敗しました:', error);
      }
    };
    fetchSettings();
  }, [deviceId]);

  // Spotify Playerの初期化（モックモードではスキップ）
  useEffect(() => {
    const initPlayer = async () => {
      if (!isSpotifyAuthenticated || playerInitialized) return;

      const accessToken = getAccessToken();
      if (!accessToken) return;

      // モックトークンの場合は初期化をスキップ
      if (accessToken.startsWith('mock_')) {
        console.log('モックモード: Spotify Playerの初期化をスキップします');
        return;
      }

      // Spotify Web Playback SDKが読み込まれていない場合はスキップ
      if (!window.Spotify) {
        console.log('Spotify Web Playback SDKが読み込まれていません（モックモードの可能性）');
        return;
      }

      try {
        await initializeSpotifyPlayer(
          accessToken,
          (deviceId) => {
            console.log('Spotify Player初期化成功:', deviceId);
            setPlayerInitialized(true);
          },
          (deviceId) => {
            console.log('Spotify Player準備未完了:', deviceId);
          },
          (state) => {
            if (state) {
              setIsPlaying(!state.paused);
              if (state.track_window?.current_track) {
                const track = state.track_window.current_track;
                setCurrentTrack({
                  title: track.name,
                  artist: track.artists.map(a => a.name).join(', '),
                  image: track.album.images[0]?.url || displayTrack.image
                });
              }
            }
          }
        );
      } catch (error) {
        console.warn('Spotify Player初期化エラー（モックモードの可能性）:', error.message);
        // モックモードの場合はエラーを無視
      }
    };

    initPlayer();

    return () => {
      disconnectPlayer();
    };
  }, [isSpotifyAuthenticated, playerInitialized, displayTrack]);

  // ダミートラックをランダムに更新（5秒ごと、Spotify再生中でない場合のみ）
  useEffect(() => {
    if (currentTrack) return; // Spotify再生中はダミートラックを更新しない

    const updateDummyTrack = () => {
      const randomTrack = dummyTracks[Math.floor(Math.random() * dummyTracks.length)];
      // 画像読み込み状態をリセット
      setImageLoaded(false);
      setSmallImageLoaded(false);
      setDisplayTrack(randomTrack);
    };

    // 初回表示
    updateDummyTrack();

    // 5秒ごとに更新
    const interval = setInterval(updateDummyTrack, 5000);
    return () => {
      clearInterval(interval);
      // クリーンアップ時にアニメーションを停止
      if (gradientAnimationRef.current) {
        cancelAnimationFrame(gradientAnimationRef.current);
      }
    };
  }, [currentTrack]);

  // 画像から主要な色を抽出してグラデーションを生成
  const extractColorFromImage = (img, callback) => {
    if (!img) {
      callback('rgb(40, 40, 40)');
      return;
    }

    // 画像が読み込まれているか確認
    if (!img.complete || img.naturalWidth === 0) {
      // 読み込み待ち
      img.addEventListener('load', () => {
        extractColorFromImage(img, callback);
      }, { once: true });
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = img.naturalWidth || img.width || 120;
    const height = img.naturalHeight || img.height || 120;
    canvas.width = width;
    canvas.height = height;

    try {
      ctx.drawImage(img, 0, 0, width, height);

      // 画像全体から色を抽出（サンプリング）
      const sampleSize = 10; // パフォーマンスのためサンプリング
      let r = 0, g = 0, b = 0;
      let count = 0;

      for (let y = 0; y < height; y += sampleSize) {
        for (let x = 0; x < width; x += sampleSize) {
          const imageData = ctx.getImageData(x, y, 1, 1);
          r += imageData.data[0];
          g += imageData.data[1];
          b += imageData.data[2];
          count++;
        }
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      // 暗くしてダークテーマに合わせる（少し明るめに調整）
      r = Math.max(20, Math.floor(r * 0.4));
      g = Math.max(20, Math.floor(g * 0.4));
      b = Math.max(20, Math.floor(b * 0.4));

      callback(`rgb(${r}, ${g}, ${b})`);
    } catch (e) {
      // CORSエラーなどの場合、デフォルト色を使用
      console.error('色の抽出に失敗しました:', e);
      callback('rgb(40, 40, 40)');
    }
  };

  // グラデーション背景を適用
  const applyGradientBackground = (color) => {
    // 既存のアニメーションを停止
    if (gradientAnimationRef.current) {
      cancelAnimationFrame(gradientAnimationRef.current);
    }

    // グラデーションの角度と色の位置をアニメーション
    const animateGradient = () => {
      gradientAngleRef.current += 0.15; // 角度を変化
      gradientAngleRef.current = gradientAngleRef.current % 360; // 360度でループ

      colorPositionRef.current += 0.08; // 色の位置も変化
      colorPositionRef.current = colorPositionRef.current % 100; // 100%でループ

      // 色の位置を動的に変化させてより自然なアニメーションに
      const colorStop1 = Math.max(0, colorPositionRef.current - 10);
      const colorStop2 = Math.min(100, colorPositionRef.current + 50);

      // ページ全体の背景にグラデーションを適用
      document.body.style.background = `linear-gradient(${gradientAngleRef.current}deg, ${color} ${colorStop1}%, #121212 ${colorStop2}%, #0a0a0a 100%)`;
      document.body.style.backgroundSize = '200% 200%';

      gradientAnimationRef.current = requestAnimationFrame(animateGradient);
    };

    animateGradient();
  };

  // 画像の色を抽出してグラデーションを適用
  const updateGradientFromImage = () => {
    const img = heroImageRef.current;
    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        // 既に読み込まれている場合
        extractColorFromImage(img, applyGradientBackground);
      } else {
        // 読み込み待ち
        img.addEventListener('load', () => {
          extractColorFromImage(img, applyGradientBackground);
        }, { once: true });
      }
    }
  };

  // 画像の読み込み完了を処理
  const handleImageLoad = () => {
    setImageLoaded(true);
    // グラデーションを更新（Spotify再生中でない場合のみ）
    if (!currentTrack) {
      updateGradientFromImage();
    }
  };

  const handleSmallImageLoad = () => {
    setSmallImageLoaded(true);
  };

  const handleTimerComplete = useCallback(async () => {
    // 既に処理済みの場合は何もしない
    if (timerCompleteHandledRef.current) {
      return;
    }

    // フラグを立てて重複実行を防ぐ
    timerCompleteHandledRef.current = true;

    // 音楽を停止
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    }

    // セッション終了APIを呼び出す
    if (currentSessionId) {
      try {
        const response = await fetch(`${API_BASE_URL}/sessions/${currentSessionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            deviceId: deviceId,
            sessionType: sessionType,
            durationMinutes: sessionType === 'WORK' ? workMinutes : breakMinutes,
            spotifyPlaylistId: selectedPlaylist?.id || null,
            spotifyPlaylistName: selectedPlaylist?.name || null,
          }),
        });

        if (response.ok) {
          const sessionData = await response.json();
          console.log('セッション完了:', sessionData);
          // セッションタイプを切り替え（作業→休憩、休憩→作業）
          const newSessionType = sessionType === 'WORK' ? 'BREAK' : 'WORK';
          setSessionType(newSessionType);

          // タイマー時間を新しいセッションタイプに合わせて設定
          if (newSessionType === 'BREAK') {
            setTimerTime(breakMinutes * 60);
            setProgress(0);
            // 休憩時間のタイマーを自動開始
            setIsRunning(true);
            setIsPaused(false);
          } else {
            setTimerTime(workMinutes * 60);
            setProgress(0);
          }

          setCurrentSessionId(null);
        } else {
          console.error('セッション完了に失敗しました:', response.status);
        }
      } catch (error) {
        console.error('セッション完了エラー:', error);
      }
    }

    // 通知を表示
    alert('タイマーが終了しました！');

    // 次のタイマー開始時にフラグをリセット
    setTimeout(() => {
      timerCompleteHandledRef.current = false;
    }, 100);
  }, [currentSessionId, deviceId, sessionType, workMinutes, breakMinutes, selectedPlaylist, isPlaying]);

  // タイマーのカウントダウン
  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prev) => {
          const newTime = prev - 1;
          const totalSeconds = sessionType === 'WORK' ? workMinutes * 60 : breakMinutes * 60;
          setProgress(((totalSeconds - newTime) / totalSeconds) * 100);
          if (newTime === 0) {
            setIsRunning(false);
            // タイマー終了時の処理
            handleTimerComplete();
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, timerTime, workMinutes, breakMinutes, sessionType, handleTimerComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = async () => {
    // タイマー完了フラグをリセット
    timerCompleteHandledRef.current = false;

    try {
      // セッション開始APIを呼び出す
      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceId: deviceId,
          sessionType: sessionType,
          durationMinutes: workMinutes,
          spotifyPlaylistId: selectedPlaylist?.id || null,
          spotifyPlaylistName: selectedPlaylist?.name || null,
        }),
      });

      if (response.ok) {
        const sessionData = await response.json();
        setCurrentSessionId(sessionData.id);
        console.log('セッション開始:', sessionData);

        // 作業セッションでプレイリストが選択されている場合、音楽を再生
        if (sessionType === 'WORK' && selectedPlaylist && isSpotifyAuthenticated) {
          const accessToken = getAccessToken();
          // モックモードの場合は音楽再生をスキップ（タイマーは継続）
          if (accessToken && accessToken.startsWith('mock_')) {
            console.log('モックモード: 音楽再生をスキップします（タイマーは継続）');
          } else if (isPlayerReady()) {
            try {
              await playPlaylist(selectedPlaylist.id, accessToken);
              setIsPlaying(true);
            } catch (error) {
              console.warn('音楽再生エラー（モックモードの可能性）:', error.message);
              // エラーを無視してタイマーは継続
            }
          }
        }
      } else {
        console.error('セッション開始に失敗しました:', response.status);
      }
    } catch (error) {
      console.error('セッション開始エラー:', error);
    }

    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    setIsRunning(false);
    // 音楽も一時停止
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    }
  };

  const handleResume = () => {
    setIsPaused(false);
    setIsRunning(true);
    // 音楽も再開
    if (sessionType === 'WORK' && selectedPlaylist && isPlayerReady()) {
      play();
      setIsPlaying(true);
    }
  };

  const handleReset = async () => {
    // タイマー完了フラグをリセット
    timerCompleteHandledRef.current = false;

    // セッションが開始されている場合は終了処理
    if (currentSessionId) {
      try {
        const response = await fetch(`${API_BASE_URL}/sessions/${currentSessionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            deviceId: deviceId,
            sessionType: sessionType,
            durationMinutes: workMinutes,
            spotifyPlaylistId: selectedPlaylist?.id || null,
            spotifyPlaylistName: selectedPlaylist?.name || null,
          }),
        });

        if (response.ok) {
          console.log('セッションをリセットしました');
        } else {
          console.error('セッションリセットに失敗しました:', response.status);
        }
      } catch (error) {
        console.error('セッションリセットエラー:', error);
      }
      setCurrentSessionId(null);
    }

    setIsRunning(false);
    setIsPaused(false);
    setTimerTime(workMinutes * 60);
    setProgress(0);
  };

  const handleSpotifyLogin = async () => {
    try {
      await startSpotifyAuth();
    } catch (error) {
      console.error('Spotify認証の開始に失敗しました:', error);
      alert('Spotify認証の開始に失敗しました');
    }
  };

  const handlePlaylistSelect = async () => {
    console.log('プレイリスト選択ボタンがクリックされました');
    console.log('認証状態:', isSpotifyAuthenticated);

    if (!isSpotifyAuthenticated) {
      console.log('認証されていないため、ログインモーダルを表示');
      setShowSpotifyModal(true);
      return;
    }

    try {
      const accessToken = getAccessToken();
      console.log('アクセストークンを取得:', accessToken ? 'あり' : 'なし');

      if (!accessToken) {
        alert('アクセストークンが見つかりません。再度ログインしてください。');
        setIsSpotifyAuthenticated(false);
        setShowSpotifyModal(true);
        return;
      }

      console.log('プレイリスト取得APIを呼び出し:', `${API_BASE_URL}/spotify/playlists`);
      const response = await fetch(`${API_BASE_URL}/spotify/playlists`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log('APIレスポンス:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('プレイリスト取得成功:', data);
        console.log('プレイリスト数:', data.playlists?.length || 0);
        setPlaylists(data.playlists || []);
        setShowPlaylistModal(true);
      } else {
        const errorText = await response.text();
        console.error('プレイリスト取得エラー:', response.status, errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }

        if (response.status === 401) {
          // トークンが無効な場合、再認証を促す
          console.log('認証エラー: トークンが無効');
          setIsSpotifyAuthenticated(false);
          setShowSpotifyModal(true);
          alert('認証が期限切れです。再度ログインしてください。');
        } else {
          alert(`プレイリストの取得に失敗しました: ${errorData.message || 'エラーが発生しました'}`);
        }
      }
    } catch (error) {
      console.error('プレイリストの取得に失敗しました:', error);
      alert(`プレイリストの取得に失敗しました: ${error.message}`);
    }
  };

  // プレイリストのトラックリストを取得
  const fetchPlaylistTracks = useCallback(async (playlistId) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        console.error('アクセストークンが見つかりません');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/spotify/playlists/${playlistId}/tracks`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('トラックリスト取得成功:', data);

        // トラックデータを整形
        const formattedTracks = (data.tracks || []).map(track => ({
          id: track.id,
          title: track.name,
          artist: track.artist,
          image: track.imageUrl || 'https://picsum.photos/300/300?random=' + Math.floor(Math.random() * 100),
        }));

        setTracks(formattedTracks);
        setCurrentTrackIndex(0);

        // 最初のトラックを表示用に設定
        if (formattedTracks.length > 0) {
          setDisplayTrack(formattedTracks[0]);
        }
      } else {
        console.error('トラックリスト取得エラー:', response.status);
        // モックモードの場合はダミートラックを使用
        if (accessToken.startsWith('mock_')) {
          const mockTracks = dummyTracks.map((track, index) => ({
            id: `mock_track_${index}`,
            ...track
          }));
          setTracks(mockTracks);
          setCurrentTrackIndex(0);
          setDisplayTrack(mockTracks[0]);
        }
      }
    } catch (error) {
      console.error('トラックリストの取得に失敗しました:', error);
      // エラー時はダミートラックを使用
      const mockTracks = dummyTracks.map((track, index) => ({
        id: `mock_track_${index}`,
        ...track
      }));
      setTracks(mockTracks);
      setCurrentTrackIndex(0);
      setDisplayTrack(mockTracks[0]);
    }
  }, []);

  // プレイリストが選択されたときにトラックリストを取得
  useEffect(() => {
    if (selectedPlaylist && selectedPlaylist.id) {
      fetchPlaylistTracks(selectedPlaylist.id);
    }
  }, [selectedPlaylist, fetchPlaylistTracks]);


  return (
    <div className="container timer-page">
      <main>
        <div className="card music-info-card">
          <div className="music-hero">
            <div className={`image-loading ${imageLoaded ? 'hidden' : ''}`}>
              <div className="loading-spinner">
                <span></span>
              </div>
            </div>
            <img
              ref={heroImageRef}
              src={(currentTrack || displayTrack).image}
              alt="Album Artwork"
              className={`music-hero-image ${imageLoaded ? 'loaded' : ''}`}
              crossOrigin="anonymous"
              onLoad={handleImageLoad}
              onError={() => {
                console.error('画像の読み込みに失敗しました:', (currentTrack || displayTrack).image);
                setImageLoaded(true); // エラー時も表示を試みる
                // エラー時はデフォルトのグラデーションを適用
                applyGradientBackground('rgb(40, 40, 40)');
              }}
            />
            <div className="music-hero-overlay">
              <div className="timer-section">
                <div className="timer-header">
                  <div className="session-type-label">{sessionType === 'WORK' ? '作業時間' : '休憩時間'}</div>
                  <div className="timer-time">{formatTime(timerTime)}</div>
                </div>

                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="btn-group timer-controls">
                  {!isRunning && !isPaused && (
                    <button className="btn btn-primary" onClick={handleStart}>開始</button>
                  )}
                  {isRunning && !isPaused && (
                    <button className="btn btn-secondary" onClick={handlePause}>一時停止</button>
                  )}
                  {isPaused && (
                    <button className="btn btn-secondary" onClick={handleResume}>再開</button>
                  )}
                  <button className="btn btn-danger" onClick={handleReset}>リセット</button>
                </div>
              </div>
            </div>
          </div>
          <div className="music-details">
            <div className="music-thumbnail-small">
              <div className={`image-loading-small ${smallImageLoaded ? 'hidden' : ''}`}>
                <div className="loading-spinner-small">
                  <span></span>
                </div>
              </div>
              <img
                src={(currentTrack || displayTrack).image}
                alt="Album Artwork"
                className={smallImageLoaded ? 'loaded' : ''}
                crossOrigin="anonymous"
                onLoad={handleSmallImageLoad}
                onError={() => {
                  console.error('サムネイル画像の読み込みに失敗しました:', currentTrack.image);
                  setSmallImageLoaded(true); // エラー時も表示を試みる
                }}
              />
            </div>
            <div className="music-text">
              <div className="music-title">{(currentTrack || displayTrack).title}</div>
              <div className="music-artist">{(currentTrack || displayTrack).artist}</div>
            </div>
          </div>
          {/* 次の曲リスト */}
          {tracks.length > 0 && (
            <div className="next-tracks-list">
              {tracks.slice(currentTrackIndex + 1).map((track, index) => (
                <div key={track.id || `track_${currentTrackIndex + 1 + index}`} className="next-track-item">
                  <div className="next-track-thumbnail">
                    <img
                      src={track.image}
                      alt={track.title}
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.src = 'https://picsum.photos/300/300?random=' + (currentTrackIndex + 1 + index);
                      }}
                    />
                  </div>
                  <div className="next-track-text">
                    <div className="next-track-title">{track.title}</div>
                    <div className="next-track-artist">{track.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="music-controls-section">
            <div className="player-controls">
              <button className="player-btn player-btn-prev" aria-label="前の曲">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6h2v12H6V6zm11 0l-8 6 8 6V6z" fill="currentColor"/>
                </svg>
              </button>
              <button
                className="player-btn player-btn-play"
                aria-label="再生/一時停止"
                onClick={async () => {
                  const accessToken = getAccessToken();
                  // モックモードの場合は音楽再生をスキップ
                  if (accessToken && accessToken.startsWith('mock_')) {
                    console.log('モックモード: 音楽再生機能は利用できません');
                    alert('モックモードでは実際の音楽再生は行われません。\nタイマー機能は正常に動作します。');
                    return;
                  }

                  if (isPlaying) {
                    pause();
                    setIsPlaying(false);
                  } else {
                    if (sessionType === 'WORK' && selectedPlaylist && isPlayerReady()) {
                      try {
                        if (accessToken) {
                          await playPlaylist(selectedPlaylist.id, accessToken);
                          setIsPlaying(true);
                        }
                      } catch (error) {
                        console.warn('再生エラー:', error.message);
                        alert('音楽の再生に失敗しました（モックモードの可能性）');
                      }
                    } else if (isPlayerReady()) {
                      play();
                      setIsPlaying(true);
                    } else {
                      alert('プレイヤーが準備できていません。Spotify認証を確認してください。');
                    }
                  }
                }}
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
            <div className="playlist-select-section">
              <button className="btn btn-secondary playlist-select-btn" onClick={handlePlaylistSelect}>
                <span>{selectedPlaylist ? selectedPlaylist.name : 'プレイリスト選択'}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Spotifyログインモーダル */}
      {showSpotifyModal && (
        <div className="modal-overlay show" onClick={() => {
          console.log('モーダルオーバーレイがクリックされました');
          setShowSpotifyModal(false);
        }}>
          <div className="modal-content" onClick={(e) => {
            e.stopPropagation();
            console.log('モーダルコンテンツがクリックされました');
          }}>
            <div className="modal-header">
              <h2 className="modal-title">Spotifyでログイン</h2>
              <button className="modal-close" onClick={() => {
                console.log('モーダル閉じるボタンがクリックされました');
                setShowSpotifyModal(false);
              }}>&times;</button>
            </div>
            <div className="modal-body">
              <p>音楽を再生するには、Spotifyアカウントでのログインが必要です。</p>
              <button className="btn btn-success btn-large" onClick={() => {
                console.log('Spotifyログインボタンがクリックされました');
                handleSpotifyLogin();
              }}>
                Spotifyでログイン
              </button>
            </div>
          </div>
        </div>
      )}

      {/* プレイリスト選択モーダル */}
      {showPlaylistModal && (
        <div className="modal-overlay show" onClick={() => {
          console.log('プレイリストモーダルオーバーレイがクリックされました');
          setShowPlaylistModal(false);
        }}>
          <div className="modal-content" onClick={(e) => {
            e.stopPropagation();
            console.log('プレイリストモーダルコンテンツがクリックされました');
          }}>
            <div className="modal-header">
              <h2 className="modal-title">プレイリスト選択</h2>
              <button className="modal-close" onClick={() => {
                console.log('プレイリストモーダル閉じるボタンがクリックされました');
                setShowPlaylistModal(false);
              }}>&times;</button>
            </div>
            <div className="modal-body">
              {playlists.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#ffffff' }}>
                  プレイリストが見つかりませんでした
                </div>
              ) : (
                <div className="playlist-list">
                  {playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="playlist-item"
                      onClick={async () => {
                        console.log('プレイリストが選択されました:', playlist.name);
                        setSelectedPlaylist(playlist);
                        setShowPlaylistModal(false);
                        // トラックリストを取得
                        await fetchPlaylistTracks(playlist.id);
                      }}
                    >
                      <div className="playlist-item-content">
                        <div className="playlist-name">{playlist.name}</div>
                        {playlist.description && (
                          <div style={{ fontSize: '14px', color: '#999', marginTop: '4px' }}>
                            {playlist.description}
                          </div>
                        )}
                        {playlist.trackCount !== undefined && (
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                            {playlist.trackCount}曲
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerPage;

