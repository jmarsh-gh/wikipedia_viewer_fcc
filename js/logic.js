console.log("linked");
$.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=bees&callback=?", function(json) {	
	console.log(json.query.search[0].title);
	// document.querySelector("#test").innerHTML = json.query.search[0].title + ": " + json.query.search[0].snippet;		
});	

$.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&indexpageids&titles=Bee&callback=?", function(json) {	
	//add indexpageids to URL so can access the right page
	console.log(json.query.pageids);
	console.log(json.query.pages[json.query.pageids[0]].title);
	var extract = json.query.pages[json.query.pageids[0]].extract.substring(0, 140);
	console.log(extract);
	document.querySelector("#test").innerHTML = json.query.pages[json.query.pageids[0]].title + ": " + extract;


			
});		
