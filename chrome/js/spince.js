/*
*
* Originally created by Ross Haker (released on October 1, 2016)
* The logic on this page is as follows:
* 1) Determine if current page is on whitelist (else stop)
* 2) If on whitelist, extract and validate the links on the page
* 3) Using the link text, determine the appropriate language
* 4) Analyze the code from each linked page and generate snapshot
*
*/

// detect the protocol
const PROTOCOL = window.location.protocol;

// settings in local storage
var storage = chrome.storage.local;

// set-up rankList array
var rankList = [];

// set-up font-awesome
setupFontAwesome();

// set-up the search engine whitelist
var whiteWebsites = ["www.google.com", "www.google.com", "www.google.com.au", "www.google.com.bd", "www.google.ca", "www.google.de", "www.google.es", "www.google.fr", "www.google.gf", "www.google.gt", "www.google.ie", "www.google.co.in", "www.google.io", "www.google.it", "www.google.com.jm", "www.google.com.mx", "www.google.co.nz", "www.google.com.ph", "www.google.com.pr", "www.google.com.sg", "www.google.co.uk", "www.google.us", "www.google.vg", "www.google.co.vi", "www.google.co.ca", "*.bing.com", "www.bing.com"];
		
// check if the current website is whitelisted
checkWhitelisted(whiteWebsites);		
		
// a function to check whether to run the extension
function checkWhitelisted(websites) {

	// get the hostname of the url to check if excluded		
	let currentHostName = window.location.hostname.toString();
console.log("url",window.location.href);	
	// check if on bing home page
	if ((window.location.href === "http://www.bing.com/") || (window.location.href === "https://www.bing.com/")) {
	
		// do not run on blank search box
console.log("in bing home");		
	
	// check if host name is included in whitelist	
	} else if (websites.indexOf(currentHostName) >= 0) {

		// white website found, send message to change icon
		chrome.runtime.sendMessage({"message": "whitelistSite"});		
		
		// proceed to check managed links
		checkLinks();
		
	} else {

		// no blacklisted website found, send message to change icon
		chrome.runtime.sendMessage({"message": "whitelistSite"});		
		
		// split the domain to check for universal match
		let splitHostName = currentHostName.split(".");
		
		if (splitHostName.length === 3) {			

			// check if universal hostname match exists
			let universalHostName = "*." + splitHostName[1] + "." + splitHostName[2];				
			
			if (websites.indexOf(universalHostName) >= 0) {

				// white website found, send message to change icon
				chrome.runtime.sendMessage({"message": "whitelistSite"});		
				
				// proceed to check managed links
				checkLinks();
			
			} else {

				// no whitelist website found, stop									
				chrome.runtime.sendMessage({"message": "blacklistSite"});				
				
			}
			
		} else if (splitHostName.length === 4) {	

			// check if universal hostname match exists
			let universalHostName = "*." + splitHostName[1] + "." + splitHostName[2] + "." + splitHostName[3];				
			
			if (websites.indexOf(universalHostName) >= 0) {

				// white website found, send message to change icon
				chrome.runtime.sendMessage({"message": "whitelistSite"});		
				
				// proceed to check managed links
				checkLinks();
			
			} else {

				// no whitelist website found, stop									
				chrome.runtime.sendMessage({"message": "blacklistSite"});				
				
			}
		
		} else {

			// no whitelist website found, stop									
			chrome.runtime.sendMessage({"message": "blacklistSite"});				
			
		}
			
	}

}

// function to pull the excluded links
function checkLinks() {
console.log("in checklinks");
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
				
				// proceed to check if paused
				checkPaused(excludedListArray);
				
			
			} else {
			
				// proceed to check if paused
				checkPaused(excludedList);
				
			}						
			
		} else {

			// set the array to empty
			let emptyArray = {};
			
			// list is empty, proceed to link extraction
			extractLinks(emptyArray);
								
		}
	});

}

// function to check if search is paused
function checkPaused(excludedLinks) {
console.log("in check paused");
	// check if paused
	if (excludedLinks.length >= 0) {

		if (excludedLinks.indexOf("allLinks") >= 0) {

			// paused, stop execution
			chrome.runtime.sendMessage({"message": "pause"});				
		
		} else {

			// proceed to link extraction
			extractLinks(excludedLinks);
	
		}
					
	} else {

		// proceed to link extraction
		extractLinks(excludedLinks);
	
	}
	
}

// function to extract the link text
function extractLinks(excludedLinks) {
console.log("in extract");
	let hrefHttpArrayA = [];
	let hrefHttpArrayR = [];
	let textHttpArray = [];	
	
	$("a").each(function(){

		let hrefValA = $(this).prop("href"); // absolute url
		let hrefValR = $(this).attr("href");
		let textVal = $(this).text();		
		let isBadProtocol = "yes";				
		let linkProtocol = "http://";
		let isTextPage = "no";
		let isInternalSearchLink = "no";
		let isExcludedLink = "no";

		// include a max of 15 links to analyze
		if (hrefHttpArrayA.length >  14) {
		
			// return false to break out of link extraction
			return false;
			
		}
						
		// check that both href and text exists and exclude linked images (text only)
		if ((hrefValA && hrefValR && textVal) && (textVal.indexOf("<img") === -1)) {

			let textValTrim = textVal.trim();			

			// check for either http or https protocol
			if (("http://" === hrefValA.toLowerCase().substr(0, 7)) || ("https://" === hrefValA.toLowerCase().substr(0, 8))) {	

				// set the bad protocol flag to no
				isBadProtocol = "no";
									
				// remove the protocol
				let urlArray = hrefValA.split('://');
				let urlEnd = urlArray[1];
											
				// set the protocol
				linkProtocol = urlArray[0] + '://';

				// check if no path - just the root domain				
				if (urlEnd.indexOf("/") === -1)  {

					// the page has no extension, default to text
					isTextPage = "yes";
					var urlHostName = urlEnd;
					
				} else {
				
					// split off the hostname to compare excluded links (hostname only)
					var urlHostNameArray = urlEnd.split('/');
					var urlHostName = urlHostNameArray[0];
					
				}
		
				// remove the anchor at the end, if there is one
				urlEnd = urlEnd.substring(0, (urlEnd.indexOf("#") === -1) ? urlEnd.length : urlEnd.indexOf("#"));
				
				// remove the query after the file name, if there is one
				urlEnd = urlEnd.substring(0, (urlEnd.indexOf("?") === -1) ? urlEnd.length : urlEnd.indexOf("?"));
											
				// remove everything before the last slash in the path
				urlEnd = urlEnd.substring(urlEnd.lastIndexOf("/") + 1, urlEnd.length);

				let fileExtensions = ['html', 'htm', 'php', 'asp', 'aspx', 'asc', 'csv', 'txt', 'xml', 'rdf', 'text', 'rtf', 'plist', 'yml', 'md', 'report', 'html5', 'rt', 'dat', 'readme', 'soap', 'desc', 'markdown', 'ttxt', 'me', 'htmls', 'ht3', 'tab', 'xhtm'];
				
				// check that the page is primarily text based
				if (urlEnd.indexOf(".") == -1)  {

					// the page has no extension, default to text
					isTextPage = "yes";

				} else {

					// remove everything before the last . in the path				
					urlEnd = urlEnd.substring(urlEnd.lastIndexOf(".") + 1, urlEnd.length);

					// check if the extension is on the text whitelist				
					if (fileExtensions.indexOf(urlEnd) >= 0) {

						// the page is a text page
						isTextPage = "yes";

					}
					
				}			

			}		

			// check if link is an internal google or bing search link
			if ((hrefValA.toLowerCase().indexOf("google.com") >= 0 ) || (hrefValA.toLowerCase().indexOf("googleusercontent.") >= 0 ) || (hrefValA.toLowerCase().indexOf("bing.com") >= 0 ) || (hrefValA.toLowerCase().indexOf("microsoft.com") >= 0 ) || (hrefValA.toLowerCase().indexOf("bingplaces.com") >= 0 )) {
			
				// the page is internal link, skip
				isInternalSearchLink = "yes";
				
			}

			// check if link is part of basic sidebar results
			if ((hrefValA.toLowerCase().indexOf("wikipedia.") >= 0 ) || (hrefValA.toLowerCase().indexOf("freebase.com") >= 0 ) || (hrefValA.toLowerCase().indexOf("yelp.com") >= 0 ) || (hrefValA.toLowerCase().indexOf("foursquare.com") >= 0 ) || (hrefValA.toLowerCase().indexOf("bingplaces.com") >= 0 ) || (hrefValA.toLowerCase().indexOf("youtube.com") >= 0 ) || (hrefValA.toLowerCase().indexOf("twitter.com") >= 0 ) || (hrefValA.toLowerCase().indexOf("bit.ly") >= 0 ) || (hrefValA.toLowerCase().indexOf("creativecommons") >= 0 ) || (hrefValA.toLowerCase().indexOf("hubs.ly") >= 0 )) {
			
				// the page is internal link, skip
				isInternalSearchLink = "yes";
				
			}
			
			// check if link is bing video element
			if ($(this).hasClass('vt11b')) {
			
				// the page is internal link, skip
				isInternalSearchLink = "yes";
			
			}
			
			// check if link has been excluded by user through Manage Links functionality
			if (excludedLinks.length > 0) {

				if (excludedLinks.indexOf(urlHostName) >= 0) {
				
					// the page is excluded link, skip
					isExcludedLink = "yes";

					// set the link display to show dash			
					var imagePath = chrome.extension.getURL('/img/dash.png');
																						
					// insert the dash image
					$(this).after("<img style='height:7px;width:7px' alt='Link is on excluded list.' src='" + imagePath + "' />");																								
				}
					
			}
			
			// only pull links that have a certain text link type
			if ((isBadProtocol === "no") && (isTextPage === "yes") && (isInternalSearchLink === "no") && (isExcludedLink === "no")) {

				// if link is under the small text limit, show dash
				if (textVal.length < 3) {
		
					// show dash		
					$(this).append("-");											
																		
				} else {															

					// add links to array
					hrefHttpArrayA.push(hrefValA);	
					hrefHttpArrayR.push(hrefValR);	
					textHttpArray.push(textVal);
											
				}
							
			}
						
		}
				
    });

	// if there is a link, detect language
	if (textHttpArray && hrefHttpArrayA && (textHttpArray.length > 0)) {
		
		// use the first link text to detect the language
		detectLang(textHttpArray[0],hrefHttpArrayA,hrefHttpArrayR,textHttpArray);			
		
	} 

}

// function to detect the language
function detectLang(linkText,hrefHttpArrayA,hrefHttpArrayR,textHttpArray) {
console.log("in detect lang",hrefHttpArrayA,textHttpArray);
	// detect the language - assume linked pages are in same language as current page
	chrome.i18n.detectLanguage(linkText, function(result) {
			
		// default to en (english)
		var currentLanguage = "en";
		
		// check if there are  any results
		if (result.languages.length > 0) {        
			
			// pull the first detected language
			currentLanguage = result.languages[0].language;
			
			// check if the result is reliable
			if (result.isReliable) {
			
				// do nothing
			
			} else {
			
				// default back to english if unreliable
				currentLanguage = "en";
			
			}
			   
		}
		
		// english list of words which are ignored when computing top relevant sentences.
		const stopWordsEn = [
			'', 'a', 'about', 'above', 'above', 'across', 'after', 'afterwards', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'am', 'among', 'amongst', 'amoungst', 'amount', 'an', 'and', 'another', 'any', 'anyhow', 'anyone', 'anything', 'anyway', 'anywhere', 'are', 'around', 'as', 'at', 'back', 'be', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'behind', 'being', 'below', 'beside', 'besides', 'between', 'beyond', 'bill', 'both', 'bottom', 'but', 'by', 'call', 'can', 'cannot', 'cant', 'co', 'con', 'could', 'couldnt', 'cry', 'de', 'describe', 'detail', 'do', 'done', 'down', 'due', 'during', 'each', 'eg', 'eight', 'either', 'eleven', 'else', 'elsewhere', 'empty', 'enough', 'etc', 'even', 'ever', 'every', 'everyone', 'everything', 'everywhere', 'except', 'few', 'fifteen', 'fifty', 'fill', 'find', 'fire', 'first', 'five', 'for', 'former', 'formerly', 'forty', 'found', 'four', 'from', 'front', 'full', 'further', 'get', 'give', 'go', 'had', 'has', 'hasnt', 'have', 'he', 'hence', 'her', 'here', 'hereafter', 'hereby', 'herein', 'hereupon', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'however', 'hundred', 'ie', 'if', 'in', 'inc', 'indeed', 'interest', 'into', 'is', 'it', 'its', 'itself', 'keep', 'last', 'latter', 'latterly', 'least', 'less', 'ltd', 'made', 'many', 'may', 'me', 'meanwhile', 'might', 'mill', 'mine', 'more', 'moreover', 'most', 'mostly', 'move', 'much', 'must', 'my', 'myself', 'name', 'namely', 'neither', 'never', 'nevertheless', 'next', 'nine', 'no', 'nobody', 'none', 'noone', 'nor', 'not', 'nothing', 'now', 'nowhere', 'of', 'off', 'often', 'on', 'once', 'one', 'only', 'onto', 'or', 'other', 'others', 'otherwise', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'part', 'per', 'perhaps', 'please', 'put', 'rather', 're', 'really', 'same', 'see', 'seem', 'seemed', 'seeming', 'seems', 'serious', 'several', 'she', 'should', 'show', 'side', 'since', 'sincere', 'six', 'sixty', 'so', 'some', 'somehow', 'someone', 'something', 'sometime', 'sometimes', 'somewhere', 'still', 'such', 'system', 'take', 'ten', 'than', 'that', 'the', 'their', 'them', 'themselves', 'then', 'thence', 'there', 'thereafter', 'thereby', 'therefore', 'therein', 'thereupon', 'these', 'they', 'thickv', 'thin', 'third', 'this', 'those', 'though', 'three', 'through', 'throughout', 'thru', 'thus', 'to', 'together', 'too', 'top', 'toward', 'towards', 'twelve', 'twenty', 'two', 'un', 'under', 'until', 'up', 'upon', 'us', 'very', 'via', 'was', 'we', 'well', 'were', 'what', 'whatever', 'when', 'whence', 'whenever', 'where', 'whereafter', 'whereas', 'whereby', 'wherein', 'whereupon', 'wherever', 'whether', 'which', 'while', 'whither', 'who', 'whoever', 'whole', 'whom', 'whose', 'why', 'will', 'with', 'within', 'without', 'would', 'yet', 'you', 'your', 'yours', 'yourself', 'yourselves', 'the'
		];

		// german list of words which are ignored when computing top relevant sentences.		
		const stopWordsDe = [
			'', 'aber', 'alle', 'allem', 'allen', 'aller', 'alles', 'als', 'also', 'am', 'an', 'ander', 'andere', 'anderem', 'anderen', 'anderer', 'anderes', 'anderm', 'andern', 'anderr', 'anders', 'auch', 'auf', 'aus', 'bei', 'bin', 'bis', 'bist', 'da', 'dadurch', 'daher', 'damit', 'dann', 'darum', 'das', 'dass', 'dasselbe', 'dazu', 'daß', 'dein', 'deine', 'deinem', 'deinen', 'deiner', 'deines', 'dem', 'demselben', 'den', 'denn', 'denselben', 'der', 'derer', 'derselbe', 'derselben', 'des', 'deshalb', 'desselben', 'dessen', 'dich', 'die', 'dies', 'diese', 'dieselbe', 'dieselben', 'diesem', 'diesen', 'dieser', 'dieses', 'dir', 'doch', 'dort', 'du', 'durch', 'ein', 'eine', 'einem', 'einen', 'einer', 'eines', 'einig', 'einige', 'einigem', 'einigen', 'einiger', 'einiges', 'einmal', 'er', 'es', 'etwas', 'euch', 'euer', 'eure', 'eurem', 'euren', 'eurer', 'eures', 'für', 'gegen', 'gewesen', 'hab', 'habe', 'haben', 'hat', 'hatte', 'hatten', 'hattest', 'hattet', 'hier', 'hin', 'hinter', 'ich', 'ihm', 'ihn', 'ihnen', 'ihr', 'ihre', 'ihrem', 'ihren', 'ihrer', 'ihres', 'im', 'in', 'indem', 'ins', 'ist', 'ja', 'jede', 'jedem', 'jeden', 'jeder', 'jedes', 'jene', 'jenem', 'jenen', 'jener', 'jenes', 'jetzt', 'kann', 'kannst', 'kein', 'keine', 'keinem', 'keinen', 'keiner', 'keines', 'können', 'könnt', 'könnte', 'machen', 'man', 'manche', 'manchem', 'manchen', 'mancher', 'manches', 'mein', 'meine', 'meinem', 'meinen', 'meiner', 'meines', 'mich', 'mir', 'mit', 'muss', 'musst', 'musste', 'muß', 'mußt', 'müssen', 'müßt', 'nach', 'nachdem', 'nein', 'nicht', 'nichts', 'noch', 'nun', 'nur', 'ob', 'oder', 'ohne', 'sehr', 'seid', 'sein', 'seine', 'seinem', 'seinen', 'seiner', 'seines', 'selbst', 'sich', 'sie', 'sind', 'so', 'solche', 'solchem', 'solchen', 'solcher', 'solches', 'soll', 'sollen', 'sollst', 'sollt', 'sollte', 'sondern', 'sonst', 'soweit', 'sowie', 'um', 'und', 'uns', 'unse', 'unsem', 'unsen', 'unser', 'unsere', 'unses', 'unter', 'viel', 'vom', 'von', 'vor', 'wann', 'war', 'waren', 'warst', 'warum', 'was', 'weg', 'weil', 'weiter', 'weitere', 'welche', 'welchem', 'welchen', 'welcher', 'welches', 'wenn', 'wer', 'werde', 'werden', 'werdet', 'weshalb', 'wie', 'wieder', 'wieso', 'will', 'wir', 'wird', 'wirst', 'wo', 'woher', 'wohin', 'wollen', 'wollte', 'während', 'würde', 'würden', 'zu', 'zum', 'zur', 'zwar', 'zwischen', 'über'
		];

		// spanish list of words which are ignored when computing top relevant sentences.		
		const stopWordsEs = [
			'', 'a', 'un', 'una', 'unas', 'unos', 'uno', 'sobre', 'de', 'todo', 'también', 'tras', 'otro', 'algún', 'alguno', 'alguna', 'algunos', 'algunas', 'ser', 'es', 'soy', 'eres', 'somos', 'sois', 'esto', 'estoy', 'esta', 'estamos', 'estais', 'estan', 'como', 'en', 'para', 'atras', 'porque', 'por qué', 'estado', 'estaba', 'ante', 'antes', 'siendo', 'ambos', 'pero', 'por', 'no', 'poder', 'sal', 'al', 'puede', 'puedo', 'más', 'ya', 'le', 'o', 'me', 'hasta', 'durante', 'ni', 'ese', 'contra', 'eso', 'mí', 'mi', 'el', 'él', 'podemos', 'podeis', 'pueden', 'fui', 'fue', 'fuimos', 'fueron', 'hacer', 'hago', 'hace', 'hacemos', 'haceis', 'hacen', 'cada', 'fin', 'incluso', 'primero', 'desde', 'conseguir', 'consigo', 'consigue', 'consigues', 'conseguimos', 'consiguen', 'ir', 'voy', 'va', 'vamos', 'vais', 'van', 'vaya', 'gueno', 'ha', 'tener', 'tengo', 'tiene', 'tenemos', 'teneis', 'tienen', 'la', 'lo', 'las', 'los', 'su', 'aqui', 'mio', 'poco', 'tu', 'tú', 'te', 'si', 'sí', 'tuyo', 'ellos', 'ella', 'y', 'del', 'se', 'ellas', 'nos', 'nosotros', 'vosotros', 'vosotras', 'si', 'dentro', 'solo', 'solamente', 'saber', 'sabes', 'sabe', 'sabemos', 'sabeis', 'saben', 'ultimo', 'largo', 'bastante', 'haces', 'muchos', 'aquellos', 'aquellas', 'sus', 'entonces', 'tiempo', 'verdad', 'verdadero', 'verdadera', 'cierto', 'ciertos', 'cierta', 'ciertas', 'intentar', 'intento', 'intenta', 'intentas', 'intentamos', 'intentais', 'intentan', 'dos', 'bajo', 'arriba', 'encima', 'usar', 'uso', 'usas', 'usa', 'usamos', 'usais', 'usan', 'emplear', 'empleo', 'empleas', 'emplean', 'ampleamos', 'empleais', 'valor', 'muy', 'era', 'eras', 'eramos', 'eran', 'modo', 'bien', 'cual', 'cuando', 'donde', 'mientras', 'quien', 'con', 'entre', 'sin', 'trabajo', 'trabajar', 'trabajas', 'trabaja', 'trabajamos', 'trabajais', 'trabajan', 'podria', 'podrias', 'podriamos', 'podrian', 'podriais', 'yo', 'aquel', 'que', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
		];
		
		// french list of words which are ignored when computing top relevant sentences.		
		const stopWordsFr = [
			'', 'alors', 'au', 'aucuns', 'aussi', 'autre', 'avant', 'avec', 'avoir', 'bon', 'car', 'ce', 'cela', 'ces', 'ceux', 'chaque', 'ci', 'comme', 'comment', 'dans', 'des', 'du', 'dedans', 'dehors', 'depuis', 'devrait', 'doit', 'donc', 'dos', 'début', 'elle', 'elles', 'en', 'encore', 'essai', 'est', 'et', 'eu', 'fait', 'faites', 'fois', 'font', 'hors', 'ici', 'il', 'ils', 'je', 'juste', 'la', 'le', 'les', 'leur', 'là ', 'ma', 'maintenant', 'mais', 'mes', 'mine', 'moins', 'mon', 'mot', 'même', 'ni', 'nommés', 'notre', 'nous', 'ou', 'ooù', 'par', 'parce', 'pas', 'peut', 'peu', 'plupart', 'pour', 'pourquoi', 'quand', 'que', 'quel', 'quelle', 'quelles', 'quels', 'qui', 'sa', 'sans', 'ses', 'seulement', 'si', 'sien', 'son', 'sont', 'sous', 'soyez', 'sujet', 'sur', 'ta', 'tandis', 'tellement', 'tels', 'tes', 'ton', 'tous', 'tout', 'trop', 'très', 'tu', 'voient', 'vont', 'votre', 'vous', 'vu', 'ça', 'étaient', 'état', 'étions', 'été', 'être'
		];
		
		// italian list of words which are ignored when computing top relevant sentences.		
		const stopWordsIt = [
			'', 'a', 'adesso', 'ai', 'al', 'alla', 'allo', 'allora', 'altre', 'altri', 'altro', 'anche', 'ancora', 'avere', 'aveva', 'avevano', 'ben', 'buono', 'che', 'chi', 'cinque', 'comprare', 'con', 'consecutivi', 'consecutivo', 'cosa', 'cui', 'da', 'del', 'della', 'dello', 'dentro', 'deve', 'devo', 'di', 'doppio', 'due', 'e', 'ecco', 'fare', 'fine', 'fino', 'fra', 'gente', 'giu', 'ha', 'hai', 'hanno', 'ho', 'il', 'indietro', 'invece', 'io', 'la', 'lavoro', 'le', 'lei', 'lo', 'loro', 'lui', 'lungo', 'ma', 'me', 'meglio', 'molta', 'molti', 'molto', 'nei', 'nella', 'no', 'noi', 'nome', 'nostro', 'nove', 'nuovi', 'nuovo', 'o', 'oltre', 'ora', 'otto', 'peggio', 'pero', 'persone', 'piu', 'poco', 'primo', 'promesso', 'qua', 'quarto', 'quasi', 'quattro', 'quello', 'questo', 'qui', 'quindi', 'quinto', 'rispetto', 'sara', 'secondo', 'sei', 'sembra', 'sembrava', 'senza', 'sette', 'sia', 'siamo', 'siete', 'solo', 'sono', 'sopra', 'soprattutto', 'sotto', 'stati', 'stato', 'stesso', 'su', 'subito', 'sul', 'sulla', 'tanto', 'te', 'tempo', 'terzo', 'tra', 'tre', 'triplo', 'ultimo', 'un', 'una', 'uno', 'va', 'vai', 'voi', 'volte', 'vostro'
		];
		
		// use the language to set the stop words	
		var stopWords = stopWordsEn;
		
		if (currentLanguage === "de") {
			stopWords = stopWordsDe;
		} else if (currentLanguage === "es") {
			stopWords = stopWordsEs;
		} else if (currentLanguage === "fr") {
			stopWords = stopWordsFr;
		} else if (currentLanguage === "it") {
			stopWords = stopWordsIt;
		}	
		
		pullRankOrder(stopWords,hrefHttpArrayA,hrefHttpArrayR,textHttpArray);
		
	});

}

// function to pull the ranking order
function pullRankOrder(stopWords,hrefHttpArrayA,hrefHttpArrayR,textHttpArray) {
console.log("in pull rank");
	// check storage
	storage.get('rankType', function(items) {

		 // pull current rankType from storage
		if (items.rankType) {

			// set the rankOrder
			let rankOrder = items.rankType;							

			// validate the rankOrder
			if ((rankOrder === "adRank") || (rankOrder === "imageRank") || (rankOrder === "scriptRank") || (rankOrder === "videoRank") || (rankOrder === "textRank") || (rankOrder === "linkRank")) {

				// proceed to ajax with first link
				startAjaxProcess(stopWords,hrefHttpArrayA,hrefHttpArrayR,textHttpArray,0,rankOrder);
			
			} else {
			
				// set the default to ad ranking
				let rankOrder = "adRank";

				// proceed to ajax with first link
				startAjaxProcess(stopWords,hrefHttpArrayA,hrefHttpArrayR,textHttpArray,0,rankOrder);
				
			}
			
		} else {

			// set the default to ad ranking
			let rankOrder = "adRank";

			// proceed to ajax with first link
			startAjaxProcess(stopWords,hrefHttpArrayA,hrefHttpArrayR,textHttpArray,0,rankOrder);
								
		}
	});

}

// function to perform the ajax and receive text response
function startAjaxProcess(stopWords,hrefArrayA,hrefArrayR,textArray,linkNo,rankOrder) {
console.log("in start ajax");
	// send the link
	if (hrefArrayA.length > 0 ) {

		// add a listener to handle the receipt of background messages
		chrome.runtime.onMessage.addListener(eventListener);
		  		
		// send first link to background		
		sendBackgroundProcess(hrefArrayA,hrefArrayR,textArray,0,rankOrder);				
		
		// listener to handle the logic upon receipt
		function eventListener(request, sender, sendResponse) {
		
			// check that response is for current page
			if (request.randNo !== randID ) {
			
				// ignore response

			} else if ((request.message === "pTextLinkError") && (request.linkNo >= 0)) {  				
console.log("loading error, need to delete spinner now");											
				// find the anchor that matches the href
				$("a[href='" + hrefArrayR[request.linkNo] + "']").each(function () {
							 
					// check if the link text matches
					if ($(this).text() === textArray[request.linkNo]) {
						
						// delete the loading spinner
						$(this).html( textArray[linkNo] );
						
						// change to dash
						$(this).append("-");
						
						// break out of each
						return false;
					
					}
					
				});
								
				// move to next link
				request.linkNo = request.linkNo + 1;				
				sendBackgroundProcess(hrefArrayA,hrefArrayR,textArray,request.linkNo,rankOrder);				
							  
			} else if (request.message === "pTextLink") {
console.log("adCount",request.adCount);				
				// display the result
				displayProcess(stopWords,hrefArrayA,hrefArrayR,textArray,request.linkNo,rankOrder,request.imageCount,request.videoCount,request.audioCount,request.formCount,request.scriptCount,request.listCount,request.buttonCount,request.canvasCount,request.linkCount,request.tableCount,request.frameworks,request.adCount,request.textCount,request.pText); 										
			}
								
		}
				
	} else {

		// no links	found, stop
		
	}		
	
}
		
function sendBackgroundProcess(hrefArrayA,hrefArrayR,textArray,linkNo,rankOrder) {

	// check that a link exists
	if ((linkNo >= hrefArrayA.length) && (hrefArrayA.length > 0)) {	
		
		// remove any loading spinners not matched in .text() insert
		let fillerDisplay = '-';		
		$( fillerDisplay ).replaceAll( ".spinceLoading" );
		
		// no more links with non-protocol type, stop				
		
console.log("no more links");				
	} else {

		// set the link display to show loading			
		var imagePath = chrome.extension.getURL('/img/blue.gif');
	
		// find the anchor that matches the href
		$("a[href='" + hrefArrayR[linkNo] + "']").each(function () {
					 
			// check if the link text matches
			if ($(this).text() === textArray[linkNo]) {

				// insert the loading spinner
				$(this).append("&nbsp;<img class='spinceLoading' src='" + imagePath + "' style='height:7px;width:7px' />");
				
				// break out of each
				return false;
			
			}
			
		});		

		// send non-protocol link to background		
		chrome.runtime.sendMessage({"message": "ajaxLink", "randNo": randID, "linkNo": linkNo, "hrefLink": hrefArrayA[linkNo]});

	}
	
}

// function to generate extracted sentence and handle display
function displayProcess(stopWords,hrefArrayA,hrefArrayR,textArray,linkNo,rankOrder,imageCount,videoCount,audioCount,formCount,scriptCount,listCount,buttonCount,canvasCount,linkCount,tableCount,frameworks,adCount,textCount,pText) {

	// get the current link being displayed 
	if (rankList.length > 0) {
	
		var currentLink = rankList.length;
		
	} else {
	
		// set the first link
		var currentLink = 0;	
	}
	
	// handle the current link's rank order (textRank handle below)
	if (rankOrder === "adRank") {
	
		// add the current ad count to the rank array		
		rankList.push({"link_id": currentLink,"rankCount": adCount});
		
	} else if (rankOrder === "imageRank") {
	
		// add the current image count to the rank array		
		rankList.push({"link_id": currentLink,"rankCount": imageCount});
				
	} else if (rankOrder === "scriptRank") {
	
		// add the current script count to the rank array		
		rankList.push({"link_id": currentLink,"rankCount": scriptCount});
		
	} else if (rankOrder === "videoRank") {	
	
		// add the current video count to the rank array		
		rankList.push({"link_id": currentLink,"rankCount": videoCount});
		
	} else if (rankOrder === "linkRank") {
	
		// add the current link count to the rank array		
		rankList.push({"link_id": currentLink,"rankCount": linkCount});
				
	} else if (rankOrder === "textRank") {
	
		// add the current text count to the rank array	
		rankList.push({"link_id": currentLink,"rankCount": textCount});
		
	}
	
	// set delimiters and stop words
	const sentenceDelimiter = /[.!?;]/;
	const matchJunk = /["”“#$%&'’()*+,\-\/:<=>@\[\\\]\^_`{|}]/mg ;

	// set the clean functions
	let unescapeHTML = str => str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
	let stripTags= str => str.replace(/<\/?[^>]+>/ig, '');
	let stripClean = str => str.trim((str.replace(/\s+/g, ' ')));
	let stripJunk = str => str.replace(matchJunk, '' );
	let goLower = str => str.toLowerCase();

	// chain the specific clean operations
	let cleanFunc = str =>  {
		
		// perform the various clean operations
		var returnStr = unescapeHTML(str);
		returnStr = stripTags(returnStr);
		returnStr = stripClean(returnStr);
		returnStr = stripJunk(returnStr);
		returnStr = goLower(returnStr);
		return returnStr;
		
	}

	// clean the corpus for word analysis		
	let cleanText = cleanFunc(pText);		
			
	// split cleaned corpus into words
	let wordArray = cleanText.split(' ');

	// map the frequency of each word in the corpus
	let wordFreq = new Map([...new Set(wordArray)].map(
		x => [x, wordArray.filter(y => y === x).length]
	));

	// split the corpus into raw sentences
	let sentences = pText.split(sentenceDelimiter);

	// create variables to calculate the score for each sentence
	let sentenceCount = sentences.length;
	let sentenceScoreArray = [];
	let returnArray = [];
	let sentenceScore = 0;
	let sentenceWords = [];
	let cleanSentence = "";
	let sentenceLength = 0;
	let currentMaxSentence = 0;
	let currentMaxScore = 0;

	// create a sentence score function
	let scoreFunc = str =>  {
		
		// split the actual sentence into words
		let sentWords = str.split(" ");
		
		// count the length of the sentence
		let sentLength = sentWords.length;
		
		// reset the sentenceScore 
		let sentScore = 0;
		
		// cycle through word by word
		for (var j = 0; j < sentLength; j++) {

			// skip if word is a stop word
			if (stopWords.indexOf( sentWords[j] ) === -1) {           
				
				// get the frequency of the word in the document and add to score
				if (wordFreq.get(sentWords[j]) > 0 ) {
					sentScore = sentScore + wordFreq.get(sentWords[j]);	
				}
				
			}
			
		}
		
		return [sentScore, sentLength];
		
	}

	// cycle through each sentence to calculate a score
	for (var i = 0; i < sentenceCount; i++) {

		// clean the sentence
		cleanSentence = cleanFunc(sentences[i]);
		
		// trim the sentence 
		cleanSentence = cleanSentence.trim();

		// get the calculation return values
		returnArray = scoreFunc(cleanSentence);
		
		// calculate the score		
		sentenceScore = returnArray[0];
		
		// scale the score based on position - top of page is more relevant
		sentenceScore = sentenceScore * ((sentenceCount - i) / (sentenceCount));
		
		// scale the score if it includes any tags				
		if ((sentences[i].match(/<\/?[^>]+>/ig) || []).length > 0 ) {
			sentenceScore = sentenceScore * .1;
		}
		
		// scale the score if it includes any special characters				
		if ((sentences[i].match(/["”“#$%&'’()*+,\-\/:=@\[\\\]\^_`{|}]/mg) || []).length > 0 ) {
			sentenceScore = sentenceScore * .5;
		}
		
		// scale the score if sentence starts with lowercase letter
		let first = sentences[i].charAt(0);
		
		if ((first === first.toLowerCase()) && (first !== first.toUpperCase())) {
			sentenceScore = sentenceScore * .1;
		}
		
		// calculate the sentence length
		sentenceLength = returnArray[1];
			
		// normalize total score by sentence length (including stop words)
		if (sentenceLength > 30 ) {
			sentenceScore = sentenceScore * .2;
		} else if (sentenceLength > 20) {	
			sentenceScore = sentenceScore * .25;
		} else if (sentenceLength > 13) {
			sentenceScore = sentenceScore * .45;
		} else if (sentenceLength > 7) {
			sentenceScore = sentenceScore * .6;
		} else if (sentenceLength > 4) {
			sentenceScore = sentenceScore * .7;
		} else {
			sentenceScore = sentenceScore * .2; // penalize super short sentences
		}

		// add score to array
		sentenceScoreArray.push(sentenceScore);	
		
		// check if current max
		if (sentenceScore > currentMaxScore) {
			currentMaxScore = sentenceScore;
			currentMaxSentence = i;
		}
		
	}	

	// clean the actual link text
	let linkText = "";
	let linkHref = "";
	let linkHrefA = "";
	
	linkText = textArray[linkNo];
	linkHref = hrefArrayR[linkNo];
	linkHrefA = hrefArrayA[linkNo];

	let linkTextArray = cleanFunc(linkText);
		
	// set image path for display	
	let redTopPath = chrome.extension.getURL('/img/redTop.png');	
	let whitePath = chrome.extension.getURL('/img/white.png');	
	let pinkPath = chrome.extension.getURL('/img/pink.png');	
	let enterPath = chrome.extension.getURL('/img/enter.png');	
	
	// text clean holders
	let cleanLinkTextInsert = "";
	let cleanSentenceInsert = "";

	// handle the page display
	if (currentMaxSentence >= 0) {
	
		// clean the text
		cleanLinkTextInsert = unescapeHTML(linkText);
		cleanLinkTextInsert = stripTags(cleanLinkTextInsert);
		cleanSentenceInsert = unescapeHTML(sentences[currentMaxSentence]);
		cleanSentenceInsert = stripTags(cleanSentenceInsert);
		cleanSentenceInsert = stripJunk(cleanSentenceInsert);

	} else {

		// no sentence found
		cleanLinkTextInsert = unescapeHTML(linkText);
		cleanLinkTextInsert = stripTags(cleanLinkTextInsert);
		cleanSentenceInsert = "Spince extracted sentence not found.";
		
	}
	
	// set the current link number being displayed
	let currentLinkDisplay = rankList.length - 1;
	
	// find the anchor that matches the href
	$("a[href='" + linkHref + "']").each(function () {

		// check if the link text matches
		if ($(this).text().trim() === linkText.trim())  {

			// set the snapshot summary
			var contentString = '<div style="display: none" id="snapContent' + currentLinkDisplay + '">';
			contentString = contentString + '<table style="width:450px;border-width:5px;border-style:ridge;padding:4px;border-spacing:3px;border-collapse:separate;">';
			contentString = contentString + '<tr background="' + redTopPath + '"><th colspan="12" style="text-align:center;padding:4px;border:1px;">';
			contentString = contentString + '<h3 style="color:white;display:inline;">Spince Snapshot Summary</h3>';
			contentString = contentString + '</th></tr><tr background="' + whitePath + '"><th style="border:1px" colspan="12"></th></tr>';
			contentString = contentString + '<tr background="' + pinkPath + '"><th style="border:1px;" colspan="12"></th></tr><tr>';
			contentString = contentString + '<th style="border:1px solid;padding:4px;text-align:center;font-weight:bold;" colspan="12">';
			contentString = contentString + 'Frameworks</th></tr><tr><td colspan="12" style="text-align:center;border:1px solid;padding:4px">' + frameworks.toString() + '</td>';
			contentString = contentString + '</tr><tr><th style="border:1px solid;padding:4px;text-align:center;font-weight:bold;" colspan="12">Components</th></tr><tr>';
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-camera-retro"></i>&nbsp;&nbsp;' + imageCount + ' images</td>';
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-video-camera"></i>&nbsp;&nbsp;' + videoCount + ' videos</td>';
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-buysellads"></i>&nbsp;&nbsp;' + adCount + ' ads</td>';
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-file-code-o">';
			contentString = contentString + '</i>&nbsp;&nbsp;' + scriptCount + ' scripts</td>';
			contentString = contentString + '</tr><tr><td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-music"></i>';
			contentString = contentString + '&nbsp;&nbsp;' + audioCount + ' audio</td>';
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-wpforms"></i>&nbsp;&nbsp;' + formCount + ' forms</td>';
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-table"></i>&nbsp;&nbsp;' + tableCount + ' tables</td>';
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-link"></i>&nbsp;&nbsp;' + linkCount + ' links</td></tr>';
			contentString = contentString + '<tr><td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-font"></i>&nbsp;&nbsp;' + textCount + '% text</td>';      
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-list"></i>&nbsp;&nbsp;' + listCount + ' lists</td>';      
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-square"></i>&nbsp;&nbsp;' + buttonCount + ' buttons</td>';
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="3">&nbsp;<i class="fa fa-picture-o"></i>';
			contentString = contentString + '&nbsp;&nbsp;' + canvasCount + ' canvas</td></tr><tr>';
			contentString = contentString + '<td style="border:1px solid;padding:4px" colspan="12">Extracted Sentence: ' + cleanSentenceInsert.trim() + '.</td></tr></table>';
			contentString = contentString + '<table style="width:450px;border:0px;padding:4px;"><tr><td style="text-align:right;padding:4px;" align="right">';
			contentString = contentString + '<a href="' + linkHrefA + '">';
			contentString = contentString + '<img src="' + enterPath + '"></a></td></tr>';
			contentString = contentString + '</table></div>';

			// delete the loading				
			$(this).html( cleanLinkTextInsert );						

			// temporary ranking display
			let tempRankDisplay = '<span class="fa-stack fa-1x"><i class="fa fa-circle-o fa-stack-2x" style="color:#ad0702"></i>';
			tempRankDisplay = tempRankDisplay + '<strong id="spinceLink' + currentLinkDisplay + '" class="fa-stack-1x">1</strong></span>';

			// insert the tooltip and green circle
			$(this).after(contentString);							
			$(this).after("&nbsp;<span class='sTooltip" + currentLink + "'>" + tempRankDisplay + "</span>");
																						
		}
		
		return false;
		
	});
	
	// set the jBox tooltips
	$('.sTooltip' + currentLinkDisplay).jBox('Tooltip', {		
		content: $('#snapContent' + currentLinkDisplay),		
		trigger: 'click',			
		closeOnClick: true,
		adjustPosition: true,
		adjustTracker: true
	});

	// set the current rankList
	let tempRankList = rankList;
	
	// sort the rankList by type
	if (rankOrder === "adRank") {

		// sort in an ascending fashion				
		var rankSorted = tempRankList.sort(function(a, b) {
			return parseFloat(a.rankCount) - parseFloat(b.rankCount);
		});

	} else {
	
		// sort in an descending fashion				
		var rankSorted = tempRankList.sort(function(a, b) {
			return parseFloat(b.rankCount) - parseFloat(a.rankCount);
		});

	}

	// update the ranking number of all analyzed links
	let linkUpdate = 0;
	while (linkUpdate <= currentLinkDisplay) {		
		let currentRank = parseInt(linkUpdate) + 1;
		let currentRankString = currentRank.toString();		
		let rankSortedLink = rankSorted[linkUpdate];
		let spinceLinkNumber = rankSortedLink["link_id"];				
		$('#spinceLink' + spinceLinkNumber).text(currentRankString);				
		linkUpdate++;
	}		
							
	// move to next link
	linkNo = linkNo + 1;		
	
	sendBackgroundProcess(hrefArrayA,hrefArrayR,textArray,linkNo,rankOrder);				
			
}

// create a random identifier to id this page to background process
const randID = Math.floor(Math.random() * 10000000000) + 1; 

// insert font-awesome style node for summary snapshot
function setupFontAwesome() {
	var fa = document.createElement('style');
	fa.type = 'text/css';
	fa.textContent = '@font-face { font-family: FontAwesome; src: url("'
			+ chrome.extension.getURL('fa/fonts/fontawesome-webfont.woff?v=4.6.3')
			+ '"); }';
	document.head.appendChild(fa);
}
