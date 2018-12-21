import { connect } from 'react-redux'
import Header from '../components/Header'

import {fetchGames, fetchGame, logout} from "../actions"

const mapStateToProps = (state) => ({
    authenticated: state.users.authenticated,
    ingame: state.games.ingame,
    token: state.users.token,
    username: state.users.username,
    gamename: state.games.gamename
})

const mapDispatchToProps = (dispatch) => ({
    handleFetchGames: (username, token) => dispatch(fetchGames(username, token)),
    handleFetchGame: (gamename, token) => dispatch(fetchGame(gamename, token)),
    handleLogout: () => dispatch(logout()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)