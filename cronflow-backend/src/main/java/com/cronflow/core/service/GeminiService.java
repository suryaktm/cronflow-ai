package com.cronflow.core.service;

import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    public String generateScript(String prompt, String language) {
        // MOCK IMPLEMENTATION
        String lowercasePrompt = prompt.toLowerCase();

        if (lowercasePrompt.contains("backup")) {
            return "#!/bin/bash\n" +
                    "# Auto-generated Backup Script\n" +
                    "tar -czf backup_$(date +%F).tar.gz /var/www/html\n" +
                    "echo 'Backup completed successfully'";
        } else if (lowercasePrompt.contains("logs") || lowercasePrompt.contains("clean")) {
            return "#!/bin/bash\n" +
                    "# Auto-generated Log Cleanup Script\n" +
                    "find /var/log -name '*.log' -mtime +7 -delete\n" +
                    "echo 'Old logs cleaned up'";
        } else if (lowercasePrompt.contains("hello")) {
            return "#!/bin/bash\n" +
                    "echo 'Hello from CronFlow AI (Mock Mode)!'";
        } else {
            return "#!/bin/bash\n" +
                    "# Placeholder script for prompt: " + prompt + "\n" +
                    "echo 'This is a mock AI response.'";
        }
    }

    public String explainScript(String scriptContent) {
        return "This is a mock explanation. The script appears to perform system maintenance tasks tailored to your requirements.";
    }
}
