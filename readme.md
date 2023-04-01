# Clínicas Dev - Backend (refatorando)
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
- - -
- Signup</br> 
(POST): **/signup**
```bash
# body
{
  "cpf":"111.222.333-44",
  "name":"Junior Silva",
  "birthDate":"1995-01-08",
  "phone":"83988775544",
  "email":"juniorsilva@gmail.com",
  "password":"exemploPassword123"
}
``` 
</br></br>
- - -
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
- - -
</br>

## refatorando...