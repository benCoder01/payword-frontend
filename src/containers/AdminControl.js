import { connect } from "react-redux";
import AdminControl from "../components/AdminControl";

const mapStateToProps = state => ({
  username: state.users.username,
  game: state.games.game
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminControl);
