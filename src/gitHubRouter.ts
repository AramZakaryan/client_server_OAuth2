import {Request, Router} from "express";
import {config} from "dotenv"

config()

export const gitHubRouter = Router()

gitHubRouter.get('/', async (req: Request, res) => {

    // Step 4: Send to Authorization Server - Authorization Code, Client ID, Client Secret
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

    // Step 5: Receive Access Token from Authorization Server
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Step 6: Sending Access Token to Resource Server
    const userResponse = await fetch('https://api.github.com/user', {
        headers: {Authorization: `Bearer ${accessToken}`},
    })

    // Step 7: Receive User data from Resource Server
    const user = await userResponse.json();

    // Step 8: Send User data to Owner (client_app)
    res.json({user: user});
});
