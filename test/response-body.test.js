import express from "express"
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/sample.txt");
})

test("Test ExpressJS" , async () => {
    const response = await request(app).get("/");
    expect(response.text).toContain("This is sample file");
})