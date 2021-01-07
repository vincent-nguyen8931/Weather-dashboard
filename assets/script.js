
// function to save a value to specified key
function setJSON(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
// function to recall a value from specified key
function getJSON(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

var weatherBoardMain = $("#weatherBoard");
// search bar creation variables
var searchBarTitle = $("<h2>").attr("class", "col-3").attr("id", "searchBarTitle").text("Search for a City: ");
var searchBarInputCol = $("<aside>").attr("class", "input-group mb-3").attr("type", "text");
var searchBarText = $("<input>").attr("class", "form-control");
var searchBarButton = $("<button>").attr("class", "icon-search").attr("id", "searchButton");

// city list creation variable
var cityListCreation = $("<ul>");
// city details creation variables
var cityCurrentDay = $("<h2>").attr("class", "col-8").attr("id", "currentDayBox").text("test");
var cityCurrentDayTemperature = $("<p>").attr("id", "CurDayTemp");
var cityCurrentDayHumidity = $("<p>").attr("id", "CurDayHumid");
var cityCurrentDayWindSpeed = $("<p>").attr("id", "CurDayWind");
var cityCurrentDayUVIndex = $("<p>").attr("id", "CurDayUV");


weatherBoardMain.append(searchBarTitle, cityCurrentDay);
searchBarTitle.append(searchBarInputCol, cityListCreation);
searchBarInputCol.append(searchBarText, searchBarButton);
// search button to append input to country list on click.
$("#searchButton").click(function () {
  var cityToAdd = $("<li>").text(searchBarText.val());
  cityListCreation.append(cityToAdd);

  // var cityName = searchBarText.val();

  // var currentDayWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=e0901fe692dc490e882d515f8c2d9a11";

  // var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=e0901fe692dc490e882d515f8c2d9a11";

  // $.ajax({
  //   url: currentDayWeatherURL,
  //   method: "GET"
  // }).then(function (currentDay) {
  //   console.log(currentDay);
  // });

  // $.ajax({
  //   url: fiveDayForecastURL,
  //   method: "GET"
  // }).then(function (fiveDay) {

  // });
});

// By use of .on for the click event, this allows for the document to continue looking for click events to happen to a li even if one does not presently exist. This method was chosen due to the li being created dynamically and not having static placeholders.
$("#weatherBoard").on("click", "li", (function () {
  var cityClicked = this.textContent;

  var currentDayWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityClicked + "&appid=e0901fe692dc490e882d515f8c2d9a11";

  var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityClicked + "&appid=e0901fe692dc490e882d515f8c2d9a11";

  $.ajax({
    url: currentDayWeatherURL,
    method: "GET"
  }).then(function (currentDay) {
    console.log(currentDay);
  });

  $.ajax({
    url: fiveDayForecastURL,
    method: "GET"
  }).then(function (fiveDay) {
    console.log(fiveDay);
  });
})
);

// creates a click event listener on every button in the column that goes into saveInput function.
// for (i = 1; i < 10; i++) {
//   $("#saveIcon" + i).click(saveInput);
// }

// function sets rowClicked to the saveIcon + i from the for loop above. when entering function checkRow, rowClicked will become the local storage name, and rowSelected will become the text area id which is used to pull the user's input into local storage via the setJSON function.
// function saveInput() {
//   rowClicked = this.id;
//   checkRow();
//   setJSON(rowClicked, $(rowSelected).val());
// }
