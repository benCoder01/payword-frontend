import { connect } from 'react-redux'
import RemoveCategoryDialog from '../components/RemoveCategoryDialog'
import {removeCategory } from "../actions"

const mapStateToProps = (state) => ({
    gamename: state.games.gamename,
    token: state.users.token,
})

const mapDispatchToProps = (dispatch) => ({
    handleRemoveCategory: (categoryname, gamename, token) => dispatch(removeCategory(categoryname, gamename, token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoveCategoryDialog)