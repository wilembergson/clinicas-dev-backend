# Clínicas Dev - Backend
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
- Crie um arquivo `.env` na raíz do projeto e preencha de acordo com o arquivo `.env.exemple` que já se encontra no mesmo diretório.
</br></br></br>

### Subir container
```bash
# Irá executar o projeto no ambiente Docker
$ npm run up

# Para e remove os containers criados
$ npm run down
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


#Response
{
  "message": "Conta criada com sucesso"
}
``` 
</br></br>


- Login</br>
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


# Response
{
  "message": "Endereço salvo"
}
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


# Response
{
  "message": "Endereço atualizado"
}
``` 
</br></br>

- Add consult</br> 
(POST): **/consult**
```bash
# body
{
  "specialty":"CARDIOLOGIA",
  "date":"2023-04-26"
}


# headers
"authorization": <jwt-token>


# Response
{
  "message": "Consulta marcada"
}
``` 
</br></br>

- Cancel consult</br> 
(PUT): **/cancel-consult/{ id }**
```bash
# params
URL: baseUrl/cancel-consult/<consult-id>


# headers
"authorization": <jwt-token>


# Response
{
  "message": "Consulta desmarcada"
}
``` 
</br></br>

- List consults</br> 
(GET): **/consult-list**
```bash
# headers
"authorization": <jwt-token>

#Response
[
	{
		"active": true,
		"date": "2023-05-01",
		"accountId": "ddae3949-62f4-48d6-8061-63e6fa35245a",
		"specialtyId": "314cb50e-8f95-4ba8-91c9-83830b1f2fb4",
		"specialty": {
			"id": "314cb50e-8f95-4ba8-91c9-83830b1f2fb4",
			"name": "ORTOPEDIA"
		},
		"id": {
			"_value": "19598252-4ba6-4d4d-b8d5-8b414457d402"
		}
	},
	{
		"active": true,
		"date": "2023-05-02",
		"accountId": "ddae3949-62f4-48d6-8061-63e6fa35245a",
		"specialtyId": "fbb1cca9-88f0-4720-842d-9954d4a8d0cf",
		"specialty": {
			"id": "fbb1cca9-88f0-4720-842d-9954d4a8d0cf",
			"name": "CARDIOLOGIA"
		},
		"id": {
			"_value": "e3fc6700-0007-4303-b263-94934d921164"
		}
	},
	{
		"active": true,
		"date": "2023-05-04",
		"accountId": "ddae3949-62f4-48d6-8061-63e6fa35245a",
		"specialtyId": "9ba47882-52e8-4df3-b2f8-ee773feaa225",
		"specialty": {
			"id": "9ba47882-52e8-4df3-b2f8-ee773feaa225",
			"name": "PEDIATRIA"
		},
		"id": {
			"_value": "2eff9d3d-c3da-4f62-84bb-2f746133f77e"
		}
	}
]
``` 
</br></br>

- Next consult</br> 
(GET): **/next-consult**
```bash
# headers
"authorization": <jwt-token>


#Response
[
	{
		"active": true,
		"date": "2023-05-01",
		"accountId": "ddae3949-62f4-48d6-8061-63e6fa35245a",
		"specialtyId": "314cb50e-8f95-4ba8-91c9-83830b1f2fb4",
		"specialty": {
			"id": "314cb50e-8f95-4ba8-91c9-83830b1f2fb4",
			"name": "ORTOPEDIA"
		},
		"id": {
			"_value": "19598252-4ba6-4d4d-b8d5-8b414457d402"
		}
	}
]
``` 
</br></br>

- Consults historic</br> 
(GET): **/historic-consults**
```bash
# headers
"authorization": <jwt-token>


#Response
[
	{
		"active": true,
		"date": "2022-05-01",
		"accountId": "ddae3949-62f4-48d6-8061-63e6fa35245a",
		"specialtyId": "314cb50e-8f95-4ba8-91c9-83830b1f2fb4",
		"specialty": {
			"id": "314cb50e-8f95-4ba8-91c9-83830b1f2fb4",
			"name": "ORTOPEDIA"
		},
		"id": {
			"_value": "19598252-4ba6-4d4d-b8d5-8b414457d402"
		}
	},
  {
		"active": true,
		"date": "2022-05-02",
		"accountId": "ddae3949-62f4-48d6-8061-63e6fa35245a",
		"specialtyId": "fbb1cca9-88f0-4720-842d-9954d4a8d0cf",
		"specialty": {
			"id": "fbb1cca9-88f0-4720-842d-9954d4a8d0cf",
			"name": "CARDIOLOGIA"
		},
		"id": {
			"_value": "e3fc6700-0007-4303-b263-94934d921164"
		}
	},
	{
		"active": true,
		"date": "2021-05-04",
		"accountId": "ddae3949-62f4-48d6-8061-63e6fa35245a",
		"specialtyId": "9ba47882-52e8-4df3-b2f8-ee773feaa225",
		"specialty": {
			"id": "9ba47882-52e8-4df3-b2f8-ee773feaa225",
			"name": "PEDIATRIA"
		},
		"id": {
			"_value": "2eff9d3d-c3da-4f62-84bb-2f746133f77e"
		}
	}
]
``` 
</br></br>

- List specialties</br> 
(GET): **/specialties**
```bash
# headers
"authorization": <jwt-token>


#Response
[
	{
		"name": "ORTOPEDIA",
		"days": [
			"SEGUNDA",
			"TERÇA",
			"SEXTA"
		]
	},
	{
		"name": "CARDIOLOGIA",
		"days": [
			"TERÇA",
			"QUARTA"
		]
	},
	{
		"name": "PEDIATRIA",
		"days": [
			"SEGUNDA",
			"QUINTA",
			"SEXTA"
		]
	},
	{
		"name": "HEMATOLOGIA",
		"days": [
			"QUARTA",
			"QUINTA"
		]
	}
]
``` 
</br></br>

- ### Melhorias continuarão sendo implementadas.