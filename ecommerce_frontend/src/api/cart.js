const CART_KEY = "ecommerce_cart";

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      title: product.name,
      price: parseFloat(product.price),
      image: product.image,
      qty,
    });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
}

export function updateQuantity(productId, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (item) item.qty = qty;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  return [];
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}
