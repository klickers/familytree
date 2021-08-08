FROM gradle:6-jdk11

WORKDIR /app
ADD --chown=gradle:gradle ./backend/familytree/ /app

#RUN ./gradlew build

ARG JAR_FILE=backend/familytree/build/libs/backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "/app/app.jar"]