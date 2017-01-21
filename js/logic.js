function main(){
	console.log("linked");

	//onclick search button
	var search = document.querySelector("#search");
	search.addEventListener("click", function(){
		//reset any previous results
		document.querySelector("#list").innerHTML = "";
		//Get search results
		//search = input value
		var input = document.querySelector("#searchText");
		var searchUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + input.value + "&callback=?";
		$.getJSON(searchUrl, function(json) {	
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
					//truncate extract at first period
					var extractTrunc = extract.substring(0, extract.indexOf(".") + 1);
					var articleTitle = json.query.pages[json.query.pageids[0]].title;
					var list = document.querySelector("#list");
					//link to this pages URL using query string: ?curid=_
					var pageUrl = "https://en.wikipedia.org/wiki?curid=" + json.query.pageids[0];
					console.log(pageUrl);
					list.appendChild(document.createElement('div')).innerHTML = "<a href='" + pageUrl + "' class='list-group-item' target='_blank'>" + "<h4 class='list-group-item-heading'>" + articleTitle + "</h4>" + "<p class='list-group-item-text'>" + extractTrunc + "</p>" + "</a>"; 
					
					
				}); //Article GET
			}; //FOR IN
		});	// Search Result GET

		input.value = "";
	}); //Search Click Event
}; //main()

$(document).ready(main());



//https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&indexpageids&titles=Stack%20Overflow
//https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=bees
//http://stackoverflow.com/questions/12577797/how-to-add-class-to-an-element-create-by-appendchild