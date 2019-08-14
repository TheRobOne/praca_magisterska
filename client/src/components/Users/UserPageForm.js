import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { updateUser, removeUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';


class UserPageForm extends Component  {
    constructor() {
        super();
        this.state = {
          name: '',
          email: '',
          role: '',
          errors: {}
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSelectedOption = this.onChangeSelectedOption.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    componentDidMount() {
        const userId = window.location.pathname.split('/')[2];
        axios.get(`/users/${userId}`)
        .then(res => {
            this.setState({
                name: res.data.name,
                email: res.data.email,
                role: this.translateRoleToPolish(res.data.role)
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    }

    translateRoleToPolish(role) {
        switch (role) {
            case 'admin':
                return 'Administrator'
            case 'basic':
                return 'Użytkownik podstawowy'
            case 'conservator':
                return 'Konserwator'
            default:
                return role
        }
    }

    translateRoleToEnglish(role) {
        switch (role) {
            case 'Administrator':
                return 'admin'
            case 'Użytkownik podstawowy':
                return 'base'
            case 'Konserwator':
                return 'conservator'
            default:
                return role
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeSelectedOption(e) {
        this.setState({role: e.target.value});
    }
    
    onSubmit(e) {
        e.preventDefault();
        const userId = window.location.pathname.split('/')[2];

        const updatedUser = {
            name: this.state.name,
            email: this.state.email,
            role: this.translateRoleToEnglish(this.state.role)
        };

        this.props.updateUser(updatedUser, userId, this.props.history);
    }

    removeUser(e) {
        e.preventDefault();
        const userId = window.location.pathname.split('/')[2];

        this.props.removeUser(userId, this.props.history);
    }


    render(){
        return (
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edycja użytkownika</h1>
                    <p className="lead text-center">
                        Edytuj pola, odpowiadające danym które chcesz zmienić
                    </p>
                    <form noValidate onSubmit={this.onSubmit}>
                        <label>Imię i nazwisko</label>
                        <TextFieldGroup
                            placeholder="Imię i nazwisko"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={this.props.errors.name}
                        />
                        <label>Adres email</label>
                        <TextFieldGroup
                            placeholder="Adres email"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={this.props.errors.email}
                        />
                        <label>Rola</label>
                        <div className="form-group">
                            <select className={classnames('form-control form-control-lg')} id="select1" value={this.state.role} onChange={this.onChangeSelectedOption}>
                                <option>Użytkownik podstawowy</option>
                                <option>Konserwator</option>
                                <option>Administrator</option>
                            </select>
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4 btn-lg" value="Potwierdź"/>
                    </form>
                    <input type="submit" className="btn btn-danger btn-lg btn-block mt-4" value="Usuń użytkownika" onClick={this.removeUser}/>                   
                    </div>
                </div>
                </div>
            </div>
        );
    }
};

UserPageForm.protoTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { updateUser, removeUser })(withRouter(UserPageForm));