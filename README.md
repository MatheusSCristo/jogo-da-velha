# Jogo da Velha 

Este projeto é um jogo da velha, com duas versões: uma em **Spring Boot** e outra em **Next.js** (para a interface), ambos com suporte ao **Docker** e comunicação via **WebSocket**.

## Requisitos

Certifique-se de que você tem os seguintes itens instalados em sua máquina:

- [Node.js](https://nodejs.org/) (para a versão Next.js)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Java 17+](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (para o backend Spring Boot)

## Estrutura do Projeto

- **/jogo-da-velha-front/**: Contém a aplicação frontend feita com Next.js
  - **Dockerfile**: Arquivo para gerar a imagem Docker da aplicação frontend.
- **/jogo-da-velha-back/**: Contém o backend da aplicação feito com Spring Boot
  - **Dockerfile**: Arquivo para gerar a imagem Docker do backend.
- **docker-compose.yml**: Orquestra o backend e o frontend em containers.

## Comunicação via WebSocket

Este projeto utiliza **WebSocket** para permitir comunicação em tempo real entre o frontend e o backend. Isso é essencial para a troca de informações de estado do jogo entre os jogadores.

### Backend (Spring Boot)

O backend Spring Boot inclui um servidor WebSocket que gerencia a comunicação entre os clientes. Ele lida com mensagens como:

- Início de uma nova partida.
- Movimentos dos jogadores.

### Frontend (Next.js)

O frontend em Next.js se conecta ao WebSocket para enviar e receber eventos de jogo. Isso permite a comunicação em tempo real e uma experiência de usuário interativa, com o estado do jogo sendo atualizado instantaneamente.

## Configuração do Ambiente

1. **Clonar o repositório**:

   ```bash
   git clone https://github.com/username/jogo-da-velha.git
   cd jogo-da-velha-back

2. **Compilar o backend**:

   ```bash
   cd jogo-da-velha-back
   mvn clean install

3. **Gerar o build Docker para o backend**:

   ```bash
   docker build -t jogo-da-velha-back:0.1

4. **Compilar o frontend**:

   ```bash
   cd jogo-da-velha-front

5. **Gerar o build Docker para o frontend**:

   ```bash
   docker build -t jogo-da-velha-frontend:0.1

6. **Subir os serviços utilzando Docker Compose**:

   ```bash
   cd ..
   docker-compose up

## Acessar a aplicação
  - Frontend: http://localhost:3000 
   
   
