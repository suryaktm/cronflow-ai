package com.cronflow.core.controller;

import com.cronflow.core.payload.AIRequest;
import com.cronflow.core.payload.AIResponse;
import com.cronflow.core.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/generate")
    public AIResponse generateScript(@RequestBody AIRequest request) {
        String script = geminiService.generateScript(request.getPrompt(), request.getLanguage());
        return new AIResponse(script);
    }

    @PostMapping("/explain")
    public AIResponse explainScript(@RequestBody AIRequest request) {
        // Reusing AIRequest 'prompt' as script content for simplicity in this mock
        String explanation = geminiService.explainScript(request.getPrompt());
        return new AIResponse(explanation);
    }
}
