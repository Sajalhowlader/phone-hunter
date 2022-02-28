const searchItem = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = ''
    const searchUrl = ` https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(searchUrl)
        .then(res => res.json())
        .then(data => showItems(data.data))
}
const showItems = items => {
    console.log(items)
    const mainContainer = document.getElementById('main-container')
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
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>`;
        mainContainer.appendChild(cardContainer)
    })
}
