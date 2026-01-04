package com.example.app.service;

import com.example.app.dto.PlaylistResponse;
import com.example.app.dto.SpotifyAuthUrlResponse;
import com.example.app.dto.SpotifyTokenResponse;
import com.example.app.dto.TrackResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SpotifyService {

    @Value("${spotify.client.id}")
    private String clientId;

    @Value("${spotify.client.secret}")
    private String clientSecret;

    @Value("${spotify.redirect.uri}")
    private String redirectUri;

    @Value("${spotify.mock.enabled:false}")
    private boolean mockEnabled;

    private final RestTemplate restTemplate;

    public SpotifyAuthUrlResponse getAuthUrl() {
        if (mockEnabled) {
            // モックモード: ダミーの認証URLを返す
            return new SpotifyAuthUrlResponse("http://localhost:5173/callback?code=mock_code_12345");
        }

        String scope = "user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private";
        String authUrl = String.format(
            "https://accounts.spotify.com/authorize?client_id=%s&response_type=code&redirect_uri=%s&scope=%s",
            clientId,
            URLEncoder.encode(redirectUri, StandardCharsets.UTF_8),
            URLEncoder.encode(scope, StandardCharsets.UTF_8)
        );
        return new SpotifyAuthUrlResponse(authUrl);
    }

    public SpotifyTokenResponse exchangeCodeForToken(String code) {
        if (mockEnabled) {
            // モックモード: ダミーのトークンを返す
            return new SpotifyTokenResponse(
                "mock_access_token_" + System.currentTimeMillis(),
                "mock_refresh_token_" + System.currentTimeMillis(),
                3600,
                "Bearer"
            );
        }

        String tokenUrl = "https://accounts.spotify.com/api/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(clientId, clientSecret);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("code", code);
        body.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Map<String, Object> responseBody = response.getBody();
            String accessToken = (String) responseBody.get("access_token");
            String refreshToken = (String) responseBody.get("refresh_token");
            Integer expiresIn = (Integer) responseBody.get("expires_in");
            String tokenType = (String) responseBody.get("token_type");

            return new SpotifyTokenResponse(
                accessToken,
                refreshToken,
                expiresIn,
                tokenType != null ? tokenType : "Bearer"
            );
        }
        throw new RuntimeException("Spotify認証に失敗しました");
    }

    public PlaylistResponse getPlaylists(String accessToken) {
        if (mockEnabled) {
            // モックモード: ダミーのプレイリストを返す
            List<PlaylistResponse.Playlist> mockPlaylists = new ArrayList<>();
            mockPlaylists.add(new PlaylistResponse.Playlist(
                "mock_playlist_1",
                "集中力向上",
                "作業用BGM",
                "https://picsum.photos/300/300?random=1",
                50,
                "Spotify"
            ));
            mockPlaylists.add(new PlaylistResponse.Playlist(
                "mock_playlist_2",
                "作業用BGM",
                "集中して作業するための音楽",
                "https://picsum.photos/300/300?random=2",
                30,
                "Spotify"
            ));
            mockPlaylists.add(new PlaylistResponse.Playlist(
                "mock_playlist_3",
                "リラックス音楽",
                "休憩時間に聴く音楽",
                "https://picsum.photos/300/300?random=3",
                40,
                "Spotify"
            ));
            return new PlaylistResponse(mockPlaylists);
        }

        String playlistsUrl = "https://api.spotify.com/v1/me/playlists";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(
            playlistsUrl,
            HttpMethod.GET,
            entity,
            Map.class
        );

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Map<String, Object> body = response.getBody();
            List<Map<String, Object>> items = (List<Map<String, Object>>) body.get("items");

            List<PlaylistResponse.Playlist> playlists = new ArrayList<>();
            for (Map<String, Object> item : items) {
                PlaylistResponse.Playlist playlist = new PlaylistResponse.Playlist();
                playlist.setId((String) item.get("id"));
                playlist.setName((String) item.get("name"));
                playlist.setDescription((String) item.get("description"));

                List<Map<String, Object>> images = (List<Map<String, Object>>) item.get("images");
                if (images != null && !images.isEmpty()) {
                    playlist.setImageUrl((String) images.get(0).get("url"));
                }

                Map<String, Object> tracks = (Map<String, Object>) item.get("tracks");
                if (tracks != null) {
                    playlist.setTrackCount((Integer) tracks.get("total"));
                }

                Map<String, Object> owner = (Map<String, Object>) item.get("owner");
                if (owner != null) {
                    playlist.setOwner((String) owner.get("display_name"));
                }

                playlists.add(playlist);
            }

            return new PlaylistResponse(playlists);
        }
        throw new RuntimeException("プレイリストの取得に失敗しました");
    }

    public TrackResponse getPlaylistTracks(String accessToken, String playlistId) {
        if (mockEnabled) {
            // モックモード: ダミーのトラックを返す
            List<TrackResponse.Track> mockTracks = new ArrayList<>();
            mockTracks.add(new TrackResponse.Track(
                "mock_track_1",
                "Lofi Hip Hop",
                "ChilledCow",
                "Beats to Study To",
                "https://picsum.photos/300/300?random=1",
                180000,
                "spotify:track:mock_track_1"
            ));
            mockTracks.add(new TrackResponse.Track(
                "mock_track_2",
                "Focus Music",
                "Brain.fm",
                "Deep Concentration",
                "https://picsum.photos/300/300?random=2",
                240000,
                "spotify:track:mock_track_2"
            ));
            mockTracks.add(new TrackResponse.Track(
                "mock_track_3",
                "Peaceful Piano",
                "Spotify",
                "Calm & Relaxing",
                "https://picsum.photos/300/300?random=3",
                200000,
                "spotify:track:mock_track_3"
            ));
            return new TrackResponse(mockTracks);
        }

        String tracksUrl = String.format("https://api.spotify.com/v1/playlists/%s/tracks", playlistId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(
            tracksUrl,
            HttpMethod.GET,
            entity,
            Map.class
        );

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Map<String, Object> body = response.getBody();
            List<Map<String, Object>> items = (List<Map<String, Object>>) body.get("items");

            List<TrackResponse.Track> tracks = new ArrayList<>();
            for (Map<String, Object> item : items) {
                Map<String, Object> trackData = (Map<String, Object>) item.get("track");
                if (trackData == null) continue;

                TrackResponse.Track track = new TrackResponse.Track();
                track.setId((String) trackData.get("id"));
                track.setName((String) trackData.get("name"));
                track.setUri((String) trackData.get("uri"));
                track.setDurationMs((Integer) trackData.get("duration_ms"));

                List<Map<String, Object>> artists = (List<Map<String, Object>>) trackData.get("artists");
                if (artists != null && !artists.isEmpty()) {
                    track.setArtist((String) artists.get(0).get("name"));
                }

                Map<String, Object> album = (Map<String, Object>) trackData.get("album");
                if (album != null) {
                    track.setAlbum((String) album.get("name"));
                    List<Map<String, Object>> images = (List<Map<String, Object>>) album.get("images");
                    if (images != null && !images.isEmpty()) {
                        track.setImageUrl((String) images.get(0).get("url"));
                    }
                }

                tracks.add(track);
            }

            return new TrackResponse(tracks);
        }
        throw new RuntimeException("プレイリストのトラック取得に失敗しました");
    }
}
