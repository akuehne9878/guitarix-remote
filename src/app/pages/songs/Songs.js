import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { unstable_Box as Box } from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import SongModel from "../../model/SongModel.js";
import GuitarixAppBar, { Left, Right, Center } from "../../components/GuitarixAppBar.js";
import TileContainer from "../../components/TileContainer";
import Tile from "../../components/Tile";

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    let model = new SongModel();
    model.search().then(data => this.setState({ list: data }));
  }

  handleClick(obj) {
    this.setState({ selectedItem: obj });
  }

  handleNewSong = () => {
    this.context.router.history.push("/songs/new");
  };

  render() {
    if (this.state.selectedItem) {
      this.context.router.history.push("/songs/detail/" + this.state.selectedItem.songID);
    }

    return (
      <div>
        <GuitarixAppBar>
          <Left>
            <Button onClick={this.context.router.history.goBack}>
              <NavigateBeforeIcon />
              Back
            </Button>
          </Left>
          <Center>
            <Typography variant="h6">Songs</Typography>
          </Center>
          <Right>
            <Button variant="contained" color="primary" onClick={this.handleNewSong.bind(this)}>
              <AddIcon />
              New Song
            </Button>
          </Right>
        </GuitarixAppBar>

        <Box display="flex" justifyContent="center">
          <TileContainer>
            {this.state.list.map((item, index) => (
              <Tile key={item.songID} route={"/songs/detail/" + item.songID} title={item.name} description={item.artist} onClick={this.handleClick.bind(this, item)} />
            ))}
          </TileContainer>
        </Box>
      </div>
    );
  }
}

export default Songs;
