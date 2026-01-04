package com.example.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SettingsResponse {
    private String deviceId;
    private Integer workMinutes;
    private Integer breakMinutes;
    private Boolean notificationEnabled;
    private String notificationSound;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

