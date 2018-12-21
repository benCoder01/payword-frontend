import { connect } from 'react-redux'
import CreateGameDialog from '../components/CreateGameDialog'
import {createNewGame } from "../actions"

const mapStateToProps = (state) => ({
    username: state.users.username,
    token: state.users.token,
})

const mapDispatchToProps = (dispatch) => ({
    handleCreateGame: (gamename, username, token) => dispatch(createNewGame(gamename, username, token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateGameDialog)