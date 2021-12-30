import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // initial state for reducer
  const initialState = {
    users: [],
    loading: false,
  };

  //         destruction            ||    reducer   ||   initial state
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get initial users (for testing only)
  const fetchUsers = async () => {
    setLoading();
    // Fetch users using authorization token
    const resp = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await resp.json();

    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  // SET LOADING
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
