# Estrutura geral do projeto

MarmitExpress
│
├── back
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── marmitexpress
│   │   │   │           ├── controllers
│   │   │   │           │   └── Controller.java
│   │   │   │           │
│   │   │   │           ├── services
│   │   │   │           │   └── Service.java
│   │   │   │           │
│   │   │   │           ├── repositorys
│   │   │   │           │   └── Repository.java
│   │   │   │           │
│   │   │   │           ├── models
│   │   │   │           │   └── Model.java
│   │   │   │           │
│   │   │   │           └── Application.java
│   │   │   └── resources
│   │   └── test
│   │       └── java
│   │           └── com
│   │               └── marmitexpress
│   │                   └── ApplicationTests.java
│   │
│   └── Dockerfile
│
├── front
│   ├── src
│   │   ├── components
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── pages
│   │   │   └── Home.tsx
│   │   │
│   │   ├── App.tsx
│   │   └── index.tsx
│   │
│   ├── package.json
│   └── Dockerfile
│
└── docker-compose.yml

# Pré-requisitos
Antes de começar, certifique-se de que você tenha o seguinte instalado em sua máquina:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

# Passo 1: Construir as Imagens Docker
Navegue até o diretório raiz do seu projeto (onde o arquivo docker-compose.yml está localizado) e execute o seguinte comando para construir as imagens Docker:

- docker-compose build

# Passo 2: Executar os Contêineres
Após a construção das imagens, você pode iniciar os contêineres com o seguinte comando:

- docker-compose up

# Passo 3: Acessar a Aplicação
Após os contêineres estarem em execução, você pode acessar a aplicação da seguinte forma:

- Front-end: Abra seu navegador e vá para http://localhost:3000.
- Back-end: O back-end estará disponível em http://localhost:8080.

# Passo 4: Parar os Contêineres
Para parar os contêineres em execução, você pode usar o seguinte comando:

- docker-compose down