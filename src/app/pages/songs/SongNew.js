import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import PropTypes from "prop-types"; // You need to add this dependency

import SongModel from "../../model/SongModel.js";

class SongNew extends React.Component {
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

  componentDidMount() {}

  isDetailMode = () => {
    return this.props.match.params.id ? true : false;
  };

  handleClick = () => event => {
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
    let text = "New Song";
    if (this.isDetailMode()) {
      text = "Edit Song: " + this.props.match.params.id;
    }
    return (
      <div>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">{text}</FormLabel>
          <FormGroup>
            <TextField label="Name" value={this.state.name} onChange={this.handleChangeName("name")} margin="normal" />
            <TextField label="Künstler" value={this.state.artist} onChange={this.handleChangeArtist("artist")} margin="normal" />
            <Button onClick={this.handleClick()}>Speichern</Button>
            <Button className="button icon-left" onClick={this.context.router.history.goBack}>
              Back
            </Button>
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

export default SongNew;
