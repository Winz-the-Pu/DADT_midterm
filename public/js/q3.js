document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch data from the server
        const response = await fetch('/population-co2-continent');
        const data = await response.json();

        // Extract the data for the chart
        const continents = data.map(entry => entry.Continent);
        const populations = data.map(entry => entry.TotalPopulation);
        const co2PerCapita = data.map(entry => entry.AvgCO2PerCapita);

        // Log the data for debugging
        console.log("API Data: ", data);
        console.log("Continents: ", continents);
        console.log("Populations: ", populations);
        console.log("CO2 Per Capita: ", co2PerCapita);

        // Assign colors to continents
        const colors = {
            Africa: 'rgba(255, 99, 132, 0.8)',
            Asia: 'rgba(54, 162, 235, 0.8)',
            Europe: 'rgba(75, 192, 192, 0.8)',
            'North America': 'rgba(255, 206, 86, 0.8)',
            'South America': 'rgba(153, 102, 255, 0.8)',
            Oceania: 'rgba(255, 159, 64, 0.8)',
        };

        // Prepare data for the scatter plot
        const scatterData = continents.map((continent, index) => ({
            x: populations[index] / 1e9, // Convert population to billions
            y: co2PerCapita[index],
            label: continent,
            backgroundColor: colors[continent], // Assign color based on continent
        }));

        // Create the chart
        const ctx = document.getElementById('correlationChart').getContext('2d');
        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: scatterData.map(d => ({
                    label: d.label,
                    data: [{ x: d.x, y: d.y }],
                    backgroundColor: d.backgroundColor,
                }))
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const index = context.dataIndex;
                                return `${scatterData[index].label}: Population ${scatterData[index].x.toFixed(2)}B, CO₂ ${scatterData[index].y.toFixed(2)}`;
                            }
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            generateLabels: function (chart) {
                                return scatterData.map(d => ({
                                    text: d.label,
                                    fillStyle: d.backgroundColor,
                                }));
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Population vs. CO₂ Per Capita (Continents)'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Population (Billions)'
                        },
                        beginAtZero: true,
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Average CO₂ Per Capita'
                        },
                        beginAtZero: true,
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
});
