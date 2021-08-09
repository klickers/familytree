FROM gradle:6-jdk11

WORKDIR /app
ADD --chown=gradle:gradle ./backend/familytree/ /app

RUN apt-get update
RUN apt-get install dos2unix

RUN curl -sL https://deb.nodesource.com/setup_13.x  | bash -
RUN apt-get -y install nodejs

RUN chmod +x ./gradlew
RUN dos2unix gradlew

EXPOSE 8080

CMD ./gradlew bootRun