import React, { Component } from 'react';

import Flight from './Flight';
import axios from 'axios';
import _ from 'underscore';

class SeatMap extends Component {

  constructor() {
    super();
      this.state = {
      seat: [
        ['A1','B1','C1', 'D1',],
        ['A2','B2','C2', 'D2',],
        ['A3','B3','C3', 'D3',],
        ['A4','B4','C4', 'D4',],
        ['A5','B5','C5', 'D5']
      ],
      seatAvailable: [
        'A1','B1','C1', 'D1',
        'A2','B2','C2', 'D2',
        'A3','B3','C3', 'D3',
        'A4','B4','C4', 'D4',
        'A5','B5','C5', 'D5'
      ],
      seatReserved: []
    }
  }
  onClickData(seat) {
    if(this.state.seatReserved.indexOf(seat) > -1 ) {
      this.setState({
        seatAvailable: this.state.seatAvailable.concat(seat),
        seatReserved: this.state.seatReserved.filter(res => res != seat)
      })
    } else {
      this.setState({
        seatReserved: this.state.seatReserved.concat(seat),
        seatAvailable: this.state.seatAvailable.filter(res => res != seat)
      })
    }
  }
  render() {
    return (
      <div>
        <h1>Seat Reservation System</h1>
        <DrawGrid
          seat = { this.state.seat }
          available = { this.state.seatAvailable }
          reserved = { this.state.seatReserved }
          onClickData = { this.onClickData.bind(this) }
          />
      </div>
    )
  }
}

class DrawGrid extends Component {
  render() {
    return (
       <div className="container">
        <h2></h2>
        <table className="grid">
          <tbody>
            {this.props.seat.map( row =>
              <tr>
                { row.map( element =>
                  <td
                    className={this.props.reserved.indexOf(element) > -1? 'reserved': 'available'}
                    key={element} onClick = {e => this.onClickSeat(element)}>{element} </td>) }
              </tr>
            )}
          </tbody>
        </table>
        <td><AvailableList available = { this.props.available } /></td>
        <td><ReservedList reserved = { this.props.reserved } /></td>
       </div>
    )
  }
  onClickSeat(seat) {
    this.props.onClickData(seat);
  }
}
class AvailableList extends Component {
  render() {
    const seatCount = this.props.available.length;
    return(
      <div className="left">
        <h4>Available Seats: ({seatCount == 0? 'No seats available' : seatCount})</h4>
        <ul>
          {this.props.available.map( res => <li key={res} >{res}</li> )}
        </ul>
      </div>
    )
  }
}
class ReservedList extends Component {
  render() {
    return(
      <div className="right">
        <h4>Reserved Seats: ({this.props.reserved.length})</h4>
        <ul>
          { this.props.reserved.map(res => <li key={res} >{res}</li>) }
        </ul>
      </div>
    )
  }
}
export default SeatMap;
