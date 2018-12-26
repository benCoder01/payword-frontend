import { connect } from 'react-redux'
import App from '../components/App'
import {closeErrorMessage} from "../actions"

const mapStateToProps = (state) => ({
    authenticated: state.users.authenticated,
    username: state.users.username,
    ingame: state.games.ingame,
    game: state.games.game,
    errorMessage: state.games.errorMessage,
    loadingGames: state.games.loading,
    loadingUsers: state.users.loading,
})

const mapDispatchToProps = (dispatch) => ({
    handleCloseErrorMessage: () => dispatch(closeErrorMessage())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)