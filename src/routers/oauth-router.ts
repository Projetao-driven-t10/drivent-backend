
import { Router } from "express";
import { githubLogin } from "@/controllers";

const oauthRouter = Router();

//GitHub Login oAuth
oauthRouter.post("/login", githubLogin);

export { oauthRouter };
