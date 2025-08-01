// Initialize messages array
        let allMessages = [];

        // Wait for DOM to load
        document.addEventListener('DOMContentLoaded', function() {
            // Load saved messages from memory
            loadMessages();
            updateMessageCount();
            updateCurrentTime();
            setInterval(updateCurrentTime, 1000);

            // Form submission handler
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value.trim();
                const birthdate = document.getElementById('birthdate').value;
                const genderElement = document.querySelector('input[name="gender"]:checked');
                const gender = genderElement ? genderElement.value : '';
                const message = document.getElementById('message').value.trim();
                
                // Validate form
                if (!name) {
                    alert('❗ Mohon masukkan nama Anda.');
                    document.getElementById('name').focus();
                    return;
                }
                
                if (!birthdate) {
                    alert('❗ Mohon pilih tanggal lahir Anda.');
                    document.getElementById('birthdate').focus();
                    return;
                }
                
                if (!message) {
                    alert('❗ Mohon tulis pesan Anda.');
                    document.getElementById('message').focus();
                    return;
                }
                
                // Create message object
                const currentTime = new Date();
                const messageData = {
                    id: Date.now(), // Simple ID based on timestamp
                    name: name,
                    birthdate: birthdate,
                    gender: gender,
                    message: message,
                    timestamp: currentTime.toISOString(),
                    formattedTime: formatDateTime(currentTime)
                };
                
                // Add to messages array
                allMessages.unshift(messageData); // Add to beginning for newest first
                
                // Save messages
                saveMessages();
                
                // Display in form result
                displayFormResult(messageData);
                
                // Show success message
                showSuccessMessage();
                
                // Update message count
                updateMessageCount();
                
                // Reset form
                contactForm.reset();
                
                // Update messages display if currently viewing
                if (!document.getElementById('messages-list').classList.contains('messages-section')) {
                    displayAllMessages();
                }
            });
        });

        // Update current time display
        function updateCurrentTime() {
            const now = new Date();
            document.getElementById('currentTime').textContent = formatDateTime(now);
        }

        // Format date and time
        function formatDateTime(date) {
            const options = { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Asia/Jakarta'
            };
            return date.toLocaleString('id-ID', options);
        }

        // Display form result
        function displayFormResult(messageData) {
            const formResult = document.getElementById('formResult');
            
            document.getElementById('resultName').textContent = messageData.name;
            document.getElementById('resultBirthdate').textContent = formatBirthdate(messageData.birthdate);
            document.getElementById('resultGender').textContent = messageData.gender;
            document.getElementById('resultMessage').textContent = messageData.message;
            
            formResult.style.display = 'block';
        }

        // Format birthdate
        function formatBirthdate(birthdate) {
            const date = new Date(birthdate);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        // Show success message
        function showSuccessMessage() {
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }

        // Show/hide sections
        function showSection(sectionName) {
            // Hide all sections
            document.getElementById('message-us').style.display = 'none';
            document.getElementById('messages-list').classList.add('messages-section');
            
            // Show selected section
            if (sectionName === 'message-us') {
                document.getElementById('message-us').style.display = 'block';
            } else if (sectionName === 'messages-list') {
                document.getElementById('messages-list').classList.remove('messages-section');
                displayAllMessages();
            }
            
            // Update active button
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }

        // Display all messages
        function displayAllMessages() {
            const container = document.getElementById('messagesContainer');
            const totalMessagesSpan = document.getElementById('totalMessages');
            
            totalMessagesSpan.textContent = allMessages.length;
            
            if (allMessages.length === 0) {
                container.innerHTML = `
                    <div class="no-messages">
                        📝 Belum ada pesan dari pengunjung.<br>
                        Pesan akan muncul di sini setelah ada yang mengirim.
                    </div>
                `;
                return;
            }
            
            let messagesHTML = '';
            allMessages.forEach((msg, index) => {
                const genderIcon = msg.gender === 'Laki-Laki' ? '👨' : '👩';
                messagesHTML += `
                    <div class="message-card">
                        <div class="message-header">
                            <div class="message-sender">${genderIcon} ${msg.name}</div>
                            <div class="message-time">⏰ ${msg.formattedTime}</div>
                        </div>
                        <div class="message-details">
                            <div class="message-detail">
                                <span>🎂 Tanggal Lahir:</span> ${formatBirthdate(msg.birthdate)}
                            </div>
                            <div class="message-detail">
                                <span>👤 Jenis Kelamin:</span> ${msg.gender}
                            </div>
                        </div>
                        <div class="message-content">
                            <strong>💬 Pesan:</strong><br>
                            ${msg.message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = messagesHTML;
        }

        // Update message count in navigation
        function updateMessageCount() {
            document.getElementById('messageCount').textContent = allMessages.length;
        }

        // Clear all messages
        function clearAllMessages() {
            if (allMessages.length === 0) {
                alert('📝 Tidak ada pesan untuk dihapus.');
                return;
            }
            
            if (confirm(`🗑️ Yakin ingin menghapus semua ${allMessages.length} pesan?\n\nTindakan ini tidak dapat dibatalkan!`)) {
                allMessages = [];
                saveMessages();
                displayAllMessages();
                updateMessageCount();
                alert('✅ Semua pesan berhasil dihapus!');
            }
        }

        // Save messages to memory (in a real application, this would be saved to a server)
        function saveMessages() {
            // In this demo, messages are only stored in memory during the session
            // For production, you would need to implement server-side storage
            console.log('Messages saved:', allMessages.length, 'total messages');
        }

        // Load messages from memory
        function loadMessages() {
            // In this demo, messages are loaded from the current session
            // For production, you would load from server-side storage
            console.log('Messages loaded:', allMessages.length, 'messages found');
        }

        // Smooth scrolling for better UX
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Auto-scroll to top when switching sections
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                setTimeout(scrollToTop, 100);
            });
        });




// Function to navigate to different pages with error handling
        function navigateToPage(page) {
            const currentElement = event.currentTarget;
            
            // Add click effect
            currentElement.style.transform = 'translateY(-5px) scale(0.95)';
            
            // Show loading indicator
            showLoading();
            
            setTimeout(() => {
                // Reset transform
                currentElement.style.transform = '';
                
                // Hide loading
                hideLoading();
                
                try {
                    // Check if the page exists (basic check)
                    if (page && page.trim() !== '') {
                        // Navigate to the page
                        window.location.href = page;
                    } else {
                        throw new Error('Invalid page URL');
                    }
                } catch (error) {
                    console.error('Navigation error:', error);
                    showError(`Gagal membuka halaman ${page}. Pastikan file tersebut ada.`);
                }
            }, 300); // Reduced delay for better UX
        }

        // Function to show loading indicator
        function showLoading() {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.classList.add('show');
            }
        }

        // Function to hide loading indicator
        function hideLoading() {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.classList.remove('show');
            }
        }

        // Function to show error message
        function showError(message) {
            const errorMessage = document.getElementById('errorMessage');
            const errorText = document.getElementById('errorText');
            
            if (errorMessage && errorText) {
                errorText.textContent = message;
                errorMessage.classList.add('show');
                
                // Auto hide after 5 seconds
                setTimeout(() => {
                    hideError();
                }, 5000);
            }
        }

        // Function to hide error message
        function hideError() {
            const errorMessage = document.getElementById('errorMessage');
            if (errorMessage) {
                errorMessage.classList.remove('show');
            }
        }

        // Add keyboard accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                if (focusedElement.classList.contains('facility')) {
                    e.preventDefault();
                    focusedElement.click();
                }
            }
        });

        // Add ripple effect on click
        function createRipple(event) {
            const button = event.currentTarget;
            const circle = document.createElement("span");
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
            circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
            circle.classList.add("ripple");

            const ripple = button.getElementsByClassName("ripple")[0];
            if (ripple) {
                ripple.remove();
            }

            button.appendChild(circle);
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Add ripple effect to all facilities
            const facilities = document.querySelectorAll('.facility');
            facilities.forEach(facility => {
                facility.addEventListener('click', createRipple);
            });

            console.log('Facilitation section initialized successfully');
        });

        // Handle page visibility change (optional - for better UX)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                hideLoading();
            }
        });

        
        // Slideshow Logic
document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            dots[i].classList.remove("active-dot");
        });

        slides[index].classList.add("active");
        dots[index].classList.add("active-dot");
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    // Auto play
    showSlide(slideIndex);
    setInterval(nextSlide, 4000);

    // Manual click on dot
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            slideIndex = index;
            showSlide(slideIndex);
        });
    });
});
