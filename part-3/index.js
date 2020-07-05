

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
      //Question #1:   On initial loading I would also store the data in a cache under localStorage using a map function to iterate through each of the displayed values and save with localStorage.setItem().  I would also store a timestamp in the cache.
      
      //When the page is re-opened, I would retrieve the localStorage and load the cached values for display.  Then I would compare the timestamp to the current local time.  If more than 10 minutes elapsed  I would run this addScript() function to load and display the new data,  then empty the cache and store a new set. 

      
      //Question #2 I would call this addScript() function every 10 minutes using setInterval(). If I were storing to cache, I would run that function on the interval. 
      

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
  let currentIcon = weatherCurrentDay.icon;// for Question #4
  let fiveDays = weatherWeekly.weekly;

  fiveDays.length = 5; // To only take five days of data


  //Current Weather Conditions

  //Assumption:   I shouldn't alter the html to hardcode things in

  const node = document.createElement("div");
  node.innerHTML = currentTemp;

  const node2 = document.createElement("div");
  node2.innerHTML = currentCondition;


  //Adding path to image for Question #4 using string interpolation to insert the respective image path variable
  const node3 = document.createElement("img");
  node3.setAttribute("src", "/sample/path/to/" + `${currentIcon}` + ".png"); 
  node3.innerHTML = currentIcon;

  document.getElementById("current").appendChild(node);
  document.getElementById("current").appendChild(node2);
  document.getElementById("current").appendChild(node3);//img icon



  //Weekly Forecast Conditions

  //Assumption: I shouldn't alter the html to hardcode the weekly forecast divs in
  //Assumption:  I should place the weekly forecast into the "forecast" div

  const forecastNode = document.createElement("div");

  // Put each day of the forecast data into its own div for later styling options
  fiveDays.map((day, index) => {
     
    //Question # 3:  I will create a dictionary like object with the values and call those instead of the actual days - Done.
  
    const dayDict = {
     "Thu" : "Thursday",
     "Fri" : "Friday",
     "Sat" : "Saturday",
     "Sun" : "Sunday",
     "Mon" : "Monday",
     "Tue" : "Tuesday",
     "Wed" :  "Wednesday",
    }

    let nextDay = weatherWeekly.weekly[index].day;
    let fullDay = dayDict[nextDay];
   
    //Question #4:  I would use javascript to add an <img/> tag to the html like I did above under Current Weather Conditions. Any img styles would also be inserted with Javascript - See above.

    let nextCondition = weatherWeekly.weekly[index].daycondition;
    let nextTemp = weatherWeekly.weekly[index].high;
    

    const newDay = document.createElement("div"); //Parent div

    const days = document.createElement("p"); //Child divs
    const highTemp = document.createElement("p");
    const condition = document.createElement("p");

    days.innerHTML = fullDay;
    condition.innerHTML = nextCondition;
    highTemp.innerHTML = nextTemp;

    newDay.appendChild(days);
    newDay.appendChild(highTemp);
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


// Multi - Browser friendly code using className - classList does not work for Internet Explorer according to online sources
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


/*Question #5: Other improvements - 
- Make page mobile friendly - Done
- Add temperature to the weekly forecast - Done
- Other improvements - add Class Names to each dynamic class for   better CSS styles., add low values and high values to each day,  */