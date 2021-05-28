fetch("https://finnhub.io/api/v1/search?q=Walmart&token=c2mpcsqad3idu4aiefeg")
  .then(response => response.json())
  .then(data => {
      console.log("data", data)
      // displayStuff(data);
      let symbol = data.result[0].displaySymbol;
     
      console.log(symbol);
  })