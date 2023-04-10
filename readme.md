# Clínicas Dev - Backend (refatorando)
#### Repositório base: https://github.com/wilembergson/clinicas-dev-backend
#### Frontend: https://github.com/wilembergson/clinicas-dev 
</br>

### Sobre
- Sistema de marcação de consultas médicas onde é possível criar um usuário, fazer login, marcar consultas nos dias especificos de cada especialidade médica além de poder obter o hitórico de suas consultas.
</br></br></br>

### Tecnologias
- Typescript
- Express
- Postgres
- Prisma
- Docker
- JWT
- Joi
- Jest
</br></br></br>


### Instalando dependencias
```bash
# dependencias do package-lock.json
$ npm install
```
</br>

### Variáveis de ambiente
- Crie um arquivo .env na raíz do projeto e preencha de acordo com o arquivo .env-exemple que já se encontra no mesmo diretório.
</br></br></br>

### Subir container
```bash
# Irá executar o projeto no ambiente Docker
$ npm run up
```
</br>

### Execultando os testes
```bash
# Mostra a cobertura dos teste
$ npm run test:cov
```
</br>

### Executando em desenvolvimento
```bash
# development
$ npm run dev
```
</br>

### Rotas
- Signup</br> 
(POST): **/signup**
```bash
# body
{
  "cpf":"111.222.333-44",
  "name":"Junior Silva",
  "birthdate":"1995-01-08",
  "phone":"83988775544",
  "email":"juniorsilva@gmail.com",
  "password":"exemploPassword123"
}
``` 
</br></br>


- Login
</br> 

(GET): **/login**
```bash
# body
{
  "email":"juniorsilva@gmail.com",
  "password":"exemploPassword123"
}


# response
{
	"token": <jwt-token>
}
``` 
</br></br>

- New address</br> 
(POST): **/address**
```bash
# body
{
  "number":"777",
  "street":"Rua tal",
  "district":"Sapucaia",
  "city": "Timbaúba",
  "uf":"PE"
}

# headers
"authorization": <jwt-token>
``` 
</br></br>

- Get address</br> 
(GET): **/address**
```bash
# headers
"authorization": <jwt-token>

# response
{
  "id":"c89b1d73-9356-4661-9112-e6ddb646b1e2",
  "number":"777",
  "street":"Rua tal",
  "district":"Sapucaia",
  "city": "Timbaúba",
  "uf":"PE"
}
``` 
</br></br>

- Update address</br> 
(PUT): **/address**
```bash
# body
{
  "id":"c89b1d73-9356-4661-9112-e6ddb646b1e2",
  "number":"777",
  "street":"Rua tal",
  "district":"Sapucaia",
  "city": "Timbaúba",
  "uf":"PE"
}

# headers
"authorization": <jwt-token>
``` 
</br></br>