// Fetch data from the server for Question 4
fetch('/q4')
    .then(response => response.json())
    .then(data => {
        // Extract sector names and their corresponding emissions
        const sectors = data.map(row => row.Sector);
        const emissions = data.map(row => row.TotalEmissions);

        // Get the canvas element to render the chart
        const ctx = document.getElementById('myChart').getContext('2d');

        // Create a pie chart
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: sectors, // Sector names
                datasets: [{
                    label: 'Sector Contribution',
                    data: emissions, // Emission values
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)', // Cement CO2
                        'rgba(54, 162, 235, 0.8)', // Land Use Change CO2
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top', // Position of the legend
                    },
                    title: {
                        display: true,
                        text: 'Sector Contribution to China\'s GHG Emissions', // Chart title
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching or processing data:', error));
