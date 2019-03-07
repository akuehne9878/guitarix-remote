class Model {
  constructor(entityName) {
    this.entityName = entityName;
    this.baseUrl = "https://m548qmkzpp.sse.codesandbox.io/";
  }

  createObject(object) {
    return fetch(this.baseUrl + this.entityName, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ object: object })
    });
  }

  getObject(id) {
    return fetch(this.baseUrl + this.entityName + "/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }

  updateObject(id, object) {
    console.log(
      "Update object: " +
        this.entityName +
        " - " +
        id +
        " " +
        JSON.stringify({ object: object })
    );

    return fetch(this.baseUrl + this.entityName + "/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ object: object })
    }).then(response => response.json());
  }

  searchObject(object) {
    return fetch(this.baseUrl + this.entityName, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }
}

export default Model;
