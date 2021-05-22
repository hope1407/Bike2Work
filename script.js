var requestUrl = 'http://www.mapquestapi.com/directions/v2/route?key=kAuLKYebMSAVKTRJlvyqYwLhARo2v9lS&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA';


// Browser Fetch Method
//fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
  });