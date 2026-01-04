package com.example.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "device_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceSettings {

    @Id
    @Column(name = "device_id", length = 255)
    private String deviceId;

    @Column(name = "work_minutes", nullable = false)
    private Integer workMinutes = 25;

    @Column(name = "break_minutes", nullable = false)
    private Integer breakMinutes = 5;

    @Column(name = "notification_enabled", nullable = false)
    private Boolean notificationEnabled = true;

    @Column(name = "notification_sound", length = 50, nullable = false)
    private String notificationSound = "default";

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

