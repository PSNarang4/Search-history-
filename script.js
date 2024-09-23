document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // Fetch search history from the server
    const fetchHistory = async () => {
        try {
            const response = await fetch('/get-history');
            const data = await response.json();
            displayHistory(data.searchHistory);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    // Display the search history
    const displayHistory = (searchHistory) => {
        historyList.innerHTML = '';
        searchHistory.forEach((term) => {
            const li = document.createElement('li');
            li.textContent = term;
            historyList.appendChild(li);
        });
    };

    // Update the search history on the server
    const addToHistory = async (term) => {
        try {
            await fetch('/update-history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ term })
            });
            fetchHistory(); // Refresh the displayed history
        } catch (error) {
            console.error('Error updating history:', error);
        }
    };

    // Clear the search history on the server
    const clearHistory = async () => {
        try {
            await fetch('/clear-history', {
                method: 'POST'
            });
            fetchHistory(); // Refresh the displayed history
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    };

    // Event listener for search button
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            addToHistory(searchTerm);
            searchInput.value = ''; // Clear input after search
        }
    });

    // Event listener for clearing history
    clearHistoryBtn.addEventListener('click', () => {
        clearHistory();
    });

    // Load the initial history on page load
    fetchHistory();
});
