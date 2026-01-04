package com.example.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SpotifyTokenRequest {
    @NotBlank(message = "認証コードは必須です")
    private String code;

    // deviceIdはオプション（将来の拡張用）
    private String deviceId;
}

