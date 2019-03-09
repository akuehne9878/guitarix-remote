import React from "react";
import { Route } from "react-router-dom";

import TileContainer from "../../components/TileContainer";
import Tile from "../../components/Tile";

class AdminLaunchpad extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      tiles: [{ title: "Entitäten", description: "b", id: 1 }, { title: "test2", description: "d", id: 2 }]
    };
  }

  render() {
    let tiles = this.state.tiles;
    return (
      <div>
        <TileContainer>
          {tiles.map(tile => (
            <Tile key={tile.id} title={tile.title} route="/admin/entity" />
          ))}
        </TileContainer>
      </div>
    );
  }
}

export default AdminLaunchpad;
