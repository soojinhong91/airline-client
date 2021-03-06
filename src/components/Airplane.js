import React, { Component } from 'react';
import Flight from './Flight';
import SeatMap from './SeatMap';
import axios from 'axios';
import _ from 'underscore';

const SERVER_URL1 = 'http://localhost:3000/airplanes.json'

class Airplane extends Component {
  constructor(){
    super();
    this.state = {
      info: []
    };

  this.fetchInfo(SERVER_URL1);

  this.saveInfo = this.saveInfo.bind(this);
  this.fetchInfo = this.fetchInfo.bind(this);
}

fetchInfo (url) {
  console.log(url);
  axios.get(url).then((results) => {
    console.log(results);
    this.setState({info: results.data});
    setTimeout(this.fetchInfo, 5000);
  });
}

  saveInfo(from, to) {
    axios.get(`${SERVER_URL1}/${from}/${to}`).then((result) => {
      this.setState({info: [...this.state.info, result.data]});
    });
  }

  render() {
    return(
      <div>
        <p>====================Airplane.js====================</p>
        <SearchForm onSubmit={this.findFlights}/>
        <Flights info={ this.state.info }/>
      </div>
    );
  }
}

class SearchForm extends Component {
  constructor(){
    super();
    this.state = {from: '', to: ''};
    this._handleInputTo = this._handleInputTo.bind(this);
    this._handleInputFrom = this._handleInputFrom.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleInputFrom(event){
    this.setState({from:event.target.value})
  }
  _handleInputTo(event) {
    this.setState({to:event.target.value})
  }
  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.to, this.state.from);
  }

  render() {
    return(
      <div>
      <p>Please search for a flight</p>
        <form onSubmit={this._handleSubmit}>
          From: <input type="text" placeholder="JFK" required onInput={this._handleInputFrom}/>
          To: <input type="text" placeholder="SFO" required onInput={this._handleInputTo}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

const Flights = (props) => {
  return (
    <div>
      { props.info.map( (i) => <p>{i.id}: Plane name: {i.name}, Rows: {i.rows} Columns: {i.columns}</p>) }



    </div>
  );
};



export default Airplane;
