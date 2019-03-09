import React from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { BrowserHistory } from "react-router";

import { unstable_Box as Box } from "@material-ui/core/Box";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

import PropTypes from "prop-types";

export class Left extends React.Component {
  static displayName = "Left";
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export class Center extends React.Component {
  static displayName = "Center";
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export class Right extends React.Component {
  static displayName = "Right";
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

class GuitarixAppBar extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div>
        <div>
          <AppBar color="default">
            <Box display="flex" justifyContent="flex-start">
              <Box display="flex" justifyContent="flex-start" width="25%">
                <Toolbar>
                  <div>{React.Children.toArray(this.props.children).filter(child => child.type.displayName === "Left")}</div>
                </Toolbar>
              </Box>
              <Box display="flex" justifyContent="center" width="50%">
                <Toolbar>
                  <div>{React.Children.toArray(this.props.children).filter(child => child.type.displayName === "Center")}</div>
                </Toolbar>
              </Box>
              <Box display="flex" justifyContent="flex-end" width="25%">
                <Toolbar>
                  <div>{React.Children.toArray(this.props.children).filter(child => child.type.displayName === "Right")}</div>
                </Toolbar>
              </Box>
            </Box>
          </AppBar>
        </div>
      </div>
    );
  }
}

export default GuitarixAppBar;
