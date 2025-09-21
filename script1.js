// FoodHub JavaScript - Complete functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application based on current page
    initApp();
});

function initApp() {
    // Check which page we're on and initialize accordingly
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    switch(page) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'login.html':
            initLoginPage();
            break;
        case 'signup.html':
            initSignupPage();
            break;
        case 'confirmation.html':
            initConfirmationPage();
            break;
        default:
            // For other pages like home.html, menu.html, etc.
            if (checkAuth()) {
                initProtectedPages();
            } else {
                // Redirect to login if trying to access protected pages without auth
                window.location.href = 'login.html';
            }
            break;
    }
    
    // Common functionality for all pages
    initCommonFeatures();
}

function initCommonFeatures() {
    // Initialize any tooltips or popovers
    initTooltips();
    
    // Add animation to elements when they come into view
    initScrollAnimations();
    
    // Handle any session-related functionality
    checkSession();
}

function initHomePage() {
    // Home page specific functionality
    console.log('FoodHub Home Page initialized');
    
    // Add click event listeners to the call-to-action buttons
    const signupBtn = document.querySelector('a[href="signup.html"]');
    const loginBtn = document.querySelector('a[href="login.html"]');
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'signup.html';
        });
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }
}

function initLoginPage() {
    const loginForm = document.querySelector('.form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (validateLoginForm(email, password)) {
                simulateLogin(email, password);
            }
        });
        
        // Add real-time validation
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        
        emailInput.addEventListener('blur', function() {
            validateEmailField(this);
        });
        
        passwordInput.addEventListener('blur', function() {
            validatePasswordField(this);
        });
        
        // Social login buttons (placeholder functionality)
        document.querySelector('.btn-google').addEventListener('click', function() {
            showNotification('Google login would be implemented here', 'info');
        });
        
        document.querySelector('.btn-facebook').addEventListener('click', function() {
            showNotification('Facebook login would be implemented here', 'info');
        });
    }
}

function initSignupPage() {
    const signupForm = document.querySelector('.form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (validateSignupForm(name, email, password)) {
                simulateSignup(name, email, password);
            }
        });
        
        // Add real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        nameInput.addEventListener('blur', function() {
            validateNameField(this);
        });
        
        emailInput.addEventListener('blur', function() {
            validateEmailField(this);
        });
        
        passwordInput.addEventListener('blur', function() {
            validatePasswordField(this);
        });
        
        // Social signup buttons (placeholder functionality)
        document.querySelector('.btn-google').addEventListener('click', function() {
            showNotification('Google signup would be implemented here', 'info');
        });
        
        document.querySelector('.btn-facebook').addEventListener('click', function() {
            showNotification('Facebook signup would be implemented here', 'info');
        });
    }
}

function initConfirmationPage() {
    // Any confirmation page specific functionality
    console.log('Confirmation page loaded');
    
    // Add a countdown to automatic redirect
    let countdown = 5;
    const countdownElement = document.createElement('p');
    countdownElement.className = 'countdown-text';
    countdownElement.style.marginTop = '20px';
    countdownElement.style.color = 'var(--text-secondary)';
    countdownElement.innerHTML = `Redirecting to home page in <span style="color: var(--accent-red); font-weight: bold;">${countdown}</span> seconds...`;
    
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.appendChild(countdownElement);
    }
    
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            window.location.href = 'home.html';
        } else {
            countdownElement.innerHTML = `Redirecting to home page in <span style="color: var(--accent-red); font-weight: bold;">${countdown}</span> seconds...`;
        }
    }, 1000);
}

function initProtectedPages() {
    // Initialize functionality for pages that require authentication
    console.log('Protected page initialized for user:', getCurrentUser().email);
    
    // You would add page-specific functionality here
}

function validateLoginForm(email, password) {
    // Reset previous errors
    clearErrors();
    
    let isValid = true;
    
    // Email validation
    if (!validateEmailField(document.getElementById('login-email'))) {
        isValid = false;
    }
    
    // Password validation
    if (!validatePasswordField(document.getElementById('login-password'))) {
        isValid = false;
    }
    
    return isValid;
}

function validateSignupForm(name, email, password) {
    // Reset previous errors
    clearErrors();
    
    let isValid = true;
    
    // Name validation
    if (!validateNameField(document.getElementById('name'))) {
        isValid = false;
    }
    
    // Email validation
    if (!validateEmailField(document.getElementById('email'))) {
        isValid = false;
    }
    
    // Password validation
    if (!validatePasswordField(document.getElementById('password'))) {
        isValid = false;
    }
    
    return isValid;
}

function validateNameField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showError(field, 'Full name is required');
        return false;
    } else if (value.length < 2) {
        showError(field, 'Name must be at least 2 characters');
        return false;
    }
    
    return true;
}

function validateEmailField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showError(field, 'Email is required');
        return false;
    } else if (!isValidEmail(value)) {
        showError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function validatePasswordField(field) {
    const value = field.value;
    
    if (!value) {
        showError(field, 'Password is required');
        return false;
    } else if (value.length < 6) {
        showError(field, 'Password must be at least 6 characters');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(field, message) {
    // Remove any existing error for this field
    clearFieldError(field);
    
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--accent-red)';
    errorElement.style.marginTop = '5px';
    errorElement.style.fontSize = '0.9rem';
    
    // Insert after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    // Remove any existing error message for this field
    const nextElement = field.nextElementSibling;
    if (nextElement && nextElement.classList.contains('error-message')) {
        nextElement.remove();
    }
}

function clearErrors() {
    // Remove error classes from all fields
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
    
    // Remove all error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
}

function simulateLogin(email, password) {
    // Simulate API call delay
    const submitButton = document.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    setTimeout(() => {
        // Check if user exists in localStorage (from signup)
        const users = JSON.parse(localStorage.getItem('foodHubUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store current user session
            localStorage.setItem('currentUser', JSON.stringify(user));
            showNotification('Login successful! Redirecting to home page...', 'success');
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        } else {
            showNotification('Invalid email or password. Please try again.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    }, 1500);
}

function simulateSignup(name, email, password) {
    // Simulate API call delay
    const submitButton = document.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Creating account...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    setTimeout(() => {
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('foodHubUsers')) || [];
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
            showNotification('This email is already registered. Please use a different email or login.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            return;
        }
        
        // Add new user
        const newUser = { name, email, password, joinDate: new Date().toISOString() };
        users.push(newUser);
        localStorage.setItem('foodHubUsers', JSON.stringify(users));
        
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        showNotification('Account created successfully! Redirecting to confirmation page...', 'success');
        
        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = 'confirmation.html';
        }, 1500);
    }, 1500);
}

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user !== null;
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || {};
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = 'var(--border-radius-md)';
    notification.style.boxShadow = 'var(--shadow-md)';
    notification.style.zIndex = '1000';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.justifyContent = 'space-between';
    notification.style.minWidth = '300px';
    notification.style.maxWidth = '500px';
    notification.style.animation = 'slideIn 0.3s ease forwards';
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = 'var(--success)';
            notification.style.color = 'white';
            break;
        case 'error':
            notification.style.backgroundColor = 'var(--danger)';
            notification.style.color = 'white';
            break;
        case 'warning':
            notification.style.backgroundColor = 'var(--warning)';
            notification.style.color = 'black';
            break;
        default:
            notification.style.backgroundColor = 'var(--bg-secondary)';
            notification.style.color = 'var(--text-primary)';
            notification.style.border = '1px solid var(--border-color)';
    }
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'inherit';
    closeButton.style.fontSize = '1.2rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.marginLeft = '10px';
    
    closeButton.addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

function initTooltips() {
    // Add tooltip functionality to elements with data-tooltip attribute
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            // Style the tooltip
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--bg-tertiary)';
            tooltip.style.color = 'var(--text-primary)';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = 'var(--border-radius-sm)';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.zIndex = '1000';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.boxShadow = 'var(--shadow-sm)';
            tooltip.style.pointerEvents = 'none';
            
            // Position the tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - 35) + 'px';
            tooltip.style.left = (rect.left + (rect.width / 2)) + 'px';
            tooltip.style.transform = 'translateX(-50%)';
            
            // Add to document
            document.body.appendChild(tooltip);
            
            // Remove on mouse leave
            this.addEventListener('mouseleave', function() {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, { once: true });
        });
    });
}

function initScrollAnimations() {
    // Add intersection observer for scroll animations
    const animatedElements = document.querySelectorAll('.card, .btn, .dish-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
}

function checkSession() {
    // Check if user session is still valid
    const user = getCurrentUser();
    if (user && user.email) {
        console.log('User is logged in:', user.email);
        // You could add session expiration logic here
    }
}

// Add CSS animations for notifications and scroll effects
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .loading::after {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s linear infinite;
        margin-left: 8px;
        vertical-align: middle;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
