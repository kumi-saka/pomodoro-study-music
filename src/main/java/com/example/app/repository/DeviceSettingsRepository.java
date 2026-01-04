package com.example.app.repository;

import com.example.app.entity.DeviceSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeviceSettingsRepository extends JpaRepository<DeviceSettings, String> {
    Optional<DeviceSettings> findByDeviceId(String deviceId);
}

