import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import { getFailures } from '../../actions/failureActions';
import LineChart from './LineChart';

class Charts extends Component {
    constructor(props){
        super(props);
        this.state = {
            january: 0,
            february: 0,
            march: 0,
            april: 0,
            may: 0,
            june: 0,
            july: 0,
            august: 0,
            september: 0,
            october: 0,
            november: 0,
            december: 0,
            new: 0,
            inprogress: 0,
            done: 0,
            wontfix: 0,
            chart: null
        }
    }


    componentDidMount() {
        this.props.getFailures();
    }

    componentWillMount() {
        const failures = this.props.failures;
        for(let i = 0; i < failures.length; i++){
            this.getFailuresForEachMonth(failures[i]);
            this.getFailureState(failures[i]);
        }
    }

    getFailuresForEachMonth(failure){
        let date = new Date(failure.dateReal);
        let month = date.getMonth();
        switch(month) {
            case 0:
                this.setState(prevState => {
                    return {january: prevState.january + 1}
                });
                break;
            case 1:
                this.setState(prevState => {
                    return {february: prevState.february + 1}
                });
                break;
            case 2:
                this.setState(prevState => {
                    return {march: prevState.march + 1}
                });
                break;
            case 3:
                this.setState(prevState => {
                    return {april: prevState.april + 1}
                });
                break;
            case 4:
                this.setState(prevState => {
                    return {may: prevState.may + 1}
                });
                break;
            case 5:
                this.setState((prevState) => {
                    return {june: prevState.june + 1}
                });
                break;
            case 6:
                this.setState((prevState) => {
                    return {july: prevState.july + 1}
                });
                break;
            case 7:
                this.setState((prevState) => {
                    return {august: prevState.august + 1}
                });
                break;
            case 8:
                this.setState((prevState) => {
                    return {september: prevState.september + 1}
                });
                break;
            case 9:
                this.setState((prevState) => {
                    return {october: prevState.october + 1}
                });
                break;
            case 10:
                this.setState((prevState) => {
                    return {november: prevState.november + 1}
                });
                break;
            case 11:
                this.setState((prevState) => {
                    return {december: prevState.december + 1}
                });
                break;
            default:
                console.log("default")
        }
    }

    getFailureState(failure){
        switch(failure.state) {
            case 'Nowa':
                this.setState(prevState => {
                    return {new: prevState.new + 1}
                });
                break;
            case 'W trakcie naprawy':
                this.setState(prevState => {
                    return {inprogress: prevState.inprogress + 1}
                });
                break;
            case 'Naprawiona':
                this.setState(prevState => {
                    return {done: prevState.done + 1}
                });
                break;
            case 'Nie będzie naprawiana':
                this.setState(prevState => {
                    return {wontfix: prevState.wontfix + 1}
                });
                break;
            default:
                console.log("default")
        }
    }

    onClick(chartType){
        const monthsData = [this.state.january, this.state.february, this.state.march, this.state.april, this.state.may, this.state.june,
            this.state.july, this.state.august, this.state.september, this.state.november, this.state.december];
        const statesData = [this.state.new, this.state.inprogress, this.state.done, this.state.wontfix];
        const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec'];
        const states = ['nowy', 'w trakcie naprawy', 'naprawa zakończona', 'nie będzie naprawiana']
        switch(chartType) {
            case "bar":
                this.setState({chart: <BarChart data={monthsData}/>})
                break;
            case "doughnut":
                this.setState({chart: <DoughnutChart data={monthsData} labels={months}/>})
                break;
            case 'line':
                this.setState({chart: <LineChart data={monthsData}/>})
                break;
            case 'status':
                this.setState({chart: <DoughnutChart data={statesData} labels={states}/>})
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <br/>
                <div className="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" className="btn btn-info" onClick={() => this.onClick("bar")}>Usterki w miesiącu</button>
                </div>
                <div className="btn-group" role="group" aria-label="Fourth group">
                    <button type="button" className="btn btn-info" onClick={() => this.onClick("status")}>Status usterek</button>
                </div>
                {this.state.chart}
            </div>
        )
    }
}

Charts.propTypes = {
    failures: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    failures: state.failure.failures
});

export default connect(mapStateToProps, {getFailures})(Charts);