document.addEventListener("DOMContentLoaded", function() {
    fetch("partials/menu.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;

            // Ждем, пока меню загрузится, затем находим кнопку и сам блок меню
            const menuBtn = document.getElementById("menu-btn");
            const menu = document.getElementById("menu");
        
            if (menuBtn && menu) {
                menuBtn.addEventListener("click", function () {
                    menu.classList.toggle("hidden");
                });
            }
        })
        .catch(error => console.error("Ошибка загрузки меню:", error));
});