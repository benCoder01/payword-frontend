import { connect } from 'react-redux'
import AddCategoryDialog from '../components/AddCategoryDialog'
import {addCategory } from "../actions"

const mapStateToProps = (state) => ({
    gamename: state.games.gamename,
    token: state.users.token,
})

const mapDispatchToProps = (dispatch) => ({
    handleAddCategory: (categoryname, gamename, token ) => dispatch(addCategory(categoryname, gamename, token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCategoryDialog)