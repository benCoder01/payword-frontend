import { connect } from 'react-redux'
import DeleteAccountDialog from '../components/DeleteAccountDialog'
import {deleteAccount } from "../actions"

const mapStateToProps = (state) => ({
    token: state.users.token,
    username: state.users.username
})

const mapDispatchToProps = (dispatch) => ({
    handleDeleteAccount: (username, password, token) => dispatch(deleteAccount(username, password, token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteAccountDialog)