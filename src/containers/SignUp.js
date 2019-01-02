import { connect } from "react-redux";
import { signUp, logout } from "../actions";
import SignUp from "../components/SignUp";

const mapStateToProps = state => ({
  errorMessage: state.users.errorMessage,
  authenticated: state.users.authenticated

});

const mapDispatchToProps = dispatch => ({
  handleSignUp: (username, password) => dispatch(signUp(username, password)),
  handleLogout: () => dispatch(logout()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
