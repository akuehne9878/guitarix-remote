import React from "react";

class Topic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h3>Requested Param: {this.props.match.params.id}</h3>;
  }
}

export default Topic;
