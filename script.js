// FoodHub - Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // ===== GLOBAL VARIABLES =====
    const CART_KEY = 'foodhub_cart';
    const USER_KEY = 'foodhub_user';
    
    // ===== UTILITY FUNCTIONS =====
    function getCart() {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    }
    
    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartCount();
    }
    
    function updateCartCount() {
        const cartCounters = document.querySelectorAll('.cart-count');
        const cart = getCart();
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartCounters.forEach(counter => {
            counter.textContent = totalItems;
            counter.style.display = totalItems > 0 ? 'inline-block' : 'none';
        });
    }
    
    function formatPrice(price) {
        return `₹${parseFloat(price).toFixed(2)}`;
    }
    
    // ===== NAVIGATION & UI =====
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.querySelector('.navbar');
    
    if (menuToggle && navBar) {
        menuToggle.addEventListener('click', function() {
            navBar.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                navBar.classList.contains('active') ? 'true' : 'false');
        });
    }
    
    // Update active navigation link
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            link.classList.remove('active');
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'home.html') ||
                (currentPage === 'index.html' && linkPage === 'home.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== CART FUNCTIONALITY =====
    // Add to cart functionality
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productId = window.location.pathname.split('/').pop().replace('.html', '');
            const productName = document.querySelector('.dish-name').textContent;
            const productPrice = parseFloat(document.getElementById('product-price').textContent.replace('₹', ''));
            const productImage = document.querySelector('.dish-image-large') ? 
                document.querySelector('.dish-image-large').src : 'placeholder.jpg';
            const quantity = parseInt(document.getElementById('product-qty').value) || 1;
            
            addToCart(productId, productName, productPrice, productImage, quantity);
            
            // Show confirmation
            showNotification(`${productName} added to cart!`);
        });
    }
    
    function addToCart(id, name, price, image, quantity) {
        const cart = getCart();
        const existingItemIndex = cart.findIndex(item => item.id === id);
        
        if (existingItemIndex > -1) {
            // Update quantity if item already exists
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.push({
                id,
                name,
                price,
                image,
                quantity
            });
        }
        
        saveCart(cart);
    }
    
    function removeFromCart(id) {
        const cart = getCart();
        const updatedCart = cart.filter(item => item.id !== id);
        saveCart(updatedCart);
        return updatedCart;
    }
    
    function updateCartItemQuantity(id, quantity) {
        const cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = quantity;
            }
            saveCart(cart);
        }
        
        return cart;
    }
    
    function calculateCartTotal(cart) {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // ===== CART PAGE FUNCTIONALITY =====
    function renderCartPage() {
        const cart = getCart();
        const emptyCart = document.getElementById('empty-cart');
        const cartItems = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        
        if (cart.length === 0) {
            emptyCart.style.display = 'block';
            cartItems.style.display = 'none';
            cartSummary.style.display = 'none';
            return;
        }
        
        emptyCart.style.display = 'none';
        cartItems.style.display = 'block';
        cartSummary.style.display = 'block';
        
        // Clear existing items
        cartItems.innerHTML = '';
        
        // Render each cart item
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item card';
            cartItemElement.id = `cart-item-${item.id}`;
            
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                    <label for="qty-${item.id}" class="cart-label">Quantity:</label>
                    <input type="number" id="qty-${item.id}" class="cart-qty" value="${item.quantity}" min="1">
                    <button class="btn btn-danger remove-btn">Remove</button>
                </div>
            `;
            
            cartItems.appendChild(cartItemElement);
            
            // Add event listeners for this item
            const quantityInput = document.getElementById(`qty-${item.id}`);
            const removeButton = cartItemElement.querySelector('.remove-btn');
            
            quantityInput.addEventListener('change', function() {
                const newQuantity = parseInt(this.value);
                updateCartItemQuantity(item.id, newQuantity);
                renderCartPage();
            });
            
            removeButton.addEventListener('click', function() {
                removeFromCart(item.id);
                renderCartPage();
            });
        });
        
        // Update total
        const total = calculateCartTotal(cart);
        document.getElementById('cart-total-price').textContent = formatPrice(total);
    }
    
    // ===== CHECKOUT PAGE FUNCTIONALITY =====
    function renderCheckoutPage() {
        const cart = getCart();
        const checkoutItems = document.getElementById('checkout-items');
        const checkoutTotal = document.getElementById('checkout-total-price');
        
        if (cart.length === 0) {
            checkoutItems.innerHTML = '<p class="text">No items in cart. <a href="menu.html">Browse menu</a></p>';
            checkoutTotal.textContent = formatPrice(0);
            return;
        }
        
        checkoutItems.innerHTML = '';
        let itemsHTML = '';
        
        cart.forEach(item => {
            itemsHTML += `
                <div class="checkout-item">
                    <p class="checkout-item-name">${item.name} x ${item.quantity}</p>
                    <p class="checkout-item-price">${formatPrice(item.price * item.quantity)}</p>
                </div>
            `;
        });
        
        checkoutItems.innerHTML = itemsHTML;
        
        const total = calculateCartTotal(cart);
        checkoutTotal.textContent = formatPrice(total);
        
        // Handle form submission
        const checkoutForm = document.getElementById('checkout-form');
        const placeOrderBtn = document.getElementById('place-order-btn');
        
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Basic form validation
                const fullName = document.getElementById('full-name').value;
                const email = document.getElementById('email').value;
                const address = document.getElementById('address').value;
                const phone = document.getElementById('phone').value;
                const payment = document.getElementById('payment').value;
                
                if (!fullName || !email || !address || !phone || !payment) {
                    showNotification('Please fill all required fields', 'error');
                    return;
                }
                
                // In a real app, you would process payment here
                // For demo, we'll just clear the cart and show success
                localStorage.removeItem(CART_KEY);
                showNotification('Order placed successfully!', 'success');
                
                // Redirect to home after a delay
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 2000);
            });
        }
    }
    
    // ===== USER AUTHENTICATION =====
    function handleLogin() {
        const loginForm = document.querySelector('#page .form');
        
        if (loginForm && window.location.pathname.includes('login.html')) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                
                // Basic validation
                if (!email || !password) {
                    showNotification('Please enter both email and password', 'error');
                    return;
                }
                
                // In a real app, you would verify credentials with a server
                // For demo, we'll just store in localStorage
                const user = { email, name: email.split('@')[0] };
                localStorage.setItem(USER_KEY, JSON.stringify(user));
                
                showNotification('Login successful!', 'success');
                
                // Redirect to home
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            });
        }
    }
    
    function handleSignup() {
        const signupForm = document.querySelector('#page .form');
        
        if (signupForm && window.location.pathname.includes('signup.html')) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Basic validation
                if (!name || !email || !password) {
                    showNotification('Please fill all fields', 'error');
                    return;
                }
                
                if (password.length < 6) {
                    showNotification('Password must be at least 6 characters', 'error');
                    return;
                }
                
                // In a real app, you would send this to a server
                // For demo, we'll just store in localStorage
                const user = { email, name };
                localStorage.setItem(USER_KEY, JSON.stringify(user));
                
                // Redirect to confirmation
                window.location.href = 'confirmation.html';
            });
        }
    }
    
    function checkAuth() {
        const user = JSON.parse(localStorage.getItem(USER_KEY));
        const protectedPages = ['cart.html', 'checkout.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage) && !user) {
            showNotification('Please login first', 'error');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 3000);
    }
    
    // ===== INITIALIZE APPROPRIATE FUNCTIONALITY BASED ON PAGE =====
    setActiveNavLink();
    updateCartCount();
    
    // Check if user is authenticated for protected pages
    checkAuth();
    
    // Initialize page-specific functionality
    if (document.getElementById('cart-section')) {
        renderCartPage();
    }
    
    if (document.getElementById('checkout-section')) {
        renderCheckoutPage();
    }
    
    if (document.getElementById('page')) {
        handleLogin();
        handleSignup();
    }
    
    // Social login buttons (placeholder functionality)
    const googleButtons = document.querySelectorAll('.btn-google');
    const facebookButtons = document.querySelectorAll('.btn-facebook');
    
    googleButtons.forEach(button => {
        button.addEventListener('click', () => {
            showNotification('Google login would be implemented here', 'info');
        });
    });
    
    facebookButtons.forEach(button => {
        button.addEventListener('click', () => {
            showNotification('Facebook login would be implemented here', 'info');
        });
    });
});

// Add these styles to your styles.css for the notifications
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification-success {
    background-color: #4CAF50;
}

.notification-error {
    background-color: #F44336;
}

.notification-info {
    background-color: #2196F3;
}

.notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-left: 15px;
}

.cart-count {
    display: none;
    background-color: #e74c3c;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    margin-left: 5px;
}

@media (max-width: 768px) {
    .notification {
        left: 20px;
        right: 20px;
        min-width: auto;
    }
}
`;

// Inject the notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
