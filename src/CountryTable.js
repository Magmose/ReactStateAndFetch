import React, { Component } from "react";

const ROWS = 4;

function TableHead({ labels }) {
  return labels.map((label, index) => <th key={index}>{label}</th>);
}

function TableBody({ countries }) {
  return countries.map((country, index) => (
    <tr key={index}>
      <td>{SingletableEntry(country.name)}</td>
      <td>{SingletableEntry(country.capital)}</td>
      <td>{SingletableEntry(country.region)}</td>
      <td>{SingletableEntry(country.population)}</td>
      <td>{SingletableEntry(country.area)}</td>
      <td>{SingletableEntry(country.timezones)}</td>
      <td>{SingletableEntry(country.borders)}</td>
      <td>{SingletableEntry(country.topLevelDomain)}</td>
      <td>{SingletableEntry(country.currencies)}</td>
      <td>{SingletableEntry(country.languages)}</td>
    </tr>
  ));
}

function SingletableEntry(element) {
  if (Array.isArray(element) && element.length > 1) {
    return element[0] + "(+" + (element.length - 1) + ")";
  } else {
    return element;
  }
}

class CountryTable extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }
  nextPage() {
    if (this.state.page <= ROWS) {
      this.setState({ page: ++this.state.page });
    }
  }
  lastPage() {
    if (this.state.page >= 2) {
      this.setState({ page: --this.state.page });
    }
  }
  render() {
    return (
      <div>
        <button onClick={() => this.lastPage()}>Before</button>
        <button onClick={() => this.nextPage()}>Next</button>
        <div>
          {this.state.page}/{Math.ceil(this.props.countries.length / ROWS)}
        </div>

        <table className="table">
          <thead>
            <tr>
              <TableHead labels={this.props.labels} />
            </tr>
          </thead>
          <tbody>
            <TableBody
              countries={this.props.countries.slice(
                (this.state.page - 1) * ROWS,
                this.state.page * ROWS
              )}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
export default CountryTable;
