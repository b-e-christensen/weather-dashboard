var apiKey = '5253d1895ec18b3c6485974e30c75532'

var cityEl = $('#city')
// var stateEl = $('#stateEl :selected')
// $('#aioConceptName').find(":selected").val();

$('#get-weather-btn').on('click', function() {
    var cityVal = cityEl.val();
    // console.log(stateEl.val());
    var stateVal = $('#state :selected').val()
    console.log(stateVal);
    console.log(`${cityVal}, ${stateVal}`);
  })

