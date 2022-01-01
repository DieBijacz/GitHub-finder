import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

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

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
