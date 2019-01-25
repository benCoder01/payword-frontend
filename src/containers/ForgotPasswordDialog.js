import { connect } from 'react-redux'
import ForgotPasswordDialog from '../components/ForgotPasswordDialog'
import {resetPassword } from "../actions"

const mapStateToProps = (state) => ({
    username: state.users.username
})

const mapDispatchToProps = (dispatch) => ({
    handleSendMail: (username, mail) => dispatch(resetPassword(username, mail))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordDialog)