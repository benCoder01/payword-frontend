import {
  FETCH_USER_TOKEN_BEGIN,
  FETCH_USER_TOKEN_SUCCES,
  FETCH_USER_TOKEN_ERROR,
  FETCH_SIGN_UP_BEGIN,
  FETCH_SIGN_UP_SUCCESS,
  FETCH_SIGN_UP_ERROR,
  LOGOUT,
  FETCH_DELETE_ACCOUNT_BEGIN,
  FETCH_DELETE_ACCOUNT_SUCCESS,
  FETCH_DELETE_ACCOUNT_ERROR,
  FETCH_CHANGE_MAIL_BEGIN,
  FETCH_CHANGE_MAIL_SUCCESS,
  FETCH_CHANGE_MAIL_ERROR,
  FETCH_SEND_PASSWORD_RESET_BEGIN,
  FETCH_SEND_PASSWORD_RESET_SUCCESS,
  FETCH_SEND_PASSWORD_RESET_ERROR
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
    case FETCH_DELETE_ACCOUNT_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case FETCH_DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case FETCH_CHANGE_MAIL_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_CHANGE_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_CHANGE_MAIL_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case FETCH_SEND_PASSWORD_RESET_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_SEND_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "Email has been sent"
      };
    case FETCH_SEND_PASSWORD_RESET_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };

    default:
      return state;
  }
};

export default users;
