// We need to get them from the urlLib later
var urls = ["http://google.de", "http://amazon.de", "http://ebay.de"];

// We need to load this from the settings
var runMystique = true;

// Reference for tab, which loads the given urls
var urlWindow;
// count index to get the current url from the urls lib
var index = 0;
// global interval to load urls 
var loadUrlInterval;
// interval duration in ms
var intervalDuration = 5000;

// the next url which should be opened.
// Could be null at the moment because the urlLib is very slow at generating new urls!"
var nextUrl = null;

// Wordlist copied from urlLib to call generateURL
var wordlist = ["abacus", "abbey", "abdomen", "ability", "abolishment", "abroad", "accelerant", "accelerator", "accident", "accompanist", "accordion", "account", "accountant", "achieve", "achiever", "acid", "acknowledgment", "acoustic", "acoustics", "acrylic", "act", "action", "active", "activity", "actor", "actress", "acupuncture", "ad", "adapter", "addiction", "addition", "address", "adjustment", "administration", "adrenalin"];

chrome.storage.sync.get({
    activate: "true",
    linksOnDomainOnly: "false",
    maxBytes: '100',
    linkCoveragePecentage: 10,
    linkDepth: 5,
}, function(items) {
    runMystique = items.activate;
});

loadUrlInterval = setInterval(function() {
	if(!urlWindow){
		urlWindow = window.open();
	}
	if(runMystique) {
	    if (nextUrl !== null) {
            urlWindow.location.href = nextUrl;
            nextUrl = null;
            index++;
        }
	} else {
        clearInterval(loadUrlInterval);
	}
	
	urlLib.generateURL({wordlist: wordlist}).then((url) => {
		console.log("result from urlLib: ", url);
        nextUrl = url;
	});

}, intervalDuration);


// Get HTML DOM from page -> TO BE Checked ...
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	console.log("Links ", request.links);
	console.log("Call: ",sender.url);
	var HistVar = "";
	chrome.storage.sync.get("history", function(items) {
        HistVar = items.history;
		console.log("History: ",HistVar);
    });

	//trouble to save history
	HistVar = HistVar +  sender.url + "\n";
	chrome.storage.sync.set({
        'history': HistVar
    }, function() {
    });
	// console.log(request.dom);
  });

// Get changes from settings
chrome.storage.onChanged.addListener(function(changes, namespace) {
	let active = 'activate';
	if (changes.hasOwnProperty(active)) {
        let storageChange = changes[active];
        runMystique = storageChange.newValue
    }
});

