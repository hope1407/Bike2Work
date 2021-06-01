let fromAddressInput = document.querySelector('.fromAddress');
let stockSymbolInput = document.querySelector('.stockSymbolInput')
// created variable for name lookup 
let searchedCompanyNameInput = document.querySelector('.companyNameInput')
let companyNameSearchBtn = document.querySelector('.companyNameSearchBtn')
let userBikingDistanceInput = document.getElementById('user-biking-distance')
let getDirectionsBtn = document.querySelector('button')
let milageResult = document.querySelector('.milage')
let companyDesc = document.querySelector('.description')
let modal = document.querySelector('#custom-modal')
let modBtn = document.querySelector('#modBtn')


var addressSubmitHandler = function(event){
  event.preventDefault();
  var fromAddress = fromAddressInput.value;
  var stockSymbol = stockSymbolInput.value
  if (fromAddress && stockSymbol){
    getCompany(stockSymbol)
    latLngFinder(fromAddress);
    saveAddress();
    //saveRecentAddressSearch(fromAddress);
  } else {
    modal.style.display = 'flex';
}
}

let getDistance = function(fromAddress,companyAddress){
  var requestUrl = 'https://www.mapquestapi.com/directions/v2/route?key=kAuLKYebMSAVKTRJlvyqYwLhARo2v9lS&from=' + fromAddress + '&to=' + companyAddress;
  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data.route.distance);
    console.log(data)

  // start brian's code
  let companyDistanceFromField = document.getElementById("company-distance-from-field");
  companyDistanceFromField.textContent =
  "You are " + data.route.distance.toFixed(1) + " miles from this business's headquarters."
  // end brian's code
  });
}


let getCompany = function(stockSymbol){
  var secRequestUrl = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol='+ stockSymbol + '&apikey=9WF9ANK00ZXR6G48'
  fetch(secRequestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    let companyAddress = data.Address
    let companyDescription = data.Description
    var fromAddress = fromAddressInput.value;

// brian moved this to main display area 
    // companyDesc.textContent = companyDescription

    console.log(data)
    console.log(companyAddress)
    console.log(companyDescription)
    getDistance(fromAddress,companyAddress)
    
    // brian new code
    let companyName = data.Name;
    let companyNameField = document.getElementById("company-name-field");
    let companyDescriptionField = document.getElementById("company-description-field");
    companyNameField.textContent = companyName
    companyDescriptionField.textContent = companyDescription;
  });

  // stock quote api
  var secRequestUrl2 =
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
    stockSymbol +
    "&apikey=9WF9ANK00ZXR6G48";
  fetch(secRequestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data2) {
      console.log("Fetch Response \n-------------");
      console.log("stockquote", data2);

      let currentPriceField = document.getElementById("current-stock-price");
      let previousCloseField = document.getElementById("previous-day-price");
      let changePercentField = document.getElementById("change-percent");

      let currentPrice = data2["Global Quote"]["05. price"];
      let previousClose = data2["Global Quote"]["08. previous close"];
      let changePercent = data2["Global Quote"]["10. change percent"];

      document.getElementById("result").classList.remove("hidden");
      currentPriceField.textContent = "$" + currentPrice;
      previousCloseField.textContent = "$" + previousClose;
      changePercentField.textContent = changePercent;
    });
};


getDirectionsBtn.addEventListener('click',addressSubmitHandler)

var saveAddressBtn = document.querySelectorAll("#user-save");

function saveAddress(){
  var savedAddress = {
    address: fromAddressInput.value
  }
  localStorage.setItem("savedAddress", JSON.stringify(savedAddress));
  }

var data = JSON.parse(localStorage.getItem("savedAddress")) || [];

//displays each hours text on load of page
console.log(data)
function displayLocalSorage(){
  if (localStorage.getItem("savedAddress") !== null) {
    fromAddressInput.value = data.address
  } 
}


displayLocalSorage()


function symbolSearch(event) {
  event.preventDefault();
  document.getElementById('resultBtnDiv').innerHTML = '';
  let searchedCompanyName = searchedCompanyNameInput.value;

fetch("https://finnhub.io/api/v1/search?q=" + searchedCompanyName  + "&token=c2mpcsqad3idu4aiefeg")
  .then(response => { return response.json()})
  .then(data3 => {
      console.log("data3", data3)
      
      for (let r = 0; r < 5; r++) {
      
      searchResultSymbol = data3.result[r].displaySymbol;
      previewCompanyName = data3.result[r].description;
      
      // create new div
      const newResultDiv = document.createElement("button");
      // ids sequentially
      newResultDiv.setAttribute("class", "result-btn mt-2 button mb-1")
      // and give it some content
      const newResultContent = document.createTextNode(searchResultSymbol + " - " + previewCompanyName);
      // add the text node to the newly created div
      newResultDiv.appendChild(newResultContent);
      // add the newly created element and its content into the DOM
      const currentDiv = document.getElementById("resultBtnDiv");
      currentDiv.appendChild(newResultDiv);

      newResultDiv.setAttribute("title", previewCompanyName)
    }
     
  
    // TODO create onclick to display clicked stock symbol in input
    let resultBtn = document.querySelectorAll('.result-btn')
    
    for (let s = 0; s < 5; s++) {
      resultBtn[s].addEventListener("click", function (event) {
        event.preventDefault();
        stockSymbolInput.value = data3.result[s].displaySymbol;
      });
  }

})}

function modalClose(){
  modal.style.display = 'none'
}

function latLngFinder(){
  var fromAddress = fromAddressInput.value;
  var latLonURL = 'https://www.mapquestapi.com/geocoding/v1/address?key=kAuLKYebMSAVKTRJlvyqYwLhARo2v9lS&location=' + fromAddress + '';
  
  fetch(latLonURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------')
    console.log(data)
    console.log(data.results[0].locations[0].latLng.lat)
    console.log(data.results[0].locations[0].latLng.lng);
    

    // use this API data to work with lng/lat of result locations 
    let longitude = data.results[0].locations[0].latLng.lng;
    let latitude = data.results[0].locations[0].latLng.lat;
    console.log("newlat "+ latitude + ", " + "newlon" + longitude);

    // convert miles to meters for API
    let distance = userBikingDistanceInput.value * 1609.34;
    let company1 = searchedCompanyNameInput.value;
    fetch(
      "https://www.mapquestapi.com/search/v4/place?location=" + longitude + "%2C%20%20" + latitude + "&sort=distance&feedback=false&key=kAuLKYebMSAVKTRJlvyqYwLhARo2v9lS&circle=" + longitude + "%2C%20%20" + latitude + "%2C%20" + distance + "&pageSize=10&q=" + company1
    )
      .then((response) => response.json())
      .then((dataLocations) => {
        console.log("dataLocations", dataLocations);
        
        let locationResultsDisplay = document.getElementById('location-results');
        let locationResultNameDisplay = document.querySelectorAll('.location-result-name');

        locationResultsDisplay.classList.remove('hidden');

        for (let r = 0; r < 10; r++) {
        let resultName = dataLocations.results[r].displayString;
        locationResultNameDisplay[r].textContent = resultName ;
        }
      });

  });
  }



companyNameSearchBtn.addEventListener('click', symbolSearch);