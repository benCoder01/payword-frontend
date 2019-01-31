export const FETCH_USER_TOKEN_BEGIN = "FETCH_USER_TOKEN_BEGIN";
export const FETCH_USER_TOKEN_SUCCES = "FETCH_USER_TOKEN_SUCCES";
export const FETCH_USER_TOKEN_ERROR = "FETCH_USER_TOKEN_ERROR";

export const FETCH_SIGN_UP_BEGIN = "FETCH_SIGN_UP_BEGIN";
export const FETCH_SIGN_UP_SUCCESS = "FETCH_SIGN_UP_SUCCESS";
export const FETCH_SIGN_UP_ERROR = "FETCH_SIGN_UP_ERROR";

export const FETCH_CHANGE_PASSWORD_BEGIN = "FETCH_CHANGE_PASSWORD_BEGIN";
export const FETCH_CHANGE_PASSWORD_SUCCESS = "FETCH_CHANGE_PASSWORD_SUCCESS";
export const FETCH_CHANGE_PASSWORD_ERROR = "FETCH_CHANGE_PASSWORD_ERROR";

export const FETCH_DELETE_ACCOUNT_BEGIN = "FETCH_DELETE_ACCOUNT_BEGIN";
export const FETCH_DELETE_ACCOUNT_SUCCESS = "FETCH_DELETE_ACCOUNT_SUCCESS";
export const FETCH_DELETE_ACCOUNT_ERROR = "FETCH_DELETE_ACCOUNT_ERROR";

export const LOGOUT = "LOGOUT";

export const FETCH_CHANGE_MAIL_BEGIN = "FETCH_CHANGE_MAIL_BEGIN";
export const FETCH_CHANGE_MAIL_SUCCESS = "FETCH_CHANGE_MAIL_SUCCESS";
export const FETCH_CHANGE_MAIL_ERROR = "FETCH_CHANGE_MAIL_ERROR";

export const FETCH_SEND_PASSWORD_RESET_BEGIN =
  "FETCH_SEND_PASSWORD_RESET_BEGIN";
export const FETCH_SEND_PASSWORD_RESET_SUCCESS =
  "FETCH_SEND_PASSWORD_RESET_SUCCESS";
export const FETCH_SEND_PASSWORD_RESET_ERROR =
  "FETCH_SEND_PASSWORD_RESET_ERROR";

// User management
export const logout = () => ({
  type: LOGOUT
});

const getAddress = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://payword.benediktricken.de/api"
  }else {
    return "http://localhost:3333"
  }
}

export const signIn = (username, password, mail) => {
  const handleErrors = resp => {
    if (resp.status === 400) throw Error("Wrong username or password!");
    else if (resp.status !== 200) throw Error("Oohps! Something went wrong!");

    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_USER_TOKEN_BEGIN
    });
    fetch(getAddress() + "/users/sign-in", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_USER_TOKEN_SUCCES,
          username: username,
          token: resp.token
        });

        /*
        On the sign-up process, the user can type in his email. 
        However the request for saving the email differs from the sign-up request. 
        Because you need a token for saving the email, 
        the request can only be sent after the sign-in.
        */
        if (mail !== "") dispatch(changeMail(username, mail, resp.token));
      })
      .catch(err => {
        dispatch({
          type: FETCH_USER_TOKEN_ERROR,
          message: err.message
        });
      });
  };
};

export const deleteAccount = (username, password, token) => {
  const handleErrors = resp => {
    if (resp.status === 400) throw Error("Wrong username or password!");
    else if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_DELETE_ACCOUNT_BEGIN
    });
    fetch(getAddress() + "/users/delete", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_DELETE_ACCOUNT_SUCCESS
        });
        dispatch(logout());
      })
      .catch(err => {
        dispatch({
          type: FETCH_DELETE_ACCOUNT_ERROR,
          message: err.message
        });
      });
  };
};

export const changeMail = (username, mail, token) => {
  const handleErrors = resp => {
    if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_CHANGE_MAIL_BEGIN
    });
    fetch(getAddress() + "/users/mail/update-mail", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      },
      body: JSON.stringify({
        username: username,
        mail: mail
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_CHANGE_MAIL_SUCCESS
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_CHANGE_MAIL_ERROR,
          message: err.message
        });
      });
  };
};

export const resetPassword = (username, mail) => {
  const handleErrors = resp => {
    console.log(resp);
    if (resp.status === 400) throw Error("Wrong username or email");
    else if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_SEND_PASSWORD_RESET_BEGIN
    });
    fetch(getAddress() + "/users/mail/reset-password", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        mail: mail
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_SEND_PASSWORD_RESET_SUCCESS
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_SEND_PASSWORD_RESET_ERROR,
          message: err.message
        });
      });
  };
};

export const signUp = (username, password, mail) => {
  const handleErrors = resp => {
    if (resp.status === 400) throw Error("Choose another username");
    else if (resp.status !== 200) throw Error("Oohps! Something went wrong!");

    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_SIGN_UP_BEGIN
    });
    fetch(getAddress() + "/users/sign-up", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_SIGN_UP_SUCCESS
        });
        dispatch(signIn(username, password, mail));
      })
      .catch(err => {
        dispatch({
          type: FETCH_SIGN_UP_ERROR,
          message: err.message
        });
      });
  };
};

// games management
export const FETCH_GAMES_BEGIN = "FETCH_GAMES_BEGIN";
export const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS";
export const FETCH_GAMES_ERROR = "FETCH_GAMES_ERROR";

export const FETCH_GAME_BEGIN = "FETCH_GAME_BEGIN";
export const FETCH_GAME_SUCCESS = "FETCH_GAME_SUCCESS";
export const FETCH_GAME_ERROR = "FETCH_GAME_ERROR";

export const OPEN_GAME_VIEW = "OPEN_GAME_VIEW";
export const CLOSE_GAME_VIEW = "CLOSE_GAME_VIEW";

export const FETCH_CREATE_GAME_BEGIN = "FETCH_CREATE_GAME_BEGIN";
export const FETCH_CREATE_GAME_SUCCESS = "FETCH_CREATE_GAME_SUCCESS";
export const FETCH_CREATE_GAME_ERROR = "FETCH_CREATE_GAME_ERROR";

export const FETCH_SUBSCRIBE_GAME_BEGIN = "FETCH_SUBSCRIBE_GAME_BEGIN";
export const FETCH_SUBSCRIBE_GAME_SUCCESS = "FETCH_SUBSCRIBE_GAME_SUCCESS";
export const FETCH_SUBSCRIBE_GAME_ERROR = "FETCH_SUBSCRIBE_GAME_ERROR";

export const FETCH_UNSUBSCRIBE_GAME_BEGIN = "FETCH_UNSUBSCRIBE_GAME_BEGIN";
export const FETCH_UNSUBSCRIBE_GAME_SUCCESS = "FETCH_UNSUBSCRIBE_GAME_SUCCESS";
export const FETCH_UNSUBSCRIBE_GAME_ERROR = "FETCH_UNSUBSCRIBE_GAME_ERROR";

export const FETCH_ADD_CATEGORY_GAME_BEGIN = "FETCH_ADD_CATEGORY_GAME_BEGIN";
export const FETCH_ADD_CATEGORY_GAME_SUCCESS =
  "FETCH_ADD_CATEGORY_GAME_SUCCESS";
export const FETCH_ADD_CATEGORY_GAME_ERROR = "FETCH_ADD_CATEGORY_GAME_ERROR";

export const FETCH_REMOVE_CATEGORY_GAME_BEGIN =
  "FETCH_REMOVE_CATEGORY_GAME_BEGIN";
export const FETCH_REMOVE_CATEGORY_GAME_SUCCESS =
  "FETCH_REMOVE_CATEGORY_GAME_SUCCESS";
export const FETCH_REMOVE_CATEGORY_GAME_ERROR =
  "FETCH_REMOVE_CATEGORY_GAME_ERROR";

export const FETCH_INCREMENT_BEGIN = "FETCH_INCREMENT_BEGIN";
export const FETCH_INCREMENT_SUCCESS = "FETCH_INCREMENT_SUCCESS";
export const FETCH_INCREMENT_ERROR = "FETCH_INCREMENT_ERROR";

export const FETCH_DECREMENT_BEGIN = "FETCH_DECREMENT_BEGIN";
export const FETCH_DECREMENT_SUCCESS = "FETCH_DECREMENT_SUCCESS";
export const FETCH_DECREMENT_ERROR = "FETCH_DECREMENT_ERROR";

export const CLOSE_ERROR_MESSAGE = "CLOSE_ERROR_MESSAGE";

export const fetchGames = (username, token) => {
  const handleErrors = resp => {
    if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_GAMES_BEGIN
    });
    fetch(getAddress() + "/games/user/" + username, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      }
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_GAMES_SUCCESS,
          games: resp
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_GAMES_ERROR,
          message: err.message
        });
      });
  };
};

export const fetchGame = (gamename, token) => {
  const handleErrors = resp => {
    if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_GAME_BEGIN
    });
    fetch(getAddress() + "/games/" + gamename, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      }
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_GAME_SUCCESS,
          game: resp
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_GAME_ERROR,
          message: err.message
        });
      });
  };
};

export const openGame = (gamename, token) => {
  return dispatch => {
    dispatch({
      type: OPEN_GAME_VIEW,
      gamename: gamename
    });
  };
};

export const closeGame = () => ({
  type: CLOSE_GAME_VIEW
});

export const createNewGame = (gamename, username, token) => {
  const handleErrors = resp => {
    if (resp.status === 400) throw Error("Game already exists.");
    else if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_CREATE_GAME_BEGIN
    });
    fetch(getAddress() + "/games/create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      },
      body: JSON.stringify({
        name: gamename,
        admin: username
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_CREATE_GAME_SUCCESS
        });

        dispatch(fetchGames(username, token));
      })
      .catch(err => {
        dispatch({
          type: FETCH_CREATE_GAME_ERROR,
          message: err.message
        });
      });
  };
};

export const subscribeToGame = (gamename, username, token) => {
  const handleErrors = resp => {
    if (resp.status === 400) throw Error("Game does not exist");
    else if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_SUBSCRIBE_GAME_BEGIN
    });
    fetch(getAddress() + "/games/enter", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      },
      body: JSON.stringify({
        username: username,
        game: gamename
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_SUBSCRIBE_GAME_SUCCESS
        });

        dispatch(fetchGames(username, token));
      })
      .catch(err => {
        dispatch({
          type: FETCH_SUBSCRIBE_GAME_ERROR,
          message: err.message
        });
      });
  };
};

export const unsubscribeFromGame = (gamename, username, token) => {
  const handleErrors = resp => {
    if (resp.status === 400)
      throw Error("You are the admin. You can´t leave the game.");
    if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_UNSUBSCRIBE_GAME_BEGIN
    });
    fetch(getAddress() + "/games/leave", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      },
      body: JSON.stringify({
        username: username,
        game: gamename
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_UNSUBSCRIBE_GAME_SUCCESS
        });

        dispatch(fetchGames(username, token));
      })
      .catch(err => {
        dispatch({
          type: FETCH_UNSUBSCRIBE_GAME_ERROR,
          message: err.message
        });
      });
  };
};

export const addCategory = (categoryname, gamename, token) => {
  const handleErrors = resp => {
    console.log(categoryname);
    if (resp.status === 400)
      throw Error("Category already exists in the game.");
    else if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_ADD_CATEGORY_GAME_BEGIN
    });
    fetch(getAddress() + "/games/category/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      },
      body: JSON.stringify({
        game: gamename,
        categoryname: categoryname
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_ADD_CATEGORY_GAME_SUCCESS,
          game: resp
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_ADD_CATEGORY_GAME_ERROR,
          message: err.message
        });
      });
  };
};

export const removeCategory = (categoryname, gamename, token) => {
  const handleErrors = resp => {
    if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_REMOVE_CATEGORY_GAME_BEGIN
    });
    fetch(getAddress() + "/games/category/remove", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      },
      body: JSON.stringify({
        game: gamename,
        categoryname: categoryname
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_REMOVE_CATEGORY_GAME_SUCCESS,
          game: resp
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_REMOVE_CATEGORY_GAME_ERROR,
          message: err.message
        });
      });
  };
};

export const increment = (username, categoryname, gamename, token) => {
  const handleErrors = resp => {
    if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_INCREMENT_BEGIN
    });
    fetch(getAddress() + "/games/increment", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      },
      body: JSON.stringify({
        game: gamename,
        categoryname: categoryname,
        username: username
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_INCREMENT_SUCCESS,
          game: resp
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_INCREMENT_ERROR,
          message: err.message
        });
      });
  };
};

export const decrement = (username, categoryname, gamename, token) => {
  const handleErrors = resp => {
    if (resp.status !== 200) throw Error("Oohps! Something went wrong!");
    return resp;
  };

  return async dispatch => {
    dispatch({
      type: FETCH_DECREMENT_BEGIN
    });
    fetch(getAddress() + "/games/decrement", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "BEARER " + token
      },
      body: JSON.stringify({
        game: gamename,
        categoryname: categoryname,
        username: username
      })
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(resp => {
        dispatch({
          type: FETCH_DECREMENT_SUCCESS,
          game: resp
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_DECREMENT_ERROR,
          message: err.message
        });
      });
  };
};

export const closeErrorMessage = () => ({
  type: CLOSE_ERROR_MESSAGE
});
