document.addEventListener("DOMContentLoaded", function() {
    const dropbtn = document.querySelector(".dropbtn");
    const dropdown = document.getElementById("loginDropdown");

    dropbtn.addEventListener("click", function(e) {
        e.stopPropagation(); // evita que el click burbujee
        dropdown.classList.toggle("show");
    });

   
    window.addEventListener("click", function() {
        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
        }
    });
});
