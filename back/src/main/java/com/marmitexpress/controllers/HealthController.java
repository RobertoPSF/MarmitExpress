package com.marmitexpress.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/health")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*")
public class HealthController {

    @GetMapping
    public ResponseEntity<String> healthCheck() {
        
        return ResponseEntity.status(HttpStatus.OK).body("Ok");
    }
}
