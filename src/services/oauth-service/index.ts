import { oauthRepository } from "@/repositories/oauth-repository";
import { randomUUID } from "crypto";
import userRepository from "@/repositories/user-repository";
import sessionRepository from "@/repositories/session-repository";
import jwt from "jsonwebtoken"; 

async function loginUserWithGitHub(code: string) {
  let email;
  const token = await oauthRepository.exchangeCodeForAccessToken(code) as string; // get github token
  const { data } = await oauthRepository.GitHubProfile(token); // use github token
  if (data.email === null) {
    const getGithubMail = await oauthRepository.getEmailFromGithub(token); // use github token
    email = getGithubMail;
  } else {
    email = data.email;
  }
  const randomID = randomUUID();

  const checkUser = await userRepository.findByEmail(email);

  if (!checkUser) {
    const user = {
      email: email,
      password: randomID,
    };
    const createdUser = await userRepository.create(user);

    // Generate JWT token
    const jwttoken = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET);
    await sessionRepository.create({
      token,
      userId: createdUser.id,
    });

    return jwttoken as string;
  } 
  const jwttoken: string = jwt.sign({ userId: checkUser.id }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId: checkUser.id,
  });
  console.log(jwttoken);

  return { token: jwttoken }; // JWTtoken
}

async function getUserProfileFromGithub(token: string) {
  const profile = await oauthRepository.GitHubProfile(token);
  return profile;
}
const oAuthService = {
  loginUserWithGitHub,
  getUserProfileFromGithub
};
export default oAuthService;
