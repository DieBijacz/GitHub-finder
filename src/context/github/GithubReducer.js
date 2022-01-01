// takes curr state and action(dispatch)
// returns new state depends on what action was called
const githubReducer = (state, action) => {
  // checks action.type(from dispatch)
  // and performs action in called case
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "GET_USER_REPOS":
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        laoding: true,
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
      };
    // if no action.type matches case
    // then return just state with no changes
    default:
      return state;
  }
};

export default githubReducer;
