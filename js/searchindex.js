const destinations = {
    'home': 'index.html',
    'doha': 'pages/doha.html',
    'thailand': 'pages/thailand.html',
    'bohol': 'pages/bohol.html',
    'taiwan': 'pages/taiwan.html',
    'bacolod': 'pages/bacolod.html',
    'siquijor': 'pages/siquijor.html',
    'palawan': 'pages/palawan.html',
    'panglao': 'pages/panglao.html',
    'boracay': 'pages/boracay.html',
    'laguna': 'pages/laguna.html',
    'batanes': 'pages/batanes.html',
    'cebu': 'pages/cebu.html',
    'about': 'about.html',
    'contact': 'contact.html'
};

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const searchForm = document.querySelector('.search-bar');
    
    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    searchForm.appendChild(resultsContainer);

    function performSearch(searchTerm) {
        resultsContainer.innerHTML = '';
        
        if (!searchTerm) {
            resultsContainer.style.display = 'none';
            return;
        }

        const results = Object.keys(destinations).filter(destination => 
            destination.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (results.length > 0) {
            results.forEach(result => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                
                // Highlight the matching text
                const regex = new RegExp(searchTerm, 'gi');
                const highlightedText = result.replace(regex, match => 
                    `<span class="highlight">${match}</span>`
                );
                
                div.innerHTML = highlightedText;
                
                div.addEventListener('click', () => {
                    window.location.href = destinations[result];
                });
                
                resultsContainer.appendChild(div);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.innerHTML = '<div class="search-result-item">No results found</div>';
            resultsContainer.style.display = 'block';
        }
    }

    // Handle input changes
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value.trim());
    });

    // Handle form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            const firstResult = Object.keys(destinations).find(destination => 
                destination.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (firstResult) {
                window.location.href = destinations[firstResult];
            }
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });
});