import { connect } from "react-redux";
import { signUp, logout } from "../actions";
import SignUp from "../components/SignUp";

const mapStateToProps = state => ({
  errorMessage: state.users.errorMessage,
  authenticated: state.users.authenticated

});

const mapDispatchToProps = dispatch => ({
  handleSignUp: (username, password, mail) => dispatch(signUp(username, password, mail)),
  handleLogout: () => dispatch(logout()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
