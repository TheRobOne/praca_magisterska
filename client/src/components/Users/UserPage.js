import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';

import UserPageForm from './UserPageForm';

class UserPage extends Component {

    componentDidMount() {
        this.checkIfAdmin();
    }

    checkIfAdmin () {
        if (this.props.user.role !== 'admin') {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <UserPageForm/>
        )
    }
}

UserPage.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { updateUser })(withRouter(UserPage));