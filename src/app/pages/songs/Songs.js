import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import SongModel from "../../model/SongModel.js";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderIcon from "@material-ui/icons/Folder";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { capitalize } from "@material-ui/core/utils/helpers";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";

import PropTypes from "prop-types";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <DeleteIcon />, name: "Delete" }
];

class Songs extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    let model = new SongModel();
    model.search().then(data => this.setState({ list: data }));

    this.context.router.history.push("/songs");
  }

  handleClick(obj) {
    console.log(obj);
    this.setState({ selectedItem: obj });
  }

  state = {
    direction: "up",
    open: false,
    hidden: false,
    list: []
  };

  render() {
    if (this.state.selectedItem) {
      let target = "/songs/detail/" + this.state.selectedItem.songID;
      return <Redirect to={target} />;
    }

    return (
      <div>
        <List>
          {this.state.list.map((item, index) => (
            <ListItem
              button
              key={item.songID}
              onClick={this.handleClick.bind(this, item)}
            >
              <ListItemIcon>
                <ShareIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} secondary={item.artist} />
              <NavigateNextIcon />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default Songs;
