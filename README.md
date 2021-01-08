# Weather-dashboard

![image](assets\Weather-dashboard-landing-page.png)

Description
------------

Weather dashboard that displays current weather and 5 day forecast for the city of your choosing. Enter in the city name and click the magnifying glass to add the city to the list. Afterwards clicking on the list will give weather information and forecast for that city. This list will be stored into local storage.

 Table of contents
---------------
[Tools used](#Tools-used)<br />
[Deployed here](#Deployed-here)<br />
[Features](#Features)
* [Search input](#Search-input)
* [Continuous on click](#Continuous-on-click)
* [Current weather](#Current-weather)
* [Five day forecast](#Five-day-forecast)

[Lessons learned](#Lessons-learned)<br />
[Credits](#Credits)<br />
[License](#License)

Tools used
-------------------

* AJAX - Calls the API query and gets the information required for the application.
* Bootstrap - Has premade layouts and components useful for making a webpage without having to start from scratch. 
* CSS - Style the page with custom colors, and spacing.
* Day.js - Time CDN with functions that can call various dates.
* Font awesome - Contains plenty of icons for use in webpage.
* GitBash - Assist with version control via commits, push, and pull to and from GitHub.
* GitHub - Site where the repository lies for deployment and edits.
* Google fonts - Font that can be seen on any OS.
* HTML - Contains the base of the webpage and allows browsers to interpret the code as a webpage.
* JavaScript - Houses all of the functions for this webpage. 
* JQuery - Quality of life features and shortcuts when creating javascript code. 
* Open weather API - All the weather information is pulled from this API.
* VS Code - Application used to write and edit code for the webpage.

Deployed here
-------------

Below is the link to the deployed webpage. <br />
[Link to site](https://vincent-nguyen8931.github.io/Weather-dashboard/)


Features
------------------

Search input
-----------------------

Upon clicking the search button, the text in the input field will be added to the list below it with the newest searched item appearing on top.
```
$("#searchButton").click(function () {
  var cityToAdd = $("<li>").attr("class", "list-group-item").text(searchBarText.val());
  cityListCreation.prepend(cityToAdd);
});
```

Continuous on click
---------------
Clicking will be read continually to listen for list items. This was used to have any new list item to have the capability of being clicked on due to their dynamic creation.
```
$("#weatherBoard").on("click", "li", (function ()
```

Current weather
-----------
Weather is called from Open Weather API and pulled into the application via AJAX. From here the work to append the current weather data can be performed.
```
 $.ajax({
    url: currentDayWeatherURL,
    method: "GET"
  }).then(function (currentDay)
```
Below are a few of the elements created using the data retrieved from the API call by passing the argument, currentDay.
```
// city details current day variables
    cityCurrentDayHeader.text(currentDay.name + " (" + dayjs().format("M/DD/YYYY") + ")");
    var cityCurrentDayImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + currentDay.weather[0].icon + ".png").attr("style", "width:60px;height:50px;");
```
Five day forecast
-------------------

From the same Open Weather Api, five day forecast could be called at three hour intervals.
```
 $.ajax({
    url: fiveDayForecastURL,
    method: "GET"
  }).then(function (fiveDay) {

```
This work had to create the cards five times to get the five day forecast. Due to that, emptying the columns was necessary before new cards could be created to prevent duplication of cards.
```
   $("#fiveDayForecastBoxCol").empty();
```
The for loop will start at 3, which is noon of the first day, then iterate through and add 8 to i inorder to continue grabbing noon weather information for each day. The code below the for loop is an example of the work that was performed using this ajax call.
```
 // iterates through the api and chooses noon weather for the next five days.
    for (i = 3; i < 40; i += 8) {

      // fills out the data for each card that appears with forecast information with each iteration excluding the header that only appears once.
      fiveDayForecastHeader.text("5 Day Forecast:");
      var fiveDayForecastCard = $("<div>").attr("class", "card text-white bg-primary mb col-fluid").attr("style", "float:left;padding: 10px;padding-right: 15px;padding-bottom:0;");
```

Lessons learned
---------------
Proper container usage would have prevented an earlier problem I ran into where as the list expanded, the five day forecast continued to get pushed down the page. With assistance from the TA, we were able to reorganize my containers and have proper container usage to prevent this from happening as well as having proper headers within my information boxes.

Local storage for this assignment eludes me a bit as I was capable of storing the information to local storage via the city's name, however I had no means of retrieving the information and populating list.

Credits
---------------
LinkedIn: [https://www.linkedin.com/in/vincent-nguyen-74226a107/](https://www.linkedin.com/in/vincent-nguyen-74226a107/) <br />
GitHub: [https://github.com/vincent-nguyen8931](https://github.com/vincent-nguyen8931)


License
----------
MIT License

Copyright (c) [2020] [Vincent Nguyen]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.