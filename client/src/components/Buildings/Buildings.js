import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Buildings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buildings: []
        }
    }

    componentDidMount() {
        axios.get('/buildings')
        .then(res => {
            this.setState({buildings: res.data});
        })
        .catch(err => {
            console.log(err);
        });

    }

    moveToBuildingPage(buildingId) {
        this.props.history.push(`/building/${buildingId}`);
    }

    render() {
        const cursorStyle = {cursor: 'pointer'}
        let buildings = this.state.buildings.map((building, index) => 
                <tr key={building._id} onClick={() => this.moveToBuildingPage(building._id)} style={cursorStyle}>
                    <th scope='row'>{index + 1}</th>
                    <td>{building.name}</td>
                </tr>
        );


        return (
            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Budynek</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.buildings === null ? null :
                             buildings
                        }
                    </tbody>
                </table>
                <Link to="/new-building"> 
                    <button type="button" className="btn btn-info">Dodaj budynek</button>
                </Link>
            </div>
        )
    }
}
