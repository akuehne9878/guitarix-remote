import React from "react";
import { Route } from "react-router-dom";

import AdminLaunchpad from "./AdminLaunchpad";
import NewEntity from "./NewEntity";

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.url}/entity`} component={NewEntity} />
        <Route exact path={this.props.match.url} component={AdminLaunchpad} />
      </div>
    );
  }
}

export default Admin;
