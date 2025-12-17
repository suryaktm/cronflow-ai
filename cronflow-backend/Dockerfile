# Build Stage
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Docker Persistence (Scripts)
VOLUME /tmp

# Docker inside Docker? (For JobRunner)
# Requires binding host docker socket if running in container
# For Render.com free tier, we likely can't use Docker-in-Docker easily.
# We will rely on "ProcessBuilder" (Bash) which works in Alpine if we install bash.
RUN apk add --no-cache bash

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
