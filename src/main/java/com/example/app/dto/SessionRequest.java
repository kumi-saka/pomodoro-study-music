package com.example.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import lombok.Data;

@Data
public class SessionRequest {

    @NotBlank(message = "デバイスIDは必須です")
    private String deviceId;

    @NotBlank(message = "セッションタイプは必須です")
    private String sessionType; // "WORK" or "BREAK"

    @NotNull(message = "時間（分）は必須です")
    @Min(value = 1, message = "時間は1分以上である必要があります")
    @Max(value = 120, message = "時間は120分以下である必要があります")
    private Integer durationMinutes;

    private String spotifyPlaylistId;

    private String spotifyPlaylistName;
}

