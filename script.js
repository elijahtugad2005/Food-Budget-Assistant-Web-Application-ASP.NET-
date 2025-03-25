document.addEventListener('DOMContentLoaded', () => {

    // Dynamic Text Animation
    const searchResultsContainer = document.getElementById('search-results');

    const dynamicText = document.querySelector(".loop");
    const messages = ["BUDGET?", "HUNGRY?", "CRAVING?"];
    let index = 0;

    function updateText() {
        dynamicText.style.opacity = 0;
        setTimeout(() => {
            dynamicText.textContent = messages[index];
            dynamicText.style.opacity = 1;
            index = (index + 1) % messages.length;
        }, 500);
    }

    // Initial call and interval for text animation
    updateText();
    setInterval(updateText, 4000);

    // Fetch and process restaurant data
    fetch('restaurants.json')
        .then(response => response.json())
        .then(data => {
            const restaurants = data.restaurants;
            
            // Create Restaurant Cards
            createRestaurantCards(restaurants);
            
            // Setup Global Budget Search
            setupGlobalBudgetSearch(restaurants);
        })
        .catch(error => {
            console.error('Error loading restaurant data:', error);
        });

    // Create Restaurant Cards
    function createRestaurantCards(restaurants) {
        const container = document.getElementById('restaurant-container');
        container.innerHTML = '';

        restaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.className = 'restaurant-card';
            card.innerHTML = `
                <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
                <div class="restaurant-details">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <div class="restaurant-info">
                        <span>${restaurant.distance}</span>
                    </div>
                    <div class="restaurant-tags">
                        ${restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Initialize Slider Navigation
        initSliderNav();
    }

    // Slider Navigation
    function initSliderNav() {
        const slider = document.getElementById('restaurant-container');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        const scrollAmount = 300;
        
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // Global Budget Search Setup
    function setupGlobalBudgetSearch(restaurants) {
        const searchButton = document.getElementById('search-button');
        const resetButton = document.getElementById('reset-button');
        const budgetInput = document.getElementById('budget-input');
        const searchResultsContainer = document.getElementById('search-results');

        // Search functionality
        function performSearch() {
            const budget = parseFloat(budgetInput.value);
            
            if (isNaN(budget) || budget <= 0) {
                alert("Please enter a valid budget.");
                return;
            }

            // Find items within budget
            const matchingItems = [];
            restaurants.forEach(restaurant => {
                restaurant.menu.forEach(item => {
                    if (item.price <= budget) {
                        matchingItems.push({
                            ...item,
                            restaurantName: restaurant.name
                        });
                    }
                });
            });

            // Display results
            displaySearchResults(matchingItems);
        }
        /*
        // Display search results
        function displaySearchResults(items) {
            searchResultsContainer.innerHTML = '';

            if (items.length === 0) {
                searchResultsContainer.innerHTML = '<p>No items found within your budget.</p>';
                return;
            }

            const resultHTML = `
                <h3>Items within your budget:</h3>
                <ul>
                    ${items.map(item => `
                        <li>
                            <strong>${item.name}</strong> - ₱${item.price.toFixed(2)} 
                            <em>(${item.restaurantName})</em>
                        </li>
                    `).join('')}
                </ul>
            `;

            searchResultsContainer.innerHTML = resultHTML;
        }*/

            // Display search results
function displaySearchResults(items) {
    searchResultsContainer.innerHTML = '';

    if (items.length === 0) {
        searchResultsContainer.innerHTML = `
            <p class="no-results">No items found within your budget.</p>
        `;
        return;
    }

    const resultHTML = `
        <h3 class="search-results-heading">Items within your budget:</h3>
        ${items.map(item => `
            <div class="search-item">
                <div class="search-item-name">${item.name}</div>
                <div class="search-item-price">₱${item.price.toFixed(2)}</div>
                <div class="search-item-restaurant">${item.restaurantName}</div>
            </div>
        `).join('')}
    `;

    searchResultsContainer.innerHTML = resultHTML;
}

        // Event Listeners
        searchButton.addEventListener('click', performSearch);
        
        // Allow search on Enter key
        budgetInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Reset button functionality
        resetButton.addEventListener('click', () => {
            budgetInput.value = '';
            searchResultsContainer.innerHTML = '';
        });
    }

    console.log(searchResultsContainer); // Should not be null
    console.log(items);


});