import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import User from './User';
import './User.css';

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('/users/all')
        .then(res => {
            this.setState({users: res.data});
            this.checkIfAdmin();
        })
        .catch(err => {

        });

    }

    checkIfAdmin () {
        if (this.props.user.role !== 'admin') {
            this.props.history.push('/');
        }
    }

    moveToUserPage(userId) {
        this.props.history.push(`/user/${userId}`);
    }

    render() {
        let users = null;
        if(this.state.users !== [])(
            users = this.state.users.map((user, index) => 
                <User user={user} index={index} key={user._id} moveToUserPage={() => this.moveToUserPage(user._id)}/>
            )
        );

        return (
            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Imię i Nazwisko</th>
                        <th scope="col">Adres Email</th>
                        <th scope="col">Rola</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.users === null ? null : users}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(UsersPage);
