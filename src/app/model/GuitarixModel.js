class GuitarixModel {
  constructor() {
    this.baseUrl = "https://freewheeling-ape-4267.dataplicity.io/api/";
  }

  performGET(api) {
    return fetch(this.baseUrl + api, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }

  getVersion() {
    return this.performGET("getversion");
  }

  getBanks() {
    return this.performGET("banks");
  }
}

export default GuitarixModel;
