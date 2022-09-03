const loadButtons = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayButtons(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

const displayButtons = (buttons) => {
  // console.log(buttons);
  buttons.forEach((button) => {
    // console.log(button);
    const searchBtn = document.getElementById("search-btn");
    const searchDiv = document.createElement("div");
    searchDiv.classList.add("w-50");
    const text = `
        <button onclick="loadNews(${button.category_id})" class=" btn btn-outline-secondary mt-5">${button.category_name}</button> 
    `;
    toggoleSpinner(true);
    searchDiv.innerHTML = text;
    searchBtn.appendChild(searchDiv);
  });
};
loadButtons();

const toggoleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

const loadNews = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayNews = (news) => {
  // console.log(news.length);
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  const noNewsMsg = document.getElementById("no-news-msg");
  if (news.length === 0) {
    noNewsMsg.classList.remove("d-none");
  } else {
    noNewsMsg.classList.add("d-none");
  }
  news.forEach((newses) => {
    console.log(newses);
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
              newses.author.img
            }" alt="" width="30" height="30">
            <p class="me-4">${
              newses.author.name ? newses.author.name : "no name Found"
            }</p>
            <p>Total View :${
              newses.total_view ? newses.total_view : "No data found"
            }<p>
           
            </div>
            <button onclick="loadNewsDetails('${
              newses._id
            }')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>

        </div>
    </div>
        `;
    newsContainer.appendChild(newsDiv);
  });
  toggoleSpinner(false);
};

const loadNewsDetails = async (id) => {
  const url = ` https://openapi.programming-hero.com/api/news/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const displayNewsDetails = (details) => {
  // console.log(details);
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.innerText = details.title;
  const detailImg = document.getElementById("detail-img");
  detailImg.innerHTML = `
  <img src="${details.author.img}" class="w-100">
  <h5>Author Name:${
    details.author.name ? details.author.name : "No Name Available"
  }</h5>
  <p>Publish Date:${details.author.published_date}</p>
  <p>Total View :${details.total_view ? details.total_view : "No data found"}<p>
  `;
};
