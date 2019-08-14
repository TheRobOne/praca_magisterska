import React, { Component } from 'react'
import axios from 'axios';

export default class NewBuilding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    };

    onChangeHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const building = {
            name: this.state.name
        }

        console.log(building);
        
        axios.post('/buildings', {building})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        
        this.props.history.push('/buildings');
    }

    render() {
        return (
            <form className="new-failure-form" onSubmit={event => this.onSubmit(event)}>
              <div className="row">
                  <div className="col">
                    <label> Nazwa budynku: </label>
                  </div>
                    <input className="form-control" 
                        type="text" 
                        rows="4" 
                        cols="50" 
                        name="name" 
                        onChange={event => this.onChangeHandler(event)}
                    />
              </div>
              <br />
              <input type="submit" className="btn btn-info btn-block mt-4 submit btn-lg" value="Dodaj"/>
            </form>
          );
    }
}
