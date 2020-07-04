
// Load data from json

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
    function addScript(url) {
        const body = document.body;
        const script1 = document.createElement("script");

        // Add callback function to script tag
        script1.innerHTML =  hdnWeatherJsonpCallback; 
        body.appendChild(script1);
    
    }

    addScript(url);

    
    

    //Define named callback function    
    function hdnWeatherJsonpCallback(data) {

      function loadCities() {
    
        let cityArray = data.cities;
        console.log(cityArray); 

        cityArray.forEach((city)=> {
            console.log(city.geoloc.city);

            console.log("index: ", cityArray.indexOf(city))

            const cityNode = document.createElement('option');

            cityNode.setAttribute(value, cityArray.indexOf(city));

            dropdown = document.getElementById("cities");

            dropdown.appendChild(cityNode);
        }
          )
          
      }
     
      //loadCities();

      // Define variable to select city
      let whichCity = 10;

	  let paloAltoWeatherCurrentDay = data.cities[whichCity].current[0];
	  
	  let paloAltoWeatherWeekly = data.cities[whichCity];


	  let currentTemp = paloAltoWeatherCurrentDay.temp + "&#176";
	  let currentCondition = paloAltoWeatherCurrentDay.condition;
	  let fiveDays = paloAltoWeatherWeekly.weekly;
	   
	  fiveDays.length = 5; // To only take five days of data



	  //Current Weather Conditions

	  // Assumption:  Part of the challenge is that I shouldn't just alter the html to hardcode this in

	  const node = document.createElement("div");
	  node.innerHTML = currentTemp;
	 
	  const node2 = document.createElement("div"); 
	  node2.innerHTML = currentCondition;


	  document.getElementById('current').appendChild(node);
	  document.getElementById('current').appendChild(node2);	
	  


	  //Weekly Forecast Conditions

	  //Assumption: I shouldn't alter the html to hardcode this weekly forecast in

	  //Assumption:  I should place the weekly forecast into the "forecast" div

	  const forecastNode = document.createElement("div");
	
	  
     // Put each day of the forecast data into its own div for later styling 
	  fiveDays.map((day,index) => {
			let nextDay = paloAltoWeatherWeekly.weekly[index].day;
		

			let nextCondition = paloAltoWeatherWeekly.weekly[index].daycondition;
		
		
			const newDay = document.createElement("div");//Parent div

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

    
}

getWeatherData(
  "https://www.sfchronicle.com/external/weather/weather.json?callback=hdnWeatherJsonpCallback"
);