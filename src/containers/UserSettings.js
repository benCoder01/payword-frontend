import { connect } from 'react-redux'
import UserSettings from '../components/UserSettings'

import {} from "../actions"

const mapStateToProps = (state) => ({
    username: state.users.username,
    token: state.users.token
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSettings)