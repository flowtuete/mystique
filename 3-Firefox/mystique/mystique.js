 //alert("Mystique Addon loads on Firefox and the DHBW pages");
 
 var links = getLinks();
 selectLink(links,true);
 
 // Gets all Links from the currently open page
 function getLinks() {  
	var array = [];
	var links = document.getElementsByTagName("a");
	for(var i=0; i<links.length; i++) {
		array.push(links[i].href);
	}
	return array;
}

//Should select one link to be opened
function selectLink(links,siteOnly){
	window.alert("This page has got "+links.length+" links");
	//TODO this is not implemented yet
}
 