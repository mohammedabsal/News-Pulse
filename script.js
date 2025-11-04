const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");

let allNews = [];

async function fetchNews() {
    const API_KEY = "pub_af6f86591b184e5e92a536fc7c435327";
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=top&country=in`;

    const response = await fetch(url);
    const data = await response.json();

    allNews = data.results;
    displayNews(allNews);
}

function displayNews(newsList) {
    newsContainer.innerHTML = "";

    newsList.forEach(news => {
        const card = document.createElement("div");
        card.classList.add("news-card");

        card.innerHTML = `
            <img src="${news.image_url || 'https://via.placeholder.com/300'}">
            <div class="title">${news.title}</div>
            <div class="desc">${news.description || "No description available"}</div>
            <a href="${news.link}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();
    const filtered = allNews.filter(news => 
        news.title.toLowerCase().includes(text)
    );
    displayNews(filtered);
});

fetchNews();
