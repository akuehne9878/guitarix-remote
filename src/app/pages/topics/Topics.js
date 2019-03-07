import React from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Topic from "./Topic";

class Topics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Topics</h2>

        <ul>
          <li>
            <Link to={`${this.props.match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/props-v-state`}>
              Props v. State
            </Link>
          </li>
        </ul>

        <Route path={`${this.props.match.path}/:id`} component={Topic} />
        <Route
          exact
          path={this.props.match.path}
          render={() => <h3>Please select a topic.</h3>}
        />
      </div>
    );
  }
}

export default Topics;
