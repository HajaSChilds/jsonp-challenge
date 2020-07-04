

// Load data from json and parse
function getWeatherData(url) {

    //Add url to head tag
    function requestWeatherCall(url) {
        const head = document.head;
        const script = document.createElement("script");

        script.setAttribute("src", url);
        head.appendChild(script);
        head.removeChild(script);
    }

    requestWeatherCall(url);


    // Add callback script to body tag
    function addScript() {
        const body = document.body;
        const script1 = document.createElement("script");

        // Add callback function to script tag
        script1.innerHTML =  hdnWeatherJsonpCallback; 
        body.appendChild(script1);
        body.removeChild(script1);
    }

    addScript();
    


    //Define jsonp callback function    
    function hdnWeatherJsonpCallback(data) {

       cityArray = data.cities;
        console.log(cityArray); 
      
        //add cities to dropdown menu  
        function loadCities() {
    
            cityArray.forEach((city)=> {
                console.log(city.geoloc.city);
                let cityName = city.geoloc.city;
                console.log("index: ", cityArray.indexOf(city))
                let index = cityArray.indexOf(city)
                const cityNode = document.createElement('option');

                cityNode.setAttribute("value", index);

                
                //shows Palo Alto as default
                if(index == 9) {
                cityNode.setAttribute("selected", "selected");  
                } 

                cityNode.innerHTML = cityName;

                dropdown = document.getElementById("cities");
                dropdown.appendChild(cityNode);
                valueCity = dropdown.value; // Define first value for selected city
                return cityArray;
            })
            
        }
     
      loadCities();
     
      displayWeather(cityArray, valueCity);
            
    }
    
}


//Changes the data when the dropdown menu changes
function switchCity(valueCity) {    
    console.log("switchCalled: ", valueCity);
    cityArray = this.cityArray;
    console.log("switchCityArray: ", cityArray);

    //Removes current city weather data
    document.getElementById("current").innerHTML= null;
    document.getElementById('forecast').innerHTML = null;

    // Runs function to display weather on the screen again with new city value
    displayWeather(cityArray, valueCity);
}

//Function to display weather on the screen
function displayWeather(cityArray, valueCity) { 
  
  let whichCity = parseInt(valueCity);
  console.log("whichCity: ", whichCity);
  console.log("cityArray: ", cityArray);
  
  let weatherCurrentDay = cityArray[whichCity].current[0];

  let weatherWeekly = cityArray[whichCity];

  let currentTemp = weatherCurrentDay.temp + "&#176";
  let currentCondition = weatherCurrentDay.condition;
  let fiveDays = weatherWeekly.weekly;

  fiveDays.length = 5; // To only take five days of data


  //Current Weather Conditions

  // Assumption:  Part of the challenge is that I shouldn't just alter the html to hardcode this in

  const node = document.createElement("div");
  node.innerHTML = currentTemp;

  const node2 = document.createElement("div");
  node2.innerHTML = currentCondition;

  document.getElementById("current").appendChild(node);
  document.getElementById("current").appendChild(node2);

  //Weekly Forecast Conditions

  //Assumption: I shouldn't alter the html to hardcode this weekly forecast in
  //Assumption:  I should place the weekly forecast into the "forecast" div

  const forecastNode = document.createElement("div");

  // Put each day of the forecast data into its own div for later styling option
  fiveDays.map((day, index) => {
    let nextDay = weatherWeekly.weekly[index].day;

    let nextCondition = weatherWeekly.weekly[index].daycondition;

    const newDay = document.createElement("div"); //Parent div

    const days = document.createElement("p"); //Child div
    const condition = document.createElement("p");

    days.innerHTML = nextDay;
    condition.innerHTML = nextCondition;

    newDay.appendChild(days);
    newDay.appendChild(condition);

    //Add all days to one div for display
    forecastNode.appendChild(newDay);
  }, 2);

  // Add weekly forecast data to display
  document.getElementById("forecast").appendChild(forecastNode);
  
}




getWeatherData(
  "https://www.sfchronicle.com/external/weather/weather.json?callback=hdnWeatherJsonpCallback"
);

