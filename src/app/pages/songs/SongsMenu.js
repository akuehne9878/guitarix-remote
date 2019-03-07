import React from "react";

import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class SongsMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleNewSong = () => {
    this.setState({ newSong: true });
  };

  render() {
    const { anchorEl } = this.state;
    const { newSong } = this.state;

    if (newSong) {
      return <Redirect to="/songs/new" />;
    }

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleNewSong}>
          New Song
        </Button>
      </div>
    );
  }
}

export default SongsMenu;
