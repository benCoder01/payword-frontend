import { connect } from 'react-redux'
import ChangeEmailDialog from '../components/ChangeEmailDialog'
import {changeMail } from "../actions"

const mapStateToProps = (state) => ({
    token: state.users.token,
    username: state.users.username
})

const mapDispatchToProps = (dispatch) => ({
    handleChangeMail: (username, mail, token) => dispatch(changeMail(username, mail, token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeEmailDialog)