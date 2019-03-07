import React from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { BrowserHistory } from "react-router";

import { unstable_Box as Box } from "@material-ui/core/Box";

import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

import PrimaryMenu from "./PrimaryMenu";
import SongsMenu from "../pages/songs/SongsMenu";
import SongNewMenu from "../pages/songs/SongNewMenu";
import PropTypes from "prop-types";

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
  }
};

class Shell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      primaryMenu: false
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  togglePrimaryMenu = () => {
    if (this.state.primaryMenu === true) {
      this.setState({
        primaryMenu: false
      });
    } else {
      this.setState({
        primaryMenu: true
      });
    }
  };

  renderBackButton = () => {
    if (this.context.router.history.location.pathname !== "/") {
      return (
        <IconButton color="inherit" aria-label="Menu" onClick={this.back.bind(this)}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      );
    }
    return <div />;
  };

  renderPrimaryMenuButton = () => {
    if (this.context.router.history.location.pathname === "/") {
      return (
        <IconButton color="inherit" aria-label="Menu" onClick={this.togglePrimaryMenu.bind(this)}>
          <MenuIcon />
        </IconButton>
      );
    }

    return <div />;
  };

  back = () => {
    this.context.router.history.goBack();
  };

  render() {
    return (
      <div>
        <div>
          <AppBar position="fixed" color="default">
            <Box display="flex" justifyContent="flex-start">
              <Box display="flex" justifyContent="flex-start" width="75%">
                <Toolbar>
                  {this.renderBackButton()}
                  {this.renderPrimaryMenuButton()}
                  <Typography variant="h6" color="inherit">
                    Pi
                  </Typography>
                </Toolbar>
              </Box>
              <Box display="flex" justifyContent="flex-end" width="25%">
                <Toolbar>
                  <Route exact path="/songs" component={SongsMenu} />
                  <Route exact path="/songs/new" component={SongNewMenu} />
                </Toolbar>
              </Box>
            </Box>
          </AppBar>
          <PrimaryMenu open={this.state.primaryMenu} onToggle={this.togglePrimaryMenu.bind(this)} />
        </div>

        <Box  height="400px" marginTop="80px" marginLeft="30px" marginRight="30px">
          <div>{this.props.children}</div>
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(Shell);
