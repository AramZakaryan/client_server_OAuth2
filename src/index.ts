import express from "express";

const app = express();
import {config} from "dotenv"
import cors from "cors";

app.use(cors())
config()

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.json('hello');
})







app.listen(port, () => {
    console.log(`listening on ${port}`);
})