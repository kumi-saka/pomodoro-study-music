import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/settings.css';

const API_BASE_URL = 'http://localhost:8080/api';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [notificationSound, setNotificationSound] = useState('default');
  const [errors, setErrors] = useState({});
  const [deviceId] = useState(() => {
    let id = localStorage.getItem('deviceId');
    if (!id) {
      id = 'device-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('deviceId', id);
    }
    return id;
  });

  // 設定を取得
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/settings/${deviceId}`);
        const data = await response.json();
        setWorkMinutes(data.workMinutes || 25);
        setBreakMinutes(data.breakMinutes || 5);
        setNotificationEnabled(data.notificationEnabled !== undefined ? data.notificationEnabled : true);
        setNotificationSound(data.notificationSound || 'default');
      } catch (error) {
        console.error('設定の取得に失敗しました:', error);
      }
    };
    fetchSettings();
  }, [deviceId]);

  const validate = () => {
    const newErrors = {};

    if (workMinutes < 1 || workMinutes > 60) {
      newErrors.workMinutes = '作業時間は1分以上60分以下である必要があります';
    }

    if (breakMinutes < 1 || breakMinutes > 30) {
      newErrors.breakMinutes = '休憩時間は1分以上30分以下である必要があります';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceId,
          workMinutes,
          breakMinutes,
          notificationEnabled,
          notificationSound,
        }),
      });

      if (response.ok) {
        alert('設定を保存しました');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`保存に失敗しました: ${errorData.message || 'エラーが発生しました'}`);
      }
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
      alert('設定の保存に失敗しました');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container settings-page">
      <main>
        <h1 className="card-title">設定</h1>

        {/* タイマー設定 */}
        <div className="card">
          <div className="settings-section">
            <h2 className="section-title">タイマー設定</h2>

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
                  required
                />
                <div className="form-hint">1分以上60分以下</div>
                {errors.workMinutes && (
                  <div className="error-message">{errors.workMinutes}</div>
                )}
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
                  required
                />
                <div className="form-hint">1分以上30分以下</div>
                {errors.breakMinutes && (
                  <div className="error-message">{errors.breakMinutes}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 通知設定 */}
        <div className="card">
          <div className="settings-section">
            <h2 className="section-title">通知設定</h2>

            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="notificationEnabled"
                  name="notificationEnabled"
                  checked={notificationEnabled}
                  onChange={(e) => setNotificationEnabled(e.target.checked)}
                />
                <label className="form-label" htmlFor="notificationEnabled">
                  通知を有効にする
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="notificationSound">通知音</label>
              <select
                className="form-select"
                id="notificationSound"
                name="notificationSound"
                value={notificationSound}
                onChange={(e) => setNotificationSound(e.target.value)}
              >
                <option value="default">デフォルト</option>
                <option value="sound1">音1</option>
                <option value="sound2">音2</option>
                <option value="sound3">音3</option>
              </select>
            </div>
          </div>
        </div>

        {/* ボタン */}
        <div className="btn-group" style={{ marginTop: '30px' }}>
          <button className="btn btn-primary" onClick={handleSave}>
            保存
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            キャンセル
          </button>
        </div>

        {/* 戻るリンク */}
        <div className="back-link">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="back-link-text">
            戻る
          </a>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;

