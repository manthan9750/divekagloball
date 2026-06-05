/* ===============================
   DIVEKAA GLOBAL - CART SYSTEM
   Production-level localStorage cart engine
================================= */

/* ---------- CART STORAGE KEY ---------- */
const CART_KEY = "divekaa_cart";

/* ---------- GET CART ---------- */
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

/* ---------- SAVE CART ---------- */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

/* ---------- ADD TO CART ---------- */
function addToCart(product) {
  let cart = getCart();

  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart(cart);
}

/* ---------- REMOVE ITEM ---------- */
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

/* ---------- UPDATE QUANTITY ---------- */
function updateQuantity(productId, type) {
  let cart = getCart();

  cart = cart.map(item => {
    if (item.id === productId) {
      if (type === "increase") {
        item.quantity += 1;
      } else if (type === "decrease") {
        item.quantity -= 1;
      }
    }
    return item;
  }).filter(item => item.quantity > 0);

  saveCart(cart);
  renderCart();
}

/* ---------- CART COUNT ---------- */
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}

/* ---------- CALCULATE TOTAL ---------- */
function calculateTotal() {
  const cart = getCart();

  const subtotal = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
}

/* ---------- RENDER CART ---------- */
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");

  if (!cartItemsContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (emptyCart) emptyCart.style.display = "block";
    cartItemsContainer.innerHTML = "";
    updateSummary();
    return;
  }

  if (emptyCart) emptyCart.style.display = "none";

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />

      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${item.flavor || ""}</p>
        <span>₹${item.price || 0}</span>
      </div>

      <div class="cart-controls">

        <button onclick="updateQuantity('${item.id}', 'decrease')">-</button>

        <span>${item.quantity}</span>

        <button onclick="updateQuantity('${item.id}', 'increase')">+</button>

      </div>

      <button class="remove-btn" onclick="removeFromCart('${item.id}')">
        ✕
      </button>
    </div>
  `).join("");

  updateSummary();
}

/* ---------- UPDATE SUMMARY ---------- */
function updateSummary() {
  const { subtotal, shipping, total } = calculateTotal();

  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (shippingEl) shippingEl.textContent = `₹${shipping}`;
  if (totalEl) totalEl.textContent = `₹${total}`;
}

/* ---------- CHECKOUT ACTION ---------- */
function initCheckout() {
  const btn = document.getElementById("checkout-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      const cart = getCart();

      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      alert("Checkout system will be integrated with payment gateway next stage.");
    });
  }
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
  initCheckout();
});
