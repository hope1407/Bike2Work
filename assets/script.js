let startBtn = document.getElementById("start-btn")

let timeSpan = document.getElementById("time")
let latitudeSpan = document.getElementById("latitude")
let longitudeSpan = document.getElementById("longitude")
let velocitySpan = document.getElementById("velocity")
let altitudeSpan = document.getElementById("altitude")





function getISSInfo() {
  fetch("https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892,1436029902&units=miles")
  .then(response => response.json())
  .then(data => {
      console.log("data", data)
      displayISSInfo(data);
  })
}

function displayISSInfo(displayData) {
timeSpan.textContent = displayData[0].timestamp;
latitudeSpan.textContent = displayData[0].latitude;
longitudeSpan.textContent = displayData[0].longitude;
velocitySpan.textContent = displayData[0].velocity;
altitudeSpan.textContent = displayData[0].altitude;

}


startBtn.addEventListener("click", getISSInfo);
