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

const boxes = document.querySelectorAll('.box');

boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
        box.style.transform = 'scale(1.05)';
        box.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
        box.style.borderColor = '#ff6600';
    });

    box.addEventListener('mouseout', () => {
        box.style.transform = 'scale(1)';
        box.style.boxShadow = 'none';
        box.style.borderColor = 'transparent';
    });
});
function setupCarousel(containerSelector, addToCartButtonId) {
    const container = document.querySelector(containerSelector);
    const leftArrow = container.querySelector(".left-arrow");
    const rightArrow = container.querySelector(".right-arrow");
    const cardWrapper = container.querySelector(".card-wrapper");
    const addToCartBtn = document.getElementById(addToCartButtonId);

    let currentIndex = 0;
    const cards = container.querySelectorAll(".card");

    function updateCarousel() {
        cardWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

        const activeCard = cards[currentIndex];
        const cardName = activeCard.getAttribute("data-name");
        const cardPrice = activeCard.getAttribute("data-price");

        addToCartBtn.textContent = `Add ${cardName} to Cart - $${cardPrice}`;
        addToCartBtn.setAttribute("data-name", cardName);
        addToCartBtn.setAttribute("data-price", cardPrice);
    }

    leftArrow.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    rightArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });

    addToCartBtn.addEventListener("click", () => {
        const cardName = addToCartBtn.getAttribute("data-name");
        const cardPrice = parseFloat(addToCartBtn.getAttribute("data-price"));
    });

    updateCarousel();
}

setupCarousel(".container:first-child", "add-to-cart-btn"); 
setupCarousel(".container:nth-child(2)", "best-prices-add-to-cart"); 