import Model from "./Model.js";

class SongModel extends Model {
  constructor() {
    super("song");
  }

  createSong(song) {
    return super.createObject({
      artist: song.artist,
      name: song.name
    });
  }

  update(id, song) {
    return super.updateObject(id, song);
  }

  search(searchObject) {
    return super.searchObject(searchObject);
  }

  get(id) {
    return super.getObject(id);
  }

  delete(id) {
    return super.deleteObject(id);
  }
}

export default SongModel;
