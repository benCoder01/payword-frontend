import { connect } from "react-redux";
import { signUp } from "../actions";
import SignUp from "../components/SignUp";

const mapStateToProps = state => ({
  errorMessage: state.users.errorMessage
});

const mapDispatchToProps = dispatch => ({
  handleSignUp: (username, password) => dispatch(signUp(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
