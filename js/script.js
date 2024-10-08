
function navigateToHome() {
    window.location.href = "../index.html";
}




document.addEventListener('DOMContentLoaded', () => {
    // Load header and footer
    fetch('../components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            // Add event listener to the search form
            const searchForm = document.querySelector('#header .search-bar');
            if (searchForm) {
                searchForm.addEventListener('submit', handleSearch);
            }
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Example: Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

 
});

       // Load Latest Blogs
       fetch('../components/latest-blogs.html') // Adjusted path for latest blogs
       .then(response => response.text())
       .then(data => {
           document.getElementById('latest-blogs-section').innerHTML = data;
       })
       .catch(error => console.error('Error loading latest blogs:', error));
   
       // Load Related Articles (make sure this file exists)
       fetch('../components/related-articles.html') // Adjusted path for related articles
       .then(response => response.text())
       .then(data => {
           document.getElementById('related-articles-section').innerHTML = data;
       })
       .catch(error => console.error('Error loading related articles:', error));


       

function createLeaves() {
    const fallingLeavesContainer = document.querySelector('.falling-leaves');

    // Randomly decide how many leaves to create (e.g., between 1 and 3)
    const numberOfLeaves = Math.floor(Math.random() * 3) + 1; // Randomly generates 1 to 3 leaves

    for (let i = 0; i < numberOfLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
        leaf.style.animationDuration = '20s'; // Ensure uniform duration
        leaf.style.opacity = Math.random(); // Random opacity for variation

        fallingLeavesContainer.appendChild(leaf);

        // Remove leaf after animation completes
        leaf.addEventListener('animationend', () => {
            leaf.remove();
        });
    }
}

// Create leaves every 3 seconds (or any preferred interval)
setInterval(createLeaves, 3000); // Adjust the timing as needed


function handleSearch(event) {
    event.preventDefault();
    const searchInput = event.target.querySelector('input[type="search"]');
    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log('Searching for:', searchTerm);

    const destinationsContainer = document.getElementById('destinations-container');
    if (destinationsContainer) {
        const destinations = destinationsContainer.getElementsByClassName('destination');
        let matchingDestinations = [];

        for (const destination of destinations) {
            const destName = destination.querySelector('h3').textContent.toLowerCase();
            const destContent = destination.textContent.toLowerCase();

            if (destName.includes(searchTerm) || destContent.includes(searchTerm)) {
                matchingDestinations.push(destination);
            }
        }

        if (matchingDestinations.length > 0) {
            matchingDestinations[0].scrollIntoView({ behavior: 'smooth' });
            matchingDestinations.forEach(dest => dest.classList.add('match'));
        } else {
            console.log('No results found');
        }
    }
}


