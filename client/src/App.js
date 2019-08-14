import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import './App.css'

import NewFailure from './components/Failures/NewFailure';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import Failures from './components/Failures/Failures';
import Charts from './components/Charts/Charts';
import FailurePage from './components/Failures/FailurePage';
import UsersPage from './components/Users/UsersPage';
import UserPage from './components/Users/UserPage';
import Logo from './components/Logo/Logo';
import Buildings from './components/Buildings/Buildings';
import BuildingPage from './components/Buildings/BuildingPage';
import NewBuilding from './components/Buildings/NewBuilding';
import Profile from './components/Profile/Profile';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
              <Logo />
              <Navbar />
              <main className="container main"> 
                <Route exact path="/" component={Failures} />
                <Route exact path="/add-failure" component={NewFailure} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/charts" component={Charts} />
                <Route exact path="/users" component={UsersPage} />
                <Route exact path="/buildings" component={Buildings} />
                <Route exact path="/new-building" component={NewBuilding} />
                <Route path="/failure/:id" component={FailurePage} />
                <Route path="/user/:id" component={UserPage} />
                <Route path="/building/:id" component={BuildingPage} />
                <Route path="/profile/:id" component={Profile} />
              </main>
              <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
