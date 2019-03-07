import React from "react";
import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TuneIcon from "@material-ui/icons/Tune";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import SettingsIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import AppsIcon from "@material-ui/icons/Apps";

class PrimaryMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  toggletest() {
    this.props.onToggle();
  }

  render() {
    const list1 = [
      {
        name: "Home",
        route: "/",
        icon: () => <AppsIcon />
      }
    ];

    const list2 = [
      {
        name: "Live",
        route: "/",
        icon: () => <PlayCircleFilledIcon />
      },
      {
        name: "Setlist",
        route: "/",
        icon: () => <QueueMusicIcon />
      },
      {
        name: "Songs",
        route: "/songs",
        icon: () => <QueueMusicIcon />
      },
      {
        name: "Tuner",
        route: "/",
        icon: () => <TuneIcon />
      },
      {
        name: "Presets",
        route: "/",
        icon: () => <EditIcon />
      },
      {
        name: "Settings",
        route: "/",
        icon: () => <SettingsIcon />
      },
      {
        name: "Admin",
        route: "/admin",
        icon: () => <SettingsIcon />
      }
    ];

    const sideList = (
      <div>
        <List>
          {list1.map((item, index) => (
            <ListItem button key={item.name} component={Link} to={item.route}>
              <ListItemIcon> {item.icon()} </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {list2.map((item, index) => (
            <ListItem button key={item.name} component={Link} to={item.route}>
              <ListItemIcon> {item.icon()} </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <Drawer open={this.props.open} onClose={this.toggletest.bind(this)}>
        <div tabIndex={0} role="button" onClick={this.toggletest.bind(this)} onKeyDown={this.toggletest.bind(this)}>
          {sideList}
        </div>
      </Drawer>
    );
  }
}

export default PrimaryMenu;
