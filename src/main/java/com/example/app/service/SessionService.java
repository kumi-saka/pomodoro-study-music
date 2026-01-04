package com.example.app.service;

import com.example.app.dto.SessionRequest;
import com.example.app.dto.SessionResponse;
import com.example.app.entity.Session;
import com.example.app.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository repository;

    @Transactional
    public SessionResponse createSession(SessionRequest request) {
        Session session = new Session();
        session.setDeviceId(request.getDeviceId());
        session.setSessionType(request.getSessionType());
        session.setDurationMinutes(request.getDurationMinutes());
        session.setCompleted(false);
        session.setSpotifyPlaylistId(request.getSpotifyPlaylistId());
        session.setSpotifyPlaylistName(request.getSpotifyPlaylistName());
        session.setStartedAt(LocalDateTime.now());

        Session saved = repository.save(session);
        return convertToResponse(saved);
    }

    @Transactional
    public SessionResponse updateSession(Long id, SessionRequest request) {
        Session session = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("セッションが見つかりません: " + id));

        // セッション終了時のみ更新
        if (request.getSessionType() != null) {
            session.setSessionType(request.getSessionType());
        }
        if (request.getDurationMinutes() != null) {
            session.setDurationMinutes(request.getDurationMinutes());
        }
        if (request.getSpotifyPlaylistId() != null) {
            session.setSpotifyPlaylistId(request.getSpotifyPlaylistId());
        }
        if (request.getSpotifyPlaylistName() != null) {
            session.setSpotifyPlaylistName(request.getSpotifyPlaylistName());
        }

        // 完了フラグを設定（終了時刻も設定）
        session.setCompleted(true);
        session.setEndedAt(LocalDateTime.now());

        Session updated = repository.save(session);
        return convertToResponse(updated);
    }

    public List<SessionResponse> getSessions(String deviceId) {
        List<Session> sessions = repository.findByDeviceIdOrderByCreatedAtDesc(deviceId);
        return sessions.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    public SessionResponse getSession(Long id) {
        Session session = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("セッションが見つかりません: " + id));
        return convertToResponse(session);
    }

    private SessionResponse convertToResponse(Session session) {
        return new SessionResponse(
            session.getId(),
            session.getDeviceId(),
            session.getSessionType(),
            session.getDurationMinutes(),
            session.getCompleted(),
            session.getSpotifyPlaylistId(),
            session.getSpotifyPlaylistName(),
            session.getStartedAt(),
            session.getEndedAt(),
            session.getCreatedAt()
        );
    }
}

