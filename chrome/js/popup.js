// settings in local storage
var clickFlag = "off";
var storage = chrome.storage.local;

// update the rankType
function updateRank(target) {

	let rankType = target;
	
	// set the type to adRank for blue id
	if (target === "blue") {
	
		rankType = "adRank";
		
	}

	storage.set({'rankType': rankType}, function() {

		// reload the current tab
		chrome.tabs.reload();
		 
		// close window
		window.close();
		
	});
				
}

// check link storage
function checkLinkStorage(link,linkType) {

	// check storage
	storage.get('excludedLinks', function(items) {

		 // pull current excluded link list from storage
		if (items.excludedLinks) {
	 
			// set the list
			let excluded = items.excludedLinks;							
			
			// parse the list
			let excludedList = JSON.parse(excluded);
			
			// check the list type
			if (typeof(excludedList) === "string") {
			
				// parse the string at spaces
				let excludedListArray = excludedList.split(" ");
				
				// handle the list
				editLinks(excludedListArray,link,linkType);
				
			
			} else {
			
				// handle the list
				editLinks(excludedList,link,linkType);
				
			}						
			
		} else {

			// list is empty, set excluded list in storage
			if (linkType == "exclude") {
			
				storage.set({'excludedLinks': JSON.stringify(link)}, function() {
					// close window
					window.close();
				});
			
			// list is empty, set allLinks,
			} else if (linkType == "pause") {
			
				storage.set({'excludedLinks': JSON.stringify("allLinks")}, function() {
				
					// change the icon		
					chrome.runtime.sendMessage({"message": "pause"});									

					// close window
					window.close();
				});
				
			} else {
			
				// list is empty for include (link not excluded), just close
				window.close();			
				
			}					

		}
	});

}

// function to edit the excluded links
function editLinks(excludedList,link,linkType) {

	// check if link is already on list
	if (excludedList.indexOf(link) >= 0) {

		// remove from list for include - do nothing for exclude (already on list)
		if (linkType == "include") {
		
			// remove all occurrences of link from list
			for (var i=0; i < excludedList.length; i++){

				if (excludedList[i] === link) excludedList.splice(i, 1);
					
			}

			storage.set({'excludedLinks': JSON.stringify(excludedList)}, function() {
				// close window
				window.close();
			});

		// remove from list for resume
		} else if (linkType == "pause") {

			// remove all occurrences of link from list
			for (var i=0; i < excludedList.length; i++){

				if (excludedList[i] === link) excludedList.splice(i, 1);
					
			}

			storage.set({'excludedLinks': JSON.stringify(excludedList)}, function() {
				
				// change the icon to resume		
				chrome.runtime.sendMessage({"message": "whitelistSite"});									
					
				// close window
				window.close();
			});
		
		} else {
		
			// close window
			window.close();
		
		}
	
	} else {
	
		// add to list for exclude - do nothing for include (already not on list)
		if (linkType == "exclude") {

			// add link to list
			excludedList.push(link);
					
			storage.set({'excludedLinks': JSON.stringify(excludedList)}, function() {
				// close window
				window.close();
			});

		// remove from list for resume	
		} else if (linkType == "pause") {
			
			// add link to list
			excludedList.push(link);
					
			storage.set({'excludedLinks': JSON.stringify(excludedList)}, function() {
				
				// change the icon to pause		
				chrome.runtime.sendMessage({"message": "pause"});									
				
				// close window
				window.close();
			});
			
		} else {
		
			// close window
			window.close();
			
		}
		
	
	}		

}

// update the blacklist storage based on click
function click(e) {
 
  // if change rank
  if ((e.target.id == "blue") || (e.target.id == "imageRank") || (e.target.id == "scriptRank") || (e.target.id == "videoRank") || (e.target.id == "textRank") || (e.target.id == "linkRank")) {

		// prevent prompt from showing more than once
		if (clickFlag == "off") {
		
			clickFlag = "on";
		
			// update the rank
			updateRank(e.target.id);  

		}
		
  // if resume or pause
  } else if (e.target.id == "green") {  

		// check if paused, toggle state		
		checkLinkStorage("allLinks","pause");				
  
  } else if (e.target.id == "yellow") {  
  
		// show the manage links divs
		document.getElementById('blue').style.display = 'none';
		document.getElementById('imageRank').style.display = 'none';
		document.getElementById('scriptRank').style.display = 'none';
		document.getElementById('videoRank').style.display = 'none';
		document.getElementById('textRank').style.display = 'none';
		document.getElementById('linkRank').style.display = 'none';
		document.getElementById('green').style.display = 'none';
		document.getElementById('yellow').style.display = 'none';
		document.getElementById('red2').style.display = 'block';
		document.getElementById('green2').style.display = 'block';
		document.getElementById('help').style.display = 'block';
  
  } else if (e.target.id == "red2") {  
  
		// prevent prompt from showing more than once
		if (clickFlag == "off") {
		
			clickFlag = "on";
			let excludeLink = prompt("Enter the domain name of the link you want to exclude. For example, enter www.example.com.");
	
			// parse and validate the link
			excludeLink = excludeLink.replace("http://", "");
			excludeLink = excludeLink.replace("https://", "");
			excludeLink = excludeLink.replace("://", "");
			excludeLink = excludeLink.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
			excludeLink = excludeLink.replace(/<\/?[^>]+>/ig, '');
			excludeLink = excludeLink.trim((excludeLink.replace(/\s+/g, ' ')));
			excludeLink = excludeLink.toLowerCase();
			
			// split off only the hostName			
			if (excludeLink.indexOf("/") >= 0) {
			
				var linkArray = excludeLink.split("/");
				excludeLink = linkArray[0];
				
			}
			
			// make sure there is at least one .
			if (excludeLink.indexOf(".") >= 0) {
						
				// handle the storage
				checkLinkStorage(excludeLink,"exclude");				

			} else {
			
				// not valid, close window
				window.close();
			
			}			
			
		}		
		
	} else if (e.target.id == "green2") {  
  
		// prevent prompt from showing more than once
		if (clickFlag == "off") {
		
			clickFlag = "on";
			let includeLink = prompt("Enter the domain name of the link you want to include. For example, enter www.example.com.");
	
			// parse and validate the link
			includeLink = includeLink.replace("http://", "");
			includeLink = includeLink.replace("https://", "");
			includeLink = includeLink.replace("://", "");
			includeLink = includeLink.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
			includeLink = includeLink.replace(/<\/?[^>]+>/ig, '');
			includeLink = includeLink.trim((includeLink.replace(/\s+/g, ' ')));
			includeLink = includeLink.toLowerCase();
			
			// split off only the hostName			
			if (includeLink.indexOf("/") >= 0) {
			
				var linkArray = includeLink.split("/");
				includeLink = linkArray[0];
				
			}
			
			// make sure there is at least one .
			if (includeLink.indexOf(".") >= 0) {
						
				// handle the storage
				checkLinkStorage(includeLink,"include");				

			} else {
			
				// not valid, close window
				window.close();
			
			}
						
		}				
	
  } else if (e.target.id == "help") {  

		// prevent help alert from showing more than once
		if (clickFlag == "off") {
			clickFlag = "on";
			alert("Excluding a link prevents Spince from analyzing that specific link on a page with many links.");
			window.close();
		}		
		
  } else {  

		// close the popup window
		window.close();
		
  }
       
}

// set a listener for popup.html div clicks
document.addEventListener('DOMContentLoaded', function () {
	var divs = document.querySelectorAll('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].addEventListener('click', click);
	}
});