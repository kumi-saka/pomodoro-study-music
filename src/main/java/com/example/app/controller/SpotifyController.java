package com.example.app.controller;

import com.example.app.dto.PlaylistResponse;
import com.example.app.dto.SpotifyAuthUrlResponse;
import com.example.app.dto.SpotifyTokenRequest;
import com.example.app.dto.SpotifyTokenResponse;
import com.example.app.dto.TrackResponse;
import com.example.app.service.SpotifyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/spotify")
@RequiredArgsConstructor
public class SpotifyController {

    private final SpotifyService spotifyService;

    @GetMapping("/auth-url")
    public ResponseEntity<SpotifyAuthUrlResponse> getAuthUrl() {
        SpotifyAuthUrlResponse response = spotifyService.getAuthUrl();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/token")
    public ResponseEntity<SpotifyTokenResponse> exchangeToken(@Valid @RequestBody SpotifyTokenRequest request) {
        SpotifyTokenResponse response = spotifyService.exchangeCodeForToken(request.getCode());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/callback")
    public ResponseEntity<SpotifyTokenResponse> callback(@Valid @RequestBody SpotifyTokenRequest request) {
        SpotifyTokenResponse response = spotifyService.exchangeCodeForToken(request.getCode());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/playlists")
    public ResponseEntity<PlaylistResponse> getPlaylists(@RequestHeader("Authorization") String authorization) {
        String accessToken = authorization.replace("Bearer ", "");
        PlaylistResponse response = spotifyService.getPlaylists(accessToken);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/playlists/{playlistId}/tracks")
    public ResponseEntity<TrackResponse> getPlaylistTracks(
            @PathVariable String playlistId,
            @RequestHeader("Authorization") String authorization) {
        String accessToken = authorization.replace("Bearer ", "");
        TrackResponse response = spotifyService.getPlaylistTracks(accessToken, playlistId);
        return ResponseEntity.ok(response);
    }
}

