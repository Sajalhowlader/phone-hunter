// main container 
const mainContainer = document.getElementById('main-container');
// details container
const detailsContainer = document.getElementById('details-container')
// error massege style
const noResult = document.getElementById('no-results')
// spinner id
const spinner = document.getElementById('loading-spiner')



// add a onclick for show details
const searchItem = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    spinner.style.display = 'block'
    if (inputValue === '') {
        spinner.style.display = 'none'
        noResult.innerText = `Please Enter something for show`
    } else if (inputValue !== '') {
        noResult.innerText = ``
        inputField.value = ''
        detailsContainer.textContent = ""
        mainContainer.textContent = ''
        const searchUrl = ` https://openapi.programming-hero.com/api/phones?search=${inputValue}`
        fetch(searchUrl)
            .then(res => res.json())
            .then(data => showItems(data.data.slice(0, 20)))

    }
}
// display all itmes
const showItems = items => {
    if (items.length === 0) {
        spinner.style.display = 'none'
        noResult.innerText = `No Results Found`
    } else if (items.length > 0) {
        spinner.style.display = 'none'
        noResult.innerText = ``
        const brandName = document.createElement('h1')
        brandName.classList.add('text-center')
        brandName.innerText = `Brand: ${items[0].brand}`
        mainContainer.appendChild(brandName)
        // display all itmes one by one
        items.forEach(item => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('col-md-4', 'col-12');
            // Use back-tic for show itmes photo,name and brand
            cardContainer.innerHTML = `
        <div class="card-group">
        <div class="card card-item">
        <img src="${item.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h2 class="card-title text-center">${item.phone_name}</h2>
        <h4 class="card-text text-center">Brand: ${item.brand}</h4>
        </div>
        <button onclick="getDetails('${item.slug}')" class="details-btn">Details</button>
        </div>
        </div>`;
            mainContainer.appendChild(cardContainer)

        })
    }
}
// get item details
const getDetails = itemDetais => {
    detailsContainer.textContent = ""
    const getUrl = `https://openapi.programming-hero.com/api/phone/${itemDetais}`
    fetch(getUrl)
        .then(res => res.json())
        .then(data => showDetails(data.data))

}
// show all item details >> Main feature >> Sensor Details and Others information
const showDetails = details => {
    spinner.style.display = 'none'
    const sensorDetail = details.mainFeatures.sensors;
    const othersDetails = details.others
    const mainDetails = document.createElement('div')
    mainDetails.innerHTML = `<div class="card mb-3">
        <img src="${details.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title title-head">${details.name}</h5>
        <h6>${details.releaseDate ? details.releaseDate : "No Release Date found"}</h6>
        <h4>Main Feature</h4>
        <p>storage: ${details.mainFeatures.storage}</p>
        <p>displaySize: ${details.mainFeatures.displaySize}</p>
        <p>chipset: ${details.mainFeatures.chipSet}</p>
        <p>memory: ${details.mainFeatures.memory}</p> 
        <h4>Sensor Details</h4>
        <p>${sensorDetail[0]}</p>
        <p>${sensorDetail[1]}</p>
        <p>${sensorDetail[2]}</p>
        <p>${sensorDetail[3]}</p>
        <p>${sensorDetail[4]}</p>
        <p>${sensorDetail[5]}</p>
        <h4>Others Info</h4>
        <p>Wlan: ${othersDetails?.WLAN}</p>
        <p>Bluetooth: ${othersDetails?.Bluetooth}</p>
        <p>GPS: ${othersDetails?.GPS}</p>
        <p>Radio: ${othersDetails?.Radio}</p>
        </div>
        </div>

    `;
    detailsContainer.appendChild(mainDetails);
}
// END
