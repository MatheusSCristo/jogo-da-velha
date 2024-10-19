FROM openjdk:21-jdk
ARG JAR_FILE=target/*.jar
COPY ./target/jogo-da-velha-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
EXPOSE 8080