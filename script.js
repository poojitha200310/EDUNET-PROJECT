const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active')
    })
}
if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active')
    })
}



// ---- CART DATA ----
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// ---- ADD TO CART ----
document.querySelectorAll(".cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let product = btn.closest(".pro");

    // ✅ Each product must have unique data-id in HTML
    let id = product.getAttribute("data-id");
    let name = product.querySelector("h5").innerText;
    let price = parseFloat(product.querySelector("h4").innerText.replace("$", ""));
    let img = product.querySelector("img").src;

    let existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price, img, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart`);
  });
});

// ---- UPDATE CART COUNT (badge) ----
function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  let badge = document.querySelector("#cart-count");
  if (badge) {
    if (count > 0) {
      badge.style.display = "inline-block";
      badge.innerText = count;
    } else {
      badge.style.display = "none";
    }
  }
}

// ---- DISPLAY CART PAGE ----
if (document.querySelector("#cart table tbody")) {
  let tbody = document.querySelector("#cart table tbody");
  tbody.innerHTML = "";
  cart.forEach((item, i) => {
    let subtotal = (item.price * item.qty).toFixed(2);
    tbody.innerHTML += `
      <tr>
        <td><a href="#" onclick="removeItem(${i})"><i class="far fa-times-circle"></i></a></td>
        <td><img src="${item.img}" alt=""></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td><input type="number" value="${item.qty}" min="1" onchange="changeQty(${i}, this.value)"></td>
        <td>$${subtotal}</td>
      </tr>
    `;
  });
  updateTotals();
}

// ---- REMOVE ITEM ----
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// ---- CHANGE QUANTITY ----
function changeQty(index, qty) {
  cart[index].qty = parseInt(qty);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  location.reload();
}

// ---- CLEAR CART ----
function clearCart() {
  localStorage.removeItem("cart");
  location.reload();
}

// ---- APPLY COUPON ----
function applyCoupon() {
  let code = document.querySelector("#coupon input").value.trim();
  let discount = 0;

  if (code === "SAVE10") discount = 0.1; // 10% off
  else if (code === "SAVE20") discount = 0.2; // 20% off
  else alert("Invalid coupon");

  if (discount > 0) {
    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    let newTotal = total - total * discount;
    document.querySelector("#subtotal table").innerHTML = `
      <tr><td>Cart Subtotal</td><td>$${total.toFixed(2)}</td></tr>
      <tr><td>Discount</td><td>-${(total * discount).toFixed(2)}</td></tr>
      <tr><td><strong>Total</strong></td><td><strong>$${newTotal.toFixed(2)}</strong></td></tr>
    `;
  }
}
// ---- REMOVE COUPON ----
function removeCoupon() {
  appliedCoupon = null;
  localStorage.removeItem("appliedCoupon");
  updateTotals();
  alert("Coupon removed.");
}

// ---- UPDATE TOTALS ----
function updateTotals() {
  if (document.querySelector("#subtotal table")) {
    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.querySelector("#subtotal table").innerHTML = `
      <tr><td>Cart Subtotal</td><td>$${total.toFixed(2)}</td></tr>
      <tr><td>Shipping</td><td>Free</td></tr>
      <tr><td><strong>Total</strong></td><td><strong>$${total.toFixed(2)}</strong></td></tr>
    `;
  }
}

// ---- HOOK BUTTONS ----
if (document.querySelector("#coupon button")) {
  document.querySelector("#coupon button").addEventListener("click", applyCoupon);
}











function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  let badge = document.querySelector("#cart-count");
  if (badge) {
    if (count > 0) {
      badge.style.display = "inline-block";
      badge.innerText = count;
    } else {
      badge.style.display = "none";
    }
  }
}



