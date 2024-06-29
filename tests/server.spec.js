const request = require("supertest");
const server = require("../index");

describe("CRUD operations of cafes", () => {
describe('Testing the [GET] method', () => {
    it('It should return a 200 status', async() => {
        const response = await request(server).get('/cafes').send()
        const status = response.statusCode
        expect(status).toBe(200)
    })
    it('The data type is an array with at least one object', async() => {
        const response = await request(server).get('/cafes').send()
        const cafes = response.body
        expect(cafes).toBeInstanceOf(Array)
        expect(cafes.length).toBeGreaterThanOrEqual(1)
    })
})
describe('Testing the [DELETE] method', () => {
    it('It should return a 404 status deleting a cafe with an non-existent id', async() => {
        const jwt = 'token'
        const id = 9999
        const response = await request(server).delete(`/cafes/${id}`).set('Authorization', jwt).send()
        const status = response.statusCode
        expect(status).toBe(404)
    })
})
describe('Testing the [POST] method', () => {
    it('It should add a new coffee and return a 201 status', async() => {
        const jwt = 'token'
        const newCoffee = {
            nombre: 'This is a new Coffee'
        }
        const response = await request(server).post('/cafes').set('Authorization', jwt).send(newCoffee)
        const status = response.statusCode
        expect(status).toBe(201)
    })
})
describe('Testing the [PUT] method', () => {
    it('It should return a 400 status because id is different', async() => {
        const updateCoffee = {
            id: '10',
            nombre: 'Black Coffee'
        }
        const response = await request(server).put('/cafes/2').send(updateCoffee)
        const status = response.statusCode
        expect(status).toBe(400)
    })
})
});
