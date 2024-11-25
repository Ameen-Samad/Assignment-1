const menuToggle = document.getElementById("toggleMenu")
const navbar = document.getElementById("nav");

// function toggleMenu() {
//     if (navbar.style.display == 'flex') {
//         navbar.style.display = 'none'; 
//         menuToggle.textContent = "☰ Menu"; 
//     } else (navbar.style.display == 'none') {
//         navbar.style.display = 'flex'; 
//         menuToggle.textContent = "✖ Close"; 
//     }
// }

function toggleMenu() {
    if (navbar.style.display === 'flex'){
        navbar.style.display = 'none';
        menuToggle.textContent = "☰ Menu";
    } else {
        navbar.style.display = 'flex';
        menuToggle.textContent = "✖ Close"; 
    }
}


menuToggle.addEventListener('click', toggleMenu)