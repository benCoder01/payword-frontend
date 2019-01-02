import { connect } from 'react-redux'
import GamesList from '../components/GamesList'

import {openGame, createNewGame, fetchGames, closeGame} from "../actions"

const mapStateToProps = (state) => ({
    games: state.games.games,
    token: state.users.token,
    username: state.users.username,
    authenticated: state.users.authenticated,
})

const mapDispatchToProps = (dispatch) => ({
    handleFetchGames: (username, token) => dispatch(fetchGames(username, token)),
    handleCreateNewGame: (gamename) => dispatch(createNewGame(gamename)),
    handleOpenGameView: (gamename, token) => dispatch(openGame(gamename, token)),
    handleCloseGameView: () => dispatch(closeGame())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamesList)