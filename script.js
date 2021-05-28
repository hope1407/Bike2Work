let addressInput = document.querySelector('.title')
let fromAddressInput = document.querySelector('#fromAddress');
let toAddressInput = document.querySelector('#toAddress')
let getDirectionsBtn = document.querySelector('button')
let milageResult = document.querySelector('.milage')

var addressSubmitHandler = function(event){
  event.preventDefault();
  var fromAddress = fromAddressInput.value;
  var toAddress = toAddressInput.value;
  if (fromAddress && toAddress){
    getDirections(fromAddress,toAddress)
  } else {
    alert('Please enter valid addresses.');
}
}

let getDirections = function(fromAddress,toAddress){
  var requestUrl = 'http://www.mapquestapi.com/directions/v2/route?key=kAuLKYebMSAVKTRJlvyqYwLhARo2v9lS&from=' + fromAddress + '&to=' + toAddress;
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
getDirectionsBtn.addEventListener('click',addressSubmitHandler)

let businessInput = document.querySelector('.title')
let businessName = document.querySelector('#business-name');
let getCostBtn = document.querySelector('search-button')
let costResult = document.querySelector('.cost')

var costSubmitHandler = function(event){
  event.preventDefault();
  var business = businessName.value;

  if (business){
    getCost(business)
  } else {
    alert('Please enter valid business.');
}
}

let getCost = function(business){
  var requestUrl = 'http://www.mapquestapi.com/directions/v2/route?key=kAuLKYebMSAVKTRJlvyqYwLhARo2v9lS&from=' + fromAddress;
  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    costResult.textContent = "Business is " + data.route.distance.toFixed(1) + " miles from this business."
    console.log(data.route.distance);
    console.log(data)
  });
}
getCostBtn.addEventListener('click',costSubmitHandler)