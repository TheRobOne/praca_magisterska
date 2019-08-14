import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class BarChart extends Component {


    render() {
        const data = {
            labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec'],
            datasets: [
                {
                    label: 'Liczba usterek w poszczególnych miesiącach',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#009688',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#009688',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#009688',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.data
                }
            ]
        };
        return (
            <div>
                <Line
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