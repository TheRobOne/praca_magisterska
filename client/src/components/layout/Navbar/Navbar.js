import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import './Navbar.css';

class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        window.location.href = '/login';
      }
    
    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-failure">Dodaj usterkę</Link>
                    </li>
                    { user.role === 'conservator' || user.role === 'admin' ?
                        <React.Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/charts">Wykresy</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/buildings">Budynki</Link>
                            </li>
                        </React.Fragment>: null
                    }
                    { user.role === 'admin' ?
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Użytkownicy</Link>
                        </li>: null
                    }
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={`/profile/${user.id}`}>Profil</Link>
                    </li>
                    <li className="nav-item nav-right">
                        <a
                        href="/login"
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                        >
                        Wyloguj
                        </a>
                    </li>
                </ul>
            </div>
        );

        const guestLinks = (
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Logowanie</Link>
                    </li>
                    <li className="nav-item nav-right">
                        <Link className="nav-link" to="/register">Rejestracja</Link>
                    </li>
                </ul>
            </div>
        );

        return(
            <nav className="navbar navbar-dark navbar-expand-md topnav">
                <div className="nav-left">
                    <Link className="navbar-brand active" to="/">Podgląd</Link>
                </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {isAuthenticated ? authLinks : guestLinks}
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps, { logoutUser })(Navbar);