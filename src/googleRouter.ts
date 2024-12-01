import {Request, Router} from "express";
import {config} from "dotenv"

config()

export const googleRouter = Router()

googleRouter.get('/', async (req: Request, res): Promise<any> => {

    // Step 4: Send to Authorization Server - Authorization Code, Client ID, Client Secret
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const code = req.query.code as string;

    if (!client_id || !client_secret) {
        return res.status(400).json({error: "Missing client_id or client_secret"});
    }

    const body = new URLSearchParams({
        client_id,
        client_secret,
        code,
        redirect_uri: "http://localhost:5173/auth/google",
        grant_type: "authorization_code",
    });


    const tokenResponse = await fetch(
        "https://oauth2.googleapis.com/token",
        {
            method: 'POST',
            body,
            headers: {"Content-Type": "application/x-www-form-urlencoded", Accept: 'application/x-www-form-urlencoded'},
        }
    );

    // Step 5: Receive Access Token from Authorization Server
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Step 6: Sending Access Token to Resource Server
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {Authorization: `Bearer ${accessToken}`},
    })

    // Step 7: Receive User data from Resource Server
    const user = await userResponse.json();

    // Step 8: Send User data to Owner (client_app)
    res.json({user: user});
    // res.json({tokenData});
});
