let addressInput = document.querySelector('.title')
let fromAddressInput = document.querySelector('#fromAddress');
let toAddressInput = document.querySelector('#toAddress')
let stockSymbolInput = document.querySelector('#stockSymbolInput')
let getDirectionsBtn = document.querySelector('button')
let milageResult = document.querySelector('.milage')
let companyDesc = document.querySelector('.description')

var addressSubmitHandler = function(event){
  event.preventDefault();
  var fromAddress = fromAddressInput.value;
  var stockSymbol = stockSymbolInput.value
  if (fromAddress && stockSymbol){
    getCompany(stockSymbol)
  } else {
    alert('Please enter valid addresses.');
}
}

let getDistance = function(fromAddress,companyAddress){
  var requestUrl = 'http://www.mapquestapi.com/directions/v2/route?key=kAuLKYebMSAVKTRJlvyqYwLhARo2v9lS&from=' + fromAddress + '&to=' + companyAddress;
  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    milageResult.textContent = "You are " + data.route.distance.toFixed(1) + " miles from this business."
    console.log(data.route.distance);
    console.log(data)
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
    companyDesc.textContent = companyDescription
    console.log(data)
    console.log(companyAddress)
    console.log(companyDescription)
    getDistance(fromAddress,companyAddress)
  });
};


getDirectionsBtn.addEventListener('click',addressSubmitHandler,)