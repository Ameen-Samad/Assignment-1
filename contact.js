/* validation for contact form */
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("form-message");

    if (!name) {
        formMessage.textContent = "Please enter your name.";
        formMessage.style.color = "#ff6600";
        return;
    }

    if (!validateEmail(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "#ff6600";
        return;
    }

    if (!message) {
        formMessage.textContent = "Please enter a message.";
        formMessage.style.color = "#ff6600";
        return;
    }

    const contactData = {
        name: name,
        email: email,
        message: message,
    };

    let savedContacts = JSON.parse(localStorage.getItem("contactMessages")) || [];
    savedContacts.push(contactData);
    localStorage.setItem("contactMessages", JSON.stringify(savedContacts));

    formMessage.textContent = "Thank you for contacting us! Your message has been saved.";
    formMessage.style.color = "green";

    document.getElementById("contact-form").reset();
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
/* menu */
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
