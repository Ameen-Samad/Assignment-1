const menuToggle = document.getElementById("toggleMenu")
const navbar = document.getElementById("nav");

function toggleMenu() {
    if (navbar.style.display === 'flex'){
        navbar.style.display = 'none';
        menuToggle.textContent = "☰ Menu";
    } else {
        navbar.style.display = 'flex';
        menuToggle.textContent = "✖ Close"; 
    }
}

window.addEventListener("resize", () => {
    if (window.innerWidth >= 650) {
        nav.style.display = "flex";
    } else {
        nav.style.display = "none";
    }
});
menuToggle.addEventListener('click', toggleMenu)

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");


const cartButton = document.getElementById("cart-button");
const cartPopup = document.getElementById("cart-popup");
const closeCartButton = document.getElementById("close-cart-button");

cartButton.addEventListener("click", () => {
    cartPopup.classList.toggle("visible");
    cartPopup.classList.toggle("hidden");
});

closeCartButton.addEventListener("click", () => {
    cartPopup.classList.add("hidden");
    cartPopup.classList.remove("visible");
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price; 
    });
    cartTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart)); 
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        cart.push({ name, price });
        updateCart();
    });
});

cartItemsContainer.addEventListener("click", event => {
    if (event.target.classList.contains("remove-from-cart")) {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        updateCart();
    }
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
});

const removeAllButton = document.getElementById("remove-all");
removeAllButton.addEventListener("click", () => {
    cart = []; 
    updateCart(); 
});
updateCart();
