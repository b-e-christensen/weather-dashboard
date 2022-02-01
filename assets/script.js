var apiKey = '5253d1895ec18b3c6485974e30c75532'
// variables that capture user input
var cityEl = $('#city').val().trim();
var stateEl = $('#state :selected').val();
// id's that populate the div that displays today's forecast
var cityAndDateEl = $('#cityAndDate')
var tempEl = $('#temp')
var windEl = $('#wind')
var humidityEl = $('#humidity')
var uvEl = $('#uvIndex')

var fiveDayForecastEl = $('#fiveDayForecast')
var forecastArr = [];

$('#get-weather-btn').on('click', function() {

  function getApi() {
    //uv index seems to only be showing up when the api is called with lat and lon parameters. Will have to make one call with city/state name (as we have below), then pull the lat and lon parameters from that call to make a second call with the newly acquired lat and lon parameters. from there we can grab all the information we need. will also need to do a forecast call. it seems exclude=hourly is a parameter?? possibly will help us avoid the clutter of the three hourly nonsense. 
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEl},${stateEl},US&appid=${apiKey}`;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var lattitude = data.coord.lat;
        var longitude = data.coord.lon;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&units=imperial&exclude=minutely&appid=${apiKey}`)
        .then(function (response) {
          return response.json();
        })
        //change data variable here --- data is not a built in variable. can be anything.
        .then(function (oneCallData) {
          console.log(oneCallData);
          console.log(oneCallData.current.dt);
          var dateObject = new Date(oneCallData.current.dt * 1000);
          var humanDateFormat = dateObject.toLocaleString();
          console.log(humanDateFormat);
          cityAndDateEl.text(`${cityEl}, ${stateEl} -- ${humanDateFormat}`);
          tempEl.text('Temperature: ' + oneCallData.current.temp + '°F');
          windEl.text('Wind: ' + oneCallData.current.wind_speed + 'mph');
          humidityEl.text('Humidity: ' + oneCallData.current.humidity + '%');
          uvEl.text('UV Index: ' + oneCallData.current.uvi);

          for (let i = 0; i < 5; i++) {
            const element = oneCallData.daily[i];
            forecastArr.push({
              dt: element.dt,
              temp: element.temp.day,
              wind: element.wind_speed,
              humidity: element.humidity
            })                     
          }
        })
        // .then(console.log(forecastArr));
        })

// var tempEl = $('#temp')
// var windEl = $('#wind')
// var humidityEl = $('#humidity')
// var uvEl = $('#uvIndex')
        
}

  getApi();
  console.log(forecastArr);

    // var stateVal = $('#state :selected').val()
    // console.log(stateVal);
    // console.log(`${cityVal}, ${stateVal}`);
  });



 
  console.log(stateEl);
  console.log(cityEl);

  // var forecastDiv = document.createElement('div');
  // fiveDayForecastEl.appendChild(forecastDiv);
  // forecastDiv.addClass('card col-lg-3 col-md-6 col-sm-12')
  // var temph4 = document.createElement('h4');
  // var windh4 = document.createElement('h4');
  // var humidityh4 = document.createElement('h4');
  // forecastDiv.appendChild(temph4);
  // forecastDiv.appendChild(windh4);
  // forecastDiv.appendChild(humidityh4);
  // temph4.text('Temp: ' + element.temp.day + '°F');
  // windh4.text('Wind: ' + element.wind_speed + 'mph');
  // humidityh4.text('Humidity: ' element.humidity + '%')
//   var forecastDate = new Date (element.dt * 1000)
//   console.log(forecastDate.toLocaleString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "numeric"
// }))