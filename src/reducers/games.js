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
  CLOSE_ERROR_MESSAGE,
  FETCH_CHANGE_MAIL_SUCCESS,
  FETCH_CHANGE_MAIL_ERROR,
  SORT_BY_MONEY,
  SORT_BY_NAME
} from "../actions";

const initalState = {
  ingame: false,
  games: [],
  game: {},
  errorMessage: "",
  loading: false,
  sortedByValue: true,
  sortedByName: false
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
      game["users"] = mapGameToUsers(
        game,
        state.sortedByName,
        state.sortedByValue
      );

      console.log(state.sortedByName);
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
      gameCategoryAdd["users"] = mapGameToUsers(
        gameCategoryAdd,
        state.sortedByName,
        state.sortedByValue
      );
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
      gameCategoryRemove["users"] = mapGameToUsers(
        gameCategoryRemove,
        state.sortedByName,
        state.sortedByValue
      );
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
      let gameIncrement = action.game;
      gameIncrement["users"] = mapGameToUsers(
        gameIncrement,
        state.sortedByName,
        state.sortedByValue
      );
      return {
        ...state,
        loading: true,
        game: gameIncrement
      };
    case FETCH_INCREMENT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case FETCH_INCREMENT_ERROR:
      let gameReset = action.game;
      gameReset["users"] = mapGameToUsers(
        gameReset,
        state.sortedByName,
        state.sortedByValue
      );
      return {
        ...state,
        loading: false,
        errorMessage: action.message,
        game: gameReset
      };
    case FETCH_DECREMENT_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_DECREMENT_SUCCESS:
      let gameDecrement = action.game;
      gameDecrement["users"] = mapGameToUsers(
        gameDecrement,
        state.sortedByName,
        state.sortedByValue
      );
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
        errorMessage: "",
        sortedByValue: true,
        sortedByName: false
      };
    case CLOSE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: ""
      };
    case FETCH_CHANGE_MAIL_ERROR:
      return {
        ...state,
        errorMessage: action.message
      };
    case FETCH_CHANGE_MAIL_SUCCESS:
      return {
        ...state,
        errorMessage: "Success"
      };
    case SORT_BY_MONEY:
      let sortedGameMoney = { ...action.game };
      sortedGameMoney["users"] = sortUsersByValue(sortedGameMoney.users);
      return {
        ...state,
        game: sortedGameMoney,
        sortedByName: false,
        sortedByValue: true
      };
    case SORT_BY_NAME:
      let sortedGameName = { ...action.game };
      sortedGameName["users"] = sortUsersByName(sortedGameName.users);
      return {
        ...state,
        game: sortedGameName
      };
    default:
      return state;
  }
};

const sortUsersByName = users => {
  users.sort((user1, user2) => user1.username.localeCompare(user2.username));
  return users;
};

const sortUsersByValue = users => {
  users.sort((user1, user2) => {
    let valueUser1 = 0;

    for (const key in user1) {
      if (key === "username") {
        continue;
      }

      valueUser1 += user1[key];
    }

    let valueUser2 = 0;

    for (const key in user2) {
      if (key === "username") {
        continue;
      }

      valueUser2 += user2[key];
    }

    return (valueUser1 - valueUser2) * -1;
  });

  return users;
};

const mapGameToUsers = (game, sortedByName, sortedByValue) => {
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
  if (sortedByName) {
    users = sortUsersByName(users);
  } else if (sortedByValue) {
    users = sortUsersByValue(users);
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
