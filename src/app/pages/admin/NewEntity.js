import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";

import SongModel from "../../model/SongModel.js";

class NewEntity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      artist: ""
    };
  }

  handleClick = () => event => {
    console.log(event.target);
    console.log(this.state);

    let model = new SongModel();
    model.createSong(this.state);
  };

  handleChangeName = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeArtist = artist => event => {
    this.setState({ [artist]: event.target.value });
  };

  render() {
    return (
      <div>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">New Song</FormLabel>
          <FormGroup>
            <TextField label="Name" value={this.state.name} onChange={this.handleChangeName("name")} margin="normal" />
            <TextField label="Künstler" value={this.state.artist} onChange={this.handleChangeArtist("artist")} margin="normal" />
            <Button onClick={this.handleClick()}>Speichern</Button>
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

export default NewEntity;
