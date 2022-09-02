const loadButtons =async() =>{
const url=`https://openapi.programming-hero.com/api/news/categories`
const res=await fetch (url)
const data =await res.json()

displayButtons(data.data.news_category)
}

const  displayButtons = buttons =>{
// console.log(buttons)
buttons.forEach(button =>{
    // console.log(button)
    const searchBtn=document.getElementById('search-btn')
    const searchDiv=document.createElement('div')
    searchDiv.classList.add('col')
    const text=`<h1>id : ${button.category_id}</h1>
    <button  class="btn btn-secondary mt-5">${button.category_name}</button>` 
    console.log(text)
    searchDiv.innerHtml= text
    console.log(searchDiv);
    searchBtn.appendChild(searchDiv)
})
 
}
loadButtons()






// const loadNews = async () => {
//     const url = `https://openapi.programming-hero.com/api/news/category/01`
//     const res = await fetch(url)
//     const data = await res.json()
//     displayNews(data.data)
// }

// const displayNews = news => {
//     console.log(news)
//     news.forEach(newses => {
//         const newsContainer = document.getElementById('news-container')
//         const newsDiv = document.createElement('div')
//         newsDiv.classList.add('col')
//         newsDiv.innerHTML = `
//         <div class="card">
//         <img src="${newses.image_url}" class="card-img-top" alt="...">
//         <div class="card-body">
//             <h5 class="card-title">${newses.title}</h5>
//             <p class="card-text">${newses.details.slice(0, 100)}</p>
//             <div class="d-flex">
//             <img class="rounded me-4" src="${newses.thumbnail_url}" alt="" width="30" height="24">
//             <p>${newses.total_view}<p>
//             </div>
            
//         </div>
//     </div>
//         `
//         newsContainer.appendChild(newsDiv)
//     })
// }

// // loadNews()