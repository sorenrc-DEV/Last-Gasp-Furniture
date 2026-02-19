document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("purchaseBtn")
    .addEventListener("click", makePurchase);
});

const items = ["chair", "recliner", "table", "umbrella"];
const prices = [25.5, 37.75, 49.95, 24.89];

const zone1 = ["WA", "OR", "CA"];
const zone2 = ["ID", "NV", "AZ", "UT"];
const zone3 = ["MT", "WY", "CO", "NM"];
const zone4 = ["ND", "SD", "NE", "KS", "OK", "TX"];
const zone5 = ["MN", "IA", "MO", "AR", "LA", "WI", "IL", "MI", "IN", "KY", "TN", "MS", "AL", "GA", "FL"];
const zone6 = ["NY", "PA", "VA", "NC", "SC", "WV", "MD", "DE", "NJ", "CT", "RI", "MA", "VT", "NH", "ME", "AK", "HI"];

function makePurchase() {
  let cartItems = [];
  let cartQty = [];

  while (true) {
    let item = prompt(
      "What item would you like to buy today: Chair, Recliner, Table or Umbrella?"
    );

    if (!item) {
      alert("Transaction cancelled.");
      return;
    }

    item = item.toLowerCase();

    let index = items.indexOf(item);
    if (index === -1) {
      alert("Invalid item. Please try again.");
      continue;
    }

    let qty = prompt(`How many ${item} would you like to buy?`);
    if (!qty) {
      alert("Transaction cancelled.");
      return;
    }

    qty = parseInt(qty);

    if (isNaN(qty) || qty <= 0) {
      alert("Invalid quantity.");
      continue;
    }

    cartItems.push(index);
    cartQty.push(qty);

    let more = prompt("Continue shopping? y/n");
    if (!more || more.toLowerCase() !== "y") {
      break;
    }
  }

  let state = prompt("Enter two-letter state abbreviation:");
  if (!state) {
    alert("Transaction cancelled.");
    return;
  }

  state = state.toUpperCase();

  let subtotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    subtotal += prices[cartItems[i]] * cartQty[i];
  }

  subtotal = subtotal.toFixed(2);
  let tax = (subtotal * 0.15).toFixed(2);

  let shipping = getShipping(state, subtotal);
  let total = (parseFloat(subtotal) + parseFloat(tax) + shipping).toFixed(2);

  displayInvoice(cartItems, cartQty, state, subtotal, tax, shipping, total);
}

function getShipping(state, subtotal) {
  let zone = 6;

  if (zone1.includes(state)) zone = 1;
  else if (zone2.includes(state)) zone = 2;
  else if (zone3.includes(state)) zone = 3;
  else if (zone4.includes(state)) zone = 4;
  else if (zone5.includes(state)) zone = 5;

  let shipping = 0;

  switch (zone) {
    case 1:
      shipping = 0;
      break;
    case 2:
      shipping = 20;
      break;
    case 3:
      shipping = 30;
      break;
    case 4:
      shipping = 35;
      break;
    case 5:
      shipping = 45;
      break;
    case 6:
      shipping = 50;
      break;
  }

  shipping = subtotal > 100 ? 0 : shipping;

  return shipping;
}

function displayInvoice(cartItems, cartQty, state, subtotal, tax, shipping, total) {
  const invoiceDiv = document.getElementById("invoice");

  let html = `<h2>Invoice</h2>`;
  html += `<p>Shipping to: ${state}</p>`;

  html += `<table>
    <tr><th>Item</th><th>Qty</th><th>Price</th></tr>`;

  for (let i = 0; i < cartItems.length; i++) {
    let itemName = items[cartItems[i]];
    let price = prices[cartItems[i]].toFixed(2);

    html += `<tr>
      <td>${itemName}</td>
      <td>${cartQty[i]}</td>
      <td>$${price}</td>
    </tr>`;
  }

  html += `</table>`;

  html += `<hr>`;

  html += `
    <p>Subtotal: $${subtotal}</p>
    <p>Tax: $${tax}</p>
    <p>Shipping: $${shipping.toFixed(2)}</p>
    <h3>Total: $${total}</h3>
    <button onclick="location.reload()">Shop Again</button>
  `;

  invoiceDiv.innerHTML = html;
}