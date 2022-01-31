var apiKey = '5253d1895ec18b3c6485974e30c75532'

var cityEl = $('#city').val().trim();
var stateEl = $('#stateEl :selected').val();
var tempEl = $('#temp')
var windEl = $('#wind')
var humidityEl = $('#humidity')
var uvEl = $('#uvIndex')


$('#get-weather-btn').on('click', function() {

  function getApi() {
    //uv index seems to only be showing up when the api is called with lat and lon parameters. Will have to make one call with city/state name (as we have below), then pull the lat and lon parameters from that call to make a second call with the newly acquired lat and lon parameters. from there we can grab all the information we need. will also need to do a forecast call. it seems exclude=hourly is a parameter?? possibly will help us avoid the clutter of the three hourly nonsense. 
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEl},${stateEl},US&units=imperial&appid=${apiKey}`;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        })
}

  getApi();

    // var stateVal = $('#state :selected').val()
    // console.log(stateVal);
    // console.log(`${cityVal}, ${stateVal}`);
  });



 

