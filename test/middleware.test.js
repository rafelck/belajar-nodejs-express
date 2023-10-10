import express from "express"
import request from "supertest";

const logger = (req,res, next) => {
    console.info(`Recive request: ${req.method} ${req.originalUrl}`);
    next();
}

const addPoweredHeader = (req, res, next) => {
    res.set("X-Powered-By", "Rafelino Claudius Kelen")
    next();
}

const apiKeyMiddleware = (req,res,next) => {
    if(req.query.apiKey){
        next();
    }else{
        res.status(401).end();
    }
}


const app = express();
app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.get('/', (req, res) => {
    res.send('Hello world');
})

test("Test Middleware" , async () => {
    const response = await request(app).get("/").query({apiKey: "asfasfas"});
    expect(response.get("X-Powered-By")).toBe("Rafelino Claudius Kelen");
    expect(response.text).toBe("Hello world");
})

test("Test Middleware Unauthorized" , async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(401);
})