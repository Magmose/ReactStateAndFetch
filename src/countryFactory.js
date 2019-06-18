//Add imports here
const labelsURL = "http://localhost:3333/labels";
const countriesURL = "http://localhost:3333/countries";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

class CountryFactory {
  constructor() {
    this.labels = [];
    this.countries = [];
  }

  getLabels = async () => {
    const options = await this.makeOptions("GET");
    const json = fetch(labelsURL, options).then(handleHttpErrors);
    return json;
  };

  getCountries = async () => {
    const options = await this.makeOptions("GET");
    const json = fetch(countriesURL, options).then(handleHttpErrors);
    return json;
  };

  makeOptions(method, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
}

export default new CountryFactory();
