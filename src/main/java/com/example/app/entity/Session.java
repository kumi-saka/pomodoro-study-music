package com.example.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "pomodoro_sessions", indexes = {
    @Index(name = "idx_device_created", columnList = "device_id,created_at"),
    @Index(name = "idx_completed", columnList = "completed")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "device_id", nullable = false, length = 255)
    private String deviceId;

    @Column(name = "session_type", nullable = false, length = 20)
    private String sessionType; // "WORK" or "BREAK"

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "completed", nullable = false)
    private Boolean completed = false;

    @Column(name = "spotify_playlist_id", length = 255)
    private String spotifyPlaylistId;

    @Column(name = "spotify_playlist_name", length = 255)
    private String spotifyPlaylistName;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (startedAt == null) {
            startedAt = LocalDateTime.now();
        }
    }
}

