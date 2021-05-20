<img src="https://github.com/vincent-queimado/boilerplate/blob/master/public/assets/images/logo.png?raw=true" alt="Logo" height="100px"/>

# Boilerplate - Servidor RESTful API para inciar uma API do zero

## Sobre o boilerplate  
Boilerplate desenvolvido a partir de NodeJs para inciar uma API do zero. 
O boilerplate utiliza o framework Express, bibliotecas como SocketIO, Sequelize, Babel, Joi, Jest, entre outros...

## Estrutura

```
dist\
logs\
public\
src\
 |--app\                # Architectural custom
     |--controllers\
     |--models\
     |--presenters\
     |--services\
 |--config\             # Environment variables and configuration related things
 |--core\               # Main files (Express/Http/SocketIo)
 |--datas\              # Fake data / Mock   
 |--docs\               # Documentation / Postman files
 |--middlewares\        # Custom express middlewares
 |--orm\                # Object-Relational Mapping (Sequelize)
 |--routes\             # Routes
 |--services\           # Business logic (service layer)
 |--utils\              # Utility classes and functions
 |--validations\        # Request data validation schemas
 |--server.js           # App entry point
test\
```

## Instalação 

Antes de instalar e executar o projeto, é necessário instalar e configurar um banco de dados Postgres. Obs.: É possível criar uma aplicação de conta no Heroku (conta grátis), e em seguida adicionar o recurso (add-on) de banco de dados "Heroku Posgres".

Para realizar a instalação do projeto, segue o passo a passo abaixo.

Clone do repositório:
```bash
  git clone https://github.com/vincent-queimado/boilerplate-api.git
  cd boilerplate-api
```

Instalação de dependências:
```bash
  npm install
```

Configuração de variavéis de ambiente:
```bash
cp .env.example .env
# abre o arquivo .env e altera as variaveis caso necessário
```

Migration e seed de banco de dados:
```bash
npm run migrate
ou
npm run migrate:reset
# ou, seguinte comando de reset caso já existe um banco de dados
```

Executando localmente em ambiente de desenvolvimento:
```bash
  npm run dev
```

Executando em ambiente de produção (o código será compilado com babel na pasta dist e executado):
```bash
  npm serve
```

Obs.: Heroku realiza o pré build e depois roda automaticamente o comando npm start.

Ao executar localmente, a API será acessível na url http://localhost:3333.
