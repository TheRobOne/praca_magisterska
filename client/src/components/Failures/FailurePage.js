import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deleteFailure, updateFailure } from '../../actions/failureActions';
import './FailurePage.css';

class FailurePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentBuilding: '',
        buildings: [],
        rooms: [],
        currentRoom: '',
        description: '',
        title: '',
        failureState: '',
        authorEmail: '',
        buttonValue: 'Zmień stan usterki',
        isEditingEnable: true
      };
  
      this.onChangeSelectedBuilding = this.onChangeSelectedBuilding.bind(this);
      this.onChangeSelectedRoom = this.onChangeSelectedRoom.bind(this);
      this.onChangeSelectedFailureState = this.onChangeSelectedFailureState.bind(this);
      this.enableEditing = this.enableEditing.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.removeFailure = this.removeFailure.bind(this);
    }

    componentDidMount() {
        const failureId = window.location.pathname.split('/')[2];
        axios.get(`/failures/${failureId}`)
        .then( res => {
            const { building, roomNumber, description, title, state, authorEmail } = res.data;
            this.setState({currentBuilding: building, currentRoom: roomNumber, description: description, title: title, failureState: state, authorEmail: authorEmail});
        });

        axios.get('/buildings/')
        .then(res => {
            this.setState({buildings: res.data, rooms: res.data[0].rooms})
        })
    }

    onSubmit(event){
        event.preventDefault();
        const failureId = window.location.pathname.split('/')[2];
        const updatedFailure = {
            state: this.state.failureState,
            roomNumber: this.state.currentRoom,
            building: this.state.currentBuilding,
            authorEmail: this.state.authorEmail,
            title: this.state.title,
            description: this.state.description
        }

        this.props.updateFailure(failureId, updatedFailure, this.props.history);
    }

    removeFailure(){
        const failureId = window.location.pathname.split('/')[2];
        this.props.deleteFailure(failureId, this.props.history);
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

    onChangeSelectedFailureState(event) {
        event.preventDefault();
        this.setState({failureState: event.target.value});
    }

    onClickHandler(failureId) {
        this.props.deleteFailure(failureId, this.props.history)
    }

    onChangeHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    enableEditing(event) {
        const isEnable = this.state.isEditingEnable;
        let buttonValue = this.state.buttonValue;
        if(buttonValue === 'Zmień stan usterki') buttonValue = 'Edytuj usterkę';
        else buttonValue = 'Zmień stan usterki';

        this.setState({isEditingEnable: !isEnable, buttonValue: buttonValue});
    }

    render() {
        const buildingsList = this.state.buildings.map(building => 
          <option key={building._id}>{building.name}</option>
        )
    
        const roomsList = this.state.rooms.map(room => 
          <option key={room.number}>{room.number}</option>
        )

        return (
            <React.Fragment>
            <form className="new-failure-form" onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col">
                        <label> Włącz lub wyłącz edycję pól:</label>
                    </div>
                    <label className="switch">
                        <input type="checkbox" onClick={this.enableEditing}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="row">
                    <div className="col">
                        <label> Tytuł: </label>
                    </div>
                        <input className="form-control" 
                            type="text" 
                            rows="4" 
                            cols="50" 
                            name="title" 
                            value={this.state.title}
                            disabled={this.state.isEditingEnable}
                            onChange={event => this.onChangeHandler(event)}
                        />
                </div>
                <br />
                <div className="row">
                    <div className="col">
                    <label> Budynek: </label>
                    </div>
                    <select 
                        className="form-control" 
                        value={this.state.currentBuilding} 
                        onChange={this.onChangeSelectedBuilding} 
                        disabled={this.state.isEditingEnable}
                    >
                        {buildingsList}
                    </select>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                    <label> Sala: </label>
                    </div>
                    <select 
                        className="form-control" 
                        value={this.state.currentRoom} 
                        onChange={this.onChangeSelectedRoom}    
                        disabled={this.state.isEditingEnable}
                    >
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
                    disabled={this.state.isEditingEnable}
                    onChange={event => this.onChangeHandler(event)}
                    />
                </div>
                <br />
                <div className="row">
                    <div className="col">
                    <label> Status: </label>
                    </div>
                    <select 
                        className="form-control" 
                        value={this.state.failureState}
                        onChange={this.onChangeSelectedFailureState}
                    >
                        <option>Nowa</option>
                        <option>W trakcie naprawy</option>
                        <option>Naprawiona</option>
                        <option>Nie będzie naprawiana</option>
                    </select>
                </div>
                <br />
                <input type="submit" className="btn btn-info btn-block mt-4 submit btn-lg" value={this.state.buttonValue}/>
                <input type="submit" className="btn btn-danger btn-block mt-4 btn-lg" value="Usuń usterkę" onClick={this.removeFailure}/>
            </form>
            </React.Fragment>
        )
    }
}

FailurePage.propTypes = {
    deleteFailure: PropTypes.func.isRequired,
    updateFailure: PropTypes.func.isRequired
  }

const mapStateToProps = state => ({
    user: state.auth.user
  });
export default connect(mapStateToProps, { deleteFailure, updateFailure })(withRouter(FailurePage));
