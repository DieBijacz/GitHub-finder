import { data } from "autoprefixer";
import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

// GET SEARCHED USERS
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const resp = await github.get(`/search/users?${params}`);
  return resp.data.items;
};

// GET SINGLE USER AND USER REPOS
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
