
// function to save a value to specified key
function setJSON(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

// function to recall a value from specified key
function getJSON(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

// holds code of the applicaiton
var weatherBoardMain = $("#weatherBoard");

// search bar creation variables
var searchBarTitle = $("<h2>").attr("class", "col-3").attr("id", "searchBarTitle").text("Search for a City: ");
var searchBarInputCol = $("<aside>").attr("class", "input-group mb-3").attr("type", "text");
var searchBarText = $("<input>").attr("class", "form-control");
var searchBarButton = $("<button>").attr("class", "icon-search").attr("id", "searchButton");

// city list creation variable
var cityListCreation = $("<ul>").attr("class", "list-group");

// city details current day containers + UV index variable
var weatherDataCol = $("<div>").attr("class", "col-8");
var cityCurrentDay = $("<section>").attr("class", "row").attr("id", "currentDayBox");
var cityCurrentDayUVIndex = $("<div>");

// city details five day forecast variables
var fiveDayForecastHeader = $("<h2>").attr("id", "fiveDayForecastBoxes").text("5 Day Forecast:");
var fiveDayForecastContainer = $("<div>").append(fiveDayForecastHeader).attr("class", "row justify-content-start");
var fiveDayForecastBoxCol = $("<div>").attr("class", "col");

weatherBoardMain.append(searchBarTitle, weatherDataCol);
weatherDataCol.append(cityCurrentDay, fiveDayForecastContainer);
fiveDayForecastContainer.append(fiveDayForecastBoxCol);
searchBarTitle.append(searchBarInputCol, cityListCreation);
searchBarInputCol.append(searchBarText, searchBarButton);
// cityCurrentDay.append(fiveDayTitle);
// cityCurrentDay.append(cityCurrentDayTemperature, cityCurrentDayHumidity, cityCurrentDayWindSpeed, cityCurrentDayUVIndex);

// search button to prepend input to city list on click. Makes new searches appear at the top of the list.
$("#searchButton").click(function () {
  var cityToAdd = $("<li>").attr("class", "list-group-item").text(searchBarText.val());
  cityListCreation.prepend(cityToAdd);
});

// By use of .on for the click event, this allows for the document to continue looking for click events to happen to a li even if one does not presently exist. This method was chosen due to the li being created dynamically and not having static placeholders.
// This click function will retrieve the city name from the li clicked on. Next, AJAX is used to retrieve current day weather, UV index, and five day forecast from the api calls to open weather map. The requested information, such as temperature, will be pulled from the data gathered in the AJAX calls and placed into their appropriate variables created earlier. In this case cityCurrentDayTemperature. The last step is to append the information to append all the information to the current weather section of the webpage.
$("#weatherBoard").on("click", "li", (function () {
  // use textContent instead of text due to this returning an object.
  var cityClicked = this.textContent;

  var currentDayWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityClicked + "&units=imperial&appid=e0901fe692dc490e882d515f8c2d9a11";

  $.ajax({
    url: currentDayWeatherURL,
    method: "GET"
  }).then(function (currentDay) {

    // city details current day variables
    var cityCurrentDayHeader = $("<h2>").text(currentDay.name + " (" + dayjs().format("M/DD/YYYY") + ")")
    var cityCurrentDayImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + currentDay.weather[0].icon + ".png").attr("style", "width:60px;height:50px;");
    var cityCurrentDayTemperature = $("<div>").text("Temperature: " + currentDay.main.temp + " °F");
    var cityCurrentDayHumidity = $("<div>").text("Humidity: " + currentDay.main.humidity + "%");
    var cityCurrentDayWindSpeed = $("<div>").text("Wind Speed: " + currentDay.wind.speed);

    // store lat and long information from the ajax pull of the city.
    lat = currentDay.coord.lat;
    lon = currentDay.coord.lon;

    // city current day UV Index
    var currentDayUVIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&units=imperial&appid=e0901fe692dc490e882d515f8c2d9a11";
    $.ajax({
      url: currentDayUVIndex,
      method: "GET"
    }).then(function (UVIndex) {
      cityCurrentDayUVIndex.text("UV Index: " + UVIndex.current.uvi);
    });

    //  Append curent weather data to the current day box.
    cityCurrentDay.append(cityCurrentDayHeader, cityCurrentDayTemperature, cityCurrentDayHumidity, cityCurrentDayWindSpeed, cityCurrentDayUVIndex);
    cityCurrentDayHeader.append(cityCurrentDayImage);
    weatherDataCol.append(fiveDayForecastContainer);
  });

  var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityClicked + "&units=imperial&appid=e0901fe692dc490e882d515f8c2d9a11";

  $.ajax({
    url: fiveDayForecastURL,
    method: "GET"
  }).then(function (fiveDay) {
    console.log(fiveDay);
    for (i =3; i < 40; i += 8) {
      var fiveDayForecastCard = $("<div>").attr("class", "card text-white bg-primary mb col-fluid").attr("style", "float:left;padding: 10px;padding-right: 15px;padding-bottom:0;");
      var fiveDayForecastDate = $("<h3>").text(dayjs(fiveDay.list[i].dt_txt).format("M/DD/YYYY"));
      var fiveDayForecastImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + fiveDay.list[i].weather[0].icon + ".png").attr("style", "width:60px;height:50px;");
      var fiveDayForecastTemperature = $("<p>").text("Temp: " + fiveDay.list[i].main.temp);
      var fiveDayForecastHumidity = $("<p>").text("Humidity: " + fiveDay.list[i].main.humidity + "%");
    fiveDayForecastBoxCol.append(fiveDayForecastCard);
    fiveDayForecastCard.append(fiveDayForecastDate, fiveDayForecastImage, fiveDayForecastTemperature, fiveDayForecastHumidity);
    }
  });
  cityCurrentDay.attr("style", "border: black 1px solid;")

})
);
