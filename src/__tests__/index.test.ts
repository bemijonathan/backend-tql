


import * as request from 'supertest';
import { App } from '../app';
import { StatusCode } from '../utils';


const { app } = new App()


test("that request non existing route returns 404", async () => {
    request(app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect(404)
})

test("that when routes are called without required query an error is returned", async () => {
    const t = await request(app)
        .get('/howold')
        .expect('Content-Type', /json/)

    expect(t.statusCode).toBe(StatusCode.BAD_REQUEST)
    expect(t.body.message).toBe('dob is a required params')
})


test("that when routes are called with required query correct date is returned", async () => {
    let t = await request(app)
        .get('/howold?dob=1999-09-24')
        .expect('Content-Type', /json/)

    expect(t.statusCode).toBe(StatusCode.OK)
    expect(t.body.data.age).toBeGreaterThanOrEqual(22)


    t = await request(app)
        .get('/howold?dob=1663233430203')
        .expect('Content-Type', /json/)

    expect(t.statusCode).toBe(StatusCode.OK)
    expect(t.body.data.age).toBeGreaterThanOrEqual(0)
})




