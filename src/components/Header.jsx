import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Refresh from "@material-ui/icons/Refresh";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Info from "@material-ui/icons/Info";
import InformationDialog from "./InformationDialog";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    color: "primary"
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Header extends React.Component {
  state = {
    anchorEl: null,
    informationDialog: false
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleInformationDialog = () => {
    this.setState({informationDialog: !this.state.informationDialog});
  }

  handleRefresh = () => {
    if (this.props.ingame) {
      this.props.handleFetchGame(this.props.gamename, this.props.token);
    } else {
      this.props.handleFetchGames(this.props.username, this.props.token);
    }
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              className={classes.backButton}
              onClick={this.handleGoBack}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              component={Link}
              to={"/"}
            >
              Payword
            </Typography>
            {this.props.authenticated && (
              <div>
                <IconButton color="inherit" onClick={this.handleInformationDialog}>
                  <Info />
                </IconButton>
                <IconButton color="inherit" onClick={this.handleRefresh}>
                  <Refresh />
                </IconButton>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem
                    component={Link}
                    to="/sign-in"
                    onClick={() => {
                      this.handleClose();
                      this.props.handleLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleClose}
                    component={Link}
                    to="/user-settings"
                  >
                    Account Settings
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <InformationDialog
          open={this.state.informationDialog}
          handleClose={this.handleInformationDialog}
        />
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
