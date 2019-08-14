import React, { Component } from 'react'
import axios from 'axios';
import './BuildingPage.css';

export default class BuildingPage extends Component {
    constructor(){
        super();
        this.state = {
            building: {rooms:[]},
            newRoom: null
        }
    }

    componentDidMount() {
        const buildingId = window.location.pathname.split('/')[2];
        axios.get(`/buildings/${buildingId}`)
        .then(res => {
            this.setState({
                building: res.data
            })
        });
    }

    onClickListItem(room) {
        const building = this.state.building;
        const index = building.rooms.indexOf(room);
        building.rooms.splice(index, 1);
        this.setState({building: building});
    }

    onChangeInput(value) {
        this.setState({
            newRoom: value
       });
    }

    onClickAddButton() {
        const newRoom = this.state.newRoom;
        if(newRoom === null || newRoom == 0){

        } else {
            const building = this.state.building;
            building.rooms.push(parseInt(newRoom,10));
            this.setState({building: building});
        }
    }

    onClickSaveButton() {
        const buildingId = window.location.pathname.split('/')[2];
        const building = this.state.building;

        console.log(building);
        axios.put(`/buildings/${buildingId}`, { building })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })

        this.props.history.push('/buildings');
        
    }

    render() {
        const rooms = this.state.building.rooms.map(room =>
            <li className="list-group-item" key={room.toString()} onClick={(room) => this.onClickListItem(room)}>{room}</li>
        );

        //console.log(this.state.building.rooms)
        return (
            <div className="list-container">
                <ul className="list-group">
                    {rooms}
                </ul>
                <input type="number" onChange={e => this.onChangeInput(e.target.value)} className="form-control" placeholder="Dodaj nowe pomieszczenie" aria-label="Nowe" aria-describedby="basic-addon1"/>
                <button type="button" className="btn btn-info" onClick={() => this.onClickAddButton()}>Dodaj</button>
                <br/>
                <br/>
                <button type="button" className="btn btn-info" onClick={() => this.onClickSaveButton()}>Zapisz</button>
            </div>
        )
    }
}
