// client_server_OAuth2/src/index.ts

import express, {Request} from "express";

const app = express();
import {config} from "dotenv"
import cors from "cors";
import {gitHubRouter} from "./gitHubRouter";
import {googleRouter} from "./googleRouter";

app.use(cors())
config()

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.json('welcome to client_server');
})

app.use('/auth/github', gitHubRouter)

app.use('/auth/google', googleRouter)


app.listen(port, () => {
    console.log(`listening on ${port}`);
})