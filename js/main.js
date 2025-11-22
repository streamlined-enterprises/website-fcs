// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
});

// Close nav menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
    });
});

// Carousel Functionality
const carousel = document.querySelector('.carousel');
const carouselTrack = carousel.querySelector('.carousel-track');
const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
const prevButton = carousel.querySelector('.carousel-prev');
const nextButton = carousel.querySelector('.carousel-next');
const indicators = Array.from(carousel.querySelectorAll('.indicator'));

let currentIndex = 0;
let intervalId = null;

function updateCarousel() {
    // Update active slide
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
        slide.setAttribute('aria-hidden', index !== currentIndex);
    });

    // Update active indicator
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
        indicator.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
    });
}

function goToSlide(index) {
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    updateCarousel();
}

function startCarouselInterval() {
    intervalId = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000); // Change slide every 5 seconds
}

function resetCarouselInterval() {
    clearInterval(intervalId);
    startCarouselInterval();
}

prevButton.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetCarouselInterval();
});

nextButton.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetCarouselInterval();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToSlide(index);
        resetCarouselInterval();
    });
});

// Initialize carousel
updateCarousel();
startCarouselInterval();

// Gallery Lightbox Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaptionTitle = document.getElementById('lightbox-title');
const lightboxCaptionDescription = document.getElementById('lightbox-description');
const lightboxCloseButton = lightbox.querySelector('.lightbox-close');
const lightboxPrevButton = lightbox.querySelector('.lightbox-prev');
const lightboxNextButton = lightbox.querySelector('.lightbox-next');

let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    const item = galleryItems[index];
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption'); // Assuming caption is within gallery-item
    
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaptionTitle.textContent = caption ? caption.querySelector('h3').textContent : '';
    lightboxCaptionDescription.textContent = caption ? caption.querySelector('p').textContent : '';
    
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    updateLightboxButtons();
}

function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scrolling
}

function updateLightboxButtons() {
    lightboxPrevButton.style.display = currentLightboxIndex > 0 ? 'block' : 'none';
    lightboxNextButton.style.display = currentLightboxIndex < galleryItems.length - 1 ? 'block' : 'none';
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

lightboxCloseButton.addEventListener('click', closeLightbox);

lightboxPrevButton.addEventListener('click', () => {
    if (currentLightboxIndex > 0) {
        openLightbox(currentLightboxIndex - 1);
    }
});

lightboxNextButton.addEventListener('click', () => {
    if (currentLightboxIndex < galleryItems.length - 1) {
        openLightbox(currentLightboxIndex + 1);
    }
});

// Close lightbox if clicked outside the image/caption
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const formName = document.getElementById('name');
const formEmail = document.getElementById('email');
const formMessage = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

function validateForm() {
    let isValid = true;

    // Name validation
    if (formName.value.trim() === '') {
        nameError.textContent = 'Full name is required.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formEmail.value.trim() === '') {
        emailError.textContent = 'Email address is required.';
        isValid = false;
    } else if (!emailPattern.test(formEmail.value)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Message validation
    if (formMessage.value.trim() === '') {
        messageError.textContent = 'Message is required.';
        isValid = false;
    } else {
        messageError.textContent = '';
    }

    return isValid;
}

contactForm.addEventListener('submit', (event) => {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    } else {
        // Here you would typically send the form data to a server
        // For now, we'll just log a success message
        console.log('Form submitted successfully!');
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset(); // Reset form after successful submission
    }
});

// Placeholder for gallery items generation (if needed dynamically)
// This part would typically fetch data and create .gallery-item elements
// For now, we assume gallery items are static in HTML or will be added manually.
// Example:
/*
const galleryGrid = document.querySelector('.gallery-grid');
const galleryData = [
    { src: 'images/gallery1.jpg', alt: 'Artwork 1', title: 'Abstract Bloom', description: 'A vibrant abstract piece.' },
    { src: 'images/gallery2.jpg', alt: 'Artwork 2', title: 'Geometric Flow', description: 'Exploring geometric forms.' },
    // ... more items
];

galleryData.forEach((itemData, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    galleryItem.innerHTML = `
        <img src="${itemData.src}" alt="${itemData.alt}" loading="lazy">
        <div class="gallery-caption">
            <h3>${itemData.title}</h3>
            <p>${itemData.description}</p>
        </div>
    `;
    galleryGrid.appendChild(galleryItem);
});
*/

// Add event listeners to dynamically generated gallery items if applicable
// document.querySelectorAll('.gallery-item').forEach((item, index) => { ... });

// Accessibility: Ensure focus management for lightbox
lightbox.addEventListener('shown', () => { // Custom event or similar logic needed
    lightboxCloseButton.focus();
});

// Add more JavaScript functionality as needed...
// e.g., smooth scrolling, animations, etc.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
