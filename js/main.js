// main container 
const mainContainer = document.getElementById('main-container');
// error massege style
const noResult = document.getElementById('no-results')



// add a onclick for show details
const searchItem = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;

    if (inputValue === '') {
        noResult.innerText = `Please Enter something for show`
    } else if (inputValue !== '') {
        noResult.innerText = ``
        inputField.value = ''
        mainContainer.textContent = ''
        const searchUrl = ` https://openapi.programming-hero.com/api/phones?search=${inputValue}`
        fetch(searchUrl)
            .then(res => res.json())
            .then(data => showItems(data.data))
    }
}

const showItems = items => {
    console.log(items)
    if (items.length === 0) {
        noResult.innerText = `No Results Found`
    } else if (items.length > 0) {
        noResult.innerText = ``
        const brandName = document.createElement('h1')
        brandName.classList.add('text-center')
        brandName.innerText = `Brand: ${items[0].brand}`
        mainContainer.appendChild(brandName)
        items.forEach(item => {
            const cardContainer = document.createElement('div');

            cardContainer.classList.add('col-md-4');
            cardContainer.innerHTML = `
        <div class="card-group">
                    <div class="card">
                        <div class="item-img">
                        <img src="${item.image}" class="card-img-top" alt="...">
                        </div>
            <div class="card-body">
            <h5 class="card-title text-center">${item.phone_name}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p></div>
            <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
            </div>
            </div>
         </div>`;
            mainContainer.appendChild(cardContainer)

        })
    }
}
