class GuitarixModel {
  constructor() {
    this.baseUrl = "https://freewheeling-ape-4267.dataplicity.io/api/";
  }

  getVersion() {
    return this.performGET("getversion");
  }

  getBanks() {
    return this.performGET("banks");
  }

  getRackUnitOrder() {
    return this.performGET("get_rack_unit_order?params=0");
  }

  queryUnit(unit) {
    return this.performGET("queryunit?params=" + unit);
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
}

export default GuitarixModel;
