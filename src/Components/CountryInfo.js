import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CountryInfo extends Component {
  state = {
    countryInfo: {
      borders: [],
      latlng: [],
      currencies: [
        {
          code: "",
          name: "",
          symbol: "",
        },
      ],
    },
  };

  componentDidMount() {
    const alphacode = this.props.match.params.id;
    axios
      .get(`https://restcountries.eu/rest/v2/alpha/${alphacode}`)
      .then((dataCountry) => {
        console.log(dataCountry);
        this.setState({
          countryInfo: dataCountry.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const alphacode = this.props.match.params.id;
      axios
        .get(`https://restcountries.eu/rest/v2/alpha/${alphacode}`)
        .then((dataCountry) => {
          this.setState({
            countryInfo: dataCountry.data,
          });
          console.log(this.state.countryInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="allinfo">
        <div className="infocountry">
          <div className="nameCountry">
            <h2>Country: {this.state.countryInfo.name}</h2>
            <p>Capital: {this.state.countryInfo.capital}</p>
            <img
              src={this.state.countryInfo.flag}
              alt="..."
              className="flagInfo"
            />
          </div>
          <div className="moreinfo">
            <div>
              <h3>Population</h3>
              <p>{this.state.countryInfo.population}</p>
              <h3>Region</h3>
              <p>{this.state.countryInfo.subregion}</p>
              <h3>Area</h3>
              <p>
                {this.state.countryInfo.area} km<sup>2</sup>
              </p>
              <h3>Currencie</h3>
              <p>{this.state.countryInfo.currencies[0].name}</p>
              <a
                href={`https://www.google.com.mx/maps/place/${this.state.countryInfo.latlng[0]}, ${this.state.countryInfo.latlng[1]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Maps
              </a>
            </div>
            <div className="borders">
              <h3>Borders</h3>
              <ul>
                {this.state.countryInfo.borders.map((elem, index) => {
                  return (
                    <li key={index}>
                      <Link to={`/${elem}`} style={{ textDecoration: "none" }}>
                        {elem}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
