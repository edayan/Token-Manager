package com.tokenmanager.validator.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/token")
public class TokenValidatorController {

    @PostMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestBody String token) {
        if (!token.matches("\\d+")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Token");
        }

        if (!isValidLuhn(token)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Token");
        }

        return ResponseEntity.ok("Valid Token");
    }

    private boolean isValidLuhn(String token) {
        // Implement the Luhn algorithm here
        int sum = 0;
        boolean alternate = false;
        for (int i = token.length() - 1; i >= 0; i--) {
            int n = Integer.parseInt(token.substring(i, i + 1));
            if (alternate) {
                n *= 2;
                if (n > 9) {
                    n = (n % 10) + 1;
                }
            }
            sum += n;
            alternate = !alternate;
        }
        return (sum % 10 == 0);
    }
}
