import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFailures } from '../../actions/failureActions';
import FailuresFeed from './FailuresFeed';
import { sortBy } from 'underscore';
import './Failures.css';

class Failures extends Component {
  componentDidMount() {
    this.props.getFailures();
  }

  render() {
    const { failures } = this.props.failure;
    let sortedFailures = sortBy( failures, 'dateReal' );
    let failureContent = <FailuresFeed failures={sortedFailures} user={this.props.user}/>

    return (
      <div className="failures-container">
        {failureContent}
      </div>
    )
  }
}

Failures.propTypes = {
  getFailures: PropTypes.func.isRequired,
  failure: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  failure: state.failure,
  user: state.auth.user
})

export default connect(mapStateToProps, { getFailures })(Failures);