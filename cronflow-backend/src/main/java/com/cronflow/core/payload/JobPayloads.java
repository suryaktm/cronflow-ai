package com.cronflow.core.payload;

public class JobPayloads {

    public static class CreateJobRequest {
        private String name;
        private String scriptContent;
        private String dockerImage;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getScriptContent() {
            return scriptContent;
        }

        public void setScriptContent(String scriptContent) {
            this.scriptContent = scriptContent;
        }

        public String getDockerImage() {
            return dockerImage;
        }

        public void setDockerImage(String dockerImage) {
            this.dockerImage = dockerImage;
        }

        private String cronExpression;
        private boolean isEnabled;

        private String scriptSource = "INLINE";
        private String scriptPath;

        public String getCronExpression() {
            return cronExpression;
        }

        public void setCronExpression(String cronExpression) {
            this.cronExpression = cronExpression;
        }

        public boolean isEnabled() {
            return isEnabled;
        }

        public void setEnabled(boolean enabled) {
            this.isEnabled = enabled;
        }

        public String getScriptSource() {
            return scriptSource;
        }

        public void setScriptSource(String scriptSource) {
            this.scriptSource = scriptSource;
        }

        public String getScriptPath() {
            return scriptPath;
        }

        public void setScriptPath(String scriptPath) {
            this.scriptPath = scriptPath;
        }
    }
}
