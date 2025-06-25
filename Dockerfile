# Etapa 1: Build usando Maven e JDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . .

# Executa o build do projeto, gerando o jar na pasta target
RUN mvn clean package -DskipTests

# Etapa 2: Imagem final para executar a aplicação usando JRE 17
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copia o jar gerado na etapa de build para a imagem final
COPY --from=build /app/target/ellemVeigaOficial-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que a aplicação vai rodar (o Spring Boot usa por padrão 8080)
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["java", "-jar", "app.jar"]