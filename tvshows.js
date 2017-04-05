//Create variables for HTML elements and templates
var listTemplate = document.getElementById("list_template").innerHTML,
	detailsTemplate = document.getElementById("details_template").innerHTML,
	searchText = document.getElementById("search_text"),
	listDiv = document.getElementById("list"),
	detailsDiv = document.getElementById("details"),
	searchBtn = document.getElementById("search_button");
	errorText = document.getElementById("error");//Added by Helen Shiu 04/04

//Create a click event listener to the button
searchBtn.addEventListener("click", function () {
	//Get the search input the user enter
	var title = searchText.value;
	//Make the first server call
	$.get("https://api.tvmaze.com/search/shows?q=:"+ title, null, null, "json")
		.done(onSearchResult)//Call done event handling function
		.fail(onSearchFail);//Call fail event handling function
});

//Create done event handling function
function onSearchResult(data){
	console.log(data);
/*
	if(data.hasOwnProperty("Error")) {
		errorText.innerHTML = "Movie not found!<br>Please enter another search.";
	} else if (errorText.innerHTML != " ") {
		errorText.innerHTML = " ";
	}
*/
/*Validate the returned result. If error occurs, display a message*/
//console.log(data.hasOwnProperty("error"));

	var html = Mustache.render(listTemplate, data);
	listDiv.innerHTML = html;
console.log(listDiv);

	//Create variable for the list resulted from the search
	var items = listDiv.getElementsByTagName("a");
	//Loop through every single item in the list
	for(var i = 0; i<items.length; i++) {
		var item = items[i];
		//Add a click event listener to each item
		item.addEventListener("click", getDetails);
	}
}

//Create fail event handling function
function onSearchFail(){
	alert("There was a problem contacting the server. Please try again.");
}

//Create a event handler function with an event object as parameter
function getDetails(event) {
	var id = event.target.id;//The target property returns the element that triggered the event with the corresponding id
	$.get("https://www.omdbapi.com/?plot&i=" + id, null, null, "json")
		.done(onDetailResult)
		.fail(onSearchFail);//Reuse the same fail event handling function
}

//Create a event handling function when the details results return
function onDetailResult(data) {
	var html = Mustache.render(detailsTemplate, data);
	detailsDiv.innerHTML = html;
}