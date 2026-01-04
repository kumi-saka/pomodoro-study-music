package com.example.app.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SettingsRequest {

    @NotBlank(message = "デバイスIDは必須です")
    private String deviceId;

    @Min(value = 1, message = "作業時間は1分以上60分以下である必要があります")
    @Max(value = 60, message = "作業時間は1分以上60分以下である必要があります")
    private Integer workMinutes;

    @Min(value = 1, message = "休憩時間は1分以上30分以下である必要があります")
    @Max(value = 30, message = "休憩時間は1分以上30分以下である必要があります")
    private Integer breakMinutes;

    private Boolean notificationEnabled;

    private String notificationSound;
}

