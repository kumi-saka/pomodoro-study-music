package com.example.app.service;

import com.example.app.dto.SettingsRequest;
import com.example.app.dto.SettingsResponse;
import com.example.app.entity.DeviceSettings;
import com.example.app.repository.DeviceSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SettingsService {

    private final DeviceSettingsRepository repository;

    public SettingsResponse getSettings(String deviceId) {
        Optional<DeviceSettings> settings = repository.findByDeviceId(deviceId);

        if (settings.isPresent()) {
            DeviceSettings s = settings.get();
            return new SettingsResponse(
                s.getDeviceId(),
                s.getWorkMinutes(),
                s.getBreakMinutes(),
                s.getNotificationEnabled(),
                s.getNotificationSound(),
                s.getCreatedAt(),
                s.getUpdatedAt()
            );
        } else {
            // デフォルト設定を返す
            return new SettingsResponse(
                deviceId,
                25,
                5,
                true,
                "default",
                LocalDateTime.now(),
                LocalDateTime.now()
            );
        }
    }

    @Transactional
    public SettingsResponse updateSettings(SettingsRequest request) {
        Optional<DeviceSettings> existing = repository.findByDeviceId(request.getDeviceId());

        DeviceSettings settings;
        if (existing.isPresent()) {
            settings = existing.get();
            settings.setWorkMinutes(request.getWorkMinutes());
            settings.setBreakMinutes(request.getBreakMinutes());
            if (request.getNotificationEnabled() != null) {
                settings.setNotificationEnabled(request.getNotificationEnabled());
            }
            if (request.getNotificationSound() != null) {
                settings.setNotificationSound(request.getNotificationSound());
            }
        } else {
            settings = new DeviceSettings();
            settings.setDeviceId(request.getDeviceId());
            settings.setWorkMinutes(request.getWorkMinutes());
            settings.setBreakMinutes(request.getBreakMinutes());
            settings.setNotificationEnabled(
                request.getNotificationEnabled() != null ? request.getNotificationEnabled() : true
            );
            settings.setNotificationSound(
                request.getNotificationSound() != null ? request.getNotificationSound() : "default"
            );
        }

        DeviceSettings saved = repository.save(settings);
        return new SettingsResponse(
            saved.getDeviceId(),
            saved.getWorkMinutes(),
            saved.getBreakMinutes(),
            saved.getNotificationEnabled(),
            saved.getNotificationSound(),
            saved.getCreatedAt(),
            saved.getUpdatedAt()
        );
    }
}

