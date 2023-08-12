import { Request, Response } from "express";
import httpStatus from "http-status";
import oAuthService from "../services/oauth-service";

export async function githubLogin(req: Request, res: Response) {
  const code = req.body.code;
  try {
    const token = await oAuthService.loginUserWithGitHub(code);
    res.status(httpStatus.OK).send({ token });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.status(500).send(error);
  }
}
