package com.example.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistResponse {
    private List<Playlist> playlists;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Playlist {
        private String id;
        private String name;
        private String description;
        private String imageUrl;
        private Integer trackCount;
        private String owner;
    }
}

