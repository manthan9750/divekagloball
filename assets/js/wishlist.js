/* =========================================
   DIVEKAA GLOBAL - WISHLIST SYSTEM
   localStorage-based persistent wishlist
========================================= */

const WISHLIST_KEY = "divekaa_wishlist";

/* ---------- GET WISHLIST ---------- */
function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

/* ---------- SAVE WISHLIST ---------- */
function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

/* ---------- ADD / REMOVE TOGGLE ---------- */
function addToWishlist(product) {
  let list = getWishlist();

  const exists = list.find(item => item.id === product.id);

  if (exists) {
    list = list.filter(item => item.id !== product.id);
  } else {
    list.push(product);
  }

  saveWishlist(list);
  renderWishlistPage();
  updateWishlistUI();
}

/* ---------- REMOVE FROM WISHLIST ---------- */
function removeFromWishlist(id) {
  let list = getWishlist();
  list = list.filter(item => item.id !== id);
  saveWishlist(list);

  renderWishlistPage();
  updateWishlistUI();
}

/* ---------- CHECK IF ITEM EXISTS ---------- */
function isInWishlist(id) {
  return getWishlist().some(item => item.id === id);
}

/* ---------- UPDATE ICON STATES ---------- */
function updateWishlistUI() {
  const icons = document.querySelectorAll(".wishlist-icon");

  icons.forEach(btn => {
    const id = btn.getAttribute("data-id");
    if (!id) return;

    if (isInWishlist(id)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/* ---------- RENDER WISHLIST PAGE ---------- */
function renderWishlistPage() {
  const container = document.getElementById("wishlist-items");
  if (!container) return;

  const list = getWishlist();

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favorite Gud Bite flavors</p>
        <a href="products.html" class="btn primary">Explore Products</a>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(product => `
    <div class="product-card">

      <img src="${product.image}" alt="${product.name}">

      <h3>${product.name}</h3>

      <span class="price">₹${product.price}</span>

      <div class="product-actions">

        <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
          Add to Cart
        </button>

        <button onclick="removeFromWishlist('${product.id}')">
          Remove
        </button>

        <a href="product.html?id=${product.id}">View</a>

      </div>

    </div>
  `).join("");
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderWishlistPage();
  updateWishlistUI();
});
