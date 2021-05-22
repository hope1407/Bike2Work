let addressInput = document.querySelector('.title')
let fromAddressInput = document.querySelector('#fromAddress');
let toAddressInput = document.querySelector('#toAddress')
let getDirectionsBtn = document.querySelector('button')

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
    console.log(data);
  });
}
getDirectionsBtn.addEventListener('click',addressSubmitHandler)