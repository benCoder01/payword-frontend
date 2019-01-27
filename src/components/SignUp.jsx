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
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

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
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 2,
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
  },
  clearIcon: {
    color: red[500]
  },
  doneIcon: {
    color: green[500]
  },
  secondaryControls: {
    marginTop: theme.spacing.unit
  }
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      passwordOne: "",
      passwordTwo: "",
      email: "" // not required
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.handleLogout();
    }
  }

  async handleSubmit(event) {
    event.preventDefault(); // avoid reloading
    // test email

    this.props.handleSignUp(
      this.state.username,
      this.state.passwordOne,
      this.state.email
    );
  }

  emailValid() {
    if (this.state.email !== "") {
      return this.state.email.match(
        // eslint-disable-next-line
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    } else return true;
  }

  handleChange = prop => event => {
    this.setState({
      //[prop]: event.target.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      [prop]: event.target.value
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
            Sign Up
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
                autoFocus
              />
            </FormControl>
            <Typography variant="subtitle1">
              Your Password should at least contain: <br />
            </Typography>

            <Grid container>
              <Grid item>
                {this.state.passwordOne.length >= 8 ? (
                  <DoneIcon className={classes.doneIcon} />
                ) : (
                  <ClearIcon className={classes.clearIcon} />
                )}
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">8 Characters</Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                {this.state.passwordOne.match(/(?=.*\d)/) ? (
                  <DoneIcon className={classes.doneIcon} />
                ) : (
                  <ClearIcon className={classes.clearIcon} />
                )}
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">At least one number</Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item>
                {this.state.passwordOne.match(/([a-zA-Z])/) ? (
                  <DoneIcon className={classes.doneIcon} />
                ) : (
                  <ClearIcon className={classes.clearIcon} />
                )}
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">At least one letter</Typography>
              </Grid>
            </Grid>

            <FormControl margin="normal" required fullWidth>
              <PasswordInput
                name="passwordOne"
                handleChange={this.handleChange.bind(this)}
                password={this.state.passwordOne}
                label={"Password"}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <PasswordInput
                name="passwordTwo"
                handleChange={this.handleChange.bind(this)}
                password={this.state.passwordTwo}
                error={this.state.passwordOne !== this.state.passwordTwo}
                label={"Retype Password"}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email (Optional)</InputLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange("email")}
                autoComplete="email"
                error={!this.emailValid()}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={
                this.state.passwordOne !== this.state.passwordTwo ||
                this.state.passwordOne === "" ||
                !this.state.passwordOne.match(/(?=.*\d)/) ||
                this.state.passwordOne.length < 8 ||
                this.state.passwordOne.length > 300 ||
                !this.state.passwordOne.match(/([a-zA-Z])/) ||
                this.state.username === "" ||
                !this.emailValid()
              }
            >
              Sign up
            </Button>
            <Grid container justify="space-between" className={classes.secondaryControls}>
              <Grid item xs>
                <Button
                  component={Link}
                  to="/sign-in"
                  className={classes.buttonSignIn}
                  variant="outlined"
                  fullWidth
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
