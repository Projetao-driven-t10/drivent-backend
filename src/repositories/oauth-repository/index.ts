import axios from "axios";
import qs from "qs";

type GitHubParamsForAccessToken = {
  code: string;
  grant_type: string;
  redirect_uri: string;
  client_id: string;
  client_secret: string;
}

async function exchangeCodeForAccessToken(code: string) { 
  const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";

  const { REDIRECT_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
  const params: GitHubParamsForAccessToken = {
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URL,
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET
  };

  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  const { access_token } = qs.parse(data);
  return Array.isArray(access_token) ? access_token.join("") : access_token;
}
async function GitHubProfile(token: string) {
  const profile = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return profile;
}
async function getEmailFromGithub(token: string) {
  const email = await axios.get("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return email.data[0].email;
}

export const oauthRepository = {
  exchangeCodeForAccessToken,
  GitHubProfile,
  getEmailFromGithub,
};
