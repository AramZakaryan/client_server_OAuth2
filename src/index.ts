import express, {Request} from "express";

const app = express();
import {config} from "dotenv"
import cors from "cors";

app.use(cors())
config()

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.json('welcome to client_server');
})

app.get('/auth/github', async (req: Request, res) => {
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;
    const code = req.query.code as string;

    const tokenResponse = await fetch(
        'https://github.com/login/oauth/access_token',
        {
            method: 'POST',
            body: JSON.stringify({client_id, client_secret, code}),
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        }
    );
    const tokenData = await tokenResponse.json();
    res.json({token: tokenData});
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
})