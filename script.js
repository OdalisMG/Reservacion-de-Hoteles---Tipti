const hotels = [
    {
        name: "Lakewood",
        rating: 3,
        weekdayRates: { Regular: 110, Rewards: 80 },
        weekendRates: { Regular: 90, Rewards: 80 },
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Bridgewood",
        rating: 4,
        weekdayRates: { Regular: 160, Rewards: 110 },
        weekendRates: { Regular: 60, Rewards: 50 },
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Ridgewood",
        rating: 5,
        weekdayRates: { Regular: 220, Rewards: 100 },
        weekendRates: { Regular: 150, Rewards: 40 },
        image: "https://via.placeholder.com/150"
    }
];

function parseDate(dateString) {
    const parts = dateString.split('-');
    const day = parseInt(parts[0], 10);
    const month = new Date(Date.parse(parts[1] + " 1, 2000")).getMonth();
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}

function isValidDate(dateString) {
    const regex = /^\d{2}-[A-Za-z]{3}-\d{4}$/;
    if (!regex.test(dateString)) return false;
    const date = parseDate(dateString);
    return date instanceof Date && !isNaN(date);
}

function findCheapestHotel() {
    const datesInput = document.getElementById('dates').value;
    const customerType = document.getElementById('customer-type').value;
    const dates = datesInput.split(',').map(date => date.trim());

    const errorMessage = document.getElementById('error-message');
    if (dates.some(date => !isValidDate(date))) {
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    let totalCosts = hotels.map(hotel => {
        let totalCost = 0;
        dates.forEach(date => {
            const day = parseDate(date).getDay();
            if (day === 0 || day === 6) {
                totalCost += hotel.weekendRates[customerType];
            } else {
                totalCost += hotel.weekdayRates[customerType];
            }
        });
        return { hotel, totalCost };
    });

    totalCosts.sort((a, b) => {
        if (a.totalCost === b.totalCost) {
            return b.hotel.rating - a.hotel.rating;
        }
        return a.totalCost - b.totalCost;
    });

    displayResults(totalCosts[0].hotel);
}

function displayResults(hotel) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="hotel-card">
            <img src="${hotel.image}" alt="${hotel.name}">
            <div class="hotel-info">
                <h2>${hotel.name}</h2>
                <p>Calificación: ${'★'.repeat(hotel.rating)}</p>
                <p>Tarifas entre semana (Regular: $${hotel.weekdayRates.Regular}, Rewards: $${hotel.weekdayRates.Rewards})</p>
                <p>Tarifas de fin de semana (Regular: $${hotel.weekendRates.Regular}, Rewards: $${hotel.weekendRates.Rewards})</p>
            </div>
        </div>
    `;
}
