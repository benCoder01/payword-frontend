import { connect } from "react-redux";
import Game from "../components/Game";
import { fetchGame } from "../actions";

const mapStateToProps = state => ({
  game: state.games.game,
  username: state.users.username,
  token: state.users.token,
  gamename: state.games.gamename,
  authenticated: state.users.authenticated,

});

const mapDispatchToProps = dispatch => ({
  handleFetchGame: (gamename, token) => dispatch(fetchGame(gamename, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
