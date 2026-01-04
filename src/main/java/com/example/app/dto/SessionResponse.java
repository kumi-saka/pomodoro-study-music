package com.example.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponse {
    private Long id;
    private String deviceId;
    private String sessionType;
    private Integer durationMinutes;
    private Boolean completed;
    private String spotifyPlaylistId;
    private String spotifyPlaylistName;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private LocalDateTime createdAt;
}

