import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("RAHASIA"));
app.use(express.json());
app.get('/', (req, res) => {
    const name = req.signedCookies["Login"];
    res.send(`Hello ${name}`);
})

app.post('/login', (req, res) => {
    const name = req.body.name;
    res.cookie("Login", name, {path: "/", signed: true});
    res.send(`Hello ${name}`);
})

test("Test Cookie Read", async () => {
    const response = await request(app).get("/")
        .set("Cookie", "Login=s%3ARafelino.ARf6d%2FgGOfIGp60mioePO59ZzZyZ11UYP6cjtlkYMyA; Path=/");

    expect(response.text).toBe("Hello Rafelino");
})

test("Test Cookie Write", async () => {
    const response = await request(app).post("/login")
        .send({name: "Rafelino"});
    console.info(response.get('Set-Cookie').toString());
    expect(response.get("Set-Cookie").toString()).toContain("Rafelino");
    expect(response.text).toBe("Hello Rafelino");
})