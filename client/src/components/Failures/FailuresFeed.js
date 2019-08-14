import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FailureItem from './FailureItem';
import { sortBy } from 'underscore';
import { withRouter } from 'react-router-dom';

class FailuresFeed extends Component {
  constructor(props){
    super(props);
    this.state= {
      failureItems: null
    }
  }

  moveToFailurePage(failureId) {
    this.props.history.push(`/failure/${failureId}`);
  }

  onClick(type) {
    const { failures } = this.props;
    if(type === "date") type = "dateReal";
    let sortedFailures = sortBy( failures, type );
    let failureItems = sortedFailures.map((failure, index) => 
      <FailureItem failure={failure} moveToFailurePage={() => this.moveToFailurePage(failure._id)} index={index} key={index}/>
    );
    this.setState({failureItems});
    this.forceUpdate();
  }

  render() {
    const { failures } = this.props;
    const sortedFailures = sortBy(failures, 'dateReal')
    const failureItems = sortedFailures.map((failure, index) => 
      <FailureItem failure={failure} moveToFailurePage={() => this.moveToFailurePage(failure._id)} index={index} key={index}/>
    );
    
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" onClick={() => this.onClick("date")} style={{cursor: 'pointer'}}>Data utworzenia</th>
            <th scope="col" onClick={() => this.onClick("building")} style={{cursor: 'pointer'}}>Budynek</th>
            <th scope="col"> Pokój</th>
            <th scope="col" onClick={() => this.onClick("authorEmail")} style={{cursor: 'pointer'}}>Email</th>
            <th scope="col">Tytuł</th>
            <th scope="col" onClick={() => this.onClick("state")} style={{cursor: 'pointer'}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.failureItems === null ? failureItems : this.state.failureItems}
        </tbody>
      </table>
    )
  };
}

FailuresFeed.propTypes = {
    failures: PropTypes.array.isRequired
};

export default (withRouter(FailuresFeed));