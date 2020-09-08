import React, { Component } from "react";
import CountriesNav from "./Components/CountriesNav";
import CountryInfo from "./Components/CountryInfo";
import Home from './Components/Home'
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  state = {
    countries: [],
    searchCountry: "",
    numcountries: "",
  };

  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((result) => {
        const resCountries = [...result.data];
        this.setState({
          countries: resCountries,
          numcountries: resCountries.length,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      searchCountry: value,
      numcountries: this.state.countries.length,
    });
    axios.get("https://restcountries.eu/rest/v2/all").then((info) => {
      const resCountries = [...info.data];
      if (value === "") {
        this.setState({
          countries: resCountries,
          numcountries: resCountries.length,
        });
      } else {
        const myRegex = new RegExp(value, "i");
        const result = resCountries.filter((elem) => myRegex.test(elem.name));
        this.setState({
          countries: result,
          numcountries: result.length,
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <CountriesNav
          countryData={this.state.countries}
          datasearch={this.state.searchCountry}
          changedata={this.handleChange}
          numcountries={this.state.numcountries}
        />
        <div className="home">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:id" component={CountryInfo} />
          </Switch>
          <p className="property">2020 | Made by <a href="https://robcg1102.netlify.app/" target="_blank" rel="noopener noreferrer">robcg1102</a></p>
        </div>
      </div>
    );
  }
}
