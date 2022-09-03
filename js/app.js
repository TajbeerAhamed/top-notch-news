let buttons=[]

const loadButtons = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    buttons=data.data.news_category
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

    searchDiv.innerHTML = text;
    searchBtn.appendChild(searchDiv);
  });
};
loadButtons();

const searchName=(id)=>{
// console.log(id,buttons);
const name=buttons.find(button =>button.category_id==id)
return name.category_name
// console.log(name);

}

const toggoleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

const loadNews = async (id) => {
  toggoleSpinner(true);
  const name=searchName(id)
  // console.log(name);
  
  const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data,name);
  } catch (error) {
    console.log(error);
  }
};

const displayNews = (news,name) => {
 
  console.log(name);
    news.sort((a, b) => {
      return a.total_view - b.total_view;
    }).reverse()
  
  const newsNumber = document.getElementById("news-number");

  // console.log(news.length);
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  if (news.length === 0) {
    newsNumber.innerHTML = `
    <h3 class="text-warning text-center">No news Found.Please try a new One.</h3>
    `;
  } else {
    newsNumber.innerHTML = `
    <h3 class="text-success text-center">${news.length} items found for category ${name}</h3>
    `;
  }
  news.forEach((newses) => {
    // console.log(newses);
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
            <div class="text-center"><button onclick="loadNewsDetails('${
              newses._id
            }')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">see Details</button>
</div>
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
  <h4 class="text-center">Author Name: ${
    details.author.name ? details.author.name : "No Name Available"
  }</h4>
  <h6 class="text-center">Publish Date:${details.author.published_date}</h6>
  <h6 class="text-center">Total View :${
    details.total_view ? details.total_view : "No data found"
  }<h6>
  `;
};
