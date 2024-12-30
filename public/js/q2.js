document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch data from the server
        const response = await fetch('/china-ghg-over-years');
        const data = await response.json();

        // Extract the data for the chart
        const years = data.map(entry => entry.Year);
        const emissions = data.map(entry => entry.TotalGHG);

        // Log the data to ensure correctness
        console.log("API Data: ", data);
        console.log("Years: ", years);
        console.log("Emissions: ", emissions);

        // Create the chart
        const ctx = document.getElementById('ghgChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'GHG Emissions (Million Metric Tons)',
                    data: emissions,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4, // Smooth curve
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'GHG Emissions in China (2020–2023)'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Emissions (Million Metric Tons)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
});
