import { connect } from 'react-redux'
import Player from '../components/Player'

import {increment, decrement} from "../actions"

const mapStateToProps = (state) => ({
    username: state.users.username,
    gamename: state.games.gamename,
    token: state.users.token
})

const mapDispatchToProps = (dispatch) => ({
    handleIncrement: (username, categoryname, gamename, token) => dispatch(increment(username, categoryname, gamename, token)),
    handleDecrement: (username, categoryname, gamename, token) => dispatch(decrement(username, categoryname, gamename, token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)