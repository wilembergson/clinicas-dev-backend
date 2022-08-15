import { faker } from "@faker-js/faker"
import supertest from "supertest"

import app from "../src/app.js"
import prisma from "../src/config/database.js"
import { createAddress, createUser, createUserWithWrongPassword, deleteAll, login } from "./factory/factory.js"


const agent = supertest(app)

describe("POST /user", () => {
    beforeEach(async ()=>{
        await deleteAll()
    })
    
    it("Cria um novo usuário - deve retornar 201", async () => {
        const newUser = await createUser()
        const response = await agent.post(`/user`).send(newUser)
        expect(response.status).toBe(201);
    });
    it("Tenta criar um usuario inválido - deve retornar 401", async () => {
        const newUser = {}
        const response = await agent.post(`/user`).send(newUser)
        expect(response.status).toBe(422);
    });
    it("Tenta criar um novo usuário com senhas diferentes - deve retornar 401", async () => {
        const newUser = await createUserWithWrongPassword()
        const response = await agent.post(`/user`).send(newUser)
        expect(response.status).toBe(401);
    });
})

describe("POST /login", () => {
    beforeEach(async ()=>{
        await deleteAll()
    })

    it("Realiza o login com sucesso - deve retornar 200", async () => {
        const user = await createUser()
        await agent.post('/user').send(user)
        const newlogin = await login(user.email, user.password)
        const response = await agent.post(`/login`).send(newlogin)
        expect(response.status).toBe(200);
    });
    it("Não consegue realizar o login - deve retornar 401", async () => {
        const user = await createUser()
        await agent.post('/user').send(user)
        const newlogin = await login(user.email, faker.internet.password())
        const response = await agent.post(`/login`).send(newlogin)
        expect(response.status).toBe(401);
    });
})
