import { connect } from "react-redux";
import { signIn} from "../actions";
import SignIn from "../components/SignIn";

const mapStateToProps = state => ({
  errorMessage: state.users.errorMessage,
  authenticated: state.users.authenticated
});

const mapDispatchToProps = dispatch => ({
  handleSignIn: (username, password) => dispatch(signIn(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
