package com.marmitexpress.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Interceptor {

    @Value("${app.secret_key}")
    private String secretKey;

    public Interceptor() {}

    public boolean checkAuthorization(String authorizationHeader) {
        return authorizationHeader != null && authorizationHeader.equals(secretKey);
    }
}
