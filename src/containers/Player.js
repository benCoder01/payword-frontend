import { connect } from 'react-redux'
import Player from '../components/Player'

import {increment, decrement} from "../actions"

const mapStateToProps = (state) => ({
    username: state.users.username,
    gamename: state.games.gamename,
    token: state.users.token,
    game: state.games.game
})

const mapDispatchToProps = (dispatch) => ({
    handleIncrement: (username, categoryname, gamename, game, token) => dispatch(increment(username, categoryname, gamename, game, token)),
    handleDecrement: (username, categoryname, gamename, game, token) => dispatch(decrement(username, categoryname, gamename, game, token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)