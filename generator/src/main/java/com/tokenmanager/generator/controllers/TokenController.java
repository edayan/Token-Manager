package com.tokenmanager.generator.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/token")
public class TokenController {

    @PostMapping("/generate")
    public ResponseEntity<String> generateToken(@RequestBody List<Integer> chosenDigits) {

        if (chosenDigits.isEmpty()) {
            // Return an error response if chosenDigits is empty
            return ResponseEntity.badRequest().body("At least one digit must be chosen.");
        }

        String generatedToken = generateTokenFromDigits(chosenDigits);
        return ResponseEntity.ok(generatedToken);
    }

    private String generateTokenFromDigits(List<Integer> chosenDigits) {
        // Format the digits into XXXX-XXXX-XXXX-XXXX
        StringBuilder tokenBuilder = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            if (i > 0 && i % 4 == 0) {
                tokenBuilder.append("-");
            }
            int randomIndex = new Random().nextInt(chosenDigits.size());
            int digit = chosenDigits.get(randomIndex);
            tokenBuilder.append(digit);
        }
        return tokenBuilder.toString();
    }
}
