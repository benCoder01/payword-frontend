import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect, Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  caption: {
    marginTop: theme.spacing.unit * 3
  },
  buttonSignIn: {
    marginLeft: 0
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.handleLogout();
    }
  }

  handleSubmit(event) {
    event.preventDefault(); // avoid reloading

    this.props.handleSignIn(this.state.username, this.state.password);
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    });
  };

  render() {
    const { classes } = this.props;
    if (this.props.authenticated) {
      return <Redirect push to={"/games"} />;
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Typography color="error" align="center" variant="h6">
              {this.props.errorMessage}
            </Typography>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange("username")}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <PasswordInput
                name="password"
                handleChange={this.handleChange.bind(this)}
                password={this.state.password}
                label={"Enter Password"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={
                this.state.password === "" || this.state.username === ""
              }
            >
              Sign in
            </Button>

            <Typography className={classes.caption} variant="subtitle1">
              New here ?
              <Button
                component={Link}
                to="/sign-up"
                color="secondary"
                className={classes.buttonSignIn}
              >
                Create Accout
              </Button>
            </Typography>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
