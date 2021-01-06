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
var searchBarTitle = $("<h2>").attr("class", "col-3").text("Search for a City: ");
var searchBarInputCol = $("<aside>").attr("class", "input-group mb-3");
var searchBarText = $("<input>").attr("class", "form-control");
var searchBarButton = $("<button>").attr("class", "icon-search");

// countries list creation variables

//   // makes a new row and increments time by 1 so that another time slot can be created.
  // $("#weatherBoard").append("<article class='row' style='margin-left:15%;' id=timeRow" + 5 + ">");
//   $("#timeRow" + i).append("<article class='col-1' style='text-align:right; padding-top:5px; border:1px solid black;'>" + timeText);
//   $("#timeRow" + i).append("<article class='col' id='plannerText" + i + "'>");
//   // pulls textarea box from bootstrap and appends it to the column plannerText for each row. used for taking in user input.
//   $("#plannerText" + i).append("<section class='input-group'>");
//   $("#plannerText" + i).append("<section class='input-group-append'>");
//   $("#plannerText" + i).append("<textarea class='form-control' name='textArea" + i + "' id='textArea" + i + "' aria-label='With textarea'>");
//   // creates a column so that the button image can be appended to it.
//   $("#timeRow" + i).append("<article class='col-1' style='border:1px solid black; background:cyan;' id=saveIcon" + i + ">");
//   $("#saveIcon" + i).append("<i class='far fa-save' style='padding-left: 40%; padding-top: 35%;' id=saveBtn>");
//   // increments by one to move switch statement in changeTIme function down to the next case.
weatherBoardMain.append(searchBarTitle);
searchBarTitle.append(searchBarInputCol);
searchBarInputCol.append(searchBarText, searchBarButton);

// }
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

// retrieves all information in local storage based on the "events" keys and stores them in their proper row.
  // for (i = 1; i < 10; i++) {
  //   rowClicked = "saveIcon" + i;
  //   checkRow();
  //   $(rowSelected).val(storageLocation)
  // }
