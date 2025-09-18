// script.js - Global functionality for FoodHub website

document.addEventListener('DOMContentLoaded', function() {
  // ===== MOBILE NAVIGATION =====
  const menuToggle = document.querySelector('.menu-toggle');
  const navBar = document.querySelector('.navbar');
  
  if (menuToggle && navBar) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navBar.classList.toggle('mobile-visible');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navBar.classList.contains('mobile-visible') && 
          !e.target.closest('.navbar') && 
          !e.target.closest('.menu-toggle')) {
        navBar.classList.remove('mobile-visible');
      }
    });
    
    // Close menu when a nav link is clicked (on mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navBar.classList.remove('mobile-visible');
        }
      });
    });
  }

  // ===== CART FUNCTIONALITY =====
  // Initialize cart if it doesn't exist
  if (!localStorage.getItem('foodhubCart')) {
    localStorage.setItem('foodhubCart', JSON.stringify([]));
  }
  
  // Get cart from localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem('foodhubCart')) || [];
  }
  
  // Update cart in localStorage
  function updateCart(cart) {
    localStorage.setItem('foodhubCart', JSON.stringify(cart));
    updateCartUI();
  }
  
  // Add item to cart
  function addToCart(item) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex > -1) {
      // Item exists, update quantity
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      // New item, add to cart
      cart.push(item);
    }
    
    updateCart(cart);
    
    // Show confirmation message
    showNotification(`${item.name} added to cart!`);
  }
  
  // Remove item from cart
  function removeFromCart(itemId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    updateCart(updatedCart);
  }
  
  // Update item quantity in cart
  function updateCartItemQuantity(itemId, quantity) {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
      cart[itemIndex].quantity = quantity;
      updateCart(cart);
    }
  }
  
  // Calculate cart total
  function calculateCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  // Update cart UI on pages that display cart info
  function updateCartUI() {
    const cart = getCart();
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    
    // Update cart count indicator in navigation (if exists)
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = cartCount;
    }
    
    // Update cart page if we're on it
    if (document.body.id === 'cart-page') {
      const emptyCart = document.getElementById('empty-cart');
      const cartItems = document.getElementById('cart-items');
      const cartSummary = document.getElementById('cart-summary');
      
      if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
        cartSummary.style.display = 'none';
      } else {
        emptyCart.style.display = 'none';
        cartItems.style.display = 'block';
        cartSummary.style.display = 'block';
        
        // Clear existing items
        cartItems.innerHTML = '';
        
        // Add items to cart
        cart.forEach(item => {
          const cartItemElement = document.createElement('div');
          cartItemElement.className = 'cart-item card';
          cartItemElement.id = `cart-item-${item.id}`;
          cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
              <h3 class="cart-item-name">${item.name}</h3>
              <p class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</p>
              <label for="qty-${item.id}" class="cart-label">Quantity:</label>
              <input type="number" id="qty-${item.id}" class="cart-qty" value="${item.quantity}" min="1">
              <button class="btn btn-danger remove-item" data-id="${item.id}">Remove</button>
            </div>
          `;
          cartItems.appendChild(cartItemElement);
          
          // Add event listeners for quantity changes and removal
          const quantityInput = document.getElementById(`qty-${item.id}`);
          quantityInput.addEventListener('change', function() {
            updateCartItemQuantity(item.id, parseInt(this.value));
          });
          
          const removeButton = cartItemElement.querySelector('.remove-item');
          removeButton.addEventListener('click', function() {
            removeFromCart(item.id);
          });
        });
        
        // Update total
        document.getElementById('cart-total-price').textContent = `₹${calculateCartTotal().toFixed(2)}`;
      }
    }
    
    // Update checkout page if we're on it
    if (document.body.id === 'checkout-page') {
      const checkoutItems = document.getElementById('checkout-items');
      const checkoutTotal = document.getElementById('checkout-total-price');
      
      if (checkoutItems) {
        checkoutItems.innerHTML = '';
        
        if (cart.length === 0) {
          checkoutItems.innerHTML = '<p class="text">No items in cart.</p>';
        } else {
          cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item';
            itemElement.innerHTML = `
              <p>${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}</p>
            `;
            checkoutItems.appendChild(itemElement);
          });
        }
      }
      
      if (checkoutTotal) {
        checkoutTotal.textContent = `₹${calculateCartTotal().toFixed(2)}`;
      }
    }
  }
  
  // ===== PRODUCT PAGE FUNCTIONALITY =====
  if (document.body.id === 'product-page') {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function() {
        const productName = document.querySelector('.dish-name').textContent;
        const productPrice = parseFloat(document.getElementById('product-price').textContent.replace('₹', ''));
        const productQuantity = parseInt(document.getElementById('product-qty').value) || 1;
        const productImage = document.querySelector('.dish-image-large').src;
        
        // Generate a simple ID from the product name
        const productId = productName.toLowerCase().replace(/\s+/g, '-');
        
        addToCart({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: productQuantity,
          image: productImage
        });
      });
    }
  }
  
  // ===== CHECKOUT FUNCTIONALITY =====
  if (document.body.id === 'checkout-page') {
    const checkoutForm = document.getElementById('checkout-form');
    const placeOrderBtn = document.getElementById('place-order-btn');
    
    if (checkoutForm && placeOrderBtn) {
      placeOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        const requiredFields = checkoutForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--accent-red)';
          } else {
            field.style.borderColor = '';
          }
        });
        
        if (!isValid) {
          showNotification('Please fill in all required fields', 'error');
          return;
        }
        
        // Check if cart is empty
        if (getCart().length === 0) {
          showNotification('Your cart is empty', 'error');
          return;
        }
        
        // In a real application, you would process the order here
        // For demo purposes, we'll just show a success message and clear the cart
        showNotification('Order placed successfully!', 'success');
        
        // Clear the cart
        localStorage.setItem('foodhubCart', JSON.stringify([]));
        
        // Redirect to home page after a delay
        setTimeout(() => {
          window.location.href = 'home.html';
        }, 2000);
      });
    }
  }
  
  // ===== FORM VALIDATION =====
  // Login and signup form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const inputs = this.querySelectorAll('input[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'var(--accent-red)';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // For demo purposes, just redirect
        if (this.id === 'checkout-form') {
          // Handled separately above
          return;
        }
        
        // Simulate successful login/signup
        showNotification('Success! Redirecting...', 'success');
        
        // Redirect based on form type
        setTimeout(() => {
          if (this.querySelector('input[type="password"]')) {
            if (window.location.pathname.includes('login')) {
              window.location.href = 'home.html';
            } else if (window.location.pathname.includes('signup')) {
              window.location.href = 'confirmation.html';
            }
          }
        }, 1000);
      } else {
        showNotification('Please fill in all required fields', 'error');
      }
    });
  });
  
  // ===== NOTIFICATION SYSTEM =====
  function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 20px;
          border-radius: var(--border-radius-md);
          color: white;
          font-weight: 500;
          z-index: 10000;
          box-shadow: var(--shadow-md);
          animation: slideIn 0.3s ease;
        }
        .notification-success {
          background-color: var(--success);
        }
        .notification-error {
          background-color: var(--accent-red);
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 3000);
  }
  
  // ===== INITIALIZE =====
  // Update cart UI on page load
  updateCartUI();
  
  // Add cart count to navigation if it doesn't exist
  if (!document.querySelector('.cart-count')) {
    const cartLink = document.querySelector('a[href="cart.html"]');
    if (cartLink) {
      const cartCount = document.createElement('span');
      cartCount.className = 'cart-count';
      cartCount.textContent = getCart().reduce((count, item) => count + item.quantity, 0);
      cartLink.appendChild(cartCount);
      
      // Add styles for cart count
      const styles = document.createElement('style');
      styles.textContent = `
        .cart-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--accent-red);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 0.75rem;
          margin-left: 5px;
        }
      `;
      document.head.appendChild(styles);
    }
  }
  
  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'home.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
