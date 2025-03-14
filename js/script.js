
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get visitor's name on page load
    let visitorName = prompt("Please enter your name:", "Visitor");
    
    // Update the welcome message
    if (visitorName !== null && visitorName !== "") {
        document.getElementById('visitorName').textContent = visitorName;
    }

    // Slideshow functionality
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    // Show slides initially
    showSlides();
    
    // Auto-slide function
    function showSlides() {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].classList.remove("active-dot");
        }
        
        // Increment slide index
        slideIndex++;
        
        // Reset to first slide if at the end
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        
        // Display current slide and activate corresponding dot
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active-dot");
        
        // Change image every 3 seconds
        setTimeout(showSlides, 3000);
    }
    
    // Manual navigation with dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function() {
            slideIndex = i;
            for (let j = 0; j < slides.length; j++) {
                slides[j].style.display = "none";
                dots[j].classList.remove("active-dot");
            }
            slides[i].style.display = "block";
            dots[i].classList.add("active-dot");
        });
    }

    // Update current time on the form result
    function updateCurrentTime() {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        document.getElementById('currentTime').textContent = now.toLocaleString('en-US', options);
    }
    
    // Set initial time and update every second
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const formResult = document.getElementById('formResult');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const birthdate = document.getElementById('birthdate').value;
        const genderElement = document.querySelector('input[name="gender"]:checked');
        const gender = genderElement ? genderElement.value : '';
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name) {
            alert('Please enter your name.');
            return;
        }
        
        if (!birthdate) {
            alert('Please enter your birth date.');
            return;
        }
        
        if (!message) {
            alert('Please enter your message.');
            return;
        }
        
        // Format birthdate to DD/MM/YYYY
        const birthdateObj = new Date(birthdate);
        const formattedBirthdate = `${String(birthdateObj.getDate()).padStart(2, '0')}/${String(birthdateObj.getMonth() + 1).padStart(2, '0')}/${birthdateObj.getFullYear()}`;
        
        // Display form values
        document.getElementById('resultName').textContent = name;
        document.getElementById('resultBirthdate').textContent = formattedBirthdate;
        document.getElementById('resultGender').textContent = gender;
        document.getElementById('resultMessage').textContent = message;
        
        // Show the result
        formResult.style.display = 'block';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll to the target section
            window.scrollTo({
                top: targetSection.offsetTop - 60, // Offset for fixed header
                behavior: 'smooth'
            });
        });
    });
});
// Add to your existing script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Get the hamburger menu and navigation
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when a navigation link is clicked
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !hamburger.contains(event.target) && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
    
    // Your existing code continues...
});