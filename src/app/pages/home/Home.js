import React from "react";

import TileContainer from "../../components/TileContainer";
import Tile from "../../components/Tile";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { unstable_Box as Box } from "@material-ui/core/Box";

import GuitarixAppBar, { Left, Right, Center } from "../../components/GuitarixAppBar.js";

import TuneIcon from "@material-ui/icons/Tune";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import SettingsIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import GuitarixModel from "../../model/GuitarixModel.js";

import PropTypes from "prop-types";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { title: "Live", route: "/", description: "b", id: 1, icon: style => <PlayCircleFilledIcon style={style} /> },
        { title: "Songs", route: "/songs", description: "d", id: 2, icon: style => <QueueMusicIcon style={style} /> },
        { title: "Banks", route: "/banks", description: "b", id: 3, icon: style => <EditIcon style={style} /> },
        { title: "Tuner", route: "/", description: "d", id: 4, icon: style => <TuneIcon style={style} /> },
        { title: "Rack", route: "/rack", description: "b", id: 5, icon: style => <PlayCircleFilledIcon style={style} /> },
        { title: "Plugins", route: "/plugins", description: "b", id: 6, icon: style => <PlayCircleFilledIcon style={style} /> }
      ],
      version: ""
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    let model = new GuitarixModel();
    model.getVersion().then(data => {
      this.setState({ version: data["result"][2] });
    });
  }

  handleClick(item) {
    this.context.router.history.push(item.route);
  }

  render() {
    return (
      <div>
        <GuitarixAppBar>
          <Center>
            <Typography variant="h6">Guitarix Remote {this.state.version}</Typography>
          </Center>
          <Right>
            <Button>Settings</Button>
          </Right>
        </GuitarixAppBar>

        <Box display="flex" justifyContent="center">
          <TileContainer>
            {this.state.items.map(item => (
              <Tile key={item.id} title={item.title} onClick={this.handleClick.bind(this, item)} icon={item.icon} />
            ))}
          </TileContainer>
        </Box>
      </div>
    );
  }
}

export default Home;
