import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const TemperatureGraph = ({ temperatureData }) => {
    const [chart, setChart] = useState(null);

    useEffect(() => {
        if (temperatureData && temperatureData.length > 0) {
            const labels = temperatureData.map(day => day.date);
            const temperatures = temperatureData.map(day => day.temperature);

            const ctx = document.getElementById('temperature-chart').getContext('2d');

            if (chart) {
                chart.destroy(); // Destroy the existing chart if it exists
            }

            const newChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Temperature',
                        data: temperatures,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            setChart(newChart);
        }
    }, [temperatureData, chart]); // Include chart in the dependency array

    return (
        <div>
            <canvas id="temperature-chart"></canvas>
        </div>
    );
};

export default TemperatureGraph;
