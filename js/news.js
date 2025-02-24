document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "c2cd60f2b4bd4fc0bb29c05d5bda268e";
    let query = "Technology";
    const today = new Date();

    let dateLinksContainer = document.createElement("div");
    dateLinksContainer.classList.add(
        "date-links", "flex", "flex-wrap", "gap-2", "justify-center", "mb-4", "p-4", "bg-gray-100", "rounded-lg", "shadow-md"
    );

    let newsContainer = document.createElement("div");
    newsContainer.classList.add("content");

    document.querySelector(".date-list").appendChild(dateLinksContainer);
    let categoryContainer = document.querySelector(".category");

    const categories = ["Technology", "Sport", "Politics", "Culture"];
    categories.forEach(category => {
        let link = document.createElement("a");
        link.href = "#";
        link.innerText = category;
        link.onclick = function () {
            query = category;
            fetchNews(today.toISOString().split("T")[0]);
        };
        link.classList.add("px-4", "py-2", "text-blue-500", "hover:underline", "hover:text-blue-700", "transition", "duration-300");
        categoryContainer.appendChild(link); // Используем уже объявленный контейнер
    });

    for (let i = 1; i <= 10; i++) {
        let date = new Date();
        date.setDate(today.getDate() - i);
        let formattedDate = date.toISOString().split("T")[0];

        let link = document.createElement("a");
        link.href = "#";
        link.innerText = formattedDate;
        link.onclick = function () {
            fetchNews(formattedDate);
        };
        link.classList.add("px-3", "py-2", "bg-blue-500", "text-white", "rounded-md", "hover:bg-blue-700", "transition", "duration-300");
        dateLinksContainer.appendChild(link);
    }

    document.body.appendChild(newsContainer); // Переместил в DOM перед загрузкой новостей

    function fetchNews(date) {
        let url = `https://newsapi.org/v2/everything?q=${query}&from=${date}&to=${date}&sortBy=popularity&apiKey=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                newsContainer.innerHTML = `<h2>Latest News for ${query} on ${date}</h2>`;
                data.articles.forEach(article => {
                    let articleElement = document.createElement("div");
                    articleElement.classList.add("news-article");
                    articleElement.innerHTML = `
                            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                            <p><strong>By ${article.author || "Unknown"}</strong> | ${new Date(article.publishedAt).toLocaleString()}</p>
                            <p>${article.description}</p>
                            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News Image">` : ""}
                        `;
                    newsContainer.appendChild(articleElement);
                });
            })
            .catch(error => console.error("Ошибка загрузки новостей:", error));
    }

    fetchNews(today.toISOString().split("T")[0]); // Загружаем новости за вчерашний день
});

