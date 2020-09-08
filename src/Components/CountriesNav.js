import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Country = styled.div`
  color: black;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #86c4ba;
  margin: 10px;
  border-radius: 8px 0;
  padding-bottom: 10px;
`;

export default class CountriesNav extends Component {
  render() {
    return (
      <div className="listCountries">
        <div className="searchBar">
          <input
            type="text"
            onChange={this.props.changedata}
            value={this.props.datasearch}
            placeholder="Search country"
          />
          <p className="result">{this.props.numcountries} results</p>
        </div>
        {this.props.countryData.map((country, index) => {
          return (
            <Link
              key={index}
              to={`/${country.alpha3Code}`}
              style={{ textDecoration: "none" }}
            >
              <Country className="cardCountries">
                <p>{country.name}</p>
                <img src={country.flag} alt={index} className="flagnav" />
              </Country>
            </Link>
          );
        })}
      </div>
    );
  }
}
