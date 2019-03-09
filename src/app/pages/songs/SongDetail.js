import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { unstable_Box as Box } from "@material-ui/core/Box";
import PropTypes from "prop-types";
import SaveIcon from "@material-ui/icons/Save";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import TextField from "@material-ui/core/TextField";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import SongModel from "../../model/SongModel.js";
import GuitarixAppBar, { Left, Right, Center } from "../../components/GuitarixAppBar.js";

class SongDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      artist: ""
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    let model = new SongModel();
    model.get(this.props.match.params.id).then(data => {
      this.setState(data[0]);
    });
  }

  handleClick() {
    var that = this;

    let model = new SongModel();
    model
      .update(this.state.songID, this.state)
      .then(function() {
        that.context.router.history.goBack();
      })
      .catch(err => console.error("Caught error: ", err));
  }

  handleChangeName = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeArtist = artist => event => {
    this.setState({ [artist]: event.target.value });
  };

  render() {
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
            <Typography variant="h6">Edit Song</Typography>
          </Center>
          <Right>
            <Button variant="contained" color="primary" onClick={this.handleClick.bind(this)}>
              <SaveIcon />
              Update
            </Button>
          </Right>
        </GuitarixAppBar>

        <Box display="flex" justifyContent="center">
          <FormControl component="fieldset" margin="normal">
            <FormGroup>
              <TextField label="Name" value={this.state.name} onChange={this.handleChangeName("name")} margin="normal" />
              <TextField label="Artist" value={this.state.artist} onChange={this.handleChangeArtist("artist")} margin="normal" />
            </FormGroup>
          </FormControl>
        </Box>
      </div>
    );
  }
}

export default SongDetail;
