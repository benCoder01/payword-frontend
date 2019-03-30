import { connect } from "react-redux";
import SortMenu from "../components/SortMenu";
import {sortUsersByMoney, sortUsersByName} from "../actions"

const mapStateToProps = state => ({
    game: state.games.game
});

const mapDispatchToProps = dispatch => ({
    handleSortByMoney: (game) => dispatch(sortUsersByMoney(game)),
    handleSortByName: (game) => dispatch(sortUsersByName(game))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortMenu);
