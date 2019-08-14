import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

class BarChart extends Component {


    render() {
        const data = {
            labels: this.props.labels,
            datasets: [
                {
                    label: 'Liczba usterek w miesiącu',
                    backgroundColor: [
                        '#E91E63',
                        '#CDDC39',
                        '#FF9800',
                        '#009688',
                        '#00BCD4',
                        '#673AB7',
                    ],
                    borderColor: '#455A64',
                    borderWidth: 1,
                    hoverBackgroundColor: [
                        '#C2185B',
                        '#AFB42B',
                        '#F57C00',
                        '#00796B',
                        '#0097A7',
                        '#512DA8',
                    ],
                    hoverBorderColor: '#455A64',
                    data: this.props.data
                }
            ]
        };
        return (
            <div>
                <Doughnut
                    data={data}
                    width={100}
                    height={500}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}

export default BarChart;