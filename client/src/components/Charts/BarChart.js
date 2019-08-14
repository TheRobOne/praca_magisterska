import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component {

    render() {
        const data = {
            labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
            datasets: [
                {
                    label: 'Liczba usterek w miesiącu',
                    backgroundColor: '#FF9800',
                    borderColor: '#E91E63',
                    borderWidth: 1,
                    hoverBackgroundColor: '#F57C00',
                    hoverBorderColor: '#C2185B',
                    data: this.props.data
                }
            ]
        };
        return (
            <div>
                <Bar
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