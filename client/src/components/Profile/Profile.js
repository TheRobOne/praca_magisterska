import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
          password: '',
          password2: '',
          errors: {}
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const userId = window.location.pathname.split('/')[2];

        const updatedUser = {
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.updateUser(updatedUser, userId, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br/>
                            <h1>Zmień hasło</h1>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Podaj hasło"
                                    name="password"
                                    type="password"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={this.props.errors.password}
                                />

                                <TextFieldGroup
                                    placeholder="Powtórz hasło"
                                    name="password2"
                                    type="password"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={this.props.errors.password2}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4 btn-lg submit" value="Zmień hasło"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { updateUser })(Profile);
