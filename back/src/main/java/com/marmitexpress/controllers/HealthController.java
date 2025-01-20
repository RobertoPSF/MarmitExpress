package com.marmitexpress.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/health")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class HealthController {

    @GetMapping
    public String healthCheck() {
        return "Ok";
    }
}
