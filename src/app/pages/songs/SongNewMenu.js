import React from "react";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";

class SongNewMenu extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSave = () => {
    this.context.router.history.goBack();
  };

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleSave}>
          Save
        </Button>
      </div>
    );
  }
}

export default SongNewMenu;
