var secRequestUrl = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=TGT&apikey=9WF9ANK00ZXR6G48'
fetch(secRequestUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log('Fetch Response \n-------------');
  console.log(data)
  console.log(data.Address)
});
  