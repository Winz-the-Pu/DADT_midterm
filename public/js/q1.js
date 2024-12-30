document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data from the API
        const response = await fetch('/top-emitting-countries');
        const apiData = await response.json();

        // Log the API data for debugging
        console.log('API Data:', apiData);

        // Parse the API data into countries and emissions
        const countries = apiData.map((item) => item.country_name || 'Unknown Country');
        const emissions = apiData.map((item) => item.TotalGHG);

        // Log the parsed data for further debugging
        console.log('Countries:', countries);
        console.log('Emissions:', emissions);

        // Create the bar chart
        const ctx = document.getElementById('q1-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: countries, // X-axis labels (countries)
                datasets: [{
                    label: 'Total GHG Emissions (Million Metric Tons)',
                    data: emissions, // Y-axis data (emissions)
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(75, 192, 192)'
                    ], // Dynamic colors for each bar
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        grid: {
                            display: true, // Display X-axis grid
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true, // Display Y-axis grid
                        },
                        title: {
                            display: true,
                            text: 'Emissions (Million Metric Tons)',
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Top 3 GHG Emitting Countries (2020–2023)',
                    },
                },
            },
        });
    } catch (error) {
        // Log errors to the console for debugging
        console.error('Error fetching or processing data:', error);
    }
});
