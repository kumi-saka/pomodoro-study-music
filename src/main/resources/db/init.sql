-- データベース作成
CREATE DATABASE IF NOT EXISTS pomodoro_study_music
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE pomodoro_study_music;

-- 既存のテーブルを削除（再作成する場合）
DROP TABLE IF EXISTS device_settings;

-- テーブル作成
CREATE TABLE device_settings (
    device_id VARCHAR(255) PRIMARY KEY COMMENT 'デバイスID',
    work_minutes INT NOT NULL DEFAULT 25 COMMENT '作業時間（分）',
    break_minutes INT NOT NULL DEFAULT 5 COMMENT '休憩時間（分）',
    notification_enabled BOOLEAN NOT NULL DEFAULT TRUE COMMENT '通知有効フラグ',
    notification_sound VARCHAR(50) NOT NULL DEFAULT 'default' COMMENT '通知音の種類',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='デバイス設定';

