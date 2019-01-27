import { connect } from "react-redux";
import { signIn, logout} from "../actions";
import SignIn from "../components/SignIn";

const mapStateToProps = state => ({
  errorMessage: state.users.errorMessage,
  authenticated: state.users.authenticated
});

const mapDispatchToProps = dispatch => ({
  handleSignIn: (username, password) => dispatch(signIn(username, password, "")), // no email on sign-in
  handleLogout: () => dispatch(logout()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
