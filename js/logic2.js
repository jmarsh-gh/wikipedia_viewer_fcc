function main(){
	console.log("linked");

	//onclick search button
	var search = document.querySelector("#search");
	search.addEventListener("click", function(){
		//reset any previous results
		document.querySelector("#list").innerHTML = "";
		//Get search results
		$.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=bees&callback=?", function(json) {	
			console.log(json.query.search[0].title);
			
			//From search results get Article extracts by title
			//Loop through search results above for top 5
			for(var x = 0; x < 5; x++){
				//GET title of each search result in array and build URL
				var title = json.query.search[x].title;
				console.log(title);
				//add indexpageids to URL. Shows page ID for easier retrieval of extract. Look at API endpoint in browser to see.
				var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&indexpageids&titles=" + title + "&callback=?";
				//GET article extract by title for each search result
				$.getJSON(url, function(json) {	
					var extract = json.query.pages[json.query.pageids[0]].extract;
					var articleTitle = json.query.pages[json.query.pageids[0]].title;
					var list = document.querySelector("#list");


					//Make this slice at indexOf the first period (so one sentence)
					//Make it only slice at word boundary period
					//Maybe if/else search with regexp if there us a nonboundary period.
					var myReg = /\b\w\./;
					console.log(extract.search(myReg));

					//list.appendChild(document.createElement('li')).textContent=articleTitle + ": " + extract.substring(0, extract.indexOf(".") + 1);
					list.appendChild(document.createElement('div')).innerHTML = "<a href='#' class='list-group-item'>" + "<h4 class='list-group-item-heading'>" + articleTitle + "</h4>" + "<p class='list-group-item-text'>" + extract.substring(0, extract.indexOf(".") + 1) + "</p>" + "</a>"; 
					
					//try create element to a var, then add class., then appendChild.
					// var listItem = document.createElement('li'); //.innerHTML = "<h4>" + articleTitle + "</h4>" + "<h5>" + extract.substring(0, extract.indexOf(".") + 1) + "</h5>";
					// listItem.appendChild(document.createTextNode(articleTitle + ": " + extract.substring(0, extract.indexOf(".") + 1)));
					//listItem.classList.add("list-group-item");
					// list.appendChild(listItem);


					// this query string links to article in question using the pageid from API ?curid=4654
					
				}); //Article GET
			}; //FOR IN
		});	// Search Result GET
	}); //Search Click Event

	



};

$(document).ready(main());

// function niceList(){
// 	var listItems = document.querySelectorAll("li");
// 	for(var i = 0; i < listItems.length; i++){
// 		listItems[i].classList.add("list-group-item");	
// 		//listItems[i].classList.add("active");
// 	};
// };

// var testButton = document.querySelector("#testButton");
// testButton.addEventListener("click", function(){
// 	niceList();
// });


//document.querySelector("#test").innerHTML = json.query.pages[json.query.pageids[0]].title + ": " + extract;
//https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&indexpageids&titles=Stack%20Overflow
//https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=bees
//http://stackoverflow.com/questions/12577797/how-to-add-class-to-an-element-create-by-appendchild