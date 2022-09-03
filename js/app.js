const loadButtons = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayButtons(data.data.news_category);
};

const displayButtons = (buttons) => {
  // console.log(buttons)
  buttons.forEach((button) => {
    // console.log(button);
    const searchBtn = document.getElementById("search-btn");
    const searchDiv = document.createElement("div");
    searchDiv.classList.add("w-50");
    const text = `
       
        <button onclick="loadNews(${button.category_id})" class="btn btn-outline-secondary mt-5">${button.category_name}</button>
    `;
    searchDiv.innerHTML = text;
    searchBtn.appendChild(searchDiv);
  });
};
loadButtons();

const loadNews = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data);
};

const displayNews = (news) => {
  // console.log(news);
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  news.forEach((newses) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col");
    newsDiv.innerHTML = `
        <div class="card">
        <img src="${newses.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${newses.title}</h5>
            <p class="card-text">${
              newses.details.length > 100
                ? newses.details.slice(0, 150) + "..."
                : details
            }</p>
            <div class="d-flex">
            <img class="rounded-circle me-4" src="${
              newses.thumbnail_url
            }" alt="" width="30" height="30">
            <p class="me-4">${newses.author.name}</p>
            <p>Total View :${newses.total_view}<p>
           
            </div>
            <button onclick="loadNewsDetails('${
              newses._id
            }')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>

        </div>
    </div>
        `;
    newsContainer.appendChild(newsDiv);
  });
};

const loadNewsDetails = async (id) => {
  const url = ` https://openapi.programming-hero.com/api/news/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsDetails(data.data[0]);
};

const displayNewsDetails = (details) => {
  console.log(details);
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.innerText = details.author.name;
  const detailImg = document.getElementById("");
};
