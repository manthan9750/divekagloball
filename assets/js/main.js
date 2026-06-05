/* =========================================
   DIVEKAA GLOBAL - MAIN SYSTEM ENGINE
   CLEAN PRODUCTION VERSION (FIXED)
========================================= */

/* ---------- PRODUCT DATABASE ---------- */
const PRODUCTS = [
  {
    id: "masala-paan",
    name: "Masala Paan",
    flavor: "spicy",
    price: 199,
    image: "assets/images/products/masala-paan.jpg",
    description: "A refreshing blend of traditional paan with spicy undertones."
  },
  {
    id: "saffron-royal",
    name: "Saffron Royal",
    flavor: "dessert",
    price: 249,
    image: "assets/images/products/saffron-royal.jpg",
    description: "Premium saffron infused jaggery cubes for a royal taste."
  },
  {
    id: "butterscotch",
    name: "Butterscotch",
    flavor: "dessert",
    price: 199,
    image: "assets/images/products/butterscotch.jpg",
    description: "Sweet creamy butterscotch flavor with natural jaggery base."
  },
  {
    id: "rose-delight",
    name: "Rose Delight",
    flavor: "fruity",
    price: 179,
    image: "assets/images/products/rose-delight.jpg",
    description: "Floral rose essence blended into soft jaggery cubes."
  },
  {
    id: "tulsi-ginger",
    name: "Tulsi Ginger",
    flavor: "herbal",
    price: 189,
    image: "assets/images/products/tulsi-ginger.jpg",
    description: "Ayurvedic herbal mix for immunity and freshness."
  },
  {
    id: "lemon-mint",
    name: "Lemon Mint",
    flavor: "fruity",
    price: 189,
    image: "assets/images/products/lemon-mint.jpg",
    description: "Zesty lemon with cooling mint freshness."
  },
  {
    id: "elaichi-delight",
    name: "Elaichi Delight",
    flavor: "dessert",
    price: 199,
    image: "assets/images/products/elaichi-delight.jpg",
    description: "Classic cardamom flavor with premium jaggery sweetness."
  },
  {
    id: "chocolate-fusion",
    name: "Chocolate Fusion",
    flavor: "dessert",
    price: 219,
    image: "assets/images/products/chocolate-fusion.jpg",
    description: "Modern chocolate twist on traditional jaggery."
  },
  {
    id: "fennel-fresh",
    name: "Fennel Fresh",
    flavor: "herbal",
    price: 179,
    image: "assets/images/products/fennel-fresh.jpg",
    description: "Digestive-friendly fennel infused jaggery cubes."
  },
  {
    id: "mango-twist",
    name: "Mango Twist",
    flavor: "fruity",
    price: 199,
    image: "assets/images/products/mango-twist.jpg",
    description: "Tropical mango flavor with natural sweetness."
  },
  {
    id: "coconut-jaggery",
    name: "Coconut Jaggery",
    flavor: "fruity",
    price: 189,
    image: "assets/images/products/coconut-jaggery.jpg",
    description: "Coconut blended traditional jaggery cubes."
  },
  {
    id: "ginger-cardamom",
    name: "Ginger Cardamom",
    flavor: "spicy",
    price: 189,
    image: "assets/images/products/ginger-cardamom.jpg",
    description: "Warming ginger and aromatic cardamom fusion."
  }
];

/* ---------- GET PRODUCT ---------- */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

/* ---------- RENDER PRODUCTS GRID ---------- */
function renderProducts(containerId, filter = "all") {
  const container = document.getElementById(containerId);
  if (!container) return;

  let filtered = PRODUCTS;

  if (filter !== "all") {
    filtered = PRODUCTS.filter(p => p.flavor === filter);
  }

  container.innerHTML = filtered.map(product => `
    <div class="product-card">

      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>

      <span class="price">₹${product.price}</span>

      <div class="product-actions">

        <button onclick='addToCart(${JSON.stringify(product).replace(/"/g, "&quot;")})'>
          Add to Cart
        </button>

        <button onclick='addToWishlist(${JSON.stringify(product).replace(/"/g, "&quot;")})'>
          ♡
        </button>

        <a href="product.html?id=${product.id}">View</a>

      </div>

    </div>
  `).join("");
}

/* ---------- FEATURED PRODUCTS ---------- */
function renderFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  const featured = PRODUCTS.slice(0, 6);

  container.innerHTML = featured.map(product => `
    <div class="product-card">

      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <span class="price">₹${product.price}</span>

      <div class="product-actions">

        <button onclick='addToCart(${JSON.stringify(product).replace(/"/g, "&quot;")})'>
          Add to Cart
        </button>

        <a href="product.html?id=${product.id}">
          View
        </a>

      </div>

    </div>
  `).join("");
}

/* ---------- PRODUCT PAGE LOADER ---------- */
function loadProductPage() {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  const product = getProductById(id);
  if (!product) return;

  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-description").textContent = product.description;
  document.getElementById("main-product-image").src = product.image;

  const priceEl = document.getElementById("product-price");
  if (priceEl) priceEl.textContent = "₹" + product.price;

  const cartBtn = document.getElementById("add-to-cart-btn");
  if (cartBtn) cartBtn.onclick = () => addToCart(product);

  const wishlistBtn = document.getElementById("wishlist-btn");
  if (wishlistBtn) wishlistBtn.onclick = () => addToWishlist(product);

  // ✅ IMPORTANT FIX
  loadRelatedProducts(product);
}

/* ---------- RELATED PRODUCTS (FIXED) ---------- */
function loadRelatedProducts(currentProduct) {

  if (!currentProduct) return;

  const related = PRODUCTS
    .filter(p =>
      p.flavor === currentProduct.flavor &&
      p.id !== currentProduct.id
    )
    .slice(0, 4);

  const container = document.getElementById("related-products");
  if (!container) return;

  container.innerHTML = related.map(p => `
    <div class="product-card">

      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>

      <span class="price">₹${p.price}</span>

      <a href="product.html?id=${p.id}" class="btn primary">
        View Product
      </a>

    </div>
  `).join("");
}

/* ---------- SEARCH ---------- */
function initSearch() {

  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(value) ||
      p.flavor.toLowerCase().includes(value)
    );

    const container = document.getElementById("product-grid");
    if (!container) return;

    container.innerHTML = filtered.map(product => `
      <div class="product-card">

        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>

        <span class="price">₹${product.price}</span>

        <div class="product-actions">

          <button onclick='addToCart(${JSON.stringify(product).replace(/"/g, "&quot;")})'>
            Add to Cart
          </button>

          <a href="product.html?id=${product.id}">
            View Product
          </a>

        </div>

      </div>
    `).join("");
  });
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {

  renderFeaturedProducts();
  renderProducts("product-grid", "all");
  loadProductPage();
  initSearch();

});
