import React from "react";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";

class SongsMenu extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleNewSong = () => {
    this.context.router.history.push("/songs/new");
  };

  render() {
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
