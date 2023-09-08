package com.tokenmanager.validator.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class ValidatorControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testValidToken() throws Exception {
        String validToken = "4532015112830366";

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/token/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Valid Token"));
    }

    @Test
    public void testInvalidToken() throws Exception {
        String invalidToken = "4532015112830365"; // Last digit changed to make it invalid

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/token/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidToken))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.content().string("Invalid Token"));
    }
}
