import express from "express"
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
})

test("Test ExpressJS" , async () => {
    const response = await request(app).get("/").query({firstName: "rafel", lastName:"claudius"});
    expect(response.text).toBe("Hello rafel claudius");
})