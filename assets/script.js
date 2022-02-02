var apiKey = '5253d1895ec18b3c6485974e30c75532'

// id's that populate the div that displays today's forecast
var cityAndDateEl = $('#cityAndDate')
var tempEl = $('#temp')
var windEl = $('#wind')
var humidityEl = $('#humidity')
var uvEl = $('#uvIndex')
var weatherIconEl = $('#weatherIcon')
var fiveDayForecastEl = $('#fiveDayForecast')
var cityName = '';
var stateName = '';




function getApi() {
  // resets dynamically populated five day forecast div
  fiveDayForecastEl.html('');

  // initial fetch to pull out lat and lon coordinates
  // dont really understand why its not really caring about the state code -- might be best to get rid of it?
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&appid=${apiKey}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (inititalData) {

        var lattitude = inititalData.coord.lat;
        var longitude = inititalData.coord.lon;

        // uses newly acquired lat and lon coordinates to fetch the 'one call' api
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&units=imperial&exclude=minutely&appid=${apiKey}`)
        .then(function (response) {
          return response.json();
        })

        .then(function (oneCallData) {
          console.log(oneCallData);
          // converts unix time to a date
          var dateObject = new Date(oneCallData.current.dt * 1000);
          var humanDateFormat = dateObject.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "numeric"
          });

          cityAndDateEl.text(`${cityName}, ${stateName} -- ${humanDateFormat}`);
          weatherIconEl.attr('src', 'https://openweathermap.org/img/w/' + oneCallData.current.weather[0].icon + '.png'); 
          tempEl.text('Temperature: ' + oneCallData.current.temp + '°F');
          windEl.text('Wind: ' + oneCallData.current.wind_speed + ' MPH');
          humidityEl.text('Humidity: ' + oneCallData.current.humidity + '%');
          uvEl.text('UV Index: ' + oneCallData.current.uvi);
          fiveDayForecastEl.removeClass('invisible');

          for (let i = 1; i < 6; i++) {
            const element = oneCallData.daily[i];
            var unixToDate = new Date (element.dt * 1000);
            var forecastDiv = $('<div></div>');
            forecastDiv.id = 'forecastDiv'
            forecastDiv.addClass('card col-lg-2 col-md-5 col-sm-12 m-2 text-blk light-blue');
            fiveDayForecastEl.append(forecastDiv);
            var forecastDate = $('<h5></h5>').text(unixToDate.toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "numeric"
            }))
            var iconImg = $('<img></img>').attr('src', 'https://openweathermap.org/img/w/' + element.weather[0].icon + '.png')
            var temph6 = $('<h6></h6>').text('Temp: ' + element.temp.day + '°F');
            var windh6 = $('<h6></h6>').text('Wind: ' + element.wind_speed + 'mph');
            var humidityh6 = $('<h6></h6>').text('Humidity: ' + element.humidity + '%');
            forecastDate.addClass('bold');
            iconImg.addClass('icon-img');
            forecastDiv.append(forecastDate);
            forecastDiv.append(iconImg);
            forecastDiv.append(temph6);
            forecastDiv.append(windh6);
            forecastDiv.append(humidityh6);

          }
        })
        })
}


function weatherReport() {
  // variables that capture user input
  var cityEl = $('#city').val().trim();
  cityName = cityEl
  var stateEl = $('#state :selected').val();
  stateName = stateEl
  getApi();
  //button append function
}
  // function that appends a button to the search area with parameters given to it by that search. Simplest way to go about it would probably be having the new buttons attached to info in local storage. i.e. if I search for denver, then give that button some value in local storage, then set city and state keys in local storage equal to whatever the city and state parameters were for that search. the function would get those values from local storage then run the get api function with those parameters.
  //function that appends the card layout of the projected 5 day forecast. 



  // how do we generate a history of searches via buttons? Special consideration -- which I had not yet thought of -- for how to not duplicate search results. E.g. if we had a button for atlanta, and then we searched for atlanta again, then we wouldnt print a new button. A for loop comes to mind -- checking the key value pairs of city and state, 

  // const iconEl = document.createElement('img')
  //               iconEl.src = 'https://openweathermap.org/img/w/' + icon + '.png'
  
  $('#get-weather-btn').on('click', weatherReport);




// i have solved it!! What we will have to do when we append the button is 
function denverSearch () {
  cityName = 'Denver'
  stateName = 'CO'
  getApi()
}

