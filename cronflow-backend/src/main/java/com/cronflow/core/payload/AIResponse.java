package com.cronflow.core.payload;

public class AIResponse {
    private String content;

    public AIResponse(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
