import { connect } from 'react-redux'
import LeaveGameDialog from '../components/LeaveGameDialog'
import {unsubscribeFromGame } from "../actions"

const mapStateToProps = (state) => ({
    username: state.users.username,
    token: state.users.token,
})

const mapDispatchToProps = (dispatch) => ({
    handleLeaveGame: (gamename, username, token) => dispatch(unsubscribeFromGame(gamename, username, token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeaveGameDialog)