<img src="https://github.com/vincent-queimado/boilerplate-api/blob/main/public/assets/images/logo.png?raw=true" alt="Logo" height="100px"/>

# Boilerplate - Servidor RESTful API para inciar uma API do zero

## Sobre o boilerplate  
Boilerplate desenvolvido a partir de NodeJs para inciar uma API do zero.

O boilerplate utiliza o framework Express, bibliotecas como SocketIO, ORM Sequelize, Babel, Joi, Jest, entre outros...

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

Antes de instalar e executar o projeto, é necessário instalar e configurar um banco de dados Postgres.

Obs.: É possível criar uma aplicação na plataforma Heroku (criação de conta grátis https://signup.heroku.com/), e em seguida adicionar o recurso (add-on) de banco de dados "Heroku Posgres".

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

Configuração de variavéis de ambiente. O comando abaixo irá copiar o arquivo de exemplo para o arquivo de variaveis de ambiente necessário a inicialização do projeto:
```bash
cp .env.example .env
# abre o arquivo .env e altera as variaveis caso necessário
```
Exemplo de configuração de arquivo .env:
```bash
APP_NAME=API-PROJECT-BASE

APP_WEB_URL=0.0.0.0
APP_WEB_PORT=3333

APP_API_URL=0.0.0.0
APP_API_PORT=8080

APP_SOCKETIO_PORT=3334

APP_SESSION_SECRET=secretsession
APP_SESSION_MAX_AGE=3600000

APP_JWT_EXPIRED_IN=24h

DATABASE_HOST=000-12-111-333-786.compute-1.amazonaws.com
DATABASE_PORT=5432
DATABASE_SCHEMA=public
DATABASE_DATABASE=ea566a56bc
DATABASE_USERNAME=resegalifetest
DATABASE_PASSWORD=efae097f7e87af7a89f7fa97

SENDGRID_API_KEY=_fjsdjfsdjkldjdadjalkdjadjkladjalkjd.key
SENDGRID_API_FROM_EMAIL="Projeto x" <projeto@email.com>
SENDGRID_API_USE_LOCAL_TEMPLATE=true

SMTP_SERVICE=gmail
SMTP_USER=admin
SMTP_PASSWORD=password

SUPER_ADMIN_EMAIL=projeto@email.com
SUPER_ADMIN_PASSWORD=password
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
