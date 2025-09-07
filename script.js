// script.js

// ------------------------------
// 1. SIGNUP / LOGIN HANDLER
// ------------------------------
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    // Save user info to localStorage
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Signup successful!");
    window.location.href = "confirmation.html";
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert("Login successful!");
      window.location.href = "home.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}

// ------------------------------
// 2. CART HANDLER
// ------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart (from product-details or menu)
const addToCartBtn = document.getElementById("add-to-cart-btn");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const productName = document.querySelector(".dish-name").textContent;
    const productPrice = parseFloat(document.getElementById("product-price").textContent.replace('$',''));
    const quantity = parseInt(document.getElementById("product-qty").value);

    // Check if item exists
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name: productName, price: productPrice, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} added to cart!`);
  });
}

// Display Cart Items (cart.html)
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCartDiv = document.getElementById("empty-cart");
  const cartSummary = document.getElementById("cart-summary");
  if (!cartItemsContainer || !emptyCartDiv || !cartSummary) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyCartDiv.style.display = "block";
    cartItemsContainer.style.display = "none";
    cartSummary.style.display = "none";
    return;
  }

  emptyCartDiv.style.display = "none";
  cartItemsContainer.style.display = "block";
  cartSummary.style.display = "block";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item", "card");
    div.innerHTML = `
      <h3 class="cart-item-name">${item.name}</h3>
      <p class="cart-item-price">$${item.price.toFixed(2)}</p>
      <label for="qty-${index}">Quantity:</label>
      <input type="number" id="qty-${index}" class="cart-qty" value="${item.quantity}" min="1">
      <button class="btn btn-danger" id="remove-${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(div);

    // Quantity change
    div.querySelector(`#qty-${index}`).addEventListener("change", function() {
      const newQty = parseInt(this.value);
      cart[index].quantity = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });

    // Remove button
    div.querySelector(`#remove-${index}`).addEventListener("click", function() {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });
  });

  document.getElementById("cart-total-price").textContent = `$${total.toFixed(2)}`;
}
displayCart();

// ------------------------------
// 3. Checkout Page
// ------------------------------
function displayCheckout() {
  const checkoutItems = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total-price");
  const placeOrderBtn = document.getElementById("place-order-btn");
  if (!checkoutItems || !checkoutTotal || !placeOrderBtn) return;

  let total = 0;
  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>No items in your cart.</p>";
    checkoutTotal.textContent = "$0.00";
    placeOrderBtn.disabled = true;
    return;
  }

  cart.forEach(item => {
    const p = document.createElement("p");
    p.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    checkoutItems.appendChild(p);
    total += item.price * item.quantity;
  });

  checkoutTotal.textContent = `$${total.toFixed(2)}`;

  placeOrderBtn.addEventListener("click", () => {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "confirmation.html";
  });
}
displayCheckout();
