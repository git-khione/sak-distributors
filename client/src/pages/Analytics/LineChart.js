import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart(props) {

    const { label, labels, chartData, } = props;

    let colors = [];

    while (colors.length < 1000) {
        colors.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
    }

    function rand(frm, to) {
        return (Math.random() * (to - frm)) + frm;
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: label.axisLabelOne,
                },
                ticks: {
                    callback: function (value) {
                        return 'Rs ' + value.toLocaleString();
                    }
                },
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: label.axisLabelTwo,
                },
            }],
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: label.label,
                data: chartData,
                borderColor: colors[0],
                backgroundColor: colors[0],
                fill: false
            }
        ]
    };

    return (
        <div style={{ width: "calc(100vw - calc(30% + 40px))", margin: "auto auto" }}>
            <Line options={options} data={data} />
        </div>
    )
}
