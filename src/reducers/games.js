import {
  FETCH_GAMES_BEGIN,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_ERROR,
  FETCH_GAME_BEGIN,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_ERROR,
  OPEN_GAME_VIEW,
  CLOSE_GAME_VIEW,
  FETCH_CREATE_GAME_BEGIN,
  FETCH_CREATE_GAME_SUCCESS,
  FETCH_CREATE_GAME_ERROR,
  FETCH_SUBSCRIBE_GAME_BEGIN,
  FETCH_SUBSCRIBE_GAME_SUCCESS,
  FETCH_SUBSCRIBE_GAME_ERROR,
  FETCH_UNSUBSCRIBE_GAME_BEGIN,
  FETCH_UNSUBSCRIBE_GAME_SUCCESS,
  FETCH_UNSUBSCRIBE_GAME_ERROR,
  FETCH_ADD_CATEGORY_GAME_BEGIN,
  FETCH_ADD_CATEGORY_GAME_SUCCESS,
  FETCH_ADD_CATEGORY_GAME_ERROR,
  FETCH_REMOVE_CATEGORY_GAME_BEGIN,
  FETCH_REMOVE_CATEGORY_GAME_SUCCESS,
  FETCH_REMOVE_CATEGORY_GAME_ERROR,
  FETCH_INCREMENT_BEGIN,
  FETCH_INCREMENT_SUCCESS,
  FETCH_INCREMENT_ERROR,
  FETCH_DECREMENT_BEGIN,
  FETCH_DECREMENT_SUCCESS,
  FETCH_DECREMENT_ERROR,
  LOGOUT,
  CLOSE_ERROR_MESSAGE
} from "../actions";

const initalState = {
  ingame: false,
  games: [],
  game: {},
  errorMessage: "",
  loading: false
};

const games = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_GAMES_BEGIN:
      return {
        ...state,
        loading: true
      };

    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        games: action.games
      };
    case FETCH_GAMES_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case FETCH_GAME_BEGIN:
      return {
        ...state,
        loading: true
      };

    case FETCH_GAME_SUCCESS:
      let game = action.game;
      game["users"] = mapGameToUsers(game);
      return {
        ...state,
        loading: false,
        game: game
      };
    case FETCH_GAME_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case OPEN_GAME_VIEW:
      return {
        ...state,
        ingame: true,
        gamename: action.gamename
      };
    case CLOSE_GAME_VIEW:
      return {
        ...state,
        ingame: false,
        gamename: "",
        game: {}
      };

    case FETCH_CREATE_GAME_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_CREATE_GAME_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case FETCH_CREATE_GAME_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case FETCH_SUBSCRIBE_GAME_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUBSCRIBE_GAME_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case FETCH_SUBSCRIBE_GAME_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case FETCH_UNSUBSCRIBE_GAME_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_UNSUBSCRIBE_GAME_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case FETCH_UNSUBSCRIBE_GAME_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case FETCH_ADD_CATEGORY_GAME_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_ADD_CATEGORY_GAME_SUCCESS:
      let gameCategoryAdd = action.game;
      gameCategoryAdd["users"] = mapGameToUsers(gameCategoryAdd);
      return {
        ...state,
        loading: false,
        game: gameCategoryAdd
      };
    case FETCH_ADD_CATEGORY_GAME_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case FETCH_REMOVE_CATEGORY_GAME_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_REMOVE_CATEGORY_GAME_SUCCESS:
      let gameCategoryRemove = action.game;
      gameCategoryRemove["users"] = mapGameToUsers(gameCategoryRemove);
      return {
        ...state,
        loading: false,
        game: gameCategoryRemove
      };
    case FETCH_REMOVE_CATEGORY_GAME_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case FETCH_INCREMENT_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_INCREMENT_SUCCESS:
      let gameIncrement = action.game;
      gameIncrement["users"] = mapGameToUsers(gameIncrement);
      return {
        ...state,
        loading: false,
        game: gameIncrement
      };
    case FETCH_INCREMENT_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case FETCH_DECREMENT_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_DECREMENT_SUCCESS:
      let gameDecrement = action.game;
      gameDecrement["users"] = mapGameToUsers(gameDecrement);
      return {
        ...state,
        loading: false,
        game: gameDecrement
      };
    case FETCH_DECREMENT_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.message
      };
    case LOGOUT:
      return {
        ingame: false,
        games: [],
        game: {},
        errorMessage: ""
      };
    case CLOSE_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: ""
      };
    }
    default:
      return state;
  }
};

const mapGameToUsers = game => {
  let users = [];

  for (let i = 0; i < game.members.length; i++) {
    let user = {};

    for (let j = 0; j < game.categories.length; j++) {
      let value = findUserValueForCategory(game, game.members[i], j);
      user[game.categories[j].Name] = value;
    }

    user["username"] = game.members[i];

    users.push(user);
  }
  return users;
};

/*

Game before conversion

game: {
  categories: [
    {
      name: "",
      usercounter: [
        {username: "", value: 0},
        {username: "", value: 0}
      ]
    }
  ]
}

Game after conversion
game: {
  categories: [...]
  users: [
    {
      scheisse: 1,
      schwierig: 3,
      ...
      username: ""
    }, ....
  ]
}
*/

const findUserValueForCategory = (game, username, categoryIndex) => {
  for (let i = 0; i < game.categories[categoryIndex].Usercounter.length; i++) {
    if (game.categories[categoryIndex].Usercounter[i].Username === username) {
      return game.categories[categoryIndex].Usercounter[i].Value;
    }
  }
  return 0;
};

export default games;
