function navigateToHome() {
    window.location.href = "../index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    // Load header and footer

    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Load Latest Blogs
    fetch('../components/latest-blogs.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('latest-blogs-section').innerHTML = data;
        })
        .catch(error => console.error('Error loading latest blogs:', error));

    // Load Related Articles
    fetch('../components/related-articles.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('related-articles-section').innerHTML = data;
        })
        .catch(error => console.error('Error loading related articles:', error));
});

// Leaf Creation Functionality
function createLeaves() {
    const fallingLeavesContainer = document.querySelector('.falling-leaves');

    const numberOfLeaves = Math.floor(Math.random() * 2) + 1; // Randomly generates 1 to 2

    for (let i = 0; i < numberOfLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.style.left = Math.random() * 200 + 'vw'; // Random horizontal position
        leaf.style.animationDuration = '20s'; // Ensure uniform duration
        leaf.style.opacity = Math.random(); // Random opacity for variation

        fallingLeavesContainer.appendChild(leaf);

        // Remove leaf after animation completes
        leaf.addEventListener('animationend', () => {
            leaf.remove();
        });
    }
}

// Create leaves every 5 seconds
setInterval(createLeaves, 7000);




// Store comments for different pages
const pageComments = {
    'taiwan': [
        { name: 'Sarah Chen', comment: 'The night markets in Taipei are absolutely incredible! The street food variety is amazing.', likes: 15, date: '2024-03-15' },
        { name: 'Mike Wong', comment: 'Jiufen was magical - it really does feel like stepping into Spirited Away!', likes: 12, date: '2024-03-10' }
    ],
    'thailand': [
        { name: 'Emma Thompson', comment: 'The temples in Bangkok took my breath away. Such amazing architecture!', likes: 18, date: '2024-03-12' },
        { name: 'Alex Liu', comment: 'Street food in Chiang Mai is unbeatable. Try the Khao Soi!', likes: 14, date: '2024-03-08' }
    ],
    'doha': [
        { name: 'Mohammed Al-Sayed', comment: 'The Museum of Islamic Art is a must-visit. The architecture is stunning!', likes: 20, date: '2024-03-14' },
        { name: 'Lisa Parker', comment: 'Souq Waqif at night is magical. Love the traditional atmosphere!', likes: 16, date: '2024-03-09' }
    ],
    'bohol': [
        { name: 'Maria Santos', comment: 'The beaches here are pristine! Alona Beach is perfect for sunset watching.', likes: 22, date: '2024-03-13' },
        { name: 'John Smith', comment: 'Great diving spots around Balicasag Island!', likes: 19, date: '2024-03-07' }
    ],
    'bacolod': [
        { name: 'Rose Martinez', comment: 'The Chicken Inasal here is the best in the Philippines!', likes: 25, date: '2024-03-11' },
        { name: 'David Wilson', comment: 'The Ruins are so romantic, especially during sunset.', likes: 21, date: '2024-03-06' }
    ],
    'boracay': [
        { name: 'Claire Johnson', comment: 'White Beach is still the most beautiful beach I\'ve ever seen!', likes: 30, date: '2024-03-16' },
        { name: 'Peter Lee', comment: 'The water activities here are amazing. Try parasailing!', likes: 24, date: '2024-03-05' }
    ],
    'siquijor': [
        { name: 'Nina Cruz', comment: 'Cambugahay Falls is a hidden paradise. The rope swing is so fun!', likes: 28, date: '2024-03-17' },
        { name: 'Tom Anderson', comment: 'The local healers and their traditional practices are fascinating.', likes: 23, date: '2024-03-04' }
    ],
    'batanes': [
        { name: 'Angela Reyes', comment: 'Pagsanjan Falls is worth the boat ride! Such an adventure!', likes: 26, date: '2024-03-18' },
        { name: 'James Kim', comment: 'Hot springs in Los Baños are so relaxing after a long day.', likes: 22, date: '2024-03-03' }
    ],
    'cebu': [
        { name: 'Paolo Mendoza', comment: 'Swimming with whale sharks in Oslob was life-changing!', likes: 35, date: '2024-03-19' },
        { name: 'Hannah Brown', comment: 'The historic Magellan\'s Cross site is a must-visit.', likes: 27, date: '2024-03-02' }
    ],
    'palawan': [
        { name: 'Sofia Garcia', comment: 'The Underground River tour was incredible! A natural wonder!', likes: 40, date: '2024-03-20' },
        { name: 'Ryan Taylor', comment: 'Island hopping in El Nido is paradise on Earth.', likes: 32, date: '2024-03-01' }
    ]
};

// Function to create comment HTML
function createCommentHTML(comment) {
    return `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h6 class="card-subtitle mb-2 text-muted">${comment.name}</h6>
                    <small class="text-muted">${comment.date}</small>
                </div>
                <p class="card-text">${comment.comment}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-sm btn-outline-primary comment-like-btn" onclick="handleCommentLike(this)">
                        <i class="fas fa-thumbs-up"></i> <span class="comment-likes-count">${comment.likes}</span>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary reply-btn" onclick="showReplyForm(this)">
                        Reply
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to load comments for current page
function loadPageComments() {
    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    const comments = pageComments[pageName] || [];
    const container = document.getElementById('commentsContainer');
    
    // Clear the container
    container.innerHTML = '';
    
    if (comments.length === 0) {
        container.innerHTML = '<p class="text-muted">No comments yet. Be the first to comment!</p>';
        return;
    }

    // Always show the most recent comment
    container.innerHTML = createCommentHTML(comments[0]);

    if (comments.length > 1) {
        // Create collapse section for older comments
        const olderComments = document.createElement('div');
        olderComments.innerHTML = `
            <div class="mt-3">
                <button class="btn btn-link text-decoration-none p-0" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#olderComments" 
                        aria-expanded="false" 
                        aria-controls="olderComments">
                    <i class="fas fa-chevron-down me-1"></i>
                    View Previous Comments (${comments.length - 1})
                </button>
            </div>
            <div class="collapse mt-3" id="olderComments">
                <div class="older-comments-container">
                    ${comments.slice(1).map(comment => createCommentHTML(comment)).join('')}
                </div>
            </div>
        `;
        container.appendChild(olderComments);

        // Add event listener to change button text and icon when collapsed/expanded
        const collapseElement = document.getElementById('olderComments');
        const toggleButton = document.querySelector('[data-bs-target="#olderComments"]');
        
        collapseElement.addEventListener('show.bs.collapse', () => {
            toggleButton.innerHTML = `<i class="fas fa-chevron-up me-1"></i>Hide Previous Comments`;
        });
        
        collapseElement.addEventListener('hide.bs.collapse', () => {
            toggleButton.innerHTML = `<i class="fas fa-chevron-down me-1"></i>View Previous Comments (${comments.length - 1})`;
        });
    }
}

// Handle main like button
function handleLike(button) {
    const likesCount = button.querySelector('.likes-count');
    let currentLikes = parseInt(likesCount.textContent);
    likesCount.textContent = currentLikes + 1;
    button.classList.add('liked');
    button.disabled = true;
}

// Handle comment like button
function handleCommentLike(button) {
    const likesCount = button.querySelector('.comment-likes-count');
    let currentLikes = parseInt(likesCount.textContent);
    likesCount.textContent = currentLikes + 1;
    button.classList.add('liked');
    button.disabled = true;
}

// Handle new comment submission
function handleComment(event) {
    event.preventDefault();
    const name = document.getElementById('commenterName').value;
    const comment = document.getElementById('commentText').value;
    const date = new Date().toISOString().split('T')[0];

    const newCommentHTML = `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h6 class="card-subtitle mb-2 text-muted">${name}</h6>
                    <small class="text-muted">${date}</small>
                </div>
                <p class="card-text">${comment}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-sm btn-outline-primary comment-like-btn" onclick="handleCommentLike(this)">
                        <i class="fas fa-thumbs-up"></i> <span class="comment-likes-count">0</span>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary reply-btn" onclick="showReplyForm(this)">
                        Reply
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('commentsContainer').innerHTML = newCommentHTML + document.getElementById('commentsContainer').innerHTML;
    document.getElementById('commentForm').reset();
}

// Show reply form
function showReplyForm(button) {
    const commentCard = button.closest('.card-body');
    const replyForm = document.createElement('div');
    replyForm.className = 'mt-3';
    replyForm.innerHTML = `
        <form onsubmit="handleReply(event, this)">
            <div class="mb-3">
                <input type="text" class="form-control form-control-sm" placeholder="Your Name" required>
            </div>
            <div class="mb-3">
                <textarea class="form-control form-control-sm" rows="2" placeholder="Your Reply" required></textarea>
            </div>
            <button type="submit" class="btn btn-sm btn-primary">Post Reply</button>
            <button type="button" class="btn btn-sm btn-secondary" onclick="this.closest('form').remove()">Cancel</button>
        </form>
    `;
    commentCard.appendChild(replyForm);
    button.disabled = true;
}

// Handle reply submission
function handleReply(event, form) {
    event.preventDefault();
    const name = form.querySelector('input').value;
    const reply = form.querySelector('textarea').value;
    const date = new Date().toISOString().split('T')[0];

    const replyHTML = `
        <div class="card ms-4 mt-3">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h6 class="card-subtitle mb-2 text-muted">${name}</h6>
                    <small class="text-muted">${date}</small>
                </div>
                <p class="card-text">${reply}</p>
                <button class="btn btn-sm btn-outline-primary comment-like-btn" onclick="handleCommentLike(this)">
                    <i class="fas fa-thumbs-up"></i> <span class="comment-likes-count">0</span>
                </button>
            </div>
        </div>
    `;

    const commentCard = form.closest('.card-body');
    form.remove();
    commentCard.querySelector('.reply-btn').disabled = false;
    commentCard.insertAdjacentHTML('beforeend', replyHTML);
}

// Load comments when page loads
document.addEventListener('DOMContentLoaded', loadPageComments);


// Get the current page URL and title for sharing
const pageUrl = window.location.href;
const pageTitle = document.title;

// Initialize likes from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeLikes();
    setupSocialButtons();
});

function initializeLikes() {
    const likeButton = document.querySelector('#like-share-section .btn-outline-primary');
    const likeCounter = document.getElementById('like-counter');
    const pageIdentifier = getPageIdentifier();
    
    // Get likes from localStorage
    const likes = getLikesFromStorage(pageIdentifier);
    likeCounter.textContent = likes;
    
    // Check if user has already liked
    const hasLiked = getHasLikedFromStorage(pageIdentifier);
    if (hasLiked) {
        likeButton.classList.remove('btn-outline-primary');
        likeButton.classList.add('btn-primary');
        likeButton.disabled = true;
    }

    // Add click event listener
    likeButton.addEventListener('click', handleLike);
}

function setupSocialButtons() {
    const shareButton = document.querySelector('#like-share-section .btn-outline-secondary');
    shareButton.addEventListener('click', handleShare);
}

function handleLike() {
    const likeButton = document.querySelector('#like-share-section .btn-outline-primary');
    const likeCounter = document.getElementById('like-counter');
    const pageIdentifier = getPageIdentifier();
    
    // Prevent multiple likes
    if (getHasLikedFromStorage(pageIdentifier)) {
        return;
    }
    
    // Update counter
    const currentLikes = parseInt(likeCounter.textContent);
    const newLikes = currentLikes + 1;
    likeCounter.textContent = newLikes;
    
    // Update button appearance
    likeButton.classList.remove('btn-outline-primary');
    likeButton.classList.add('btn-primary');
    likeButton.disabled = true;
    
    // Add animation effect
    likeCounter.classList.add('like-animation');
    setTimeout(() => {
        likeCounter.classList.remove('like-animation');
    }, 500);
    
    // Store in localStorage
    saveLikesToStorage(pageIdentifier, newLikes);
    setHasLikedInStorage(pageIdentifier, true);
}

async function handleShare() {
    const shareData = {
        title: pageTitle,
        url: pageUrl,
        text: `Check out this amazing destination: ${pageTitle}`
    };

    try {
        // Try using the Web Share API first
        if (navigator.share) {
            await navigator.share(shareData);
            showShareFeedback('Thanks for sharing!');
        } else {
            // Fallback to custom share modal
            showShareModal();
        }
    } catch (error) {
        console.error('Error sharing:', error);
        showShareModal();
    }
}

function showShareModal() {
    // Create modal if it doesn't exist
    let shareModal = document.getElementById('shareModal');
    
    if (!shareModal) {
        const modalHTML = `
            <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="shareModalLabel">Share this page</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex justify-content-around">
                                <button class="btn btn-outline-primary share-btn" data-platform="facebook">
                                    <i class="fab fa-facebook"></i> Facebook
                                </button>
                                <button class="btn btn-outline-info share-btn" data-platform="twitter">
                                    <i class="fab fa-twitter"></i> Twitter
                                </button>
                                <button class="btn btn-outline-success share-btn" data-platform="whatsapp">
                                    <i class="fab fa-whatsapp"></i> WhatsApp
                                </button>
                            </div>
                            <div class="mt-3">
                                <label for="shareLink" class="form-label">Or copy link:</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="shareLink" value="${pageUrl}" readonly>
                                    <button class="btn btn-outline-secondary" type="button" onclick="copyShareLink()">
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        shareModal = document.getElementById('shareModal');
        
        // Add event listeners to share buttons
        shareModal.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.dataset.platform;
                shareToSocialMedia(platform);
            });
        });
    }
    
    // Show modal
    const modal = new bootstrap.Modal(shareModal);
    modal.show();
}

function shareToSocialMedia(platform) {
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(pageTitle);
    let shareUrl;

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
            break;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function copyShareLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    document.execCommand('copy');
    
    // Show feedback
    const copyButton = shareLink.nextElementSibling;
    const originalText = copyButton.textContent;
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = originalText;
    }, 2000);
}

function showShareFeedback(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '11';
    toast.innerHTML = `
        <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast.querySelector('.toast'));
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Helper functions for localStorage
function getPageIdentifier() {
    return window.location.pathname.split('/').pop().replace('.html', '');
}

function getLikesFromStorage(pageIdentifier) {
    return parseInt(localStorage.getItem(`likes_${pageIdentifier}`) || '0');
}

function saveLikesToStorage(pageIdentifier, likes) {
    localStorage.setItem(`likes_${pageIdentifier}`, likes.toString());
}

function getHasLikedFromStorage(pageIdentifier) {
    return localStorage.getItem(`hasLiked_${pageIdentifier}`) === 'true';
}

function setHasLikedInStorage(pageIdentifier, hasLiked) {
    localStorage.setItem(`hasLiked_${pageIdentifier}`, hasLiked.toString());
}

// Add required CSS
const style = document.createElement('style');
style.textContent = `
    .like-animation {
        animation: pulse 0.5s ease-in-out;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    .share-btn {
        min-width: 120px;
    }

    .toast {
        opacity: 0.9;
    }
`;
document.head.appendChild(style);






// Contact form handling function
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formFields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        message: document.getElementById('message')
    };

    // Create feedback elements for errors
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'alert mt-3 d-none';
    contactForm.appendChild(feedbackDiv);

    // Create thank you modal
    const modalHTML = `
        <div class="modal fade" id="thankYouModal" tabindex="-1" aria-labelledby="thankYouModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="thankYouModalLabel">Thank You!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center">
                            <i class="fas fa-check-circle text-success" style="font-size: 48px;"></i>
                            <p class="mt-3">Thank you for your message! We will get back to you soon.</p>
                            <p class="small text-muted">A confirmation email has been sent to your inbox.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to the document
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const errors = [];

        // Clear previous error styles
        Object.values(formFields).forEach(field => {
            field.classList.remove('is-invalid');
        });

        // Name validation
        if (!formFields.name.value.trim()) {
            formFields.name.classList.add('is-invalid');
            errors.push('Name is required');
            isValid = false;
        }

        // Email validation
        if (!formFields.email.value.trim()) {
            formFields.email.classList.add('is-invalid');
            errors.push('Email is required');
            isValid = false;
        } else if (!isValidEmail(formFields.email.value)) {
            formFields.email.classList.add('is-invalid');
            errors.push('Please enter a valid email address');
            isValid = false;
        }

        // Message validation
        if (!formFields.message.value.trim()) {
            formFields.message.classList.add('is-invalid');
            errors.push('Message is required');
            isValid = false;
        } else if (formFields.message.value.length < 10) {
            formFields.message.classList.add('is-invalid');
            errors.push('Message must be at least 10 characters long');
            isValid = false;
        }

        return { isValid, errors };
    }

    // Show error feedback
    function showErrorFeedback(message) {
        feedbackDiv.className = 'alert alert-danger mt-3';
        feedbackDiv.textContent = message;
        feedbackDiv.classList.remove('d-none');

        // Hide feedback after 5 seconds
        setTimeout(() => {
            feedbackDiv.classList.add('d-none');
        }, 5000);
    }

    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const { isValid, errors } = validateForm();

        if (!isValid) {
            showErrorFeedback(errors.join('. '));
            return;
        }

        try {
            // Simulate form submission - Replace with actual API endpoint
            const formData = {
                name: formFields.name.value,
                email: formFields.email.value,
                message: formFields.message.value
            };

            // Example API call (replace with your actual endpoint)
            // const response = await fetch('your-api-endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData)
            // });

            // Simulate successful submission
            console.log('Form submitted:', formData);
            
            // Reset form
            contactForm.reset();

            // Show thank you modal
            thankYouModal.show();

        } catch (error) {
            console.error('Submission error:', error);
            showErrorFeedback('There was an error sending your message. Please try again later.');
        }
    });

    // Handle modal close
    document.getElementById('thankYouModal').addEventListener('hidden.bs.modal', function () {
        // Additional cleanup or actions after modal closes if needed
    });
});








        
   

     














