package com.example.app.controller;

import com.example.app.dto.SettingsRequest;
import com.example.app.dto.SettingsResponse;
import com.example.app.service.SettingsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsService settingsService;

    @GetMapping("/{deviceId}")
    public ResponseEntity<SettingsResponse> getSettings(@PathVariable String deviceId) {
        SettingsResponse response = settingsService.getSettings(deviceId);
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<SettingsResponse> updateSettings(@Valid @RequestBody SettingsRequest request) {
        SettingsResponse response = settingsService.updateSettings(request);
        return ResponseEntity.ok(response);
    }
}

