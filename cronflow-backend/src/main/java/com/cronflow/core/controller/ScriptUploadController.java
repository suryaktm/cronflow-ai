package com.cronflow.core.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/scripts")
public class ScriptUploadController {

    private final Path UPLOAD_DIR = Paths.get("d:/cronflow/scripts");

    public ScriptUploadController() {
        try {
            Files.createDirectories(UPLOAD_DIR);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage location", e);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadScript(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path destination = UPLOAD_DIR.resolve(filename);
            file.transferTo(destination);

            return ResponseEntity.ok(Map.of("path", destination.toAbsolutePath().toString()));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to store file: " + e.getMessage());
        }
    }
}
