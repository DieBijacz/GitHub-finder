import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // initial state for reducer
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  // useReducer(takes function what's gonna be perform on state (based on dispatch type)
  // to get new state and initial value)
  // and returns state and dispatch(what I call to update state)
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // GET SEARCHED USERS
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });

    const resp = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await resp.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // GET SEARCHED USER
  const searchUser = async (login) => {
    setLoading();
    const resp = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (resp.status === 404) {
      // if there is no resp
      window.location = "/notfound";
    } else {
      const data = await resp.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // GET USER REPOS
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const resp = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await resp.json();

    dispatch({
      type: "GET_USER_REPOS",
      payload: data,
    });
  };

  // CLEAR BUTTON
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  // SET LOADING
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        repos: state.repos,
        users: state.users,
        loading: state.loading,
        searchUsers,
        searchUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
