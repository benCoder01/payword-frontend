import { connect } from 'react-redux'
import EnterGameDialog from '../components/EnterGameDialog'
import {subscribeToGame } from "../actions"

const mapStateToProps = (state) => ({
    username: state.users.username,
    token: state.users.token,
})

const mapDispatchToProps = (dispatch) => ({
    handleEnterGame: (gamename, username, token) => dispatch(subscribeToGame(gamename, username, token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnterGameDialog)