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
                    <div class="card card-item">
                        <img src="${item.image}" class="card-img-top" alt="...">
                   <div class="card-body">
            <h2 class="card-title text-center">${item.phone_name}</h2>
            <h4 class="card-text text-center">Brand: ${item.brand}</h4></div>
        <button onclick="getDetails('${item.slug}')" class="details-btn">Details</button>
            </div>
         </div>`;
            mainContainer.appendChild(cardContainer)

        })
    }
}
const getDetails = itemDetais => {
    // console.log(itemDetais)
    const getUrl = `https://openapi.programming-hero.com/api/phone/${itemDetais}`
    fetch(getUrl)
        .then(res => res.json())
        .then(data => showDetails(data.data))

}
const showDetails = details => {
    // console.log(details.mainFeatures.sensors)
    const detailsContainer = document.getElementById('details-container')
    const mainDetails = document.createElement('div')
    // mainDetails.classList.add('details-container')
    mainDetails.innerHTML = `<div class="card mb-3">
    <img src="${details.image}" class="card-img-top" alt="...">
    <div class="card-body ">
        <h5 class="card-title title-head">${details.name}</h5>
        <h6 class="card-title title-head">${details.releaseDate}</h6>
        <h2>Main Feature</h2>
        <p>storage:${details.mainFeatures.storage}</p>
        <p>displaySize:${details.mainFeatures.displaySize}</p>
        <p><h6>chipset:</h6>${details.mainFeatures.chipSet}</p>
        <p>memory:${details.mainFeatures.memory}</p> 
    </div>
    </div>

`;
    detailsContainer.appendChild(mainDetails);

    const sensorContainer = document.createElement('div')
    const sensorDetail = details.mainFeatures.sensors;
    console.log(sensorDetail)
    sensorContainer.innerHTML = `
<h2>Sensor Details</h2>
    <p>${sensorDetail[0]}</p>
    <p>${sensorDetail[1]}</p>
    <p>${sensorDetail[2]}</p>
    <p>${sensorDetail[3]}</p>
    <p>${sensorDetail[4]}</p>
    <p>${sensorDetail[5]}</p>
    `
    detailsContainer.appendChild(sensorContainer)
}
// ['Face ID', 'accelerometer', 'gyro', 'proximity', 'compass', 'barometer']