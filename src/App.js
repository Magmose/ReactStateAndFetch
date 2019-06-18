import React, { Component } from "react";
import CountryTable from "./CountryTable";
import "./App.css";
import countryFactory from "./countryFactory";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { countries: [], labels: [] };
  }

  async componentDidMount() {
    const countries = await countryFactory.getCountries();
    const labels = await countryFactory.getLabels();
    this.setState({ countries, labels });
    console.log("First mount");

    setInterval(async () => {
      console.log("Update");
      const countries = await countryFactory.getCountries();
      const labels = await countryFactory.getLabels();
      this.setState({ countries, labels });
    }, 3000);
  }

  render() {
    if (this.state.countries.length === 0) {
      return <p> we are stil loading</p>;
    }
    return (
      <div>
        <div className="App-header">
          <h2>React, State, Fetch and Mobx</h2>
        </div>
        <div className="App-intro">
          <CountryTable
            countries={this.state.countries}
            labels={this.state.labels}
          />
        </div>
      </div>
    );
  }
}

export default App;
