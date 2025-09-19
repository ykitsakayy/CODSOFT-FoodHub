<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FoodHub - Complete Fix</title>
  <style>
    /* ===== GLOBAL STYLES ===== */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      /* Color Palette */
      --bg-primary: #121212;
      --bg-secondary: #1e1e1e;
      --bg-tertiary: #252525;
      --text-primary: #f5f5f5;
      --text-secondary: #cccccc;
      --accent-red: #e63946;
      --accent-red-dark: #c1121f;
      --accent-red-light: #f28482;
      --success: #4caf50;
      --warning: #ff9800;
      --danger: #f44336;
      --border-color: #333333;
      
      /* Typography */
      --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      --font-size-xs: 0.75rem;
      --font-size-sm: 0.875rem;
      --font-size-md: 1rem;
      --font-size-lg: 1.25rem;
      --font-size-xl: 1.5rem;
      --font-size-2xl: 2rem;
      
      /* Spacing */
      --spacing-xs: 0.25rem;
      --spacing-sm: 0.5rem;
      --spacing-md: 1rem;
      --spacing-lg: 1.5rem;
      --spacing-xl: 2rem;
      
      /* Border Radius */
      --border-radius-sm: 6px;
      --border-radius-md: 12px;
      --border-radius-lg: 18px;
      
      /* Shadows */
      --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
    }

    /* ===== BASE STYLES ===== */
    body {
      font-family: var(--font-family);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
      font-size: var(--font-size-md);
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-md);
    }

    .text-center {
      text-align: center;
    }

    /* ===== HEADER & NAVIGATION ===== */
    .header {
      background-color: var(--bg-secondary);
      padding: var(--spacing-md) 0;
      box-shadow: var(--shadow-sm);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
      position: relative;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .logo {
      height: 40px;
      width: 40px;
      background-color: var(--accent-red);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      box-shadow: 0 0 10px rgba(230, 57, 70, 0.5);
    }

    .site-title {
      color: var(--accent-red);
      font-size: var(--font-size-xl);
      font-weight: 700;
    }

    /* NAVIGATION BAR */
    .navbar {
      display: flex;
    }

    .nav-list {
      display: flex;
      list-style: none;
      gap: var(--spacing-lg);
    }

    .nav-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      padding: var(--spacing-xs) 0;
      position: relative;
    }

    .nav-link:hover, .nav-link.active {
      color: var(--accent-red);
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--accent-red);
    }

    /* Mobile menu button - hidden by default */
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: var(--text-primary);
      font-size: var(--font-size-xl);
      cursor: pointer;
    }

    /* ===== MAIN CONTENT ===== */
    .section {
      padding: var(--spacing-xl) 0;
    }

    .section-title {
      font-size: var(--font-size-xl);
      margin-bottom: var(--spacing-lg);
      color: var(--text-primary);
      font-weight: 600;
      text-align: center;
    }

    /* ===== BUTTONS ===== */
    .btn {
      display: inline-block;
      padding: var(--spacing-sm) var(--spacing-lg);
      border: none;
      border-radius: var(--border-radius-md);
      font-weight: 600;
      text-decoration: none;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background-color: var(--accent-red);
      color: white;
    }

    .btn-primary:hover {
      background-color: var(--accent-red-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .btn-secondary {
      background-color: transparent;
      color: var(--accent-red);
      border: 2px solid var(--accent-red);
    }

    .btn-secondary:hover {
      background-color: var(--accent-red);
      color: white;
    }

    /* ===== CARDS ===== */
    .card {
      background-color: var(--bg-secondary);
      border-radius: var(--border-radius-md);
      padding: var(--spacing-md);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }

    /* Special offer badges */
    .offer-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: var(--accent-red);
      color: white;
      padding: 4px 8px;
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-xs);
      font-weight: bold;
      z-index: 1;
    }

    /* Original price strikethrough */
    .original-price {
      text-decoration: line-through;
      color: var(--text-secondary);
      margin-right: var(--spacing-xs);
      font-size: var(--font-size-sm);
    }

    /* ===== HERO SECTION ===== */
    .hero {
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                 url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80');
      background-size: cover;
      background-position: center;
      padding: var(--spacing-xl) var(--spacing-md);
      text-align: center;
      color: white;
      border-radius: var(--border-radius-md);
      margin: var(--spacing-lg) auto;
      max-width: 1200px;
    }

    .hero-title {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--spacing-md);
      color: white;
    }

    .hero-subtitle {
      font-size: var(--font-size-lg);
      margin-bottom: var(--spacing-xl);
      color: #f0f0f0;
    }

    /* ===== GRID LAYOUTS ===== */
    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--spacing-lg);
      margin: var(--spacing-lg) 0;
    }

    /* ===== SPECIAL OFFERS LAYOUT ===== */
    #offers-section .menu-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: auto auto;
      gap: var(--spacing-lg);
      align-items: stretch;
    }

    #offers-section #offer-1 {
      grid-row: 1 / span 2;
      display: flex;
      flex-direction: column;
    }

    #offers-section #offer-1 .dish-image {
      flex: 1;
      min-height: 300px;
      object-fit: cover;
    }

    #offers-section .dish-image {
      height: 180px;
      object-fit: cover;
    }

    /* ===== DESSERTS LAYOUT ===== */
    #desserts-section .menu-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto auto auto;
      gap: var(--spacing-lg);
    }

    #desserts-section #dessert-3 {
      grid-column: 1 / -1;
    }

    #desserts-section .dish-image {
      height: 200px;
      object-fit: cover;
    }

    /* ===== IMAGES ===== */
    .dish-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-top-left-radius: var(--border-radius-md);
      border-top-right-radius: var(--border-radius-md);
      transition: transform 0.3s ease;
    }

    .dish-image:hover {
      transform: scale(1.05);
    }

    .dish-image-large {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: var(--border-radius-md);
    }

    .dish-link {
      display: block;
      overflow: hidden;
    }

    .card-body {
      padding: var(--spacing-md);
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .card-body .btn {
      margin-top: auto;
    }

    .dish-name {
      font-size: var(--font-size-lg);
      color: var(--text-primary);
      margin-bottom: var(--spacing-xs);
    }

    .dish-price {
      font-size: var(--font-size-md);
      color: var(--accent-red);
      font-weight: 600;
      margin-bottom: var(--spacing-sm);
    }

    .dish-description {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-md);
      font-size: var(--font-size-sm);
    }

    /* ===== FOOTER ===== */
    .footer {
      background-color: var(--bg-secondary);
      padding: var(--spacing-lg);
      text-align: center;
      margin-top: auto;
      border-top: 1px solid var(--border-color);
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
    }

    .footer-logo .logo {
      height: 30px;
      width: 30px;
    }

    .footer-text {
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 768px) {
      /* Header adjustments for mobile */
      .header-content {
        flex-wrap: wrap;
      }
      
      .menu-toggle {
        display: block;
        order: 2;
      }
      
      .navbar {
        display: none;
        width: 100%;
        order: 3;
        margin-top: var(--spacing-md);
      }
      
      .navbar.mobile-visible {
        display: block;
      }
      
      .nav-list {
        flex-direction: column;
        gap: var(--spacing-md);
      }
      
      /* Grid adjustments for mobile */
      .menu-grid {
        grid-template-columns: 1fr;
      }
      
      /* Special Offers Layout for Mobile */
      #offers-section .menu-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
      }
      
      #offers-section #offer-1 {
        grid-row: auto;
      }
      
      #offers-section #offer-1 .dish-image {
        min-height: 200px;
      }
      
      /* Desserts Layout for Mobile */
      #desserts-section .menu-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
      }
      
      #desserts-section #dessert-3 {
        grid-column: auto;
      }
      
      /* Button adjustments for mobile */
      .btn {
        width: 100%;
        margin: var(--spacing-xs) 0;
      }
    }

    /* Animation for better UX */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card, .btn {
      animation: fadeIn 0.5s ease forwards;
    }

    /* Focus states for accessibility */
    button:focus, 
    a:focus, 
    input:focus, 
    select:focus {
      outline: 2px solid var(--accent-red-light);
      outline-offset: 2px;
    }

    /* Prevent horizontal scrolling */
    html, body {
      overflow-x: hidden;
      width: 100%;
    }
  </style>
</head>
  
<body id="home-page">

  <!-- Header -->
  <header id="main-header" class="header">
    <div class="header-content">
      <div class="logo-container">
        <div class="logo">FH</div>
        <h1 class="site-title">FoodHub</h1>
      </div>
      <button class="menu-toggle" aria-label="Toggle navigation">☰</button>
      <nav id="nav-bar" class="navbar">
        <ul class="nav-list">
          <li><a href="#home" class="nav-link active">Home</a></li>
          <li><a href="#menu" class="nav-link">Menu</a></li>
          <li><a href="#cart" class="nav-link">Cart</a></li>
          <li><a href="#login" class="nav-link">Login</a></li>
          <li><a href="#signup" class="nav-link">Signup</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero-section" class="hero">
    <div class="hero-content">
      <h2 class="hero-title">Delicious Food, Delivered Fast</h2>
      <p class="hero-subtitle">Order from our wide variety of dishes and enjoy at home.</p>
      <a href="#menu" class="btn btn-primary">Order Now</a>
    </div>
  </section>

  <!-- Featured Dishes -->
  <main id="featured-section" class="container">
    <h2 class="section-title">Featured Dishes</h2>
    <div class="menu-grid">

      <div class="card dish-card" id="featured-1">
        <a href="#margherita" class="dish-link">
          <img src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Margherita Pizza" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Margherita Pizza</h3>
          <p class="dish-price">₹399.00</p>
          <a href="#margherita" class="btn btn-secondary">View Details</a>
        </div>
      </div>

      <div class="card dish-card" id="featured-2">
        <a href="#burger" class="dish-link">
          <img src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Cheese Burger" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Cheese Burger</h3>
          <p class="dish-price">₹249.00</p>
          <a href="#burger" class="btn btn-secondary">View Details</a>
        </div>
      </div>

      <div class="card dish-card" id="featured-3">
        <a href="#butter-chicken" class="dish-link">
          <img src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Butter Chicken" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Butter Chicken</h3>
          <p class="dish-price">₹349.00</p>
          <a href="#butter-chicken" class="btn btn-secondary">View Details</a>
        </div>
      </div>

      <div class="card dish-card" id="featured-4">
        <a href="#biryani" class="dish-link">
          <img src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Veg Biryani" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Veg Biryani</h3>
          <p class="dish-price">₹299.00</p>
          <a href="#biryani" class="btn btn-secondary">View Details</a>
        </div>
      </div>
    
    </div>
  </main>

  <!-- Special Offers Section -->
  <section id="offers-section" class="container">
    <h2 class="section-title">Special Offers</h2>
    <div class="menu-grid">

      <div class="card dish-card" id="offer-1">
        <div class="offer-badge">20% OFF</div>
        <a href="#family-combo" class="dish-link">
          <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Family Feast Combo" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Family Feast Combo</h3>
          <p class="dish-description">1 Large Margherita Pizza + 2 Cheese Burgers + 2 Soft Drinks + 1 Chocolate Brownie</p>
          <p class="dish-price"><span class="original-price">₹1,497.00</span> ₹1,048.00</p>
          <a href="#family-combo" class="btn btn-primary">Order Now</a>
        </div>
      </div>

      <div class="card dish-card" id="offer-2">
        <div class="offer-badge">SPECIAL</div>
        <a href="#paneer" class="dish-link">
          <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Paneer Tikka" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Paneer Tikka</h3>
          <p class="dish-description">Marinated paneer cubes grilled with bell peppers and spices</p>
          <p class="dish-price"><span class="original-price">₹349.00</span> ₹279.00</p>
          <a href="#paneer" class="btn btn-primary">Order Now</a>
        </div>
      </div>

      <div class="card dish-card" id="offer-3">
        <div class="offer-badge">RARE SPECIAL</div>
        <a href="#risotto" class="dish-link">
          <img src="https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Truffle Mushroom Risotto" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Truffle Mushroom Risotto</h3>
          <p class="dish-description">Creamy Arborio rice cooked with truffle oil and mushrooms</p>
          <p class="dish-price"><span class="original-price">₹899.00</span> ₹699.00</p>
          <a href="#risotto" class="btn btn-primary">Order Now</a>
        </div>
      </div>
      
    </div>
  </section>

  <!-- Desserts Section -->
  <section id="desserts-section" class="container">
    <h2 class="section-title">Sweet Desserts</h2>
    <div class="menu-grid">

      <div class="card dish-card" id="dessert-1">
        <a href="#cheesecake" class="dish-link">
          <img src="https://images.unsplash.com/photo-1524351199678-941a58a3df50?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="New York Cheesecake" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">New York Cheesecake</h3>
          <p class="dish-description">Rich and creamy cheesecake with a biscuit base</p>
          <p class="dish-price">₹179.00</p>
          <a href="#cheesecake" class="btn btn-secondary">View Details</a>
        </div>
      </div>

      <div class="card dish-card" id="dessert-2">
        <a href="#brownie" class="dish-link">
          <img src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Chocolate Brownie" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Chocolate Brownie</h3>
          <p class="dish-description">Warm, fudgy chocolate brownie with ice cream</p>
          <p class="dish-price">₹149.00</p>
          <a href="#brownie" class="btn btn-secondary">View Details</a>
        </div>
      </div>

      <div class="card dish-card" id="dessert-3">
        <a href="#tiramisu" class="dish-link">
          <img src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Tiramisu" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Tiramisu</h3>
          <p class="dish-description">Classic Italian dessert with layers of coffee-soaked sponge</p>
          <p class="dish-price">₹199.00</p>
          <a href="#tiramisu" class="btn btn-secondary">View Details</a>
        </div>
      </div>

      <div class="card dish-card" id="dessert-4">
        <a href="#gulab-jamun" class="dish-link">
          <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Gulab Jamun" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Gulab Jamun</h3>
          <p class="dish-description">Soft, deep-fried milk balls soaked in rose syrup</p>
          <p class="dish-price">₹49.00</p>
          <a href="#gulab-jamun" class="btn btn-secondary">View Details</a>
        </div>
      </div>

      <div class="card dish-card" id="dessert-5">
        <a href="#mango-mousse" class="dish-link">
          <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Mango Mousse" class="dish-image">
        </a>
        <div class="card-body">
          <h3 class="dish-name">Mango Mousse</h3>
          <p class="dish-description">Light and airy mango mousse made from fresh mangoes</p>
          <p class="dish-price">₹189.00</p>
          <a href="#mango-mousse" class="btn btn-secondary">View Details</a>
        </div>
      </div>
      
    </div>
  </section>

  <!-- Footer -->
  <footer id="main-footer" class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <div class="logo">FH</div>
        <span class="site-title">FoodHub</span>
      </div>
      <p class="footer-text">&copy; 2025 FoodHub. All Rights Reserved.</p>
    </div>
  </footer>

  <script>
    // Mobile navigation functionality
    document.addEventListener('DOMContentLoaded', function() {
      const menuToggle = document.querySelector('.menu-toggle');
      const navBar = document.querySelector('.navbar');
      
      if (menuToggle && navBar) {
        menuToggle.addEventListener('click', function() {
          navBar.classList.toggle('mobile-visible');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
          if (navBar.classList.contains('mobile-visible') && 
              !event.target.closest('.navbar') && 
              !event.target.closest('.menu-toggle')) {
            navBar.classList.remove('mobile-visible');
          }
        });
      }
      
      // Set active navigation link
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
          
          // Close mobile menu after clicking a link
          if (window.innerWidth <= 768) {
            navBar.classList.remove('mobile-visible');
          }
        });
      });
      
      // Simple cart functionality
      const addToCartButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
      addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          const dishName = this.closest('.card-body').querySelector('.dish-name').textContent;
          alert(`Added ${dishName} to cart!`);
        });
      });
    });
  </script>
</body>
</html>
