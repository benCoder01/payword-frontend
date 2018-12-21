import {
  FETCH_USER_TOKEN_BEGIN,
  FETCH_USER_TOKEN_SUCCES,
  FETCH_USER_TOKEN_ERROR,
  FETCH_SIGN_UP_BEGIN,
  FETCH_SIGN_UP_SUCCESS,
  FETCH_SIGN_UP_ERROR,
  LOGOUT,
} from "../actions";

const initalState = {
  authenticated: false,
  username: "",
  token: "",
  errorMessage: "", // error message during sign in/sign up
  loading: false
};

const users = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_USER_TOKEN_BEGIN:
      return {
        ...state,
        errorMessage: ""
      };
    case FETCH_USER_TOKEN_SUCCES:
      return {
        ...state,
        username: action.username,
        token: action.token,
        authenticated: true,
        errorMessage: ""
      };
    case FETCH_USER_TOKEN_ERROR:
      return {
        ...state,
        errorMessage: action.message
      };
    case LOGOUT:
      return {
        authenticated: false,
        username: "",
        token: "",
        errorMessage: ""
      };
    case FETCH_SIGN_UP_BEGIN:
      return {
        ...state
      };
    case FETCH_SIGN_UP_SUCCESS:
      return {
        ...state
      };
    case FETCH_SIGN_UP_ERROR:
      return {
        ...state,
        errorMessage: action.message
      };
    default:
      return state;
  }
};

export default users;
