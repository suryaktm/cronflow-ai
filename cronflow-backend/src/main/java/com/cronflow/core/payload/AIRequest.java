package com.cronflow.core.payload;

public class AIRequest {
    private String prompt;
    private String language; // e.g., "bash", "python"

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
