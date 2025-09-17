// Keys for localStorage
const usersKey = 'foodHubUsers';
const loggedUserKey = 'loggedInUser';
const cartKey = 'userCart';

// Example dishes
const dishes = [
    { name: "Butter Chicken", price: 10 },
    { name: "Cheeseburger", price: 8 },
    { name: "Chocolate Brownie", price: 5 },
];

// Utility functions
const getUsers = () => JSON.parse(localStorage.getItem(usersKey)) || [];
const saveUsers = users => localStorage.setItem(usersKey, JSON.stringify(users));
const getCart = () => JSON.parse(localStorage.getItem(cartKey)) || [];
const saveCart = cart => localStorage.setItem(cartKey, JSON.stringify(cart));

// Signup
function signup() {
    const username = document.getElementById('signupUsername')?.value;
    const password = document.getElementById('signupPassword')?.value;
    if (!username || !password) return;

    let users = getUsers();
    if (users.find(u => u.username === username)) {
        alert('Username already taken 😱');
        return;
    }

    users.push({ username, password });
    saveUsers(users);
    alert('Signup successful 🎉! Please log in now 💕');
}

// Login
function login() {
    const username = document.getElementById('loginUsername')?.value;
    const password = document.getElementById('loginPassword')?.value;
    if (!username || !password) return;

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem(loggedUserKey, username);
        localStorage.setItem(cartKey, JSON.stringify([]));
        alert(`Welcome back, ${username} 😍`);
        showUserPanel();
    } else {
        alert('Invalid username or password 😓');
    }
}

// Logout
function logout() {
    localStorage.removeItem(loggedUserKey);
    localStorage.removeItem(cartKey);
    document.getElementById('userPanel')?.style.setProperty('display', 'none');
    document.getElementById('signupForm')?.style.setProperty('display', 'block');
    document.getElementById('loginForm')?.style.setProperty('display', 'block');
    alert('Logged out successfully 💕');
}

// Show user panel
function showUserPanel() {
    const currentUser = localStorage.getItem(loggedUserKey);
    if (!currentUser) return;

    document.getElementById('signupForm')?.style.setProperty('display', 'none');
    document.getElementById('loginForm')?.style.setProperty('display', 'none');
    document.getElementById('userPanel')?.style.setProperty('display', 'block');

    if (document.getElementById('currentUser'))
        document.getElementById('currentUser').textContent = currentUser;

    updateCartDisplay();
}

// Cart
function addToCart(dishName) {
    const dish = dishes.find(d => d.name === dishName);
    if (dish) {
        const cart = getCart();
        cart.push(dish);
        saveCart(cart);
        alert(`${dishName} added to cart 🛒`);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElem = document.getElementById('totalPrice');
    if (!cartItemsContainer || !totalPriceElem) return;

    const cart = getCart();
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} `;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove ❌";
        removeBtn.onclick = () => {
            cart.splice(index, 1);
            saveCart(cart);
            updateCartDisplay();
        };

        li.appendChild(removeBtn);
        cartItemsContainer.appendChild(li);
    });

    totalPriceElem.textContent = total.toFixed(2);
}

function toggleCart() {
    const container = document.getElementById('cartContainer');
    if (container) {
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
    }
}

function clearCart() {
    saveCart([]);
    updateCartDisplay();
}

// Init on page load
window.onload = () => {
    if (localStorage.getItem(loggedUserKey)) {
        showUserPanel();
    }

    document.getElementById('viewCart')?.addEventListener('click', toggleCart);
    document.getElementById('clearCart')?.addEventListener('click', clearCart);
};
