// Fetch data from the server for Question 5
fetch('/q5')
    .then(response => response.json())
    .then(data => {
        // Extract continent names and their corresponding emissions
        const continents = data.map(row => row.Continent);
        const emissions = data.map(row => row.TotalEmissions);

        // Get the canvas element to render the chart
        const ctx = document.getElementById('myChart').getContext('2d');

        // Create a horizontal bar chart
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: continents, // Continent names
                datasets: [{
                    label: 'GHG Emissions (Million Metric Tons)',
                    data: emissions, // Emission values
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)', // Asia
                        'rgba(54, 162, 235, 0.8)', // Africa
                        'rgba(75, 192, 192, 0.8)', // Europe
                        'rgba(153, 102, 255, 0.8)', // North America
                        'rgba(255, 159, 64, 0.8)', // South America
                        'rgba(255, 205, 86, 0.8)', // Oceania
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 205, 86, 1)',
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top', // Legend at the top
                    },
                    title: {
                        display: true,
                        text: 'GHG Emissions by Continent (2020–2023)', // Chart title
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true, // Ensure the X-axis starts at 0
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching or processing data:', error));
