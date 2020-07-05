

// Load data from jsonp callback
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

       cityArray = data.cities;//Global variable to be available to all functions
        console.log(cityArray); 
      
        //add cities to dropdown menu  
        function loadCities() {
    
            cityArray.forEach((city)=> {
              
                let cityName = city.geoloc.city;
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

            })
            
        }
     
      loadCities();
     
      displayWeather(cityArray, valueCity);
            
    }
    
}


//Changes the data when the dropdown menu changes
function switchCity(valueCity) {    
  
    //Removes current city weather data
    document.getElementById("current").innerHTML= null;
    document.getElementById('forecast').innerHTML = null;

    // Runs function to display weather on the screen again with new city value
    displayWeather(cityArray, valueCity);
}



//Function to display weather on the screen
function displayWeather(cityArray, valueCity) { 
  
  //checks time to see if dark mode applies
  darkMode();

  let whichCity = parseInt(valueCity);
  
  
  let weatherCurrentDay = cityArray[whichCity].current[0];

  let weatherWeekly = cityArray[whichCity];

  let currentTemp = weatherCurrentDay.temp + "&#176";
  let currentCondition = weatherCurrentDay.condition;
  let fiveDays = weatherWeekly.weekly;

  fiveDays.length = 5; // To only take five days of data


  //Current Weather Conditions

  // Assumption:   I shouldn't alter the html to hardcode things in

  const node = document.createElement("div");
  node.innerHTML = currentTemp;

  const node2 = document.createElement("div");
  node2.innerHTML = currentCondition;

  document.getElementById("current").appendChild(node);
  document.getElementById("current").appendChild(node2);

  //Weekly Forecast Conditions

  //Assumption: I shouldn't alter the html to hardcode the weekly forecast divs in
  //Assumption:  I should place the weekly forecast into the "forecast" div

  const forecastNode = document.createElement("div");

  // Put each day of the forecast data into its own div for later styling options
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


function darkMode() {
  var localDay = new Date();
  var localHour = localDay.getHours();
  console.log(localHour); 

  if (localHour >= 20 || localHour <= 8) {
    var docBody = document.querySelector("body");
    var windowBody = document.querySelector("html");
    var newClass = "dark-mode";
    var arr;
    var arr2;
    arr = docBody.className.split(" ");
    arr2 = windowBody.className.split(" ");
      if (arr.indexOf(newClass) == -1) {
        windowBody.className += " " + newClass;
        docBody.className += " " + newClass;
      }
    } else {
      var docBody = document.querySelector("body");
      var windowBody = document.querySelector("html");
      docBody.className = docBody.className.replace(/\bdarkmode\b/g, "");
      windowBody.className = windowBody.className.replace(/\bdarkmode\b/g, "");

    }


  }


