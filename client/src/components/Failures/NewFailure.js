import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { addFailure } from '../../actions/failureActions';
import "./NewFailure.css";

class NewFailure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBuilding: '',
      buildings: [],
      rooms: [],
      currentRoom: '',
      description: '',
      title: ''
    };

    this.onChangeSelectedBuilding = this.onChangeSelectedBuilding.bind(this);
    this.onChangeSelectedRoom = this.onChangeSelectedRoom.bind(this);
  }

  componentDidMount() {
    axios.get('/buildings/')
    .then(res => {
      console.log(res.data[0]);
      this.setState({buildings: res.data, currentBuilding: res.data[0].name, rooms: res.data[0].rooms, currentRoom: res.data[0].rooms[0].number})
    })
  }
  
  onChangeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangeSelectedBuilding(event) {
    event.preventDefault();
    const currentBuilding = this.state.buildings.filter(building => building.name === event.target.value);
    this.setState({currentBuilding: currentBuilding[0].name, rooms: currentBuilding[0].rooms, currentRoom: currentBuilding[0].rooms[0].number});
  }

  onChangeSelectedRoom(event) {
    event.preventDefault();
    this.setState({currentRoom: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    const date = new Date();
    const dateArray = [date.getDate(), date.getMonth()+1, date.getFullYear()]

    const newFailure = {
      roomNumber: this.state.currentRoom,
      building: this.state.currentBuilding,
      description: this.state.description,
      authorEmail: this.props.user.email,
      title: this.state.title,
      date: dateArray.join('.')
    };

    this.props.addFailure(newFailure, this.props.history);
  }

  render() {
    const buildingsList = this.state.buildings.map(building => 
      <option key={building._id}>{building.name}</option>
    )

    const roomsList = this.state.rooms.map(room => 
      <option key={room}>{room}</option>
    )

    return (
      <form className="new-failure-form" onSubmit={event => this.onSubmit(event)}>
        <div className="row">
            <div className="col">
              <label> Tytuł: </label>
            </div>
              <input className="form-control" 
                  type="text" 
                  rows="4" 
                  cols="50" 
                  name="title" 
                  onChange={event => this.onChangeHandler(event)}
              />
        </div>
        <br />
        <div className="row">
          <div className="col">
            <label> Budynek: </label>
          </div>
          <select className="form-control" id="select1" value={this.state.currentBuilding} onChange={this.onChangeSelectedBuilding}>
              {buildingsList}
          </select>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <label> Sala: </label>
          </div>
          <select className="form-control" id="select1" value={this.state.currentRoom} onChange={this.onChangeSelectedRoom}>
                {roomsList}
          </select>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <label> Opis usterki: </label>
          </div>
          <textarea
            className="form-control"
            rows="4"
            cols="80"
            id="description"
            value={this.state.description}
            name="description"
            onChange={event => this.onChangeHandler(event)}
          />
        </div>
        <br />
        <input type="submit" className="btn btn-info btn-block mt-4 submit btn-lg" value="Dodaj"/>
      </form>
    );
  }
}

NewFailure.propTypes = {
  addFailure: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { addFailure })(withRouter(NewFailure));
