// set-up adList array
var adList = [];

// receive message from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	// check if message is blacklist site
	if ( request.message === "blacklistSite" ) {  
	
		// change the icon to inactive
		chrome.browserAction.setIcon({path:"img/iconOff38.png"});
	
	// check if message is whitelist site or resume
	} else if ( request.message === "whitelistSite" ) {  
	
		// change the icon to inactive
		chrome.browserAction.setIcon({path:"img/icon.png"});
			
	// check if message is pause
	} else if ( request.message === "pause" ) {  
	
		// change the icon to inactive
		chrome.browserAction.setIcon({path:"img/iconPause38.png"});
		
	// check if message is ajax link
	} else if ( request.message === "ajaxLink" ) {  
				
		// ajax the link to the active tab
		$.ajax({
			url: request.hrefLink,	
			cache: true,
			dataType: 'text',
			success: function (response) {				

				// clean the corpus and send back result
				cleanCorpus(request.linkNo,request.randNo,response);
				
			},
			error: function (xhr, ajaxOptions, thrownError){				

				// send back error message
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {"message": "pTextLinkError", "randNo": request.randNo, "linkNo": request.linkNo, "pText": "none"}, function() {})  					
				});
				
			}        
		});

	}

});

// function to process the results
function cleanCorpus(linkNo,randNo,response) {

	// make sure all tags are lowercase	
	let lowerString = response.toLowerCase();

	// count the image tags
	var imageCount = (lowerString.match(/<img/g) || []).length;
	
	// count the video tags
	var videoCount = (lowerString.match(/<video/g) || []).length;
	
	// count the audio tags
	var audioCount = (lowerString.match(/<audio/g) || []).length;	
	
	// count the form tags
	var formCount = (lowerString.match(/<form/g) || []).length;	
	
	// count the script tags
	var scriptCount = (lowerString.match(/<script/g) || []).length;	
	
	// count the list tags
	var ulCount = (lowerString.match(/<ul/g) || []).length;
	var olCount = (lowerString.match(/<ol/g) || []).length;
	var listCount = ulCount + olCount;	
		
	// count the button tags
	var buttonCount = (lowerString.match(/<button/g) || []).length;	
	
	// count the canvas tags
	var canvasCount = (lowerString.match(/<canvas/g) || []).length;	
		
	// count the a href tags
	var linkCount = (lowerString.match(/\/a>/g) || []).length;	
	
	// count the table tags
	var tableCount = (lowerString.match(/<table/g) || []).length;	
		
	// set-up frameworks array
	var frameworks = [];

	// check for popular frameworks
	if ((lowerString.match(/\/1140/g) || []).length > 0) { frameworks.push(' 1140'); }
	if ((lowerString.match(/\/1000hz-bootstrap-validator/g) || []).length > 0) { frameworks.push(' 1000hz-bootstrap-validator'); }
	if ((lowerString.match(/\/10up-sanitize.css/g) || []).length > 0) { frameworks.push(' 10up-sanitize.css'); }
	if ((lowerString.match(/\/16pixels/g) || []).length > 0) { frameworks.push(' 16pixels'); }
	if ((lowerString.match(/\/3dmol/g) || []).length > 0) { frameworks.push(' 3dmol'); }
	if ((lowerString.match(/\/6px/g) || []).length > 0) { frameworks.push(' 6px'); }
	if ((lowerString.match(/\/6to5/g) || []).length > 0) { frameworks.push(' 6to5'); }
	if ((lowerString.match(/\/960gs/g) || []).length > 0) { frameworks.push(' 960gs'); }
	if ((lowerString.match(/\/alertifyjs/g) || []).length > 0) { frameworks.push(' alertifyjs'); }
	if ((lowerString.match(/\/allofthelights.js/g) || []).length > 0) { frameworks.push(' allofthelights.js'); }
	if ((lowerString.match(/\/anijs/g) || []).length > 0) { frameworks.push(' anijs'); }
	if ((lowerString.match(/\/backbone.dualstorage/g) || []).length > 0) { frameworks.push(' backbone.dualstorage'); }
	if ((lowerString.match(/\/base64/g) || []).length > 0) { frameworks.push(' base64'); }
	if ((lowerString.match(/\/bigvideo.js/g) || []).length > 0) { frameworks.push(' bigvideo.js'); }
	if ((lowerString.match(/\/buttons/g) || []).length > 0) { frameworks.push(' buttons'); }
	if ((lowerString.match(/\/camera/g) || []).length > 0) { frameworks.push(' camera'); }
	if ((lowerString.match(/\/canvasinput/g) || []).length > 0) { frameworks.push(' canvasinput'); }
	if ((lowerString.match(/\/captionator/g) || []).length > 0) { frameworks.push(' captionator'); }
	if ((lowerString.match(/\/caret.js/g) || []).length > 0) { frameworks.push(' caret.js'); }
	if ((lowerString.match(/\/chart.js/g) || []).length > 0) { frameworks.push(' chart.js'); }
	if ((lowerString.match(/\/clamp.js/g) || []).length > 0) { frameworks.push(' clamp.js'); }
	if ((lowerString.match(/\/codeflask.js/g) || []).length > 0) { frameworks.push(' codeflask.js'); }
	if ((lowerString.match(/\/colors.js/g) || []).length > 0) { frameworks.push(' colors.js'); }
	if ((lowerString.match(/\/contenttools/g) || []).length > 0) { frameworks.push(' contenttools'); }
	if ((lowerString.match(/\/cookies.js/g) || []).length > 0) { frameworks.push(' cookies.js'); }
	if ((lowerString.match(/\/coolqueue.io/g) || []).length > 0) { frameworks.push(' coolqueue.io'); }
	if ((lowerString.match(/\/counter-up/g) || []).length > 0) { frameworks.push(' counter-up'); }
	if ((lowerString.match(/\/detect.js/g) || []).length > 0) { frameworks.push(' detect.js'); }
	if ((lowerString.match(/\/dinakit/g) || []).length > 0) { frameworks.push(' dinakit'); }
	if ((lowerString.match(/\/director/g) || []).length > 0) { frameworks.push(' director'); }
	if ((lowerString.match(/\/dropify/g) || []).length > 0) { frameworks.push(' dropify'); }
	if ((lowerString.match(/\/dynatable/g) || []).length > 0) { frameworks.push(' dynatable'); }
	if ((lowerString.match(/\/easeljs/g) || []).length > 0) { frameworks.push(' easeljs'); }	
	if ((lowerString.match(/\/eventemitter/g) || []).length > 0) { frameworks.push(' eventemitter'); }	
	if ((lowerString.match(/\/f2/g) || []).length > 0) { frameworks.push(' f2'); }
	if ((lowerString.match(/\/faker/g) || []).length > 0) { frameworks.push(' faker'); }
	if ((lowerString.match(/\/feedek/g) || []).length > 0) { frameworks.push(' feedek'); }
	if ((lowerString.match(/\/filesaver.js/g) || []).length > 0) { frameworks.push(' filesaver.js'); }
	if ((lowerString.match(/\/fittext.js/g) || []).length > 0) { frameworks.push(' fittext.js'); }
	if ((lowerString.match(/\/flipdiv/g) || []).length > 0) { frameworks.push(' flipdiv'); }
	if ((lowerString.match(/\/flowtype.js/g) || []).length > 0) { frameworks.push(' flowtype.js'); }
	if ((lowerString.match(/\/fort.js/g) || []).length > 0) { frameworks.push(' fort.js'); }
	if ((lowerString.match(/\/frozenui/g) || []).length > 0) { frameworks.push(' frozenui'); }
	if ((lowerString.match(/\/funcunit/g) || []).length > 0) { frameworks.push(' funcunit'); }
	if ((lowerString.match(/\/glide.js/g) || []).length > 0) { frameworks.push(' glide.js'); }	
	if ((lowerString.match(/\/han/g) || []).length > 0) { frameworks.push(' han'); }
	if ((lowerString.match(/\/html5notification/g) || []).length > 0) { frameworks.push(' html5notification'); }	
	if ((lowerString.match(/\/hoverizr/g) || []).length > 0) { frameworks.push(' hoverizr'); }
	if ((lowerString.match(/\/hyphenator/g) || []).length > 0) { frameworks.push(' hyphenator'); }
	if ((lowerString.match(/\/icanhaz.js/g) || []).length > 0) { frameworks.push(' icanhaz.js'); }
	if ((lowerString.match(/\/jquery-snowfall/g) || []).length > 0) { frameworks.push(' jquery-snowfall'); }
	if ((lowerString.match(/\/javascript-autocomplete/g) || []).length > 0) { frameworks.push(' javascript-autocomplete'); }
	if ((lowerString.match(/\/jouele/g) || []).length > 0) { frameworks.push(' jouele'); }
	if ((lowerString.match(/\/katex/g) || []).length > 0) { frameworks.push(' katex'); }
	if ((lowerString.match(/\/kalendae/g) || []).length > 0) { frameworks.push(' kalendae'); }
	if ((lowerString.match(/\/kraken/g) || []).length > 0) { frameworks.push(' kraken'); }
	if ((lowerString.match(/\/ladda/g) || []).length > 0) { frameworks.push(' ladda'); }
	if ((lowerString.match(/\/leaflet.spin/g) || []).length > 0) { frameworks.push(' leaflet.spin'); }
	if ((lowerString.match(/\/leaflet.awesome-markers/g) || []).length > 0) { frameworks.push(' leaflet.awesome-markers'); }
	if ((lowerString.match(/\/loadgo/g) || []).length > 0) { frameworks.push(' loadgo'); }
	if ((lowerString.match(/\/logosdistort/g) || []).length > 0) { frameworks.push(' logosdistort'); }
	if ((lowerString.match(/\/materialdesign-webfont/g) || []).length > 0) { frameworks.push(' materialdesign-webfont'); }
	if ((lowerString.match(/\/modelcore/g) || []).length > 0) { frameworks.push(' modelcore'); }
	if ((lowerString.match(/\/mutationobserver.js/g) || []).length > 0) { frameworks.push(' mutationobserver.js'); }
	if ((lowerString.match(/\/nestable/g) || []).length > 0) { frameworks.push(' nestable'); }
	if ((lowerString.match(/\/odataresources/g) || []).length > 0) { frameworks.push(' odataresources'); }
	if ((lowerString.match(/\/owlcarousel2/g) || []).length > 0) { frameworks.push(' owlcarousel2'); }
	if ((lowerString.match(/\/pki.js/g) || []).length > 0) { frameworks.push(' pki.js'); }
	if ((lowerString.match(/\/papaparse/g) || []).length > 0) { frameworks.push(' papaparse'); }
	if ((lowerString.match(/\/physicsjs/g) || []).length > 0) { frameworks.push(' physicsjs'); }
	if ((lowerString.match(/\/pikachoose/g) || []).length > 0) { frameworks.push(' pikachoose'); }
	if ((lowerString.match(/\/pjax-standalone/g) || []).length > 0) { frameworks.push(' pjax-standalone'); }
	if ((lowerString.match(/\/preloadjs/g) || []).length > 0) { frameworks.push(' preloadjs'); }
	if ((lowerString.match(/\/primer/g) || []).length > 0) { frameworks.push(' primer'); }
	if ((lowerString.match(/\/promin/g) || []).length > 0) { frameworks.push(' promin'); }	
	if ((lowerString.match(/\/pulltorefresh/g) || []).length > 0) { frameworks.push(' pulltorefresh'); }
	if ((lowerString.match(/\/radian/g) || []).length > 0) { frameworks.push(' radian'); }
	if ((lowerString.match(/\/readmore.js/g) || []).length > 0) { frameworks.push(' readmore.js'); }
	if ((lowerString.match(/\/repaintless.css/g) || []).length > 0) { frameworks.push(' repaintless.css'); }
	if ((lowerString.match(/\/responsiveslides.js/g) || []).length > 0) { frameworks.push(' responsiveslides.js'); }
	if ((lowerString.match(/\/ryanmullins-angular-hammer/g) || []).length > 0) { frameworks.push(' ryanmullins-angular-hammer'); }
	if ((lowerString.match(/\/svg-morpheus/g) || []).length > 0) { frameworks.push(' svg-morpheus'); }	
	if ((lowerString.match(/\/scrollmagic/g) || []).length > 0) { frameworks.push(' scrollmagic'); }
	if ((lowerString.match(/\/selectivity.js/g) || []).length > 0) { frameworks.push(' selectivity.js'); }
	if ((lowerString.match(/\/shuffle/g) || []).length > 0) { frameworks.push(' shuffle'); }
	if ((lowerString.match(/\/sidy.js/g) || []).length > 0) { frameworks.push(' sidy.js'); }
	if ((lowerString.match(/\/slicknav/g) || []).length > 0) { frameworks.push(' slicknav'); }
	if ((lowerString.match(/\/sly/g) || []).length > 0) { frameworks.push(' sly'); }
	if ((lowerString.match(/\/snowstorm/g) || []).length > 0) { frameworks.push(' snowstorm'); }
	if ((lowerString.match(/\/sortable/g) || []).length > 0) { frameworks.push(' sortable'); }
	if ((lowerString.match(/\/soundjs/g) || []).length > 0) { frameworks.push(' soundjs'); }
	if ((lowerString.match(/\/speechkitt/g) || []).length > 0) { frameworks.push(' speechkitt'); }	
	if ((lowerString.match(/\/superscrollorama/g) || []).length > 0) { frameworks.push(' superscrollorama'); }	
	if ((lowerString.match(/\/swiper/g) || []).length > 0) { frameworks.push(' swiper'); }
	if ((lowerString.match(/\/syntaxhighlighter/g) || []).length > 0) { frameworks.push(' syntaxhighlighter'); }
	if ((lowerString.match(/\/tableexport/g) || []).length > 0) { frameworks.push(' tableexport'); }	
	if ((lowerString.match(/\/timeme.js/g) || []).length > 0) { frameworks.push(' timeme.js'); }
	if ((lowerString.match(/\/tinynav.js/g) || []).length > 0) { frameworks.push(' tinynav.js'); }
	if ((lowerString.match(/\/tipue-search/g) || []).length > 0) { frameworks.push(' tipue-search'); }
	if ((lowerString.match(/\/tocca.js/g) || []).length > 0) { frameworks.push(' tocca.js'); }
	if ((lowerString.match(/\/trip.js/g) || []).length > 0) { frameworks.push(' trip.js'); }
	if ((lowerString.match(/\/trumbowyg/g) || []).length > 0) { frameworks.push(' trumbowyg'); }
	if ((lowerString.match(/\/turf.js/g) || []).length > 0) { frameworks.push(' turf.js'); }
	if ((lowerString.match(/\/typewatch/g) || []).length > 0) { frameworks.push(' typewatch'); }
	if ((lowerString.match(/\/typist/g) || []).length > 0) { frameworks.push(' typist'); }
	if ((lowerString.match(/\/uaparser.js/g) || []).length > 0) { frameworks.push(' uaparser.js'); }
	if ((lowerString.match(/\/uri.js/g) || []).length > 0) { frameworks.push(' uri.js'); }
	if ((lowerString.match(/\/uniform.js/g) || []).length > 0) { frameworks.push(' uniform.js'); }
	if ((lowerString.match(/\/upup/g) || []).length > 0) { frameworks.push(' upup'); }
	if ((lowerString.match(/\/vague.js/g) || []).length > 0) { frameworks.push(' vague.js'); }
	if ((lowerString.match(/\/vidage/g) || []).length > 0) { frameworks.push(' vidage'); }
	if ((lowerString.match(/\/voyeur/g) || []).length > 0) { frameworks.push(' voyeur'); }
	if ((lowerString.match(/\/webfont/g) || []).length > 0) { frameworks.push(' webfont.js'); }
	if ((lowerString.match(/\/webrupee/g) || []).length > 0) { frameworks.push(' webrupee'); }
	if ((lowerString.match(/\/zebra_datepicker/g) || []).length > 0) { frameworks.push(' zebra_datepicker'); }
	if ((lowerString.match(/\/absurd/g) || []).length > 0) { frameworks.push(' absurd'); }
	if ((lowerString.match(/\/accounting.js/g) || []).length > 0) { frameworks.push(' accounting.js'); }
	if ((lowerString.match(/\/ace/g) || []).length > 0) { frameworks.push(' ace'); }
	if ((lowerString.match(/\/acorn/g) || []).length > 0) { frameworks.push(' acorn'); }
	if ((lowerString.match(/\/adapterjs/g) || []).length > 0) { frameworks.push(' adapterjs'); }
	if ((lowerString.match(/\/admin-lte/g) || []).length > 0) { frameworks.push(' admin-lte'); }
	if ((lowerString.match(/\/aegis/g) || []).length > 0) { frameworks.push(' aegis'); }
	if ((lowerString.match(/\/aframe-text-component/g) || []).length > 0) { frameworks.push(' aframe-text-component'); }
	if ((lowerString.match(/\/aframe/g) || []).length > 0) { frameworks.push(' aframe'); }
	if ((lowerString.match(/\/ag-grid/g) || []).length > 0) { frameworks.push(' ag-grid'); }
	if ((lowerString.match(/\/agility/g) || []).length > 0) { frameworks.push(' agility'); }
	if ((lowerString.match(/\/aight/g) || []).length > 0) { frameworks.push(' aight'); }
	if ((lowerString.match(/\/air-datepicker/g) || []).length > 0) { frameworks.push(' air-datepicker'); }
	if ((lowerString.match(/\/airbrake-js/g) || []).length > 0) { frameworks.push(' airbrake-js'); }
	if ((lowerString.match(/\/aja\//g) || []).length > 0) { frameworks.push(' aja'); }
	if ((lowerString.match(/\/ajax-bootstrap-select/g) || []).length > 0) { frameworks.push(' ajax-bootstrap-select'); }
	if ((lowerString.match(/\/ajaxify/g) || []).length > 0) { frameworks.push(' ajaxify'); }
	if ((lowerString.match(/\/ajile/g) || []).length > 0) { frameworks.push(' ajile'); }
	if ((lowerString.match(/\/ajv/g) || []).length > 0) { frameworks.push(' ajv'); }
	if ((lowerString.match(/\/alasql/g) || []).length > 0) { frameworks.push(' alasql'); }
	if ((lowerString.match(/\/alchemyjs/g) || []).length > 0) { frameworks.push(' alchemyjs'); }
	if ((lowerString.match(/\/alertify.js/g) || []).length > 0) { frameworks.push(' alertify.js'); }
	if ((lowerString.match(/\/alertifyjs-alertify.js/g) || []).length > 0) { frameworks.push(' alertifyjs-alertify.js'); }
	if ((lowerString.match(/\/alexandernst-angular-multi-select/g) || []).length > 0) { frameworks.push(' alexandernst-angular-multi-select'); }
	if ((lowerString.match(/\/algoliasearch-helper-js/g) || []).length > 0) { frameworks.push(' algoliasearch-helper-js'); }
	if ((lowerString.match(/\/algoliasearch/g) || []).length > 0) { frameworks.push(' algoliasearch'); }
	if ((lowerString.match(/\/allmighty-autocomplete/g) || []).length > 0) { frameworks.push(' allmighty-autocomplete'); }
	if ((lowerString.match(/\/allow-me/g) || []).length > 0) { frameworks.push(' allow-me'); }
	if ((lowerString.match(/\/alloy-ui/g) || []).length > 0) { frameworks.push(' alloy-ui'); }
	if ((lowerString.match(/\/ally.js/g) || []).length > 0) { frameworks.push(' ally.js'); }
	if ((lowerString.match(/\/alt/g) || []).length > 0) { frameworks.push(' alt'); }
	if ((lowerString.match(/\/alton/g) || []).length > 0) { frameworks.push(' alton'); }
	if ((lowerString.match(/\/amazeui-react/g) || []).length > 0) { frameworks.push(' amazeui-react'); }
	if ((lowerString.match(/\/amazeui/g) || []).length > 0) { frameworks.push(' amazeui'); }
	if ((lowerString.match(/\/amcharts/g) || []).length > 0) { frameworks.push(' amcharts'); }
	if ((lowerString.match(/\/ammaps/g) || []).length > 0) { frameworks.push(' ammaps'); }
	if ((lowerString.match(/\/amplifyjs/g) || []).length > 0) { frameworks.push(' amplifyjs'); }
	if ((lowerString.match(/\/amstockchart/g) || []).length > 0) { frameworks.push(' amstockchart'); }
	if ((lowerString.match(/\/analytics.js/g) || []).length > 0) { frameworks.push(' analytics.js'); }
	if ((lowerString.match(/\/anchor-js/g) || []).length > 0) { frameworks.push(' anchor-js'); }
	if ((lowerString.match(/\/anchor.js/g) || []).length > 0) { frameworks.push(' anchor.js'); }
	if ((lowerString.match(/\/angucomplete-alt/g) || []).length > 0) { frameworks.push(' angucomplete-alt'); }
	if ((lowerString.match(/\/angular-audio/g) || []).length > 0) { frameworks.push(' angular-audio'); }
	if ((lowerString.match(/\/angular-autofields/g) || []).length > 0) { frameworks.push(' angular-autofields'); }
	if ((lowerString.match(/\/angular-azure-mobile-service/g) || []).length > 0) { frameworks.push(' angular-azure-mobile-service'); }
	if ((lowerString.match(/\/angular-bacon/g) || []).length > 0) { frameworks.push(' angular-bacon'); }
	if ((lowerString.match(/\/angular-base64/g) || []).length > 0) { frameworks.push(' angular-base64'); }
	if ((lowerString.match(/\/angular-bindonce/g) || []).length > 0) { frameworks.push(' angular-bindonce'); }
	if ((lowerString.match(/\/angular-block-ui/g) || []).length > 0) { frameworks.push(' angular-block-ui'); }
	if ((lowerString.match(/\/angular-bootstrap-colorpicker/g) || []).length > 0) { frameworks.push(' angular-bootstrap-colorpicker'); }
	if ((lowerString.match(/\/angular-bootstrap-datetimepicker/g) || []).length > 0) { frameworks.push(' angular-bootstrap-datetimepicker'); }
	if ((lowerString.match(/\/angular-bootstrap-lightbox/g) || []).length > 0) { frameworks.push(' angular-bootstrap-lightbox'); }
	if ((lowerString.match(/\/angular-bootstrap-slider/g) || []).length > 0) { frameworks.push(' angular-bootstrap-slider'); }
	if ((lowerString.match(/\/angular-bootstrap-switch/g) || []).length > 0) { frameworks.push(' angular-bootstrap-switch'); }
	if ((lowerString.match(/\/angular-br-filters/g) || []).length > 0) { frameworks.push(' angular-br-filters'); }
	if ((lowerString.match(/\/angular-breadcrumb/g) || []).length > 0) { frameworks.push(' angular-breadcrumb'); }
	if ((lowerString.match(/\/angular-busy/g) || []).length > 0) { frameworks.push(' angular-busy'); }
	if ((lowerString.match(/\/angular-cache/g) || []).length > 0) { frameworks.push(' angular-cache'); }
	if ((lowerString.match(/\/angular-cached-resource/g) || []).length > 0) { frameworks.push(' angular-cached-resource'); }
	if ((lowerString.match(/\/angular-carousel/g) || []).length > 0) { frameworks.push(' angular-carousel'); }
	if ((lowerString.match(/\/angular-chart.js/g) || []).length > 0) { frameworks.push(' angular-chart.js'); }
	if ((lowerString.match(/\/angular-chartist.js/g) || []).length > 0) { frameworks.push(' angular-chartist.js'); }
	if ((lowerString.match(/\/angular-charts/g) || []).length > 0) { frameworks.push(' angular-charts'); }
	if ((lowerString.match(/\/angular-chosen-localytics/g) || []).length > 0) { frameworks.push(' angular-chosen-localytics'); }
	if ((lowerString.match(/\/angular-clipboard/g) || []).length > 0) { frameworks.push(' angular-clipboard'); }
	if ((lowerString.match(/\/angular-confirm/g) || []).length > 0) { frameworks.push(' angular-confirm'); }
	if ((lowerString.match(/\/angular-cookie/g) || []).length > 0) { frameworks.push(' angular-cookie'); }
	if ((lowerString.match(/\/angular-css/g) || []).length > 0) { frameworks.push(' angular-css'); }
	if ((lowerString.match(/\/angular-data-table/g) || []).length > 0) { frameworks.push(' angular-data-table'); }
	if ((lowerString.match(/\/angular-data/g) || []).length > 0) { frameworks.push(' angular-data'); }
	if ((lowerString.match(/\/angular-datatables/g) || []).length > 0) { frameworks.push(' angular-datatables'); }
	if ((lowerString.match(/\/angular-debounce/g) || []).length > 0) { frameworks.push(' angular-debounce'); }
	if ((lowerString.match(/\/angular-dialog-service/g) || []).length > 0) { frameworks.push(' angular-dialog-service'); }
	if ((lowerString.match(/\/angular-drag-and-drop-lists/g) || []).length > 0) { frameworks.push(' angular-drag-and-drop-lists'); }
	if ((lowerString.match(/\/angular-dragula/g) || []).length > 0) { frameworks.push(' angular-dragula'); }
	if ((lowerString.match(/\/angular-dynamic-locale/g) || []).length > 0) { frameworks.push(' angular-dynamic-locale'); }
	if ((lowerString.match(/\/angular-elastic/g) || []).length > 0) { frameworks.push(' angular-elastic'); }
	if ((lowerString.match(/\/angular-file-upload/g) || []).length > 0) { frameworks.push(' angular-file-upload'); }
	if ((lowerString.match(/\/angular-filemanager/g) || []).length > 0) { frameworks.push(' angular-filemanager'); }
	if ((lowerString.match(/\/angular-filter/g) || []).length > 0) { frameworks.push(' angular-filter'); }
	if ((lowerString.match(/\/angular-formly-templates-bootstrap/g) || []).length > 0) { frameworks.push(' angular-formly-templates-bootstrap'); }
	if ((lowerString.match(/\/angular-formly/g) || []).length > 0) { frameworks.push(' angular-formly'); }
	if ((lowerString.match(/\/angular-foundation/g) || []).length > 0) { frameworks.push(' angular-foundation'); }
	if ((lowerString.match(/\/angular-gantt/g) || []).length > 0) { frameworks.push(' angular-gantt'); }
	if ((lowerString.match(/\/angular-gettext/g) || []).length > 0) { frameworks.push(' angular-gettext'); }
	if ((lowerString.match(/\/angular-google-analytics/g) || []).length > 0) { frameworks.push(' angular-google-analytics'); }
	if ((lowerString.match(/\/angular-google-chart/g) || []).length > 0) { frameworks.push(' angular-google-chart'); }
	if ((lowerString.match(/\/angular-google-maps/g) || []).length > 0) { frameworks.push(' angular-google-maps'); }
	if ((lowerString.match(/\/angular-gravatar/g) || []).length > 0) { frameworks.push(' angular-gravatar'); }
	if ((lowerString.match(/\/angular-hal/g) || []).length > 0) { frameworks.push(' angular-hal'); }
	if ((lowerString.match(/\/angular-highlightjs/g) || []).length > 0) { frameworks.push(' angular-highlightjs'); }
	if ((lowerString.match(/\/angular-hotkeys/g) || []).length > 0) { frameworks.push(' angular-hotkeys'); }
	if ((lowerString.match(/\/angular-i18n/g) || []).length > 0) { frameworks.push(' angular-i18n'); }
	if ((lowerString.match(/\/angular-image-spinner/g) || []).length > 0) { frameworks.push(' angular-image-spinner'); }
	if ((lowerString.match(/\/angular-input-masks/g) || []).length > 0) { frameworks.push(' angular-input-masks'); }
	if ((lowerString.match(/\/angular-inview/g) || []).length > 0) { frameworks.push(' angular-inview'); }
	if ((lowerString.match(/\/angular-js-bootstrap-datetimepicker/g) || []).length > 0) { frameworks.push(' angular-js-bootstrap-datetimepicker'); }
	if ((lowerString.match(/\/angular-ladda/g) || []).length > 0) { frameworks.push(' angular-ladda'); }
	if ((lowerString.match(/\/angular-leaflet-directive/g) || []).length > 0) { frameworks.push(' angular-leaflet-directive'); }
	if ((lowerString.match(/\/angular-linkify/g) || []).length > 0) { frameworks.push(' angular-linkify'); }
	if ((lowerString.match(/\/angular-loading-bar/g) || []).length > 0) { frameworks.push(' angular-loading-bar'); }
	if ((lowerString.match(/\/angular-local-storage/g) || []).length > 0) { frameworks.push(' angular-local-storage'); }
	if ((lowerString.match(/\/angular-material-data-table/g) || []).length > 0) { frameworks.push(' angular-material-data-table'); }
	if ((lowerString.match(/\/angular-material-icons/g) || []).length > 0) { frameworks.push(' angular-material-icons'); }
	if ((lowerString.match(/\/angular-material/g) || []).length > 0) { frameworks.push(' angular-material'); }
	if ((lowerString.match(/\/angular-materialize/g) || []).length > 0) { frameworks.push(' angular-materialize'); }
	if ((lowerString.match(/\/angular-md5/g) || []).length > 0) { frameworks.push(' angular-md5'); }
	if ((lowerString.match(/\/angular-media-queries/g) || []).length > 0) { frameworks.push(' angular-media-queries'); }
	if ((lowerString.match(/\/angular-messages/g) || []).length > 0) { frameworks.push(' angular-messages'); }
	if ((lowerString.match(/\/angular-mixpanel/g) || []).length > 0) { frameworks.push(' angular-mixpanel'); }
	if ((lowerString.match(/\/angular-moment/g) || []).length > 0) { frameworks.push(' angular-moment'); }
	if ((lowerString.match(/\/angular-morris/g) || []).length > 0) { frameworks.push(' angular-morris'); }
	if ((lowerString.match(/\/angular-motion/g) || []).length > 0) { frameworks.push(' angular-motion'); }
	if ((lowerString.match(/\/angular-mousewheel/g) || []).length > 0) { frameworks.push(' angular-mousewheel'); }
	if ((lowerString.match(/\/angular-multi-select/g) || []).length > 0) { frameworks.push(' angular-multi-select'); }
	if ((lowerString.match(/\/angular-nvd3/g) || []).length > 0) { frameworks.push(' angular-nvd3'); }
	if ((lowerString.match(/\/angular-permission/g) || []).length > 0) { frameworks.push(' angular-permission'); }
	if ((lowerString.match(/\/angular-poller/g) || []).length > 0) { frameworks.push(' angular-poller'); }
	if ((lowerString.match(/\/angular-pusher/g) || []).length > 0) { frameworks.push(' angular-pusher'); }
	if ((lowerString.match(/\/angular-qrcode/g) || []).length > 0) { frameworks.push(' angular-qrcode'); }
	if ((lowerString.match(/\/angular-recaptcha/g) || []).length > 0) { frameworks.push(' angular-recaptcha'); }
	if ((lowerString.match(/\/angular-relative-date/g) || []).length > 0) { frameworks.push(' angular-relative-date'); }
	if ((lowerString.match(/\/angular-resizable/g) || []).length > 0) { frameworks.push(' angular-resizable'); }
	if ((lowerString.match(/\/angular-resource/g) || []).length > 0) { frameworks.push(' angular-resource'); }
	if ((lowerString.match(/\/angular-restmod/g) || []).length > 0) { frameworks.push(' angular-restmod'); }
	if ((lowerString.match(/\/angular-retina/g) || []).length > 0) { frameworks.push(' angular-retina'); }
	if ((lowerString.match(/\/angular-route-segment/g) || []).length > 0) { frameworks.push(' angular-route-segment'); }
	if ((lowerString.match(/\/angular-sanitize/g) || []).length > 0) { frameworks.push(' angular-sanitize'); }
	if ((lowerString.match(/\/angular-schema-form/g) || []).length > 0) { frameworks.push(' angular-schema-form'); }
	if ((lowerString.match(/\/angular-scroll/g) || []).length > 0) { frameworks.push(' angular-scroll'); }
	if ((lowerString.match(/\/angular-slick-carousel/g) || []).length > 0) { frameworks.push(' angular-slick-carousel'); }
	if ((lowerString.match(/\/angular-smart-table/g) || []).length > 0) { frameworks.push(' angular-smart-table'); }
	if ((lowerString.match(/\/angular-smooth-scrollbar/g) || []).length > 0) { frameworks.push(' angular-smooth-scrollbar'); }
	if ((lowerString.match(/\/angular-socialshare/g) || []).length > 0) { frameworks.push(' angular-socialshare'); }
	if ((lowerString.match(/\/angular-socket-io/g) || []).length > 0) { frameworks.push(' angular-socket-io'); }
	if ((lowerString.match(/\/angular-sortable-view/g) || []).length > 0) { frameworks.push(' angular-sortable-view'); }
	if ((lowerString.match(/\/angular-soundmanager2/g) || []).length > 0) { frameworks.push(' angular-soundmanager2'); }
	if ((lowerString.match(/\/angular-spinner/g) || []).length > 0) { frameworks.push(' angular-spinner'); }
	if ((lowerString.match(/\/angular-strap/g) || []).length > 0) { frameworks.push(' angular-strap'); }
	if ((lowerString.match(/\/angular-stripe/g) || []).length > 0) { frameworks.push(' angular-stripe'); }
	if ((lowerString.match(/\/angular-summernote/g) || []).length > 0) { frameworks.push(' angular-summernote'); }
	if ((lowerString.match(/\/angular-svg-round-progressbar/g) || []).length > 0) { frameworks.push(' angular-svg-round-progressbar'); }
	if ((lowerString.match(/\/angular-sweetalert/g) || []).length > 0) { frameworks.push(' angular-sweetalert'); }
	if ((lowerString.match(/\/angular-timer/g) || []).length > 0) { frameworks.push(' angular-timer'); }
	if ((lowerString.match(/\/angular-toarrayfilter/g) || []).length > 0) { frameworks.push(' angular-toarrayfilter'); }
	if ((lowerString.match(/\/angular-toastr/g) || []).length > 0) { frameworks.push(' angular-toastr'); }
	if ((lowerString.match(/\/angular-touch/g) || []).length > 0) { frameworks.push(' angular-touch'); }
	if ((lowerString.match(/\/angular-translate-handler-log/g) || []).length > 0) { frameworks.push(' angular-translate-handler-log'); }
	if ((lowerString.match(/\/angular-translate-interpolation-messageformat/g) || []).length > 0) { frameworks.push(' angular-translate-interpolation-messageformat'); }
	if ((lowerString.match(/\/angular-translate-loader-partial/g) || []).length > 0) { frameworks.push(' angular-translate-loader-partial'); }
	if ((lowerString.match(/\/angular-translate-loader-static-files/g) || []).length > 0) { frameworks.push(' angular-translate-loader-static-files'); }
	if ((lowerString.match(/\/angular-translate-loader-url/g) || []).length > 0) { frameworks.push(' angular-translate-loader-url'); }
	if ((lowerString.match(/\/angular-translate-storage-cookie/g) || []).length > 0) { frameworks.push(' angular-translate-storage-cookie'); }
	if ((lowerString.match(/\/angular-translate-storage-local/g) || []).length > 0) { frameworks.push(' angular-translate-storage-local'); }
	if ((lowerString.match(/\/angular-translate/g) || []).length > 0) { frameworks.push(' angular-translate'); }
	if ((lowerString.match(/\/angular-tree-control/g) || []).length > 0) { frameworks.push(' angular-tree-control'); }
	if ((lowerString.match(/\/angular-truncate/g) || []).length > 0) { frameworks.push(' angular-truncate'); }
	if ((lowerString.match(/\/angular-ui-bootstrap/g) || []).length > 0) { frameworks.push(' angular-ui-bootstrap'); }
	if ((lowerString.match(/\/angular-ui-calendar/g) || []).length > 0) { frameworks.push(' angular-ui-calendar'); }
	if ((lowerString.match(/\/angular-ui-date/g) || []).length > 0) { frameworks.push(' angular-ui-date'); }
	if ((lowerString.match(/\/angular-ui-grid/g) || []).length > 0) { frameworks.push(' angular-ui-grid'); }
	if ((lowerString.match(/\/angular-ui-mask/g) || []).length > 0) { frameworks.push(' angular-ui-mask'); }
	if ((lowerString.match(/\/angular-ui-notification/g) || []).length > 0) { frameworks.push(' angular-ui-notification'); }
	if ((lowerString.match(/\/angular-ui-router.statehelper/g) || []).length > 0) { frameworks.push(' angular-ui-router.statehelper'); }
	if ((lowerString.match(/\/angular-ui-router/g) || []).length > 0) { frameworks.push(' angular-ui-router'); }
	if ((lowerString.match(/\/angular-ui-select/g) || []).length > 0) { frameworks.push(' angular-ui-select'); }
	if ((lowerString.match(/\/angular-ui-slider/g) || []).length > 0) { frameworks.push(' angular-ui-slider'); }
	if ((lowerString.match(/\/angular-ui-sortable/g) || []).length > 0) { frameworks.push(' angular-ui-sortable'); }
	if ((lowerString.match(/\/angular-ui-tree/g) || []).length > 0) { frameworks.push(' angular-ui-tree'); }
	if ((lowerString.match(/\/angular-ui-utils/g) || []).length > 0) { frameworks.push(' angular-ui-utils'); }
	if ((lowerString.match(/\/angular-ui-validate/g) || []).length > 0) { frameworks.push(' angular-ui-validate'); }
	if ((lowerString.match(/\/angular-ui/g) || []).length > 0) { frameworks.push(' angular-ui'); }
	if ((lowerString.match(/\/angular-utf8-base64/g) || []).length > 0) { frameworks.push(' angular-utf8-base64'); }
	if ((lowerString.match(/\/angular-validation/g) || []).length > 0) { frameworks.push(' angular-validation'); }
	if ((lowerString.match(/\/angular-validator/g) || []).length > 0) { frameworks.push(' angular-validator'); }
	if ((lowerString.match(/\/angular-vertxbus/g) || []).length > 0) { frameworks.push(' angular-vertxbus'); }
	if ((lowerString.match(/\/angular-video-bg/g) || []).length > 0) { frameworks.push(' angular-video-bg'); }
	if ((lowerString.match(/\/angular-websocket/g) || []).length > 0) { frameworks.push(' angular-websocket'); }
	if ((lowerString.match(/\/angular-wizard/g) || []).length > 0) { frameworks.push(' angular-wizard'); }
	if ((lowerString.match(/\/angular-wysiwyg/g) || []).length > 0) { frameworks.push(' angular-wysiwyg'); }
	if ((lowerString.match(/\/angular-xeditable/g) || []).length > 0) { frameworks.push(' angular-xeditable'); }
	if ((lowerString.match(/\/angular.js/g) || []).length > 0) { frameworks.push(' angular.js'); }
	if ((lowerString.match(/\/angularfire/g) || []).length > 0) { frameworks.push(' angularfire'); }
	if ((lowerString.match(/\/angularlocalstorage/g) || []).length > 0) { frameworks.push(' angularlocalstorage'); }
	if ((lowerString.match(/\/angularsubkit/g) || []).length > 0) { frameworks.push(' angularsubkit'); }
	if ((lowerString.match(/\/angularjs-color-picker/g) || []).length > 0) { frameworks.push(' angularjs-color-picker'); }
	if ((lowerString.match(/\/angularjs-datepicker/g) || []).length > 0) { frameworks.push(' angularjs-datepicker'); }
	if ((lowerString.match(/\/angularjs-dropdown-multiselect/g) || []).length > 0) { frameworks.push(' angularjs-dropdown-multiselect'); }
	if ((lowerString.match(/\/angularjs-ie8-build/g) || []).length > 0) { frameworks.push(' angularjs-ie8-build'); }
	if ((lowerString.match(/\/angularjs-nvd3-directives/g) || []).length > 0) { frameworks.push(' angularjs-nvd3-directives'); }
	if ((lowerString.match(/\/angularjs-pdf/g) || []).length > 0) { frameworks.push(' angularjs-pdf'); }
	if ((lowerString.match(/\/angularjs-scroll-glue/g) || []).length > 0) { frameworks.push(' angularjs-scroll-glue'); }
	if ((lowerString.match(/\/angularjs-slider/g) || []).length > 0) { frameworks.push(' angularjs-slider'); }
	if ((lowerString.match(/\/angularjs-toaster/g) || []).length > 0) { frameworks.push(' angularjs-toaster'); }
	if ((lowerString.match(/\/angulartics-google-analytics/g) || []).length > 0) { frameworks.push(' angulartics-google-analytics'); }
	if ((lowerString.match(/\/angulartics/g) || []).length > 0) { frameworks.push(' angulartics'); }
	if ((lowerString.match(/\/anima/g) || []).length > 0) { frameworks.push(' anima'); }
	if ((lowerString.match(/\/animate.css/g) || []).length > 0) { frameworks.push(' animate.css'); }
	if ((lowerString.match(/\/animatecss/g) || []).length > 0) { frameworks.push(' animatecss'); }
	if ((lowerString.match(/\/animated-header/g) || []).length > 0) { frameworks.push(' animated-header'); }
	if ((lowerString.match(/\/animateplus/g) || []).length > 0) { frameworks.push(' animateplus'); }
	if ((lowerString.match(/\/animations/g) || []).length > 0) { frameworks.push(' animations'); }
	if ((lowerString.match(/\/animejs/g) || []).length > 0) { frameworks.push(' animejs'); }
	if ((lowerString.match(/\/animo.js/g) || []).length > 0) { frameworks.push(' animo.js'); }
	if ((lowerString.match(/\/animsition/g) || []).length > 0) { frameworks.push(' animsition'); }
	if ((lowerString.match(/\/annyang/g) || []).length > 0) { frameworks.push(' annyang'); }
	if ((lowerString.match(/\/antd/g) || []).length > 0) { frameworks.push(' antd'); }
	if ((lowerString.match(/\/antimoderate/g) || []).length > 0) { frameworks.push(' antimoderate'); }
	if ((lowerString.match(/\/anyjs/g) || []).length > 0) { frameworks.push(' anyjs'); }
	if ((lowerString.match(/\/anythingslider/g) || []).length > 0) { frameworks.push(' anythingslider'); }
	if ((lowerString.match(/\/aos/g) || []).length > 0) { frameworks.push(' aos'); }
	if ((lowerString.match(/\/aphrodite/g) || []).length > 0) { frameworks.push(' aphrodite'); }
	if ((lowerString.match(/\/api-check/g) || []).length > 0) { frameworks.push(' api-check'); }
	if ((lowerString.match(/\/aping/g) || []).length > 0) { frameworks.push(' aping'); }
	if ((lowerString.match(/\/aplayer/g) || []).length > 0) { frameworks.push(' aplayer'); }
	if ((lowerString.match(/\/apng-canvas/g) || []).length > 0) { frameworks.push(' apng-canvas'); }
	if ((lowerString.match(/\/app-loading/g) || []).length > 0) { frameworks.push(' app-loading'); }
	if ((lowerString.match(/\/appbase-js/g) || []).length > 0) { frameworks.push(' appbase-js'); }
	if ((lowerString.match(/\/aragonite-form-validator/g) || []).length > 0) { frameworks.push(' aragonite-form-validator'); }
	if ((lowerString.match(/\/arbor/g) || []).length > 0) { frameworks.push(' arbor'); }
	if ((lowerString.match(/\/architect/g) || []).length > 0) { frameworks.push(' architect'); }
	if ((lowerString.match(/\/async/g) || []).length > 0) { frameworks.push(' async'); }
	if ((lowerString.match(/\/asynquence/g) || []).length > 0) { frameworks.push(' asynquence'); }
	if ((lowerString.match(/\/at.js/g) || []).length > 0) { frameworks.push(' at.js'); }
	if ((lowerString.match(/\/atmosphere/g) || []).length > 0) { frameworks.push(' atmosphere'); }
	if ((lowerString.match(/\/atrament.js/g) || []).length > 0) { frameworks.push(' atrament.js'); }
	if ((lowerString.match(/\/attrchange/g) || []).length > 0) { frameworks.push(' attrchange'); }
	if ((lowerString.match(/\/audio5js/g) || []).length > 0) { frameworks.push(' audio5js'); }
	if ((lowerString.match(/\/audiojs/g) || []).length > 0) { frameworks.push(' audiojs'); }
	if ((lowerString.match(/\/audiosynth/g) || []).length > 0) { frameworks.push(' audiosynth'); }
	if ((lowerString.match(/\/augment.js/g) || []).length > 0) { frameworks.push(' augment.js'); }
	if ((lowerString.match(/\/augment/g) || []).length > 0) { frameworks.push(' augment'); }
	if ((lowerString.match(/\/aui/g) || []).length > 0) { frameworks.push(' aui'); }
	if ((lowerString.match(/\/aurora-grid/g) || []).length > 0) { frameworks.push(' aurora-grid'); }
	if ((lowerString.match(/\/aurora.js-aac/g) || []).length > 0) { frameworks.push(' aurora.js-aac'); }
	if ((lowerString.match(/\/aurora.js-alac/g) || []).length > 0) { frameworks.push(' aurora.js-alac'); }
	if ((lowerString.match(/\/aurora.js-flac/g) || []).length > 0) { frameworks.push(' aurora.js-flac'); }
	if ((lowerString.match(/\/aurora.js-mp3/g) || []).length > 0) { frameworks.push(' aurora.js-mp3'); }
	if ((lowerString.match(/\/aurora.js/g) || []).length > 0) { frameworks.push(' aurora.js'); }
	if ((lowerString.match(/\/authy-form-helpers/g) || []).length > 0) { frameworks.push(' authy-form-helpers'); }
	if ((lowerString.match(/\/authy-forms.css/g) || []).length > 0) { frameworks.push(' authy-forms.css'); }
	if ((lowerString.match(/\/authy-forms.js/g) || []).length > 0) { frameworks.push(' authy-forms.js'); }
	if ((lowerString.match(/\/autocomplete.js/g) || []).length > 0) { frameworks.push(' autocomplete.js'); }
	if ((lowerString.match(/\/autolinker/g) || []).length > 0) { frameworks.push(' autolinker'); }
	if ((lowerString.match(/\/autonumeric/g) || []).length > 0) { frameworks.push(' autonumeric'); }
	if ((lowerString.match(/\/autosize.js/g) || []).length > 0) { frameworks.push(' autosize.js'); }
	if ((lowerString.match(/\/autotrack/g) || []).length > 0) { frameworks.push(' autotrack'); }
	if ((lowerString.match(/\/avalanche-css/g) || []).length > 0) { frameworks.push(' avalanche-css'); }
	if ((lowerString.match(/\/avalon.js/g) || []).length > 0) { frameworks.push(' avalon.js'); }
	if ((lowerString.match(/\/avgrund/g) || []).length > 0) { frameworks.push(' avgrund'); }
	if ((lowerString.match(/\/awesome-bootstrap-checkbox/g) || []).length > 0) { frameworks.push(' awesome-bootstrap-checkbox'); }
	if ((lowerString.match(/\/awesomplete/g) || []).length > 0) { frameworks.push(' awesomplete'); }
	if ((lowerString.match(/\/aws-sdk/g) || []).length > 0) { frameworks.push(' aws-sdk'); }
	if ((lowerString.match(/\/axe-core/g) || []).length > 0) { frameworks.push(' axe-core'); }
	if ((lowerString.match(/\/axios/g) || []).length > 0) { frameworks.push(' axios'); }
	if ((lowerString.match(/\/bpopup/g) || []).length > 0) { frameworks.push(' bpopup'); }
	if ((lowerString.match(/\/babel-core/g) || []).length > 0) { frameworks.push(' babel-core'); }
	if ((lowerString.match(/\/babel-polyfill/g) || []).length > 0) { frameworks.push(' babel-polyfill'); }
	if ((lowerString.match(/\/babel-standalone/g) || []).length > 0) { frameworks.push(' babel-standalone'); }
	if ((lowerString.match(/\/babelfish/g) || []).length > 0) { frameworks.push(' babelfish'); }
	if ((lowerString.match(/\/babylonjs/g) || []).length > 0) { frameworks.push(' babylonjs'); }
	if ((lowerString.match(/\/backbone-associations/g) || []).length > 0) { frameworks.push(' backbone-associations'); }
	if ((lowerString.match(/\/backbone-forms/g) || []).length > 0) { frameworks.push(' backbone-forms'); }
	if ((lowerString.match(/\/backbone-localstorage.js/g) || []).length > 0) { frameworks.push(' backbone-localstorage.js'); }
	if ((lowerString.match(/\/backbone-pageable/g) || []).length > 0) { frameworks.push(' backbone-pageable'); }
	if ((lowerString.match(/\/backbone-react-component/g) || []).length > 0) { frameworks.push(' backbone-react-component'); }
	if ((lowerString.match(/\/backbone-relational/g) || []).length > 0) { frameworks.push(' backbone-relational'); }
	if ((lowerString.match(/\/backbone-super/g) || []).length > 0) { frameworks.push(' backbone-super'); }
	if ((lowerString.match(/\/backbone-tastypie/g) || []).length > 0) { frameworks.push(' backbone-tastypie'); }
	if ((lowerString.match(/\/backbone.babysitter/g) || []).length > 0) { frameworks.push(' backbone.babysitter'); }
	if ((lowerString.match(/\/backbone.collectionview/g) || []).length > 0) { frameworks.push(' backbone.collectionview'); }
	if ((lowerString.match(/\/backbone.epoxy/g) || []).length > 0) { frameworks.push(' backbone.epoxy'); }
	if ((lowerString.match(/\/backbone.eventbinder/g) || []).length > 0) { frameworks.push(' backbone.eventbinder'); }
	if ((lowerString.match(/\/backbone.fetch-cache/g) || []).length > 0) { frameworks.push(' backbone.fetch-cache'); }
	if ((lowerString.match(/\/backbone.js/g) || []).length > 0) { frameworks.push(' backbone.js'); }
	if ((lowerString.match(/\/backbone.layoutmanager/g) || []).length > 0) { frameworks.push(' backbone.layoutmanager'); }
	if ((lowerString.match(/\/backbone.marionette/g) || []).length > 0) { frameworks.push(' backbone.marionette'); }
	if ((lowerString.match(/\/backbone.modal/g) || []).length > 0) { frameworks.push(' backbone.modal'); }
	if ((lowerString.match(/\/backbone.modelbinder/g) || []).length > 0) { frameworks.push(' backbone.modelbinder'); }
	if ((lowerString.match(/\/backbone.obscura/g) || []).length > 0) { frameworks.push(' backbone.obscura'); }
	if ((lowerString.match(/\/backbone.paginator/g) || []).length > 0) { frameworks.push(' backbone.paginator'); }
	if ((lowerString.match(/\/backbone.projections/g) || []).length > 0) { frameworks.push(' backbone.projections'); }
	if ((lowerString.match(/\/backbone.radio/g) || []).length > 0) { frameworks.push(' backbone.radio'); }
	if ((lowerString.match(/\/backbone.ribs/g) || []).length > 0) { frameworks.push(' backbone.ribs'); }
	if ((lowerString.match(/\/backbone.routefilter/g) || []).length > 0) { frameworks.push(' backbone.routefilter'); }
	if ((lowerString.match(/\/backbone.stickit/g) || []).length > 0) { frameworks.push(' backbone.stickit'); }
	if ((lowerString.match(/\/backbone.syphon/g) || []).length > 0) { frameworks.push(' backbone.syphon'); }
	if ((lowerString.match(/\/backbone.validation/g) || []).length > 0) { frameworks.push(' backbone.validation'); }
	if ((lowerString.match(/\/backbone.wreqr/g) || []).length > 0) { frameworks.push(' backbone.wreqr'); }
	if ((lowerString.match(/\/backgrid.js/g) || []).length > 0) { frameworks.push(' backgrid.js'); }
	if ((lowerString.match(/\/background-blur/g) || []).length > 0) { frameworks.push(' background-blur'); }
	if ((lowerString.match(/\/bacon.js/g) || []).length > 0) { frameworks.push(' bacon.js'); }
	if ((lowerString.match(/\/bagjs/g) || []).length > 0) { frameworks.push(' bagjs'); }
	if ((lowerString.match(/\/baguettebox.js/g) || []).length > 0) { frameworks.push(' baguettebox.js'); }
	if ((lowerString.match(/\/balance-text/g) || []).length > 0) { frameworks.push(' balance-text'); }
	if ((lowerString.match(/\/balloon-css/g) || []).length > 0) { frameworks.push(' balloon-css'); }
	if ((lowerString.match(/\/balupton-jquery-history/g) || []).length > 0) { frameworks.push(' balupton-jquery-history'); }
	if ((lowerString.match(/\/baobab/g) || []).length > 0) { frameworks.push(' baobab'); }
	if ((lowerString.match(/\/barba.js/g) || []).length > 0) { frameworks.push(' barba.js'); }
	if ((lowerString.match(/\/barman/g) || []).length > 0) { frameworks.push(' barman'); }
	if ((lowerString.match(/\/barn/g) || []).length > 0) { frameworks.push(' barn'); }
	if ((lowerString.match(/\/basicmodal/g) || []).length > 0) { frameworks.push(' basicmodal'); }
	if ((lowerString.match(/\/basics/g) || []).length > 0) { frameworks.push(' basics'); }
	if ((lowerString.match(/\/basil.js/g) || []).length > 0) { frameworks.push(' basil.js'); }
	if ((lowerString.match(/\/basis.js/g) || []).length > 0) { frameworks.push(' basis.js'); }
	if ((lowerString.match(/\/basket.js/g) || []).length > 0) { frameworks.push(' basket.js'); }
	if ((lowerString.match(/\/basscss/g) || []).length > 0) { frameworks.push(' basscss'); }
	if ((lowerString.match(/\/batman.js/g) || []).length > 0) { frameworks.push(' batman.js'); }
	if ((lowerString.match(/\/bean/g) || []).length > 0) { frameworks.push(' bean'); }
	if ((lowerString.match(/\/beepjs/g) || []).length > 0) { frameworks.push(' beepjs'); }
	if ((lowerString.match(/\/beeplay/g) || []).length > 0) { frameworks.push(' beeplay'); }
	if ((lowerString.match(/\/benchmark/g) || []).length > 0) { frameworks.push(' benchmark'); }
	if ((lowerString.match(/\/bespoke.js/g) || []).length > 0) { frameworks.push(' bespoke.js'); }
	if ((lowerString.match(/\/big.js/g) || []).length > 0) { frameworks.push(' big.js'); }
	if ((lowerString.match(/\/bigfishtv-turret/g) || []).length > 0) { frameworks.push(' bigfishtv-turret'); }
	if ((lowerString.match(/\/bigfoot/g) || []).length > 0) { frameworks.push(' bigfoot'); }
	if ((lowerString.match(/\/bignumber.js/g) || []).length > 0) { frameworks.push(' bignumber.js'); }
	if ((lowerString.match(/\/bigslide.js/g) || []).length > 0) { frameworks.push(' bigslide.js'); }
	if ((lowerString.match(/\/bitcoinjs-lib/g) || []).length > 0) { frameworks.push(' bitcoinjs-lib'); }
	if ((lowerString.match(/\/bla/g) || []).length > 0) { frameworks.push(' bla'); }
	if ((lowerString.match(/\/blackbaud-skyux/g) || []).length > 0) { frameworks.push(' blackbaud-skyux'); }
	if ((lowerString.match(/\/blanket.js/g) || []).length > 0) { frameworks.push(' blanket.js'); }
	if ((lowerString.match(/\/blaze/g) || []).length > 0) { frameworks.push(' blaze'); }
	if ((lowerString.match(/\/blazy/g) || []).length > 0) { frameworks.push(' blazy'); }
	if ((lowerString.match(/\/blendui/g) || []).length > 0) { frameworks.push(' blendui'); }
	if ((lowerString.match(/\/blissfuljs/g) || []).length > 0) { frameworks.push(' blissfuljs'); }
	if ((lowerString.match(/\/blob-polyfill/g) || []).length > 0) { frameworks.push(' blob-polyfill'); }
	if ((lowerString.match(/\/blob-util/g) || []).length > 0) { frameworks.push(' blob-util'); }
	if ((lowerString.match(/\/blockadblock/g) || []).length > 0) { frameworks.push(' blockadblock'); }
	if ((lowerString.match(/\/bluebird/g) || []).length > 0) { frameworks.push(' bluebird'); }
	if ((lowerString.match(/\/blueimp-javascript-templates/g) || []).length > 0) { frameworks.push(' blueimp-javascript-templates'); }
	if ((lowerString.match(/\/blueimp-file-upload/g) || []).length > 0) { frameworks.push(' blueimp-file-upload'); }
	if ((lowerString.match(/\/blueimp-gallery/g) || []).length > 0) { frameworks.push(' blueimp-gallery'); }
	if ((lowerString.match(/\/blueimp-load-image/g) || []).length > 0) { frameworks.push(' blueimp-load-image'); }
	if ((lowerString.match(/\/blueimp-md5/g) || []).length > 0) { frameworks.push(' blueimp-md5'); }
	if ((lowerString.match(/\/boexfi/g) || []).length > 0) { frameworks.push(' boexfi'); }
	if ((lowerString.match(/\/bokeh/g) || []).length > 0) { frameworks.push(' bokeh'); }
	if ((lowerString.match(/\/bonsai/g) || []).length > 0) { frameworks.push(' bonsai'); }
	if ((lowerString.match(/\/bonzo/g) || []).length > 0) { frameworks.push(' bonzo'); }
	if ((lowerString.match(/\/booking-js/g) || []).length > 0) { frameworks.push(' booking-js'); }
	if ((lowerString.match(/\/bootbox.js/g) || []).length > 0) { frameworks.push(' bootbox.js'); }
	if ((lowerString.match(/\/bootcards/g) || []).length > 0) { frameworks.push(' bootcards'); }
	if ((lowerString.match(/\/bootflat/g) || []).length > 0) { frameworks.push(' bootflat'); }
	if ((lowerString.match(/\/bootpag/g) || []).length > 0) { frameworks.push(' bootpag'); }
	if ((lowerString.match(/\/bootstrap-3-typeahead/g) || []).length > 0) { frameworks.push(' bootstrap-3-typeahead'); }
	if ((lowerString.match(/\/bootstrap-checkbox/g) || []).length > 0) { frameworks.push(' bootstrap-checkbox'); }
	if ((lowerString.match(/\/bootstrap-colorpicker/g) || []).length > 0) { frameworks.push(' bootstrap-colorpicker'); }
	if ((lowerString.match(/\/bootstrap-combobox/g) || []).length > 0) { frameworks.push(' bootstrap-combobox'); }
	if ((lowerString.match(/\/bootstrap-confirmation/g) || []).length > 0) { frameworks.push(' bootstrap-confirmation'); }
	if ((lowerString.match(/\/bootstrap-contextmenu/g) || []).length > 0) { frameworks.push(' bootstrap-contextmenu'); }
	if ((lowerString.match(/\/bootstrap-datepicker/g) || []).length > 0) { frameworks.push(' bootstrap-datepicker'); }
	if ((lowerString.match(/\/bootstrap-daterangepicker/g) || []).length > 0) { frameworks.push(' bootstrap-daterangepicker'); }
	if ((lowerString.match(/\/bootstrap-datetimepicker/g) || []).length > 0) { frameworks.push(' bootstrap-datetimepicker'); }
	if ((lowerString.match(/\/bootstrap-drawer/g) || []).length > 0) { frameworks.push(' bootstrap-drawer'); }
	if ((lowerString.match(/\/bootstrap-fileinput/g) || []).length > 0) { frameworks.push(' bootstrap-fileinput'); }
	if ((lowerString.match(/\/bootstrap-filestyle/g) || []).length > 0) { frameworks.push(' bootstrap-filestyle'); }
	if ((lowerString.match(/\/bootstrap-formhelpers/g) || []).length > 0) { frameworks.push(' bootstrap-formhelpers'); }
	if ((lowerString.match(/\/bootstrap-growl/g) || []).length > 0) { frameworks.push(' bootstrap-growl'); }
	if ((lowerString.match(/\/bootstrap-horizon/g) || []).length > 0) { frameworks.push(' bootstrap-horizon'); }
	if ((lowerString.match(/\/bootstrap-hover-dropdown/g) || []).length > 0) { frameworks.push(' bootstrap-hover-dropdown'); }
	if ((lowerString.match(/\/bootstrap-lightbox/g) || []).length > 0) { frameworks.push(' bootstrap-lightbox'); }
	if ((lowerString.match(/\/bootstrap-magnify/g) || []).length > 0) { frameworks.push(' bootstrap-magnify'); }
	if ((lowerString.match(/\/bootstrap-markdown/g) || []).length > 0) { frameworks.push(' bootstrap-markdown'); }
	if ((lowerString.match(/\/bootstrap-material-datetimepicker/g) || []).length > 0) { frameworks.push(' bootstrap-material-datetimepicker'); }
	if ((lowerString.match(/\/bootstrap-material-design/g) || []).length > 0) { frameworks.push(' bootstrap-material-design'); }
	if ((lowerString.match(/\/bootstrap-maxlength/g) || []).length > 0) { frameworks.push(' bootstrap-maxlength'); }
	if ((lowerString.match(/\/bootstrap-modal/g) || []).length > 0) { frameworks.push(' bootstrap-modal'); }
	if ((lowerString.match(/\/bootstrap-multiselect/g) || []).length > 0) { frameworks.push(' bootstrap-multiselect'); }
	if ((lowerString.match(/\/bootstrap-notify/g) || []).length > 0) { frameworks.push(' bootstrap-notify'); }
	if ((lowerString.match(/\/bootstrap-progressbar/g) || []).length > 0) { frameworks.push(' bootstrap-progressbar'); }
	if ((lowerString.match(/\/bootstrap-rating/g) || []).length > 0) { frameworks.push(' bootstrap-rating'); }
	if ((lowerString.match(/\/bootstrap-rtl/g) || []).length > 0) { frameworks.push(' bootstrap-rtl'); }
	if ((lowerString.match(/\/bootstrap-select/g) || []).length > 0) { frameworks.push(' bootstrap-select'); }
	if ((lowerString.match(/\/bootstrap-show-password/g) || []).length > 0) { frameworks.push(' bootstrap-show-password'); }
	if ((lowerString.match(/\/bootstrap-slider/g) || []).length > 0) { frameworks.push(' bootstrap-slider'); }
	if ((lowerString.match(/\/bootstrap-social/g) || []).length > 0) { frameworks.push(' bootstrap-social'); }
	if ((lowerString.match(/\/bootstrap-star-rating/g) || []).length > 0) { frameworks.push(' bootstrap-star-rating'); }
	if ((lowerString.match(/\/bootstrap-submenu/g) || []).length > 0) { frameworks.push(' bootstrap-submenu'); }
	if ((lowerString.match(/\/bootstrap-sweetalert/g) || []).length > 0) { frameworks.push(' bootstrap-sweetalert'); }
	if ((lowerString.match(/\/bootstrap-switch/g) || []).length > 0) { frameworks.push(' bootstrap-switch'); }
	if ((lowerString.match(/\/bootstrap-table/g) || []).length > 0) { frameworks.push(' bootstrap-table'); }
	if ((lowerString.match(/\/bootstrap-tagsinput/g) || []).length > 0) { frameworks.push(' bootstrap-tagsinput'); }
	if ((lowerString.match(/\/bootstrap-timepicker/g) || []).length > 0) { frameworks.push(' bootstrap-timepicker'); }
	if ((lowerString.match(/\/bootstrap-toggle/g) || []).length > 0) { frameworks.push(' bootstrap-toggle'); }
	if ((lowerString.match(/\/bootstrap-tokenfield/g) || []).length > 0) { frameworks.push(' bootstrap-tokenfield'); }
	if ((lowerString.match(/\/bootstrap-touchspin/g) || []).length > 0) { frameworks.push(' bootstrap-touchspin'); }
	if ((lowerString.match(/\/bootstrap-tour/g) || []).length > 0) { frameworks.push(' bootstrap-tour'); }
	if ((lowerString.match(/\/bootstrap-treeview/g) || []).length > 0) { frameworks.push(' bootstrap-treeview'); }
	if ((lowerString.match(/\/bootstrap-validator/g) || []).length > 0) { frameworks.push(' bootstrap-validator'); }
	if ((lowerString.match(/\/bootstrap-without-jquery/g) || []).length > 0) { frameworks.push(' bootstrap-without-jquery'); }
	if ((lowerString.match(/\/bootstrap.native/g) || []).length > 0) { frameworks.push(' bootstrap.native'); }
	if ((lowerString.match(/\/bootstrap3-contact-form/g) || []).length > 0) { frameworks.push(' bootstrap3-contact-form'); }
	if ((lowerString.match(/\/bootstrap3-dialog/g) || []).length > 0) { frameworks.push(' bootstrap3-dialog'); }
	if ((lowerString.match(/\/bootstrap3-wysiwyg/g) || []).length > 0) { frameworks.push(' bootstrap3-wysiwyg'); }
	if ((lowerString.match(/\/bootswatch/g) || []).length > 0) { frameworks.push(' bootswatch'); }
	if ((lowerString.match(/\/bottleneck/g) || []).length > 0) { frameworks.push(' bottleneck'); }
	if ((lowerString.match(/\/bowser/g) || []).length > 0) { frameworks.push(' bowser'); }
	if ((lowerString.match(/\/brain/g) || []).length > 0) { frameworks.push(' brain'); }
	if ((lowerString.match(/\/brand-colors/g) || []).length > 0) { frameworks.push(' brand-colors'); }
	if ((lowerString.match(/\/breezejs/g) || []).length > 0) { frameworks.push(' breezejs'); }
	if ((lowerString.match(/\/bricklayer/g) || []).length > 0) { frameworks.push(' bricklayer'); }
	if ((lowerString.match(/\/bricks.js/g) || []).length > 0) { frameworks.push(' bricks.js'); }
	if ((lowerString.match(/\/browser-deeplink/g) || []).length > 0) { frameworks.push(' browser-deeplink'); }
	if ((lowerString.match(/\/browser-logos/g) || []).length > 0) { frameworks.push(' browser-logos'); }
	if ((lowerString.match(/\/bsjs/g) || []).length > 0) { frameworks.push(' bsjs'); }
	if ((lowerString.match(/\/bttrlazyloading/g) || []).length > 0) { frameworks.push(' bttrlazyloading'); }
	if ((lowerString.match(/\/buckets/g) || []).length > 0) { frameworks.push(' buckets'); }
	if ((lowerString.match(/\/bucky/g) || []).length > 0) { frameworks.push(' bucky'); }
	if ((lowerString.match(/\/bulma/g) || []).length > 0) { frameworks.push(' bulma'); }
	if ((lowerString.match(/\/burger/g) || []).length > 0) { frameworks.push(' burger'); }
	if ((lowerString.match(/\/buzz/g) || []).length > 0) { frameworks.push(' buzz'); }
	if ((lowerString.match(/\/bxslider/g) || []).length > 0) { frameworks.push(' bxslider'); }
	if ((lowerString.match(/\/c3-angular/g) || []).length > 0) { frameworks.push(' c3-angular'); }
	if ((lowerString.match(/\/c3\//g) || []).length > 0) { frameworks.push(' c3'); }
	if ((lowerString.match(/\/caiuss/g) || []).length > 0) { frameworks.push(' caiuss'); }
	if ((lowerString.match(/\/cal-heatmap/g) || []).length > 0) { frameworks.push(' cal-heatmap'); }
	if ((lowerString.match(/\/calendar-heatmap/g) || []).length > 0) { frameworks.push(' calendar-heatmap'); }
	if ((lowerString.match(/\/camanjs/g) || []).length > 0) { frameworks.push(' camanjs'); }
	if ((lowerString.match(/\/can.js/g) || []).length > 0) { frameworks.push(' can.js'); }
	if ((lowerString.match(/\/cannon.js/g) || []).length > 0) { frameworks.push(' cannon.js'); }
	if ((lowerString.match(/\/canvas-nest.js/g) || []).length > 0) { frameworks.push(' canvas-nest.js'); }
	if ((lowerString.match(/\/canvasjs/g) || []).length > 0) { frameworks.push(' canvasjs'); }
	if ((lowerString.match(/\/card/g) || []).length > 0) { frameworks.push(' card'); }
	if ((lowerString.match(/\/caret/g) || []).length > 0) { frameworks.push(' caret'); }
	if ((lowerString.match(/\/cascade-framework/g) || []).length > 0) { frameworks.push(' cascade-framework'); }
	if ((lowerString.match(/\/cash/g) || []).length > 0) { frameworks.push(' cash'); }
	if ((lowerString.match(/\/casualjs/g) || []).length > 0) { frameworks.push(' casualjs'); }
	if ((lowerString.match(/\/catiline/g) || []).length > 0) { frameworks.push(' catiline'); }
	if ((lowerString.match(/\/cc-icons/g) || []).length > 0) { frameworks.push(' cc-icons'); }
	if ((lowerString.match(/\/cellx/g) || []).length > 0) { frameworks.push(' cellx'); }
	if ((lowerString.match(/\/chai/g) || []).length > 0) { frameworks.push(' chai'); }
	if ((lowerString.match(/\/chainloading/g) || []).length > 0) { frameworks.push(' chainloading'); }
	if ((lowerString.match(/\/chainvas/g) || []).length > 0) { frameworks.push(' chainvas'); }
	if ((lowerString.match(/\/chance/g) || []).length > 0) { frameworks.push(' chance'); }
	if ((lowerString.match(/\/chaplin/g) || []).length > 0) { frameworks.push(' chaplin'); }
	if ((lowerString.match(/\/chardin.js/g) || []).length > 0) { frameworks.push(' chardin.js'); }
	if ((lowerString.match(/\/chartist/g) || []).length > 0) { frameworks.push(' chartist'); }
	if ((lowerString.match(/\/chartkick/g) || []).length > 0) { frameworks.push(' chartkick'); }
	if ((lowerString.match(/\/checkbox.css/g) || []).length > 0) { frameworks.push(' checkbox.css'); }
	if ((lowerString.match(/\/checklist-model/g) || []).length > 0) { frameworks.push(' checklist-model'); }
	if ((lowerString.match(/\/cheet.js/g) || []).length > 0) { frameworks.push(' cheet.js'); }
	if ((lowerString.match(/\/chess.js/g) || []).length > 0) { frameworks.push(' chess.js'); }
	if ((lowerString.match(/\/chibi/g) || []).length > 0) { frameworks.push(' chibi'); }
	if ((lowerString.match(/\/chocolat/g) || []).length > 0) { frameworks.push(' chocolat'); }
	if ((lowerString.match(/\/chosen/g) || []).length > 0) { frameworks.push(' chosen'); }
	if ((lowerString.match(/\/chroma-js/g) || []).length > 0) { frameworks.push(' chroma-js'); }
	if ((lowerString.match(/\/chrome-bootstrap/g) || []).length > 0) { frameworks.push(' chrome-bootstrap'); }
	if ((lowerString.match(/\/chrome-frame/g) || []).length > 0) { frameworks.push(' chrome-frame'); }
	if ((lowerString.match(/\/chrono/g) || []).length > 0) { frameworks.push(' chrono'); }
	if ((lowerString.match(/\/cinnamon.js/g) || []).length > 0) { frameworks.push(' cinnamon.js'); }
	if ((lowerString.match(/\/circles/g) || []).length > 0) { frameworks.push(' circles'); }
	if ((lowerString.match(/\/circliful/g) || []).length > 0) { frameworks.push(' circliful'); }
	if ((lowerString.match(/\/ckeditor/g) || []).length > 0) { frameworks.push(' ckeditor'); }
	if ((lowerString.match(/\/clank/g) || []).length > 0) { frameworks.push(' clank'); }
	if ((lowerString.match(/\/clappr-chromecast-plugin/g) || []).length > 0) { frameworks.push(' clappr-chromecast-plugin'); }
	if ((lowerString.match(/\/clappr/g) || []).length > 0) { frameworks.push(' clappr'); }
	if ((lowerString.match(/\/classie/g) || []).length > 0) { frameworks.push(' classie'); }
	if ((lowerString.match(/\/classlist/g) || []).length > 0) { frameworks.push(' classlist'); }
	if ((lowerString.match(/\/classnames/g) || []).length > 0) { frameworks.push(' classnames'); }
	if ((lowerString.match(/\/cldrjs/g) || []).length > 0) { frameworks.push(' cldrjs'); }
	if ((lowerString.match(/\/clickspark.js/g) || []).length > 0) { frameworks.push(' clickspark.js'); }
	if ((lowerString.match(/\/clientside-haml-js/g) || []).length > 0) { frameworks.push(' clientside-haml-js'); }
	if ((lowerString.match(/\/clipboard.js/g) || []).length > 0) { frameworks.push(' clipboard.js'); }
	if ((lowerString.match(/\/clmtrackr/g) || []).length > 0) { frameworks.push(' clmtrackr'); }
	if ((lowerString.match(/\/clndr/g) || []).length > 0) { frameworks.push(' clndr'); }
	if ((lowerString.match(/\/clockpicker/g) || []).length > 0) { frameworks.push(' clockpicker'); }
	if ((lowerString.match(/\/cloudinary-core/g) || []).length > 0) { frameworks.push(' cloudinary-core'); }
	if ((lowerString.match(/\/cloudinary-jquery-file-upload/g) || []).length > 0) { frameworks.push(' cloudinary-jquery-file-upload'); }
	if ((lowerString.match(/\/clusterize.js/g) || []).length > 0) { frameworks.push(' clusterize.js'); }
	if ((lowerString.match(/\/co\//g) || []).length > 0) { frameworks.push(' co'); }
	if ((lowerString.match(/\/codemirror/g) || []).length > 0) { frameworks.push(' codemirror'); }
	if ((lowerString.match(/\/coffee-script/g) || []).length > 0) { frameworks.push(' coffee-script'); }
	if ((lowerString.match(/\/coin-slider/g) || []).length > 0) { frameworks.push(' coin-slider'); }
	if ((lowerString.match(/\/collageplus/g) || []).length > 0) { frameworks.push(' collageplus'); }
	if ((lowerString.match(/\/colofilter.css/g) || []).length > 0) { frameworks.push(' colofilter.css'); }
	if ((lowerString.match(/\/color-js/g) || []).length > 0) { frameworks.push(' color-js'); }
	if ((lowerString.match(/\/color-thief/g) || []).length > 0) { frameworks.push(' color-thief'); }
	if ((lowerString.match(/\/colorify.js/g) || []).length > 0) { frameworks.push(' colorify.js'); }
	if ((lowerString.match(/\/colors/g) || []).length > 0) { frameworks.push(' colors'); }
	if ((lowerString.match(/\/commandz/g) || []).length > 0) { frameworks.push(' commandz'); }
	if ((lowerString.match(/\/commonmark/g) || []).length > 0) { frameworks.push(' commonmark'); }
	if ((lowerString.match(/\/completer/g) || []).length > 0) { frameworks.push(' completer'); }
	if ((lowerString.match(/\/componentjs/g) || []).length > 0) { frameworks.push(' componentjs'); }
	if ((lowerString.match(/\/condition/g) || []).length > 0) { frameworks.push(' condition'); }
	if ((lowerString.match(/\/conditional-field/g) || []).length > 0) { frameworks.push(' conditional-field'); }
	if ((lowerString.match(/\/conditionizr.js/g) || []).length > 0) { frameworks.push(' conditionizr.js'); }
	if ((lowerString.match(/\/confidencejs/g) || []).length > 0) { frameworks.push(' confidencejs'); }
	if ((lowerString.match(/\/console-polyfill/g) || []).length > 0) { frameworks.push(' console-polyfill'); }
	if ((lowerString.match(/\/cookie.js/g) || []).length > 0) { frameworks.push(' cookie.js'); }
	if ((lowerString.match(/\/cookieconsent2/g) || []).length > 0) { frameworks.push(' cookieconsent2'); }
	if ((lowerString.match(/\/cookiejar/g) || []).length > 0) { frameworks.push(' cookiejar'); }
	if ((lowerString.match(/\/cookies-monster/g) || []).length > 0) { frameworks.push(' cookies-monster'); }
	if ((lowerString.match(/\/cookiesjs/g) || []).length > 0) { frameworks.push(' cookiesjs'); }
	if ((lowerString.match(/\/coordinates-picker/g) || []).length > 0) { frameworks.push(' coordinates-picker'); }
	if ((lowerString.match(/\/core-js/g) || []).length > 0) { frameworks.push(' core-js'); }
	if ((lowerString.match(/\/corejs-typeahead/g) || []).length > 0) { frameworks.push(' corejs-typeahead'); }
	if ((lowerString.match(/\/corysimmons-selectivizr2/g) || []).length > 0) { frameworks.push(' corysimmons-selectivizr2'); }
	if ((lowerString.match(/\/cosmicjs/g) || []).length > 0) { frameworks.push(' cosmicjs'); }
	if ((lowerString.match(/\/countable/g) || []).length > 0) { frameworks.push(' countable'); }
	if ((lowerString.match(/\/countdown/g) || []).length > 0) { frameworks.push(' countdown'); }
	if ((lowerString.match(/\/countly-sdk-web/g) || []).length > 0) { frameworks.push(' countly-sdk-web'); }
	if ((lowerString.match(/\/countup.js/g) || []).length > 0) { frameworks.push(' countup.js'); }
	if ((lowerString.match(/\/covjson-reader/g) || []).length > 0) { frameworks.push(' covjson-reader'); }
	if ((lowerString.match(/\/cplayer/g) || []).length > 0) { frameworks.push(' cplayer'); }
	if ((lowerString.match(/\/crafty/g) || []).length > 0) { frameworks.push(' crafty'); }
	if ((lowerString.match(/\/crc-32/g) || []).length > 0) { frameworks.push(' crc-32'); }
	if ((lowerString.match(/\/crel/g) || []).length > 0) { frameworks.push(' crel'); }
	if ((lowerString.match(/\/cropper/g) || []).length > 0) { frameworks.push(' cropper'); }
	if ((lowerString.match(/\/cropperjs/g) || []).length > 0) { frameworks.push(' cropperjs'); }
	if ((lowerString.match(/\/croppic/g) || []).length > 0) { frameworks.push(' croppic'); }
	if ((lowerString.match(/\/crossfilter/g) || []).length > 0) { frameworks.push(' crossfilter'); }
	if ((lowerString.match(/\/crossroads/g) || []).length > 0) { frameworks.push(' crossroads'); }
	if ((lowerString.match(/\/crosstab/g) || []).length > 0) { frameworks.push(' crosstab'); }
	if ((lowerString.match(/\/crunch/g) || []).length > 0) { frameworks.push(' crunch'); }
	if ((lowerString.match(/\/cryptico/g) || []).length > 0) { frameworks.push(' cryptico'); }
	if ((lowerString.match(/\/crypto-js/g) || []).length > 0) { frameworks.push(' crypto-js'); }
	if ((lowerString.match(/\/css-layout/g) || []).length > 0) { frameworks.push(' css-layout'); }
	if ((lowerString.match(/\/css-social-buttons/g) || []).length > 0) { frameworks.push(' css-social-buttons'); }
	if ((lowerString.match(/\/css-spinning-spinners/g) || []).length > 0) { frameworks.push(' css-spinning-spinners'); }
	if ((lowerString.match(/\/css3-animate-it/g) || []).length > 0) { frameworks.push(' css3-animate-it'); }
	if ((lowerString.match(/\/css3finalize/g) || []).length > 0) { frameworks.push(' css3finalize'); }
	if ((lowerString.match(/\/css3pie/g) || []).length > 0) { frameworks.push(' css3pie'); }
	if ((lowerString.match(/\/cssco/g) || []).length > 0) { frameworks.push(' cssco'); }
	if ((lowerString.match(/\/cssgram/g) || []).length > 0) { frameworks.push(' cssgram'); }
	if ((lowerString.match(/\/csshake/g) || []).length > 0) { frameworks.push(' csshake'); }
	if ((lowerString.match(/\/cssuseragent/g) || []).length > 0) { frameworks.push(' cssuseragent'); }
	if ((lowerString.match(/\/cssx/g) || []).length > 0) { frameworks.push(' cssx'); }
	if ((lowerString.match(/\/cubism/g) || []).length > 0) { frameworks.push(' cubism'); }
	if ((lowerString.match(/\/cufon/g) || []).length > 0) { frameworks.push(' cufon'); }
	if ((lowerString.match(/\/cuid/g) || []).length > 0) { frameworks.push(' cuid'); }
	if ((lowerString.match(/\/curl/g) || []).length > 0) { frameworks.push(' curl'); }
	if ((lowerString.match(/\/custom-elements-builder/g) || []).length > 0) { frameworks.push(' custom-elements-builder'); }
	if ((lowerString.match(/\/cutjs/g) || []).length > 0) { frameworks.push(' cutjs'); }
	if ((lowerString.match(/\/cyclejs-core/g) || []).length > 0) { frameworks.push(' cyclejs-core'); }
	if ((lowerString.match(/\/cyclejs-dom/g) || []).length > 0) { frameworks.push(' cyclejs-dom'); }
	if ((lowerString.match(/\/cytoscape-panzoom/g) || []).length > 0) { frameworks.push(' cytoscape-panzoom'); }
	if ((lowerString.match(/\/cytoscape/g) || []).length > 0) { frameworks.push(' cytoscape'); }
	if ((lowerString.match(/\/d3-composite-projections/g) || []).length > 0) { frameworks.push(' d3-composite-projections'); }
	if ((lowerString.match(/\/d3-dsv/g) || []).length > 0) { frameworks.push(' d3-dsv'); }
	if ((lowerString.match(/\/d3-geo-projection/g) || []).length > 0) { frameworks.push(' d3-geo-projection'); }
	if ((lowerString.match(/\/d3-legend/g) || []).length > 0) { frameworks.push(' d3-legend'); }
	if ((lowerString.match(/\/d3-tip/g) || []).length > 0) { frameworks.push(' d3-tip'); }
	if ((lowerString.match(/\/d3-transform/g) || []).length > 0) { frameworks.push(' d3-transform'); }
	if ((lowerString.match(/\/d3.chart/g) || []).length > 0) { frameworks.push(' d3.chart'); }
	if ((lowerString.match(/\/d3/g) || []).length > 0) { frameworks.push(' d3'); }
	if ((lowerString.match(/\/d3fc/g) || []).length > 0) { frameworks.push(' d3fc'); }
	if ((lowerString.match(/\/d3plus/g) || []).length > 0) { frameworks.push(' d3plus'); }
	if ((lowerString.match(/\/dagre-d3/g) || []).length > 0) { frameworks.push(' dagre-d3'); }
	if ((lowerString.match(/\/dancer.js/g) || []).length > 0) { frameworks.push(' dancer.js'); }
	if ((lowerString.match(/\/danialfarid-angular-file-upload/g) || []).length > 0) { frameworks.push(' danialfarid-angular-file-upload'); }
	if ((lowerString.match(/\/danielgindi-jquery-backstretch/g) || []).length > 0) { frameworks.push(' danielgindi-jquery-backstretch'); }
	if ((lowerString.match(/\/dash-shaka-playback/g) || []).length > 0) { frameworks.push(' dash-shaka-playback'); }
	if ((lowerString.match(/\/dashjs/g) || []).length > 0) { frameworks.push(' dashjs'); }
	if ((lowerString.match(/\/dat-gui/g) || []).length > 0) { frameworks.push(' dat-gui'); }
	if ((lowerString.match(/\/data.js/g) || []).length > 0) { frameworks.push(' data.js'); }
	if ((lowerString.match(/\/datacomb/g) || []).length > 0) { frameworks.push(' datacomb'); }
	if ((lowerString.match(/\/datalib/g) || []).length > 0) { frameworks.push(' datalib'); }
	if ((lowerString.match(/\/datamaps/g) || []).length > 0) { frameworks.push(' datamaps'); }
	if ((lowerString.match(/\/datatables-colvis/g) || []).length > 0) { frameworks.push(' datatables-colvis'); }
	if ((lowerString.match(/\/datatables-fixedheader/g) || []).length > 0) { frameworks.push(' datatables-fixedheader'); }
	if ((lowerString.match(/\/datatables-tabletools/g) || []).length > 0) { frameworks.push(' datatables-tabletools'); }
	if ((lowerString.match(/\/datatables/g) || []).length > 0) { frameworks.push(' datatables'); }
	if ((lowerString.match(/\/datedropper/g) || []).length > 0) { frameworks.push(' datedropper'); }
	if ((lowerString.match(/\/datejs/g) || []).length > 0) { frameworks.push(' datejs'); }
	if ((lowerString.match(/\/datepair.js/g) || []).length > 0) { frameworks.push(' datepair.js'); }
	if ((lowerString.match(/\/davis.js/g) || []).length > 0) { frameworks.push(' davis.js'); }
	if ((lowerString.match(/\/dc\//g) || []).length > 0) { frameworks.push(' dc'); }
	if ((lowerString.match(/\/dd_belatedpng/g) || []).length > 0) { frameworks.push(' dd_belatedpng'); }
	if ((lowerString.match(/\/deb.js/g) || []).length > 0) { frameworks.push(' deb.js'); }
	if ((lowerString.match(/\/deck.js/g) || []).length > 0) { frameworks.push(' deck.js'); }
	if ((lowerString.match(/\/deep-diff/g) || []).length > 0) { frameworks.push(' deep-diff'); }
	if ((lowerString.match(/\/defiant.js/g) || []).length > 0) { frameworks.push(' defiant.js'); }
	if ((lowerString.match(/\/depot/g) || []).length > 0) { frameworks.push(' depot'); }
	if ((lowerString.match(/\/detect_swipe/g) || []).length > 0) { frameworks.push(' detect_swipe'); }
	if ((lowerString.match(/\/detectizr/g) || []).length > 0) { frameworks.push(' detectizr'); }
	if ((lowerString.match(/\/device.js/g) || []).length > 0) { frameworks.push(' device.js'); }
	if ((lowerString.match(/\/devicons/g) || []).length > 0) { frameworks.push(' devicons'); }
	if ((lowerString.match(/\/dexie/g) || []).length > 0) { frameworks.push(' dexie'); }
	if ((lowerString.match(/\/df-number-format/g) || []).length > 0) { frameworks.push(' df-number-format'); }
	if ((lowerString.match(/\/dialog-polyfill/g) || []).length > 0) { frameworks.push(' dialog-polyfill'); }
	if ((lowerString.match(/\/diff2html/g) || []).length > 0) { frameworks.push(' diff2html'); }
	if ((lowerString.match(/\/diff_match_patch/g) || []).length > 0) { frameworks.push(' diff_match_patch'); }
	if ((lowerString.match(/\/dimple/g) || []).length > 0) { frameworks.push(' dimple'); }
	if ((lowerString.match(/\/dinqyjs/g) || []).length > 0) { frameworks.push(' dinqyjs'); }
	if ((lowerString.match(/\/dio/g) || []).length > 0) { frameworks.push(' dio'); }
	if ((lowerString.match(/\/distpicker/g) || []).length > 0) { frameworks.push(' distpicker'); }
	if ((lowerString.match(/\/diva.js/g) || []).length > 0) { frameworks.push(' diva.js'); }
	if ((lowerString.match(/\/django.js/g) || []).length > 0) { frameworks.push(' django.js'); }
	if ((lowerString.match(/\/docsearch.js/g) || []).length > 0) { frameworks.push(' docsearch.js'); }
	if ((lowerString.match(/\/document-register-element/g) || []).length > 0) { frameworks.push(' document-register-element'); }
	if ((lowerString.match(/\/documentup/g) || []).length > 0) { frameworks.push(' documentup'); }
	if ((lowerString.match(/\/dojo/g) || []).length > 0) { frameworks.push(' dojo'); }
	if ((lowerString.match(/\/dollar.js/g) || []).length > 0) { frameworks.push(' dollar.js'); }
	if ((lowerString.match(/\/dom4/g) || []).length > 0) { frameworks.push(' dom4'); }
	if ((lowerString.match(/\/domainr-search-box/g) || []).length > 0) { frameworks.push(' domainr-search-box'); }
	if ((lowerString.match(/\/domplotter/g) || []).length > 0) { frameworks.push(' domplotter'); }
	if ((lowerString.match(/\/dompurify/g) || []).length > 0) { frameworks.push(' dompurify'); }
	if ((lowerString.match(/\/domready/g) || []).length > 0) { frameworks.push(' domready'); }
	if ((lowerString.match(/\/domtastic/g) || []).length > 0) { frameworks.push(' domtastic'); }
	if ((lowerString.match(/\/doofinder/g) || []).length > 0) { frameworks.push(' doofinder'); }
	if ((lowerString.match(/\/doony/g) || []).length > 0) { frameworks.push(' doony'); }
	if ((lowerString.match(/\/dot\//g) || []).length > 0) { frameworks.push(' dot'); }
	if ((lowerString.match(/doubleclick/g) || []).length > 0) { frameworks.push(' doubleclick'); }
	if ((lowerString.match(/\/draft-js/g) || []).length > 0) { frameworks.push(' draft-js'); }
	if ((lowerString.match(/\/dragdealer/g) || []).length > 0) { frameworks.push(' dragdealer'); }
	if ((lowerString.match(/\/draggabilly/g) || []).length > 0) { frameworks.push(' draggabilly'); }
	if ((lowerString.match(/\/dragonbones/g) || []).length > 0) { frameworks.push(' dragonbones'); }
	if ((lowerString.match(/\/dragula/g) || []).length > 0) { frameworks.push(' dragula'); }
	if ((lowerString.match(/\/drawer/g) || []).length > 0) { frameworks.push(' drawer'); }
	if ((lowerString.match(/\/droparea/g) || []).length > 0) { frameworks.push(' droparea'); }
	if ((lowerString.match(/\/dropbox.js/g) || []).length > 0) { frameworks.push(' dropbox.js'); }
	if ((lowerString.match(/\/dropzone/g) || []).length > 0) { frameworks.push(' dropzone'); }
	if ((lowerString.match(/\/dustjs-helpers/g) || []).length > 0) { frameworks.push(' dustjs-helpers'); }
	if ((lowerString.match(/\/dustjs-linkedin/g) || []).length > 0) { frameworks.push(' dustjs-linkedin'); }
	if ((lowerString.match(/\/dygraph/g) || []).length > 0) { frameworks.push(' dygraph'); }
	if ((lowerString.match(/\/dynamics.js/g) || []).length > 0) { frameworks.push(' dynamics.js'); }
	if ((lowerString.match(/\/easy-autocomplete/g) || []).length > 0) { frameworks.push(' easy-autocomplete'); }
	if ((lowerString.match(/\/easy-countdown/g) || []).length > 0) { frameworks.push(' easy-countdown'); }
	if ((lowerString.match(/\/easy-pie-chart/g) || []).length > 0) { frameworks.push(' easy-pie-chart'); }
	if ((lowerString.match(/\/easyxdm/g) || []).length > 0) { frameworks.push(' easyxdm'); }
	if ((lowerString.match(/\/echarts/g) || []).length > 0) { frameworks.push(' echarts'); }
	if ((lowerString.match(/\/eddy/g) || []).length > 0) { frameworks.push(' eddy'); }
	if ((lowerString.match(/\/egjs/g) || []).length > 0) { frameworks.push(' egjs'); }
	if ((lowerString.match(/\/ekko-lightbox/g) || []).length > 0) { frameworks.push(' ekko-lightbox'); }
	if ((lowerString.match(/\/elasticlunr/g) || []).length > 0) { frameworks.push(' elasticlunr'); }
	if ((lowerString.match(/\/elasticsearch/g) || []).length > 0) { frameworks.push(' elasticsearch'); }
	if ((lowerString.match(/\/eldarion-ajax/g) || []).length > 0) { frameworks.push(' eldarion-ajax'); }
	if ((lowerString.match(/\/elemental/g) || []).length > 0) { frameworks.push(' elemental'); }
	if ((lowerString.match(/\/elevatezoom/g) || []).length > 0) { frameworks.push(' elevatezoom'); }
	if ((lowerString.match(/\/elfinder/g) || []).length > 0) { frameworks.push(' elfinder'); }
	if ((lowerString.match(/\/elm-runtime/g) || []).length > 0) { frameworks.push(' elm-runtime'); }
	if ((lowerString.match(/\/embed-box/g) || []).length > 0) { frameworks.push(' embed-box'); }
	if ((lowerString.match(/\/embed-js/g) || []).length > 0) { frameworks.push(' embed-js'); }
	if ((lowerString.match(/\/embedly-jquery/g) || []).length > 0) { frameworks.push(' embedly-jquery'); }
	if ((lowerString.match(/\/ember-auth/g) || []).length > 0) { frameworks.push(' ember-auth'); }
	if ((lowerString.match(/\/ember-charts/g) || []).length > 0) { frameworks.push(' ember-charts'); }
	if ((lowerString.match(/\/ember-computed-reverse/g) || []).length > 0) { frameworks.push(' ember-computed-reverse'); }
	if ((lowerString.match(/\/ember-data-django-rest-adapter/g) || []).length > 0) { frameworks.push(' ember-data-django-rest-adapter'); }
	if ((lowerString.match(/\/ember-data-model-fragments/g) || []).length > 0) { frameworks.push(' ember-data-model-fragments'); }
	if ((lowerString.match(/\/ember-data.js/g) || []).length > 0) { frameworks.push(' ember-data.js'); }
	if ((lowerString.match(/\/ember-dialog/g) || []).length > 0) { frameworks.push(' ember-dialog'); }
	if ((lowerString.match(/\/ember-i18n/g) || []).length > 0) { frameworks.push(' ember-i18n'); }
	if ((lowerString.match(/\/ember-localstorage-adapter/g) || []).length > 0) { frameworks.push(' ember-localstorage-adapter'); }
	if ((lowerString.match(/\/ember-resource.js/g) || []).length > 0) { frameworks.push(' ember-resource.js'); }
	if ((lowerString.match(/\/ember-simple-auth/g) || []).length > 0) { frameworks.push(' ember-simple-auth'); }
	if ((lowerString.match(/\/ember.js/g) || []).length > 0) { frameworks.push(' ember.js'); }
	if ((lowerString.match(/\/emberfire/g) || []).length > 0) { frameworks.push(' emberfire'); }
	if ((lowerString.match(/\/emblem/g) || []).length > 0) { frameworks.push(' emblem'); }
	if ((lowerString.match(/\/emoji-picker/g) || []).length > 0) { frameworks.push(' emoji-picker'); }
	if ((lowerString.match(/\/emojify.js/g) || []).length > 0) { frameworks.push(' emojify.js'); }
	if ((lowerString.match(/\/emojione/g) || []).length > 0) { frameworks.push(' emojione'); }
	if ((lowerString.match(/\/engine.io-client/g) || []).length > 0) { frameworks.push(' engine.io-client'); }
	if ((lowerString.match(/\/enjoyhint/g) || []).length > 0) { frameworks.push(' enjoyhint'); }
	if ((lowerString.match(/\/enquire.js/g) || []).length > 0) { frameworks.push(' enquire.js'); }
	if ((lowerString.match(/\/entypo/g) || []).length > 0) { frameworks.push(' entypo'); }
	if ((lowerString.match(/\/epiceditor/g) || []).length > 0) { frameworks.push(' epiceditor'); }
	if ((lowerString.match(/\/epitome/g) || []).length > 0) { frameworks.push(' epitome'); }
	if ((lowerString.match(/\/epoch/g) || []).length > 0) { frameworks.push(' epoch'); }
	if ((lowerString.match(/\/eqcss/g) || []).length > 0) { frameworks.push(' eqcss'); }
	if ((lowerString.match(/\/equalize.js/g) || []).length > 0) { frameworks.push(' equalize.js'); }
	if ((lowerString.match(/\/eruda/g) || []).length > 0) { frameworks.push(' eruda'); }
	if ((lowerString.match(/\/es-class/g) || []).length > 0) { frameworks.push(' es-class'); }
	if ((lowerString.match(/\/es5-shim/g) || []).length > 0) { frameworks.push(' es5-shim'); }
	if ((lowerString.match(/\/es6-promise/g) || []).length > 0) { frameworks.push(' es6-promise'); }
	if ((lowerString.match(/\/es6-shim/g) || []).length > 0) { frameworks.push(' es6-shim'); }
	if ((lowerString.match(/\/esprima/g) || []).length > 0) { frameworks.push(' esprima'); }
	if ((lowerString.match(/\/esri-leaflet-geocoder/g) || []).length > 0) { frameworks.push(' esri-leaflet-geocoder'); }
	if ((lowerString.match(/\/esri-leaflet-related/g) || []).length > 0) { frameworks.push(' esri-leaflet-related'); }
	if ((lowerString.match(/\/esri-leaflet-renderers/g) || []).length > 0) { frameworks.push(' esri-leaflet-renderers'); }
	if ((lowerString.match(/\/esri-leaflet/g) || []).length > 0) { frameworks.push(' esri-leaflet'); }
	if ((lowerString.match(/\/etp/g) || []).length > 0) { frameworks.push(' etp'); }
	if ((lowerString.match(/\/eve.js/g) || []).length > 0) { frameworks.push(' eve.js'); }
	if ((lowerString.match(/\/event-source-polyfill/g) || []).length > 0) { frameworks.push(' event-source-polyfill'); }
	if ((lowerString.match(/\/eventable/g) || []).length > 0) { frameworks.push(' eventable'); }
	if ((lowerString.match(/\/eventemitter3/g) || []).length > 0) { frameworks.push(' eventemitter3'); }
	if ((lowerString.match(/\/eventmaster/g) || []).length > 0) { frameworks.push(' eventmaster'); }
	if ((lowerString.match(/\/eventproxy/g) || []).length > 0) { frameworks.push(' eventproxy'); }
	if ((lowerString.match(/\/evil-icons/g) || []).length > 0) { frameworks.push(' evil-icons'); }
	if ((lowerString.match(/\/evil.js/g) || []).length > 0) { frameworks.push(' evil.js'); }
	if ((lowerString.match(/\/excel-builder/g) || []).length > 0) { frameworks.push(' excel-builder'); }
	if ((lowerString.match(/\/expect.js/g) || []).length > 0) { frameworks.push(' expect.js'); }
	if ((lowerString.match(/\/expect/g) || []).length > 0) { frameworks.push(' expect'); }
	if ((lowerString.match(/\/ext-core/g) || []).length > 0) { frameworks.push(' ext-core'); }
	if ((lowerString.match(/\/extjs/g) || []).length > 0) { frameworks.push(' extjs'); }
	if ((lowerString.match(/\/fabric.js/g) || []).length > 0) { frameworks.push(' fabric.js'); }
	if ((lowerString.match(/\/falcor/g) || []).length > 0) { frameworks.push(' falcor'); }
	if ((lowerString.match(/\/fallback/g) || []).length > 0) { frameworks.push(' fallback'); }
	if ((lowerString.match(/\/fancyinput/g) || []).length > 0) { frameworks.push(' fancyinput'); }
	if ((lowerString.match(/\/fancybox/g) || []).length > 0) { frameworks.push(' fancybox'); }
	if ((lowerString.match(/\/fast-json-patch/g) || []).length > 0) { frameworks.push(' fast-json-patch'); }
	if ((lowerString.match(/\/fastclick/g) || []).length > 0) { frameworks.push(' fastclick'); }
	if ((lowerString.match(/\/fastdom/g) || []).length > 0) { frameworks.push(' fastdom'); }
	if ((lowerString.match(/\/fatcow-icons/g) || []).length > 0) { frameworks.push(' fatcow-icons'); }
	if ((lowerString.match(/\/favico.js/g) || []).length > 0) { frameworks.push(' favico.js'); }
	if ((lowerString.match(/\/faviconx/g) || []).length > 0) { frameworks.push(' faviconx'); }
	if ((lowerString.match(/\/fbbk-json/g) || []).length > 0) { frameworks.push(' fbbk-json'); }
	if ((lowerString.match(/\/fdaciuk-ajax/g) || []).length > 0) { frameworks.push(' fdaciuk-ajax'); }
	if ((lowerString.match(/\/featherlight/g) || []).length > 0) { frameworks.push(' featherlight'); }
	if ((lowerString.match(/\/feature.js/g) || []).length > 0) { frameworks.push(' feature.js'); }
	if ((lowerString.match(/\/feedback.js/g) || []).length > 0) { frameworks.push(' feedback.js'); }
	if ((lowerString.match(/\/fetch-jsonp/g) || []).length > 0) { frameworks.push(' fetch-jsonp'); }
	if ((lowerString.match(/\/fetch/g) || []).length > 0) { frameworks.push(' fetch'); }
	if ((lowerString.match(/\/fiber/g) || []).length > 0) { frameworks.push(' fiber'); }
	if ((lowerString.match(/\/field-kit/g) || []).length > 0) { frameworks.push(' field-kit'); }
	if ((lowerString.match(/\/file-uploader/g) || []).length > 0) { frameworks.push(' file-uploader'); }
	if ((lowerString.match(/\/filterizr/g) || []).length > 0) { frameworks.push(' filterizr'); }
	if ((lowerString.match(/\/fingerprintjs/g) || []).length > 0) { frameworks.push(' fingerprintjs'); }
	if ((lowerString.match(/\/fingerprintjs2/g) || []).length > 0) { frameworks.push(' fingerprintjs2'); }
	if ((lowerString.match(/\/firebug-lite/g) || []).length > 0) { frameworks.push(' firebug-lite'); }
	if ((lowerString.match(/\/fitvids/g) || []).length > 0) { frameworks.push(' fitvids'); }
	if ((lowerString.match(/\/fixed-data-table/g) || []).length > 0) { frameworks.push(' fixed-data-table'); }
	if ((lowerString.match(/\/fixed-header-table/g) || []).length > 0) { frameworks.push(' fixed-header-table'); }
	if ((lowerString.match(/\/fixed-sticky/g) || []).length > 0) { frameworks.push(' fixed-sticky'); }
	if ((lowerString.match(/\/fixto/g) || []).length > 0) { frameworks.push(' fixto'); }
	if ((lowerString.match(/\/flag-icon-css/g) || []).length > 0) { frameworks.push(' flag-icon-css'); }
	if ((lowerString.match(/\/flat-ui/g) || []).length > 0) { frameworks.push(' flat-ui'); }
	if ((lowerString.match(/\/flatpickr/g) || []).length > 0) { frameworks.push(' flatpickr'); }
	if ((lowerString.match(/\/flex-layout-attribute/g) || []).length > 0) { frameworks.push(' flex-layout-attribute'); }
	if ((lowerString.match(/\/flexboxgrid/g) || []).length > 0) { frameworks.push(' flexboxgrid'); }
	if ((lowerString.match(/\/flexibility/g) || []).length > 0) { frameworks.push(' flexibility'); }
	if ((lowerString.match(/\/flexiblegs-css/g) || []).length > 0) { frameworks.push(' flexiblegs-css'); }
	if ((lowerString.match(/\/flexie/g) || []).length > 0) { frameworks.push(' flexie'); }
	if ((lowerString.match(/\/flexisel/g) || []).length > 0) { frameworks.push(' flexisel'); }
	if ((lowerString.match(/\/flexslider/g) || []).length > 0) { frameworks.push(' flexslider'); }
	if ((lowerString.match(/\/flickity/g) || []).length > 0) { frameworks.push(' flickity'); }
	if ((lowerString.match(/\/flight/g) || []).length > 0) { frameworks.push(' flight'); }
	if ((lowerString.match(/\/flipcounter/g) || []).length > 0) { frameworks.push(' flipcounter'); }
	if ((lowerString.match(/\/flipclock/g) || []).length > 0) { frameworks.push(' flipclock'); }
	if ((lowerString.match(/\/flipcountdown/g) || []).length > 0) { frameworks.push(' flipcountdown'); }
	if ((lowerString.match(/\/floatlabels.js/g) || []).length > 0) { frameworks.push(' floatlabels.js'); }
	if ((lowerString.match(/\/floatthead/g) || []).length > 0) { frameworks.push(' floatthead'); }
	if ((lowerString.match(/\/flocks.js/g) || []).length > 0) { frameworks.push(' flocks.js'); }
	if ((lowerString.match(/\/flot.tooltip/g) || []).length > 0) { frameworks.push(' flot.tooltip'); }
	if ((lowerString.match(/\/flot\//g) || []).length > 0) { frameworks.push(' flot'); }
	if ((lowerString.match(/\/flow.js/g) || []).length > 0) { frameworks.push(' flow.js'); }
	if ((lowerString.match(/\/flowchart/g) || []).length > 0) { frameworks.push(' flowchart'); }
	if ((lowerString.match(/\/flowplayer/g) || []).length > 0) { frameworks.push(' flowplayer'); }
	if ((lowerString.match(/\/fluidbox/g) || []).length > 0) { frameworks.push(' fluidbox'); }
	if ((lowerString.match(/\/fluidvids.js/g) || []).length > 0) { frameworks.push(' fluidvids.js'); }
	if ((lowerString.match(/\/flux/g) || []).length > 0) { frameworks.push(' flux'); }
	if ((lowerString.match(/\/fluxify/g) || []).length > 0) { frameworks.push(' fluxify'); }
	if ((lowerString.match(/\/foggy/g) || []).length > 0) { frameworks.push(' foggy'); }
	if ((lowerString.match(/\/font-awesome-animation/g) || []).length > 0) { frameworks.push(' font-awesome-animation'); }
	if ((lowerString.match(/\/font-awesome/g) || []).length > 0) { frameworks.push(' font-awesome'); }
	if ((lowerString.match(/\/font-mfizz/g) || []).length > 0) { frameworks.push(' font-mfizz'); }
	if ((lowerString.match(/\/fontfaceobserver/g) || []).length > 0) { frameworks.push(' fontfaceobserver'); }
	if ((lowerString.match(/\/foonav/g) || []).length > 0) { frameworks.push(' foonav'); }
	if ((lowerString.match(/\/force-js/g) || []).length > 0) { frameworks.push(' force-js'); }
	if ((lowerString.match(/\/forerunnerdb/g) || []).length > 0) { frameworks.push(' forerunnerdb'); }
	if ((lowerString.match(/\/formatter.js/g) || []).length > 0) { frameworks.push(' formatter.js'); }
	if ((lowerString.match(/\/formstone/g) || []).length > 0) { frameworks.push(' formstone'); }
	if ((lowerString.match(/\/formsy-react/g) || []).length > 0) { frameworks.push(' formsy-react'); }
	if ((lowerString.match(/\/formulajs/g) || []).length > 0) { frameworks.push(' formulajs'); }
	if ((lowerString.match(/\/fotorama/g) || []).length > 0) { frameworks.push(' fotorama'); }
	if ((lowerString.match(/\/foundation-datepicker/g) || []).length > 0) { frameworks.push(' foundation-datepicker'); }
	if ((lowerString.match(/\/foundation-emails/g) || []).length > 0) { frameworks.push(' foundation-emails'); }
	if ((lowerString.match(/\/foundation-essential/g) || []).length > 0) { frameworks.push(' foundation-essential'); }
	if ((lowerString.match(/\/foundation/g) || []).length > 0) { frameworks.push(' foundation'); }
	if ((lowerString.match(/\/foundicons/g) || []).length > 0) { frameworks.push(' foundicons'); }
	if ((lowerString.match(/\/fpsmeter/g) || []).length > 0) { frameworks.push(' fpsmeter'); }
	if ((lowerString.match(/\/framework7/g) || []).length > 0) { frameworks.push(' framework7'); }
	if ((lowerString.match(/\/free-jqgrid/g) || []).length > 0) { frameworks.push(' free-jqgrid'); }
	if ((lowerString.match(/\/freewall/g) || []).length > 0) { frameworks.push(' freewall'); }
	if ((lowerString.match(/\/freezer-js/g) || []).length > 0) { frameworks.push(' freezer-js'); }
	if ((lowerString.match(/\/froala-editor/g) || []).length > 0) { frameworks.push(' froala-editor'); }
	if ((lowerString.match(/\/frozen-moment/g) || []).length > 0) { frameworks.push(' frozen-moment'); }
	if ((lowerString.match(/\/frzr/g) || []).length > 0) { frameworks.push(' frzr'); }
	if ((lowerString.match(/\/fsvs/g) || []).length > 0) { frameworks.push(' fsvs'); }
	if ((lowerString.match(/\/fuckadblock/g) || []).length > 0) { frameworks.push(' fuckadblock'); }
	if ((lowerString.match(/\/fuelux/g) || []).length > 0) { frameworks.push(' fuelux'); }
	if ((lowerString.match(/\/fullpage.js/g) || []).length > 0) { frameworks.push(' fullpage.js'); }
	if ((lowerString.match(/\/fullcalendar/g) || []).length > 0) { frameworks.push(' fullcalendar'); }
	if ((lowerString.match(/\/function-plot/g) || []).length > 0) { frameworks.push(' function-plot'); }
	if ((lowerString.match(/\/furtive/g) || []).length > 0) { frameworks.push(' furtive'); }
	if ((lowerString.match(/\/fuse.js/g) || []).length > 0) { frameworks.push(' fuse.js'); }
	if ((lowerString.match(/\/fuzzyset.js/g) || []).length > 0) { frameworks.push(' fuzzyset.js'); }
	if ((lowerString.match(/\/g9/g) || []).length > 0) { frameworks.push(' g9'); }
	if ((lowerString.match(/\/ga-lite/g) || []).length > 0) { frameworks.push(' ga-lite'); }
	if ((lowerString.match(/\/galleria/g) || []).length > 0) { frameworks.push(' galleria'); }
	if ((lowerString.match(/\/galleriffic/g) || []).length > 0) { frameworks.push(' galleriffic'); }
	if ((lowerString.match(/\/garlic.js/g) || []).length > 0) { frameworks.push(' garlic.js'); }
	if ((lowerString.match(/\/gas\//g) || []).length > 0) { frameworks.push(' gas'); }
	if ((lowerString.match(/\/gator/g) || []).length > 0) { frameworks.push(' gator'); }
	if ((lowerString.match(/\/gauge.js/g) || []).length > 0) { frameworks.push(' gauge.js'); }
	if ((lowerString.match(/\/gemma/g) || []).length > 0) { frameworks.push(' gemma'); }
	if ((lowerString.match(/\/genericons/g) || []).length > 0) { frameworks.push(' genericons'); }
	if ((lowerString.match(/\/gentelella/g) || []).length > 0) { frameworks.push(' gentelella'); }
	if ((lowerString.match(/\/geo-location-javascript/g) || []).length > 0) { frameworks.push(' geo-location-javascript'); }
	if ((lowerString.match(/\/geocomplete/g) || []).length > 0) { frameworks.push(' geocomplete'); }
	if ((lowerString.match(/\/geoext/g) || []).length > 0) { frameworks.push(' geoext'); }
	if ((lowerString.match(/\/geojs/g) || []).length > 0) { frameworks.push(' geojs'); }
	if ((lowerString.match(/\/geojson2svg/g) || []).length > 0) { frameworks.push(' geojson2svg'); }
	if ((lowerString.match(/\/geolocator/g) || []).length > 0) { frameworks.push(' geolocator'); }
	if ((lowerString.match(/\/geopattern/g) || []).length > 0) { frameworks.push(' geopattern'); }
	if ((lowerString.match(/\/gh.js/g) || []).length > 0) { frameworks.push(' gh.js'); }
	if ((lowerString.match(/\/gifshot/g) || []).length > 0) { frameworks.push(' gifshot'); }
	if ((lowerString.match(/\/gillie/g) || []).length > 0) { frameworks.push(' gillie'); }
	if ((lowerString.match(/\/gist-embed/g) || []).length > 0) { frameworks.push(' gist-embed'); }
	if ((lowerString.match(/\/gitgraph.js/g) || []).length > 0) { frameworks.push(' gitgraph.js'); }
	if ((lowerString.match(/\/github-api/g) || []).length > 0) { frameworks.push(' github-api'); }
	if ((lowerString.match(/\/github-calendar/g) || []).length > 0) { frameworks.push(' github-calendar'); }
	if ((lowerString.match(/\/github-fork-ribbon-css/g) || []).length > 0) { frameworks.push(' github-fork-ribbon-css'); }
	if ((lowerString.match(/\/github-markdown-css/g) || []).length > 0) { frameworks.push(' github-markdown-css'); }
	if ((lowerString.match(/\/github-org-members.js/g) || []).length > 0) { frameworks.push(' github-org-members.js'); }
	if ((lowerString.match(/\/github-repo-widget/g) || []).length > 0) { frameworks.push(' github-repo-widget'); }
	if ((lowerString.match(/\/gitter-sidecar/g) || []).length > 0) { frameworks.push(' gitter-sidecar'); }
	if ((lowerString.match(/\/gl-matrix/g) || []).length > 0) { frameworks.push(' gl-matrix'); }
	if ((lowerString.match(/\/gliojs/g) || []).length > 0) { frameworks.push(' gliojs'); }
	if ((lowerString.match(/\/globalize/g) || []).length > 0) { frameworks.push(' globalize'); }
	if ((lowerString.match(/\/gmap3/g) || []).length > 0) { frameworks.push(' gmap3'); }
	if ((lowerString.match(/\/gmaps.js/g) || []).length > 0) { frameworks.push(' gmaps.js'); }
	if ((lowerString.match(/\/gmaps4rails/g) || []).length > 0) { frameworks.push(' gmaps4rails'); }
	if ((lowerString.match(/\/godlike.css/g) || []).length > 0) { frameworks.push(' godlike.css'); }
	if ((lowerString.match(/\/gojs/g) || []).length > 0) { frameworks.push(' gojs'); }
	if ((lowerString.match(/\/golden-layout/g) || []).length > 0) { frameworks.push(' golden-layout'); }
	if ((lowerString.match(/\/goodshare.js/g) || []).length > 0) { frameworks.push(' goodshare.js'); }
	if ((lowerString.match(/\google.analytics/g) || []).length > 0) { frameworks.push(' google analytics'); }
	if ((lowerString.match(/\/gorillascript/g) || []).length > 0) { frameworks.push(' gorillascript'); }
	if ((lowerString.match(/\/grade-js/g) || []).length > 0) { frameworks.push(' grade-js'); }
	if ((lowerString.match(/\/graingert-wow/g) || []).length > 0) { frameworks.push(' graingert-wow'); }
	if ((lowerString.match(/\/granim/g) || []).length > 0) { frameworks.push(' granim'); }
	if ((lowerString.match(/\/graphael/g) || []).length > 0) { frameworks.push(' graphael'); }
	if ((lowerString.match(/\/graphdracula/g) || []).length > 0) { frameworks.push(' graphdracula'); }
	if ((lowerString.match(/\/graphicsjs/g) || []).length > 0) { frameworks.push(' graphicsjs'); }
	if ((lowerString.match(/\/graphiql/g) || []).length > 0) { frameworks.push(' graphiql'); }
	if ((lowerString.match(/\/grd/g) || []).length > 0) { frameworks.push(' grd'); }
	if ((lowerString.match(/\/gremlins.js/g) || []).length > 0) { frameworks.push(' gremlins.js'); }
	if ((lowerString.match(/\/gridforms/g) || []).length > 0) { frameworks.push(' gridforms'); }
	if ((lowerString.match(/\/gridlex/g) || []).length > 0) { frameworks.push(' gridlex'); }
	if ((lowerString.match(/\/gridly/g) || []).length > 0) { frameworks.push(' gridly'); }
	if ((lowerString.match(/\/gridstack.js/g) || []).length > 0) { frameworks.push(' gridstack.js'); }
	if ((lowerString.match(/\/grommet-index/g) || []).length > 0) { frameworks.push(' grommet-index'); }
	if ((lowerString.match(/\/grommet/g) || []).length > 0) { frameworks.push(' grommet'); }
	if ((lowerString.match(/\/gsap/g) || []).length > 0) { frameworks.push(' gsap'); }
	if ((lowerString.match(/\/gss-engine/g) || []).length > 0) { frameworks.push(' gss-engine'); }
	if ((lowerString.match(/\/guards/g) || []).length > 0) { frameworks.push(' guards'); }
	if ((lowerString.match(/\/gulp/g) || []).length > 0) { frameworks.push(' gulp'); }
	if ((lowerString.match(/\/gumby/g) || []).length > 0) { frameworks.push(' gumby'); }
	if ((lowerString.match(/\/gumshoe/g) || []).length > 0) { frameworks.push(' gumshoe'); }
	if ((lowerString.match(/\/gyrejs/g) || []).length > 0) { frameworks.push(' gyrejs'); }
	if ((lowerString.match(/\/h5validate/g) || []).length > 0) { frameworks.push(' h5validate'); }
	if ((lowerString.match(/\/hack/g) || []).length > 0) { frameworks.push(' hack'); }
	if ((lowerString.match(/\/hallo.js/g) || []).length > 0) { frameworks.push(' hallo.js'); }
	if ((lowerString.match(/\/hamburgers/g) || []).length > 0) { frameworks.push(' hamburgers'); }
	if ((lowerString.match(/\/hammer.js/g) || []).length > 0) { frameworks.push(' hammer.js'); }
	if ((lowerString.match(/\/hamsterjs/g) || []).length > 0) { frameworks.push(' hamsterjs'); }
	if ((lowerString.match(/\/handjs/g) || []).length > 0) { frameworks.push(' handjs'); }
	if ((lowerString.match(/\/handlebars.js/g) || []).length > 0) { frameworks.push(' handlebars.js'); }
	if ((lowerString.match(/\/handsontable/g) || []).length > 0) { frameworks.push(' handsontable'); }
	if ((lowerString.match(/\/hasher/g) || []).length > 0) { frameworks.push(' hasher'); }
	if ((lowerString.match(/\/hashgrid/g) || []).length > 0) { frameworks.push(' hashgrid'); }
	if ((lowerString.match(/\/he\//g) || []).length > 0) { frameworks.push(' he'); }
	if ((lowerString.match(/\/headhesive/g) || []).length > 0) { frameworks.push(' headhesive'); }
	if ((lowerString.match(/\/headjs/g) || []).length > 0) { frameworks.push(' headjs'); }
	if ((lowerString.match(/\/headroom/g) || []).length > 0) { frameworks.push(' headroom'); }
	if ((lowerString.match(/\/heatcanvas/g) || []).length > 0) { frameworks.push(' heatcanvas'); }
	if ((lowerString.match(/\/heatmap.js/g) || []).length > 0) { frameworks.push(' heatmap.js'); }
	if ((lowerString.match(/\/helium-css/g) || []).length > 0) { frameworks.push(' helium-css'); }
	if ((lowerString.match(/\/hellojs/g) || []).length > 0) { frameworks.push(' hellojs'); }
	if ((lowerString.match(/\/hideseek/g) || []).length > 0) { frameworks.push(' hideseek'); }
	if ((lowerString.match(/\/hideshowpassword/g) || []).length > 0) { frameworks.push(' hideshowpassword'); }
	if ((lowerString.match(/\/highcharttable/g) || []).length > 0) { frameworks.push(' highcharttable'); }
	if ((lowerString.match(/\/highcharts-ng/g) || []).length > 0) { frameworks.push(' highcharts-ng'); }
	if ((lowerString.match(/\/highcharts/g) || []).length > 0) { frameworks.push(' highcharts'); }
	if ((lowerString.match(/\/highlight.js/g) || []).length > 0) { frameworks.push(' highlight.js'); }
	if ((lowerString.match(/\/highlighter.js/g) || []).length > 0) { frameworks.push(' highlighter.js'); }
	if ((lowerString.match(/\/highlightjs-line-numbers.js/g) || []).length > 0) { frameworks.push(' highlightjs-line-numbers.js'); }
	if ((lowerString.match(/\/highmaps/g) || []).length > 0) { frameworks.push(' highmaps'); }
	if ((lowerString.match(/\/highstock/g) || []).length > 0) { frameworks.push(' highstock'); }
	if ((lowerString.match(/\/hinclude/g) || []).length > 0) { frameworks.push(' hinclude'); }
	if ((lowerString.match(/\/hint.css/g) || []).length > 0) { frameworks.push(' hint.css'); }
	if ((lowerString.match(/\/history.js/g) || []).length > 0) { frameworks.push(' history.js'); }
	if ((lowerString.match(/\/history/g) || []).length > 0) { frameworks.push(' history'); }
	if ((lowerString.match(/\/hiw-api/g) || []).length > 0) { frameworks.push(' hiw-api'); }
	if ((lowerString.match(/\/hls.js/g) || []).length > 0) { frameworks.push(' hls.js'); }
	if ((lowerString.match(/\/hogan.js/g) || []).length > 0) { frameworks.push(' hogan.js'); }
	if ((lowerString.match(/\/holder/g) || []).length > 0) { frameworks.push(' holder'); }
	if ((lowerString.match(/\/hopscotch/g) || []).length > 0) { frameworks.push(' hopscotch'); }
	if ((lowerString.match(/\/horsey/g) || []).length > 0) { frameworks.push(' horsey'); }
	if ((lowerString.match(/\/hover.css/g) || []).length > 0) { frameworks.push(' hover.css'); }
	if ((lowerString.match(/\/howler/g) || []).length > 0) { frameworks.push(' howler'); }
	if ((lowerString.match(/\/hprose-html5/g) || []).length > 0) { frameworks.push(' hprose-html5'); }
	if ((lowerString.match(/\/html-gl/g) || []).length > 0) { frameworks.push(' html-gl'); }
	if ((lowerString.match(/\/html-inspector/g) || []).length > 0) { frameworks.push(' html-inspector'); }
	if ((lowerString.match(/\/html.js/g) || []).length > 0) { frameworks.push(' html.js'); }
	if ((lowerString.match(/\/html2canvas/g) || []).length > 0) { frameworks.push(' html2canvas'); }
	if ((lowerString.match(/\/html5-history-api/g) || []).length > 0) { frameworks.push(' html5-history-api'); }
	if ((lowerString.match(/\/html5media/g) || []).length > 0) { frameworks.push(' html5media'); }
	if ((lowerString.match(/\/html5shiv/g) || []).length > 0) { frameworks.push(' html5shiv'); }
	if ((lowerString.match(/\/html5sortable/g) || []).length > 0) { frameworks.push(' html5sortable'); }
	if ((lowerString.match(/\/http-client/g) || []).length > 0) { frameworks.push(' http-client'); }
	if ((lowerString.match(/\/humane-js/g) || []).length > 0) { frameworks.push(' humane-js'); }
	if ((lowerString.match(/\/humanize-duration/g) || []).length > 0) { frameworks.push(' humanize-duration'); }
	if ((lowerString.match(/\/humanize-plus/g) || []).length > 0) { frameworks.push(' humanize-plus'); }
	if ((lowerString.match(/\/husl/g) || []).length > 0) { frameworks.push(' husl'); }
	if ((lowerString.match(/\/hydna/g) || []).length > 0) { frameworks.push(' hydna'); }
	if ((lowerString.match(/\/hydra.js/g) || []).length > 0) { frameworks.push(' hydra.js'); }
	if ((lowerString.match(/\/i18next-browser-languagedetector/g) || []).length > 0) { frameworks.push(' i18next-browser-languagedetector'); }
	if ((lowerString.match(/\/i18next-locize-backend/g) || []).length > 0) { frameworks.push(' i18next-locize-backend'); }
	if ((lowerString.match(/\/i18next/g) || []).length > 0) { frameworks.push(' i18next'); }
	if ((lowerString.match(/\/i3d3/g) || []).length > 0) { frameworks.push(' i3d3'); }
	if ((lowerString.match(/\/icheck/g) || []).length > 0) { frameworks.push(' icheck'); }
	if ((lowerString.match(/\/iscroll/g) || []).length > 0) { frameworks.push(' iscroll'); }
	if ((lowerString.match(/\/ical.js/g) || []).length > 0) { frameworks.push(' ical.js'); }
	if ((lowerString.match(/\/ice\//g) || []).length > 0) { frameworks.push(' ice'); }
	if ((lowerString.match(/\/iconate/g) || []).length > 0) { frameworks.push(' iconate'); }
	if ((lowerString.match(/\/icono/g) || []).length > 0) { frameworks.push(' icono'); }
	if ((lowerString.match(/\/idbwrapper/g) || []).length > 0) { frameworks.push(' idbwrapper'); }
	if ((lowerString.match(/\/ideal-image-slider/g) || []).length > 0) { frameworks.push(' ideal-image-slider'); }
	if ((lowerString.match(/\/ie8/g) || []).length > 0) { frameworks.push(' ie8'); }
	if ((lowerString.match(/\/iebetter.js/g) || []).length > 0) { frameworks.push(' iebetter.js'); }
	if ((lowerString.match(/\/iframe-resizer/g) || []).length > 0) { frameworks.push(' iframe-resizer'); }
	if ((lowerString.match(/\/ifvisible/g) || []).length > 0) { frameworks.push(' ifvisible'); }
	if ((lowerString.match(/\/ilyabirman-likely/g) || []).length > 0) { frameworks.push(' ilyabirman-likely'); }
	if ((lowerString.match(/\/image-picker/g) || []).length > 0) { frameworks.push(' image-picker'); }
	if ((lowerString.match(/\/imager.js/g) || []).length > 0) { frameworks.push(' imager.js'); }
	if ((lowerString.match(/\/imageviewer/g) || []).length > 0) { frameworks.push(' imageviewer'); }
	if ((lowerString.match(/\/imagine.js/g) || []).length > 0) { frameworks.push(' imagine.js'); }
	if ((lowerString.match(/\/imgliquid/g) || []).length > 0) { frameworks.push(' imgliquid'); }
	if ((lowerString.match(/\/imgareaselect/g) || []).length > 0) { frameworks.push(' imgareaselect'); }
	if ((lowerString.match(/\/immstruct/g) || []).length > 0) { frameworks.push(' immstruct'); }
	if ((lowerString.match(/\/immutable/g) || []).length > 0) { frameworks.push(' immutable'); }
	if ((lowerString.match(/\/impress.js/g) || []).length > 0) { frameworks.push(' impress.js'); }
	if ((lowerString.match(/\/incremental-dom/g) || []).length > 0) { frameworks.push(' incremental-dom'); }
	if ((lowerString.match(/\/infamous/g) || []).length > 0) { frameworks.push(' infamous'); }
	if ((lowerString.match(/\/infect/g) || []).length > 0) { frameworks.push(' infect'); }
	if ((lowerString.match(/\/inferno/g) || []).length > 0) { frameworks.push(' inferno'); }
	if ((lowerString.match(/\/infieldlabel/g) || []).length > 0) { frameworks.push(' infieldlabel'); }
	if ((lowerString.match(/\/infinity/g) || []).length > 0) { frameworks.push(' infinity'); }
	if ((lowerString.match(/\/ink\//g) || []).length > 0) { frameworks.push(' ink'); }
	if ((lowerString.match(/\/inobounce/g) || []).length > 0) { frameworks.push(' inobounce'); }
	if ((lowerString.match(/\/inputmask-multi/g) || []).length > 0) { frameworks.push(' inputmask-multi'); }
	if ((lowerString.match(/\/insightjs/g) || []).length > 0) { frameworks.push(' insightjs'); }
	if ((lowerString.match(/\/inspire-tree/g) || []).length > 0) { frameworks.push(' inspire-tree'); }
	if ((lowerString.match(/\/instafeed.js/g) || []).length > 0) { frameworks.push(' instafeed.js'); }
	if ((lowerString.match(/\/instantclick/g) || []).length > 0) { frameworks.push(' instantclick'); }
	if ((lowerString.match(/\/instantsearch.js/g) || []).length > 0) { frameworks.push(' instantsearch.js'); }
	if ((lowerString.match(/\/interact.js/g) || []).length > 0) { frameworks.push(' interact.js'); }
	if ((lowerString.match(/\/intercom.js/g) || []).length > 0) { frameworks.push(' intercom.js'); }
	if ((lowerString.match(/\/intercooler-js/g) || []).length > 0) { frameworks.push(' intercooler-js'); }
	if ((lowerString.match(/\/interpolate.js/g) || []).length > 0) { frameworks.push(' interpolate.js'); }
	if ((lowerString.match(/\/intl-tel-input/g) || []).length > 0) { frameworks.push(' intl-tel-input'); }
	if ((lowerString.match(/\/intro.js/g) || []).length > 0) { frameworks.push(' intro.js'); }
	if ((lowerString.match(/\/ion-rangeslider/g) || []).length > 0) { frameworks.push(' ion-rangeslider'); }
	if ((lowerString.match(/\/ion-sound/g) || []).length > 0) { frameworks.push(' ion-sound'); }
	if ((lowerString.match(/\/ion.calendar/g) || []).length > 0) { frameworks.push(' ion.calendar'); }
	if ((lowerString.match(/\/ion.checkradio/g) || []).length > 0) { frameworks.push(' ion.checkradio'); }
	if ((lowerString.match(/\/ionic-framework/g) || []).length > 0) { frameworks.push(' ionic-framework'); }
	if ((lowerString.match(/\/ionic/g) || []).length > 0) { frameworks.push(' ionic'); }
	if ((lowerString.match(/\/ionicons/g) || []).length > 0) { frameworks.push(' ionicons'); }
	if ((lowerString.match(/\/is-in-viewport/g) || []).length > 0) { frameworks.push(' is-in-viewport'); }
	if ((lowerString.match(/\/is_js/g) || []).length > 0) { frameworks.push(' is_js'); }
	if ((lowerString.match(/\/ismobilejs/g) || []).length > 0) { frameworks.push(' ismobilejs'); }
	if ((lowerString.match(/\/isomer/g) || []).length > 0) { frameworks.push(' isomer'); }
	if ((lowerString.match(/\/iviewer/g) || []).length > 0) { frameworks.push(' iviewer'); }
	if ((lowerString.match(/\/ixjs/g) || []).length > 0) { frameworks.push(' ixjs'); }
	if ((lowerString.match(/\/jbox/g) || []).length > 0) { frameworks.push(' jbox'); }
	if ((lowerString.match(/\/jgravity/g) || []).length > 0) { frameworks.push(' jgravity'); }
	if ((lowerString.match(/\/jinvertscroll/g) || []).length > 0) { frameworks.push(' jinvertscroll'); }
	if ((lowerString.match(/\/jqrangeslider/g) || []).length > 0) { frameworks.push(' jqrangeslider'); }
	if ((lowerString.match(/\/jquery-flip/g) || []).length > 0) { frameworks.push(' jquery-flip'); }
	if ((lowerString.match(/\/jquery-geolocation/g) || []).length > 0) { frameworks.push(' jquery-geolocation'); }
	if ((lowerString.match(/\/jquery-knob/g) || []).length > 0) { frameworks.push(' jquery-knob'); }
	if ((lowerString.match(/\/jquery-validation-engine/g) || []).length > 0) { frameworks.push(' jquery-validation-engine'); }
	if ((lowerString.match(/\/jquery-fleximages/g) || []).length > 0) { frameworks.push(' jquery-fleximages'); }
	if ((lowerString.match(/\/jquery-linkify/g) || []).length > 0) { frameworks.push(' jquery-linkify'); }
	if ((lowerString.match(/\/jquery-slimscroll/g) || []).length > 0) { frameworks.push(' jquery-slimscroll'); }
	if ((lowerString.match(/\/jquery-ui-slider-pips/g) || []).length > 0) { frameworks.push(' jquery-ui-slider-pips'); }
	if ((lowerString.match(/\/jquery-viewport-checker/g) || []).length > 0) { frameworks.push(' jquery-viewport-checker'); }
	if ((lowerString.match(/\/jquery.blackandwhite/g) || []).length > 0) { frameworks.push(' jquery.blackandwhite'); }
	if ((lowerString.match(/\/jquery.marquee/g) || []).length > 0) { frameworks.push(' jquery.marquee'); }
	if ((lowerString.match(/\/jquery.dotdotdot/g) || []).length > 0) { frameworks.push(' jquery.dotdotdot'); }
	if ((lowerString.match(/\/jquery.highlightregex/g) || []).length > 0) { frameworks.push(' jquery.highlightregex'); }
	if ((lowerString.match(/\/jquery.mmenu/g) || []).length > 0) { frameworks.push(' jquery.mmenu'); }
	if ((lowerString.match(/\/jquery.my/g) || []).length > 0) { frameworks.push(' jquery.my'); }
	if ((lowerString.match(/\/jquery.print/g) || []).length > 0) { frameworks.push(' jquery.print'); }
	if ((lowerString.match(/\/jquery.serializeobject/g) || []).length > 0) { frameworks.push(' jquery.serializeobject'); }
	if ((lowerString.match(/\/jreject/g) || []).length > 0) { frameworks.push(' jreject'); }
	if ((lowerString.match(/\/jrespond/g) || []).length > 0) { frameworks.push(' jrespond'); }
	if ((lowerString.match(/\/jscrollpane/g) || []).length > 0) { frameworks.push(' jscrollpane'); }
	if ((lowerString.match(/\/jstorage/g) || []).length > 0) { frameworks.push(' jstorage'); }
	if ((lowerString.match(/\/jade/g) || []).length > 0) { frameworks.push(' jade'); }
	if ((lowerString.match(/\/jarallax/g) || []).length > 0) { frameworks.push(' jarallax'); }
	if ((lowerString.match(/\/jasmine-ajax/g) || []).length > 0) { frameworks.push(' jasmine-ajax'); }
	if ((lowerString.match(/\/jasmine/g) || []).length > 0) { frameworks.push(' jasmine'); }
	if ((lowerString.match(/\/jasny-bootstrap/g) || []).length > 0) { frameworks.push(' jasny-bootstrap'); }
	if ((lowerString.match(/\/javascript-canvas-to-blob/g) || []).length > 0) { frameworks.push(' javascript-canvas-to-blob'); }
	if ((lowerString.match(/\/javascript-debug/g) || []).length > 0) { frameworks.push(' javascript-debug'); }
	if ((lowerString.match(/\/javascript-detect-element-resize/g) || []).length > 0) { frameworks.push(' javascript-detect-element-resize'); }
	if ((lowerString.match(/\/javascript-hooker/g) || []).length > 0) { frameworks.push(' javascript-hooker'); }
	if ((lowerString.match(/\/javascript-state-machine/g) || []).length > 0) { frameworks.push(' javascript-state-machine'); }
	if ((lowerString.match(/\/jblocks/g) || []).length > 0) { frameworks.push(' jblocks'); }
	if ((lowerString.match(/\/jbone/g) || []).length > 0) { frameworks.push(' jbone'); }
	if ((lowerString.match(/\/jcalculator/g) || []).length > 0) { frameworks.push(' jcalculator'); }
	if ((lowerString.match(/\/jcanvas/g) || []).length > 0) { frameworks.push(' jcanvas'); }
	if ((lowerString.match(/\/jcarousel/g) || []).length > 0) { frameworks.push(' jcarousel'); }
	if ((lowerString.match(/\/jcf\//g) || []).length > 0) { frameworks.push(' jcf'); }
	if ((lowerString.match(/\/jed\//g) || []).length > 0) { frameworks.push(' jed'); }
	if ((lowerString.match(/\/jeditable.js/g) || []).length > 0) { frameworks.push(' jeditable.js'); }
	if ((lowerString.match(/\/jets\//g) || []).length > 0) { frameworks.push(' jets'); }
	if ((lowerString.match(/\/jic\//g) || []).length > 0) { frameworks.push(' jic'); }
	if ((lowerString.match(/\/jinplace/g) || []).length > 0) { frameworks.push(' jinplace'); }
	if ((lowerString.match(/\/jinq/g) || []).length > 0) { frameworks.push(' jinq'); }
	if ((lowerString.match(/\/jit/g) || []).length > 0) { frameworks.push(' jit'); }
	if ((lowerString.match(/\/jmpress/g) || []).length > 0) { frameworks.push(' jmpress'); }
	if ((lowerString.match(/\/jo\//g) || []).length > 0) { frameworks.push(' jo'); }
	if ((lowerString.match(/\/jodit/g) || []).length > 0) { frameworks.push(' jodit'); }
	if ((lowerString.match(/\/jointjs/g) || []).length > 0) { frameworks.push(' jointjs'); }
	if ((lowerString.match(/\/joopl/g) || []).length > 0) { frameworks.push(' joopl'); }
	if ((lowerString.match(/\/joyride/g) || []).length > 0) { frameworks.push(' joyride'); }
	if ((lowerString.match(/\/jplayer/g) || []).length > 0) { frameworks.push(' jplayer'); }
	if ((lowerString.match(/\/jplist/g) || []).length > 0) { frameworks.push(' jplist'); }
	if ((lowerString.match(/\/jq-console/g) || []).length > 0) { frameworks.push(' jq-console'); }
	if ((lowerString.match(/\/jqbootstrapvalidation/g) || []).length > 0) { frameworks.push(' jqbootstrapvalidation'); }
	if ((lowerString.match(/\/jqmodal/g) || []).length > 0) { frameworks.push(' jqmodal'); }
	if ((lowerString.match(/\/jqplot/g) || []).length > 0) { frameworks.push(' jqplot'); }
	if ((lowerString.match(/\/jqcloud/g) || []).length > 0) { frameworks.push(' jqcloud'); }
	if ((lowerString.match(/\/jqgrid/g) || []).length > 0) { frameworks.push(' jqgrid'); }
	if ((lowerString.match(/\/jqlouds/g) || []).length > 0) { frameworks.push(' jqlouds'); }
	if ((lowerString.match(/\/jqplugin/g) || []).length > 0) { frameworks.push(' jqplugin'); }
	if ((lowerString.match(/\/jqtree/g) || []).length > 0) { frameworks.push(' jqtree'); }
	if ((lowerString.match(/\/jquery-ajaxqueue/g) || []).length > 0) { frameworks.push(' jquery-ajaxqueue'); }
	if ((lowerString.match(/\/jquery-ajaxchimp/g) || []).length > 0) { frameworks.push(' jquery-ajaxchimp'); }
	if ((lowerString.match(/\/jquery-ajaxtransport-xdomainrequest/g) || []).length > 0) { frameworks.push(' jquery-ajaxtransport-xdomainrequest'); }
	if ((lowerString.match(/\/jquery-ajaxy/g) || []).length > 0) { frameworks.push(' jquery-ajaxy'); }
	if ((lowerString.match(/\/jquery-autocomplete/g) || []).length > 0) { frameworks.push(' jquery-autocomplete'); }
	if ((lowerString.match(/\/jquery-backstretch/g) || []).length > 0) { frameworks.push(' jquery-backstretch'); }
	if ((lowerString.match(/\/jquery-bar-rating/g) || []).length > 0) { frameworks.push(' jquery-bar-rating'); }
	if ((lowerString.match(/\/jquery-boilerplate/g) || []).length > 0) { frameworks.push(' jquery-boilerplate'); }
	if ((lowerString.match(/\/jquery-bootgrid/g) || []).length > 0) { frameworks.push(' jquery-bootgrid'); }
	if ((lowerString.match(/\/jquery-bootpag/g) || []).length > 0) { frameworks.push(' jquery-bootpag'); }
	if ((lowerString.match(/\/jquery-browser/g) || []).length > 0) { frameworks.push(' jquery-browser'); }
	if ((lowerString.match(/\/jquery-cascading-dropdown/g) || []).length > 0) { frameworks.push(' jquery-cascading-dropdown'); }
	if ((lowerString.match(/\/jquery-chained/g) || []).length > 0) { frameworks.push(' jquery-chained'); }
	if ((lowerString.match(/\/jquery-circle-progress/g) || []).length > 0) { frameworks.push(' jquery-circle-progress'); }
	if ((lowerString.match(/\/jquery-color/g) || []).length > 0) { frameworks.push(' jquery-color'); }
	if ((lowerString.match(/\/jquery-compat/g) || []).length > 0) { frameworks.push(' jquery-compat'); }
	if ((lowerString.match(/\/jquery-confirm/g) || []).length > 0) { frameworks.push(' jquery-confirm'); }
	if ((lowerString.match(/\/jquery-contextify/g) || []).length > 0) { frameworks.push(' jquery-contextify'); }
	if ((lowerString.match(/\/jquery-contextmenu/g) || []).length > 0) { frameworks.push(' jquery-contextmenu'); }
	if ((lowerString.match(/\/jquery-cookie/g) || []).length > 0) { frameworks.push(' jquery-cookie'); }
	if ((lowerString.match(/\/jquery-countdown/g) || []).length > 0) { frameworks.push(' jquery-countdown'); }
	if ((lowerString.match(/\/jquery-csv/g) || []).length > 0) { frameworks.push(' jquery-csv'); }
	if ((lowerString.match(/\/jquery-data-remote/g) || []).length > 0) { frameworks.push(' jquery-data-remote'); }
	if ((lowerString.match(/\/jquery-date-range-picker/g) || []).length > 0) { frameworks.push(' jquery-date-range-picker'); }
	if ((lowerString.match(/\/jquery-dateformat/g) || []).length > 0) { frameworks.push(' jquery-dateformat'); }
	if ((lowerString.match(/\/jquery-datetimepicker/g) || []).length > 0) { frameworks.push(' jquery-datetimepicker'); }
	if ((lowerString.match(/\/jquery-details/g) || []).length > 0) { frameworks.push(' jquery-details'); }
	if ((lowerString.match(/\/jquery-dompath/g) || []).length > 0) { frameworks.push(' jquery-dompath'); }
	if ((lowerString.match(/\/jquery-dotimeout/g) || []).length > 0) { frameworks.push(' jquery-dotimeout'); }
	if ((lowerString.match(/\/jquery-dropdown/g) || []).length > 0) { frameworks.push(' jquery-dropdown'); }
	if ((lowerString.match(/\/jquery-easing/g) || []).length > 0) { frameworks.push(' jquery-easing'); }
	if ((lowerString.match(/\/jquery-easy-ticker/g) || []).length > 0) { frameworks.push(' jquery-easy-ticker'); }
	if ((lowerString.match(/\/jquery-expander/g) || []).length > 0) { frameworks.push(' jquery-expander'); }
	if ((lowerString.match(/\/jquery-footable/g) || []).length > 0) { frameworks.push(' jquery-footable'); }
	if ((lowerString.match(/\/jquery-form-serializer/g) || []).length > 0) { frameworks.push(' jquery-form-serializer'); }
	if ((lowerString.match(/\/jquery-form-validator/g) || []).length > 0) { frameworks.push(' jquery-form-validator'); }
	if ((lowerString.match(/\/jquery-fracs/g) || []).length > 0) { frameworks.push(' jquery-fracs'); }
	if ((lowerString.match(/\/jquery-gamequery/g) || []).length > 0) { frameworks.push(' jquery-gamequery'); }
	if ((lowerString.match(/\/jquery-handsontable/g) || []).length > 0) { frameworks.push(' jquery-handsontable'); }
	if ((lowerString.match(/\/jquery-hashchange/g) || []).length > 0) { frameworks.push(' jquery-hashchange'); }
	if ((lowerString.match(/\/jquery-history/g) || []).length > 0) { frameworks.push(' jquery-history'); }
	if ((lowerString.match(/\/jquery-i18next/g) || []).length > 0) { frameworks.push(' jquery-i18next'); }
	if ((lowerString.match(/\/jquery-idletimer/g) || []).length > 0) { frameworks.push(' jquery-idletimer'); }
	if ((lowerString.match(/\/jquery-image-upload/g) || []).length > 0) { frameworks.push(' jquery-image-upload'); }
	if ((lowerString.match(/\/jquery-impromptu/g) || []).length > 0) { frameworks.push(' jquery-impromptu'); }
	if ((lowerString.match(/\/jquery-infinitescroll/g) || []).length > 0) { frameworks.push(' jquery-infinitescroll'); }
	if ((lowerString.match(/\/jquery-instagram/g) || []).length > 0) { frameworks.push(' jquery-instagram'); }
	if ((lowerString.match(/\/jquery-jcrop/g) || []).length > 0) { frameworks.push(' jquery-jcrop'); }
	if ((lowerString.match(/\/jquery-jgrowl/g) || []).length > 0) { frameworks.push(' jquery-jgrowl'); }
	if ((lowerString.match(/\/jquery-jkit/g) || []).length > 0) { frameworks.push(' jquery-jkit'); }
	if ((lowerString.match(/\/jquery-json-editor/g) || []).length > 0) { frameworks.push(' jquery-json-editor'); }
	if ((lowerString.match(/\/jquery-json/g) || []).length > 0) { frameworks.push(' jquery-json'); }
	if ((lowerString.match(/\/jquery-jsonview/g) || []).length > 0) { frameworks.push(' jquery-jsonview'); }
	if ((lowerString.match(/\/jquery-lang-js/g) || []).length > 0) { frameworks.push(' jquery-lang-js'); }
	if ((lowerString.match(/\/jquery-layout/g) || []).length > 0) { frameworks.push(' jquery-layout'); }
	if ((lowerString.match(/\/jquery-lazyload-any/g) || []).length > 0) { frameworks.push(' jquery-lazyload-any'); }
	if ((lowerString.match(/\/jquery-localscroll/g) || []).length > 0) { frameworks.push(' jquery-localscroll'); }
	if ((lowerString.match(/\/jquery-locationpicker/g) || []).length > 0) { frameworks.push(' jquery-locationpicker'); }
	if ((lowerString.match(/\/jquery-maskmoney/g) || []).length > 0) { frameworks.push(' jquery-maskmoney'); }
	if ((lowerString.match(/\/jquery-migrate/g) || []).length > 0) { frameworks.push(' jquery-migrate'); }
	if ((lowerString.match(/\/jquery-mobile-datebox/g) || []).length > 0) { frameworks.push(' jquery-mobile-datebox'); }
	if ((lowerString.match(/\/jquery-mobile/g) || []).length > 0) { frameworks.push(' jquery-mobile'); }
	if ((lowerString.match(/\/jquery-mockjax/g) || []).length > 0) { frameworks.push(' jquery-mockjax'); }
	if ((lowerString.match(/\/jquery-modal/g) || []).length > 0) { frameworks.push(' jquery-modal'); }
	if ((lowerString.match(/\/jquery-mousewheel/g) || []).length > 0) { frameworks.push(' jquery-mousewheel'); }
	if ((lowerString.match(/\/jquery-nivoslider/g) || []).length > 0) { frameworks.push(' jquery-nivoslider'); }
	if ((lowerString.match(/\/jquery-noty/g) || []).length > 0) { frameworks.push(' jquery-noty'); }
	if ((lowerString.match(/\/jquery-nstslider/g) || []).length > 0) { frameworks.push(' jquery-nstslider'); }
	if ((lowerString.match(/\/jquery-once/g) || []).length > 0) { frameworks.push(' jquery-once'); }
	if ((lowerString.match(/\/jquery-one-page-nav/g) || []).length > 0) { frameworks.push(' jquery-one-page-nav'); }
	if ((lowerString.match(/\/jquery-orgchart/g) || []).length > 0) { frameworks.push(' jquery-orgchart'); }
	if ((lowerString.match(/\/jquery-outside-events/g) || []).length > 0) { frameworks.push(' jquery-outside-events'); }
	if ((lowerString.match(/\/jquery-overlaps/g) || []).length > 0) { frameworks.push(' jquery-overlaps'); }
	if ((lowerString.match(/\/jquery-overscroll/g) || []).length > 0) { frameworks.push(' jquery-overscroll'); }
	if ((lowerString.match(/\/jquery-parallax/g) || []).length > 0) { frameworks.push(' jquery-parallax'); }
	if ((lowerString.match(/\/jquery-placeholder/g) || []).length > 0) { frameworks.push(' jquery-placeholder'); }
	if ((lowerString.match(/\/jquery-popup-overlay/g) || []).length > 0) { frameworks.push(' jquery-popup-overlay'); }
	if ((lowerString.match(/\/jquery-powertip/g) || []).length > 0) { frameworks.push(' jquery-powertip'); }
	if ((lowerString.match(/\/jquery-price-format/g) || []).length > 0) { frameworks.push(' jquery-price-format'); }
	if ((lowerString.match(/\/jquery-prompt21/g) || []).length > 0) { frameworks.push(' jquery-prompt21'); }
	if ((lowerString.match(/\/jquery-replace-text/g) || []).length > 0) { frameworks.push(' jquery-replace-text'); }
	if ((lowerString.match(/\/jquery-requestanimationframe/g) || []).length > 0) { frameworks.push(' jquery-requestanimationframe'); }
	if ((lowerString.match(/\/jquery-resize/g) || []).length > 0) { frameworks.push(' jquery-resize'); }
	if ((lowerString.match(/\/jquery-scrollto/g) || []).length > 0) { frameworks.push(' jquery-scrollto'); }
	if ((lowerString.match(/\/jquery-scrolldepth/g) || []).length > 0) { frameworks.push(' jquery-scrolldepth'); }
	if ((lowerString.match(/\/jquery-scrollpanel/g) || []).length > 0) { frameworks.push(' jquery-scrollpanel'); }
	if ((lowerString.match(/\/jquery-scrollto/g) || []).length > 0) { frameworks.push(' jquery-scrollto'); }
	if ((lowerString.match(/\/jquery-searcher/g) || []).length > 0) { frameworks.push(' jquery-searcher'); }
	if ((lowerString.match(/\/jquery-serialize-object/g) || []).length > 0) { frameworks.push(' jquery-serialize-object'); }
	if ((lowerString.match(/\/jquery-sheetrock/g) || []).length > 0) { frameworks.push(' jquery-sheetrock'); }
	if ((lowerString.match(/\/jquery-sidebar/g) || []).length > 0) { frameworks.push(' jquery-sidebar'); }
	if ((lowerString.match(/\/jquery-simplyscroll/g) || []).length > 0) { frameworks.push(' jquery-simplyscroll'); }
	if ((lowerString.match(/\/jquery-smart-web-app-banner/g) || []).length > 0) { frameworks.push(' jquery-smart-web-app-banner'); }
	if ((lowerString.match(/\/jquery-smooth-scroll/g) || []).length > 0) { frameworks.push(' jquery-smooth-scroll'); }
	if ((lowerString.match(/\/jquery-smoove/g) || []).length > 0) { frameworks.push(' jquery-smoove'); }
	if ((lowerString.match(/\/jquery-sortable/g) || []).length > 0) { frameworks.push(' jquery-sortable'); }
	if ((lowerString.match(/\/jquery-sparklines/g) || []).length > 0) { frameworks.push(' jquery-sparklines'); }
	if ((lowerString.match(/\/jquery-steps/g) || []).length > 0) { frameworks.push(' jquery-steps'); }
	if ((lowerString.match(/\/jquery-storage-api/g) || []).length > 0) { frameworks.push(' jquery-storage-api'); }
	if ((lowerString.match(/\/jquery-tagsinput/g) || []).length > 0) { frameworks.push(' jquery-tagsinput'); }
	if ((lowerString.match(/\/jquery-te/g) || []).length > 0) { frameworks.push(' jquery-te'); }
	if ((lowerString.match(/\/jquery-textext/g) || []).length > 0) { frameworks.push(' jquery-textext'); }
	if ((lowerString.match(/\/jquery-throttle-debounce/g) || []).length > 0) { frameworks.push(' jquery-throttle-debounce'); }
	if ((lowerString.match(/\/jquery-timeago/g) || []).length > 0) { frameworks.push(' jquery-timeago'); }
	if ((lowerString.match(/\/jquery-timepicker/g) || []).length > 0) { frameworks.push(' jquery-timepicker'); }
	if ((lowerString.match(/\/jquery-tiny-pubsub/g) || []).length > 0) { frameworks.push(' jquery-tiny-pubsub'); }
	if ((lowerString.match(/\/jquery-toggles/g) || []).length > 0) { frameworks.push(' jquery-toggles'); }
	if ((lowerString.match(/\/jquery-tools/g) || []).length > 0) { frameworks.push(' jquery-tools'); }
	if ((lowerString.match(/\/jquery-touch-events/g) || []).length > 0) { frameworks.push(' jquery-touch-events'); }
	if ((lowerString.match(/\/jquery-treegrid/g) || []).length > 0) { frameworks.push(' jquery-treegrid'); }
	if ((lowerString.match(/\/jquery-treetable/g) || []).length > 0) { frameworks.push(' jquery-treetable'); }
	if ((lowerString.match(/\/jquery-tubeplayer/g) || []).length > 0) { frameworks.push(' jquery-tubeplayer'); }
	if ((lowerString.match(/\/jquery-twinkle/g) || []).length > 0) { frameworks.push(' jquery-twinkle'); }
	if ((lowerString.match(/\/jquery-ui-bootstrap/g) || []).length > 0) { frameworks.push(' jquery-ui-bootstrap'); }
	if ((lowerString.match(/\/jquery-ui-map/g) || []).length > 0) { frameworks.push(' jquery-ui-map'); }
	if ((lowerString.match(/\/jquery-ui-timepicker-addon/g) || []).length > 0) { frameworks.push(' jquery-ui-timepicker-addon'); }
	if ((lowerString.match(/\/jquery-ujs/g) || []).length > 0) { frameworks.push(' jquery-ujs'); }
	if ((lowerString.match(/\/jquery-url-parser/g) || []).length > 0) { frameworks.push(' jquery-url-parser'); }
	if ((lowerString.match(/\/jquery-validate/g) || []).length > 0) { frameworks.push(' jquery-validate'); }
	if ((lowerString.match(/\/jquery-validation-unobtrusive/g) || []).length > 0) { frameworks.push(' jquery-validation-unobtrusive'); }
	if ((lowerString.match(/\/jquery-visibility/g) || []).length > 0) { frameworks.push(' jquery-visibility'); }
	if ((lowerString.match(/\/jquery-visible/g) || []).length > 0) { frameworks.push(' jquery-visible'); }
	if ((lowerString.match(/\/jquery-weui/g) || []).length > 0) { frameworks.push(' jquery-weui'); }
	if ((lowerString.match(/\/jquery-zoom/g) || []).length > 0) { frameworks.push(' jquery-zoom'); }
	if ((lowerString.match(/\/jquery.areyousure/g) || []).length > 0) { frameworks.push(' jquery.areyousure'); }
	if ((lowerString.match(/\/jquery.spservices/g) || []).length > 0) { frameworks.push(' jquery.spservices'); }
	if ((lowerString.match(/\/jquery.activity-indicator/g) || []).length > 0) { frameworks.push(' jquery.activity-indicator'); }
	if ((lowerString.match(/\/jquery.actual/g) || []).length > 0) { frameworks.push(' jquery.actual'); }
	if ((lowerString.match(/\/jquery.address/g) || []).length > 0) { frameworks.push(' jquery.address'); }
	if ((lowerString.match(/\/jquery.age/g) || []).length > 0) { frameworks.push(' jquery.age'); }
	if ((lowerString.match(/\/jquery.allowed-chars/g) || []).length > 0) { frameworks.push(' jquery.allowed-chars'); }
	if ((lowerString.match(/\/jquery.alphanum/g) || []).length > 0) { frameworks.push(' jquery.alphanum'); }
	if ((lowerString.match(/\/jquery.appear/g) || []).length > 0) { frameworks.push(' jquery.appear'); }
	if ((lowerString.match(/\/jquery.atmosphere/g) || []).length > 0) { frameworks.push(' jquery.atmosphere'); }
	if ((lowerString.match(/\/jquery.avgrund/g) || []).length > 0) { frameworks.push(' jquery.avgrund'); }
	if ((lowerString.match(/\/jquery.ba-bbq/g) || []).length > 0) { frameworks.push(' jquery.ba-bbq'); }
	if ((lowerString.match(/\/jquery.blockui/g) || []).length > 0) { frameworks.push(' jquery.blockui'); }
	if ((lowerString.match(/\/jquery.bootstrapvalidator/g) || []).length > 0) { frameworks.push(' jquery.bootstrapvalidator'); }
	if ((lowerString.match(/\/jquery.businesshours/g) || []).length > 0) { frameworks.push(' jquery.businesshours'); }
	if ((lowerString.match(/\/jquery.caroufredsel/g) || []).length > 0) { frameworks.push(' jquery.caroufredsel'); }
	if ((lowerString.match(/\/jquery.collapsible/g) || []).length > 0) { frameworks.push(' jquery.collapsible'); }
	if ((lowerString.match(/\/jquery.colorbox/g) || []).length > 0) { frameworks.push(' jquery.colorbox'); }
	if ((lowerString.match(/\/jquery.complexify.js/g) || []).length > 0) { frameworks.push(' jquery.complexify.js'); }
	if ((lowerString.match(/\/jquery.cookiebar/g) || []).length > 0) { frameworks.push(' jquery.cookiebar'); }
	if ((lowerString.match(/\/jquery.countdown/g) || []).length > 0) { frameworks.push(' jquery.countdown'); }
	if ((lowerString.match(/\/jquery.customselect/g) || []).length > 0) { frameworks.push(' jquery.customselect'); }
	if ((lowerString.match(/\/jquery.cycle/g) || []).length > 0) { frameworks.push(' jquery.cycle'); }
	if ((lowerString.match(/\/jquery.cycle2/g) || []).length > 0) { frameworks.push(' jquery.cycle2'); }
	if ((lowerString.match(/\/jquery.devbridge-autocomplete/g) || []).length > 0) { frameworks.push(' jquery.devbridge-autocomplete'); }
	if ((lowerString.match(/\/jquery.dirtyforms.dialogs.blockui/g) || []).length > 0) { frameworks.push(' jquery.dirtyforms.dialogs.blockui'); }
	if ((lowerString.match(/\/jquery.dirtyforms.dialogs.bootstrap/g) || []).length > 0) { frameworks.push(' jquery.dirtyforms.dialogs.bootstrap'); }
	if ((lowerString.match(/\/jquery.dirtyforms.dialogs.facebox/g) || []).length > 0) { frameworks.push(' jquery.dirtyforms.dialogs.facebox'); }
	if ((lowerString.match(/\/jquery.dirtyforms.dialogs.jquery-ui/g) || []).length > 0) { frameworks.push(' jquery.dirtyforms.dialogs.jquery-ui'); }
	if ((lowerString.match(/\/jquery.dirtyforms.dialogs.pnotify/g) || []).length > 0) { frameworks.push(' jquery.dirtyforms.dialogs.pnotify'); }
	if ((lowerString.match(/\/jquery.dirtyforms.helpers.alwaysdirty/g) || []).length > 0) { frameworks.push(' jquery.dirtyforms.helpers.alwaysdirty'); }
	if ((lowerString.match(/\/jquery.dirtyforms.helpers.ckeditor/g) || []).length > 0) { frameworks.push(' jquery.dirtyforms.helpers.ckeditor'); }
	if ((lowerString.match(/\/jquery.dirtyforms.helpers.tinymce/g) || []).length > 0) { frameworks.push(' jquery.dirtyforms.helpers.tinymce'); }
	if ((lowerString.match(/\/jquery.dirtyforms/g) || []).length > 0) { frameworks.push(' jquery.dirtyforms'); }
	if ((lowerString.match(/\/jquery.downcount/g) || []).length > 0) { frameworks.push(' jquery.downcount'); }
	if ((lowerString.match(/\/jquery.dropotron/g) || []).length > 0) { frameworks.push(' jquery.dropotron'); }
	if ((lowerString.match(/\/jquery.easytabs/g) || []).length > 0) { frameworks.push(' jquery.easytabs'); }
	if ((lowerString.match(/\/jquery.fancytree/g) || []).length > 0) { frameworks.push(' jquery.fancytree'); }
	if ((lowerString.match(/\/jquery.filedownload/g) || []).length > 0) { frameworks.push(' jquery.filedownload'); }
	if ((lowerString.match(/\/jquery.finderselect/g) || []).length > 0) { frameworks.push(' jquery.finderselect'); }
	if ((lowerString.match(/\/jquery.finger/g) || []).length > 0) { frameworks.push(' jquery.finger'); }
	if ((lowerString.match(/\/jquery.form/g) || []).length > 0) { frameworks.push(' jquery.form'); }
	if ((lowerString.match(/\/jquery.formalize/g) || []).length > 0) { frameworks.push(' jquery.formalize'); }
	if ((lowerString.match(/\/jquery.formset/g) || []).length > 0) { frameworks.push(' jquery.formset'); }
	if ((lowerString.match(/\/jquery.googlemap/g) || []).length > 0) { frameworks.push(' jquery.googlemap'); }
	if ((lowerString.match(/\/jquery.gray/g) || []).length > 0) { frameworks.push(' jquery.gray'); }
	if ((lowerString.match(/\/jquery.gridster/g) || []).length > 0) { frameworks.push(' jquery.gridster'); }
	if ((lowerString.match(/\/jquery.hashcash.io/g) || []).length > 0) { frameworks.push(' jquery.hashcash.io'); }
	if ((lowerString.match(/\/jquery.hoverintent/g) || []).length > 0) { frameworks.push(' jquery.hoverintent'); }
	if ((lowerString.match(/\/jquery.html5loader/g) || []).length > 0) { frameworks.push(' jquery.html5loader'); }
	if ((lowerString.match(/\/jquery.iframe-transport/g) || []).length > 0) { frameworks.push(' jquery.iframe-transport'); }
	if ((lowerString.match(/\/jquery.iframetracker/g) || []).length > 0) { frameworks.push(' jquery.iframetracker'); }
	if ((lowerString.match(/\/jquery.imagesloaded/g) || []).length > 0) { frameworks.push(' jquery.imagesloaded'); }
	if ((lowerString.match(/\/jquery.inputmask/g) || []).length > 0) { frameworks.push(' jquery.inputmask'); }
	if ((lowerString.match(/\/jquery.inview/g) || []).length > 0) { frameworks.push(' jquery.inview'); }
	if ((lowerString.match(/\/jquery.is.js/g) || []).length > 0) { frameworks.push(' jquery.is.js'); }
	if ((lowerString.match(/\/jquery.isotope/g) || []).length > 0) { frameworks.push(' jquery.isotope'); }
	if ((lowerString.match(/\/jquery.lazy/g) || []).length > 0) { frameworks.push(' jquery.lazy'); }
	if ((lowerString.match(/\/jquery.lazyload/g) || []).length > 0) { frameworks.push(' jquery.lazyload'); }
	if ((lowerString.match(/\/jquery.lazyloadxt/g) || []).length > 0) { frameworks.push(' jquery.lazyloadxt'); }
	if ((lowerString.match(/\/jquery.lifestream/g) || []).length > 0) { frameworks.push(' jquery.lifestream'); }
	if ((lowerString.match(/\/jquery.liveurl/g) || []).length > 0) { frameworks.push(' jquery.liveurl'); }
	if ((lowerString.match(/\/jquery.mask/g) || []).length > 0) { frameworks.push(' jquery.mask'); }
	if ((lowerString.match(/\/jquery.maskedinput/g) || []).length > 0) { frameworks.push(' jquery.maskedinput'); }
	if ((lowerString.match(/\/jquery.matchheight/g) || []).length > 0) { frameworks.push(' jquery.matchheight'); }
	if ((lowerString.match(/\/jquery.mb.ytplayer/g) || []).length > 0) { frameworks.push(' jquery.mb.ytplayer'); }
	if ((lowerString.match(/\/jquery.meiomask/g) || []).length > 0) { frameworks.push(' jquery.meiomask'); }
	if ((lowerString.match(/\/jquery.mobilephonenumber/g) || []).length > 0) { frameworks.push(' jquery.mobilephonenumber'); }
	if ((lowerString.match(/\/jquery.nanoscroller/g) || []).length > 0) { frameworks.push(' jquery.nanoscroller'); }
	if ((lowerString.match(/\/jquery.nicescroll/g) || []).length > 0) { frameworks.push(' jquery.nicescroll'); }
	if ((lowerString.match(/\/jquery.notification/g) || []).length > 0) { frameworks.push(' jquery.notification'); }
	if ((lowerString.match(/\/jquery.ns-autogrow/g) || []).length > 0) { frameworks.push(' jquery.ns-autogrow'); }
	if ((lowerString.match(/\/jquery.panzoom/g) || []).length > 0) { frameworks.push(' jquery.panzoom'); }
	if ((lowerString.match(/\/jquery.payment/g) || []).length > 0) { frameworks.push(' jquery.payment'); }
	if ((lowerString.match(/\/jquery.pep/g) || []).length > 0) { frameworks.push(' jquery.pep'); }
	if ((lowerString.match(/\/jquery.percentageloader/g) || []).length > 0) { frameworks.push(' jquery.percentageloader'); }
	if ((lowerString.match(/\/jquery.perfect-scrollbar/g) || []).length > 0) { frameworks.push(' jquery.perfect-scrollbar'); }
	if ((lowerString.match(/\/jquery.photocols/g) || []).length > 0) { frameworks.push(' jquery.photocols'); }
	if ((lowerString.match(/\/jquery.pin/g) || []).length > 0) { frameworks.push(' jquery.pin'); }
	if ((lowerString.match(/\/jquery.pjax/g) || []).length > 0) { frameworks.push(' jquery.pjax'); }
	if ((lowerString.match(/\/jquery.poptrox/g) || []).length > 0) { frameworks.push(' jquery.poptrox'); }
	if ((lowerString.match(/\/jquery.postcodify/g) || []).length > 0) { frameworks.push(' jquery.postcodify'); }
	if ((lowerString.match(/\/jquery.qrcode/g) || []).length > 0) { frameworks.push(' jquery.qrcode'); }
	if ((lowerString.match(/\/jquery.quicksearch/g) || []).length > 0) { frameworks.push(' jquery.quicksearch'); }
	if ((lowerString.match(/\/jquery.rest/g) || []).length > 0) { frameworks.push(' jquery.rest'); }
	if ((lowerString.match(/\/jquery.ripples/g) || []).length > 0) { frameworks.push(' jquery.ripples'); }
	if ((lowerString.match(/\/jquery.scregal/g) || []).length > 0) { frameworks.push(' jquery.scregal'); }
	if ((lowerString.match(/\/jquery.scroll4ever/g) || []).length > 0) { frameworks.push(' jquery.scroll4ever'); }
	if ((lowerString.match(/\/jquery.scrollbar/g) || []).length > 0) { frameworks.push(' jquery.scrollbar'); }
	if ((lowerString.match(/\/jquery.selectboxit/g) || []).length > 0) { frameworks.push(' jquery.selectboxit'); }
	if ((lowerString.match(/\/jquery.selection/g) || []).length > 0) { frameworks.push(' jquery.selection'); }
	if ((lowerString.match(/\/jquery.serialscroll/g) || []).length > 0) { frameworks.push(' jquery.serialscroll'); }
	if ((lowerString.match(/\/jquery.serializejson/g) || []).length > 0) { frameworks.push(' jquery.serializejson'); }
	if ((lowerString.match(/\/jquery.shapeshift/g) || []).length > 0) { frameworks.push(' jquery.shapeshift'); }
	if ((lowerString.match(/\/jquery.simpleweather/g) || []).length > 0) { frameworks.push(' jquery.simpleweather'); }
	if ((lowerString.match(/\/jquery.smartbanner/g) || []).length > 0) { frameworks.push(' jquery.smartbanner'); }
	if ((lowerString.match(/\/jquery.smartmenus/g) || []).length > 0) { frameworks.push(' jquery.smartmenus'); }
	if ((lowerString.match(/\/jquery.socialshareprivacy/g) || []).length > 0) { frameworks.push(' jquery.socialshareprivacy'); }
	if ((lowerString.match(/\/jquery.spritely/g) || []).length > 0) { frameworks.push(' jquery.spritely'); }
	if ((lowerString.match(/\/jquery.sticky/g) || []).length > 0) { frameworks.push(' jquery.sticky'); }
	if ((lowerString.match(/\/jquery.superlabels/g) || []).length > 0) { frameworks.push(' jquery.superlabels'); }
	if ((lowerString.match(/\/jquery.swipebox/g) || []).length > 0) { frameworks.push(' jquery.swipebox'); }
	if ((lowerString.match(/\/jquery.tablesorter/g) || []).length > 0) { frameworks.push(' jquery.tablesorter'); }
	if ((lowerString.match(/\/jquery.tabslet.js/g) || []).length > 0) { frameworks.push(' jquery.tabslet.js'); }
	if ((lowerString.match(/\/jquery.terminal/g) || []).length > 0) { frameworks.push(' jquery.terminal'); }
	if ((lowerString.match(/\/jquery.textcomplete/g) || []).length > 0) { frameworks.push(' jquery.textcomplete'); }
	if ((lowerString.match(/\/jquery.tipsy/g) || []).length > 0) { frameworks.push(' jquery.tipsy'); }
	if ((lowerString.match(/\/jquery.tiptip/g) || []).length > 0) { frameworks.push(' jquery.tiptip'); }
	if ((lowerString.match(/\/jquery.tocify/g) || []).length > 0) { frameworks.push(' jquery.tocify'); }
	if ((lowerString.match(/\/jquery.touchswipe/g) || []).length > 0) { frameworks.push(' jquery.touchswipe'); }
	if ((lowerString.match(/\/jquery.transit/g) || []).length > 0) { frameworks.push(' jquery.transit'); }
	if ((lowerString.match(/\/jquery.turbolinks/g) || []).length > 0) { frameworks.push(' jquery.turbolinks'); }
	if ((lowerString.match(/\/jquery.ui-contextmenu/g) || []).length > 0) { frameworks.push(' jquery.ui-contextmenu'); }
	if ((lowerString.match(/\/jquery.waitforimages/g) || []).length > 0) { frameworks.push(' jquery.waitforimages'); }
	if ((lowerString.match(/\/jquery.wookmark/g) || []).length > 0) { frameworks.push(' jquery.wookmark'); }
	if ((lowerString.match(/\/jquery/g) || []).length > 0) { frameworks.push(' jquery'); }
	if ((lowerString.match(/\/jquery_lazyload/g) || []).length > 0) { frameworks.push(' jquery_lazyload'); }
	if ((lowerString.match(/\/jquerykeyframes/g) || []).length > 0) { frameworks.push(' jquerykeyframes'); }
	if ((lowerString.match(/\/jquerymobile-router/g) || []).length > 0) { frameworks.push(' jquerymobile-router'); }
	if ((lowerString.match(/\/jqueryui-touch-punch/g) || []).length > 0) { frameworks.push(' jqueryui-touch-punch'); }
	if ((lowerString.match(/\/jqueryui/g) || []).length > 0) { frameworks.push(' jqueryui'); }
	if ((lowerString.match(/\/jqvmap/g) || []).length > 0) { frameworks.push(' jqvmap'); }
	if ((lowerString.match(/\/js-beautify/g) || []).length > 0) { frameworks.push(' js-beautify'); }
	if ((lowerString.match(/\/js-bson/g) || []).length > 0) { frameworks.push(' js-bson'); }
	if ((lowerString.match(/\/js-cookie/g) || []).length > 0) { frameworks.push(' js-cookie'); }
	if ((lowerString.match(/\/js-data-angular/g) || []).length > 0) { frameworks.push(' js-data-angular'); }
	if ((lowerString.match(/\/js-data-firebase/g) || []).length > 0) { frameworks.push(' js-data-firebase'); }
	if ((lowerString.match(/\/js-data-http/g) || []).length > 0) { frameworks.push(' js-data-http'); }
	if ((lowerString.match(/\/js-data-localforage/g) || []).length > 0) { frameworks.push(' js-data-localforage'); }
	if ((lowerString.match(/\/js-data-localstorage/g) || []).length > 0) { frameworks.push(' js-data-localstorage'); }
	if ((lowerString.match(/\/js-data/g) || []).length > 0) { frameworks.push(' js-data'); }
	if ((lowerString.match(/\/js-joda/g) || []).length > 0) { frameworks.push(' js-joda'); }
	if ((lowerString.match(/\/js-marker-clusterer/g) || []).length > 0) { frameworks.push(' js-marker-clusterer'); }
	if ((lowerString.match(/\/js-nacl/g) || []).length > 0) { frameworks.push(' js-nacl'); }
	if ((lowerString.match(/\/js-polyfills/g) || []).length > 0) { frameworks.push(' js-polyfills'); }
	if ((lowerString.match(/\/js-scrypt/g) || []).length > 0) { frameworks.push(' js-scrypt'); }
	if ((lowerString.match(/\/js-sequence-diagrams/g) || []).length > 0) { frameworks.push(' js-sequence-diagrams'); }
	if ((lowerString.match(/\/js-sha1/g) || []).length > 0) { frameworks.push(' js-sha1'); }
	if ((lowerString.match(/\/js-sha256/g) || []).length > 0) { frameworks.push(' js-sha256'); }
	if ((lowerString.match(/\/js-sha3/g) || []).length > 0) { frameworks.push(' js-sha3'); }
	if ((lowerString.match(/\/js-sha512/g) || []).length > 0) { frameworks.push(' js-sha512'); }
	if ((lowerString.match(/\/js-signals/g) || []).length > 0) { frameworks.push(' js-signals'); }
	if ((lowerString.match(/\/js-skeleton/g) || []).length > 0) { frameworks.push(' js-skeleton'); }
	if ((lowerString.match(/\/js-url/g) || []).length > 0) { frameworks.push(' js-url'); }
	if ((lowerString.match(/\/js-yaml/g) || []).length > 0) { frameworks.push(' js-yaml'); }
	if ((lowerString.match(/\/jsplumb/g) || []).length > 0) { frameworks.push(' jsplumb'); }
	if ((lowerString.match(/\/jssha/g) || []).length > 0) { frameworks.push(' jssha'); }
	if ((lowerString.match(/\/jsbarcode/g) || []).length > 0) { frameworks.push(' jsbarcode'); }
	if ((lowerString.match(/\/jschannel/g) || []).length > 0) { frameworks.push(' jschannel'); }
	if ((lowerString.match(/\/jschardet/g) || []).length > 0) { frameworks.push(' jschardet'); }
	if ((lowerString.match(/\/jscolor/g) || []).length > 0) { frameworks.push(' jscolor'); }
	if ((lowerString.match(/\/jscroll/g) || []).length > 0) { frameworks.push(' jscroll'); }
	if ((lowerString.match(/\/jsdiff/g) || []).length > 0) { frameworks.push(' jsdiff'); }
	if ((lowerString.match(/\/jsel/g) || []).length > 0) { frameworks.push(' jsel'); }
	if ((lowerString.match(/\/jsencrypt/g) || []).length > 0) { frameworks.push(' jsencrypt'); }
	if ((lowerString.match(/\/jsface/g) || []).length > 0) { frameworks.push(' jsface'); }
	if ((lowerString.match(/\/jsfeat/g) || []).length > 0) { frameworks.push(' jsfeat'); }
	if ((lowerString.match(/\/jsfile/g) || []).length > 0) { frameworks.push(' jsfile'); }
	if ((lowerString.match(/\/jsforce/g) || []).length > 0) { frameworks.push(' jsforce'); }
	if ((lowerString.match(/\/jsgrid/g) || []).length > 0) { frameworks.push(' jsgrid'); }
	if ((lowerString.match(/\/jshashes/g) || []).length > 0) { frameworks.push(' jshashes'); }
	if ((lowerString.match(/\/jshint/g) || []).length > 0) { frameworks.push(' jshint'); }
	if ((lowerString.match(/\/jslite/g) || []).length > 0) { frameworks.push(' jslite'); }
	if ((lowerString.match(/\/jsmediatags/g) || []).length > 0) { frameworks.push(' jsmediatags'); }
	if ((lowerString.match(/\/jsmpeg/g) || []).length > 0) { frameworks.push(' jsmpeg'); }
	if ((lowerString.match(/\/jsnetworkx/g) || []).length > 0) { frameworks.push(' jsnetworkx'); }
	if ((lowerString.match(/\/jsnlog/g) || []).length > 0) { frameworks.push(' jsnlog'); }
	if ((lowerString.match(/\/json-editor/g) || []).length > 0) { frameworks.push(' json-editor'); }
	if ((lowerString.match(/\/json-formatter/g) || []).length > 0) { frameworks.push(' json-formatter'); }
	if ((lowerString.match(/\/json-mask/g) || []).length > 0) { frameworks.push(' json-mask'); }
	if ((lowerString.match(/\/json-schema-faker/g) || []).length > 0) { frameworks.push(' json-schema-faker'); }
	if ((lowerString.match(/\/json2/g) || []).length > 0) { frameworks.push(' json2'); }
	if ((lowerString.match(/\/json3/g) || []).length > 0) { frameworks.push(' json3'); }
	if ((lowerString.match(/\/json5/g) || []).length > 0) { frameworks.push(' json5'); }
	if ((lowerString.match(/\/jsondiffpatch/g) || []).length > 0) { frameworks.push(' jsondiffpatch'); }
	if ((lowerString.match(/\/jsoneditor/g) || []).length > 0) { frameworks.push(' jsoneditor'); }
	if ((lowerString.match(/\/jsonld/g) || []).length > 0) { frameworks.push(' jsonld'); }
	if ((lowerString.match(/\/jsonlint/g) || []).length > 0) { frameworks.push(' jsonlint'); }
	if ((lowerString.match(/\/jspdf-autotable/g) || []).length > 0) { frameworks.push(' jspdf-autotable'); }
	if ((lowerString.match(/\/jspdf/g) || []).length > 0) { frameworks.push(' jspdf'); }
	if ((lowerString.match(/\/jsrender/g) || []).length > 0) { frameworks.push(' jsrender'); }
	if ((lowerString.match(/\/jsrsasign/g) || []).length > 0) { frameworks.push(' jsrsasign'); }
	if ((lowerString.match(/\/jss/g) || []).length > 0) { frameworks.push(' jss'); }
	if ((lowerString.match(/\/jssip/g) || []).length > 0) { frameworks.push(' jssip'); }
	if ((lowerString.match(/\/jssor-slider/g) || []).length > 0) { frameworks.push(' jssor-slider'); }
	if ((lowerString.match(/\/jstat/g) || []).length > 0) { frameworks.push(' jstat'); }
	if ((lowerString.match(/\/jstimezonedetect/g) || []).length > 0) { frameworks.push(' jstimezonedetect'); }
	if ((lowerString.match(/\/jstree/g) || []).length > 0) { frameworks.push(' jstree'); }
	if ((lowerString.match(/\/jsts/g) || []).length > 0) { frameworks.push(' jsts'); }
	if ((lowerString.match(/\/jsurl/g) || []).length > 0) { frameworks.push(' jsurl'); }
	if ((lowerString.match(/\/jsviews/g) || []).length > 0) { frameworks.push(' jsviews'); }
	if ((lowerString.match(/\/jsxgraph/g) || []).length > 0) { frameworks.push(' jsxgraph'); }
	if ((lowerString.match(/\/jszip-utils/g) || []).length > 0) { frameworks.push(' jszip-utils'); }
	if ((lowerString.match(/\/jszip/g) || []).length > 0) { frameworks.push(' jszip'); }
	if ((lowerString.match(/\/juicer/g) || []).length > 0) { frameworks.push(' juicer'); }
	if ((lowerString.match(/\/jump.js/g) || []).length > 0) { frameworks.push(' jump.js'); }
	if ((lowerString.match(/\/just-animate/g) || []).length > 0) { frameworks.push(' just-animate'); }
	if ((lowerString.match(/\/justgage/g) || []).length > 0) { frameworks.push(' justgage'); }
	if ((lowerString.match(/\/justifiedgallery/g) || []).length > 0) { frameworks.push(' justifiedgallery'); }
	if ((lowerString.match(/\/jvectormap/g) || []).length > 0) { frameworks.push(' jvectormap'); }
	if ((lowerString.match(/\/jwerty/g) || []).length > 0) { frameworks.push(' jwerty'); }
	if ((lowerString.match(/\/jxon/g) || []).length > 0) { frameworks.push(' jxon'); }
	if ((lowerString.match(/\/kartograph-js/g) || []).length > 0) { frameworks.push(' kartograph-js'); }
	if ((lowerString.match(/\/keen-js/g) || []).length > 0) { frameworks.push(' keen-js'); }
	if ((lowerString.match(/\/kefir/g) || []).length > 0) { frameworks.push(' kefir'); }
	if ((lowerString.match(/\/kendo-ui-core/g) || []).length > 0) { frameworks.push(' kendo-ui-core'); }
	if ((lowerString.match(/\/kerning.js/g) || []).length > 0) { frameworks.push(' kerning.js'); }
	if ((lowerString.match(/\/keyboardjs/g) || []).length > 0) { frameworks.push(' keyboardjs'); }
	if ((lowerString.match(/\/keydrown/g) || []).length > 0) { frameworks.push(' keydrown'); }
	if ((lowerString.match(/\/keymage/g) || []).length > 0) { frameworks.push(' keymage'); }
	if ((lowerString.match(/\/keymaster/g) || []).length > 0) { frameworks.push(' keymaster'); }
	if ((lowerString.match(/\/keypress/g) || []).length > 0) { frameworks.push(' keypress'); }
	if ((lowerString.match(/\/kibo/g) || []).length > 0) { frameworks.push(' kibo'); }
	if ((lowerString.match(/\/kineticjs/g) || []).length > 0) { frameworks.push(' kineticjs'); }
	if ((lowerString.match(/\/kiss.animate/g) || []).length > 0) { frameworks.push(' kiss.animate'); }
	if ((lowerString.match(/\/kissui.scrollanim/g) || []).length > 0) { frameworks.push(' kissui.scrollanim'); }
	if ((lowerString.match(/\/kiwi/g) || []).length > 0) { frameworks.push(' kiwi'); }
	if ((lowerString.match(/\/klass/g) || []).length > 0) { frameworks.push(' klass'); }
	if ((lowerString.match(/\/knockback-core-stack/g) || []).length > 0) { frameworks.push(' knockback-core-stack'); }
	if ((lowerString.match(/\/knockback/g) || []).length > 0) { frameworks.push(' knockback'); }
	if ((lowerString.match(/\/knockout-bootstrap/g) || []).length > 0) { frameworks.push(' knockout-bootstrap'); }
	if ((lowerString.match(/\/knockout-delegated-events/g) || []).length > 0) { frameworks.push(' knockout-delegated-events'); }
	if ((lowerString.match(/\/knockout-kendo/g) || []).length > 0) { frameworks.push(' knockout-kendo'); }
	if ((lowerString.match(/\/knockout-paging/g) || []).length > 0) { frameworks.push(' knockout-paging'); }
	if ((lowerString.match(/\/knockout-postbox/g) || []).length > 0) { frameworks.push(' knockout-postbox'); }
	if ((lowerString.match(/\/knockout-pre-rendered/g) || []).length > 0) { frameworks.push(' knockout-pre-rendered'); }
	if ((lowerString.match(/\/knockout-sortable/g) || []).length > 0) { frameworks.push(' knockout-sortable'); }
	if ((lowerString.match(/\/knockout-validation/g) || []).length > 0) { frameworks.push(' knockout-validation'); }
	if ((lowerString.match(/\/knockout.mapping/g) || []).length > 0) { frameworks.push(' knockout.mapping'); }
	if ((lowerString.match(/\/knockout/g) || []).length > 0) { frameworks.push(' knockout'); }
	if ((lowerString.match(/\/knuth-shuffle/g) || []).length > 0) { frameworks.push(' knuth-shuffle'); }
	if ((lowerString.match(/\/kronos.js/g) || []).length > 0) { frameworks.push(' kronos.js'); }
	if ((lowerString.match(/\/kube/g) || []).length > 0) { frameworks.push(' kube'); }
	if ((lowerString.match(/\/kule.lazy/g) || []).length > 0) { frameworks.push(' kule.lazy'); }
	if ((lowerString.match(/\/kute.js/g) || []).length > 0) { frameworks.push(' kute.js'); }
	if ((lowerString.match(/\/kwargsjs/g) || []).length > 0) { frameworks.push(' kwargsjs'); }
	if ((lowerString.match(/\/l20n/g) || []).length > 0) { frameworks.push(' l20n'); }
	if ((lowerString.match(/\/label.css/g) || []).length > 0) { frameworks.push(' label.css'); }
	if ((lowerString.match(/\/labella/g) || []).length > 0) { frameworks.push(' labella'); }
	if ((lowerString.match(/\/labjs/g) || []).length > 0) { frameworks.push(' labjs'); }
	if ((lowerString.match(/\/ladda-bootstrap/g) || []).length > 0) { frameworks.push(' ladda-bootstrap'); }
	if ((lowerString.match(/\/later/g) || []).length > 0) { frameworks.push(' later'); }
	if ((lowerString.match(/\/lave\//g) || []).length > 0) { frameworks.push(' lave'); }
	if ((lowerString.match(/\/layer\//g) || []).length > 0) { frameworks.push(' layer'); }
	if ((lowerString.match(/\/layzr.js/g) || []).length > 0) { frameworks.push(' layzr.js'); }
	if ((lowerString.match(/\/lazy.js/g) || []).length > 0) { frameworks.push(' lazy.js'); }
	if ((lowerString.match(/\/lazyad-loader/g) || []).length > 0) { frameworks.push(' lazyad-loader'); }
	if ((lowerString.match(/\/lazyload/g) || []).length > 0) { frameworks.push(' lazyload'); }
	if ((lowerString.match(/\/lazyloadjs/g) || []).length > 0) { frameworks.push(' lazyloadjs'); }
	if ((lowerString.match(/\/lazysizes/g) || []).length > 0) { frameworks.push(' lazysizes'); }
	if ((lowerString.match(/\/lazyyt/g) || []).length > 0) { frameworks.push(' lazyyt'); }
	if ((lowerString.match(/\/le_js/g) || []).length > 0) { frameworks.push(' le_js'); }
	if ((lowerString.match(/\/leaflet-ajax/g) || []).length > 0) { frameworks.push(' leaflet-ajax'); }
	if ((lowerString.match(/\/leaflet-contextmenu/g) || []).length > 0) { frameworks.push(' leaflet-contextmenu'); }
	if ((lowerString.match(/\/leaflet-dvf/g) || []).length > 0) { frameworks.push(' leaflet-dvf'); }
	if ((lowerString.match(/\/leaflet-editable/g) || []).length > 0) { frameworks.push(' leaflet-editable'); }
	if ((lowerString.match(/\/leaflet-geocoder-mapzen/g) || []).length > 0) { frameworks.push(' leaflet-geocoder-mapzen'); }
	if ((lowerString.match(/\/leaflet-gpx/g) || []).length > 0) { frameworks.push(' leaflet-gpx'); }
	if ((lowerString.match(/\/leaflet-hash/g) || []).length > 0) { frameworks.push(' leaflet-hash'); }
	if ((lowerString.match(/\/leaflet-locatecontrol/g) || []).length > 0) { frameworks.push(' leaflet-locatecontrol'); }
	if ((lowerString.match(/\/leaflet-minimap/g) || []).length > 0) { frameworks.push(' leaflet-minimap'); }
	if ((lowerString.match(/\/leaflet-omnivore/g) || []).length > 0) { frameworks.push(' leaflet-omnivore'); }
	if ((lowerString.match(/\/leaflet-plugins/g) || []).length > 0) { frameworks.push(' leaflet-plugins'); }
	if ((lowerString.match(/\/leaflet-polylinedecorator/g) || []).length > 0) { frameworks.push(' leaflet-polylinedecorator'); }
	if ((lowerString.match(/\/leaflet-providers/g) || []).length > 0) { frameworks.push(' leaflet-providers'); }
	if ((lowerString.match(/\/leaflet-realtime/g) || []).length > 0) { frameworks.push(' leaflet-realtime'); }
	if ((lowerString.match(/\/leaflet-routing-machine/g) || []).length > 0) { frameworks.push(' leaflet-routing-machine'); }
	if ((lowerString.match(/\/leaflet-tilelayer-geojson/g) || []).length > 0) { frameworks.push(' leaflet-tilelayer-geojson'); }
	if ((lowerString.match(/\/leaflet-vector-layers/g) || []).length > 0) { frameworks.push(' leaflet-vector-layers'); }
	if ((lowerString.match(/\/leaflet.draw/g) || []).length > 0) { frameworks.push(' leaflet.draw'); }
	if ((lowerString.match(/\/leaflet.freedraw/g) || []).length > 0) { frameworks.push(' leaflet.freedraw'); }
	if ((lowerString.match(/\/leaflet.fullscreen/g) || []).length > 0) { frameworks.push(' leaflet.fullscreen'); }
	if ((lowerString.match(/\/leaflet.heat/g) || []).length > 0) { frameworks.push(' leaflet.heat'); }
	if ((lowerString.match(/\/leaflet.markercluster/g) || []).length > 0) { frameworks.push(' leaflet.markercluster'); }
	if ((lowerString.match(/\/leaflet/g) || []).length > 0) { frameworks.push(' leaflet'); }
	if ((lowerString.match(/\/leapjs/g) || []).length > 0) { frameworks.push(' leapjs'); }
	if ((lowerString.match(/\/legofy/g) || []).length > 0) { frameworks.push(' legofy'); }
	if ((lowerString.match(/\/legojs/g) || []).length > 0) { frameworks.push(' legojs'); }
	if ((lowerString.match(/\/lemonade/g) || []).length > 0) { frameworks.push(' lemonade'); }
	if ((lowerString.match(/\/less.js/g) || []).length > 0) { frameworks.push(' less.js'); }
	if ((lowerString.match(/\/lettering.js/g) || []).length > 0) { frameworks.push(' lettering.js'); }
	if ((lowerString.match(/\/libil/g) || []).length > 0) { frameworks.push(' libil'); }
	if ((lowerString.match(/\/libsodium-wrappers/g) || []).length > 0) { frameworks.push(' libsodium-wrappers'); }
	if ((lowerString.match(/\/lie\//g) || []).length > 0) { frameworks.push(' lie'); }
	if ((lowerString.match(/\/light7/g) || []).length > 0) { frameworks.push(' light7'); }
	if ((lowerString.match(/\/lightbox2/g) || []).length > 0) { frameworks.push(' lightbox2'); }
	if ((lowerString.match(/\/lightcase/g) || []).length > 0) { frameworks.push(' lightcase'); }
	if ((lowerString.match(/\/lightgallery/g) || []).length > 0) { frameworks.push(' lightgallery'); }
	if ((lowerString.match(/\/lightslider/g) || []).length > 0) { frameworks.push(' lightslider'); }
	if ((lowerString.match(/\/limonte-sweetalert2/g) || []).length > 0) { frameworks.push(' limonte-sweetalert2'); }
	if ((lowerString.match(/\/line-chart/g) || []).length > 0) { frameworks.push(' line-chart'); }
	if ((lowerString.match(/\/linkurious.js/g) || []).length > 0) { frameworks.push(' linkurious.js'); }
	if ((lowerString.match(/\/linq.js/g) || []).length > 0) { frameworks.push(' linq.js'); }
	if ((lowerString.match(/\/list.fuzzysearch.js/g) || []).length > 0) { frameworks.push(' list.fuzzysearch.js'); }
	if ((lowerString.match(/\/list.js/g) || []).length > 0) { frameworks.push(' list.js'); }
	if ((lowerString.match(/\/list.pagination.js/g) || []).length > 0) { frameworks.push(' list.pagination.js'); }
	if ((lowerString.match(/\/lity/g) || []).length > 0) { frameworks.push(' lity'); }
	if ((lowerString.match(/\/livescript/g) || []).length > 0) { frameworks.push(' livescript'); }
	if ((lowerString.match(/\/livestamp/g) || []).length > 0) { frameworks.push(' livestamp'); }
	if ((lowerString.match(/\/livingston-css3-mediaqueries-js/g) || []).length > 0) { frameworks.push(' livingston-css3-mediaqueries-js'); }
	if ((lowerString.match(/\/lostorage.js/g) || []).length > 0) { frameworks.push(' lostorage.js'); }
	if ((lowerString.match(/\/load.js/g) || []).length > 0) { frameworks.push(' load.js'); }
	if ((lowerString.match(/\/loaders.css/g) || []).length > 0) { frameworks.push(' loaders.css'); }
	if ((lowerString.match(/\/loadjs/g) || []).length > 0) { frameworks.push(' loadjs'); }
	if ((lowerString.match(/\/localstorage/g) || []).length > 0) { frameworks.push(' localstorage'); }
	if ((lowerString.match(/\/localforage/g) || []).length > 0) { frameworks.push(' localforage'); }
	if ((lowerString.match(/\/lockr/g) || []).length > 0) { frameworks.push(' lockr'); }
	if ((lowerString.match(/\/lodash-compat/g) || []).length > 0) { frameworks.push(' lodash-compat'); }
	if ((lowerString.match(/\/lodash-fp/g) || []).length > 0) { frameworks.push(' lodash-fp'); }
	if ((lowerString.match(/\/lodash.js/g) || []).length > 0) { frameworks.push(' lodash.js'); }
	if ((lowerString.match(/\/log4javascript/g) || []).length > 0) { frameworks.push(' log4javascript'); }
	if ((lowerString.match(/\/loglevel/g) || []).length > 0) { frameworks.push(' loglevel'); }
	if ((lowerString.match(/\/lokijs/g) || []).length > 0) { frameworks.push(' lokijs'); }
	if ((lowerString.match(/\/lory.js/g) || []).length > 0) { frameworks.push(' lory.js'); }
	if ((lowerString.match(/\/lovefield/g) || []).length > 0) { frameworks.push(' lovefield'); }
	if ((lowerString.match(/\/lrsjng.jquery-qrcode/g) || []).length > 0) { frameworks.push(' lrsjng.jquery-qrcode'); }
	if ((lowerString.match(/\/lscache/g) || []).length > 0) { frameworks.push(' lscache'); }
	if ((lowerString.match(/\/luminateextend/g) || []).length > 0) { frameworks.push(' luminateextend'); }
	if ((lowerString.match(/\/luminous-lightbox/g) || []).length > 0) { frameworks.push(' luminous-lightbox'); }
	if ((lowerString.match(/\/lumx/g) || []).length > 0) { frameworks.push(' lumx'); }
	if ((lowerString.match(/\/lunr.js/g) || []).length > 0) { frameworks.push(' lunr.js'); }
	if ((lowerString.match(/\/lz-string/g) || []).length > 0) { frameworks.push(' lz-string'); }
	if ((lowerString.match(/\/m8tro-bootstrap/g) || []).length > 0) { frameworks.push(' m8tro-bootstrap'); }
	if ((lowerString.match(/\/mach\//g) || []).length > 0) { frameworks.push(' mach'); }
	if ((lowerString.match(/\/machina.js/g) || []).length > 0) { frameworks.push(' machina.js'); }
	if ((lowerString.match(/\/machineboy2045-angular-selectize2/g) || []).length > 0) { frameworks.push(' machineboy2045-angular-selectize2'); }
	if ((lowerString.match(/\/magic/g) || []).length > 0) { frameworks.push(' magic'); }
	if ((lowerString.match(/\/magicsuggest/g) || []).length > 0) { frameworks.push(' magicsuggest'); }
	if ((lowerString.match(/\/magnific-popup.js/g) || []).length > 0) { frameworks.push(' magnific-popup.js'); }
	if ((lowerString.match(/\/mailcheck/g) || []).length > 0) { frameworks.push(' mailcheck'); }
	if ((lowerString.match(/\/malihu-custom-scrollbar-plugin/g) || []).length > 0) { frameworks.push(' malihu-custom-scrollbar-plugin'); }
	if ((lowerString.match(/\/maplace-js/g) || []).length > 0) { frameworks.push(' maplace-js'); }
	if ((lowerString.match(/\/maple.js/g) || []).length > 0) { frameworks.push(' maple.js'); }
	if ((lowerString.match(/\/maquette/g) || []).length > 0) { frameworks.push(' maquette'); }
	if ((lowerString.match(/\/marginotes/g) || []).length > 0) { frameworks.push(' marginotes'); }
	if ((lowerString.match(/\/mark.js/g) || []).length > 0) { frameworks.push(' mark.js'); }
	if ((lowerString.match(/\/markdown-it-emoji/g) || []).length > 0) { frameworks.push(' markdown-it-emoji'); }
	if ((lowerString.match(/\/markdown-it-footnote/g) || []).length > 0) { frameworks.push(' markdown-it-footnote'); }
	if ((lowerString.match(/\/markdown-it/g) || []).length > 0) { frameworks.push(' markdown-it'); }
	if ((lowerString.match(/\/markdown.js/g) || []).length > 0) { frameworks.push(' markdown.js'); }
	if ((lowerString.match(/\/marked/g) || []).length > 0) { frameworks.push(' marked'); }
	if ((lowerString.match(/\/marker-animate-unobtrusive/g) || []).length > 0) { frameworks.push(' marker-animate-unobtrusive'); }
	if ((lowerString.match(/marketo/g) || []).length > 0) { frameworks.push(' marketo'); }
	if ((lowerString.match(/\/marx/g) || []).length > 0) { frameworks.push(' marx'); }
	if ((lowerString.match(/\/masonry/g) || []).length > 0) { frameworks.push(' masonry'); }
	if ((lowerString.match(/\/matchmedia-ng/g) || []).length > 0) { frameworks.push(' matchmedia-ng'); }
	if ((lowerString.match(/\/material-colors/g) || []).length > 0) { frameworks.push(' material-colors'); }
	if ((lowerString.match(/\/material-design-iconic-font/g) || []).length > 0) { frameworks.push(' material-design-iconic-font'); }
	if ((lowerString.match(/\/material-design-icons/g) || []).length > 0) { frameworks.push(' material-design-icons'); }
	if ((lowerString.match(/\/material-design-lite/g) || []).length > 0) { frameworks.push(' material-design-lite'); }
	if ((lowerString.match(/\/materialize/g) || []).length > 0) { frameworks.push(' materialize'); }
	if ((lowerString.match(/\/mathjax/g) || []).length > 0) { frameworks.push(' mathjax'); }
	if ((lowerString.match(/\/mathjs/g) || []).length > 0) { frameworks.push(' mathjs'); }
	if ((lowerString.match(/\/matreshka/g) || []).length > 0) { frameworks.push(' matreshka'); }
	if ((lowerString.match(/\/matter-js/g) || []).length > 0) { frameworks.push(' matter-js'); }
	if ((lowerString.match(/\/mdbootstrap/g) || []).length > 0) { frameworks.push(' mdbootstrap'); }
	if ((lowerString.match(/\/mediaelement/g) || []).length > 0) { frameworks.push(' mediaelement'); }
	if ((lowerString.match(/\/medium-editor-custom-html/g) || []).length > 0) { frameworks.push(' medium-editor-custom-html'); }
	if ((lowerString.match(/\/medium-editor/g) || []).length > 0) { frameworks.push(' medium-editor'); }
	if ((lowerString.match(/\/melonjs/g) || []).length > 0) { frameworks.push(' melonjs'); }
	if ((lowerString.match(/\/memoizejs/g) || []).length > 0) { frameworks.push(' memoizejs'); }
	if ((lowerString.match(/\/meny/g) || []).length > 0) { frameworks.push(' meny'); }
	if ((lowerString.match(/\/mercury/g) || []).length > 0) { frameworks.push(' mercury'); }
	if ((lowerString.match(/\/mermaid/g) || []).length > 0) { frameworks.push(' mermaid'); }
	if ((lowerString.match(/\/meshki/g) || []).length > 0) { frameworks.push(' meshki'); }
	if ((lowerString.match(/\/messageformat/g) || []).length > 0) { frameworks.push(' messageformat'); }
	if ((lowerString.match(/\/messenger/g) || []).length > 0) { frameworks.push(' messenger'); }
	if ((lowerString.match(/\/metismenu/g) || []).length > 0) { frameworks.push(' metismenu'); }
	if ((lowerString.match(/\/metrics-graphics/g) || []).length > 0) { frameworks.push(' metrics-graphics'); }
	if ((lowerString.match(/\/metro/g) || []).length > 0) { frameworks.push(' metro'); }
	if ((lowerString.match(/\/meyer-reset/g) || []).length > 0) { frameworks.push(' meyer-reset'); }
	if ((lowerString.match(/\/mhayes-twentytwenty/g) || []).length > 0) { frameworks.push(' mhayes-twentytwenty'); }
	if ((lowerString.match(/\/microbejs/g) || []).length > 0) { frameworks.push(' microbejs'); }
	if ((lowerString.match(/\/micromustache/g) || []).length > 0) { frameworks.push(' micromustache'); }
	if ((lowerString.match(/\/midi.js/g) || []).length > 0) { frameworks.push(' midi.js'); }
	if ((lowerString.match(/\/midnight.js/g) || []).length > 0) { frameworks.push(' midnight.js'); }
	if ((lowerString.match(/\/milligram/g) || []).length > 0) { frameworks.push(' milligram'); }
	if ((lowerString.match(/\/min.js/g) || []).length > 0) { frameworks.push(' min.js'); }
	if ((lowerString.match(/\/min\//g) || []).length > 0) { frameworks.push(' min'); }
	if ((lowerString.match(/\/mindb/g) || []).length > 0) { frameworks.push(' mindb'); }
	if ((lowerString.match(/\/mini-meteor/g) || []).length > 0) { frameworks.push(' mini-meteor'); }
	if ((lowerString.match(/\/minitip/g) || []).length > 0) { frameworks.push(' minitip'); }
	if ((lowerString.match(/\/minicart/g) || []).length > 0) { frameworks.push(' minicart'); }
	if ((lowerString.match(/\/minifill/g) || []).length > 0) { frameworks.push(' minifill'); }
	if ((lowerString.match(/\/minigrid/g) || []).length > 0) { frameworks.push(' minigrid'); }
	if ((lowerString.match(/\/minimap/g) || []).length > 0) { frameworks.push(' minimap'); }
	if ((lowerString.match(/\/minitranslate/g) || []).length > 0) { frameworks.push(' minitranslate'); }
	if ((lowerString.match(/\/mistic100-bootstrap-confirmation/g) || []).length > 0) { frameworks.push(' mistic100-bootstrap-confirmation'); }
	if ((lowerString.match(/\/mithril/g) || []).length > 0) { frameworks.push(' mithril'); }
	if ((lowerString.match(/\/mixitup/g) || []).length > 0) { frameworks.push(' mixitup'); }
	if ((lowerString.match(/\/mo-js/g) || []).length > 0) { frameworks.push(' mo-js'); }
	if ((lowerString.match(/\/mo\//g) || []).length > 0) { frameworks.push(' mo'); }
	if ((lowerString.match(/\/mobi.css/g) || []).length > 0) { frameworks.push(' mobi.css'); }
	if ((lowerString.match(/\/mobile-detect/g) || []).length > 0) { frameworks.push(' mobile-detect'); }
	if ((lowerString.match(/\/mobilebone/g) || []).length > 0) { frameworks.push(' mobilebone'); }
	if ((lowerString.match(/\/mobilizejs/g) || []).length > 0) { frameworks.push(' mobilizejs'); }
	if ((lowerString.match(/\/mobx/g) || []).length > 0) { frameworks.push(' mobx'); }
	if ((lowerString.match(/\/mocha/g) || []).length > 0) { frameworks.push(' mocha'); }
	if ((lowerString.match(/\/modernizr/g) || []).length > 0) { frameworks.push(' modernizr'); }
	if ((lowerString.match(/\/mogl/g) || []).length > 0) { frameworks.push(' mogl'); }
	if ((lowerString.match(/\/mojio-js/g) || []).length > 0) { frameworks.push(' mojio-js'); }
	if ((lowerString.match(/\/moment-duration-format/g) || []).length > 0) { frameworks.push(' moment-duration-format'); }
	if ((lowerString.match(/\/moment-range/g) || []).length > 0) { frameworks.push(' moment-range'); }
	if ((lowerString.match(/\/moment-timezone/g) || []).length > 0) { frameworks.push(' moment-timezone'); }
	if ((lowerString.match(/\/moment.js/g) || []).length > 0) { frameworks.push(' moment.js'); }
	if ((lowerString.match(/\/money.js/g) || []).length > 0) { frameworks.push(' money.js'); }
	if ((lowerString.match(/\/monkberry-standalone/g) || []).length > 0) { frameworks.push(' monkberry-standalone'); }
	if ((lowerString.match(/\/monkberry/g) || []).length > 0) { frameworks.push(' monkberry'); }
	if ((lowerString.match(/\/mootools-more/g) || []).length > 0) { frameworks.push(' mootools-more'); }
	if ((lowerString.match(/\/mootools/g) || []).length > 0) { frameworks.push(' mootools'); }
	if ((lowerString.match(/\/mori\//g) || []).length > 0) { frameworks.push(' mori'); }
	if ((lowerString.match(/\/morpheus/g) || []).length > 0) { frameworks.push(' morpheus'); }
	if ((lowerString.match(/\/morris.js/g) || []).length > 0) { frameworks.push(' morris.js'); }
	if ((lowerString.match(/\/motajs/g) || []).length > 0) { frameworks.push(' motajs'); }
	if ((lowerString.match(/\/motio/g) || []).length > 0) { frameworks.push(' motio'); }
	if ((lowerString.match(/\/motion-ui/g) || []).length > 0) { frameworks.push(' motion-ui'); }
	if ((lowerString.match(/\/motion.js/g) || []).length > 0) { frameworks.push(' motion.js'); }
	if ((lowerString.match(/\/mouse0270-bootstrap-notify/g) || []).length > 0) { frameworks.push(' mouse0270-bootstrap-notify'); }
	if ((lowerString.match(/\/mousetrap/g) || []).length > 0) { frameworks.push(' mousetrap'); }
	if ((lowerString.match(/\/move.js/g) || []).length > 0) { frameworks.push(' move.js'); }
	if ((lowerString.match(/\/moviedb/g) || []).length > 0) { frameworks.push(' moviedb'); }
	if ((lowerString.match(/\/msgpack-lite/g) || []).length > 0) { frameworks.push(' msgpack-lite'); }
	if ((lowerString.match(/\/msgpack5/g) || []).length > 0) { frameworks.push(' msgpack5'); }
	if ((lowerString.match(/\/msl-client-browser/g) || []).length > 0) { frameworks.push(' msl-client-browser'); }
	if ((lowerString.match(/\/msngr/g) || []).length > 0) { frameworks.push(' msngr'); }
	if ((lowerString.match(/\/mu\//g) || []).length > 0) { frameworks.push(' mu'); }
	if ((lowerString.match(/\/multi-select/g) || []).length > 0) { frameworks.push(' multi-select'); }
	if ((lowerString.match(/\/multiple-select/g) || []).length > 0) { frameworks.push(' multiple-select'); }
	if ((lowerString.match(/\/multiple.js/g) || []).length > 0) { frameworks.push(' multiple.js'); }
	if ((lowerString.match(/\/multiscroll.js/g) || []).length > 0) { frameworks.push(' multiscroll.js'); }
	if ((lowerString.match(/\/multiselect/g) || []).length > 0) { frameworks.push(' multiselect'); }
	if ((lowerString.match(/\/musicmetadata/g) || []).length > 0) { frameworks.push(' musicmetadata'); }
	if ((lowerString.match(/\/mustache.js/g) || []).length > 0) { frameworks.push(' mustache.js'); }
	if ((lowerString.match(/\/mvw-injection/g) || []).length > 0) { frameworks.push(' mvw-injection'); }
	if ((lowerString.match(/\/myscript/g) || []).length > 0) { frameworks.push(' myscript'); }
	if ((lowerString.match(/\/najaxjs/g) || []).length > 0) { frameworks.push(' najaxjs'); }
	if ((lowerString.match(/\/nanobar/g) || []).length > 0) { frameworks.push(' nanobar'); }
	if ((lowerString.match(/\/nanogallery/g) || []).length > 0) { frameworks.push(' nanogallery'); }
	if ((lowerString.match(/\/native-promise-only/g) || []).length > 0) { frameworks.push(' native-promise-only'); }
	if ((lowerString.match(/\/nedb/g) || []).length > 0) { frameworks.push(' nedb'); }
	if ((lowerString.match(/\/neo-async/g) || []).length > 0) { frameworks.push(' neo-async'); }
	if ((lowerString.match(/\/nes\//g) || []).length > 0) { frameworks.push(' nes'); }
	if ((lowerString.match(/\/nestedsortable/g) || []).length > 0) { frameworks.push(' nestedsortable'); }
	if ((lowerString.match(/\/ng-ckeditor/g) || []).length > 0) { frameworks.push(' ng-ckeditor'); }
	if ((lowerString.match(/\/ng-clip/g) || []).length > 0) { frameworks.push(' ng-clip'); }
	if ((lowerString.match(/\/ng-context-menu/g) || []).length > 0) { frameworks.push(' ng-context-menu'); }
	if ((lowerString.match(/\/ng-cordova/g) || []).length > 0) { frameworks.push(' ng-cordova'); }
	if ((lowerString.match(/\/ng-csv/g) || []).length > 0) { frameworks.push(' ng-csv'); }
	if ((lowerString.match(/\/ng-currency/g) || []).length > 0) { frameworks.push(' ng-currency'); }
	if ((lowerString.match(/\/ng-dialog/g) || []).length > 0) { frameworks.push(' ng-dialog'); }
	if ((lowerString.match(/\/ng-droplet/g) || []).length > 0) { frameworks.push(' ng-droplet'); }
	if ((lowerString.match(/\/ng-embed/g) || []).length > 0) { frameworks.push(' ng-embed'); }
	if ((lowerString.match(/\/ng-fittext/g) || []).length > 0) { frameworks.push(' ng-fittext'); }
	if ((lowerString.match(/\/ng-flow/g) || []).length > 0) { frameworks.push(' ng-flow'); }
	if ((lowerString.match(/\/ng-grid/g) || []).length > 0) { frameworks.push(' ng-grid'); }
	if ((lowerString.match(/\/ng-i18next/g) || []).length > 0) { frameworks.push(' ng-i18next'); }
	if ((lowerString.match(/\/ng-idle/g) || []).length > 0) { frameworks.push(' ng-idle'); }
	if ((lowerString.match(/\/ng-img-crop/g) || []).length > 0) { frameworks.push(' ng-img-crop'); }
	if ((lowerString.match(/\/ng-knob/g) || []).length > 0) { frameworks.push(' ng-knob'); }
	if ((lowerString.match(/\/ng-meta/g) || []).length > 0) { frameworks.push(' ng-meta'); }
	if ((lowerString.match(/\/ng-parallax/g) || []).length > 0) { frameworks.push(' ng-parallax'); }
	if ((lowerString.match(/\/ng-pdfviewer/g) || []).length > 0) { frameworks.push(' ng-pdfviewer'); }
	if ((lowerString.match(/\/ng-quill/g) || []).length > 0) { frameworks.push(' ng-quill'); }
	if ((lowerString.match(/\/ng-showdown/g) || []).length > 0) { frameworks.push(' ng-showdown'); }
	if ((lowerString.match(/\/ng-slider/g) || []).length > 0) { frameworks.push(' ng-slider'); }
	if ((lowerString.match(/\/ng-sortable/g) || []).length > 0) { frameworks.push(' ng-sortable'); }
	if ((lowerString.match(/\/ng-table/g) || []).length > 0) { frameworks.push(' ng-table'); }
	if ((lowerString.match(/\/ng-tags-input/g) || []).length > 0) { frameworks.push(' ng-tags-input'); }
	if ((lowerString.match(/\/ng-tasty/g) || []).length > 0) { frameworks.push(' ng-tasty'); }
	if ((lowerString.match(/\/ng-token-auth/g) || []).length > 0) { frameworks.push(' ng-token-auth'); }
	if ((lowerString.match(/\/ng-wig/g) || []).length > 0) { frameworks.push(' ng-wig'); }
	if ((lowerString.match(/\/ng.ckeditor/g) || []).length > 0) { frameworks.push(' ng.ckeditor'); }
	if ((lowerString.match(/\/ng2-bootstrap/g) || []).length > 0) { frameworks.push(' ng2-bootstrap'); }
	if ((lowerString.match(/\/ng2-formly/g) || []).length > 0) { frameworks.push(' ng2-formly'); }
	if ((lowerString.match(/\/nganalytics/g) || []).length > 0) { frameworks.push(' nganalytics'); }
	if ((lowerString.match(/\/ngcart/g) || []).length > 0) { frameworks.push(' ngcart'); }
	if ((lowerString.match(/\/ngdraggable/g) || []).length > 0) { frameworks.push(' ngdraggable'); }
	if ((lowerString.match(/\/nghandsontable/g) || []).length > 0) { frameworks.push(' nghandsontable'); }
	if ((lowerString.match(/\/nginfinitescroll/g) || []).length > 0) { frameworks.push(' nginfinitescroll'); }
	if ((lowerString.match(/\/ngmask/g) || []).length > 0) { frameworks.push(' ngmask'); }
	if ((lowerString.match(/\/ngofficeuifabric/g) || []).length > 0) { frameworks.push(' ngofficeuifabric'); }
	if ((lowerString.match(/\/ngstorage/g) || []).length > 0) { frameworks.push(' ngstorage'); }
	if ((lowerString.match(/\/ngn-chassis-components/g) || []).length > 0) { frameworks.push(' ngn-chassis-components'); }
	if ((lowerString.match(/\/ngprogress/g) || []).length > 0) { frameworks.push(' ngprogress'); }
	if ((lowerString.match(/\/ngreact/g) || []).length > 0) { frameworks.push(' ngreact'); }
	if ((lowerString.match(/\/nice-validator/g) || []).length > 0) { frameworks.push(' nice-validator'); }
	if ((lowerString.match(/\/ninjaui/g) || []).length > 0) { frameworks.push(' ninjaui'); }
	if ((lowerString.match(/\/nlp_compromise/g) || []).length > 0) { frameworks.push(' nlp_compromise'); }
	if ((lowerString.match(/\/nouislider/g) || []).length > 0) { frameworks.push(' nouislider'); }
	if ((lowerString.match(/\/nod\//g) || []).length > 0) { frameworks.push(' nod'); }
	if ((lowerString.match(/\/node-uuid/g) || []).length > 0) { frameworks.push(' node-uuid'); }
	if ((lowerString.match(/\/node-waves/g) || []).length > 0) { frameworks.push(' node-waves'); }
	if ((lowerString.match(/\/noisy/g) || []).length > 0) { frameworks.push(' noisy'); }
	if ((lowerString.match(/\/nomnoml/g) || []).length > 0) { frameworks.push(' nomnoml'); }
	if ((lowerString.match(/\/normalize/g) || []).length > 0) { frameworks.push(' normalize'); }
	if ((lowerString.match(/\/noti.js/g) || []).length > 0) { frameworks.push(' noti.js'); }
	if ((lowerString.match(/\/notie/g) || []).length > 0) { frameworks.push(' notie'); }
	if ((lowerString.match(/\/notificon/g) || []).length > 0) { frameworks.push(' notificon'); }
	if ((lowerString.match(/\/notifxi/g) || []).length > 0) { frameworks.push(' notifxi'); }
	if ((lowerString.match(/\/notify.js/g) || []).length > 0) { frameworks.push(' notify.js'); }
	if ((lowerString.match(/\/notify/g) || []).length > 0) { frameworks.push(' notify'); }
	if ((lowerString.match(/\/nprogress/g) || []).length > 0) { frameworks.push(' nprogress'); }
	if ((lowerString.match(/\/ns-popover/g) || []).length > 0) { frameworks.push(' ns-popover'); }
	if ((lowerString.match(/\/nuclear-js/g) || []).length > 0) { frameworks.push(' nuclear-js'); }
	if ((lowerString.match(/\/numbro/g) || []).length > 0) { frameworks.push(' numbro'); }
	if ((lowerString.match(/\/numeral.js/g) || []).length > 0) { frameworks.push(' numeral.js'); }
	if ((lowerString.match(/\/numeric/g) || []).length > 0) { frameworks.push(' numeric'); }
	if ((lowerString.match(/\/nunjucks/g) || []).length > 0) { frameworks.push(' nunjucks'); }
	if ((lowerString.match(/\/nvd3/g) || []).length > 0) { frameworks.push(' nvd3'); }
	if ((lowerString.match(/\/nviewjs/g) || []).length > 0) { frameworks.push(' nviewjs'); }
	if ((lowerString.match(/\/nwmatcher/g) || []).length > 0) { frameworks.push(' nwmatcher'); }
	if ((lowerString.match(/\/oauth-io/g) || []).length > 0) { frameworks.push(' oauth-io'); }
	if ((lowerString.match(/\/object-fit/g) || []).length > 0) { frameworks.push(' object-fit'); }
	if ((lowerString.match(/\/object-observe/g) || []).length > 0) { frameworks.push(' object-observe'); }
	if ((lowerString.match(/\/oboe.js/g) || []).length > 0) { frameworks.push(' oboe.js'); }
	if ((lowerString.match(/\/ocanvas/g) || []).length > 0) { frameworks.push(' ocanvas'); }
	if ((lowerString.match(/\/oclazyload/g) || []).length > 0) { frameworks.push(' oclazyload'); }
	if ((lowerString.match(/\/octicons/g) || []).length > 0) { frameworks.push(' octicons'); }
	if ((lowerString.match(/\/odometer.js/g) || []).length > 0) { frameworks.push(' odometer.js'); }
	if ((lowerString.match(/\/offline-js/g) || []).length > 0) { frameworks.push(' offline-js'); }
	if ((lowerString.match(/\/oidc-client/g) || []).length > 0) { frameworks.push(' oidc-client'); }
	if ((lowerString.match(/\/oj.aceeditor/g) || []).length > 0) { frameworks.push(' oj.aceeditor'); }
	if ((lowerString.match(/\/oj.githubbutton/g) || []).length > 0) { frameworks.push(' oj.githubbutton'); }
	if ((lowerString.match(/\/oj.jsfiddle/g) || []).length > 0) { frameworks.push(' oj.jsfiddle'); }
	if ((lowerString.match(/\/oj.twitterbutton/g) || []).length > 0) { frameworks.push(' oj.twitterbutton'); }
	if ((lowerString.match(/\/oj.vimeovideo/g) || []).length > 0) { frameworks.push(' oj.vimeovideo'); }
	if ((lowerString.match(/\/oj.youtubevideo/g) || []).length > 0) { frameworks.push(' oj.youtubevideo'); }
	if ((lowerString.match(/\/oj.markdown/g) || []).length > 0) { frameworks.push(' oj.markdown'); }
	if ((lowerString.match(/\/oj.mustache/g) || []).length > 0) { frameworks.push(' oj.mustache'); }
	if ((lowerString.match(/\/oj\//g) || []).length > 0) { frameworks.push(' oj'); }
	if ((lowerString.match(/\/okaynav/g) || []).length > 0) { frameworks.push(' okaynav'); }
	if ((lowerString.match(/\/ol3\//g) || []).length > 0) { frameworks.push(' ol3'); }
	if ((lowerString.match(/\/omniscient/g) || []).length > 0) { frameworks.push(' omniscient'); }
	if ((lowerString.match(/omniture/g) || []).length > 0) { frameworks.push(' omniture'); }
	if ((lowerString.match(/\/onecolor/g) || []).length > 0) { frameworks.push(' onecolor'); }
	if ((lowerString.match(/\/onepage-scroll/g) || []).length > 0) { frameworks.push(' onepage-scroll'); }
	if ((lowerString.match(/\/onsen/g) || []).length > 0) { frameworks.push(' onsen'); }
	if ((lowerString.match(/\/opal-jquery/g) || []).length > 0) { frameworks.push(' opal-jquery'); }
	if ((lowerString.match(/\/opal-parser/g) || []).length > 0) { frameworks.push(' opal-parser'); }
	if ((lowerString.match(/\/opal\//g) || []).length > 0) { frameworks.push(' opal'); }
	if ((lowerString.match(/\/openajax-hub/g) || []).length > 0) { frameworks.push(' openajax-hub'); }
	if ((lowerString.match(/\/openlayers/g) || []).length > 0) { frameworks.push(' openlayers'); }
	if ((lowerString.match(/\/openlocationcode/g) || []).length > 0) { frameworks.push(' openlocationcode'); }
	if ((lowerString.match(/\/openpgp/g) || []).length > 0) { frameworks.push(' openpgp'); }
	if ((lowerString.match(/\/opentip/g) || []).length > 0) { frameworks.push(' opentip'); }
	if ((lowerString.match(/\/opentype.js/g) || []).length > 0) { frameworks.push(' opentype.js'); }
	if ((lowerString.match(/\/operative/g) || []).length > 0) { frameworks.push(' operative'); }
	if ((lowerString.match(/\/oppia/g) || []).length > 0) { frameworks.push(' oppia'); }
	if ((lowerString.match(/\/optimal-select/g) || []).length > 0) { frameworks.push(' optimal-select'); }
	if ((lowerString.match(/\/orb\//g) || []).length > 0) { frameworks.push(' orb'); }
	if ((lowerString.match(/\/ornajs/g) || []).length > 0) { frameworks.push(' ornajs'); }
	if ((lowerString.match(/\/ot.js/g) || []).length > 0) { frameworks.push(' ot.js'); }
	if ((lowerString.match(/\/ouibounce/g) || []).length > 0) { frameworks.push(' ouibounce'); }
	if ((lowerString.match(/\/outdated-browser/g) || []).length > 0) { frameworks.push(' outdated-browser'); }
	if ((lowerString.match(/\/overthrow/g) || []).length > 0) { frameworks.push(' overthrow'); }
	if ((lowerString.match(/\/owl-carousel/g) || []).length > 0) { frameworks.push(' owl-carousel'); }
	if ((lowerString.match(/\/oz.js/g) || []).length > 0) { frameworks.push(' oz.js'); }
	if ((lowerString.match(/\/p2.js/g) || []).length > 0) { frameworks.push(' p2.js'); }
	if ((lowerString.match(/\/p5.js/g) || []).length > 0) { frameworks.push(' p5.js'); }
	if ((lowerString.match(/\/pablo/g) || []).length > 0) { frameworks.push(' pablo'); }
	if ((lowerString.match(/\/pace\//g) || []).length > 0) { frameworks.push(' pace'); }
	if ((lowerString.match(/\/packery/g) || []).length > 0) { frameworks.push(' packery'); }
	if ((lowerString.match(/\/page.js/g) || []).length > 0) { frameworks.push(' page.js'); }
	if ((lowerString.match(/\/pagedown/g) || []).length > 0) { frameworks.push(' pagedown'); }
	if ((lowerString.match(/\/pagex/g) || []).length > 0) { frameworks.push(' pagex'); }
	if ((lowerString.match(/\/paho-mqtt/g) || []).length > 0) { frameworks.push(' paho-mqtt'); }
	if ((lowerString.match(/\/pako\//g) || []).length > 0) { frameworks.push(' pako'); }
	if ((lowerString.match(/\/pangu/g) || []).length > 0) { frameworks.push(' pangu'); }
	if ((lowerString.match(/\/paper.js/g) || []).length > 0) { frameworks.push(' paper.js'); }
	if ((lowerString.match(/\/papier/g) || []).length > 0) { frameworks.push(' papier'); }
	if ((lowerString.match(/\/paradeiser/g) || []).length > 0) { frameworks.push(' paradeiser'); }
	if ((lowerString.match(/\/parallax.js/g) || []).length > 0) { frameworks.push(' parallax.js'); }
	if ((lowerString.match(/\/parallax/g) || []).length > 0) { frameworks.push(' parallax'); }
	if ((lowerString.match(/\/parsley.js/g) || []).length > 0) { frameworks.push(' parsley.js'); }
	if ((lowerString.match(/\/particle-api-js/g) || []).length > 0) { frameworks.push(' particle-api-js'); }
	if ((lowerString.match(/\/particles.js/g) || []).length > 0) { frameworks.push(' particles.js'); }
	if ((lowerString.match(/\/path.js/g) || []).length > 0) { frameworks.push(' path.js'); }
	if ((lowerString.match(/\/patternfly/g) || []).length > 0) { frameworks.push(' patternfly'); }
	if ((lowerString.match(/\/pavilion/g) || []).length > 0) { frameworks.push(' pavilion'); }
	if ((lowerString.match(/\/paymentfont/g) || []).length > 0) { frameworks.push(' paymentfont'); }
	if ((lowerString.match(/\/paypaljsbuttons/g) || []).length > 0) { frameworks.push(' paypaljsbuttons'); }
	if ((lowerString.match(/\/pdf.js/g) || []).length > 0) { frameworks.push(' pdf.js'); }
	if ((lowerString.match(/\/pdfmake/g) || []).length > 0) { frameworks.push(' pdfmake'); }
	if ((lowerString.match(/\/pdfobject/g) || []).length > 0) { frameworks.push(' pdfobject'); }
	if ((lowerString.match(/\/peerjs/g) || []).length > 0) { frameworks.push(' peerjs'); }
	if ((lowerString.match(/\/pegasus/g) || []).length > 0) { frameworks.push(' pegasus'); }
	if ((lowerString.match(/\/pegjs/g) || []).length > 0) { frameworks.push(' pegjs'); }
	if ((lowerString.match(/\/peity/g) || []).length > 0) { frameworks.push(' peity'); }
	if ((lowerString.match(/\/perfbar/g) || []).length > 0) { frameworks.push(' perfbar'); }
	if ((lowerString.match(/\/perfundo/g) || []).length > 0) { frameworks.push(' perfundo'); }
	if ((lowerString.match(/\/persian.js/g) || []).length > 0) { frameworks.push(' persian.js'); }
	if ((lowerString.match(/\/phaser/g) || []).length > 0) { frameworks.push(' phaser'); }
	if ((lowerString.match(/\/photo-editor/g) || []).length > 0) { frameworks.push(' photo-editor'); }
	if ((lowerString.match(/\/photobox/g) || []).length > 0) { frameworks.push(' photobox'); }
	if ((lowerString.match(/\/photoset-grid/g) || []).length > 0) { frameworks.push(' photoset-grid'); }
	if ((lowerString.match(/\/photoswipe/g) || []).length > 0) { frameworks.push(' photoswipe'); }
	if ((lowerString.match(/\/pica\//g) || []).length > 0) { frameworks.push(' pica'); }
	if ((lowerString.match(/\/pickadate.js/g) || []).length > 0) { frameworks.push(' pickadate.js'); }
	if ((lowerString.match(/\/pickout/g) || []).length > 0) { frameworks.push(' pickout'); }
	if ((lowerString.match(/\/picnic/g) || []).length > 0) { frameworks.push(' picnic'); }
	if ((lowerString.match(/\/picturefill/g) || []).length > 0) { frameworks.push(' picturefill'); }
	if ((lowerString.match(/\/pie-chart/g) || []).length > 0) { frameworks.push(' pie-chart'); }
	if ((lowerString.match(/\/piecon/g) || []).length > 0) { frameworks.push(' piecon'); }
	if ((lowerString.match(/\/pikaday/g) || []).length > 0) { frameworks.push(' pikaday'); }
	if ((lowerString.match(/\/pileup/g) || []).length > 0) { frameworks.push(' pileup'); }
	if ((lowerString.match(/\/pills\//g) || []).length > 0) { frameworks.push(' pills'); }
	if ((lowerString.match(/\/pivottable/g) || []).length > 0) { frameworks.push(' pivottable'); }
	if ((lowerString.match(/\/piwik/g) || []).length > 0) { frameworks.push(' piwik'); }
	if ((lowerString.match(/\/pixi.js/g) || []).length > 0) { frameworks.push(' pixi.js'); }
	if ((lowerString.match(/\/pizza/g) || []).length > 0) { frameworks.push(' pizza'); }
	if ((lowerString.match(/\/placeholder-shiv/g) || []).length > 0) { frameworks.push(' placeholder-shiv'); }
	if ((lowerString.match(/\/placeholder.js/g) || []).length > 0) { frameworks.push(' placeholder.js'); }
	if ((lowerString.match(/\/placeholders/g) || []).length > 0) { frameworks.push(' placeholders'); }
	if ((lowerString.match(/\/places.js/g) || []).length > 0) { frameworks.push(' places.js'); }
	if ((lowerString.match(/\/plastiq/g) || []).length > 0) { frameworks.push(' plastiq'); }
	if ((lowerString.match(/\/plates\//g) || []).length > 0) { frameworks.push(' plates'); }
	if ((lowerString.match(/\/platform\//g) || []).length > 0) { frameworks.push(' platform'); }
	if ((lowerString.match(/\/playlyfe-js-sdk/g) || []).length > 0) { frameworks.push(' playlyfe-js-sdk'); }
	if ((lowerString.match(/\/playlyfe-odysseus/g) || []).length > 0) { frameworks.push(' playlyfe-odysseus'); }
	if ((lowerString.match(/\/please-wait/g) || []).length > 0) { frameworks.push(' please-wait'); }
	if ((lowerString.match(/\/pleasejs/g) || []).length > 0) { frameworks.push(' pleasejs'); }
	if ((lowerString.match(/\/plottable.js/g) || []).length > 0) { frameworks.push(' plottable.js'); }
	if ((lowerString.match(/\/plupload/g) || []).length > 0) { frameworks.push(' plupload'); }
	if ((lowerString.match(/\/plyr\//g) || []).length > 0) { frameworks.push(' plyr'); }
	if ((lowerString.match(/\/pnotify/g) || []).length > 0) { frameworks.push(' pnotify'); }
	if ((lowerString.match(/\/politespace/g) || []).length > 0) { frameworks.push(' politespace'); }
	if ((lowerString.match(/\/polyglot.js/g) || []).length > 0) { frameworks.push(' polyglot.js'); }
	if ((lowerString.match(/\/polyglot/g) || []).length > 0) { frameworks.push(' polyglot'); }
	if ((lowerString.match(/\/polymaps/g) || []).length > 0) { frameworks.push(' polymaps'); }
	if ((lowerString.match(/\/polymer/g) || []).length > 0) { frameworks.push(' polymer'); }
	if ((lowerString.match(/\/polythene/g) || []).length > 0) { frameworks.push(' polythene'); }
	if ((lowerString.match(/\/popmotion/g) || []).length > 0) { frameworks.push(' popmotion'); }
	if ((lowerString.match(/\/popper.js/g) || []).length > 0) { frameworks.push(' popper.js'); }
	if ((lowerString.match(/\/portal/g) || []).length > 0) { frameworks.push(' portal'); }
	if ((lowerString.match(/\/postal.js/g) || []).length > 0) { frameworks.push(' postal.js'); }
	if ((lowerString.match(/\/postgrest-client/g) || []).length > 0) { frameworks.push(' postgrest-client'); }
	if ((lowerString.match(/\/postscribe/g) || []).length > 0) { frameworks.push(' postscribe'); }
	if ((lowerString.match(/\/pouchdb/g) || []).length > 0) { frameworks.push(' pouchdb'); }
	if ((lowerString.match(/\/pqgrid/g) || []).length > 0) { frameworks.push(' pqgrid'); }
	if ((lowerString.match(/\/preact/g) || []).length > 0) { frameworks.push(' preact'); }
	if ((lowerString.match(/\/preconditions/g) || []).length > 0) { frameworks.push(' preconditions'); }
	if ((lowerString.match(/\/prefixfree/g) || []).length > 0) { frameworks.push(' prefixfree'); }
	if ((lowerString.match(/\/prettify/g) || []).length > 0) { frameworks.push(' prettify'); }
	if ((lowerString.match(/\/pretty-checkbox/g) || []).length > 0) { frameworks.push(' pretty-checkbox'); }
	if ((lowerString.match(/\/prettycheckable/g) || []).length > 0) { frameworks.push(' prettycheckable'); }
	if ((lowerString.match(/\/prettyphoto/g) || []).length > 0) { frameworks.push(' prettyphoto'); }
	if ((lowerString.match(/\/prettydiff/g) || []).length > 0) { frameworks.push(' prettydiff'); }
	if ((lowerString.match(/\/primeui/g) || []).length > 0) { frameworks.push(' primeui'); }
	if ((lowerString.match(/\/primish/g) || []).length > 0) { frameworks.push(' primish'); }
	if ((lowerString.match(/\/prism\//g) || []).length > 0) { frameworks.push(' prism'); }
	if ((lowerString.match(/\/probtn/g) || []).length > 0) { frameworks.push(' probtn'); }
	if ((lowerString.match(/\/processing.js/g) || []).length > 0) { frameworks.push(' processing.js'); }
	if ((lowerString.match(/\/progress.js/g) || []).length > 0) { frameworks.push(' progress.js'); }
	if ((lowerString.match(/\/progressbar.js/g) || []).length > 0) { frameworks.push(' progressbar.js'); }
	if ((lowerString.match(/\/proj4js/g) || []).length > 0) { frameworks.push(' proj4js'); }
	if ((lowerString.match(/\/proj4leaflet/g) || []).length > 0) { frameworks.push(' proj4leaflet'); }
	if ((lowerString.match(/\/promiz/g) || []).length > 0) { frameworks.push(' promiz'); }
	if ((lowerString.match(/\/prostyle/g) || []).length > 0) { frameworks.push(' prostyle'); }
	if ((lowerString.match(/\/protonet-jquery.inview/g) || []).length > 0) { frameworks.push(' protonet-jquery.inview'); }
	if ((lowerString.match(/\/prototype/g) || []).length > 0) { frameworks.push(' prototype'); }
	if ((lowerString.match(/\/protovis/g) || []).length > 0) { frameworks.push(' protovis'); }
	if ((lowerString.match(/\/psd.js/g) || []).length > 0) { frameworks.push(' psd.js'); }
	if ((lowerString.match(/\/psl\//g) || []).length > 0) { frameworks.push(' psl'); }
	if ((lowerString.match(/\/pubnub/g) || []).length > 0) { frameworks.push(' pubnub'); }
	if ((lowerString.match(/\/pubsub-js/g) || []).length > 0) { frameworks.push(' pubsub-js'); }
	if ((lowerString.match(/\/punycode/g) || []).length > 0) { frameworks.push(' punycode'); }
	if ((lowerString.match(/\/pure.js/g) || []).length > 0) { frameworks.push(' pure.js'); }
	if ((lowerString.match(/\/pure\//g) || []).length > 0) { frameworks.push(' pure'); }
	if ((lowerString.match(/\/purl/g) || []).length > 0) { frameworks.push(' purl'); }
	if ((lowerString.match(/\/push.js/g) || []).length > 0) { frameworks.push(' push.js'); }
	if ((lowerString.match(/\/pusher-angular/g) || []).length > 0) { frameworks.push(' pusher-angular'); }
	if ((lowerString.match(/\/pusher/g) || []).length > 0) { frameworks.push(' pusher'); }
	if ((lowerString.match(/\/pwstrength-bootstrap/g) || []).length > 0) { frameworks.push(' pwstrength-bootstrap'); }
	if ((lowerString.match(/\/pym/g) || []).length > 0) { frameworks.push(' pym'); }
	if ((lowerString.match(/\/q.js/g) || []).length > 0) { frameworks.push(' q.js'); }
	if ((lowerString.match(/\/qoopido.js/g) || []).length > 0) { frameworks.push(' qoopido.js'); }
	if ((lowerString.match(/\/qooxdoo/g) || []).length > 0) { frameworks.push(' qooxdoo'); }
	if ((lowerString.match(/\/qs/g) || []).length > 0) { frameworks.push(' qs'); }
	if ((lowerString.match(/\/qtip2/g) || []).length > 0) { frameworks.push(' qtip2'); }
	if ((lowerString.match(/\/quagga/g) || []).length > 0) { frameworks.push(' quagga'); }
	if ((lowerString.match(/\/query-result/g) || []).length > 0) { frameworks.push(' query-result'); }
	if ((lowerString.match(/\/queue-async/g) || []).length > 0) { frameworks.push(' queue-async'); }
	if ((lowerString.match(/\/quickblox/g) || []).length > 0) { frameworks.push(' quickblox'); }
	if ((lowerString.match(/\/quicksound.js/g) || []).length > 0) { frameworks.push(' quicksound.js'); }
	if ((lowerString.match(/\/quill/g) || []).length > 0) { frameworks.push(' quill'); }
	if ((lowerString.match(/\/quixote/g) || []).length > 0) { frameworks.push(' quixote'); }
	if ((lowerString.match(/\/qunit/g) || []).length > 0) { frameworks.push(' qunit'); }
	if ((lowerString.match(/\/quo.js/g) || []).length > 0) { frameworks.push(' quo.js'); }
	if ((lowerString.match(/\/qwerty-hancock/g) || []).length > 0) { frameworks.push(' qwerty-hancock'); }
	if ((lowerString.match(/\/qwery/g) || []).length > 0) { frameworks.push(' qwery'); }
	if ((lowerString.match(/\/qwest/g) || []).length > 0) { frameworks.push(' qwest'); }
	if ((lowerString.match(/\/r2d3/g) || []).length > 0) { frameworks.push(' r2d3'); }
	if ((lowerString.match(/\/ractive-require/g) || []).length > 0) { frameworks.push(' ractive-require'); }
	if ((lowerString.match(/\/ractive.js/g) || []).length > 0) { frameworks.push(' ractive.js'); }
	if ((lowerString.match(/\/ractive/g) || []).length > 0) { frameworks.push(' ractive'); }
	if ((lowerString.match(/\/radio/g) || []).length > 0) { frameworks.push(' radio'); }
	if ((lowerString.match(/\/radium/g) || []).length > 0) { frameworks.push(' radium'); }
	if ((lowerString.match(/\/rainbow/g) || []).length > 0) { frameworks.push(' rainbow'); }
	if ((lowerString.match(/\/rainyday.js/g) || []).length > 0) { frameworks.push(' rainyday.js'); }
	if ((lowerString.match(/\/ramda/g) || []).length > 0) { frameworks.push(' ramda'); }
	if ((lowerString.match(/\/ramjet.js/g) || []).length > 0) { frameworks.push(' ramjet.js'); }
	if ((lowerString.match(/\/random-js/g) || []).length > 0) { frameworks.push(' random-js'); }
	if ((lowerString.match(/\/randomcolor/g) || []).length > 0) { frameworks.push(' randomcolor'); }
	if ((lowerString.match(/\/range.js/g) || []).length > 0) { frameworks.push(' range.js'); }
	if ((lowerString.match(/\/rangeslider.js/g) || []).length > 0) { frameworks.push(' rangeslider.js'); }
	if ((lowerString.match(/\/rangy/g) || []).length > 0) { frameworks.push(' rangy'); }
	if ((lowerString.match(/\/rantjs/g) || []).length > 0) { frameworks.push(' rantjs'); }
	if ((lowerString.match(/\/raphael/g) || []).length > 0) { frameworks.push(' raphael'); }
	if ((lowerString.match(/\/rasterizehtml/g) || []).length > 0) { frameworks.push(' rasterizehtml'); }
	if ((lowerString.match(/\/ratchet/g) || []).length > 0) { frameworks.push(' ratchet'); }
	if ((lowerString.match(/\/rateyo/g) || []).length > 0) { frameworks.push(' rateyo'); }
	if ((lowerString.match(/\/raty/g) || []).length > 0) { frameworks.push(' raty'); }
	if ((lowerString.match(/\/raven.js/g) || []).length > 0) { frameworks.push(' raven.js'); }
	if ((lowerString.match(/\/react-autocomplete/g) || []).length > 0) { frameworks.push(' react-autocomplete'); }
	if ((lowerString.match(/\/react-bootstrap-table/g) || []).length > 0) { frameworks.push(' react-bootstrap-table'); }
	if ((lowerString.match(/\/react-bootstrap-typeahead/g) || []).length > 0) { frameworks.push(' react-bootstrap-typeahead'); }
	if ((lowerString.match(/\/react-bootstrap/g) || []).length > 0) { frameworks.push(' react-bootstrap'); }
	if ((lowerString.match(/\/react-chartjs/g) || []).length > 0) { frameworks.push(' react-chartjs'); }
	if ((lowerString.match(/\/react-cookie/g) || []).length > 0) { frameworks.push(' react-cookie'); }
	if ((lowerString.match(/\/react-datepicker/g) || []).length > 0) { frameworks.push(' react-datepicker'); }
	if ((lowerString.match(/\/react-disqus-thread/g) || []).length > 0) { frameworks.push(' react-disqus-thread'); }
	if ((lowerString.match(/\/react-foundation-apps/g) || []).length > 0) { frameworks.push(' react-foundation-apps'); }
	if ((lowerString.match(/\/react-highcharts/g) || []).length > 0) { frameworks.push(' react-highcharts'); }
	if ((lowerString.match(/\/react-intl/g) || []).length > 0) { frameworks.push(' react-intl'); }
	if ((lowerString.match(/\/react-ios-switch/g) || []).length > 0) { frameworks.push(' react-ios-switch'); }
	if ((lowerString.match(/\/react-localstorage/g) || []).length > 0) { frameworks.push(' react-localstorage'); }
	if ((lowerString.match(/\/react-modal/g) || []).length > 0) { frameworks.push(' react-modal'); }
	if ((lowerString.match(/\/react-motion/g) || []).length > 0) { frameworks.push(' react-motion'); }
	if ((lowerString.match(/\/react-nvd3/g) || []).length > 0) { frameworks.push(' react-nvd3'); }
	if ((lowerString.match(/\/react-quill/g) || []).length > 0) { frameworks.push(' react-quill'); }
	if ((lowerString.match(/\/react-redux/g) || []).length > 0) { frameworks.push(' react-redux'); }
	if ((lowerString.match(/\/react-relay/g) || []).length > 0) { frameworks.push(' react-relay'); }
	if ((lowerString.match(/\/react-router-bootstrap/g) || []).length > 0) { frameworks.push(' react-router-bootstrap'); }
	if ((lowerString.match(/\/react-router-redux/g) || []).length > 0) { frameworks.push(' react-router-redux'); }
	if ((lowerString.match(/\/react-router/g) || []).length > 0) { frameworks.push(' react-router'); }
	if ((lowerString.match(/\/react-select/g) || []).length > 0) { frameworks.push(' react-select'); }
	if ((lowerString.match(/\/react-semantify/g) || []).length > 0) { frameworks.push(' react-semantify'); }
	if ((lowerString.match(/\/react-slick/g) || []).length > 0) { frameworks.push(' react-slick'); }
	if ((lowerString.match(/\/react-swipe/g) || []).length > 0) { frameworks.push(' react-swipe'); }
	if ((lowerString.match(/\/react-virtualized/g) || []).length > 0) { frameworks.push(' react-virtualized'); }
	if ((lowerString.match(/\/react/g) || []).length > 0) { frameworks.push(' react'); }
	if ((lowerString.match(/\/reactable/g) || []).length > 0) { frameworks.push(' reactable'); }
	if ((lowerString.match(/\/reactive-coffee/g) || []).length > 0) { frameworks.push(' reactive-coffee'); }
	if ((lowerString.match(/\/ready.js/g) || []).length > 0) { frameworks.push(' ready.js'); }
	if ((lowerString.match(/\/recompose/g) || []).length > 0) { frameworks.push(' recompose'); }
	if ((lowerString.match(/\/reconnecting-websocket/g) || []).length > 0) { frameworks.push(' reconnecting-websocket'); }
	if ((lowerString.match(/\/reductio/g) || []).length > 0) { frameworks.push(' reductio'); }
	if ((lowerString.match(/\/redux-form/g) || []).length > 0) { frameworks.push(' redux-form'); }
	if ((lowerString.match(/\/redux-router/g) || []).length > 0) { frameworks.push(' redux-router'); }
	if ((lowerString.match(/\/redux-thunk/g) || []).length > 0) { frameworks.push(' redux-thunk'); }
	if ((lowerString.match(/\/redux/g) || []).length > 0) { frameworks.push(' redux'); }
	if ((lowerString.match(/\/reel.js/g) || []).length > 0) { frameworks.push(' reel.js'); }
	if ((lowerString.match(/\/reflect-metadata/g) || []).length > 0) { frameworks.push(' reflect-metadata'); }
	if ((lowerString.match(/\/regl/g) || []).length > 0) { frameworks.push(' regl'); }
	if ((lowerString.match(/\/regression/g) || []).length > 0) { frameworks.push(' regression'); }
	if ((lowerString.match(/\/rellax/g) || []).length > 0) { frameworks.push(' rellax'); }
	if ((lowerString.match(/\/rem/g) || []).length > 0) { frameworks.push(' rem'); }
	if ((lowerString.match(/\/remarkable/g) || []).length > 0) { frameworks.push(' remarkable'); }
	if ((lowerString.match(/\/remodal/g) || []).length > 0) { frameworks.push(' remodal'); }
	if ((lowerString.match(/\/remotestorage/g) || []).length > 0) { frameworks.push(' remotestorage'); }
	if ((lowerString.match(/\/repo.js/g) || []).length > 0) { frameworks.push(' repo.js'); }
	if ((lowerString.match(/\/require-cs/g) || []).length > 0) { frameworks.push(' require-cs'); }
	if ((lowerString.match(/\/require-css/g) || []).length > 0) { frameworks.push(' require-css'); }
	if ((lowerString.match(/\/require-domready/g) || []).length > 0) { frameworks.push(' require-domready'); }
	if ((lowerString.match(/\/require-i18n/g) || []).length > 0) { frameworks.push(' require-i18n'); }
	if ((lowerString.match(/\/require-jquery/g) || []).length > 0) { frameworks.push(' require-jquery'); }
	if ((lowerString.match(/\/require-text/g) || []).length > 0) { frameworks.push(' require-text'); }
	if ((lowerString.match(/\/require.js/g) || []).length > 0) { frameworks.push(' require.js'); }
	if ((lowerString.match(/\/requirejs-async/g) || []).length > 0) { frameworks.push(' requirejs-async'); }
	if ((lowerString.match(/\/requirejs-handlebars/g) || []).length > 0) { frameworks.push(' requirejs-handlebars'); }
	if ((lowerString.match(/\/requirejs-mustache/g) || []).length > 0) { frameworks.push(' requirejs-mustache'); }
	if ((lowerString.match(/\/requirejs-plugins/g) || []).length > 0) { frameworks.push(' requirejs-plugins'); }
	if ((lowerString.match(/\/requirejs-tpl/g) || []).length > 0) { frameworks.push(' requirejs-tpl'); }
	if ((lowerString.match(/\/reqwest/g) || []).length > 0) { frameworks.push(' reqwest'); }
	if ((lowerString.match(/\/reselect/g) || []).length > 0) { frameworks.push(' reselect'); }
	if ((lowerString.match(/\/respond.js/g) || []).length > 0) { frameworks.push(' respond.js'); }
	if ((lowerString.match(/\/responsive-elements/g) || []).length > 0) { frameworks.push(' responsive-elements'); }
	if ((lowerString.match(/\/responsive-nav.js/g) || []).length > 0) { frameworks.push(' responsive-nav.js'); }
	if ((lowerString.match(/\/responsivecarousel/g) || []).length > 0) { frameworks.push(' responsivecarousel'); }
	if ((lowerString.match(/\/restangular/g) || []).length > 0) { frameworks.push(' restangular'); }
	if ((lowerString.match(/\/restful.js/g) || []).length > 0) { frameworks.push(' restful.js'); }
	if ((lowerString.match(/\/restyle/g) || []).length > 0) { frameworks.push(' restyle'); }
	if ((lowerString.match(/\/resumable.js/g) || []).length > 0) { frameworks.push(' resumable.js'); }
	if ((lowerString.match(/\/retina.js/g) || []).length > 0) { frameworks.push(' retina.js'); }
	if ((lowerString.match(/\/reveal.js/g) || []).length > 0) { frameworks.push(' reveal.js'); }
	if ((lowerString.match(/\/rickshaw/g) || []).length > 0) { frameworks.push(' rickshaw'); }
	if ((lowerString.match(/\/riloadr/g) || []).length > 0) { frameworks.push(' riloadr'); }
	if ((lowerString.match(/\/rimg/g) || []).length > 0) { frameworks.push(' rimg'); }
	if ((lowerString.match(/\/ring.js/g) || []).length > 0) { frameworks.push(' ring.js'); }
	if ((lowerString.match(/\/riot/g) || []).length > 0) { frameworks.push(' riot'); }
	if ((lowerString.match(/\/riotux/g) || []).length > 0) { frameworks.push(' riotux'); }
	if ((lowerString.match(/\/rita/g) || []).length > 0) { frameworks.push(' rita'); }
	if ((lowerString.match(/\/rivets/g) || []).length > 0) { frameworks.push(' rivets'); }
	if ((lowerString.match(/\/rome\//g) || []).length > 0) { frameworks.push(' rome'); }
	if ((lowerString.match(/\/roslibjs/g) || []).length > 0) { frameworks.push(' roslibjs'); }
	if ((lowerString.match(/\/roundabout/g) || []).length > 0) { frameworks.push(' roundabout'); }
	if ((lowerString.match(/\/rsvp/g) || []).length > 0) { frameworks.push(' rsvp'); }
	if ((lowerString.match(/\/rwdgrid/g) || []).length > 0) { frameworks.push(' rwdgrid'); }
	if ((lowerString.match(/\/rx-angular/g) || []).length > 0) { frameworks.push(' rx-angular'); }
	if ((lowerString.match(/\/rxjs-dom/g) || []).length > 0) { frameworks.push(' rxjs-dom'); }
	if ((lowerString.match(/\/rxjs-jquery/g) || []).length > 0) { frameworks.push(' rxjs-jquery'); }
	if ((lowerString.match(/\/rxjs/g) || []).length > 0) { frameworks.push(' rxjs'); }
	if ((lowerString.match(/\/s3colors/g) || []).length > 0) { frameworks.push(' s3colors'); }
	if ((lowerString.match(/\/sails.io.js/g) || []).length > 0) { frameworks.push(' sails.io.js'); }
	if ((lowerString.match(/\/salesforce-canvas/g) || []).length > 0) { frameworks.push(' salesforce-canvas'); }
	if ((lowerString.match(/\/salvattore/g) || []).length > 0) { frameworks.push(' salvattore'); }
	if ((lowerString.match(/\/sammy.js/g) || []).length > 0) { frameworks.push(' sammy.js'); }
	if ((lowerString.match(/\/sanitize.css/g) || []).length > 0) { frameworks.push(' sanitize.css'); }
	if ((lowerString.match(/\/sass.js/g) || []).length > 0) { frameworks.push(' sass.js'); }
	if ((lowerString.match(/\/sat\//g) || []).length > 0) { frameworks.push(' sat'); }
	if ((lowerString.match(/\/satellite.js/g) || []).length > 0) { frameworks.push(' satellite.js'); }
	if ((lowerString.match(/\/satellizer/g) || []).length > 0) { frameworks.push(' satellizer'); }
	if ((lowerString.match(/\/savvior/g) || []).length > 0) { frameworks.push(' savvior'); }
	if ((lowerString.match(/\/sbt/g) || []).length > 0) { frameworks.push(' sbt'); }
	if ((lowerString.match(/\/scaleapp/g) || []).length > 0) { frameworks.push(' scaleapp'); }
	if ((lowerString.match(/\/scannerdetection/g) || []).length > 0) { frameworks.push(' scannerdetection'); }
	if ((lowerString.match(/\/scion/g) || []).length > 0) { frameworks.push(' scion'); }
	if ((lowerString.match(/\/sco.js/g) || []).length > 0) { frameworks.push(' sco.js'); }
	if ((lowerString.match(/\/screenfull.js/g) || []).length > 0) { frameworks.push(' screenfull.js'); }
	if ((lowerString.match(/\/script.js/g) || []).length > 0) { frameworks.push(' script.js'); }
	if ((lowerString.match(/\/scriptaculous/g) || []).length > 0) { frameworks.push(' scriptaculous'); }
	if ((lowerString.match(/\/scroll-scope/g) || []).length > 0) { frameworks.push(' scroll-scope'); }
	if ((lowerString.match(/\/scrollreveal.js/g) || []).length > 0) { frameworks.push(' scrollreveal.js'); }
	if ((lowerString.match(/\/scrollify/g) || []).length > 0) { frameworks.push(' scrollify'); }
	if ((lowerString.match(/\/scrollmonitor/g) || []).length > 0) { frameworks.push(' scrollmonitor'); }
	if ((lowerString.match(/\/scrollpoints/g) || []).length > 0) { frameworks.push(' scrollpoints'); }
	if ((lowerString.match(/\/seajs/g) || []).length > 0) { frameworks.push(' seajs'); }
	if ((lowerString.match(/\/seamless-immutable/g) || []).length > 0) { frameworks.push(' seamless-immutable'); }
	if ((lowerString.match(/\/seedrandom/g) || []).length > 0) { frameworks.push(' seedrandom'); }
	if ((lowerString.match(/\/segment-js/g) || []).length > 0) { frameworks.push(' segment-js'); }
	if ((lowerString.match(/\/select-or-die/g) || []).length > 0) { frameworks.push(' select-or-die'); }
	if ((lowerString.match(/\/select2-bootstrap-css/g) || []).length > 0) { frameworks.push(' select2-bootstrap-css'); }
	if ((lowerString.match(/\/select2-bootstrap-theme/g) || []).length > 0) { frameworks.push(' select2-bootstrap-theme'); }
	if ((lowerString.match(/\/select2/g) || []).length > 0) { frameworks.push(' select2'); }
	if ((lowerString.match(/\/selectivizr/g) || []).length > 0) { frameworks.push(' selectivizr'); }
	if ((lowerString.match(/\/selectize.js/g) || []).length > 0) { frameworks.push(' selectize.js'); }
	if ((lowerString.match(/\/semantic-ui/g) || []).length > 0) { frameworks.push(' semantic-ui'); }
	if ((lowerString.match(/\/sentient-lang/g) || []).length > 0) { frameworks.push(' sentient-lang'); }
	if ((lowerString.match(/\/set-iframe-height/g) || []).length > 0) { frameworks.push(' set-iframe-height'); }
	if ((lowerString.match(/\/setimmediate/g) || []).length > 0) { frameworks.push(' setimmediate'); }
	if ((lowerString.match(/\/sevenseg.js/g) || []).length > 0) { frameworks.push(' sevenseg.js'); }
	if ((lowerString.match(/\/shaka-player/g) || []).length > 0) { frameworks.push(' shaka-player'); }
	if ((lowerString.match(/\/sharer.js/g) || []).length > 0) { frameworks.push(' sharer.js'); }
	if ((lowerString.match(/\/shariff/g) || []).length > 0) { frameworks.push(' shariff'); }
	if ((lowerString.match(/\/shell.js/g) || []).length > 0) { frameworks.push(' shell.js'); }
	if ((lowerString.match(/\/shepherd/g) || []).length > 0) { frameworks.push(' shepherd'); }
	if ((lowerString.match(/\/shine.js/g) || []).length > 0) { frameworks.push(' shine.js'); }
	if ((lowerString.match(/\/shopify-cartjs/g) || []).length > 0) { frameworks.push(' shopify-cartjs'); }
	if ((lowerString.match(/\/should.js/g) || []).length > 0) { frameworks.push(' should.js'); }
	if ((lowerString.match(/\/show-your-terms/g) || []).length > 0) { frameworks.push(' show-your-terms'); }
	if ((lowerString.match(/\/showdown/g) || []).length > 0) { frameworks.push(' showdown'); }
	if ((lowerString.match(/\/shred/g) || []).length > 0) { frameworks.push(' shred'); }
	if ((lowerString.match(/\/side-comments/g) || []).length > 0) { frameworks.push(' side-comments'); }
	if ((lowerString.match(/\/sidr/g) || []).length > 0) { frameworks.push(' sidr'); }
	if ((lowerString.match(/\/sigma.js/g) || []).length > 0) { frameworks.push(' sigma.js'); }
	if ((lowerString.match(/\/signalr.js/g) || []).length > 0) { frameworks.push(' signalr.js'); }
	if ((lowerString.match(/\/signature_pad/g) || []).length > 0) { frameworks.push(' signature_pad'); }
	if ((lowerString.match(/\/signet/g) || []).length > 0) { frameworks.push(' signet'); }
	if ((lowerString.match(/\/simple-icons/g) || []).length > 0) { frameworks.push(' simple-icons'); }
	if ((lowerString.match(/\/simple-jekyll-search/g) || []).length > 0) { frameworks.push(' simple-jekyll-search'); }
	if ((lowerString.match(/\/simple-line-icons/g) || []).length > 0) { frameworks.push(' simple-line-icons'); }
	if ((lowerString.match(/\/simple-module/g) || []).length > 0) { frameworks.push(' simple-module'); }
	if ((lowerString.match(/\/simple-peer/g) || []).length > 0) { frameworks.push(' simple-peer'); }
	if ((lowerString.match(/\/simple-statistics/g) || []).length > 0) { frameworks.push(' simple-statistics'); }
	if ((lowerString.match(/\/simple-text-rotator/g) || []).length > 0) { frameworks.push(' simple-text-rotator'); }
	if ((lowerString.match(/\/simple-uploader/g) || []).length > 0) { frameworks.push(' simple-uploader'); }
	if ((lowerString.match(/\/simplecartjs/g) || []).length > 0) { frameworks.push(' simplecartjs'); }
	if ((lowerString.match(/\/simplelightbox/g) || []).length > 0) { frameworks.push(' simplelightbox'); }
	if ((lowerString.match(/\/simplemde/g) || []).length > 0) { frameworks.push(' simplemde'); }
	if ((lowerString.match(/\/simplemodal/g) || []).length > 0) { frameworks.push(' simplemodal'); }
	if ((lowerString.match(/\/simplestatemanager/g) || []).length > 0) { frameworks.push(' simplestatemanager'); }
	if ((lowerString.match(/\/simpleui/g) || []).length > 0) { frameworks.push(' simpleui'); }
	if ((lowerString.match(/\/simplex-noise/g) || []).length > 0) { frameworks.push(' simplex-noise'); }
	if ((lowerString.match(/\/sinon.js/g) || []).length > 0) { frameworks.push(' sinon.js'); }
	if ((lowerString.match(/\/sir-trevor-js/g) || []).length > 0) { frameworks.push(' sir-trevor-js'); }
	if ((lowerString.match(/\/sisyphus.js/g) || []).length > 0) { frameworks.push(' sisyphus.js'); }
	if ((lowerString.match(/\/sizzle/g) || []).length > 0) { frameworks.push(' sizzle'); }
	if ((lowerString.match(/\/sjcl/g) || []).length > 0) { frameworks.push(' sjcl'); }
	if ((lowerString.match(/\/skel-layers/g) || []).length > 0) { frameworks.push(' skel-layers'); }
	if ((lowerString.match(/\/skel/g) || []).length > 0) { frameworks.push(' skel'); }
	if ((lowerString.match(/\/skeleton-framework/g) || []).length > 0) { frameworks.push(' skeleton-framework'); }
	if ((lowerString.match(/\/skeleton/g) || []).length > 0) { frameworks.push(' skeleton'); }
	if ((lowerString.match(/\/sketch.js/g) || []).length > 0) { frameworks.push(' sketch.js'); }
	if ((lowerString.match(/\/skrollr/g) || []).length > 0) { frameworks.push(' skrollr'); }
	if ((lowerString.match(/\/skycons/g) || []).length > 0) { frameworks.push(' skycons'); }
	if ((lowerString.match(/\/slabtext/g) || []).length > 0) { frameworks.push(' slabtext'); }
	if ((lowerString.match(/\/slick-carousel/g) || []).length > 0) { frameworks.push(' slick-carousel'); }
	if ((lowerString.match(/\/slidereveal/g) || []).length > 0) { frameworks.push(' slidereveal'); }
	if ((lowerString.match(/\/slidebars/g) || []).length > 0) { frameworks.push(' slidebars'); }
	if ((lowerString.match(/\/slideout/g) || []).length > 0) { frameworks.push(' slideout'); }
	if ((lowerString.match(/\/slider-pro/g) || []).length > 0) { frameworks.push(' slider-pro'); }
	if ((lowerString.match(/\/slidesjs/g) || []).length > 0) { frameworks.push(' slidesjs'); }
	if ((lowerString.match(/\/slipjs/g) || []).length > 0) { frameworks.push(' slipjs'); }
	if ((lowerString.match(/\/smalot-bootstrap-datetimepicker/g) || []).length > 0) { frameworks.push(' smalot-bootstrap-datetimepicker'); }
	if ((lowerString.match(/\/smart-table-scroll/g) || []).length > 0) { frameworks.push(' smart-table-scroll'); }
	if ((lowerString.match(/\/smart-underline/g) || []).length > 0) { frameworks.push(' smart-underline'); }
	if ((lowerString.match(/\/smartcrop/g) || []).length > 0) { frameworks.push(' smartcrop'); }
	if ((lowerString.match(/\/smokejs/g) || []).length > 0) { frameworks.push(' smokejs'); }
	if ((lowerString.match(/\/smooth-scroll/g) || []).length > 0) { frameworks.push(' smooth-scroll'); }
	if ((lowerString.match(/\/smooth-scrollbar/g) || []).length > 0) { frameworks.push(' smooth-scrollbar'); }
	if ((lowerString.match(/\/smoothstate.js/g) || []).length > 0) { frameworks.push(' smoothstate.js'); }
	if ((lowerString.match(/\/smoothie/g) || []).length > 0) { frameworks.push(' smoothie'); }
	if ((lowerString.match(/\/smoothscroll/g) || []).length > 0) { frameworks.push(' smoothscroll'); }
	if ((lowerString.match(/\/snabbt.js/g) || []).length > 0) { frameworks.push(' snabbt.js'); }
	if ((lowerString.match(/\/snackbarjs/g) || []).length > 0) { frameworks.push(' snackbarjs'); }
	if ((lowerString.match(/\/snap.js/g) || []).length > 0) { frameworks.push(' snap.js'); }
	if ((lowerString.match(/\/snap.svg.zpd/g) || []).length > 0) { frameworks.push(' snap.svg.zpd'); }
	if ((lowerString.match(/\/snap.svg/g) || []).length > 0) { frameworks.push(' snap.svg'); }
	if ((lowerString.match(/\/snoocore/g) || []).length > 0) { frameworks.push(' snoocore'); }
	if ((lowerString.match(/\/social-feed/g) || []).length > 0) { frameworks.push(' social-feed'); }
	if ((lowerString.match(/\/social-likes/g) || []).length > 0) { frameworks.push(' social-likes'); }
	if ((lowerString.match(/\/social-share.js/g) || []).length > 0) { frameworks.push(' social-share.js'); }
	if ((lowerString.match(/\/social-sharing/g) || []).length > 0) { frameworks.push(' social-sharing'); }
	if ((lowerString.match(/\/socket.io-stream/g) || []).length > 0) { frameworks.push(' socket.io-stream'); }
	if ((lowerString.match(/\/socket.io/g) || []).length > 0) { frameworks.push(' socket.io'); }
	if ((lowerString.match(/\/socketcluster-client/g) || []).length > 0) { frameworks.push(' socketcluster-client'); }
	if ((lowerString.match(/\/sockjs-client/g) || []).length > 0) { frameworks.push(' sockjs-client'); }
	if ((lowerString.match(/\/sopa/g) || []).length > 0) { frameworks.push(' sopa'); }
	if ((lowerString.match(/\/sortable/g) || []).length > 0) { frameworks.push(' sortable'); }
	if ((lowerString.match(/\/soundmanager2/g) || []).length > 0) { frameworks.push(' soundmanager2'); }
	if ((lowerString.match(/\/soundplayer-widget/g) || []).length > 0) { frameworks.push(' soundplayer-widget'); }
	if ((lowerString.match(/\/soxx/g) || []).length > 0) { frameworks.push(' soxx'); }
	if ((lowerString.match(/\/spa.js/g) || []).length > 0) { frameworks.push(' spa.js'); }
	if ((lowerString.match(/\/space\//g) || []).length > 0) { frameworks.push(' space'); }
	if ((lowerString.match(/\/spark-md5/g) || []).length > 0) { frameworks.push(' spark-md5'); }
	if ((lowerString.match(/\/speakingurl/g) || []).length > 0) { frameworks.push(' speakingurl'); }
	if ((lowerString.match(/\/spectre.css/g) || []).length > 0) { frameworks.push(' spectre.css'); }
	if ((lowerString.match(/\/spectrum-i18n/g) || []).length > 0) { frameworks.push(' spectrum-i18n'); }
	if ((lowerString.match(/\/spectrum/g) || []).length > 0) { frameworks.push(' spectrum'); }
	if ((lowerString.match(/\/spellbook/g) || []).length > 0) { frameworks.push(' spellbook'); }
	if ((lowerString.match(/\/spf\//g) || []).length > 0) { frameworks.push(' spf'); }
	if ((lowerString.match(/\/spin.js/g) || []).length > 0) { frameworks.push(' spin.js'); }
	if ((lowerString.match(/\/spinejs/g) || []).length > 0) { frameworks.push(' spinejs'); }
	if ((lowerString.match(/\/spinkit/g) || []).length > 0) { frameworks.push(' spinkit'); }
	if ((lowerString.match(/\/spoqa-han-sans/g) || []).length > 0) { frameworks.push(' spoqa-han-sans'); }
	if ((lowerString.match(/\/springy/g) || []).length > 0) { frameworks.push(' springy'); }
	if ((lowerString.match(/\/sprintf/g) || []).length > 0) { frameworks.push(' sprintf'); }
	if ((lowerString.match(/\/sprite-js/g) || []).length > 0) { frameworks.push(' sprite-js'); }
	if ((lowerString.match(/\/spritespin/g) || []).length > 0) { frameworks.push(' spritespin'); }
	if ((lowerString.match(/\/sql.js/g) || []).length > 0) { frameworks.push(' sql.js'); }
	if ((lowerString.match(/\/squire-rte/g) || []).length > 0) { frameworks.push(' squire-rte'); }
	if ((lowerString.match(/\/squishy/g) || []).length > 0) { frameworks.push(' squishy'); }
	if ((lowerString.match(/\/ssi-modal/g) || []).length > 0) { frameworks.push(' ssi-modal'); }
	if ((lowerString.match(/\/stackblur-canvas/g) || []).length > 0) { frameworks.push(' stackblur-canvas'); }
	if ((lowerString.match(/\/stacktrace.js/g) || []).length > 0) { frameworks.push(' stacktrace.js'); }
	if ((lowerString.match(/\/stage.js/g) || []).length > 0) { frameworks.push(' stage.js'); }
	if ((lowerString.match(/\/stampit/g) || []).length > 0) { frameworks.push(' stampit'); }
	if ((lowerString.match(/\/stapes/g) || []).length > 0) { frameworks.push(' stapes'); }
	if ((lowerString.match(/\/startbootstrap-agency/g) || []).length > 0) { frameworks.push(' startbootstrap-agency'); }
	if ((lowerString.match(/\/startbootstrap-clean-blog/g) || []).length > 0) { frameworks.push(' startbootstrap-clean-blog'); }
	if ((lowerString.match(/\/startbootstrap-creative/g) || []).length > 0) { frameworks.push(' startbootstrap-creative'); }
	if ((lowerString.match(/\/startbootstrap-freelancer/g) || []).length > 0) { frameworks.push(' startbootstrap-freelancer'); }
	if ((lowerString.match(/\/startbootstrap-grayscale/g) || []).length > 0) { frameworks.push(' startbootstrap-grayscale'); }
	if ((lowerString.match(/\/startbootstrap-landing-page/g) || []).length > 0) { frameworks.push(' startbootstrap-landing-page'); }
	if ((lowerString.match(/\/startbootstrap-sb-admin-2/g) || []).length > 0) { frameworks.push(' startbootstrap-sb-admin-2'); }
	if ((lowerString.match(/\/startbootstrap-stylish-portfolio/g) || []).length > 0) { frameworks.push(' startbootstrap-stylish-portfolio'); }
	if ((lowerString.match(/\/stately.js/g) || []).length > 0) { frameworks.push(' stately.js'); }
	if ((lowerString.match(/\/stats.js/g) || []).length > 0) { frameworks.push(' stats.js'); }
	if ((lowerString.match(/\/stellar-base/g) || []).length > 0) { frameworks.push(' stellar-base'); }
	if ((lowerString.match(/\/stellar-sdk/g) || []).length > 0) { frameworks.push(' stellar-sdk'); }
	if ((lowerString.match(/\/stellar.js/g) || []).length > 0) { frameworks.push(' stellar.js'); }
	if ((lowerString.match(/\/sticky-table-headers/g) || []).length > 0) { frameworks.push(' sticky-table-headers'); }
	if ((lowerString.match(/\/stickyfill/g) || []).length > 0) { frameworks.push(' stickyfill'); }
	if ((lowerString.match(/\/stickyfloat/g) || []).length > 0) { frameworks.push(' stickyfloat'); }
	if ((lowerString.match(/\/stomp.js/g) || []).length > 0) { frameworks.push(' stomp.js'); }
	if ((lowerString.match(/\/store.js/g) || []).length > 0) { frameworks.push(' store.js'); }
	if ((lowerString.match(/\/strapdown-topbar/g) || []).length > 0) { frameworks.push(' strapdown-topbar'); }
	if ((lowerString.match(/\/string-format/g) || []).length > 0) { frameworks.push(' string-format'); }
	if ((lowerString.match(/\/string-mask/g) || []).length > 0) { frameworks.push(' string-mask'); }
	if ((lowerString.match(/\/string-saw/g) || []).length > 0) { frameworks.push(' string-saw'); }
	if ((lowerString.match(/\/string.js/g) || []).length > 0) { frameworks.push(' string.js'); }
	if ((lowerString.match(/\/string_score/g) || []).length > 0) { frameworks.push(' string_score'); }
	if ((lowerString.match(/\/strman/g) || []).length > 0) { frameworks.push(' strman'); }
	if ((lowerString.match(/\/stroll.js/g) || []).length > 0) { frameworks.push(' stroll.js'); }
	if ((lowerString.match(/\/strophe.js/g) || []).length > 0) { frameworks.push(' strophe.js'); }
	if ((lowerString.match(/\/stupidtable/g) || []).length > 0) { frameworks.push(' stupidtable'); }
	if ((lowerString.match(/\/stylus/g) || []).length > 0) { frameworks.push(' stylus'); }
	if ((lowerString.match(/\/subkit/g) || []).length > 0) { frameworks.push(' subkit'); }
	if ((lowerString.match(/\/submitter/g) || []).length > 0) { frameworks.push(' submitter'); }
	if ((lowerString.match(/\/sugar/g) || []).length > 0) { frameworks.push(' sugar'); }
	if ((lowerString.match(/\/summernote/g) || []).length > 0) { frameworks.push(' summernote'); }
	if ((lowerString.match(/\/suncalc/g) || []).length > 0) { frameworks.push(' suncalc'); }
	if ((lowerString.match(/\/superagent/g) || []).length > 0) { frameworks.push(' superagent'); }
	if ((lowerString.match(/\/superfish/g) || []).length > 0) { frameworks.push(' superfish'); }
	if ((lowerString.match(/\/superplaceholder/g) || []).length > 0) { frameworks.push(' superplaceholder'); }
	if ((lowerString.match(/\/superslides/g) || []).length > 0) { frameworks.push(' superslides'); }
	if ((lowerString.match(/\/svg-injector/g) || []).length > 0) { frameworks.push(' svg-injector'); }
	if ((lowerString.match(/\/svg.connectable.js/g) || []).length > 0) { frameworks.push(' svg.connectable.js'); }
	if ((lowerString.match(/\/svg.draggy.js/g) || []).length > 0) { frameworks.push(' svg.draggy.js'); }
	if ((lowerString.match(/\/svg.filter.js/g) || []).length > 0) { frameworks.push(' svg.filter.js'); }
	if ((lowerString.match(/\/svg.js/g) || []).length > 0) { frameworks.push(' svg.js'); }
	if ((lowerString.match(/\/svg.pan-zoom.js/g) || []).length > 0) { frameworks.push(' svg.pan-zoom.js'); }
	if ((lowerString.match(/\/svg4everybody/g) || []).length > 0) { frameworks.push(' svg4everybody'); }
	if ((lowerString.match(/\/svgeezy/g) || []).length > 0) { frameworks.push(' svgeezy'); }
	if ((lowerString.match(/\/swagger-ui/g) || []).length > 0) { frameworks.push(' swagger-ui'); }
	if ((lowerString.match(/\/sweetalert/g) || []).length > 0) { frameworks.push(' sweetalert'); }
	if ((lowerString.match(/\/swfobject/g) || []).length > 0) { frameworks.push(' swfobject'); }
	if ((lowerString.match(/\/swig/g) || []).length > 0) { frameworks.push(' swig'); }
	if ((lowerString.match(/\/swing/g) || []).length > 0) { frameworks.push(' swing'); }
	if ((lowerString.match(/\/swipe/g) || []).length > 0) { frameworks.push(' swipe'); }
	if ((lowerString.match(/\/switchery/g) || []).length > 0) { frameworks.push(' switchery'); }
	if ((lowerString.match(/\/switchy.js/g) || []).length > 0) { frameworks.push(' switchy.js'); }
	if ((lowerString.match(/\/sylvester/g) || []).length > 0) { frameworks.push(' sylvester'); }
	if ((lowerString.match(/\/syn\//g) || []).length > 0) { frameworks.push(' syn'); }
	if ((lowerString.match(/\/synaptic/g) || []).length > 0) { frameworks.push(' synaptic'); }
	if ((lowerString.match(/\/systemjs/g) || []).length > 0) { frameworks.push(' systemjs'); }
	if ((lowerString.match(/\/t3js/g) || []).length > 0) { frameworks.push(' t3js'); }
	if ((lowerString.match(/\/t7\//g) || []).length > 0) { frameworks.push(' t7'); }
	if ((lowerString.match(/\/tautocomplete/g) || []).length > 0) { frameworks.push(' tautocomplete'); }
	if ((lowerString.match(/\/tabby/g) || []).length > 0) { frameworks.push(' tabby'); }
	if ((lowerString.match(/\/tabcomplete/g) || []).length > 0) { frameworks.push(' tabcomplete'); }
	if ((lowerString.match(/\/tablefilter/g) || []).length > 0) { frameworks.push(' tablefilter'); }
	if ((lowerString.match(/\/tablesort/g) || []).length > 0) { frameworks.push(' tablesort'); }
	if ((lowerString.match(/\/tabletop.js/g) || []).length > 0) { frameworks.push(' tabletop.js'); }
	if ((lowerString.match(/\/tachyons/g) || []).length > 0) { frameworks.push(' tachyons'); }
	if ((lowerString.match(/\/taffydb/g) || []).length > 0) { frameworks.push(' taffydb'); }
	if ((lowerString.match(/\/tag-editor/g) || []).length > 0) { frameworks.push(' tag-editor'); }
	if ((lowerString.match(/\/tag-it/g) || []).length > 0) { frameworks.push(' tag-it'); }
	if ((lowerString.match(/\/taggd/g) || []).length > 0) { frameworks.push(' taggd'); }
	if ((lowerString.match(/\/taggle/g) || []).length > 0) { frameworks.push(' taggle'); }
	if ((lowerString.match(/\/tagmanager/g) || []).length > 0) { frameworks.push(' tagmanager'); }
	if ((lowerString.match(/\/task.js/g) || []).length > 0) { frameworks.push(' task.js'); }
	if ((lowerString.match(/\/taskforce/g) || []).length > 0) { frameworks.push(' taskforce'); }
	if ((lowerString.match(/\/taucharts/g) || []).length > 0) { frameworks.push(' taucharts'); }
	if ((lowerString.match(/\/techan.js/g) || []).length > 0) { frameworks.push(' techan.js'); }
	if ((lowerString.match(/\/template_js/g) || []).length > 0) { frameworks.push(' template_js'); }
	if ((lowerString.match(/\/templatebinding/g) || []).length > 0) { frameworks.push(' templatebinding'); }
	if ((lowerString.match(/\/terraformer/g) || []).length > 0) { frameworks.push(' terraformer'); }
	if ((lowerString.match(/\/tether-drop/g) || []).length > 0) { frameworks.push(' tether-drop'); }
	if ((lowerString.match(/\/tether-select/g) || []).length > 0) { frameworks.push(' tether-select'); }
	if ((lowerString.match(/\/tether-tooltip/g) || []).length > 0) { frameworks.push(' tether-tooltip'); }
	if ((lowerString.match(/\/tether/g) || []).length > 0) { frameworks.push(' tether'); }
	if ((lowerString.match(/\/textangular/g) || []).length > 0) { frameworks.push(' textangular'); }
	if ((lowerString.match(/\/textfit/g) || []).length > 0) { frameworks.push(' textfit'); }
	if ((lowerString.match(/\/textile-js/g) || []).length > 0) { frameworks.push(' textile-js'); }
	if ((lowerString.match(/\/textillate/g) || []).length > 0) { frameworks.push(' textillate'); }
	if ((lowerString.match(/\/themoviedb-javascript-library/g) || []).length > 0) { frameworks.push(' themoviedb-javascript-library'); }
	if ((lowerString.match(/\/then-request/g) || []).length > 0) { frameworks.push(' then-request'); }
	if ((lowerString.match(/\/thorax/g) || []).length > 0) { frameworks.push(' thorax'); }
	if ((lowerString.match(/\/three.js/g) || []).length > 0) { frameworks.push(' three.js'); }
	if ((lowerString.match(/\/ticketbase-js/g) || []).length > 0) { frameworks.push(' ticketbase-js'); }
	if ((lowerString.match(/\/timeago.js/g) || []).length > 0) { frameworks.push(' timeago.js'); }
	if ((lowerString.match(/\/timecircles/g) || []).length > 0) { frameworks.push(' timecircles'); }
	if ((lowerString.match(/\/timekit-js-sdk/g) || []).length > 0) { frameworks.push(' timekit-js-sdk'); }
	if ((lowerString.match(/\/timeline.css/g) || []).length > 0) { frameworks.push(' timeline.css'); }
	if ((lowerString.match(/\/timelinejs/g) || []).length > 0) { frameworks.push(' timelinejs'); }
	if ((lowerString.match(/\/timepicker/g) || []).length > 0) { frameworks.push(' timepicker'); }
	if ((lowerString.match(/\/timezone-js/g) || []).length > 0) { frameworks.push(' timezone-js'); }
	if ((lowerString.match(/\/tinycolorpicker/g) || []).length > 0) { frameworks.push(' tinycolorpicker'); }
	if ((lowerString.match(/\/tinycolor/g) || []).length > 0) { frameworks.push(' tinycolor'); }
	if ((lowerString.match(/\/tinycon/g) || []).length > 0) { frameworks.push(' tinycon'); }
	if ((lowerString.match(/\/tinymce/g) || []).length > 0) { frameworks.push(' tinymce'); }
	if ((lowerString.match(/\/tinyscrollbar/g) || []).length > 0) { frameworks.push(' tinyscrollbar'); }
	if ((lowerString.match(/\/tinysort/g) || []).length > 0) { frameworks.push(' tinysort'); }
	if ((lowerString.match(/\/tipso/g) || []).length > 0) { frameworks.push(' tipso'); }
	if ((lowerString.match(/\/titatoggle/g) || []).length > 0) { frameworks.push(' titatoggle'); }
	if ((lowerString.match(/\/tmlib.js/g) || []).length > 0) { frameworks.push(' tmlib.js'); }
	if ((lowerString.match(/\/to-markdown/g) || []).length > 0) { frameworks.push(' to-markdown'); }
	if ((lowerString.match(/\/toast-css/g) || []).length > 0) { frameworks.push(' toast-css'); }
	if ((lowerString.match(/\/toastr.js/g) || []).length > 0) { frameworks.push(' toastr.js'); }
	if ((lowerString.match(/\/tocbot/g) || []).length > 0) { frameworks.push(' tocbot'); }
	if ((lowerString.match(/\/tocktimer/g) || []).length > 0) { frameworks.push(' tocktimer'); }
	if ((lowerString.match(/\/todc-bootstrap/g) || []).length > 0) { frameworks.push(' todc-bootstrap'); }
	if ((lowerString.match(/\/tone\//g) || []).length > 0) { frameworks.push(' tone'); }
	if ((lowerString.match(/\/tooltipster/g) || []).length > 0) { frameworks.push(' tooltipster'); }
	if ((lowerString.match(/\/topcoat-icons/g) || []).length > 0) { frameworks.push(' topcoat-icons'); }
	if ((lowerString.match(/\/topcoat/g) || []).length > 0) { frameworks.push(' topcoat'); }
	if ((lowerString.match(/\/topojson/g) || []).length > 0) { frameworks.push(' topojson'); }
	if ((lowerString.match(/\/tota11y/g) || []).length > 0) { frameworks.push(' tota11y'); }
	if ((lowerString.match(/\/touchjs/g) || []).length > 0) { frameworks.push(' touchjs'); }
	if ((lowerString.match(/\/toxiclibsjs/g) || []).length > 0) { frameworks.push(' toxiclibsjs'); }
	if ((lowerString.match(/\/tracking.js/g) || []).length > 0) { frameworks.push(' tracking.js'); }
	if ((lowerString.match(/\/transitionize/g) || []).length > 0) { frameworks.push(' transitionize'); }
	if ((lowerString.match(/\/transparency/g) || []).length > 0) { frameworks.push(' transparency'); }
	if ((lowerString.match(/\/treesaver/g) || []).length > 0) { frameworks.push(' treesaver'); }
	if ((lowerString.match(/\/triangles/g) || []).length > 0) { frameworks.push(' triangles'); }
	if ((lowerString.match(/\/trianglify/g) || []).length > 0) { frameworks.push(' trianglify'); }
	if ((lowerString.match(/\/trix/g) || []).length > 0) { frameworks.push(' trix'); }
	if ((lowerString.match(/\/trunk8/g) || []).length > 0) { frameworks.push(' trunk8'); }
	if ((lowerString.match(/\/tunajs/g) || []).length > 0) { frameworks.push(' tunajs'); }
	if ((lowerString.match(/\/turbolinks/g) || []).length > 0) { frameworks.push(' turbolinks'); }
	if ((lowerString.match(/\/turn.js/g) || []).length > 0) { frameworks.push(' turn.js'); }
	if ((lowerString.match(/\/tv4/g) || []).length > 0) { frameworks.push(' tv4'); }
	if ((lowerString.match(/\/twbs-pagination/g) || []).length > 0) { frameworks.push(' twbs-pagination'); }
	if ((lowerString.match(/\/tween.js/g) || []).length > 0) { frameworks.push(' tween.js'); }
	if ((lowerString.match(/\/tweene/g) || []).length > 0) { frameworks.push(' tweene'); }
	if ((lowerString.match(/\/tweenjs/g) || []).length > 0) { frameworks.push(' tweenjs'); }
	if ((lowerString.match(/\/tweet\//g) || []).length > 0) { frameworks.push(' tweet'); }
	if ((lowerString.match(/\/tweetnacl/g) || []).length > 0) { frameworks.push(' tweetnacl'); }
	if ((lowerString.match(/\/twemoji/g) || []).length > 0) { frameworks.push(' twemoji'); }
	if ((lowerString.match(/\/twig.js/g) || []).length > 0) { frameworks.push(' twig.js'); }
	if ((lowerString.match(/\/twilio.js/g) || []).length > 0) { frameworks.push(' twilio.js'); }
	if ((lowerString.match(/\/twine/g) || []).length > 0) { frameworks.push(' twine'); }
	if ((lowerString.match(/\/twitter-bootstrap-wizard/g) || []).length > 0) { frameworks.push(' twitter-bootstrap-wizard'); }
	if ((lowerString.match(/\/twitter-bootstrap/g) || []).length > 0) { frameworks.push(' twitter-bootstrap'); }
	if ((lowerString.match(/\/twitterlib.js/g) || []).length > 0) { frameworks.push(' twitterlib.js'); }
	if ((lowerString.match(/\/twix.js/g) || []).length > 0) { frameworks.push(' twix.js'); }
	if ((lowerString.match(/\/two.js/g) || []).length > 0) { frameworks.push(' two.js'); }
	if ((lowerString.match(/\/txt.wav/g) || []).length > 0) { frameworks.push(' txt.wav'); }
	if ((lowerString.match(/\/typeahead-addresspicker/g) || []).length > 0) { frameworks.push(' typeahead-addresspicker'); }
	if ((lowerString.match(/\/typeahead.js/g) || []).length > 0) { frameworks.push(' typeahead.js'); }
	if ((lowerString.match(/\/typed.js/g) || []).length > 0) { frameworks.push(' typed.js'); }
	if ((lowerString.match(/\/typeit/g) || []).length > 0) { frameworks.push(' typeit'); }
	if ((lowerString.match(/\/typeplate-starter-kit/g) || []).length > 0) { frameworks.push(' typeplate-starter-kit'); }
	if ((lowerString.match(/\/typescript/g) || []).length > 0) { frameworks.push(' typescript'); }
	if ((lowerString.match(/\/typicons/g) || []).length > 0) { frameworks.push(' typicons'); }
	if ((lowerString.match(/\/ui-router-extras/g) || []).length > 0) { frameworks.push(' ui-router-extras'); }
	if ((lowerString.match(/\/ui-selectablescroll/g) || []).length > 0) { frameworks.push(' ui-selectablescroll'); }
	if ((lowerString.match(/\/uikit/g) || []).length > 0) { frameworks.push(' uikit'); }
	if ((lowerString.match(/\/umbrella/g) || []).length > 0) { frameworks.push(' umbrella'); }
	if ((lowerString.match(/\/underscore-contrib/g) || []).length > 0) { frameworks.push(' underscore-contrib'); }
	if ((lowerString.match(/\/underscore.js/g) || []).length > 0) { frameworks.push(' underscore.js'); }
	if ((lowerString.match(/\/underscore.string/g) || []).length > 0) { frameworks.push(' underscore.string'); }
	if ((lowerString.match(/\/unibox/g) || []).length > 0) { frameworks.push(' unibox'); }
	if ((lowerString.match(/\/unitegallery/g) || []).length > 0) { frameworks.push(' unitegallery'); }
	if ((lowerString.match(/\/universal-mixin/g) || []).length > 0) { frameworks.push(' universal-mixin'); }
	if ((lowerString.match(/\/unsemantic/g) || []).length > 0) { frameworks.push(' unsemantic'); }
	if ((lowerString.match(/\/unslider/g) || []).length > 0) { frameworks.push(' unslider'); }
	if ((lowerString.match(/\/unveil/g) || []).length > 0) { frameworks.push(' unveil'); }
	if ((lowerString.match(/\/upb\//g) || []).length > 0) { frameworks.push(' upb'); }
	if ((lowerString.match(/\/urljs/g) || []).length > 0) { frameworks.push(' urljs'); }
	if ((lowerString.match(/\/use.js/g) || []).length > 0) { frameworks.push(' use.js'); }
	if ((lowerString.match(/\/userinfo/g) || []).length > 0) { frameworks.push(' userinfo'); }
	if ((lowerString.match(/\/usertiming/g) || []).length > 0) { frameworks.push(' usertiming'); }
	if ((lowerString.match(/\/uswds/g) || []).length > 0) { frameworks.push(' uswds'); }
	if ((lowerString.match(/\/utf8/g) || []).length > 0) { frameworks.push(' utf8'); }
	if ((lowerString.match(/\/uvcharts/g) || []).length > 0) { frameworks.push(' uvcharts'); }
	if ((lowerString.match(/\/valid.js/g) || []).length > 0) { frameworks.push(' valid.js'); }
	if ((lowerString.match(/\/validate.js/g) || []).length > 0) { frameworks.push(' validate.js'); }
	if ((lowerString.match(/\/validator/g) || []).length > 0) { frameworks.push(' validator'); }
	if ((lowerString.match(/\/validatorjs/g) || []).length > 0) { frameworks.push(' validatorjs'); }
	if ((lowerString.match(/\/valjs/g) || []).length > 0) { frameworks.push(' valjs'); }
	if ((lowerString.match(/\/vanilla-masker/g) || []).length > 0) { frameworks.push(' vanilla-masker'); }
	if ((lowerString.match(/\/vanilla-modal/g) || []).length > 0) { frameworks.push(' vanilla-modal'); }
	if ((lowerString.match(/\/vault.js/g) || []).length > 0) { frameworks.push(' vault.js'); }
	if ((lowerString.match(/\/vega-lite/g) || []).length > 0) { frameworks.push(' vega-lite'); }
	if ((lowerString.match(/\/vega\//g) || []).length > 0) { frameworks.push(' vega'); }
	if ((lowerString.match(/\/vegas\//g) || []).length > 0) { frameworks.push(' vegas'); }
	if ((lowerString.match(/\/veinjs/g) || []).length > 0) { frameworks.push(' veinjs'); }
	if ((lowerString.match(/\/velocity/g) || []).length > 0) { frameworks.push(' velocity'); }
	if ((lowerString.match(/\/venobox/g) || []).length > 0) { frameworks.push(' venobox'); }
	if ((lowerString.match(/\/verify\//g) || []).length > 0) { frameworks.push(' verify'); }
	if ((lowerString.match(/\/vertx/g) || []).length > 0) { frameworks.push(' vertx'); }
	if ((lowerString.match(/\/vex-js/g) || []).length > 0) { frameworks.push(' vex-js'); }
	if ((lowerString.match(/\/vibrant.js/g) || []).length > 0) { frameworks.push(' vibrant.js'); }
	if ((lowerString.match(/\/victory/g) || []).length > 0) { frameworks.push(' victory'); }
	if ((lowerString.match(/\/videojs/g) || []).length > 0) { frameworks.push(' video.js'); }
	if ((lowerString.match(/\/video.js/g) || []).length > 0) { frameworks.push(' video.js'); }
	if ((lowerString.match(/\/videogular-themes-default/g) || []).length > 0) { frameworks.push(' videogular-themes-default'); }
	if ((lowerString.match(/\/videogular/g) || []).length > 0) { frameworks.push(' videogular'); }
	if ((lowerString.match(/\/videojs-contrib-ads/g) || []).length > 0) { frameworks.push(' videojs-contrib-ads'); }
	if ((lowerString.match(/\/videojs-contrib-dash/g) || []).length > 0) { frameworks.push(' videojs-contrib-dash'); }
	if ((lowerString.match(/\/videojs-contrib-hls/g) || []).length > 0) { frameworks.push(' videojs-contrib-hls'); }
	if ((lowerString.match(/\/videojs-resolution-switcher/g) || []).length > 0) { frameworks.push(' videojs-resolution-switcher'); }
	if ((lowerString.match(/\/videojs-swf/g) || []).length > 0) { frameworks.push(' videojs-swf'); }
	if ((lowerString.match(/\/videojs-vast-vpaid/g) || []).length > 0) { frameworks.push(' videojs-vast-vpaid'); }
	if ((lowerString.match(/\/videojs-youtube/g) || []).length > 0) { frameworks.push(' videojs-youtube'); }
	if ((lowerString.match(/\/videomail-client/g) || []).length > 0) { frameworks.push(' videomail-client'); }
	if ((lowerString.match(/\/vidom/g) || []).length > 0) { frameworks.push(' vidom'); }
	if ((lowerString.match(/\/viewer.js/g) || []).length > 0) { frameworks.push(' viewer.js'); }
	if ((lowerString.match(/\/viewerjs/g) || []).length > 0) { frameworks.push(' viewerjs'); }
	if ((lowerString.match(/\/viewport-units-buggyfill/g) || []).length > 0) { frameworks.push(' viewport-units-buggyfill'); }
	if ((lowerString.match(/\/vimeo.ga.js/g) || []).length > 0) { frameworks.push(' vimeo.ga.js'); }
	if ((lowerString.match(/\/virtual-keyboard/g) || []).length > 0) { frameworks.push(' virtual-keyboard'); }
	if ((lowerString.match(/\/vis\//g) || []).length > 0) { frameworks.push(' vis'); }
	if ((lowerString.match(/\/visibility.js/g) || []).length > 0) { frameworks.push(' visibility.js'); }
	if ((lowerString.match(/\/visibly.js/g) || []).length > 0) { frameworks.push(' visibly.js'); }
	if ((lowerString.match(/\/vissense/g) || []).length > 0) { frameworks.push(' vissense'); }
	if ((lowerString.match(/\/vivus/g) || []).length > 0) { frameworks.push(' vivus'); }
	if ((lowerString.match(/\/viz.js/g) || []).length > 0) { frameworks.push(' viz.js'); }
	if ((lowerString.match(/\/vizceral/g) || []).length > 0) { frameworks.push(' vizceral'); }
	if ((lowerString.match(/\/vocalizer/g) || []).length > 0) { frameworks.push(' vocalizer'); }
	if ((lowerString.match(/\/vquery/g) || []).length > 0) { frameworks.push(' vquery'); }
	if ((lowerString.match(/\/vtt.js/g) || []).length > 0) { frameworks.push(' vtt.js'); }
	if ((lowerString.match(/\/vue-async-data/g) || []).length > 0) { frameworks.push(' vue-async-data'); }
	if ((lowerString.match(/\/vue-focus/g) || []).length > 0) { frameworks.push(' vue-focus'); }
	if ((lowerString.match(/\/vue-form/g) || []).length > 0) { frameworks.push(' vue-form'); }
	if ((lowerString.match(/\/vue-google-maps/g) || []).length > 0) { frameworks.push(' vue-google-maps'); }
	if ((lowerString.match(/\/vue-i18n/g) || []).length > 0) { frameworks.push(' vue-i18n'); }
	if ((lowerString.match(/\/vue-material-components/g) || []).length > 0) { frameworks.push(' vue-material-components'); }
	if ((lowerString.match(/\/vue-resource/g) || []).length > 0) { frameworks.push(' vue-resource'); }
	if ((lowerString.match(/\/vue-router/g) || []).length > 0) { frameworks.push(' vue-router'); }
	if ((lowerString.match(/\/vue-smart-table/g) || []).length > 0) { frameworks.push(' vue-smart-table'); }
	if ((lowerString.match(/\/vue-strap/g) || []).length > 0) { frameworks.push(' vue-strap'); }
	if ((lowerString.match(/\/vue-validator/g) || []).length > 0) { frameworks.push(' vue-validator'); }
	if ((lowerString.match(/\/vue\//g) || []).length > 0) { frameworks.push(' vue'); }
	if ((lowerString.match(/\/vuefire/g) || []).length > 0) { frameworks.push(' vuefire'); }
	if ((lowerString.match(/\/vuejs-paginator/g) || []).length > 0) { frameworks.push(' vuejs-paginator'); }
	if ((lowerString.match(/\/vuex/g) || []).length > 0) { frameworks.push(' vuex'); }
	if ((lowerString.match(/\/w2ui/g) || []).length > 0) { frameworks.push(' w2ui'); }
	if ((lowerString.match(/\/wallop/g) || []).length > 0) { frameworks.push(' wallop'); }
	if ((lowerString.match(/\/watch\//g) || []).length > 0) { frameworks.push(' watch'); }
	if ((lowerString.match(/\/waterfall.js/g) || []).length > 0) { frameworks.push(' waterfall.js'); }
	if ((lowerString.match(/\/waud.js/g) || []).length > 0) { frameworks.push(' waud.js'); }
	if ((lowerString.match(/\/wavedrom/g) || []).length > 0) { frameworks.push(' wavedrom'); }
	if ((lowerString.match(/\/wavesurfer.js/g) || []).length > 0) { frameworks.push(' wavesurfer.js'); }
	if ((lowerString.match(/\/waypoints/g) || []).length > 0) { frameworks.push(' waypoints'); }
	if ((lowerString.match(/\/wdt-loading/g) || []).length > 0) { frameworks.push(' wdt-loading'); }
	if ((lowerString.match(/\/weather-icons/g) || []).length > 0) { frameworks.push(' weather-icons'); }
	if ((lowerString.match(/\/weather/g) || []).length > 0) { frameworks.push(' weather'); }
	if ((lowerString.match(/\/web-animations/g) || []).length > 0) { frameworks.push(' web-animations'); }
	if ((lowerString.match(/\/web-socket-js/g) || []).length > 0) { frameworks.push(' web-socket-js'); }
	if ((lowerString.match(/\/web-starter-kit/g) || []).length > 0) { frameworks.push(' web-starter-kit'); }
	if ((lowerString.match(/\/webcamjs/g) || []).length > 0) { frameworks.push(' webcamjs'); }
	if ((lowerString.match(/\/webcomponentsjs/g) || []).length > 0) { frameworks.push(' webcomponentsjs'); }	
	if ((lowerString.match(/\/webicons/g) || []).length > 0) { frameworks.push(' webicons'); }
	if ((lowerString.match(/\/webkit.js/g) || []).length > 0) { frameworks.push(' webkit.js'); }
	if ((lowerString.match(/\/webshim/g) || []).length > 0) { frameworks.push(' webshim'); }
	if ((lowerString.match(/\/websqltracer/g) || []).length > 0) { frameworks.push(' websqltracer'); }
	if ((lowerString.match(/\/webtorrent/g) || []).length > 0) { frameworks.push(' webtorrent'); }
	if ((lowerString.match(/\/webui-popover/g) || []).length > 0) { frameworks.push(' webui-popover'); }
	if ((lowerString.match(/\/webuploader/g) || []).length > 0) { frameworks.push(' webuploader'); }
	if ((lowerString.match(/\/wechat.js/g) || []).length > 0) { frameworks.push(' wechat.js'); }
	if ((lowerString.match(/\/weui/g) || []).length > 0) { frameworks.push(' weui'); }
	if ((lowerString.match(/\/what-input/g) || []).length > 0) { frameworks.push(' what-input'); }
	if ((lowerString.match(/\/when/g) || []).length > 0) { frameworks.push(' when'); }
	if ((lowerString.match(/\/whereyat/g) || []).length > 0) { frameworks.push(' whereyat'); }
	if ((lowerString.match(/\/wicket/g) || []).length > 0) { frameworks.push(' wicket'); }
	if ((lowerString.match(/\/wingcss/g) || []).length > 0) { frameworks.push(' wingcss'); }
	if ((lowerString.match(/\/winjs/g) || []).length > 0) { frameworks.push(' winjs'); }
	if ((lowerString.match(/\/wnumb/g) || []).length > 0) { frameworks.push(' wnumb'); }
	if ((lowerString.match(/\/wordcloud2.js/g) || []).length > 0) { frameworks.push(' wordcloud2.js'); }
	if ((lowerString.match(/\/wow\//g) || []).length > 0) { frameworks.push(' wow'); }
	if ((lowerString.match(/\/wuzzle/g) || []).length > 0) { frameworks.push(' wuzzle'); }
	if ((lowerString.match(/\/wysihtml/g) || []).length > 0) { frameworks.push(' wysihtml'); }
	if ((lowerString.match(/\/wysihtml5/g) || []).length > 0) { frameworks.push(' wysihtml5'); }
	if ((lowerString.match(/\/x-editable/g) || []).length > 0) { frameworks.push(' x-editable'); }
	if ((lowerString.match(/\/x-tag/g) || []).length > 0) { frameworks.push(' x-tag'); }
	if ((lowerString.match(/\/x18n/g) || []).length > 0) { frameworks.push(' x18n'); }
	if ((lowerString.match(/\/x2js/g) || []).length > 0) { frameworks.push(' x2js'); }
	if ((lowerString.match(/\/xcharts/g) || []).length > 0) { frameworks.push(' xcharts'); }
	if ((lowerString.match(/\/xdomain/g) || []).length > 0) { frameworks.push(' xdomain'); }
	if ((lowerString.match(/\/xhook/g) || []).length > 0) { frameworks.push(' xhook'); }
	if ((lowerString.match(/\/xively-js/g) || []).length > 0) { frameworks.push(' xively-js'); }
	if ((lowerString.match(/\/xls\//g) || []).length > 0) { frameworks.push(' xls'); }
	if ((lowerString.match(/\/xlsx/g) || []).length > 0) { frameworks.push(' xlsx'); }
	if ((lowerString.match(/\/xregexp/g) || []).length > 0) { frameworks.push(' xregexp'); }
	if ((lowerString.match(/\/xuijs/g) || []).length > 0) { frameworks.push(' xuijs'); }
	if ((lowerString.match(/\/yaireo-validator/g) || []).length > 0) { frameworks.push(' yaireo-validator'); }
	if ((lowerString.match(/\/yamlcss/g) || []).length > 0) { frameworks.push(' yamlcss'); }
	if ((lowerString.match(/\/yamljs/g) || []).length > 0) { frameworks.push(' yamljs'); }
	if ((lowerString.match(/\/yasgui/g) || []).length > 0) { frameworks.push(' yasgui'); }
	if ((lowerString.match(/\/yasqe/g) || []).length > 0) { frameworks.push(' yasqe'); }
	if ((lowerString.match(/\/yasr/g) || []).length > 0) { frameworks.push(' yasr'); }
	if ((lowerString.match(/\/yepnope/g) || []).length > 0) { frameworks.push(' yepnope'); }
	if ((lowerString.match(/\/yui/g) || []).length > 0) { frameworks.push(' yui'); }
	if ((lowerString.match(/\/z-schema/g) || []).length > 0) { frameworks.push(' z-schema'); }
	if ((lowerString.match(/\/ztree.v3/g) || []).length > 0) { frameworks.push(' ztree.v3'); }
	if ((lowerString.match(/\/zabuto_calendar/g) || []).length > 0) { frameworks.push(' zabuto_calendar'); }
	if ((lowerString.match(/\/zclip/g) || []).length > 0) { frameworks.push(' zclip'); }
	if ((lowerString.match(/\/zepto.fullpage/g) || []).length > 0) { frameworks.push(' zepto.fullpage'); }
	if ((lowerString.match(/\/zepto/g) || []).length > 0) { frameworks.push(' zepto'); }
	if ((lowerString.match(/\/zeroclipboard/g) || []).length > 0) { frameworks.push(' zeroclipboard'); }
	if ((lowerString.match(/\/zingchart/g) || []).length > 0) { frameworks.push(' zingchart'); }
	if ((lowerString.match(/\/zingtouch/g) || []).length > 0) { frameworks.push(' zingtouch'); }
	if ((lowerString.match(/\/zone.js/g) || []).length > 0) { frameworks.push(' zone.js'); }
	if ((lowerString.match(/\/zoom.js/g) || []).length > 0) { frameworks.push(' zoom.js'); }
	if ((lowerString.match(/\/zoomooz/g) || []).length > 0) { frameworks.push(' zoomooz'); }
	if ((lowerString.match(/\/zui/g) || []).length > 0) { frameworks.push(' zui'); }
	if ((lowerString.match(/\/zurb-ink/g) || []).length > 0) { frameworks.push(' zurb-ink'); }
	if ((lowerString.match(/\/zxcvbn/g) || []).length > 0) { frameworks.push(' zxcvbn'); }			

	// count the ads
	var adCount = 0;

	// cycle through all the ads
	for (i = 0; i < MAXADS; i++) {
    
		if (adList[i]) {
	
			if (lowerString.indexOf(adList[i]) >= 0) {
							
				let reVar = new RegExp(adList[i], 'g');				
				adCount = adCount + (lowerString.match(reVar) || []).length;

			} 
		
		}

	}

	// pull the text from the p's - ignore any text not within a <p></p>
	let pText = response;
	
	// make sure all p's are lowercase for string extraction
	pText = response.replace(/P>/g, 'p>');

	// split into p's leading fragments - assumes no nested p's inside of p's
	let firstSplit = pText.split("<p>");

	let secondSplit = [];
	let pCurrent = "";
	let pArray = [];

	// cycle through fragments and get string before </p>, start at first <p> filtering off beginning
	for (var j = 1; j < firstSplit.length; j++) {

		// split into </p>
		secondSplit = firstSplit[j].split("</p>");
		
		if (secondSplit.length > 0) {
		
			// trim the p
			pCurrent = secondSplit[0].trim();
			
			// remove line breaks and carriage returns
			pCurrent = pCurrent.replace(/(\r\n|\n|\r)/gm, " ");
			pCurrent = pCurrent.replace(/[\n\r]/g, ' ');
			
			// push p onto array
			pArray.push(pCurrent);
			
		}
		
	}
	
	// validate p's exist
	if (pArray.length > 0) {

		// reset the pText
		pText = '';
		
		// cycle through and concatenate p's
		for (var i = 0; i < pArray.length; i++) {
		
			// add a space between p's
			pText = pText.trim() + " " + pArray[i];
			
		}
	
	} else {
	
		// pText does not exist
		pText = "Spince extracted sentence not found.";		
	
	}
	
	// calculate the textCount (% that is pText within body)
	var textCount = 0;
	var bodyCount = 0;

	// check for body tags in response
	if ((lowerString.indexOf('<body') > 0) && (lowerString.indexOf('/body>') > 0)) {
	
		// split after body
		let bodyStringArray1 = lowerString.split('<body');
		
		if (bodyStringArray1.length >= 2) {
		
			let bodyStringArray2 = bodyStringArray1[1].split('/body>');
			bodyCount = bodyStringArray2[0].length;
			
		}
		
	}
	
	if (bodyCount > 0) {

		// calculate the percent text to body count
		textCount = pText.length / bodyCount; 

		// round percentage
		textCount = Math.round(textCount * 100);

	}

	// send the data back to the tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {"message": "pTextLink", "randNo": randNo, "linkNo": linkNo, "pText": pText, "imageCount": imageCount, "videoCount": videoCount, "audioCount": audioCount, "formCount": formCount, "scriptCount": scriptCount, "listCount": listCount, "buttonCount": buttonCount, "canvasCount": canvasCount, "linkCount": linkCount, "tableCount": tableCount, "frameworks": frameworks.toString(), "adCount": adCount, "textCount": textCount}, function(response) {});  
	});					
	
}

// populate the adList
const MAXADS = 5853; 

adList[0] = '&ad_box_';
adList[1] = '&ad_channel=';
adList[2] = '&ad_classid=';
adList[3] = '&ad_height=';
adList[4] = '&ad_keyword=';
adList[5] = '&ad_network_';
adList[6] = '&ad_number=';
adList[7] = '&ad_type=';
adList[8] = '&ad_type_';
adList[9] = '&ad_url=';
adList[10] = '&ad_zones=';
adList[11] = '&adbannerid=';
adList[12] = '&adclient=';
adList[13] = '&adcount=';
adList[14] = '&adgroupid=';
adList[15] = '&admeld_';
adList[16] = '&admid=';
adList[17] = '&adname=';
adList[18] = '&adnet=';
adList[19] = '&adnum=';
adList[20] = '&adpageurl=';
adList[21] = '&ads_dfp=';
adList[22] = '&adsafe=';
adList[23] = '&adserv=';
adList[24] = '&adserver=';
adList[25] = '&adsize=';
adList[26] = '&adslot=';
adList[27] = '&adslots=';
adList[28] = '&adsourceid=';
adList[29] = '&adspace=';
adList[30] = '&adsrc=';
adList[31] = '&adstype=';
adList[32] = '&adtype=preroll&';
adList[33] = '&adunit=';
adList[34] = '&adurl=';
adList[35] = '&adv_keywords=';
adList[36] = '&advert_';
adList[37] = '&advertiserid=';
adList[38] = '&advid=$~image';
adList[39] = '&advtile=';
adList[40] = '&adzone=';
adList[41] = '&banner_id=';
adList[42] = '&clicktag=http';
adList[43] = '&customsizead=';
adList[44] = '&displayads=';
adList[45] = '&expandable_ad_';
adList[46] = '&forceadv=';
adList[47] = '&gincludeexternalads=';
adList[48] = '&googleadword=';
adList[49] = '&jumpstartadformat=';
adList[50] = '&largead=';
adList[51] = '&maxads=';
adList[52] = '&popunder=';
adList[53] = '&program=revshare&';
adList[54] = '&show_ad_';
adList[55] = '&showad=';
adList[56] = '&simple_ad_';
adList[57] = '&smallad=';
adList[58] = '&smart_ad_';
adList[59] = '&strategy=adsense&';
adList[60] = '&type=ad&';
adList[61] = '&urladparam=';
adList[62] = '&video_ads_';
adList[63] = '&videoadid=';
adList[64] = '&view=ad&';
adList[65] = 'advertorial.';
adList[66] = '+adverts\/';
adList[67] = '-2\/ads\/';
adList[68] = '-2011ad_';
adList[69] = '-300x100ad2.';
adList[70] = '-ad-001-';
adList[71] = '-ad-180x150px.';
adList[72] = '-ad-200x200-';
adList[73] = '-ad-24x24.';
adList[74] = '-ad-300x250.';
adList[75] = '-ad-300x450.';
adList[76] = '-ad-300x600-';
adList[77] = '-ad-303x481-';
adList[78] = '-ad-313x232.';
adList[79] = '-ad-336x280-';
adList[80] = '-ad-340x400-';
adList[81] = 'ad-400';
adList[82] = '-ad-banner-';
adList[83] = '-ad-banner.';
adList[84] = '-ad-big.';
adList[85] = '-ad-bottom-';
adList[86] = '-ad-button-';
adList[87] = '-ad-category-';
adList[88] = '-ad-choices.';
adList[89] = '-ad-column-';
adList[90] = '-ad-cube.';
adList[91] = '-ad-data\/';
adList[92] = '-ad-ero-';
adList[93] = '-ad-exo-';
adList[94] = '-ad-gif-';
adList[95] = '-ad-gif1-';
adList[96] = '-ad-home.';
adList[97] = '-ad-hrule-';
adList[98] = '-ad-hrule.';
adList[99] = '-ad-iframe\/';
adList[100] = '-ad-large.';
adList[101] = '-ad-left.';
adList[102] = '-ad-limits.';
adList[103] = '-ad-loading.';
adList[104] = '-ad-manager\/$~stylesheet';
adList[105] = '-ad-marker.';
adList[106] = '-ad-mpu+';
adList[107] = '-ad-new_';
adList[108] = '-ad-pixel-';
adList[109] = '-ad-refresh.';
adList[110] = '-ad-refresh\/';
adList[111] = '-ad-resize-';
adList[112] = '-ad-right.';
adList[113] = '-ad-rotator-';
adList[114] = '-ad-rotators\/';
adList[115] = '-ad-server\/';
adList[116] = '-ad-sidebar-';
adList[117] = '-ad-switcher.';
adList[118] = '-ad-text_';
adList[119] = '-ad-tile.';
adList[120] = '-ad-top.';
adList[121] = '-ad-unit.';
adList[122] = '-ad-unit\/';
adList[123] = '-ad-util-';
adList[124] = '-ad-util.';
adList[125] = '-ad-vertical-';
adList[126] = '-ad-zone.';
adList[127] = '-ad.jpg.pagespeed.';
adList[128] = '-ad.jpg?';
adList[129] = '-ad.jsp|';
adList[130] = '-ad.php?';
adList[131] = '-ad\/embed.';
adList[132] = '-ad\/main.';
adList[133] = '-ad\/right_';
adList[134] = '-ad03.';
adList[135] = '-ad1.';
adList[136] = '-ad2.';
adList[137] = '-ad2_';
adList[138] = '-ad3.';
adList[139] = '-ad300x250.';
adList[140] = '-ad300x90-';
adList[141] = '-ad4.';
adList[142] = '-ad5.';
adList[143] = '-ad_125x125.';
adList[144] = '-ad_banner-';
adList[145] = '-ad_injector\/';
adList[146] = '-ad_leaderboard\/';
adList[147] = '-adap.$domain=~l-adap.org';
adList[148] = '-adblack-';
adList[149] = '-adcentre.';
adList[150] = '-adchain.';
adList[151] = '-adhelper.';
adList[152] = '-adhere2.';
adList[153] = '-adimage-';
adList[154] = '-admarvel\/';
adList[155] = '-adnow.';
adList[156] = '-adops.';
adList[157] = '-adrotation.';
adList[158] = '-ads-180x';
adList[159] = '-ads-728x';
adList[160] = '-ads-banner.';
adList[161] = '-ads-bottom.';
adList[162] = '-ads-iframe.';
adList[163] = '-ads-init&';
adList[164] = '-ads-management\/';
adList[165] = '-ads-manager\/';
adList[166] = '-ads-master\/';
adList[167] = '-ads-ns.';
adList[168] = '-ads-placement.';
adList[169] = '-ads-right.';
adList[170] = '-ads-widget\/';
adList[171] = '-ads-widget?';
adList[172] = '-ads.generated.';
adList[173] = '-ads.gif';
adList[174] = '-ads.js?';
adList[175] = '-ads.php?';
adList[176] = '-ads.swf';
adList[177] = '-ads\/728x';
adList[178] = '-ads\/ad-';
adList[179] = '-ads\/assets\/';
adList[180] = '-ads\/img\/';
adList[181] = '-ads\/oas\/';
adList[182] = '-ads\/static-';
adList[183] = '-ads\/video.';
adList[184] = '-ads1.htm';
adList[185] = '-ads2.htm';
adList[186] = '-ads3.htm';
adList[187] = '-ads4.htm';
adList[188] = '-ads_728x902.';
adList[189] = '-ads_9_3.';
adList[190] = '-ads_billboard_';
adList[191] = '-adscript.';
adList[192] = '-adsense2.';
adList[193] = '-adserver-';
adList[194] = '-adserver\/';
adList[195] = '-adsonar.';
adList[196] = '-adspace.';
adList[197] = '-adspace_';
adList[198] = '-adspot-';
adList[199] = '-adswizz-';
adList[200] = '-adsystem-';
adList[201] = '-adtechfront.';
adList[202] = '-adtopbanner-';
adList[203] = '-adtrack.';
adList[204] = '-adv-v1\/';
adList[205] = '-adv.jpg';
adList[206] = '-adv.js';
adList[207] = '-advert-label-';
adList[208] = '-advert-placeholder.';
adList[209] = '-advert.jpg?';
adList[210] = '-advert.swf';
adList[211] = '-advert1.';
adList[212] = '-advert2.';
adList[213] = '-advert3.';
adList[214] = '-advert_august.';
adList[215] = '-advertise.$domain=~mb-advertise.gr';
adList[216] = '-advertise\/';
adList[217] = '-advertise01.';
adList[218] = '-advertisement-icon.';
adList[219] = '-advertisement.';
adList[220] = '-advertisement_';
adList[221] = '-advertising2-';
adList[222] = '-advertising_';
adList[223] = '-advertisment-';
adList[224] = '-adwords.$domain=~freelance-adwords.com|~freelance-adwords.fr';
adList[225] = '-affiliate-link.';
adList[226] = '-affiliates\/img_';
adList[227] = '-amazon-ads\/';
adList[228] = '-article-ad-';
adList[229] = '-article-ads-';
adList[230] = '-article-advert-';
adList[231] = '-banner-768';
adList[232] = '-banner-ad-';
adList[233] = '-banner-ad.';
adList[234] = '-banner-ad\/';
adList[235] = '-banner-ads-';
adList[236] = '-banner-ads\/';
adList[237] = '-banner-advert-';
adList[238] = '-banner.swf?';
adList[239] = '-banner300x250.';
adList[240] = '-banner468x60.';
adList[241] = '-bannerads\/';
adList[242] = '-bg_ads.';
adList[243] = '-billboard-ads\/';
adList[244] = '-bin\/ad_';
adList[245] = '-blog-ad-';
adList[246] = '-book-ad-';
adList[247] = '-box-ad.';
adList[248] = '-box2-ad?';
adList[249] = '-content-ad.';
adList[250] = '-contest-ad.';
adList[251] = '-contrib-ads\/';
adList[252] = '-cpm-ad.';
adList[253] = '-cpm-ads.';
adList[254] = '-dfp-ads\/';
adList[255] = '-euads.';
adList[256] = '-fe-ads\/';
adList[257] = '-featured-ads.';
adList[258] = '-featured-ads\/';
adList[259] = '-feed-ads.';
adList[260] = '-fleshlight2.';
adList[261] = '-floater_ads_';
adList[262] = '-floorboard-ads\/';
adList[263] = '-footerads-';
adList[264] = '-footerads.';
adList[265] = '-gallery_ad\/';
adList[266] = '-games\/ads\/';
adList[267] = '-google-ads-';
adList[268] = '-google-ads\/';
adList[269] = '-google-adsense.';
adList[270] = '-google2-ad-';
adList[271] = '-gpt-ad-$~xmlhttprequest';
adList[272] = '-housead-';
adList[273] = '-iframe-ad.';
adList[274] = '-iframe-ads\/';
adList[275] = '-image-ad.';
adList[276] = '-image\/ads\/';
adList[277] = '-images\/ad-';
adList[278] = '-img\/ads\/';
adList[279] = '-inspire-ad.';
adList[280] = '-intern-ads\/';
adList[281] = '-layer-ad.';
adList[282] = '-layer-ads\/';
adList[283] = '-leaderboard-ad-';
adList[284] = '-load-ads.';
adList[285] = '-load-advert.';
adList[286] = '-main\/ad.';
adList[287] = '-newad.';
adList[288] = '-news-ad-';
adList[289] = '-newsletter-ad-';
adList[290] = '-newstockad-';
adList[291] = '-online-advert.';
adList[292] = '-page-ad.';
adList[293] = '-page-ad?';
adList[294] = '-page-peel\/';
adList[295] = '-panel-ad.';
adList[296] = '-panel_ad_';
adList[297] = '-peel-ads-';
adList[298] = '-permads.';
adList[299] = '-pop-under\/';
adList[300] = '-popexit.';
adList[301] = '-popunder.';
adList[302] = '-popup-ad.';
adList[303] = '-popup-ads-';
adList[304] = '-pri\/adv-';
adList[305] = '-printhousead-';
adList[306] = '-publicidad.';
adList[307] = '-rectangle\/ad-';
adList[308] = '-results-sponsored.';
adList[309] = '-right-ad.';
adList[310] = '-rightrailad-';
adList[311] = '-rollout-ad-';
adList[312] = '-scrollads.';
adList[313] = '-seasonal-ad.';
adList[314] = '-show-ads.';
adList[315] = '-side-ad-';
adList[316] = '-side-ad.';
adList[317] = '-skyscraper-ad.';
adList[318] = '-skyscrapper160x600.';
adList[319] = '-small-ad.';
adList[320] = '-source\/ads\/';
adList[321] = '-sponsor-ad.';
adList[322] = '-sponsorad.';
adList[323] = '-sponsored-links-';
adList[324] = '-strip-ads-';
adList[325] = '-template-ads\/';
adList[326] = '-text-ads.';
adList[327] = '-theme\/ads\/';
adList[328] = '-third-ad.';
adList[329] = '-top-ad.';
adList[330] = '-top-ads.';
adList[331] = '-us\/ads\/';
adList[332] = '-video-ads\/';
adList[333] = '-web-ad-';
adList[334] = '-web-ad.';
adList[335] = '-web-ads.';
adList[336] = '-web-advert-';
adList[337] = '-web-advert.';
adList[338] = '-webad1.';
adList[339] = '-your-ads-here.';
adList[340] = '.1d\/ads\/';
adList[341] = '.ace.advertising.';
adList[342] = '.ad-cloud.';
adList[343] = '.ad-sys.';
adList[344] = '.ad-traffic.';
adList[345] = '.ad.final.';
adList[346] = '.ad.footer+';
adList[347] = '.ad.footer.';
adList[348] = '.ad.json?';
adList[349] = '.ad.page.';
adList[350] = '.ad.premiere.';
adList[351] = '.ad\/tag.';
adList[352] = '.ad1.nspace';
adList[353] = '.adbanner.';
adList[354] = '.adbutler-';
adList[355] = '.adcenter.';
adList[356] = '.adengine.';
adList[357] = '.adforge.';
adList[358] = '.adframesrc.';
adList[359] = '.adgearpubs.';
adList[360] = '.adgoitechnologie.';
adList[361] = '.adlabs.$domain=~adlabs.ru';
adList[362] = '.admarvel.';
adList[363] = '.adnetwork.$domain=~adnetwork.ie|~adnetwork.sk';
adList[364] = '.adpartner.';
adList[365] = '.adplacement=';
adList[366] = '.adresult.$domain=~adresult.ch';
adList[367] = '.adriver.$~object-subrequest';
adList[368] = '.adrotate.';
adList[369] = '.adru.';
adList[370] = '.ads-and-tracking.';
adList[371] = '.ads-lazy.';
adList[372] = '.ads-min.';
adList[373] = '.ads-tool.';
adList[374] = '.ads.controller.';
adList[375] = '.ads.core.';
adList[376] = '.ads.css';
adList[377] = '.ads.darla.';
adList[378] = '.ads.loader-';
adList[379] = '.ads.zones.';
adList[380] = '.ads1-';
adList[381] = '.ads1.';
adList[382] = '.ads2-';
adList[383] = '.ads3-';
adList[384] = '.ads_clickthru.';
adList[385] = '.adsbox.';
adList[386] = '.adsense.';
adList[387] = '.adserv\/';
adList[388] = '.adserver.';
adList[389] = '.adserver01.';
adList[390] = '.adserver1.';
adList[391] = '.adservice.$domain=~adservice.com';
adList[392] = '.adspace.';
adList[393] = '.adsremote.';
adList[394] = '.adtech_';
adList[395] = '.adtooltip&';
adList[396] = '.adv.cdn.';
adList[397] = '.advert.$domain=~advert.ly';
adList[398] = '.advertismentbottom.';
adList[399] = '.advertmarket.';
adList[400] = '.adwolf.';
adList[401] = '.ae\/ads\/';
adList[402] = '.ar\/ads\/';
adList[403] = '.ashx?ad=';
adList[404] = '.ashx?adid=';
adList[405] = '.asp?coad';
adList[406] = '.aspx?ad=';
adList[407] = '.aspx?adid=';
adList[408] = '.at\/ads\/';
adList[409] = '.au\/ads\/';
adList[410] = '.az\/adv\/';
adList[411] = '.banner%20ad.';
adList[412] = '.bbn.by\/';
adList[413] = '.be\/ads\/';
adList[414] = '.biz\/ad.';
adList[415] = '.biz\/ad\/';
adList[416] = '.biz\/ad2\/';
adList[417] = '.biz\/ads\/';
adList[418] = '.bns1.net\/';
adList[419] = '.box.ad.';
adList[420] = '.br\/ads\/';
adList[421] = '.bz\/ads\/';
adList[422] = '.ca\/ads\/';
adList[423] = '.cc\/ads\/';
adList[424] = '.cfm?ad=';
adList[425] = '.cfm?advideo%';
adList[426] = '.cgi?ad=';
adList[427] = '.ch\/ads\/';
adList[428] = '.ch\/adv\/';
adList[429] = '.clkads.';
adList[430] = '.club\/ads.';
adList[431] = '.co\/ads\/';
adList[432] = '.co\/ads?';
adList[433] = '.com\/?ad=';
adList[434] = '.com\/?wid=';
adList[435] = '.com\/a?network';
adList[436] = '.com\/a?pagetype';
adList[437] = '.com\/a?size';
adList[438] = '.com\/ad.$domain=~ad-tuning.de';
adList[439] = '.com\/ad\/$~image,third-party,domain=~mediaplex.com';
adList[440] = '.com\/ad\/$~third-party,domain=~blogs.technet.microsoft.com|~channel4.com|~linkedin.com|~mediaplex.com|~online.wsj.com';
adList[441] = '.com\/ad2\/';
adList[442] = '.com\/ad6\/';
adList[443] = '.com\/ad?';
adList[444] = '.com\/adclk?';
adList[445] = '.com\/adds\/';
adList[446] = '.com\/adgallery';
adList[447] = '.com\/adinf\/';
adList[448] = '.com\/adlib\/';
adList[449] = '.com\/adlib_';
adList[450] = '.com\/adpicture';
adList[451] = '.com\/ads-';
adList[452] = '.com\/ads.';
adList[453] = '.com\/ads\/$image,object,subdocument';
adList[454] = '.com\/ads?';
adList[455] = '.com\/ads_';
adList[456] = '.com\/adv\/';
adList[457] = '.com\/adv3\/';
adList[458] = '.com\/adv?';
adList[459] = '.com\/adv_';
adList[460] = '.com\/adx\/';
adList[461] = '.com\/adx_';
adList[462] = '.com\/adz\/';
adList[463] = '.com\/bads\/';
adList[464] = '.com\/doubleclick\/';
adList[465] = '.com\/gads\/';
adList[466] = '.com\/im-ad\/';
adList[467] = '.com\/im_ad\/';
adList[468] = '.com\/iplgadshow';
adList[469] = '.com\/js.ng\/';
adList[470] = '.com\/js\/ad.';
adList[471] = '.com\/js\/ads\/';
adList[472] = '.com\/js\/adsense';
adList[473] = '.com\/miads\/';
adList[474] = '.com\/peels\/';
adList[475] = '.com\/pm\/ad-';
adList[476] = '.com\/promodisplay?';
adList[477] = '.com\/ss\/ad\/';
adList[478] = '.com\/video-ad-';
adList[479] = '.cz\/affil\/';
adList[480] = '.cz\/bannery\/';
adList[481] = '.dartconfig.js';
adList[482] = '.digital\/ads\/';
adList[483] = '.displayads&';
adList[484] = '.ec\/ads\/';
adList[485] = '.eg\/ads\/';
adList[486] = '.es\/ads\/';
adList[487] = '.eu\/ads\/';
adList[488] = '.eu\/adv\/';
adList[489] = '.exp_ad-';
adList[490] = '.fm\/ads\/';
adList[491] = '.gg\/ads\/';
adList[492] = '.gif?ad=';
adList[493] = '.googledfpslot.';
adList[494] = '.gr\/ads\/';
adList[495] = '.hk\/ads\/';
adList[496] = '.homad.';
adList[497] = '.homepageadvertismentbottom.';
adList[498] = '.html?ad=';
adList[499] = '.html?ad_';
adList[500] = '.html?clicktag=';
adList[501] = '.iads.js';
adList[502] = '.ie\/ads\/';
adList[503] = '.il\/ads\/';
adList[504] = '.in\/ads.';
adList[505] = '.in\/ads\/';
adList[506] = '.info\/ad_';
adList[507] = '.info\/ads-';
adList[508] = '.info\/ads\/';
adList[509] = '.initdoubleclickadselementcontent?';
adList[510] = '.intad.';
adList[511] = '.intad\/';
adList[512] = '.internads.';
adList[513] = '.is\/ads\/';
adList[514] = '.jp\/ads\/';
adList[515] = '.jsp?adcode=';
adList[516] = '.ke\/ads\/';
adList[517] = '.lazyad-';
adList[518] = '.lazyload-ad-';
adList[519] = '.lazyload-ad.';
adList[520] = '.link\/ads\/';
adList[521] = '.lk\/ads\/';
adList[522] = '.me\/ads-';
adList[523] = '.me\/ads\/';
adList[524] = '.mobileads.';
adList[525] = '.mv\/ads\/';
adList[526] = '.mx\/ads\/';
adList[527] = '.my\/ads\/';
adList[528] = '.name\/ads\/';
adList[529] = '.net\/_adv\/';
adList[530] = '.net\/ad-';
adList[531] = '.net\/ad\/$~object-subrequest';
adList[532] = '.net\/ad2\/';
adList[533] = '.net\/ad_';
adList[534] = '.net\/adgallery';
adList[535] = '.net\/adj;';
adList[536] = '.net\/ads-';
adList[537] = '.net\/ads.';
adList[538] = '.net\/ads\/';
adList[539] = '.net\/ads?';
adList[540] = '.net\/ads_';
adList[541] = '.net\/adt?';
adList[542] = '.net\/adv\/';
adList[543] = '.net\/affiliate\/';
adList[544] = '.net\/bnr\/';
adList[545] = '.net\/flashads';
adList[546] = '.net\/gads\/';
adList[547] = '.net\/noidadx\/';
adList[548] = '.net\/pfadj\/';
adList[549] = '.net\/pops.js';
adList[550] = '.net\/vghd_';
adList[551] = '.nl\/ad2\/';
adList[552] = '.nl\/ads\/';
adList[553] = '.no\/ads\/';
adList[554] = '.nu\/ads\/';
adList[555] = '.nz\/ads\/';
adList[556] = '.oasfile.';
adList[557] = '.openad.';
adList[558] = '.openx.';
adList[559] = '.openxtag.';
adList[560] = '.org\/ad-';
adList[561] = '.org\/ad.';
adList[562] = '.org\/ad\/';
adList[563] = '.org\/ad_';
adList[564] = '.org\/adgallery1';
adList[565] = '.org\/ads-';
adList[566] = '.org\/ads\/';
adList[567] = '.org\/ads_';
adList[568] = '.org\/adv\/';
adList[569] = '.org\/exit.js';
adList[570] = '.org\/gads\/';
adList[571] = '.org\/pops.js';
adList[572] = '.ph\/ads\/';
adList[573] = '.php\/ad\/';
adList[574] = '.php\/ads\/';
adList[575] = '.php?ad=';
adList[576] = '.php?ad_';
adList[577] = '.php?adsid=';
adList[578] = '.php?adv=';
adList[579] = '.php?adv_';
adList[580] = '.php?affid=';
adList[581] = '.php?clicktag=';
adList[582] = '.php?nats=';
adList[583] = '.php?zone_id=';
adList[584] = '.php?zoneid=';
adList[585] = '.pk\/ads\/';
adList[586] = '.pl\/ads\/';
adList[587] = '.popunder.js';
adList[588] = '.popup_im.';
adList[589] = '.popupvideoad.';
adList[590] = '.refit.ads.';
adList[591] = '.rolloverad.';
adList[592] = '.se\/?placement=$script,subdocument,third-party';
adList[593] = '.se\/ads\/';
adList[594] = '.shortcuts.search.';
adList[595] = '.show_ad_';
adList[596] = '.sk\/ads\/';
adList[597] = '.sponsorads.';
adList[598] = '.streamads.';
adList[599] = '.swf?1&clicktag=';
adList[600] = '.swf?2&clicktag=';
adList[601] = '.swf?ad=';
adList[602] = '.swf?click=';
adList[603] = '.swf?clicktag=';
adList[604] = '.swf?clickthru=';
adList[605] = '.swf?iurl=http';
adList[606] = '.swf?link1=http';
adList[607] = '.swf?link=http';
adList[608] = '.swf?popupiniframe=';
adList[609] = '.text-link-ads.';
adList[610] = '.textads.';
adList[611] = '.th\/ads\/';
adList[612] = '.to\/ads\/';
adList[613] = '.topad.';
adList[614] = '.tv\/adl.';
adList[615] = '.tv\/ads.';
adList[616] = '.tv\/ads\/';
adList[617] = '.twoads.';
adList[618] = '.tz\/ads\/';
adList[619] = '.uk\/ads\/';
adList[620] = '.uk\/adv\/';
adList[621] = '.us\/ads\/';
adList[622] = '.utils.ads.';
adList[623] = '.vert.ad.';
adList[624] = '.videoad3.';
adList[625] = '.weborama.js';
adList[626] = '.widgets.ad?';
adList[627] = '.ws\/ads\/';
adList[628] = '.xxx\/ads\/';
adList[629] = '.za\/ads.';
adList[630] = '.za\/ads\/';
adList[631] = '.zm\/ads\/';
adList[632] = '.zw\/ads\/';
adList[633] = '\/!advert_';
adList[634] = '\/04\/ads-';
adList[635] = '\/120ad.';
adList[636] = '\/125x125_banner.';
adList[637] = '\/125x125ad.';
adList[638] = '\/126_ad.';
adList[639] = '\/160_ad_';
adList[640] = '\/1afr.php?';
adList[641] = '\/24-7ads.';
adList[642] = '\/24adscript.';
adList[643] = '\/250x250_advert_';
adList[644] = '\/300-ad-';
adList[645] = '\/300250_ad-';
adList[646] = '\/300_ad_';
adList[647] = '\/300ad.';
adList[648] = '\/300by250ad.';
adList[649] = '\/300x250ad.';
adList[650] = '\/300x250adbg.';
adList[651] = '\/300x250ads.';
adList[652] = '\/300x250advert.';
adList[653] = '\/300x500_ad';
adList[654] = '\/336x280ads.';
adList[655] = '\/3pt_ads.';
adList[656] = '\/468-banner.';
adList[657] = '\/468ad.';
adList[658] = '\/468x60ad.';
adList[659] = '\/468xads.';
adList[660] = '\/728_ad_';
adList[661] = '\/728x80topad.';
adList[662] = '\/728x90banner.';
adList[663] = '\/768x90ad.';
adList[664] = '\/?adv_partner';
adList[665] = '\/?view=ad';
adList[666] = '\/_img\/ad_';
adList[667] = '\/_js2\/oas.';
adList[668] = '\/a\/display.php?';
adList[669] = '\/a2\/?sub=$third-party';
adList[670] = '\/a3\/?sub=$third-party';
adList[671] = '\/aamsz=';
adList[672] = '\/abadsv1.';
adList[673] = '\/abm.asp?';
adList[674] = '\/abm.aspx';
adList[675] = '\/abmw.asp';
adList[676] = '\/abnl\/?begun^';
adList[677] = '\/abnl\/?narodads^';
adList[678] = '\/about-these-ads.';
adList[679] = '\/absolutebm.aspx?';
adList[680] = '\/abvads_';
adList[681] = '\/acc_random=';
adList[682] = '\/active-ad-';
adList[683] = '\/ad-125.';
adList[684] = '\/ad-300topleft.';
adList[685] = '\/ad-300x250.';
adList[686] = '\/ad-300x254.';
adList[687] = '\/ad-350x350-';
adList[688] = '\/ad-410x300.';
adList[689] = '\/ad-468-';
adList[690] = '\/ad-600-';
adList[691] = '\/ad-amz.';
adList[692] = '\/ad-audit.';
adList[693] = '\/ad-background.';
adList[694] = '\/ad-banner-';
adList[695] = '\/ad-banner.';
adList[696] = '\/ad-bckg.';
adList[697] = '\/ad-bottom.';
adList[698] = '\/ad-box-';
adList[699] = '\/ad-boxes-';
adList[700] = '\/ad-bucket.';
adList[701] = '\/ad-builder.';
adList[702] = '\/ad-button1.';
adList[703] = '\/ad-callback.';
adList[704] = '\/ad-cdn.';
adList[705] = '\/ad-channel-';
adList[706] = '\/ad-choices-';
adList[707] = '\/ad-choices.';
adList[708] = '\/ad-creatives-';
adList[709] = '\/ad-emea.';
adList[710] = '\/ad-engine.';
adList[711] = '\/ad-exchange.';
adList[712] = '\/ad-feature-';
adList[713] = '\/ad-feedback.';
adList[714] = '\/ad-fix-';
adList[715] = '\/ad-flashgame.';
adList[716] = '\/ad-format.';
adList[717] = '\/ad-frame.';
adList[718] = '\/ad-gallery.$~stylesheet';
adList[719] = '\/ad-half_';
adList[720] = '\/ad-hcm.';
adList[721] = '\/ad-header.';
adList[722] = '\/ad-home-';
adList[723] = '\/ad-hug.';
adList[724] = '\/ad-identifier.';
adList[725] = '\/ad-ifr.';
adList[726] = '\/ad-iframe-';
adList[727] = '\/ad-iframe.';
adList[728] = '\/ad-iframe?';
adList[729] = '\/ad-image.';
adList[730] = '\/ad-ina.';
adList[731] = '\/ad-indicator-';
adList[732] = '\/ad-int-';
adList[733] = '\/ad-issue.';
adList[734] = '\/ad-label-';
adList[735] = '\/ad-label.';
adList[736] = '\/ad-layering-';
adList[737] = '\/ad-leaderboard.';
adList[738] = '\/ad-left.';
adList[739] = '\/ad-letter.';
adList[740] = '\/ad-lil.';
adList[741] = '\/ad-loader-';
adList[742] = '\/ad-loader.';
adList[743] = '\/ad-loading.';
adList[744] = '\/ad-local.$domain=~ad-local.de';
adList[745] = '\/ad-maven-';
adList[746] = '\/ad-methods.';
adList[747] = '\/ad-minister-';
adList[748] = '\/ad-minister.';
adList[749] = '\/ad-nytimes.';
adList[750] = '\/ad-offer1.';
adList[751] = '\/ad-openx.';
adList[752] = '\/ad-position-';
adList[753] = '\/ad-pub.';
adList[754] = '\/ad-record.';
adList[755] = '\/ad-refresh-';
adList[756] = '\/ad-refresh.';
adList[757] = '\/ad-right2.';
adList[758] = '\/ad-ros-';
adList[759] = '\/ad-rotator-';
adList[760] = '\/ad-serve?';
adList[761] = '\/ad-server.';
adList[762] = '\/ad-sidebar-';
adList[763] = '\/ad-skyscraper.';
adList[764] = '\/ad-sovrn.';
adList[765] = '\/ad-specs.';
adList[766] = '\/ad-sprite.';
adList[767] = '\/ad-srv.';
adList[768] = '\/ad-strip.';
adList[769] = '\/ad-styles.';
adList[770] = '\/ad-tag2.';
adList[771] = '\/ad-tandem.';
adList[772] = '\/ad-template.';
adList[773] = '\/ad-text.';
adList[774] = '\/ad-title.';
adList[775] = '\/ad-top-';
adList[776] = '\/ad-top.';
adList[777] = '\/ad-topbanner-';
adList[778] = '\/ad-unit-';
adList[779] = '\/ad-updated-';
adList[780] = '\/ad-utilities.';
adList[781] = '\/ad-vert.';
adList[782] = '\/ad-vertical-';
adList[783] = '\/ad-verticalbar.';
adList[784] = '\/ad-view-';
adList[785] = '\/ad.ams.';
adList[786] = '\/ad.ashx?';
adList[787] = '\/ad.asp?';
adList[788] = '\/ad.aspx?';
adList[789] = '\/ad.cgi?';
adList[790] = '\/ad.code?';
adList[791] = '\/ad.css?';
adList[792] = '\/ad.epl?';
adList[793] = '\/ad.gif|';
adList[794] = '\/ad.html?';
adList[795] = '\/ad.info.';
adList[796] = '\/ad.jsp?';
adList[797] = '\/ad.mason?';
adList[798] = '\/ad.min.';
adList[799] = '\/ad.php3?';
adList[800] = '\/ad.php?';
adList[801] = '\/ad.php|';
adList[802] = '\/ad.popup?';
adList[803] = '\/ad.redirect.';
adList[804] = '\/ad.serve.';
adList[805] = '\/ad.valary?';
adList[806] = '\/ad.view?';
adList[807] = '\/ad.ytn.';
adList[808] = '\/ad\/130-';
adList[809] = '\/ad\/600-';
adList[810] = '\/ad\/728-';
adList[811] = '\/ad\/938-';
adList[812] = '\/ad\/940-';
adList[813] = '\/ad\/960x60.';
adList[814] = '\/ad\/?host=';
adList[815] = '\/ad\/?section=';
adList[816] = '\/ad\/?site=';
adList[817] = '\/ad\/a.aspx?';
adList[818] = '\/ad\/afc_';
adList[819] = '\/ad\/article_';
adList[820] = '\/ad\/audsci.';
adList[821] = '\/ad\/banner.';
adList[822] = '\/ad\/banner?';
adList[823] = '\/ad\/banner_';
adList[824] = '\/ad\/behavpixel.';
adList[825] = '\/ad\/blank.';
adList[826] = '\/ad\/blog_';
adList[827] = '\/ad\/bottom.';
adList[828] = '\/ad\/card-';
adList[829] = '\/ad\/common_';
adList[830] = '\/ad\/empty.';
adList[831] = '\/ad\/extra_';
adList[832] = '\/ad\/footer_';
adList[833] = '\/ad\/frame1.';
adList[834] = '\/ad\/framed?';
adList[835] = '\/ad\/generate?';
adList[836] = '\/ad\/getban?';
adList[837] = '\/ad\/getbanandfile?';
adList[838] = '\/ad\/google_';
adList[839] = '\/ad\/homepage?';
adList[840] = '\/ad\/iframe.';
adList[841] = '\/ad\/index.';
adList[842] = '\/ad\/index_';
adList[843] = '\/ad\/inline?';
adList[844] = '\/ad\/integral-';
adList[845] = '\/ad\/leaderboard.';
adList[846] = '\/ad\/listing-';
adList[847] = '\/ad\/live-';
adList[848] = '\/ad\/load.';
adList[849] = '\/ad\/load_';
adList[850] = '\/ad\/loading.';
adList[851] = '\/ad\/login-';
adList[852] = '\/ad\/middle.';
adList[853] = '\/ad\/omakasa.';
adList[854] = '\/ad\/player|';
adList[855] = '\/ad\/pong?';
adList[856] = '\/ad\/popup.';
adList[857] = '\/ad\/random_';
adList[858] = '\/ad\/realclick.';
adList[859] = '\/ad\/rectangle.';
adList[860] = '\/ad\/reklamy.';
adList[861] = '\/ad\/request?';
adList[862] = '\/ad\/right2.';
adList[863] = '\/ad\/rotate?';
adList[864] = '\/ad\/select?';
adList[865] = '\/ad\/serve.';
adList[866] = '\/ad\/show.';
adList[867] = '\/ad\/side_';
adList[868] = '\/ad\/skin_';
adList[869] = '\/ad\/skyscraper.';
adList[870] = '\/ad\/skyscrapper.';
adList[871] = '\/ad\/small-';
adList[872] = '\/ad\/spacer.';
adList[873] = '\/ad\/sponsored-';
adList[874] = '\/ad\/status?';
adList[875] = '\/ad\/superbanner.';
adList[876] = '\/ad\/timing.';
adList[877] = '\/ad\/top.';
adList[878] = '\/ad\/top1.';
adList[879] = '\/ad\/top2.';
adList[880] = '\/ad\/top3.';
adList[881] = '\/ad\/top_';
adList[882] = '\/ad0.$domain=~vereinslinie.de';
adList[883] = '\/ad01.';
adList[884] = '\/ad02\/background_';
adList[885] = '\/ad1-728-';
adList[886] = '\/ad1.$domain=~ad1.in|~vereinslinie.de';
adList[887] = '\/ad1\/index.';
adList[888] = '\/ad11c.';
adList[889] = '\/ad12.';
adList[890] = '\/ad120x60.';
adList[891] = '\/ad125.';
adList[892] = '\/ad125b.';
adList[893] = '\/ad125x125.';
adList[894] = '\/ad132m.';
adList[895] = '\/ad15.';
adList[896] = '\/ad16.';
adList[897] = '\/ad160.';
adList[898] = '\/ad160k.';
adList[899] = '\/ad160x600.';
adList[900] = '\/ad1_';
adList[901] = '\/ad1place.';
adList[902] = '\/ad1r.';
adList[903] = '\/ad1x1home.';
adList[904] = '\/ad2-728-';
adList[905] = '\/ad2.$domain=~vereinslinie.de';
adList[906] = '\/ad2\/index.';
adList[907] = '\/ad2010.';
adList[908] = '\/ad234.';
adList[909] = '\/ad290x60_';
adList[910] = '\/ad2_';
adList[911] = '\/ad2border.';
adList[912] = '\/ad2con.';
adList[913] = '\/ad2gate.';
adList[914] = '\/ad2gather.';
adList[915] = '\/ad2push.';
adList[916] = '\/ad3.$domain=~vereinslinie.de';
adList[917] = '\/ad300.';
adList[918] = '\/ad300f.';
adList[919] = '\/ad300f2.';
adList[920] = '\/ad300home.';
adList[921] = '\/ad300s.';
adList[922] = '\/ad300ws.';
adList[923] = '\/ad300x.';
adList[924] = '\/ad300x145.';
adList[925] = '\/ad300x250-';
adList[926] = '\/ad300x250.';
adList[927] = '\/ad300x250_';
adList[928] = '\/ad350.';
adList[929] = '\/ad3_ima.';
adList[930] = '\/ad3i.';
adList[931] = '\/ad4.$domain=~ad4.wpengine.com|~vereinslinie.de';
adList[932] = '\/ad41_';
adList[933] = '\/ad468.';
adList[934] = '\/ad468x60.';
adList[935] = '\/ad468x80.';
adList[936] = '\/ad4i.';
adList[937] = '\/ad5.';
adList[938] = '\/ad6.';
adList[939] = '\/ad600x250.';
adList[940] = '\/ad600x330.';
adList[941] = '\/ad7.';
adList[942] = '\/ad728-';
adList[943] = '\/ad728.';
adList[944] = '\/ad728f.';
adList[945] = '\/ad728f2.';
adList[946] = '\/ad728home.';
adList[947] = '\/ad728rod.';
adList[948] = '\/ad728s.';
adList[949] = '\/ad728t.';
adList[950] = '\/ad728w.';
adList[951] = '\/ad728ws.';
adList[952] = '\/ad728x.';
adList[953] = '\/ad728x15.';
adList[954] = '\/ad728x15_';
adList[955] = '\/ad728x90.';
adList[956] = '\/ad8.';
adList[957] = '\/ad?channel=';
adList[958] = '\/ad?cid=';
adList[959] = '\/ad?count=';
adList[960] = '\/ad?currentview=';
adList[961] = '\/ad?iframe_';
adList[962] = '\/ad?pos_';
adList[963] = '\/ad?sponsor=';
adList[964] = '\/ad?type=';
adList[965] = '\/ad_120_';
adList[966] = '\/ad_200x90_';
adList[967] = '\/ad_234x60_';
adList[968] = '\/ad_250x250_';
adList[969] = '\/ad_300.';
adList[970] = '\/ad_300250.';
adList[971] = '\/ad_300_';
adList[972] = '\/ad_600_';
adList[973] = '\/ad_600x160_';
adList[974] = '\/ad_728.';
adList[975] = '\/ad_728_';
adList[976] = '\/ad_960x90_';
adList[977] = '\/ad_announce.';
adList[978] = '\/ad_area.';
adList[979] = '\/ad_arub_';
adList[980] = '\/ad_banner.';
adList[981] = '\/ad_banner1.';
adList[982] = '\/ad_banner2.';
adList[983] = '\/ad_banner_';
adList[984] = '\/ad_bannerpool-';
adList[985] = '\/ad_bar_';
adList[986] = '\/ad_base.';
adList[987] = '\/ad_big_';
adList[988] = '\/ad_blog.';
adList[989] = '\/ad_bot.';
adList[990] = '\/ad_bottom.';
adList[991] = '\/ad_box.';
adList[992] = '\/ad_box1.';
adList[993] = '\/ad_box2.';
adList[994] = '\/ad_box?';
adList[995] = '\/ad_box_';
adList[996] = '\/ad_bsb.';
adList[997] = '\/ad_button.';
adList[998] = '\/ad_caption.';
adList[999] = '\/ad_check.';
adList[1000] = '\/ad_choices.';
adList[1001] = '\/ad_choices_';
adList[1002] = '\/ad_code.';
adList[1003] = '\/ad_commonside.';
adList[1004] = '\/ad_commonside_';
adList[1005] = '\/ad_configuration.';
adList[1006] = '\/ad_configurations_';
adList[1007] = '\/ad_container_';
adList[1008] = '\/ad_content.';
adList[1009] = '\/ad_count.';
adList[1010] = '\/ad_counter.';
adList[1011] = '\/ad_counter_';
adList[1012] = '\/ad_creatives.';
adList[1013] = '\/ad_detect.';
adList[1014] = '\/ad_digital.';
adList[1015] = '\/ad_display.';
adList[1016] = '\/ad_display_';
adList[1017] = '\/ad_ebound.';
adList[1018] = '\/ad_editorials_';
adList[1019] = '\/ad_engine?';
adList[1020] = '\/ad_entry_';
adList[1021] = '\/ad_feed.';
adList[1022] = '\/ad_fill.';
adList[1023] = '\/ad_filler.';
adList[1024] = '\/ad_fixedad.';
adList[1025] = '\/ad_flat_';
adList[1026] = '\/ad_floater.';
adList[1027] = '\/ad_footer.';
adList[1028] = '\/ad_footer_';
adList[1029] = '\/ad_forum_';
adList[1030] = '\/ad_frame.';
adList[1031] = '\/ad_frame?';
adList[1032] = '\/ad_frm.';
adList[1033] = '\/ad_function.';
adList[1034] = '\/ad_generator.';
adList[1035] = '\/ad_generator?';
adList[1036] = '\/ad_gif_';
adList[1037] = '\/ad_google.';
adList[1038] = '\/ad_h.css?';
adList[1039] = '\/ad_hcl_';
adList[1040] = '\/ad_hcr_';
adList[1041] = '\/ad_head_';
adList[1042] = '\/ad_header.';
adList[1043] = '\/ad_header_';
adList[1044] = '\/ad_home2011_';
adList[1045] = '\/ad_home_';
adList[1046] = '\/ad_homepage_';
adList[1047] = '\/ad_horisontal.';
adList[1048] = '\/ad_horiz.';
adList[1049] = '\/ad_horizontal.';
adList[1050] = '\/ad_iframe.';
adList[1051] = '\/ad_iframe_';
adList[1052] = '\/ad_image.';
adList[1053] = '\/ad_image2.';
adList[1054] = '\/ad_img.';
adList[1055] = '\/ad_include.';
adList[1056] = '\/ad_index_';
adList[1057] = '\/ad_insert.';
adList[1058] = '\/ad_keywords.';
adList[1059] = '\/ad_label2_';
adList[1060] = '\/ad_label728.';
adList[1061] = '\/ad_label_';
adList[1062] = '\/ad_large.';
adList[1063] = '\/ad_lazyload.';
adList[1064] = '\/ad_leader.';
adList[1065] = '\/ad_leader_';
adList[1066] = '\/ad_leaderboard.';
adList[1067] = '\/ad_left.';
adList[1068] = '\/ad_left_';
adList[1069] = '\/ad_legend_';
adList[1070] = '\/ad_link.';
adList[1071] = '\/ad_listpage.';
adList[1072] = '\/ad_load.';
adList[1073] = '\/ad_loader.';
adList[1074] = '\/ad_loader2.';
adList[1075] = '\/ad_log_';
adList[1076] = '\/ad_lomadee.';
adList[1077] = '\/ad_manage.';
adList[1078] = '\/ad_manager.';
adList[1079] = '\/ad_master_';
adList[1080] = '\/ad_mbox.';
adList[1081] = '\/ad_medium_';
adList[1082] = '\/ad_mini_';
adList[1083] = '\/ad_mobile.';
adList[1084] = '\/ad_mpu.';
adList[1085] = '\/ad_multi_';
adList[1086] = '\/ad_navigbar_';
adList[1087] = '\/ad_news.';
adList[1088] = '\/ad_note.';
adList[1089] = '\/ad_notice.';
adList[1090] = '\/ad_offersmail_';
adList[1091] = '\/ad_option_';
adList[1092] = '\/ad_overlay.';
adList[1093] = '\/ad_page_';
adList[1094] = '\/ad_paper_';
adList[1095] = '\/ad_parts.';
adList[1096] = '\/ad_pop.';
adList[1097] = '\/ad_pop1.';
adList[1098] = '\/ad_popup_';
adList[1099] = '\/ad_pos=';
adList[1100] = '\/ad_position=';
adList[1101] = '\/ad_position_';
adList[1102] = '\/ad_premium.';
adList[1103] = '\/ad_premium_';
adList[1104] = '\/ad_preroll-';
adList[1105] = '\/ad_print.';
adList[1106] = '\/ad_rectangle_';
adList[1107] = '\/ad_red.';
adList[1108] = '\/ad_refresh.';
adList[1109] = '\/ad_refresher.';
adList[1110] = '\/ad_reloader_';
adList[1111] = '\/ad_render_';
adList[1112] = '\/ad_renderv4_';
adList[1113] = '\/ad_rentangle.';
adList[1114] = '\/ad_req.';
adList[1115] = '\/ad_request.';
adList[1116] = '\/ad_resize.';
adList[1117] = '\/ad_right.';
adList[1118] = '\/ad_right_';
adList[1119] = '\/ad_rotation.';
adList[1120] = '\/ad_rotator.';
adList[1121] = '\/ad_rotator_';
adList[1122] = '\/ad_script.';
adList[1123] = '\/ad_script_';
adList[1124] = '\/ad_scroller.';
adList[1125] = '\/ad_selectmainfixedad.';
adList[1126] = '\/ad_serv.';
adList[1127] = '\/ad_serve.';
adList[1128] = '\/ad_serve_';
adList[1129] = '\/ad_server.';
adList[1130] = '\/ad_serverv2.';
adList[1131] = '\/ad_servlet.';
adList[1132] = '\/ad_show.';
adList[1133] = '\/ad_show?';
adList[1134] = '\/ad_side.';
adList[1135] = '\/ad_sizes=';
adList[1136] = '\/ad_skin_';
adList[1137] = '\/ad_sky.';
adList[1138] = '\/ad_skyscraper.';
adList[1139] = '\/ad_slideout.';
adList[1140] = '\/ad_space.';
adList[1141] = '\/ad_spot.';
adList[1142] = '\/ad_square.';
adList[1143] = '\/ad_square_';
adList[1144] = '\/ad_squares.';
adList[1145] = '\/ad_srv.';
adList[1146] = '\/ad_status.';
adList[1147] = '\/ad_styling_';
adList[1148] = '\/ad_support.';
adList[1149] = '\/ad_syshome.';
adList[1150] = '\/ad_tab.';
adList[1151] = '\/ad_tag.';
adList[1152] = '\/ad_tag_';
adList[1153] = '\/ad_tags_';
adList[1154] = '\/ad_text.';
adList[1155] = '\/ad_text_';
adList[1156] = '\/ad_tickets.';
adList[1157] = '\/ad_timer.';
adList[1158] = '\/ad_title_';
adList[1159] = '\/ad_top.';
adList[1160] = '\/ad_top_';
adList[1161] = '\/ad_topgray2.';
adList[1162] = '\/ad_tower_';
adList[1163] = '\/ad_tpl.';
adList[1164] = '\/ad_txt.';
adList[1165] = '\/ad_units.';
adList[1166] = '\/ad_util.';
adList[1167] = '\/ad_utils.';
adList[1168] = '\/ad_vert.';
adList[1169] = '\/ad_vertical.';
adList[1170] = '\/ad_video.htm';
adList[1171] = '\/ad_video1.';
adList[1172] = '\/ad_view_';
adList[1173] = '\/ad_wide_';
adList[1174] = '\/ad_wrapper.';
adList[1175] = '\/ad_www_';
adList[1176] = '\/adactions.';
adList[1177] = '\/adaffiliate_';
adList[1178] = '\/adanalytics.';
adList[1179] = '\/adaptvadplayer.';
adList[1180] = '\/adaptvadservervastvideo.';
adList[1181] = '\/adaptvexchangevastvideo.';
adList[1182] = '\/adb.js?tag=';
adList[1183] = '\/adback.';
adList[1184] = '\/adback?';
adList[1185] = '\/adbackground.';
adList[1186] = '\/adban.';
adList[1187] = '\/adbanner.';
adList[1188] = '\/adbanner2.';
adList[1189] = '\/adbanner_';
adList[1190] = '\/adbar.';
adList[1191] = '\/adbar2_';
adList[1192] = '\/adbar_';
adList[1193] = '\/adbars.';
adList[1194] = '\/adbase.';
adList[1195] = '\/adbeacon.';
adList[1196] = '\/adbebi_';
adList[1197] = '\/adbg.jpg';
adList[1198] = '\/adblob.';
adList[1199] = '\/adblock.ash';
adList[1200] = '\/adblock.js';
adList[1201] = '\/adblock26.';
adList[1202] = '\/adblock?id=';
adList[1203] = '\/adblockl.';
adList[1204] = '\/adblockr.';
adList[1205] = '\/adbn?';
adList[1206] = '\/adboost.';
adList[1207] = '\/adborder.';
adList[1208] = '\/adbot160.';
adList[1209] = '\/adbot300.';
adList[1210] = '\/adbot728.';
adList[1211] = '\/adbot_';
adList[1212] = '\/adbotleft.';
adList[1213] = '\/adbotright.';
adList[1214] = '\/adbottom.';
adList[1215] = '\/adbox.';
adList[1216] = '\/adbox1.';
adList[1217] = '\/adbox2.';
adList[1218] = '\/adbox_';
adList[1219] = '\/adboxbk.';
adList[1220] = '\/adboxdiv.';
adList[1221] = '\/adboxtable-';
adList[1222] = '\/adbrite-';
adList[1223] = '\/adbrite.';
adList[1224] = '\/adbrite2.';
adList[1225] = '\/adbrite_';
adList[1226] = '\/adbriteinc.';
adList[1227] = '\/adbriteincleft2.';
adList[1228] = '\/adbriteincright.';
adList[1229] = '\/adbug_';
adList[1230] = '\/adbureau.';
adList[1231] = '\/adbytes.';
adList[1232] = '\/adcache.';
adList[1233] = '\/adcall.';
adList[1234] = '\/adcalloverride.';
adList[1235] = '\/adcash-';
adList[1236] = '\/adcash.';
adList[1237] = '\/adcast01_';
adList[1238] = '\/adcast_';
adList[1239] = '\/adcde.js';
adList[1240] = '\/adcdn.';
adList[1241] = '\/adcenter.$script,domain=~m-m-g.com';
adList[1242] = '\/adcentral.';
adList[1243] = '\/adcfg.';
adList[1244] = '\/adcframe.';
adList[1245] = '\/adcgi?';
adList[1246] = '\/adchain-';
adList[1247] = '\/adchain.';
adList[1248] = '\/adchannel_';
adList[1249] = '\/adcheck.';
adList[1250] = '\/adcheck?';
adList[1251] = '\/adchoice.';
adList[1252] = '\/adchoice_';
adList[1253] = '\/adchoices-';
adList[1254] = '\/adchoices.';
adList[1255] = '\/adchoices16.';
adList[1256] = '\/adchoices2.';
adList[1257] = '\/adchoices_';
adList[1258] = '\/adchoicesfooter.';
adList[1259] = '\/adchoicesicon.';
adList[1260] = '\/adchoiceslogo.';
adList[1261] = '\/adchoicesv4.';
adList[1262] = '\/adcircle.';
adList[1263] = '\/adclick.';
adList[1264] = '\/adclient-';
adList[1265] = '\/adclient.';
adList[1266] = '\/adclix.';
adList[1267] = '\/adclixad.';
adList[1268] = '\/adclutter.';
adList[1269] = '\/adcode.';
adList[1270] = '\/adcode_';
adList[1271] = '\/adcollector.';
adList[1272] = '\/adcommon?';
adList[1273] = '\/adcomp.';
adList[1274] = '\/adconfig.js';
adList[1275] = '\/adconfig.xml?';
adList[1276] = '\/adcontainer?';
adList[1277] = '\/adcontent.$~object-subrequest';
adList[1278] = '\/adcontents_';
adList[1279] = '\/adcontrol.';
adList[1280] = '\/adcontroller.';
adList[1281] = '\/adcore.$domain=~adcore.com.au';
adList[1282] = '\/adcore_$domain=~adcore.com.au';
adList[1283] = '\/adcount.';
adList[1284] = '\/adcounter.';
adList[1285] = '\/adcreative.';
adList[1286] = '\/adcxtnew_';
adList[1287] = '\/adcycle.';
adList[1288] = '\/add728.';
adList[1289] = '\/addata.';
adList[1290] = '\/addatasandbox?';
adList[1291] = '\/addefend.';
adList[1292] = '\/addisplay.';
adList[1293] = '\/adengage-';
adList[1294] = '\/adengage.';
adList[1295] = '\/adengage0.';
adList[1296] = '\/adengage1.';
adList[1297] = '\/adengage2.';
adList[1298] = '\/adengage3.';
adList[1299] = '\/adengage4.';
adList[1300] = '\/adengage5.';
adList[1301] = '\/adengage6.';
adList[1302] = '\/adengage_';
adList[1303] = '\/adengine_';
adList[1304] = '\/adentry.';
adList[1305] = '\/aderlee_ads.';
adList[1306] = '\/adevent.';
adList[1307] = '\/adevents.';
adList[1308] = '\/adexample?';
adList[1309] = '\/adexternal.';
adList[1310] = '\/adf.cgi?';
adList[1311] = '\/adfactor_';
adList[1312] = '\/adfactory-';
adList[1313] = '\/adfactory.$domain=~adfactory.rocks';
adList[1314] = '\/adfactory_';
adList[1315] = '\/adfarm.$~image,third-party,domain=~mediaplex.com';
adList[1316] = '\/adfarm.$~third-party,domain=~mediaplex.com';
adList[1317] = '\/adfeed.';
adList[1318] = '\/adfeedtestview.';
adList[1319] = '\/adfetch.';
adList[1320] = '\/adfetch?';
adList[1321] = '\/adfetcher?';
adList[1322] = '\/adfever_';
adList[1323] = '\/adfile.';
adList[1324] = '\/adfiles.';
adList[1325] = '\/adflash.';
adList[1326] = '\/adfliction-';
adList[1327] = '\/adfootcenter.';
adList[1328] = '\/adfooter.';
adList[1329] = '\/adfooterbg.';
adList[1330] = '\/adfootleft.';
adList[1331] = '\/adfootright.';
adList[1332] = '\/adforgame160x600.';
adList[1333] = '\/adforgame728x90.';
adList[1334] = '\/adforgame728x90_';
adList[1335] = '\/adforge.';
adList[1336] = '\/adform_trackpoint.';
adList[1337] = '\/adform_trackpoint_';
adList[1338] = '\/adfox.';
adList[1339] = '\/adfr.';
adList[1340] = '\/adframe.';
adList[1341] = '\/adframe120.';
adList[1342] = '\/adframe120x240.';
adList[1343] = '\/adframe2.';
adList[1344] = '\/adframe468.';
adList[1345] = '\/adframe728a.';
adList[1346] = '\/adframe728b.';
adList[1347] = '\/adframe728b2.';
adList[1348] = '\/adframe728bot.';
adList[1349] = '\/adframe?';
adList[1350] = '\/adframe_';
adList[1351] = '\/adframebottom.';
adList[1352] = '\/adframecommon.';
adList[1353] = '\/adframemiddle.';
adList[1354] = '\/adframetop.';
adList[1355] = '\/adframewrapper.';
adList[1356] = '\/adfrequencycapping.';
adList[1357] = '\/adfrm.';
adList[1358] = '\/adfshow?';
adList[1359] = '\/adfuncs.';
adList[1360] = '\/adfunction.';
adList[1361] = '\/adfunctions.';
adList[1362] = '\/adgallery1.';
adList[1363] = '\/adgallery1|';
adList[1364] = '\/adgallery2.';
adList[1365] = '\/adgallery2|';
adList[1366] = '\/adgallery3.';
adList[1367] = '\/adgallery3|';
adList[1368] = '\/adgalleryheader.';
adList[1369] = '\/adgear.js';
adList[1370] = '\/adgear1-';
adList[1371] = '\/adgear2-';
adList[1372] = '\/adgearsegmentation.';
adList[1373] = '\/adgenerator.';
adList[1374] = '\/adget.';
adList[1375] = '\/adgetter.';
adList[1376] = '\/adgitize-';
adList[1377] = '\/adgooglefull2.';
adList[1378] = '\/adguard.';
adList[1379] = '\/adguru.';
adList[1380] = '\/adhads.';
adList[1381] = '\/adhalfbanner.';
adList[1382] = '\/adhandler.';
adList[1383] = '\/adhandlers-';
adList[1384] = '\/adhandlers2.';
adList[1385] = '\/adheader.';
adList[1386] = '\/adheadertxt.';
adList[1387] = '\/adheading_';
adList[1388] = '\/adhese.';
adList[1389] = '\/adhese_';
adList[1390] = '\/adhomepage.';
adList[1391] = '\/adhomepage2.';
adList[1392] = '\/adhood.';
adList[1393] = '\/adhost.$domain=~adhost.dk';
adList[1394] = '\/adhref.';
adList[1395] = '\/adhub.';
adList[1396] = '\/adhug_';
adList[1397] = '\/adicon_';
adList[1398] = '\/adiframe.';
adList[1399] = '\/adiframe1.';
adList[1400] = '\/adiframe18.';
adList[1401] = '\/adiframe2.';
adList[1402] = '\/adiframe7.';
adList[1403] = '\/adiframe9.';
adList[1404] = '\/adiframe?';
adList[1405] = '\/adiframe_';
adList[1406] = '\/adiframeanchor.';
adList[1407] = '\/adiframem1.';
adList[1408] = '\/adiframem2.';
adList[1409] = '\/adiframetop.';
adList[1410] = '\/adify_';
adList[1411] = '\/adifyad.';
adList[1412] = '\/adifyids.';
adList[1413] = '\/adifyoverlay.';
adList[1414] = '\/adim.html?ad';
adList[1415] = '\/adimage.';
adList[1416] = '\/adimage?';
adList[1417] = '\/adimages.';
adList[1418] = '\/adimg.';
adList[1419] = '\/adinclude.';
adList[1420] = '\/adindicatortext.';
adList[1421] = '\/adinit.';
adList[1422] = '\/adinject.';
adList[1423] = '\/adinjector.';
adList[1424] = '\/adinjector_';
adList[1425] = '\/adinsert.';
adList[1426] = '\/adinsertionplugin.';
adList[1427] = '\/adinsertjuicy.';
adList[1428] = '\/adinterax.';
adList[1429] = '\/adiquity.';
adList[1430] = '\/adiro.$domain=~adiro.se';
adList[1431] = '\/adition.';
adList[1432] = '\/adixs.';
adList[1433] = '\/adj.php?';
adList[1434] = '\/adjk.';
adList[1435] = '\/adjs.';
adList[1436] = '\/adjs?';
adList[1437] = '\/adjs_';
adList[1438] = '\/adjsmp.';
adList[1439] = '\/adjug.';
adList[1440] = '\/adjuggler?';
adList[1441] = '\/adkeys.';
adList[1442] = '\/adl.php';
adList[1443] = '\/adlabel.';
adList[1444] = '\/adlabel_';
adList[1445] = '\/adlabs.js';
adList[1446] = '\/adlanding.';
adList[1447] = '\/adlandr.';
adList[1448] = '\/adlantis.';
adList[1449] = '\/adlantisloader.';
adList[1450] = '\/adlargefooter.';
adList[1451] = '\/adlargefooter2.';
adList[1452] = '\/adlayer.';
adList[1453] = '\/adlead.$domain=~adlead.com';
adList[1454] = '\/adleader.';
adList[1455] = '\/adleaderboardtop.';
adList[1456] = '\/adleft.';
adList[1457] = '\/adleftsidebar.';
adList[1458] = '\/adlens-';
adList[1459] = '\/adlesse.';
adList[1460] = '\/adlib.';
adList[1461] = '\/adlift4.';
adList[1462] = '\/adlift4_';
adList[1463] = '\/adline.$domain=~adline.co.il';
adList[1464] = '\/adlink-$domain=~adlinktech.com';
adList[1465] = '\/adlink.$domain=~adlink.guru|~adlinktech.com';
adList[1466] = '\/adlink728.';
adList[1467] = '\/adlink_';
adList[1468] = '\/adlinks.';
adList[1469] = '\/adlinks2.';
adList[1470] = '\/adlinks_';
adList[1471] = '\/adlist_';
adList[1472] = '\/adload.';
adList[1473] = '\/adloader.';
adList[1474] = '\/adlock300.';
adList[1475] = '\/adlog.php?';
adList[1476] = '\/admain.';
adList[1477] = '\/admain|';
adList[1478] = '\/adman-$domain=~adman-industries.com';
adList[1479] = '\/adman.';
adList[1480] = '\/admanagementadvanced.';
adList[1481] = '\/admanager.$~object-subrequest';
adList[1482] = '\/admanager3.';
adList[1483] = '\/admanager_';
adList[1484] = '\/admanproxy.';
adList[1485] = '\/admarker.';
adList[1486] = '\/admarker_';
adList[1487] = '\/admarketplace.';
adList[1488] = '\/admarvel.';
adList[1489] = '\/admaster.$domain=~admaster.biz';
adList[1490] = '\/admaster?';
adList[1491] = '\/admatch-';
adList[1492] = '\/admatcher.$~object-subrequest,~xmlhttprequest';
adList[1493] = '\/admatcherclient.';
adList[1494] = '\/admatik.';
adList[1495] = '\/admax.$domain=~admax.cn|~admax.co|~admax.eu|~admax.fi|~admax.info|~admax.net|~admax.nu|~admax.org|~admax.se|~admax.us';
adList[1496] = '\/admaxads.';
adList[1497] = '\/admeasure.';
adList[1498] = '\/admedia.';
adList[1499] = '\/admega.';
adList[1500] = '\/admeld.';
adList[1501] = '\/admeld_';
adList[1502] = '\/admeldscript.';
adList[1503] = '\/admentorserve.';
adList[1504] = '\/admeta.';
adList[1505] = '\/admez.';
adList[1506] = '\/admgr.';
adList[1507] = '\/admicro2.';
adList[1508] = '\/admicro_';
adList[1509] = '\/admin\/ad_';
adList[1510] = '\/adminibanner2.';
adList[1511] = '\/admixer-';
adList[1512] = '\/admixer_';
adList[1513] = '\/admob.';
adList[1514] = '\/admodule.';
adList[1515] = '\/admonitor-';
adList[1516] = '\/admonitor.';
adList[1517] = '\/admp-';
adList[1518] = '\/adnet.';
adList[1519] = '\/adnet2.';
adList[1520] = '\/adnetmedia.$domain=~adnetmedia.hu';
adList[1521] = '\/adnetwork.$domain=~adnetwork.ie';
adList[1522] = '\/adnetwork300.';
adList[1523] = '\/adnetwork468.';
adList[1524] = '\/adnetwork_';
adList[1525] = '\/adnew2.';
adList[1526] = '\/adnews.';
adList[1527] = '\/adnewsclip14.';
adList[1528] = '\/adnewsclip15.';
adList[1529] = '\/adnext.$domain=~adnext.pl';
adList[1530] = '\/adnexus-';
adList[1531] = '\/adng.html';
adList[1532] = '\/adnl.';
adList[1533] = '\/adnotice.';
adList[1534] = '\/adobject.';
adList[1535] = '\/adocean.';
adList[1536] = '\/adometry-';
adList[1537] = '\/adometry.';
adList[1538] = '\/adometry?';
adList[1539] = '\/adonline.';
adList[1540] = '\/adonly468.';
adList[1541] = '\/adops.';
adList[1542] = '\/adoptimised.';
adList[1543] = '\/adoptimizer.';
adList[1544] = '\/adoptionicon.';
adList[1545] = '\/adoptions.';
adList[1546] = '\/adorika300.';
adList[1547] = '\/adorika728.';
adList[1548] = '\/ados.js';
adList[1549] = '\/ados?';
adList[1550] = '\/adotube_adapter.';
adList[1551] = '\/adotubeplugin.';
adList[1552] = '\/adoverlay.';
adList[1553] = '\/adoverlayplugin.';
adList[1554] = '\/adoverride.';
adList[1555] = '\/adp.htm';
adList[1556] = '\/adpage-';
adList[1557] = '\/adpage.';
adList[1558] = '\/adpagem.';
adList[1559] = '\/adpanelcontent.';
adList[1560] = '\/adpartner.';
adList[1561] = '\/adpatch.';
adList[1562] = '\/adpeeps.';
adList[1563] = '\/adperf_';
adList[1564] = '\/adperfdemo.';
adList[1565] = '\/adphoto.$domain=~adphoto.fr';
adList[1566] = '\/adpic.';
adList[1567] = '\/adpicture.';
adList[1568] = '\/adpicture1.';
adList[1569] = '\/adpicture1|';
adList[1570] = '\/adpicture2.';
adList[1571] = '\/adpicture2|';
adList[1572] = '\/adping.';
adList[1573] = '\/adplace5_';
adList[1574] = '\/adplaceholder.';
adList[1575] = '\/adplacement.';
adList[1576] = '\/adplay.';
adList[1577] = '\/adplayer-';
adList[1578] = '\/adplayer.';
adList[1579] = '\/adplugin.';
adList[1580] = '\/adplugin_';
adList[1581] = '\/adpoint.';
adList[1582] = '\/adpop.';
adList[1583] = '\/adpop32.';
adList[1584] = '\/adpopup.';
adList[1585] = '\/adpositions.';
adList[1586] = '\/adpositionsizein-';
adList[1587] = '\/adpostinjectasync.';
adList[1588] = '\/adprime.$domain=~adprime.pl';
adList[1589] = '\/adprove_';
adList[1590] = '\/adprovider.';
adList[1591] = '\/adproxy.';
adList[1592] = '\/adratio.';
adList[1593] = '\/adreadytractions.';
adList[1594] = '\/adrec.';
adList[1595] = '\/adreclaim-';
adList[1596] = '\/adrectanglebanner?';
adList[1597] = '\/adrefresh-';
adList[1598] = '\/adrefresh.';
adList[1599] = '\/adrelated.';
adList[1600] = '\/adreload.';
adList[1601] = '\/adreload?';
adList[1602] = '\/adremote.';
adList[1603] = '\/adrendererfactory.';
adList[1604] = '\/adreplace160x600.';
adList[1605] = '\/adreplace728x90.';
adList[1606] = '\/adrequest.';
adList[1607] = '\/adrequests.';
adList[1608] = '\/adrequestvo.';
adList[1609] = '\/adrequisitor-';
adList[1610] = '\/adright.';
adList[1611] = '\/adrightcol.';
adList[1612] = '\/adriver.$~object-subrequest';
adList[1613] = '\/adriver_$~object-subrequest';
adList[1614] = '\/adrobot.';
adList[1615] = '\/adrolays.';
adList[1616] = '\/adroll.';
adList[1617] = '\/adroller.';
adList[1618] = '\/adrollpixel.';
adList[1619] = '\/adrot.';
adList[1620] = '\/adrot_';
adList[1621] = '\/adrotat.';
adList[1622] = '\/adrotate-';
adList[1623] = '\/adrotate.';
adList[1624] = '\/adrotation.';
adList[1625] = '\/adrotator.';
adList[1626] = '\/adrotator2.';
adList[1627] = '\/adrotator_';
adList[1628] = '\/adrotv2.';
adList[1629] = '\/adrun.';
adList[1630] = '\/adruptive.';
adList[1631] = '\/ads-01.';
adList[1632] = '\/ads-02.';
adList[1633] = '\/ads-03.';
adList[1634] = '\/ads-04.';
adList[1635] = '\/ads-05.';
adList[1636] = '\/ads-06.';
adList[1637] = '\/ads-07.';
adList[1638] = '\/ads-1.';
adList[1639] = '\/ads-2.';
adList[1640] = '\/ads-250.';
adList[1641] = '\/ads-300-';
adList[1642] = '\/ads-300.';
adList[1643] = '\/ads-admin.';
adList[1644] = '\/ads-api.';
adList[1645] = '\/ads-arc.';
adList[1646] = '\/ads-banner';
adList[1647] = '\/ads-blogs-';
adList[1648] = '\/ads-common.';
adList[1649] = '\/ads-foot.';
adList[1650] = '\/ads-footer.';
adList[1651] = '\/ads-gpt.';
adList[1652] = '\/ads-header-';
adList[1653] = '\/ads-holder.';
adList[1654] = '\/ads-inside-';
adList[1655] = '\/ads-leader|';
adList[1656] = '\/ads-min.';
adList[1657] = '\/ads-net.';
adList[1658] = '\/ads-new.';
adList[1659] = '\/ads-nodep.';
adList[1660] = '\/ads-pd.';
adList[1661] = '\/ads-rectangle.';
adList[1662] = '\/ads-rec|';
adList[1663] = '\/ads-request.';
adList[1664] = '\/ads-restrictions.';
adList[1665] = '\/ads-reviews-';
adList[1666] = '\/ads-right.';
adList[1667] = '\/ads-sa.';
adList[1668] = '\/ads-screen.';
adList[1669] = '\/ads-scroller-';
adList[1670] = '\/ads-segmentjs.';
adList[1671] = '\/ads-service.';
adList[1672] = '\/ads-skyscraper.';
adList[1673] = '\/ads-sky|';
adList[1674] = '\/ads-top.';
adList[1675] = '\/ads.ashx';
adList[1676] = '\/ads.asp?';
adList[1677] = '\/ads.aspx';
adList[1678] = '\/ads.bmp?';
adList[1679] = '\/ads.bundle.';
adList[1680] = '\/ads.cfm?';
adList[1681] = '\/ads.cms';
adList[1682] = '\/ads.css';
adList[1683] = '\/ads.gif';
adList[1684] = '\/ads.htm';
adList[1685] = '\/ads.jplayer.';
adList[1686] = '\/ads.js.';
adList[1687] = '\/ads.js?';
adList[1688] = '\/ads.json?';
adList[1689] = '\/ads.jsp';
adList[1690] = '\/ads.load.';
adList[1691] = '\/ads.pbs';
adList[1692] = '\/ads.php';
adList[1693] = '\/ads.pl?';
adList[1694] = '\/ads.png';
adList[1695] = '\/ads.swf';
adList[1696] = '\/ads.v5.js';
adList[1697] = '\/ads.w3c.';
adList[1698] = '\/ads\/125l.';
adList[1699] = '\/ads\/125r.';
adList[1700] = '\/ads\/160.';
adList[1701] = '\/ads\/250x120_';
adList[1702] = '\/ads\/300.';
adList[1703] = '\/ads\/3002.';
adList[1704] = '\/ads\/300x120_';
adList[1705] = '\/ads\/468.';
adList[1706] = '\/ads\/468a.';
adList[1707] = '\/ads\/728-';
adList[1708] = '\/ads\/728.';
adList[1709] = '\/ads\/728b.';
adList[1710] = '\/ads\/?id=';
adList[1711] = '\/ads\/?qaps_';
adList[1712] = '\/ads\/?uniq=';
adList[1713] = '\/ads\/a.';
adList[1714] = '\/ads\/abrad.';
adList[1715] = '\/ads\/acctid=';
adList[1716] = '\/ads\/ad-';
adList[1717] = '\/ads\/ad.';
adList[1718] = '\/ads\/ad_';
adList[1719] = '\/ads\/adrp0.';
adList[1720] = '\/ads\/ads-$~stylesheet';
adList[1721] = '\/ads\/ads.';
adList[1722] = '\/ads\/ads_';
adList[1723] = '\/ads\/aff-';
adList[1724] = '\/ads\/article.';
adList[1725] = '\/ads\/as_header.';
adList[1726] = '\/ads\/banner-';
adList[1727] = '\/ads\/banner.';
adList[1728] = '\/ads\/banner01.';
adList[1729] = '\/ads\/banner_';
adList[1730] = '\/ads\/base.';
adList[1731] = '\/ads\/beacon.';
adList[1732] = '\/ads\/behicon.';
adList[1733] = '\/ads\/biz_';
adList[1734] = '\/ads\/blank.';
adList[1735] = '\/ads\/bottom.';
adList[1736] = '\/ads\/builder.';
adList[1737] = '\/ads\/bz_';
adList[1738] = '\/ads\/cbr.';
adList[1739] = '\/ads\/center-';
adList[1740] = '\/ads\/center.';
adList[1741] = '\/ads\/checkviewport.';
adList[1742] = '\/ads\/click_';
adList[1743] = '\/ads\/community?';
adList[1744] = '\/ads\/contextual.';
adList[1745] = '\/ads\/contextual_';
adList[1746] = '\/ads\/create_';
adList[1747] = '\/ads\/cube-';
adList[1748] = '\/ads\/daily.';
adList[1749] = '\/ads\/daily_';
adList[1750] = '\/ads\/dart.';
adList[1751] = '\/ads\/default_';
adList[1752] = '\/ads\/delivery?';
adList[1753] = '\/ads\/design-';
adList[1754] = '\/ads\/dfp.';
adList[1755] = '\/ads\/displaytrust.';
adList[1756] = '\/ads\/elementviewability.';
adList[1757] = '\/ads\/empty.';
adList[1758] = '\/ads\/exit.';
adList[1759] = '\/ads\/fb-';
adList[1760] = '\/ads\/flash_';
adList[1761] = '\/ads\/footer-';
adList[1762] = '\/ads\/footer.';
adList[1763] = '\/ads\/footer_';
adList[1764] = '\/ads\/google1.';
adList[1765] = '\/ads\/google2.';
adList[1766] = '\/ads\/google_';
adList[1767] = '\/ads\/gpt_';
adList[1768] = '\/ads\/head.';
adList[1769] = '\/ads\/header-';
adList[1770] = '\/ads\/header_';
adList[1771] = '\/ads\/house_';
adList[1772] = '\/ads\/htmlparser.';
adList[1773] = '\/ads\/iframe';
adList[1774] = '\/ads\/im2.';
adList[1775] = '\/ads\/imbox-';
adList[1776] = '\/ads\/index-';
adList[1777] = '\/ads\/index.';
adList[1778] = '\/ads\/infullscreen.';
adList[1779] = '\/ads\/inline.';
adList[1780] = '\/ads\/inner_';
adList[1781] = '\/ads\/interstitial.';
adList[1782] = '\/ads\/jquery.';
adList[1783] = '\/ads\/js.';
adList[1784] = '\/ads\/js_';
adList[1785] = '\/ads\/jsbannertext.';
adList[1786] = '\/ads\/layer.';
adList[1787] = '\/ads\/leaderboard-';
adList[1788] = '\/ads\/leaderboard.';
adList[1789] = '\/ads\/leaderboard?';
adList[1790] = '\/ads\/leaderboard_';
adList[1791] = '\/ads\/leaderbox.';
adList[1792] = '\/ads\/load.';
adList[1793] = '\/ads\/main.';
adList[1794] = '\/ads\/masthead_';
adList[1795] = '\/ads\/menu_';
adList[1796] = '\/ads\/motherless.';
adList[1797] = '\/ads\/mpu2?';
adList[1798] = '\/ads\/mpu?';
adList[1799] = '\/ads\/mt_';
adList[1800] = '\/ads\/narf_';
adList[1801] = '\/ads\/ninemsn.';
adList[1802] = '\/ads\/oas-';
adList[1803] = '\/ads\/oas_';
adList[1804] = '\/ads\/outbrain?';
adList[1805] = '\/ads\/overlay-';
adList[1806] = '\/ads\/page.';
adList[1807] = '\/ads\/panel.';
adList[1808] = '\/ads\/player-';
adList[1809] = '\/ads\/pop.';
adList[1810] = '\/ads\/popout.';
adList[1811] = '\/ads\/popshow.';
adList[1812] = '\/ads\/popup.';
adList[1813] = '\/ads\/popup_';
adList[1814] = '\/ads\/post-';
adList[1815] = '\/ads\/postscribe.';
adList[1816] = '\/ads\/prebid_';
adList[1817] = '\/ads\/preroll-';
adList[1818] = '\/ads\/preroll_';
adList[1819] = '\/ads\/promo_';
adList[1820] = '\/ads\/proximic.';
adList[1821] = '\/ads\/proxy-';
adList[1822] = '\/ads\/rad.';
adList[1823] = '\/ads\/rail-';
adList[1824] = '\/ads\/rawstory_';
adList[1825] = '\/ads\/real_';
adList[1826] = '\/ads\/rect_';
adList[1827] = '\/ads\/rectangle_';
adList[1828] = '\/ads\/refresher.';
adList[1829] = '\/ads\/request.';
adList[1830] = '\/ads\/right.';
adList[1831] = '\/ads\/ringtone_';
adList[1832] = '\/ads\/rotate_';
adList[1833] = '\/ads\/scriptinject.';
adList[1834] = '\/ads\/show.';
adList[1835] = '\/ads\/side-';
adList[1836] = '\/ads\/sidebar-';
adList[1837] = '\/ads\/sitewide_';
adList[1838] = '\/ads\/sky_';
adList[1839] = '\/ads\/spacer.';
adList[1840] = '\/ads\/sponsor';
adList[1841] = '\/ads\/square-';
adList[1842] = '\/ads\/square.';
adList[1843] = '\/ads\/square2.';
adList[1844] = '\/ads\/square3.';
adList[1845] = '\/ads\/swfobject.';
adList[1846] = '\/ads\/targeting.';
adList[1847] = '\/ads\/third-';
adList[1848] = '\/ads\/tile-';
adList[1849] = '\/ads\/top-';
adList[1850] = '\/ads\/top.';
adList[1851] = '\/ads\/tr_';
adList[1852] = '\/ads\/txt_';
adList[1853] = '\/ads\/video_';
adList[1854] = '\/ads\/view.';
adList[1855] = '\/ads\/vip_';
adList[1856] = '\/ads\/webplayer.';
adList[1857] = '\/ads\/welcomescreen.';
adList[1858] = '\/ads\/widebanner.';
adList[1859] = '\/ads\/widget.';
adList[1860] = '\/ads\/writecapture.';
adList[1861] = '\/ads\/xtcore.';
adList[1862] = '\/ads\/zergnet.';
adList[1863] = '\/ads0.';
adList[1864] = '\/ads01.';
adList[1865] = '\/ads05.';
adList[1866] = '\/ads1.';
adList[1867] = '\/ads10.';
adList[1868] = '\/ads100.';
adList[1869] = '\/ads11.';
adList[1870] = '\/ads12.';
adList[1871] = '\/ads125.';
adList[1872] = '\/ads125_';
adList[1873] = '\/ads160.';
adList[1874] = '\/ads160x600-';
adList[1875] = '\/ads160x600.';
adList[1876] = '\/ads160x600px.';
adList[1877] = '\/ads18.';
adList[1878] = '\/ads2.';
adList[1879] = '\/ads20.';
adList[1880] = '\/ads210.';
adList[1881] = '\/ads2_';
adList[1882] = '\/ads2x300.';
adList[1883] = '\/ads2x300new.';
adList[1884] = '\/ads3.';
adList[1885] = '\/ads300.';
adList[1886] = '\/ads300adn2.';
adList[1887] = '\/ads300x250.';
adList[1888] = '\/ads300x2502.';
adList[1889] = '\/ads300x250_';
adList[1890] = '\/ads300x250px.';
adList[1891] = '\/ads4.$domain=~ads4.city';
adList[1892] = '\/ads468.';
adList[1893] = '\/ads468x60.';
adList[1894] = '\/ads468x60_';
adList[1895] = '\/ads4j.';
adList[1896] = '\/ads4n.';
adList[1897] = '\/ads5.';
adList[1898] = '\/ads5t.';
adList[1899] = '\/ads6.';
adList[1900] = '\/ads600-';
adList[1901] = '\/ads7.';
adList[1902] = '\/ads728.';
adList[1903] = '\/ads728adn2.';
adList[1904] = '\/ads728x90_';
adList[1905] = '\/ads728x90a.';
adList[1906] = '\/ads790.';
adList[1907] = '\/ads8.';
adList[1908] = '\/ads88.';
adList[1909] = '\/ads9.';
adList[1910] = '\/ads?apid';
adList[1911] = '\/ads?callback';
adList[1912] = '\/ads?id=';
adList[1913] = '\/ads?spaceid';
adList[1914] = '\/ads?zone=';
adList[1915] = '\/ads?zone_id=';
adList[1916] = '\/ads_1.';
adList[1917] = '\/ads_160_';
adList[1918] = '\/ads_3.';
adList[1919] = '\/ads_300.';
adList[1920] = '\/ads_300_';
adList[1921] = '\/ads_6.';
adList[1922] = '\/ads_728_';
adList[1923] = '\/ads_ad_';
adList[1924] = '\/ads_banner_';
adList[1925] = '\/ads_bg.';
adList[1926] = '\/ads_bottom.';
adList[1927] = '\/ads_bottom_';
adList[1928] = '\/ads_box_';
adList[1929] = '\/ads_check.';
adList[1930] = '\/ads_code.';
adList[1931] = '\/ads_code_';
adList[1932] = '\/ads_config.';
adList[1933] = '\/ads_controller.';
adList[1934] = '\/ads_display.';
adList[1935] = '\/ads_event.';
adList[1936] = '\/ads_fix.';
adList[1937] = '\/ads_footer.';
adList[1938] = '\/ads_frame.';
adList[1939] = '\/ads_global.';
adList[1940] = '\/ads_google.';
adList[1941] = '\/ads_google_';
adList[1942] = '\/ads_home_';
adList[1943] = '\/ads_ifr.';
adList[1944] = '\/ads_iframe.';
adList[1945] = '\/ads_leaderboard_';
adList[1946] = '\/ads_left_';
adList[1947] = '\/ads_loader.';
adList[1948] = '\/ads_manager.';
adList[1949] = '\/ads_medrec_';
adList[1950] = '\/ads_min_';
adList[1951] = '\/ads_new.';
adList[1952] = '\/ads_openx_';
adList[1953] = '\/ads_patron.';
adList[1954] = '\/ads_premium.';
adList[1955] = '\/ads_r.';
adList[1956] = '\/ads_redirect.';
adList[1957] = '\/ads_server_';
adList[1958] = '\/ads_show_';
adList[1959] = '\/ads_sidebar.';
adList[1960] = '\/ads_start.';
adList[1961] = '\/ads_text_';
adList[1962] = '\/ads_top_';
adList[1963] = '\/ads_topbar_';
adList[1964] = '\/ads_ui.';
adList[1965] = '\/ads_view.';
adList[1966] = '\/ads_wfc.';
adList[1967] = '\/ads_yahoo.';
adList[1968] = '\/adsa468.';
adList[1969] = '\/adsa728.';
adList[1970] = '\/adsadclient31.';
adList[1971] = '\/adsadview.';
adList[1972] = '\/adsajaxrefresh.';
adList[1973] = '\/adsall.';
adList[1974] = '\/adsame.';
adList[1975] = '\/adsample.';
adList[1976] = '\/adsandbox.';
adList[1977] = '\/adsapi.';
adList[1978] = '\/adsarticlescript.';
adList[1979] = '\/adsatt.';
adList[1980] = '\/adsbanner-';
adList[1981] = '\/adsbanner.';
adList[1982] = '\/adsbannerjs.';
adList[1983] = '\/adsbox.';
adList[1984] = '\/adsby.';
adList[1985] = '\/adsbycurse.';
adList[1986] = '\/adsbygoogle.';
adList[1987] = '\/adscale.';
adList[1988] = '\/adscale1.';
adList[1989] = '\/adscale_';
adList[1990] = '\/adscalebigsize.';
adList[1991] = '\/adscalecontentad.';
adList[1992] = '\/adscaleskyscraper.';
adList[1993] = '\/adscloud.';
adList[1994] = '\/adscluster.';
adList[1995] = '\/adscontent.';
adList[1996] = '\/adscontent2.';
adList[1997] = '\/adscript.';
adList[1998] = '\/adscript1.';
adList[1999] = '\/adscript?';
adList[2000] = '\/adscript_';
adList[2001] = '\/adscripts1.';
adList[2002] = '\/adscripts2.';
adList[2003] = '\/adscripts3.';
adList[2004] = '\/adscroll.';
adList[2005] = '\/adsdaq_';
adList[2006] = '\/adsdaqbanner_';
adList[2007] = '\/adsdaqbox_';
adList[2008] = '\/adsdaqsky_';
adList[2009] = '\/adsdatevalidation.';
adList[2010] = '\/adsdelivery.';
adList[2011] = '\/adsdm.';
adList[2012] = '\/adsdyn160x160.';
adList[2013] = '\/adsearch.';
adList[2014] = '\/adsearch?';
adList[2015] = '\/adsecondary.';
adList[2016] = '\/adsegmentation.';
adList[2017] = '\/adsence.';
adList[2018] = '\/adsencesearch.';
adList[2019] = '\/adsencesearchtop.';
adList[2020] = '\/adsend.';
adList[2021] = '\/adsense-';
adList[2022] = '\/adsense.';
adList[2023] = '\/adsense1.';
adList[2024] = '\/adsense2.';
adList[2025] = '\/adsense23.';
adList[2026] = '\/adsense24.';
adList[2027] = '\/adsense250.';
adList[2028] = '\/adsense3.';
adList[2029] = '\/adsense4.';
adList[2030] = '\/adsense5.';
adList[2031] = '\/adsense?';
adList[2032] = '\/adsense_';
adList[2033] = '\/adsenseblockview.';
adList[2034] = '\/adsensegb.';
adList[2035] = '\/adsensegoogle.';
adList[2036] = '\/adsensets.';
adList[2037] = '\/adsensev2.';
adList[2038] = '\/adsenze.';
adList[2039] = '\/adseo.';
adList[2040] = '\/adseperator_';
adList[2041] = '\/adserv.';
adList[2042] = '\/adserv1.';
adList[2043] = '\/adserv2.';
adList[2044] = '\/adserv3.';
adList[2045] = '\/adserv_';
adList[2046] = '\/adserve-';
adList[2047] = '\/adserve.';
adList[2048] = '\/adserve_';
adList[2049] = '\/adserver-';
adList[2050] = '\/adserver.';
adList[2051] = '\/adserver1-';
adList[2052] = '\/adserver1.';
adList[2053] = '\/adserver2.';
adList[2054] = '\/adserver3.';
adList[2055] = '\/adserver8strip.';
adList[2056] = '\/adserver?';
adList[2057] = '\/adserver_';
adList[2058] = '\/adserverc.';
adList[2059] = '\/adserverdata.';
adList[2060] = '\/adserverpub?';
adList[2061] = '\/adservers-';
adList[2062] = '\/adserverstore.';
adList[2063] = '\/adservervastvideovizu.';
adList[2064] = '\/adservice-';
adList[2065] = '\/adservice.';
adList[2066] = '\/adservice|';
adList[2067] = '\/adserving.';
adList[2068] = '\/adserving_';
adList[2069] = '\/adservlet?';
adList[2070] = '\/adsession.';
adList[2071] = '\/adsession_';
adList[2072] = '\/adsetup.';
adList[2073] = '\/adsetup_';
adList[2074] = '\/adsfac.';
adList[2075] = '\/adsfetch.';
adList[2076] = '\/adsfile.';
adList[2077] = '\/adsfiles.';
adList[2078] = '\/adsfinal.';
adList[2079] = '\/adsfix.';
adList[2080] = '\/adsfloat.';
adList[2081] = '\/adsfooter-';
adList[2082] = '\/adsframe.';
adList[2083] = '\/adsfuse-';
adList[2084] = '\/adsgame.';
adList[2085] = '\/adsgooglepp3.';
adList[2086] = '\/adshandler.';
adList[2087] = '\/adshare.';
adList[2088] = '\/adshare3.';
adList[2089] = '\/adsheader.';
adList[2090] = '\/adshow-';
adList[2091] = '\/adshow.';
adList[2092] = '\/adshow?';
adList[2093] = '\/adshow_';
adList[2094] = '\/adsi-j.';
adList[2095] = '\/adsico.';
adList[2096] = '\/adsico2.';
adList[2097] = '\/adsico3.';
adList[2098] = '\/adsidebar.';
adList[2099] = '\/adsidebarrect.';
adList[2100] = '\/adsiframe.';
adList[2101] = '\/adsign.';
adList[2102] = '\/adsinclude.';
adList[2103] = '\/adsinsert.';
adList[2104] = '\/adsjs.';
adList[2105] = '\/adsky.';
adList[2106] = '\/adskyright.';
adList[2107] = '\/adskyscraper.';
adList[2108] = '\/adslide.';
adList[2109] = '\/adslides.';
adList[2110] = '\/adsline.';
adList[2111] = '\/adslots.';
adList[2112] = '\/adslug-';
adList[2113] = '\/adslug_';
adList[2114] = '\/adsm2.';
adList[2115] = '\/adsmanagerv2.';
adList[2116] = '\/adsmedia_';
adList[2117] = '\/adsnative_';
adList[2118] = '\/adsnew.';
adList[2119] = '\/adsnip.';
adList[2120] = '\/adsnippet.';
adList[2121] = '\/adsniptrack.';
adList[2122] = '\/adsonar.';
adList[2123] = '\/adsource_';
adList[2124] = '\/adsoverlay_';
adList[2125] = '\/adspace.';
adList[2126] = '\/adspace1.';
adList[2127] = '\/adspace160x60.';
adList[2128] = '\/adspace2.';
adList[2129] = '\/adspace?';
adList[2130] = '\/adspacer.';
adList[2131] = '\/adspan.';
adList[2132] = '\/adspending01.';
adList[2133] = '\/adsplay.';
adList[2134] = '\/adsplex-';
adList[2135] = '\/adsplugin.';
adList[2136] = '\/adsplupu.';
adList[2137] = '\/adsponsor.';
adList[2138] = '\/adspot.';
adList[2139] = '\/adspot_';
adList[2140] = '\/adspublisher.';
adList[2141] = '\/adsquare.';
adList[2142] = '\/adsquareleft.';
adList[2143] = '\/adsrc.';
adList[2144] = '\/adsrc300.';
adList[2145] = '\/adsremote.';
adList[2146] = '\/adsrich.';
adList[2147] = '\/adsright.';
adList[2148] = '\/adsrot.';
adList[2149] = '\/adsrot2.';
adList[2150] = '\/adsrotate.';
adList[2151] = '\/adsrotate1left.';
adList[2152] = '\/adsrotate1right.';
adList[2153] = '\/adsrotate2left.';
adList[2154] = '\/adsrotateheader.';
adList[2155] = '\/adsrotatenew1right.';
adList[2156] = '\/adsrotatenew2right.';
adList[2157] = '\/adsrotatenewheader.';
adList[2158] = '\/adsrotator.';
adList[2159] = '\/adsrule.';
adList[2160] = '\/adsrv.';
adList[2161] = '\/adss.asp';
adList[2162] = '\/adsscript.';
adList[2163] = '\/adsserv.';
adList[2164] = '\/adsserver.';
adList[2165] = '\/adsshow.';
adList[2166] = '\/adssp.';
adList[2167] = '\/adssrv.';
adList[2168] = '\/adstacodaeu.';
adList[2169] = '\/adstakeover.';
adList[2170] = '\/adstatic.';
adList[2171] = '\/adstitle.';
adList[2172] = '\/adstop.';
adList[2173] = '\/adstop728.';
adList[2174] = '\/adstop_';
adList[2175] = '\/adstorage.';
adList[2176] = '\/adstracking.';
adList[2177] = '\/adstream.';
adList[2178] = '\/adstream_';
adList[2179] = '\/adstreamjscontroller.';
adList[2180] = '\/adstrip.';
adList[2181] = '\/adstrk.';
adList[2182] = '\/adstub.';
adList[2183] = '\/adstx.';
adList[2184] = '\/adstyle.';
adList[2185] = '\/adsummos.';
adList[2186] = '\/adsummos2.';
adList[2187] = '\/adsup.';
adList[2188] = '\/adsvariables.';
adList[2189] = '\/adsvo.';
adList[2190] = '\/adsvr.';
adList[2191] = '\/adsvr2.';
adList[2192] = '\/adswap-';
adList[2193] = '\/adswap.';
adList[2194] = '\/adsweb.';
adList[2195] = '\/adswide.';
adList[2196] = '\/adswidejs.';
adList[2197] = '\/adsword.';
adList[2198] = '\/adswrapper.';
adList[2199] = '\/adswrapper3.';
adList[2200] = '\/adswrapperintl.';
adList[2201] = '\/adswrappermsni.';
adList[2202] = '\/adsx728.';
adList[2203] = '\/adsx_728.';
adList[2204] = '\/adsyndication.';
adList[2205] = '\/adsys.';
adList[2206] = '\/adsystem.';
adList[2207] = '\/ads~adsize~';
adList[2208] = '\/adtable_';
adList[2209] = '\/adtabs.';
adList[2210] = '\/adtadd1.';
adList[2211] = '\/adtag.';
adList[2212] = '\/adtag?';
adList[2213] = '\/adtag_';
adList[2214] = '\/adtagcms.';
adList[2215] = '\/adtaggingsubsec.';
adList[2216] = '\/adtago.';
adList[2217] = '\/adtagrequest.';
adList[2218] = '\/adtags.';
adList[2219] = '\/adtagtc.';
adList[2220] = '\/adtagtranslator.';
adList[2221] = '\/adtaily_';
adList[2222] = '\/adtaobao.';
adList[2223] = '\/adtech-';
adList[2224] = '\/adtech.';
adList[2225] = '\/adtech;';
adList[2226] = '\/adtech_';
adList[2227] = '\/adtechglobalsettings.js';
adList[2228] = '\/adtechheader.';
adList[2229] = '\/adtechscript.';
adList[2230] = '\/adtest.';
adList[2231] = '\/adtext.';
adList[2232] = '\/adtext2.';
adList[2233] = '\/adtext4.';
adList[2234] = '\/adtext_';
adList[2235] = '\/adtextmpu2.';
adList[2236] = '\/adtimage.';
adList[2237] = '\/adtitle.';
adList[2238] = '\/adtology.';
adList[2239] = '\/adtonomy.';
adList[2240] = '\/adtools2.';
adList[2241] = '\/adtop.';
adList[2242] = '\/adtop160.';
adList[2243] = '\/adtop300.';
adList[2244] = '\/adtop728.';
adList[2245] = '\/adtopcenter.';
adList[2246] = '\/adtopleft.';
adList[2247] = '\/adtopmidsky.';
adList[2248] = '\/adtopright.';
adList[2249] = '\/adtopsky.';
adList[2250] = '\/adtrack.';
adList[2251] = '\/adtracker.';
adList[2252] = '\/adtracker?';
adList[2253] = '\/adtracking.';
adList[2254] = '\/adtraff.';
adList[2255] = '\/adttext-';
adList[2256] = '\/adttext.';
adList[2257] = '\/adtvideo.';
adList[2258] = '\/adtxt.';
adList[2259] = '\/adtype.';
adList[2260] = '\/adtype=';
adList[2261] = '\/adultadworldpop_';
adList[2262] = '\/adultimate.';
adList[2263] = '\/adunit.';
adList[2264] = '\/adunits.';
adList[2265] = '\/adunits?';
adList[2266] = '\/adunittop|';
adList[2267] = '\/adunix.';
adList[2268] = '\/adutil.';
adList[2269] = '\/adutils.';
adList[2270] = '\/aduxads.';
adList[2271] = '\/adv-1.';
adList[2272] = '\/adv-2.';
adList[2273] = '\/adv-banner.';
adList[2274] = '\/adv-bannerize-';
adList[2275] = '\/adv-div-';
adList[2276] = '\/adv-ext-';
adList[2277] = '\/adv-f.';
adList[2278] = '\/adv-scroll-';
adList[2279] = '\/adv-scroll.';
adList[2280] = '\/adv-socialbar-';
adList[2281] = '\/adv.asp';
adList[2282] = '\/adv.css?';
adList[2283] = '\/adv.html';
adList[2284] = '\/adv.jsp';
adList[2285] = '\/adv.php';
adList[2286] = '\/adv.png';
adList[2287] = '\/adv\/adriver';
adList[2288] = '\/adv\/adv_';
adList[2289] = '\/adv\/banner_';
adList[2290] = '\/adv\/bottombanners.';
adList[2291] = '\/adv\/box-';
adList[2292] = '\/adv\/interstitial.';
adList[2293] = '\/adv\/kelkoo_';
adList[2294] = '\/adv\/lrec_';
adList[2295] = '\/adv\/mjx.';
adList[2296] = '\/adv\/preroll_';
adList[2297] = '\/adv\/rdb.';
adList[2298] = '\/adv\/script1.';
adList[2299] = '\/adv\/script2.';
adList[2300] = '\/adv\/search.';
adList[2301] = '\/adv\/skin.';
adList[2302] = '\/adv\/skin_';
adList[2303] = '\/adv\/sprintf-';
adList[2304] = '\/adv\/topbanner.';
adList[2305] = '\/adv\/topbanners.';
adList[2306] = '\/adv02.';
adList[2307] = '\/adv03.';
adList[2308] = '\/adv1.';
adList[2309] = '\/adv150.';
adList[2310] = '\/adv180x150.';
adList[2311] = '\/adv2.';
adList[2312] = '\/adv3.';
adList[2313] = '\/adv4.';
adList[2314] = '\/adv468.';
adList[2315] = '\/adv5.';
adList[2316] = '\/adv6.';
adList[2317] = '\/adv8.';
adList[2318] = '\/adv_2.';
adList[2319] = '\/adv_468.';
adList[2320] = '\/adv_banner_';
adList[2321] = '\/adv_box_';
adList[2322] = '\/adv_burt_';
adList[2323] = '\/adv_display.';
adList[2324] = '\/adv_flash.';
adList[2325] = '\/adv_horiz.';
adList[2326] = '\/adv_hp.';
adList[2327] = '\/adv_left_';
adList[2328] = '\/adv_library3.';
adList[2329] = '\/adv_link.';
adList[2330] = '\/adv_manager_';
adList[2331] = '\/adv_out.';
adList[2332] = '\/adv_player_';
adList[2333] = '\/adv_script_';
adList[2334] = '\/adv_server.';
adList[2335] = '\/adv_teasers.';
adList[2336] = '\/adv_top.';
adList[2337] = '\/adv_vert.';
adList[2338] = '\/adv_vertical.';
adList[2339] = '\/advalue_';
adList[2340] = '\/advaluewriter.';
adList[2341] = '\/advanced-ads-';
adList[2342] = '\/advanced-advertising-';
adList[2343] = '\/advault.';
adList[2344] = '\/advcontents.';
adList[2345] = '\/advcounter.';
adList[2346] = '\/advdl.';
adList[2347] = '\/advengine.';
adList[2348] = '\/adver-left.';
adList[2349] = '\/adver.$domain=~adver.biz';
adList[2350] = '\/adver_hor.';
adList[2351] = '\/adverfisement.';
adList[2352] = '\/adverfisement2.';
adList[2353] = '\/adverserve.';
adList[2354] = '\/adversting?';
adList[2355] = '\/advert-';
adList[2356] = '\/advert.';
adList[2357] = '\/advert01.';
adList[2358] = '\/advert1.';
adList[2359] = '\/advert2.';
adList[2360] = '\/advert3.';
adList[2361] = '\/advert31.';
adList[2362] = '\/advert32.';
adList[2363] = '\/advert33.';
adList[2364] = '\/advert34.';
adList[2365] = '\/advert35.';
adList[2366] = '\/advert36.';
adList[2367] = '\/advert37.';
adList[2368] = '\/advert4.';
adList[2369] = '\/advert5.';
adList[2370] = '\/advert6.';
adList[2371] = '\/advert?';
adList[2372] = '\/advert_';
adList[2373] = '\/advertbanner.';
adList[2374] = '\/advertbanner2.';
adList[2375] = '\/advertbox.';
adList[2376] = '\/advertguruonline1.';
adList[2377] = '\/adverth.';
adList[2378] = '\/adverthorisontalfullwidth.';
adList[2379] = '\/advertical.';
adList[2380] = '\/advertise-';
adList[2381] = '\/advertise.$domain=~advertise.apartments.com|~advertise.bingads.microsoft.com|~advertise.isleofskye.com';
adList[2382] = '\/advertise125x125.';
adList[2383] = '\/advertise_';
adList[2384] = '\/advertisehere.';
adList[2385] = '\/advertisement-';
adList[2386] = '\/advertisement.';
adList[2387] = '\/advertisement1.';
adList[2388] = '\/advertisement160.';
adList[2389] = '\/advertisement2.';
adList[2390] = '\/advertisement3.';
adList[2391] = '\/advertisement_';
adList[2392] = '\/advertisementheader.';
adList[2393] = '\/advertisementmapping.';
adList[2394] = '\/advertisementrotation.';
adList[2395] = '\/advertisements-';
adList[2396] = '\/advertisements.';
adList[2397] = '\/advertisements2.';
adList[2398] = '\/advertisements_';
adList[2399] = '\/advertisementshare.';
adList[2400] = '\/advertiser.$domain=~advertiser.growmobile.com|~panel.rightflow.com';
adList[2401] = '\/advertisers.$image,script,subdocument,domain=~advertisers.adversense.com|~advertisers.easyweddings.com.au|~panel.rightflow.com';
adList[2402] = '\/advertiserwidget.';
adList[2403] = '\/advertisewithus_';
adList[2404] = '\/advertising-$domain=~abramarketing.com|~advertising-direct.com|~outbrain.com|~yellowimages.com';
adList[2405] = '\/advertising.$domain=~advertising.bulurum.com|~advertising.byhoxby.com|~advertising.dailymotion.com|~advertising.theguardian.com';
adList[2406] = '\/advertising02.';
adList[2407] = '\/advertising2.';
adList[2408] = '\/advertising300x250.';
adList[2409] = '\/advertising?';
adList[2410] = '\/advertising_';
adList[2411] = '\/advertisingbanner.';
adList[2412] = '\/advertisingbanner1.';
adList[2413] = '\/advertisingbanner_';
adList[2414] = '\/advertisingbutton.';
adList[2415] = '\/advertisingispresent6?';
adList[2416] = '\/advertisinglinks_';
adList[2417] = '\/advertisingmanual.';
adList[2418] = '\/advertisingmodule.';
adList[2419] = '\/advertisings.';
adList[2420] = '\/advertisment-';
adList[2421] = '\/advertisment.';
adList[2422] = '\/advertisment1-';
adList[2423] = '\/advertisment_';
adList[2424] = '\/advertize_';
adList[2425] = '\/advertlayer.';
adList[2426] = '\/advertmsig.';
adList[2427] = '\/advertorial_';
adList[2428] = '\/advertpixelmedia1.';
adList[2429] = '\/advertrail.';
adList[2430] = '\/advertright.';
adList[2431] = '\/adverts.';
adList[2432] = '\/adverts_';
adList[2433] = '\/advertserve.';
adList[2434] = '\/advertsky.';
adList[2435] = '\/advertsquare.';
adList[2436] = '\/advertstub.';
adList[2437] = '\/adverttop.';
adList[2438] = '\/advertverticallong.';
adList[2439] = '\/advertwebapp.';
adList[2440] = '\/advf1.';
adList[2441] = '\/advhd.';
adList[2442] = '\/advice-ads.';
adList[2443] = '\/advideo.';
adList[2444] = '\/adview.';
adList[2445] = '\/adview?';
adList[2446] = '\/adview_';
adList[2447] = '\/adviewas3.';
adList[2448] = '\/adviewed.';
adList[2449] = '\/adviewer.';
adList[2450] = '\/advinfo.';
adList[2451] = '\/advision.';
adList[2452] = '\/advisit.';
adList[2453] = '\/advlink300.';
adList[2454] = '\/advloader.';
adList[2455] = '\/advolatility.';
adList[2456] = '\/advpartnerinit.';
adList[2457] = '\/advpop.';
adList[2458] = '\/advpreload.';
adList[2459] = '\/advrotator.';
adList[2460] = '\/advs.ads.';
adList[2461] = '\/advscript.';
adList[2462] = '\/advshow.';
adList[2463] = '\/advt.';
adList[2464] = '\/advt2.';
adList[2465] = '\/advtemplate_';
adList[2466] = '\/advweb.';
adList[2467] = '\/adw.shtml';
adList[2468] = '\/adw2.shtml';
adList[2469] = '\/adweb.$domain=~adweb.cz';
adList[2470] = '\/adweb2.';
adList[2471] = '\/adweb33.';
adList[2472] = '\/adwidget_';
adList[2473] = '\/adwiseshopplus1.';
adList[2474] = '\/adwiz.';
adList[2475] = '\/adwizard.';
adList[2476] = '\/adwizard_';
adList[2477] = '\/adwolf.';
adList[2478] = '\/adwords.$domain=~ppc.ee';
adList[2479] = '\/adwordstracking.js';
adList[2480] = '\/adworks.$domain=~adworks.co.il';
adList[2481] = '\/adworx.';
adList[2482] = '\/adworx_';
adList[2483] = '\/adwrapperiframe.';
adList[2484] = '\/adwriter2.';
adList[2485] = '\/adx.$domain=~adx.uk.com';
adList[2486] = '\/adx\/ads?';
adList[2487] = '\/adx\/iframe.';
adList[2488] = '\/adx160.';
adList[2489] = '\/adx2.';
adList[2490] = '\/adx_exo_';
adList[2491] = '\/adx_flash.';
adList[2492] = '\/adx_iframe_';
adList[2493] = '\/adxsite.';
adList[2494] = '\/adxx.php?';
adList[2495] = '\/adyard.';
adList[2496] = '\/adyard300.';
adList[2497] = '\/adyea.';
adList[2498] = '\/adyoulike.';
adList[2499] = '\/adzbotm.';
adList[2500] = '\/adzerk2_';
adList[2501] = '\/adzone.';
adList[2502] = '\/adzone1.';
adList[2503] = '\/adzone4.';
adList[2504] = '\/adzone_';
adList[2505] = '\/adzoneadxp.';
adList[2506] = '\/adzonebelowplayer.';
adList[2507] = '\/adzonebottom.';
adList[2508] = '\/adzonecenteradhomepage.';
adList[2509] = '\/adzoneleft.';
adList[2510] = '\/adzonelegend.';
adList[2511] = '\/adzoneplayerright.';
adList[2512] = '\/adzoneplayerright2.';
adList[2513] = '\/adzoneright.';
adList[2514] = '\/adzonesidead.';
adList[2515] = '\/adzonetop.';
adList[2516] = '\/adztop.';
adList[2517] = '\/afc-match?q=';
adList[2518] = '\/afcads.';
adList[2519] = '\/afcsearchads.';
adList[2520] = '\/aff.htm';
adList[2521] = '\/aff\/ads_';
adList[2522] = '\/aff_ad?';
adList[2523] = '\/aff_frame.';
adList[2524] = '\/affad?';
adList[2525] = '\/affilatebanner.';
adList[2526] = '\/affiliate-banner-';
adList[2527] = '\/affiliate\/displaywidget?';
adList[2528] = '\/affiliate\/promo-';
adList[2529] = '\/affiliate\/script.php?';
adList[2530] = '\/affiliate_show_banner.';
adList[2531] = '\/affiliate_show_iframe.';
adList[2532] = '\/affiliateadvertisement.';
adList[2533] = '\/affiliates\/ban';
adList[2534] = '\/affiliates\/contextual.';
adList[2535] = '\/affiliateserver.';
adList[2536] = '\/affiliationcash.';
adList[2537] = '\/afr.php?';
adList[2538] = '\/afr?auid=';
adList[2539] = '\/ajax-advert-';
adList[2540] = '\/ajax-advert.';
adList[2541] = '\/ajax\/ads_';
adList[2542] = '\/ajaxad?';
adList[2543] = '\/ajaxads.';
adList[2544] = '\/ajs.php?';
adList[2545] = '\/ajs?auid=';
adList[2546] = '\/ak-ads-';
adList[2547] = '\/alternet.ad?';
adList[2548] = '\/alwebad_';
adList[2549] = '\/am\/ads.';
adList[2550] = '\/amazon-async-';
adList[2551] = '\/amazon\/iframeproxy-';
adList[2552] = '\/amp-ad-';
adList[2553] = '\/amzn_ads.';
adList[2554] = '\/amzn_omakase.';
adList[2555] = '\/anchorad.';
adList[2556] = '\/annonse.$domain=~annonse.nu';
adList[2557] = '\/annonser.';
adList[2558] = '\/anyad.js';
adList[2559] = '\/api.ad.';
adList[2560] = '\/apopwin.';
adList[2561] = '\/app.ads-';
adList[2562] = '\/app.ads.';
adList[2563] = '\/app\/ads.';
adList[2564] = '\/article-ad-';
adList[2565] = '\/article_ad.';
adList[2566] = '\/articlesponsorderiv_';
adList[2567] = '\/artimediatargetads.';
adList[2568] = '\/as\/gb2?stid=';
adList[2569] = '\/as\/gb?stid=';
adList[2570] = '\/as3overstreamplatformadapter.';
adList[2571] = '\/aseadnshow.';
adList[2572] = '\/aspbanner_inc.asp?';
adList[2573] = '\/assets\/ad-';
adList[2574] = '\/assets\/ads-';
adList[2575] = '\/assets\/ads3-';
adList[2576] = '\/assets\/ads_';
adList[2577] = '\/asyncadload.';
adList[2578] = '\/asyncjs.$domain=~asyncjs.com';
adList[2579] = '\/asyncspc.';
adList[2580] = '\/athena\/tag\/?';
adList[2581] = '\/atrads.';
adList[2582] = '\/attractiveads_';
adList[2583] = '\/attractiveadscube.';
adList[2584] = '\/auditudeadunit.';
adList[2585] = '\/auditudebanners.';
adList[2586] = '\/austria_ad.';
adList[2587] = '\/auto_ad_';
adList[2588] = '\/avatar_ad_';
adList[2589] = '\/awe2.js';
adList[2590] = '\/awempire.';
adList[2591] = '\/awepop.';
adList[2592] = '\/b.ads.';
adList[2593] = '\/back-ad.';
adList[2594] = '\/background_ad_';
adList[2595] = '\/backgroundad40.';
adList[2596] = '\/backgroundadvertising.';
adList[2597] = '\/badge_ad_';
adList[2598] = '\/ban.php?';
adList[2599] = '\/ban160.php';
adList[2600] = '\/ban300.html';
adList[2601] = '\/ban300.php';
adList[2602] = '\/ban728.html';
adList[2603] = '\/ban728.php';
adList[2604] = '\/ban728x90.';
adList[2605] = '\/ban_ad.';
adList[2606] = '\/ban_m.php?';
adList[2607] = '\/banimpress.';
adList[2608] = '\/banman.asp?';
adList[2609] = '\/banner-300x250.';
adList[2610] = '\/banner-ad-';
adList[2611] = '\/banner-ad.';
adList[2612] = '\/banner-ad_';
adList[2613] = '\/banner.asp?$third-party';
adList[2614] = '\/banner.ca?';
adList[2615] = '\/banner.cgi?';
adList[2616] = '\/banner.gif?';
adList[2617] = '\/banner.htm?';
adList[2618] = '\/banner.php';
adList[2619] = '\/banner.ws?';
adList[2620] = '\/banner\/468';
adList[2621] = '\/banner\/700';
adList[2622] = '\/banner\/ad.';
adList[2623] = '\/banner\/ad_';
adList[2624] = '\/banner\/adv_';
adList[2625] = '\/banner\/sponsor_';
adList[2626] = '\/banner\/virtuagirl';
adList[2627] = '\/banner160x600-';
adList[2628] = '\/banner20468x60.';
adList[2629] = '\/banner460x80.';
adList[2630] = '\/banner468.';
adList[2631] = '\/banner468_';
adList[2632] = '\/banner468a.';
adList[2633] = '\/banner468x60.';
adList[2634] = '\/banner468x80.';
adList[2635] = '\/banner728x90_';
adList[2636] = '\/banner_125x';
adList[2637] = '\/banner_468.';
adList[2638] = '\/banner_468x';
adList[2639] = '\/banner_ad.';
adList[2640] = '\/banner_ad_';
adList[2641] = '\/banner_ads.';
adList[2642] = '\/banner_ads_';
adList[2643] = '\/banner_control.php?';
adList[2644] = '\/banner_db.php?';
adList[2645] = '\/banner_file.php?';
adList[2646] = '\/banner_iframe_';
adList[2647] = '\/banner_image.php?';
adList[2648] = '\/banner_oas.js';
adList[2649] = '\/banner_skyscraper.';
adList[2650] = '\/banner_view.';
adList[2651] = '\/bannerad.';
adList[2652] = '\/bannerad1-';
adList[2653] = '\/bannerad2-';
adList[2654] = '\/bannerad3.';
adList[2655] = '\/bannerad6.';
adList[2656] = '\/bannerad_';
adList[2657] = '\/bannerads-';
adList[2658] = '\/bannerads.';
adList[2659] = '\/banneradsajax.';
adList[2660] = '\/banneradsgenerator.';
adList[2661] = '\/banneradviva.';
adList[2662] = '\/bannercode.php';
adList[2663] = '\/bannerconduit.';
adList[2664] = '\/bannerdeliver.php';
adList[2665] = '\/bannerfarm.';
adList[2666] = '\/bannerfile\/ad_';
adList[2667] = '\/bannerframeopenads.';
adList[2668] = '\/bannerframeopenads_';
adList[2669] = '\/bannerinc.';
adList[2670] = '\/bannerjs.php?';
adList[2671] = '\/bannermvt.';
adList[2672] = '\/bannerpump.';
adList[2673] = '\/bannerrotate.';
adList[2674] = '\/bannerrotation.';
adList[2675] = '\/banners.cgi?';
adList[2676] = '\/banners.php?id';
adList[2677] = '\/banners\/160';
adList[2678] = '\/banners\/300';
adList[2679] = '\/banners\/460';
adList[2680] = '\/banners\/468';
adList[2681] = '\/banners\/728';
adList[2682] = '\/banners\/ad10.';
adList[2683] = '\/banners\/ad11.';
adList[2684] = '\/banners\/ad_';
adList[2685] = '\/banners\/ads-';
adList[2686] = '\/banners\/ads.';
adList[2687] = '\/banners\/adv_';
adList[2688] = '\/banners\/aff.';
adList[2689] = '\/banners\/googlebanner';
adList[2690] = '\/banners_rotation.';
adList[2691] = '\/bannersads_';
adList[2692] = '\/bannerserver3|';
adList[2693] = '\/bannerserver?';
adList[2694] = '\/bannersyndication.';
adList[2695] = '\/bar-ad.';
adList[2696] = '\/basead.';
adList[2697] = '\/baselinead.';
adList[2698] = '\/basepopunder.';
adList[2699] = '\/bbad.';
adList[2700] = '\/bbad1.';
adList[2701] = '\/bbad10.';
adList[2702] = '\/bbad2.';
adList[2703] = '\/bbad3.';
adList[2704] = '\/bbad4.';
adList[2705] = '\/bbad5.';
adList[2706] = '\/bbad6.';
adList[2707] = '\/bbad7.';
adList[2708] = '\/bbad8.';
adList[2709] = '\/bbad9.';
adList[2710] = '\/bckgrnd_ad.';
adList[2711] = '\/bdcustomadsense-';
adList[2712] = '\/beacon\/ads?';
adList[2713] = '\/bennerad.min.';
adList[2714] = '\/beta-ad.';
adList[2715] = '\/betrad.js';
adList[2716] = '\/bg-advert-';
adList[2717] = '\/bg_ads_';
adList[2718] = '\/bg_adv_';
adList[2719] = '\/bi_affiliate.js';
adList[2720] = '\/big-ad-switch-';
adList[2721] = '\/bigad.';
adList[2722] = '\/bigad_';
adList[2723] = '\/bigboxad.';
adList[2724] = '\/bigtopl.swf';
adList[2725] = '\/bizad.';
adList[2726] = '\/blockad_';
adList[2727] = '\/blog-ad-';
adList[2728] = '\/blog_ad?';
adList[2729] = '\/blogad.';
adList[2730] = '\/blogad02.';
adList[2731] = '\/blogad_';
adList[2732] = '\/blogads-';
adList[2733] = '\/blogads.';
adList[2734] = '\/blogads2_';
adList[2735] = '\/blogads_';
adList[2736] = '\/blogadsbg.';
adList[2737] = '\/bloggerex.';
adList[2738] = '\/blogoas-';
adList[2739] = '\/bmndoubleclickad.';
adList[2740] = '\/bnr.php?';
adList[2741] = '\/bnr_show.php?id=$script';
adList[2742] = '\/bnrimg.';
adList[2743] = '\/bnrsrv.';
adList[2744] = '\/bookads.';
adList[2745] = '\/bookads2.';
adList[2746] = '\/boomad.';
adList[2747] = '\/bottom-ad-';
adList[2748] = '\/bottom-ads.';
adList[2749] = '\/bottom-advert-';
adList[2750] = '\/bottom_ad.';
adList[2751] = '\/bottom_ads.';
adList[2752] = '\/bottom_adv.';
adList[2753] = '\/bottom_adv_';
adList[2754] = '\/bottomad.';
adList[2755] = '\/bottomads.';
adList[2756] = '\/box_ad_';
adList[2757] = '\/box_ads_';
adList[2758] = '\/boxad.';
adList[2759] = '\/boxad1.';
adList[2760] = '\/boxad2.';
adList[2761] = '\/boxad3.';
adList[2762] = '\/boxad_';
adList[2763] = '\/breakad_';
adList[2764] = '\/brightcovead.';
adList[2765] = '\/btbuckets\/btb.js';
adList[2766] = '\/btmads.';
adList[2767] = '\/btmadsx.';
adList[2768] = '\/btn_ad_';
adList[2769] = '\/bucketads.';
adList[2770] = '\/buddyw_ad.';
adList[2771] = '\/burt\/adv_';
adList[2772] = '\/butler.php?type=';
adList[2773] = '\/buttonad_';
adList[2774] = '\/buttonads.';
adList[2775] = '\/buyad.';
adList[2776] = '\/buysellads-';
adList[2777] = '\/buysellads.';
adList[2778] = '\/bytemark_ad.';
adList[2779] = '\/cache\/ads_';
adList[2780] = '\/cads-min.js';
adList[2781] = '\/callads5.';
adList[2782] = '\/calladserver?';
adList[2783] = '\/camaoadsense.';
adList[2784] = '\/camaoadsensehomepage.';
adList[2785] = '\/campaign\/advertiser_';
adList[2786] = '\/carbonads-';
adList[2787] = '\/carouselads.';
adList[2788] = '\/carsadtaggenerator.js';
adList[2789] = '\/cashad.';
adList[2790] = '\/cashad2.';
adList[2791] = '\/cb.php?sub$script,third-party';
adList[2792] = '\/cbgads.';
adList[2793] = '\/cci-ads-';
adList[2794] = '\/cdn.ad.';
adList[2795] = '\/cdn.ads.';
adList[2796] = '\/centerads.';
adList[2797] = '\/centralresource\/ad_';
adList[2798] = '\/cgi-bin\/ads.';
adList[2799] = '\/cgi-bin\/ads_';
adList[2800] = '\/cgi-exe\/ad.';
adList[2801] = '\/cgi\/ad_';
adList[2802] = '\/channelblockads.';
adList[2803] = '\/checkm8footer_';
adList[2804] = '\/checkm8header_';
adList[2805] = '\/chinaadclient.';
adList[2806] = '\/chitika-ad?';
adList[2807] = '\/chrome-ad.';
adList[2808] = '\/ciaad.';
adList[2809] = '\/circads.';
adList[2810] = '\/cjadsprite.';
adList[2811] = '\/ck.php?nids';
adList[2812] = '\/clarityray.js';
adList[2813] = '\/click\/ads_';
adList[2814] = '\/clickboothad.';
adList[2815] = '\/clicksor.';
adList[2816] = '\/clickunder.';
adList[2817] = '\/clkads.';
adList[2818] = '\/cme-ad-';
adList[2819] = '\/cms\/js\/ad_';
adList[2820] = '\/cn-advert.';
adList[2821] = '\/cnads.js';
adList[2822] = '\/cnnslads.';
adList[2823] = '\/cnxad-';
adList[2824] = '\/codaadconfig.';
adList[2825] = '\/coldseal_ad.';
adList[2826] = '\/collisionadmarker.';
adList[2827] = '\/column-ad-';
adList[2828] = '\/columnadcounter.';
adList[2829] = '\/comment-ad-';
adList[2830] = '\/comment-ad.';
adList[2831] = '\/commercial_horizontal.';
adList[2832] = '\/commercial_top.';
adList[2833] = '\/common\/ad.';
adList[2834] = '\/common\/ad_';
adList[2835] = '\/common\/adv_';
adList[2836] = '\/common\/dart_wrapper_';
adList[2837] = '\/common_ad.';
adList[2838] = '\/commonad.';
adList[2839] = '\/commspace_ad.';
adList[2840] = '\/companion_ad.';
adList[2841] = '\/companion_ads.';
adList[2842] = '\/companionadfunc.';
adList[2843] = '\/compban.html?';
adList[2844] = '\/components\/ads_';
adList[2845] = '\/conad.';
adList[2846] = '\/conad_';
adList[2847] = '\/cont-adv.';
adList[2848] = '\/contads.';
adList[2849] = '\/contaxe_';
adList[2850] = '\/content-ads.';
adList[2851] = '\/content\/ad_';
adList[2852] = '\/content_ad.';
adList[2853] = '\/content_ad_';
adList[2854] = '\/contentad.';
adList[2855] = '\/contentad_';
adList[2856] = '\/contentadservlet?';
adList[2857] = '\/contentadvert1.';
adList[2858] = '\/contentadxxl.';
adList[2859] = '\/contentad|';
adList[2860] = '\/contentmobilead.';
adList[2861] = '\/context_ads.';
adList[2862] = '\/contextad.';
adList[2863] = '\/contextads.';
adList[2864] = '\/contextualad.';
adList[2865] = '\/contpop.js|';
adList[2866] = '\/contribute_ad.';
adList[2867] = '\/convertjsontoad.';
adList[2868] = '\/core-ads-';
adList[2869] = '\/corner-ad.';
adList[2870] = '\/cornerbig.swf';
adList[2871] = '\/cornersmall.swf';
adList[2872] = '\/country_ad.';
adList[2873] = '\/cpm160.';
adList[2874] = '\/cpm728.';
adList[2875] = '\/cpm_ad.';
adList[2876] = '\/cpmbanner.';
adList[2877] = '\/cpmrect.';
adList[2878] = '\/cpx-ad.';
adList[2879] = '\/cpx_ads.';
adList[2880] = '\/cpxads.';
adList[2881] = '\/cramitin\/ads_';
adList[2882] = '\/crossoverad-';
adList[2883] = '\/csp\/ads?';
adList[2884] = '\/css\/ad.';
adList[2885] = '\/css\/ads-';
adList[2886] = '\/css\/ads.';
adList[2887] = '\/css\/adsense';
adList[2888] = '\/css\/adv.';
adList[2889] = '\/ctamlive160x160.';
adList[2890] = '\/cubead.';
adList[2891] = '\/cubeads_';
adList[2892] = '\/curlad.';
adList[2893] = '\/custom\/ads';
adList[2894] = '\/custom11x5ad.';
adList[2895] = '\/customad.';
adList[2896] = '\/customadmode.';
adList[2897] = '\/customadsense.';
adList[2898] = '\/customerad_';
adList[2899] = '\/cutead.';
adList[2900] = '\/cwggoogleadshow.';
adList[2901] = '\/dart_ads.';
adList[2902] = '\/dartadengine.';
adList[2903] = '\/dartadengine2.';
adList[2904] = '\/dartads.';
adList[2905] = '\/dartcall.';
adList[2906] = '\/dartfunctions.';
adList[2907] = '\/data\/init2?site_id=';
adList[2908] = '\/data\/init?site_id=';
adList[2909] = '\/dateads.';
adList[2910] = '\/davad_ad_';
adList[2911] = '\/dblclick.';
adList[2912] = '\/dblclickad.';
adList[2913] = '\/dclk_ads.';
adList[2914] = '\/dclk_ads_';
adList[2915] = '\/default_adv.';
adList[2916] = '\/default_oas.';
adList[2917] = '\/defaultad?';
adList[2918] = '\/defer_ads.';
adList[2919] = '\/deferads.';
adList[2920] = '\/defersds.';
adList[2921] = '\/delayedad.';
adList[2922] = '\/deliver.jphp?';
adList[2923] = '\/deliver.nmi?';
adList[2924] = '\/deliverads.';
adList[2925] = '\/deliverjs.nmi?';
adList[2926] = '\/deliversds.';
adList[2927] = '\/delivery.ads.';
adList[2928] = '\/delivery.php?pool_id=';
adList[2929] = '\/delivery.php?rnd=';
adList[2930] = '\/delivery\/afr.';
adList[2931] = '\/delivery\/ag.';
adList[2932] = '\/delivery\/al.php';
adList[2933] = '\/delivery\/apu.php';
adList[2934] = '\/delivery\/avw.';
adList[2935] = '\/delivery\/fc.';
adList[2936] = '\/delivery\/fl.';
adList[2937] = '\/delivery\/spc.';
adList[2938] = '\/delivery\/vbafr.php';
adList[2939] = '\/demoad.';
adList[2940] = '\/descpopup.js';
adList[2941] = '\/develop\/ads_';
adList[2942] = '\/dfp-ads.';
adList[2943] = '\/dfp.js';
adList[2944] = '\/dfp\/async.';
adList[2945] = '\/dfp\/dc.js';
adList[2946] = '\/dfp\/jquery.';
adList[2947] = '\/dfp_delivery.js';
adList[2948] = '\/dfp_init.';
adList[2949] = '\/dfpads.';
adList[2950] = '\/dfpsds.';
adList[2951] = '\/dfpsearchads.';
adList[2952] = '\/dif\/?cid';
adList[2953] = '\/dig_ad.';
adList[2954] = '\/digest\/ads.';
adList[2955] = '\/digg_ads.';
adList[2956] = '\/digg_ads_';
adList[2957] = '\/direct_ads.';
adList[2958] = '\/directads.';
adList[2959] = '\/directadvert.';
adList[2960] = '\/directrev.';
adList[2961] = '\/dispad_';
adList[2962] = '\/display-ads-';
adList[2963] = '\/display.ad.';
adList[2964] = '\/display?ad_';
adList[2965] = '\/display_ad';
adList[2966] = '\/displayad.';
adList[2967] = '\/displayad?';
adList[2968] = '\/displayadbanner_';
adList[2969] = '\/displayadiframe.';
adList[2970] = '\/displayadleader.';
adList[2971] = '\/displayads.';
adList[2972] = '\/displayads1.';
adList[2973] = '\/displayads2.';
adList[2974] = '\/displayads3.';
adList[2975] = '\/displayadsiframe.';
adList[2976] = '\/div-ads.';
adList[2977] = '\/dlfeatads.';
adList[2978] = '\/dmn-advert.';
adList[2979] = '\/dne_ad.';
adList[2980] = '\/dnsads.';
adList[2981] = '\/doubleclick.aspx';
adList[2982] = '\/doubleclick.js';
adList[2983] = '\/doubleclick.php';
adList[2984] = '\/doubleclick.swf';
adList[2985] = '\/doubleclick\/iframe.';
adList[2986] = '\/doubleclick_ads.';
adList[2987] = '\/doubleclickad.';
adList[2988] = '\/doubleclickads?';
adList[2989] = '\/doubleclickbannerad?';
adList[2990] = '\/doubleclickcontainer.';
adList[2991] = '\/doubleclickinstreamad.';
adList[2992] = '\/doubleclickloader.';
adList[2993] = '\/doubleclickplugin.';
adList[2994] = '\/doubleclicktag.';
adList[2995] = '\/doublepimp2.js';
adList[2996] = '\/downads.';
adList[2997] = '\/download\/ad.';
adList[2998] = '\/download\/ads';
adList[2999] = '\/drawad.';
adList[3000] = '\/driveragentad1.';
adList[3001] = '\/driveragentad2.';
adList[3002] = '\/dropdown_ad.';
adList[3003] = '\/dspads.';
adList[3004] = '\/dtiadvert125x125.';
adList[3005] = '\/dtim300x250.$script';
adList[3006] = '\/dummy_ad_';
adList[3007] = '\/dyn_banner.';
adList[3008] = '\/dyn_banners_';
adList[3009] = '\/dynamic-ad-';
adList[3010] = '\/dynamicad?';
adList[3011] = '\/dynamiccsad?';
adList[3012] = '\/dynamicvideoad?';
adList[3013] = '\/dynanews\/ad-';
adList[3014] = '\/eas-fif.htm';
adList[3015] = '\/eas_fif.';
adList[3016] = '\/eas_tag.1.0.js';
adList[3017] = '\/easyads.';
adList[3018] = '\/easyadstrack.';
adList[3019] = '\/easyazon-';
adList[3020] = '\/ebayad.';
adList[3021] = '\/ecom\/magnet.';
adList[3022] = '\/eht.js?site_';
adList[3023] = '\/embed\/ads.';
adList[3024] = '\/embed_ad.';
adList[3025] = '\/emediatead.';
adList[3026] = '\/emreads.';
adList[3027] = '\/ems\/ads.';
adList[3028] = '\/eplanningv4.';
adList[3029] = '\/eporner-banner-';
adList[3030] = '\/ept_in.php?';
adList[3031] = '\/ero-1.';
adList[3032] = '\/ero-ads-';
adList[3033] = '\/ero-ads_';
adList[3034] = '\/ero-advertising.';
adList[3035] = '\/ero.htm';
adList[3036] = '\/ero_hosted_';
adList[3037] = '\/ero_line_';
adList[3038] = '\/eroad.php';
adList[3039] = '\/eroad2.';
adList[3040] = '\/eroads.';
adList[3041] = '\/eroadvertising.';
adList[3042] = '\/eroadvertorial2.';
adList[3043] = '\/eroadvertorial3.';
adList[3044] = '\/erobanner.';
adList[3045] = '\/eros.htm';
adList[3046] = '\/eshopoffer.';
adList[3047] = '\/etology.$domain=~etology.com';
adList[3048] = '\/exchange_banner_';
adList[3049] = '\/exit_popup';
adList[3050] = '\/exitpop.';
adList[3051] = '\/exitpopunder.';
adList[3052] = '\/exitpopunder_';
adList[3053] = '\/exitpopup.';
adList[3054] = '\/exitsplash.';
adList[3055] = '\/exo120x60.';
adList[3056] = '\/exobanner.';
adList[3057] = '\/exoclick.';
adList[3058] = '\/exoclickright.';
adList[3059] = '\/exoclickright1.';
adList[3060] = '\/exoclickright2.';
adList[3061] = '\/exoclickright3.';
adList[3062] = '\/expandable_ad.php';
adList[3063] = '\/expandable_ad?';
adList[3064] = '\/expandingads.';
adList[3065] = '\/expandy-ads.';
adList[3066] = '\/expop.js';
adList[3067] = '\/ext_ads.';
adList[3068] = '\/extendedadvert.';
adList[3069] = '\/external\/ad.';
adList[3070] = '\/external_ads.';
adList[3071] = '\/externalad.';
adList[3072] = '\/externaladnetworkviewloglogservlet?';
adList[3073] = '\/externalhtmladrenderer.';
adList[3074] = '\/eyewondermanagement.';
adList[3075] = '\/eyewondermanagement28.';
adList[3076] = '\/facebooksex.';
adList[3077] = '\/fan-ads.$script';
adList[3078] = '\/fastclick160.';
adList[3079] = '\/fastclick728.';
adList[3080] = '\/fatads.';
adList[3081] = '\/fc_ads.';
adList[3082] = '\/fea_ads.';
adList[3083] = '\/featuredadshome.';
adList[3084] = '\/feedads.';
adList[3085] = '\/file\/ad.';
adList[3086] = '\/files\/ad-';
adList[3087] = '\/files\/ads-';
adList[3088] = '\/filter.php?pro$script';
adList[3089] = '\/fimserve.';
adList[3090] = '\/finads.';
adList[3091] = '\/first-ad_';
adList[3092] = '\/flag_ads.';
adList[3093] = '\/flash-ads.';
adList[3094] = '\/flash\/ad_';
adList[3095] = '\/flash\/advertis';
adList[3096] = '\/flash_ads.';
adList[3097] = '\/flashad.';
adList[3098] = '\/flashad3.';
adList[3099] = '\/flashads.';
adList[3100] = '\/flatad.';
adList[3101] = '\/flesh_banner';
adList[3102] = '\/fleshlight.$domain=~fleshlight.com|~fleshlight.zendesk.com';
adList[3103] = '\/fleshlightcash_';
adList[3104] = '\/flexads?';
adList[3105] = '\/fliionosadcapture-';
adList[3106] = '\/flirt4free.';
adList[3107] = '\/float_ad.';
adList[3108] = '\/floatad_';
adList[3109] = '\/floatads.';
adList[3110] = '\/floatadv.';
adList[3111] = '\/floater_ad.';
adList[3112] = '\/floating-ad-';
adList[3113] = '\/floatingad.';
adList[3114] = '\/floatingad_';
adList[3115] = '\/floatingads.';
adList[3116] = '\/floaty_rotator';
adList[3117] = '\/flv-ad-';
adList[3118] = '\/flvad_';
adList[3119] = '\/flyad.';
adList[3120] = '\/fm-ads1.';
adList[3121] = '\/fm-ads2.';
adList[3122] = '\/fm-ads3.';
adList[3123] = '\/fm-ads4.';
adList[3124] = '\/fn_ads.';
adList[3125] = '\/footad-';
adList[3126] = '\/footad.';
adList[3127] = '\/footer-ad-';
adList[3128] = '\/footer-ad.';
adList[3129] = '\/footer_ad.';
adList[3130] = '\/footer_ad_';
adList[3131] = '\/footer_ads.';
adList[3132] = '\/footer_ads_';
adList[3133] = '\/footerad.';
adList[3134] = '\/footerad?';
adList[3135] = '\/footerads.';
adList[3136] = '\/footertextads.';
adList[3137] = '\/forads.';
adList[3138] = '\/frame_ads_';
adList[3139] = '\/framead-';
adList[3140] = '\/framead.';
adList[3141] = '\/framead_';
adList[3142] = '\/frameads.';
adList[3143] = '\/frameads1.';
adList[3144] = '\/frameads_';
adList[3145] = '\/frameadsz.';
adList[3146] = '\/freead.';
adList[3147] = '\/freead2.';
adList[3148] = '\/frequencyads.';
adList[3149] = '\/friendfinder_';
adList[3150] = '\/frnads.';
adList[3151] = '\/fullad.';
adList[3152] = '\/fulladbazee.';
adList[3153] = '\/fwadmanager.';
adList[3154] = '\/gads.html';
adList[3155] = '\/gads.js';
adList[3156] = '\/gafc.js';
adList[3157] = '\/gafsads?';
adList[3158] = '\/gafv_adapter.';
adList[3159] = '\/galleryad.';
adList[3160] = '\/gam.html?';
adList[3161] = '\/gam_ad.';
adList[3162] = '\/gam_ad_';
adList[3163] = '\/gam_ads.';
adList[3164] = '\/game-ads.';
adList[3165] = '\/gameadsync.';
adList[3166] = '\/gamersad.';
adList[3167] = '\/gate-ad-';
adList[3168] = '\/gatewayads.';
adList[3169] = '\/geitonpop.';
adList[3170] = '\/gen_ads_';
adList[3171] = '\/general-ad-';
adList[3172] = '\/general\/ads';
adList[3173] = '\/generate_ad.';
adList[3174] = '\/generate_ads.';
adList[3175] = '\/generateadtag.';
adList[3176] = '\/generated\/key.js?';
adList[3177] = '\/generateplayerads.';
adList[3178] = '\/generic.ads.';
adList[3179] = '\/geo-ads_';
adList[3180] = '\/geo\/ads.';
adList[3181] = '\/geo_banner.htm?';
adList[3182] = '\/geobox.html';
adList[3183] = '\/geodynbanner.php?wmid=';
adList[3184] = '\/get-ad.';
adList[3185] = '\/get-advert-';
adList[3186] = '\/get.ad?';
adList[3187] = '\/get\/ad.';
adList[3188] = '\/get\/ad?';
adList[3189] = '\/get_ad_';
adList[3190] = '\/get_ads.';
adList[3191] = '\/get_banner.asp?';
adList[3192] = '\/getad.';
adList[3193] = '\/getad;';
adList[3194] = '\/getad?';
adList[3195] = '\/getadcontent.';
adList[3196] = '\/getadds.';
adList[3197] = '\/getadforcallback?';
adList[3198] = '\/getadframe.';
adList[3199] = '\/getads-';
adList[3200] = '\/getads.';
adList[3201] = '\/getads?';
adList[3202] = '\/getadserver.';
adList[3203] = '\/getadsettingsjs?';
adList[3204] = '\/getadsforclient?';
adList[3205] = '\/getads|';
adList[3206] = '\/getadvertimageservlet?';
adList[3207] = '\/getadvertisement^';
adList[3208] = '\/getadvertiserimage.';
adList[3209] = '\/getadverts?';
adList[3210] = '\/getadvoverlay.';
adList[3211] = '\/getarticleadvertimageservlet?';
adList[3212] = '\/getban.php?';
adList[3213] = '\/getbanner.cfm?';
adList[3214] = '\/getbanner.php?';
adList[3215] = '\/getfeaturedadsforshow.';
adList[3216] = '\/gethalfpagead.';
adList[3217] = '\/getjsonads?';
adList[3218] = '\/getmarketplaceads.';
adList[3219] = '\/getmdhlayer.';
adList[3220] = '\/getmdhlink.';
adList[3221] = '\/getrcmd.js?';
adList[3222] = '\/getsad.php?';
adList[3223] = '\/getsponslinks.';
adList[3224] = '\/getsponslinksauto.';
adList[3225] = '\/gettextad.';
adList[3226] = '\/getvastad?';
adList[3227] = '\/getvdopiaads.';
adList[3228] = '\/getvideoad.';
adList[3229] = '\/gexternalad.';
adList[3230] = '\/ggadsense.';
adList[3231] = '\/glam160.';
adList[3232] = '\/glam300.';
adList[3233] = '\/glam728.';
adList[3234] = '\/glam_ads.';
adList[3235] = '\/global-ads_';
adList[3236] = '\/global\/ads.';
adList[3237] = '\/global_advs.';
adList[3238] = '\/globalad.';
adList[3239] = '\/globaladprostyles.';
adList[3240] = '\/globaladtag.';
adList[3241] = '\/globalbannerad.';
adList[3242] = '\/googad300by600.';
adList[3243] = '\/google-ad-';
adList[3244] = '\/google-ad?';
adList[3245] = '\/google-ads-';
adList[3246] = '\/google-ads.';
adList[3247] = '\/google-adsense-';
adList[3248] = '\/google-adsense.';
adList[3249] = '\/google-adverts-';
adList[3250] = '\/google-adwords';
adList[3251] = '\/google-afc-';
adList[3252] = '\/google-afc.';
adList[3253] = '\/google\/ad?';
adList[3254] = '\/google\/adv.';
adList[3255] = '\/google160.';
adList[3256] = '\/google728.';
adList[3257] = '\/google_ad.';
adList[3258] = '\/google_ad_';
adList[3259] = '\/google_ads.';
adList[3260] = '\/google_ads_';
adList[3261] = '\/google_afc.';
adList[3262] = '\/google_afc_';
adList[3263] = '\/google_afs.';
adList[3264] = '\/google_caf.js?';
adList[3265] = '\/google_lander2.js';
adList[3266] = '\/google_radlinks_';
adList[3267] = '\/googlead-';
adList[3268] = '\/googlead.';
adList[3269] = '\/googlead1.';
adList[3270] = '\/googlead160.';
adList[3271] = '\/googlead300.';
adList[3272] = '\/googlead336x280.';
adList[3273] = '\/googlead_';
adList[3274] = '\/googleadbg.';
adList[3275] = '\/googleadcode.';
adList[3276] = '\/googleaddfooter.';
adList[3277] = '\/googleaddisplayframe.';
adList[3278] = '\/googleadhp.';
adList[3279] = '\/googleadhpbot.';
adList[3280] = '\/googleadiframe_';
adList[3281] = '\/googleadright.';
adList[3282] = '\/googleads-';
adList[3283] = '\/googleads.';
adList[3284] = '\/googleads1.';
adList[3285] = '\/googleads2.';
adList[3286] = '\/googleads3widetext.';
adList[3287] = '\/googleads_';
adList[3288] = '\/googleadsafc_';
adList[3289] = '\/googleadsafs_';
adList[3290] = '\/googleadscripts.';
adList[3291] = '\/googleadsense.';
adList[3292] = '\/googleadtaggingsubsec.';
adList[3293] = '\/googleadunit?';
adList[3294] = '\/googleafc.';
adList[3295] = '\/googleafs.';
adList[3296] = '\/googleafvadrenderer.';
adList[3297] = '\/googlecontextualads.';
adList[3298] = '\/googleheadad.';
adList[3299] = '\/googleleader.';
adList[3300] = '\/googleleads.';
adList[3301] = '\/googlempu.';
adList[3302] = '\/gpt_ads-';
adList[3303] = '\/graphics\/ad_';
adList[3304] = '\/grid-ad.';
adList[3305] = '\/gt6skyadtop.';
adList[3306] = '\/gtags\/pin_tag.';
adList[3307] = '\/gtv_ads.';
adList[3308] = '\/guardianleader.';
adList[3309] = '\/guardrailad_';
adList[3310] = '\/gujad.';
adList[3311] = '\/gutterad.';
adList[3312] = '\/gutterspacead.';
adList[3313] = '\/hads-';
adList[3314] = '\/handlers\/ads.';
adList[3315] = '\/hdadvertisment-';
adList[3316] = '\/header-ad.';
adList[3317] = '\/header_ad_';
adList[3318] = '\/header_ads_';
adList[3319] = '\/headerad.';
adList[3320] = '\/headeradd2.';
adList[3321] = '\/headerads.';
adList[3322] = '\/headerads1.';
adList[3323] = '\/headeradvertismenttab.';
adList[3324] = '\/headermktgpromoads.';
adList[3325] = '\/headvert.';
adList[3326] = '\/heat_ad.';
adList[3327] = '\/hiadone_';
adList[3328] = '\/hitbar_ad_';
adList[3329] = '\/holl_ad.';
adList[3330] = '\/home\/_ads';
adList[3331] = '\/home\/ad_';
adList[3332] = '\/home\/ads-';
adList[3333] = '\/home\/ads_';
adList[3334] = '\/home\/sponsor_';
adList[3335] = '\/home30\/ad.';
adList[3336] = '\/home_adv.';
adList[3337] = '\/homepage_ad_';
adList[3338] = '\/homepageadvertright.';
adList[3339] = '\/hompagestickyad.';
adList[3340] = '\/horizontal_advert_';
adList[3341] = '\/horizontalad.';
adList[3342] = '\/hostedads.';
adList[3343] = '\/hostedbannerads.';
adList[3344] = '\/hostgator-ad.';
adList[3345] = '\/hostkey-ad.';
adList[3346] = '\/house-ad.';
adList[3347] = '\/house_ad-';
adList[3348] = '\/house_ad_';
adList[3349] = '\/housead.';
adList[3350] = '\/housead_';
adList[3351] = '\/houseads.';
adList[3352] = '\/houseads?';
adList[3353] = '\/hoverad.';
adList[3354] = '\/ht.js?site_';
adList[3355] = '\/html\/ad.';
adList[3356] = '\/html\/ads_';
adList[3357] = '\/i_ads.';
adList[3358] = '\/iabadvertisingplugin.swf';
adList[3359] = '\/ibnjspopunder.';
adList[3360] = '\/icon_ad.';
adList[3361] = '\/icon_ads_';
adList[3362] = '\/icon_advertising_';
adList[3363] = '\/ifolder-ads.';
adList[3364] = '\/iframe-ad.';
adList[3365] = '\/iframe-ad?';
adList[3366] = '\/iframe-mgid-';
adList[3367] = '\/iframe\/ad_';
adList[3368] = '\/iframe_ad.';
adList[3369] = '\/iframe_ad?';
adList[3370] = '\/iframe_ad_';
adList[3371] = '\/iframe_ads_';
adList[3372] = '\/iframe_chitika_';
adList[3373] = '\/iframe_sponsor_';
adList[3374] = '\/iframead.';
adList[3375] = '\/iframead_';
adList[3376] = '\/iframeadcontent.';
adList[3377] = '\/iframeads.';
adList[3378] = '\/iframeadsense.';
adList[3379] = '\/iframeadsensewrapper.';
adList[3380] = '\/iframedartad.';
adList[3381] = '\/ignite.partnerembed.js';
adList[3382] = '\/ilivid-ad-';
adList[3383] = '\/im-ad\/im-rotator.';
adList[3384] = '\/im-ad\/im-rotator2.';
adList[3385] = '\/im.cams.';
adList[3386] = '\/ima\/ads_';
adList[3387] = '\/imaads.';
adList[3388] = '\/imads.js';
adList[3389] = '\/image\/ads_';
adList[3390] = '\/images-v2\/ad_';
adList[3391] = '\/images.ads.';
adList[3392] = '\/images\/ad-';
adList[3393] = '\/images\/ad.$domain=~ngohq.com';
adList[3394] = '\/images\/ads-';
adList[3395] = '\/images\/ads.';
adList[3396] = '\/images\/ads_';
adList[3397] = '\/images\/adv-';
adList[3398] = '\/images\/adv.';
adList[3399] = '\/images\/adv_';
adList[3400] = '\/images\/adver-';
adList[3401] = '\/images\/aff-';
adList[3402] = '\/images\/awebanner';
adList[3403] = '\/images\/gads_';
adList[3404] = '\/images\/sponsored.';
adList[3405] = '\/images\/vghd';
adList[3406] = '\/images1\/ad_';
adList[3407] = '\/imfloat.';
adList[3408] = '\/img-advert-';
adList[3409] = '\/img.ads.';
adList[3410] = '\/img\/_ad.';
adList[3411] = '\/img\/ad-';
adList[3412] = '\/img\/ad.';
adList[3413] = '\/img\/ad_';
adList[3414] = '\/img\/adv.';
adList[3415] = '\/img_ad_';
adList[3416] = '\/imgad.';
adList[3417] = '\/imgad?';
adList[3418] = '\/imgad_';
adList[3419] = '\/imgaditn.';
adList[3420] = '\/imlive.gif';
adList[3421] = '\/imlive300_';
adList[3422] = '\/imlive5.';
adList[3423] = '\/impop.';
adList[3424] = '\/inad.$domain=~inad.info';
adList[3425] = '\/inc\/ad-';
adList[3426] = '\/inc\/ad.';
adList[3427] = '\/inc_ad.';
adList[3428] = '\/inc_ad_';
adList[3429] = '\/inc_ads.';
adList[3430] = '\/inc_v2\/ad_';
adList[3431] = '\/include\/ad_';
adList[3432] = '\/include\/adsdaq';
adList[3433] = '\/includes\/ad.';
adList[3434] = '\/includes\/ad_';
adList[3435] = '\/includes\/ads_';
adList[3436] = '\/incmpuad.';
adList[3437] = '\/index-ad-';
adList[3438] = '\/index-ad.';
adList[3439] = '\/index_ads.';
adList[3440] = '\/indexmobilead2.';
adList[3441] = '\/initdefineads.';
adList[3442] = '\/initlayeredwelcomead-';
adList[3443] = '\/injectad.';
adList[3444] = '\/injspopunder.';
adList[3445] = '\/inline_ad.';
adList[3446] = '\/inline_ad_';
adList[3447] = '\/inline_ads.';
adList[3448] = '\/inlinetextads?';
adList[3449] = '\/inner-ads-';
adList[3450] = '\/innerads.';
adList[3451] = '\/inpost-ad^';
adList[3452] = '\/inserta.d.js';
adList[3453] = '\/insertad.';
adList[3454] = '\/insertads.';
adList[3455] = '\/intelliad.';
adList[3456] = '\/intellitext.';
adList[3457] = '\/interad.';
adList[3458] = '\/intermediate-ad-';
adList[3459] = '\/internads.';
adList[3460] = '\/internal-ad-';
adList[3461] = '\/internet_ad_';
adList[3462] = '\/interstital-redirector.';
adList[3463] = '\/interstitial-ad.';
adList[3464] = '\/interstitial-ad?';
adList[3465] = '\/interstitial_ad.';
adList[3466] = '\/intextads.';
adList[3467] = '\/introduction_ad.';
adList[3468] = '\/invideoad.';
adList[3469] = '\/inx-ad.';
adList[3470] = '\/ipadad.';
adList[3471] = '\/iqadcontroller.';
adList[3472] = '\/irc_ad_';
adList[3473] = '\/iserver\/ccid=';
adList[3474] = '\/iserver\/site=';
adList[3475] = '\/iwadsense.';
adList[3476] = '\/j\/ads.js';
adList[3477] = '\/jamnboad.';
adList[3478] = '\/javascript\/ads.';
adList[3479] = '\/javascript\/oas.';
adList[3480] = '\/javascript\/oas?';
adList[3481] = '\/javascripts\/ads.';
adList[3482] = '\/jcorner.php?partner=';
adList[3483] = '\/jitads.';
adList[3484] = '\/jivoxadplayer.';
adList[3485] = '\/jplayeradfoxadvertisementplugin.';
adList[3486] = '\/jqads.';
adList[3487] = '\/jquery-ads.';
adList[3488] = '\/jquery.ad.';
adList[3489] = '\/jquery.adx.';
adList[3490] = '\/jquery\/ad.';
adList[3491] = '\/jqueryadvertising.';
adList[3492] = '\/js.ad\/size=';
adList[3493] = '\/js.ng\/cat=';
adList[3494] = '\/js.ng\/channel_';
adList[3495] = '\/js.ng\/pagepos=';
adList[3496] = '\/js.ng\/site=';
adList[3497] = '\/js.ng\/size=';
adList[3498] = '\/js\/ads-';
adList[3499] = '\/js\/ads.';
adList[3500] = '\/js\/ads_';
adList[3501] = '\/js\/adv.';
adList[3502] = '\/js\/oas-';
adList[3503] = '\/js\/oas.';
adList[3504] = '\/js\/ppu.$script';
adList[3505] = '\/js\/youmuffpu.js';
adList[3506] = '\/js2.ad\/size=';
adList[3507] = '\/js_ad_utf8.';
adList[3508] = '\/js_ads_';
adList[3509] = '\/js_adv_';
adList[3510] = '\/jsad.php';
adList[3511] = '\/jsads-';
adList[3512] = '\/jsc\/ads.';
adList[3513] = '\/jsplayerads-';
adList[3514] = '\/jspopunder.';
adList[3515] = '\/jstextad.';
adList[3516] = '\/jsvideopopad.';
adList[3517] = '\/juicyads_';
adList[3518] = '\/jumpstartunpaidad.';
adList[3519] = '\/kaksvpopup.';
adList[3520] = '\/kalahariads.';
adList[3521] = '\/kampyle.js';
adList[3522] = '\/kantarmedia.';
adList[3523] = '\/keyade.js';
adList[3524] = '\/keyword_ad.';
adList[3525] = '\/kogeepopupad.';
adList[3526] = '\/kredit-ad.';
adList[3527] = '\/kskads.';
adList[3528] = '\/layad.';
adList[3529] = '\/layer-ad.';
adList[3530] = '\/layer-ads.';
adList[3531] = '\/layer-advert-';
adList[3532] = '\/layer.php?bid=';
adList[3533] = '\/layer\/ad.';
adList[3534] = '\/layer\/ads.';
adList[3535] = '\/layer160x600.';
adList[3536] = '\/layer_ad?';
adList[3537] = '\/layerad-';
adList[3538] = '\/layerad.';
adList[3539] = '\/layerad^';
adList[3540] = '\/layerads-';
adList[3541] = '\/layerads.';
adList[3542] = '\/layerads_';
adList[3543] = '\/layout.inc.php?img';
adList[3544] = '\/layout\/ad.';
adList[3545] = '\/lazy-ads-';
adList[3546] = '\/lazyad.';
adList[3547] = '\/lbl_ad.';
adList[3548] = '\/leader_ad.';
adList[3549] = '\/leaderad.';
adList[3550] = '\/leaderboard-advert.';
adList[3551] = '\/leaderboardad.';
adList[3552] = '\/leaderboardadblock.';
adList[3553] = '\/leaderboardads.';
adList[3554] = '\/ledad.';
adList[3555] = '\/left-ads.';
adList[3556] = '\/left_ad_';
adList[3557] = '\/left_ads.';
adList[3558] = '\/leftad.';
adList[3559] = '\/leftad_';
adList[3560] = '\/leftads.';
adList[3561] = '\/leftsidebarads.';
adList[3562] = '\/lg.php?adid=';
adList[3563] = '\/lib\/ad.js';
adList[3564] = '\/lifelockad.';
adList[3565] = '\/lightad.';
adList[3566] = '\/lightboxad^';
adList[3567] = '\/lightboxbannerad^';
adList[3568] = '\/lijit-ad-';
adList[3569] = '\/lijitads.';
adList[3570] = '\/linkad2.';
adList[3571] = '\/linkads.';
adList[3572] = '\/linkadv.';
adList[3573] = '\/linkadv_';
adList[3574] = '\/links_sponsored_';
adList[3575] = '\/live\/ads_';
adList[3576] = '\/live_ad.';
adList[3577] = '\/livead-';
adList[3578] = '\/liveads.';
adList[3579] = '\/livejasmin.';
adList[3580] = '\/livejasmin2.';
adList[3581] = '\/livejasmin_';
adList[3582] = '\/livejasmine03.';
adList[3583] = '\/livejasmine05.';
adList[3584] = '\/load-ads|';
adList[3585] = '\/load_ad?';
adList[3586] = '\/loadad.aspx?';
adList[3587] = '\/loadads.';
adList[3588] = '\/loadadsmain.';
adList[3589] = '\/loadadsmainparam.';
adList[3590] = '\/loadadsparam.';
adList[3591] = '\/loadadwiz.';
adList[3592] = '\/loading_ads.';
adList[3593] = '\/local_ads_';
adList[3594] = '\/localad_';
adList[3595] = '\/localads.';
adList[3596] = '\/localcom-ad-';
adList[3597] = '\/log_ad?';
adList[3598] = '\/log_ad_';
adList[3599] = '\/logad?';
adList[3600] = '\/logo-ads.';
adList[3601] = '\/logo\/ads_';
adList[3602] = '\/logoads.';
adList[3603] = '\/logoutad.';
adList[3604] = '\/lotto_ad_';
adList[3605] = '\/lrec_ad.';
adList[3606] = '\/m-ad.css?';
adList[3607] = '\/m0ar_ads.';
adList[3608] = '\/mac-ad?';
adList[3609] = '\/mad.aspx?';
adList[3610] = '\/mad_ad.';
adList[3611] = '\/magazine\/ads.';
adList[3612] = '\/main\/ad_';
adList[3613] = '\/main_ad.';
adList[3614] = '\/main_ad_';
adList[3615] = '\/mainad.';
adList[3616] = '\/mainpagepopupadv1.';
adList[3617] = '\/marginaleadservlet?';
adList[3618] = '\/marketing\/banners_';
adList[3619] = '\/markpop.js';
adList[3620] = '\/masonad.gif';
adList[3621] = '\/masterad.';
adList[3622] = '\/match_ads.';
adList[3623] = '\/maxadselect.';
adList[3624] = '\/maxi_ad.';
adList[3625] = '\/mbads?';
adList[3626] = '\/mbn_ad.';
adList[3627] = '\/mcad.php';
adList[3628] = '\/mdialogadmodule.';
adList[3629] = '\/megaad.';
adList[3630] = '\/meme_ad.';
adList[3631] = '\/metaad.';
adList[3632] = '\/metsbanner.';
adList[3633] = '\/mgid-ad-';
adList[3634] = '\/mgid-header.';
adList[3635] = '\/mgid.html';
adList[3636] = '\/microad.';
adList[3637] = '\/middle_adv_';
adList[3638] = '\/middleads.';
adList[3639] = '\/mini_ads.';
adList[3640] = '\/miniads?';
adList[3641] = '\/miniadvert.';
adList[3642] = '\/minify\/ads-';
adList[3643] = '\/misc\/ad-';
adList[3644] = '\/misc\/ads.';
adList[3645] = '\/miva_ads.';
adList[3646] = '\/mjx-oas.';
adList[3647] = '\/mkadsrv.';
adList[3648] = '\/mktad.';
adList[3649] = '\/ml9pagepeel.';
adList[3650] = '\/mmsads.';
adList[3651] = '\/mmt_ad.';
adList[3652] = '\/mnads1.';
adList[3653] = '\/mobile-ad.';
adList[3654] = '\/mobile_ad.';
adList[3655] = '\/mobileads.';
adList[3656] = '\/modalad.';
adList[3657] = '\/modules\/ad_';
adList[3658] = '\/modules_ads.';
adList[3659] = '\/momsads.';
adList[3660] = '\/mpu-dm.htm';
adList[3661] = '\/mpuad.';
adList[3662] = '\/mpuguardian.';
adList[3663] = '\/mpumessage.';
adList[3664] = '\/mrskinleftside.';
adList[3665] = '\/msgads.';
adList[3666] = '\/msn-1.js';
adList[3667] = '\/msn-exo-';
adList[3668] = '\/msnadimg.';
adList[3669] = '\/msnads1.';
adList[3670] = '\/msnpop.';
adList[3671] = '\/msnpopsingle2.';
adList[3672] = '\/msnpopup.';
adList[3673] = '\/msnpopup4.';
adList[3674] = '\/mstextad?';
adList[3675] = '\/mta-ad-';
adList[3676] = '\/mtvi_ads_';
adList[3677] = '\/my-ad-integration.';
adList[3678] = '\/mydirtyhobby.$domain=~mydirtyhobby.com|~mydirtyhobby.de';
adList[3679] = '\/myfreepaysitebanner.';
adList[3680] = '\/n\/adv_';
adList[3681] = '\/n4403ad.';
adList[3682] = '\/namediaad.';
adList[3683] = '\/nativead.';
adList[3684] = '\/nativeadmanager.';
adList[3685] = '\/nativeads-';
adList[3686] = '\/nbcuadops-';
adList[3687] = '\/nd_affiliate.';
adList[3688] = '\/neoads.';
adList[3689] = '\/netads.';
adList[3690] = '\/netseerads.';
adList[3691] = '\/netspiderads2.';
adList[3692] = '\/netspiderads3.';
adList[3693] = '\/network_ad.';
adList[3694] = '\/neudesicad.';
adList[3695] = '\/new_oas.';
adList[3696] = '\/newad.';
adList[3697] = '\/newad2?';
adList[3698] = '\/newad?';
adList[3699] = '\/newads.';
adList[3700] = '\/newaff\/float';
adList[3701] = '\/newimplugs.';
adList[3702] = '\/newrightcolad.';
adList[3703] = '\/news_ad.';
adList[3704] = '\/newsmaxadcontrol.';
adList[3705] = '\/newtopmsgad.';
adList[3706] = '\/nflads.';
adList[3707] = '\/no_ads.';
adList[3708] = '\/noodleadframed.';
adList[3709] = '\/noticead.';
adList[3710] = '\/nuggad.';
adList[3711] = '\/nymag_ads.';
adList[3712] = '\/nymag_ads_';
adList[3713] = '\/o2ad.';
adList[3714] = '\/o2contentad.';
adList[3715] = '\/oas-config.';
adList[3716] = '\/oas.aspx';
adList[3717] = '\/oas.js';
adList[3718] = '\/oas\/iframe.';
adList[3719] = '\/oas\/oas-';
adList[3720] = '\/oas\/show?';
adList[3721] = '\/oas_ad.';
adList[3722] = '\/oas_ad_';
adList[3723] = '\/oas_ads.';
adList[3724] = '\/oas_handler.';
adList[3725] = '\/oas_home_';
adList[3726] = '\/oas_mjx.';
adList[3727] = '\/oas_mjx1.';
adList[3728] = '\/oas_mjx2.';
adList[3729] = '\/oas_mjx3.';
adList[3730] = '\/oasadconnector.';
adList[3731] = '\/oasadframe.';
adList[3732] = '\/oasadfunction.';
adList[3733] = '\/oasadfunctionlive.';
adList[3734] = '\/oasbanner_';
adList[3735] = '\/oascentral.$~object-subrequest';
adList[3736] = '\/oascontroller.';
adList[3737] = '\/oasisi-';
adList[3738] = '\/oasisi.';
adList[3739] = '\/old\/ads-';
adList[3740] = '\/omb-ad-';
adList[3741] = '\/ome.ads.';
adList[3742] = '\/onead.';
adList[3743] = '\/onead_';
adList[3744] = '\/onecam4ads.';
adList[3745] = '\/onesheet-ad-';
adList[3746] = '\/onplayerad.';
adList[3747] = '\/ontopadvertising.';
adList[3748] = '\/openad.';
adList[3749] = '\/openads-';
adList[3750] = '\/openads.';
adList[3751] = '\/openads_';
adList[3752] = '\/openx-';
adList[3753] = '\/openx.';
adList[3754] = '\/openx_';
adList[3755] = '\/openxtag.';
adList[3756] = '\/optonlineadcode.';
adList[3757] = '\/opxads.';
adList[3758] = '\/orbitads.';
adList[3759] = '\/origin-ad-';
adList[3760] = '\/outbrain-min.';
adList[3761] = '\/overlay-ad.';
adList[3762] = '\/overlay_ad_';
adList[3763] = '\/overlayad.';
adList[3764] = '\/overlayads.';
adList[3765] = '\/overture.$script,stylesheet';
adList[3766] = '\/overture_';
adList[3767] = '\/ovt_show.asp?';
adList[3768] = '\/p2-header-ad-';
adList[3769] = '\/p8network.js';
adList[3770] = '\/page-ads.';
adList[3771] = '\/page-peel';
adList[3772] = '\/pagead\/ads?';
adList[3773] = '\/pagead\/conversion.';
adList[3774] = '\/pagead\/gen_';
adList[3775] = '\/pagead\/lvz?';
adList[3776] = '\/pagead\/osd.';
adList[3777] = '\/pagead2.';
adList[3778] = '\/pagead46.';
adList[3779] = '\/pagead?';
adList[3780] = '\/pagecall_dfp_async.';
adList[3781] = '\/pageear.';
adList[3782] = '\/pageear_';
adList[3783] = '\/pagepeel-';
adList[3784] = '\/pagepeel.';
adList[3785] = '\/pagepeel_';
adList[3786] = '\/pagepeelads.';
adList[3787] = '\/pages\/ads';
adList[3788] = '\/panelad.';
adList[3789] = '\/park_html_functions.js';
adList[3790] = '\/park_html_functions_general.js';
adList[3791] = '\/parking_caf_';
adList[3792] = '\/partner-ad-';
adList[3793] = '\/partner_ads_';
adList[3794] = '\/partnerad.';
adList[3795] = '\/partnerads_';
adList[3796] = '\/partneradwidget.';
adList[3797] = '\/partnerbanner.';
adList[3798] = '\/partners\/ad-';
adList[3799] = '\/partners\/get-banner.';
adList[3800] = '\/pauseadextension.';
adList[3801] = '\/payperpost.';
adList[3802] = '\/pc\/ads.';
adList[3803] = '\/pcad.js?';
adList[3804] = '\/peel.js';
adList[3805] = '\/peel.php?';
adList[3806] = '\/peel\/?webscr=';
adList[3807] = '\/peel1.js';
adList[3808] = '\/peelad.';
adList[3809] = '\/peelbackscript\/ad_';
adList[3810] = '\/peeljs.php';
adList[3811] = '\/peeltl.';
adList[3812] = '\/peeltr.';
adList[3813] = '\/pencilad.';
adList[3814] = '\/perfads.';
adList[3815] = '\/pfpadv.';
adList[3816] = '\/pgad.';
adList[3817] = '\/pgrightsideads.';
adList[3818] = '\/photo728ad.';
adList[3819] = '\/photoad.';
adList[3820] = '\/photogallaryads.';
adList[3821] = '\/phpads.';
adList[3822] = '\/phpbanner\/banner_';
adList[3823] = '\/pilot_ad.';
adList[3824] = '\/pitattoad.';
adList[3825] = '\/placead_';
adList[3826] = '\/placeholder-ad-';
adList[3827] = '\/placements\/ad_';
adList[3828] = '\/player\/ads.';
adList[3829] = '\/players\/ads.';
adList[3830] = '\/pledgead.';
adList[3831] = '\/plugins\/ad.';
adList[3832] = '\/plugins\/ads-';
adList[3833] = '\/plugins\/page-cornr-';
adList[3834] = '\/plugins_ads_';
adList[3835] = '\/plus\/ad_';
adList[3836] = '\/poker-ad.';
adList[3837] = '\/poll-ad-';
adList[3838] = '\/polopoly_fs\/ad-';
adList[3839] = '\/pool.ads.';
adList[3840] = '\/pop-under.';
adList[3841] = '\/pop.js|';
adList[3842] = '\/pop2.js|';
adList[3843] = '\/pop?tid=';
adList[3844] = '\/pop_ad.';
adList[3845] = '\/pop_adfy.';
adList[3846] = '\/pop_camgirlcity.';
adList[3847] = '\/pop_under.';
adList[3848] = '\/popad-';
adList[3849] = '\/popad.';
adList[3850] = '\/popads.';
adList[3851] = '\/popads_';
adList[3852] = '\/popadscpm.';
adList[3853] = '\/poplivejasmine.';
adList[3854] = '\/popounder4.';
adList[3855] = '\/poprotator.';
adList[3856] = '\/popshow.$~stylesheet';
adList[3857] = '\/popu.js';
adList[3858] = '\/popunder-';
adList[3859] = '\/popunder.';
adList[3860] = '\/popunder1.';
adList[3861] = '\/popunder1_';
adList[3862] = '\/popunder2.';
adList[3863] = '\/popunder4.';
adList[3864] = '\/popunder5.';
adList[3865] = '\/popunder7.';
adList[3866] = '\/popunder?';
adList[3867] = '\/popunder_';
adList[3868] = '\/popunderblogs.';
adList[3869] = '\/popundercode.';
adList[3870] = '\/popunderking.';
adList[3871] = '\/popunders.';
adList[3872] = '\/popundr.';
adList[3873] = '\/popundr_';
adList[3874] = '\/popup2.js';
adList[3875] = '\/popup3.js';
adList[3876] = '\/popup_ad.';
adList[3877] = '\/popup_code.';
adList[3878] = '\/popupads.';
adList[3879] = '\/popupdfp.';
adList[3880] = '\/popupunder.';
adList[3881] = '\/post-ad-';
adList[3882] = '\/post_ads_';
adList[3883] = '\/postad.';
adList[3884] = '\/postprocad.';
adList[3885] = '\/postprofilehorizontalad.';
adList[3886] = '\/postprofileverticalad.';
adList[3887] = '\/posts_ad.';
adList[3888] = '\/pounder-$~image';
adList[3889] = '\/ppd_ads.';
adList[3890] = '\/ppd_ads_';
adList[3891] = '\/predictad.';
adList[3892] = '\/premium_ad.';
adList[3893] = '\/premiumadzone.';
adList[3894] = '\/prerollad.';
adList[3895] = '\/prerollads.';
adList[3896] = '\/printad.';
adList[3897] = '\/prnad300x150.';
adList[3898] = '\/proadvertising.';
adList[3899] = '\/proadvertising_';
adList[3900] = '\/processad.';
adList[3901] = '\/processads.';
adList[3902] = '\/processing\/impressions.asp?';
adList[3903] = '\/projectwonderful_';
adList[3904] = '\/promo\/ad_';
adList[3905] = '\/promo\/affiframe.';
adList[3906] = '\/promo300by250.';
adList[3907] = '\/promo300x250.';
adList[3908] = '\/promoad.';
adList[3909] = '\/promobuttonad.';
adList[3910] = '\/promoloaddisplay?';
adList[3911] = '\/promotions\/ads.';
adList[3912] = '\/promotions\/ads?';
adList[3913] = '\/promotools.';
adList[3914] = '\/promotools1.';
adList[3915] = '\/provideadcode.';
adList[3916] = '\/proxxorad.';
adList[3917] = '\/proxyadcall?';
adList[3918] = '\/pubad.';
adList[3919] = '\/pubads.';
adList[3920] = '\/pubads_';
adList[3921] = '\/public\/ad?';
adList[3922] = '\/publicidad.$~object-subrequest,~stylesheet';
adList[3923] = '\/publicidad_$~stylesheet';
adList[3924] = '\/publicidade.';
adList[3925] = '\/pubmatic_';
adList[3926] = '\/pubs_aff.asp?';
adList[3927] = '\/puff_ad?';
adList[3928] = '\/pullads.';
adList[3929] = '\/punder.js';
adList[3930] = '\/punder.php';
adList[3931] = '\/purch-ad-';
adList[3932] = '\/pushdownad.';
adList[3933] = '\/putl.php?';
adList[3934] = '\/pvbuttonad.';
adList[3935] = '\/qpon_big_ad';
adList[3936] = '\/quadadvert.';
adList[3937] = '\/quigo_ad';
adList[3938] = '\/radioadembed.';
adList[3939] = '\/radioadembedgenre.';
adList[3940] = '\/radioadembedgpt.';
adList[3941] = '\/radopenx?';
adList[3942] = '\/rail_ad_';
adList[3943] = '\/railad.';
adList[3944] = '\/railads.';
adList[3945] = '\/railsad.';
adList[3946] = '\/railsad_';
adList[3947] = '\/randomad.';
adList[3948] = '\/randomad120x600nsfw.';
adList[3949] = '\/randomad160x600nsfw.';
adList[3950] = '\/randomad2.';
adList[3951] = '\/randomad300x250nsfw.';
adList[3952] = '\/randomad728x90nsfw.';
adList[3953] = '\/randomad_';
adList[3954] = '\/randomads.';
adList[3955] = '\/rawtubelivead.';
adList[3956] = '\/rcolads1.';
adList[3957] = '\/rcolads2.';
adList[3958] = '\/rcom-ads-';
adList[3959] = '\/rcom-ads.';
adList[3960] = '\/rcom-video-ads.';
adList[3961] = '\/realmedia_banner.';
adList[3962] = '\/realmedia_banner_';
adList[3963] = '\/realmedia_mjx.';
adList[3964] = '\/realmedia_mjx_';
adList[3965] = '\/recommendations\/ad.';
adList[3966] = '\/recordadsall.';
adList[3967] = '\/rect_ad.';
adList[3968] = '\/rectangle_ad.';
adList[3969] = '\/rectangle_advertorials_';
adList[3970] = '\/redirect_awe.';
adList[3971] = '\/refreshads-';
adList[3972] = '\/refreshsyncbannerad?';
adList[3973] = '\/refspldicadstopl.';
adList[3974] = '\/reklam-ads2.';
adList[3975] = '\/reklam.';
adList[3976] = '\/reklama.$~stylesheet';
adList[3977] = '\/reklama2.';
adList[3978] = '\/reklama5.';
adList[3979] = '\/related-ads.';
adList[3980] = '\/relatedads.';
adList[3981] = '\/relevance_ad.';
adList[3982] = '\/remove-ads.';
adList[3983] = '\/remove_ads.';
adList[3984] = '\/renderbanner.do?';
adList[3985] = '\/repeat_adv.';
adList[3986] = '\/reporo_';
adList[3987] = '\/report_ad.';
adList[3988] = '\/report_ad_';
adList[3989] = '\/requestadvertisement.';
adList[3990] = '\/requestmyspacead.';
adList[3991] = '\/resources\/ad.';
adList[3992] = '\/resources\/ads_';
adList[3993] = '\/responsive-ads.';
adList[3994] = '\/responsive_dfp.';
adList[3995] = '\/responsive_dfp_';
adList[3996] = '\/restorationad-';
adList[3997] = '\/retrad.';
adList[3998] = '\/retrieve-ad.';
adList[3999] = '\/revealaads.';
adList[4000] = '\/revealads.';
adList[4001] = '\/rg-erdr.php$xmlhttprequest';
adList[4002] = '\/rg-rlog.php$xmlhttprequest';
adList[4003] = '\/rgads.';
adList[4004] = '\/richoas.';
adList[4005] = '\/right-ad-';
adList[4006] = '\/right_ad.';
adList[4007] = '\/right_ad^';
adList[4008] = '\/right_ad_';
adList[4009] = '\/right_ads.';
adList[4010] = '\/rightad.';
adList[4011] = '\/rightads.$domain=~rightads.co.uk';
adList[4012] = '\/rightnavads.';
adList[4013] = '\/rightnavadsanswer.';
adList[4014] = '\/rightrailgoogleads.';
adList[4015] = '\/rightsideaddisplay.';
adList[4016] = '\/righttopads.';
adList[4017] = '\/rollad.';
adList[4018] = '\/rolloverbannerad.';
adList[4019] = '\/root_ad.';
adList[4020] = '\/rotateads.';
adList[4021] = '\/rotatedads1.';
adList[4022] = '\/rotatedads13.';
adList[4023] = '\/rotatedads2.';
adList[4024] = '\/rotating_banner.php';
adList[4025] = '\/rotatingad.';
adList[4026] = '\/rotatingpeels.';
adList[4027] = '\/rotatingtextad.';
adList[4028] = '\/rotation\/banner';
adList[4029] = '\/rotationad.';
adList[4030] = '\/rotatorad300x250.';
adList[4031] = '\/rotatoradbottom.';
adList[4032] = '\/roturl.js';
adList[4033] = '\/rpgetad.';
adList[4034] = '\/rsads.js';
adList[4035] = '\/rsc_ad_';
adList[4036] = '\/rtb\/worker.php?';
adList[4037] = '\/sailthru.js';
adList[4038] = '\/samplead1.';
adList[4039] = '\/samsung_ad.';
adList[4040] = '\/satnetads.';
adList[4041] = '\/satnetgoogleads.';
adList[4042] = '\/savvyads.';
adList[4043] = '\/sb-relevance.js';
adList[4044] = '\/scanscout.';
adList[4045] = '\/scanscoutoverlayadrenderer.';
adList[4046] = '\/scanscoutplugin.';
adList[4047] = '\/scaradcontrol.';
adList[4048] = '\/scn.php?';
adList[4049] = '\/script-adv-';
adList[4050] = '\/script\/ad.';
adList[4051] = '\/script\/ads.';
adList[4052] = '\/script\/ads_';
adList[4053] = '\/scripts\/ad-';
adList[4054] = '\/scripts\/ad.';
adList[4055] = '\/scripts\/ad_';
adList[4056] = '\/scripts\/ads.';
adList[4057] = '\/scripts\/adservice_';
adList[4058] = '\/scripts\/adv.';
adList[4059] = '\/scripts\/zanox-';
adList[4060] = '\/scrpads.';
adList[4061] = '\/search-ads?';
adList[4062] = '\/search\/ads?';
adList[4063] = '\/search\/ads_';
adList[4064] = '\/search_ads.';
adList[4065] = '\/searchad.';
adList[4066] = '\/searchad_';
adList[4067] = '\/searchadsiframe.';
adList[4068] = '\/secondads.';
adList[4069] = '\/secondads_';
adList[4070] = '\/secretmedia-sdk-';
adList[4071] = '\/securepubads.';
adList[4072] = '\/seo-ads.';
adList[4073] = '\/serv.ads.';
adList[4074] = '\/serve.ads.';
adList[4075] = '\/servead.';
adList[4076] = '\/servead?';
adList[4077] = '\/serveads.';
adList[4078] = '\/settings\/ad.';
adList[4079] = '\/sevenads.';
adList[4080] = '\/sevenl_ad.';
adList[4081] = '\/shared\/ad_';
adList[4082] = '\/shared\/ads.';
adList[4083] = '\/show-ad.';
adList[4084] = '\/show-ads.';
adList[4085] = '\/show.ad?';
adList[4086] = '\/show.cgi?adp';
adList[4087] = '\/show_ad.';
adList[4088] = '\/show_ad?';
adList[4089] = '\/show_ad_';
adList[4090] = '\/show_ads.js';
adList[4091] = '\/show_ads_';
adList[4092] = '\/showad.';
adList[4093] = '\/showad300-';
adList[4094] = '\/showad300.';
adList[4095] = '\/showad_';
adList[4096] = '\/showadcode.';
adList[4097] = '\/showadjs.';
adList[4098] = '\/showads.';
adList[4099] = '\/showads_';
adList[4100] = '\/showadvert.';
adList[4101] = '\/showadvertising.';
adList[4102] = '\/showban.asp?';
adList[4103] = '\/showbanner.';
adList[4104] = '\/showflashad.';
adList[4105] = '\/showindex-ad-';
adList[4106] = '\/showmarketingmaterial.';
adList[4107] = '\/showpost-ad-';
adList[4108] = '\/showsidebar-ad-';
adList[4109] = '\/showsp.php?';
adList[4110] = '\/side-ad-';
adList[4111] = '\/side-ad.';
adList[4112] = '\/side-ads-';
adList[4113] = '\/side_adverts.';
adList[4114] = '\/sidead.';
adList[4115] = '\/sidead1.';
adList[4116] = '\/sidead2.';
adList[4117] = '\/sidead3.';
adList[4118] = '\/sideadiframe.';
adList[4119] = '\/sideads|';
adList[4120] = '\/sideadvtmp.';
adList[4121] = '\/sidebar-ad-';
adList[4122] = '\/sidebar_ad.';
adList[4123] = '\/sidebar_ad_';
adList[4124] = '\/sidebaradvertisement.';
adList[4125] = '\/sidecol_ad.';
adList[4126] = '\/sidekickads.';
adList[4127] = '\/sidelinead.';
adList[4128] = '\/siframead.';
adList[4129] = '\/silverads.';
adList[4130] = '\/simad.min.js';
adList[4131] = '\/simpleadvert.';
adList[4132] = '\/singleadextension.';
adList[4133] = '\/sisterads.';
adList[4134] = '\/site-advert.';
adList[4135] = '\/site\/ads?';
adList[4136] = '\/site\/dfp-';
adList[4137] = '\/site_ads.';
adList[4138] = '\/site_under.';
adList[4139] = '\/siteads.';
adList[4140] = '\/siteadvert.';
adList[4141] = '\/siteafs.txt?';
adList[4142] = '\/siteimages\/ads-';
adList[4143] = '\/sites\/ad_';
adList[4144] = '\/skin_ad-';
adList[4145] = '\/skinad.';
adList[4146] = '\/skins\/ads-';
adList[4147] = '\/skyad.';
adList[4148] = '\/skyad_';
adList[4149] = '\/skyadright.';
adList[4150] = '\/skybannerview.';
adList[4151] = '\/skybar_ad.';
adList[4152] = '\/skyframeopenads.';
adList[4153] = '\/skyframeopenads_';
adList[4154] = '\/skyscraper-ad.';
adList[4155] = '\/skyscraper_ad_';
adList[4156] = '\/skyscraperad.';
adList[4157] = '\/slafc.js';
adList[4158] = '\/slide_in_ads_';
adList[4159] = '\/slideinad.';
adList[4160] = '\/slider-ad-';
adList[4161] = '\/slider.ad.';
adList[4162] = '\/slider_ad.';
adList[4163] = '\/sliderad3.';
adList[4164] = '\/sliderjobadlist.';
adList[4165] = '\/slideshow\/ads.';
adList[4166] = '\/slideshowintad?';
adList[4167] = '\/slidetopad.';
adList[4168] = '\/smalads.';
adList[4169] = '\/small_ad.';
adList[4170] = '\/small_ad_';
adList[4171] = '\/smallad-';
adList[4172] = '\/smalladblockbg-';
adList[4173] = '\/smalltopl.';
adList[4174] = '\/smart-ad-server.';
adList[4175] = '\/smartad-';
adList[4176] = '\/smartad.';
adList[4177] = '\/smartad?';
adList[4178] = '\/smartads.';
adList[4179] = '\/smartadserver.$domain=~smartadserver.com|~smartadserver.com.br|~smartadserver.de|~smartadserver.es|~smartadserver.fr|~smartadserver.it|~smartadserver.pl|~smartadserver.ru';
adList[4180] = '\/smartlinks.epl?';
adList[4181] = '\/smpads.';
adList[4182] = '\/socialads.$domain=~socialads.eu';
adList[4183] = '\/somaadscaleskyscraperscript.';
adList[4184] = '\/some-ad.';
adList[4185] = '\/someads.';
adList[4186] = '\/spac_adx.';
adList[4187] = '\/space_ad.';
adList[4188] = '\/spacedesc=';
adList[4189] = '\/spark_ad.';
adList[4190] = '\/spc.php';
adList[4191] = '\/spc_fi.php';
adList[4192] = '\/spcjs.php';
adList[4193] = '\/spcjs_min.';
adList[4194] = '\/special_ad.';
adList[4195] = '\/splash_ads_';
adList[4196] = '\/splashad_';
adList[4197] = '\/spo_show.asp?';
adList[4198] = '\/sponlink.';
adList[4199] = '\/spons_links_';
adList[4200] = '\/sponser.';
adList[4201] = '\/sponseredlinksros.';
adList[4202] = '\/sponsers.cgi';
adList[4203] = '\/sponslink_';
adList[4204] = '\/sponsor-ad';
adList[4205] = '\/sponsor-banner.';
adList[4206] = '\/sponsor-box?';
adList[4207] = '\/sponsor-links.';
adList[4208] = '\/sponsor\/click.';
adList[4209] = '\/sponsor_ads.';
adList[4210] = '\/sponsor_select.';
adList[4211] = '\/sponsorad.';
adList[4212] = '\/sponsorad2.';
adList[4213] = '\/sponsorads.';
adList[4214] = '\/sponsored-banner-';
adList[4215] = '\/sponsored-links-';
adList[4216] = '\/sponsored_ad.';
adList[4217] = '\/sponsored_ad_';
adList[4218] = '\/sponsored_by.';
adList[4219] = '\/sponsored_link.';
adList[4220] = '\/sponsored_links.';
adList[4221] = '\/sponsored_links1.';
adList[4222] = '\/sponsored_links_';
adList[4223] = '\/sponsored_listings.';
adList[4224] = '\/sponsored_text.';
adList[4225] = '\/sponsored_title.';
adList[4226] = '\/sponsored_top.';
adList[4227] = '\/sponsoredcontent.';
adList[4228] = '\/sponsoredheadline.';
adList[4229] = '\/sponsoredlinks.';
adList[4230] = '\/sponsoredlinks?';
adList[4231] = '\/sponsoredlinksiframe.';
adList[4232] = '\/sponsoredlisting.';
adList[4233] = '\/sponsorheaderderiv_';
adList[4234] = '\/sponsorpaynetwork.';
adList[4235] = '\/sponsors.js?';
adList[4236] = '\/sponsors\/amg.php?';
adList[4237] = '\/sponsors_box.';
adList[4238] = '\/sponsorsgif.';
adList[4239] = '\/sponsorshipimage-';
adList[4240] = '\/spotx_adapter.';
adList[4241] = '\/spotxchangeplugin.';
adList[4242] = '\/spotxchangevpaid.';
adList[4243] = '\/square-ad.';
adList[4244] = '\/squaread.';
adList[4245] = '\/squareads.';
adList[4246] = '\/sr.ads.';
adList[4247] = '\/src\/ads_';
adList[4248] = '\/srec_ad_';
adList[4249] = '\/ssc_ad.';
adList[4250] = '\/standard_ads.';
adList[4251] = '\/static-ad-';
adList[4252] = '\/static.ad.';
adList[4253] = '\/static\/ad-';
adList[4254] = '\/static\/ad_';
adList[4255] = '\/static\/js\/4728ba74bc.js$~third-party';
adList[4256] = '\/staticadslot.';
adList[4257] = '\/stats\/?t_sid=';
adList[4258] = '\/sticker_ad.';
adList[4259] = '\/sticky_ad.';
adList[4260] = '\/stickyad.';
adList[4261] = '\/stickyad2.';
adList[4262] = '\/story_ad.';
adList[4263] = '\/story_ads_';
adList[4264] = '\/storyadcode.';
adList[4265] = '\/storyads.';
adList[4266] = '\/stream-ad.';
adList[4267] = '\/streamads.';
adList[4268] = '\/streamatepop.';
adList[4269] = '\/stuff\/ad-';
adList[4270] = '\/style_ad.';
adList[4271] = '\/styleads2.';
adList[4272] = '\/styles\/ads.';
adList[4273] = '\/subad.';
adList[4274] = '\/subad2_';
adList[4275] = '\/subadz.';
adList[4276] = '\/sugar-ads.';
adList[4277] = '\/sugarads-';
adList[4278] = '\/superads_';
adList[4279] = '\/supernorthroomad.';
adList[4280] = '\/swf\/ad-';
adList[4281] = '\/swfbin\/ad-';
adList[4282] = '\/swfbin\/ad3-';
adList[4283] = '\/swfbin\/ad3_';
adList[4284] = '\/switchadbanner.';
adList[4285] = '\/swmadplayer.';
adList[4286] = '\/syads.';
adList[4287] = '\/synad2.';
adList[4288] = '\/synad3.';
adList[4289] = '\/syndication\/ad.';
adList[4290] = '\/system_ad.';
adList[4291] = '\/systemad.';
adList[4292] = '\/systemad_';
adList[4293] = '\/t-ads.';
adList[4294] = '\/tableadnorth.';
adList[4295] = '\/tabunder\/pop.';
adList[4296] = '\/tag-adv.';
adList[4297] = '\/tag_oas.';
adList[4298] = '\/tag_sys.';
adList[4299] = '\/tagadv_';
adList[4300] = '\/taxonomy-ads.';
adList[4301] = '\/td-ads-';
adList[4302] = '\/teamplayer-ads.';
adList[4303] = '\/technomedia.';
adList[4304] = '\/teletoon_ad.';
adList[4305] = '\/template\/ad.';
adList[4306] = '\/templates\/ad.';
adList[4307] = '\/templates\/adv_';
adList[4308] = '\/testingad.';
adList[4309] = '\/text_ad.';
adList[4310] = '\/text_ad_';
adList[4311] = '\/text_ads.';
adList[4312] = '\/text_ads_';
adList[4313] = '\/textad.';
adList[4314] = '\/textad1.';
adList[4315] = '\/textad?';
adList[4316] = '\/textad_';
adList[4317] = '\/textadrotate.';
adList[4318] = '\/textads-';
adList[4319] = '\/textads.';
adList[4320] = '\/textads_';
adList[4321] = '\/textadspromo_';
adList[4322] = '\/tfs-ad.';
adList[4323] = '\/tg.php?uid=';
adList[4324] = '\/thdgoogleadsense.';
adList[4325] = '\/thunder\/ad.';
adList[4326] = '\/ticker_ad.';
adList[4327] = '\/tickeradsget.';
adList[4328] = '\/tidaladplugin.';
adList[4329] = '\/tii_ads.';
adList[4330] = '\/tikilink?';
adList[4331] = '\/tinlads.';
adList[4332] = '\/tinyad.';
adList[4333] = '\/tit-ads.';
adList[4334] = '\/title_ad.';
adList[4335] = '\/tizers.php?';
adList[4336] = '\/tl.ads-';
adList[4337] = '\/tmnadsense-';
adList[4338] = '\/tmnadsense.';
adList[4339] = '\/tmobilead.';
adList[4340] = '\/toggleads.';
adList[4341] = '\/toigoogleads.';
adList[4342] = '\/toigoogleleads_';
adList[4343] = '\/tomorrowfocusad.';
adList[4344] = '\/toolkitads.';
adList[4345] = '\/tools\/ad.';
adList[4346] = '\/toonad.';
adList[4347] = '\/top-ad-';
adList[4348] = '\/top-ad.';
adList[4349] = '\/top-ad_';
adList[4350] = '\/top-ads.';
adList[4351] = '\/top_ad.';
adList[4352] = '\/top_ad_';
adList[4353] = '\/top_ads.';
adList[4354] = '\/top_ads_';
adList[4355] = '\/top_adv_';
adList[4356] = '\/topad.';
adList[4357] = '\/topad3.';
adList[4358] = '\/topad_';
adList[4359] = '\/topadbg.';
adList[4360] = '\/topadfooter.';
adList[4361] = '\/topadheader.';
adList[4362] = '\/topads.';
adList[4363] = '\/topads1.';
adList[4364] = '\/topads2.';
adList[4365] = '\/topads3.';
adList[4366] = '\/topads_';
adList[4367] = '\/topads|';
adList[4368] = '\/topadv.';
adList[4369] = '\/topadvert.';
adList[4370] = '\/topleftads.';
adList[4371] = '\/topperad.';
adList[4372] = '\/toprightads.';
adList[4373] = '\/tops.ads.';
adList[4374] = '\/torget_ads.';
adList[4375] = '\/totemcash1.';
adList[4376] = '\/tower_ad_';
adList[4377] = '\/track_ad_';
adList[4378] = '\/tracked_ad.';
adList[4379] = '\/trade_punder.';
adList[4380] = '\/tradead_';
adList[4381] = '\/tradedoubler.';
adList[4382] = '\/trafficadpdf02.';
adList[4383] = '\/trafficads.';
adList[4384] = '\/trafficengineads.';
adList[4385] = '\/trafficsynergysupportresponse_';
adList[4386] = '\/transad.';
adList[4387] = '\/tremoradrenderer.';
adList[4388] = '\/triadshow.';
adList[4389] = '\/tribalad.';
adList[4390] = '\/ttz_ad.';
adList[4391] = '\/turbo_ad.';
adList[4392] = '\/tvgdartads.';
adList[4393] = '\/twbadbanner.';
adList[4394] = '\/twgetad3.';
adList[4395] = '\/twtad_';
adList[4396] = '\/txt_ad.';
adList[4397] = '\/txt_ad_';
adList[4398] = '\/txt_adv.';
adList[4399] = '\/txtad.';
adList[4400] = '\/u-ads.';
adList[4401] = '\/u?pub=';
adList[4402] = '\/uberlayadrenderer.';
adList[4403] = '\/ucstat.';
adList[4404] = '\/ugoads.';
adList[4405] = '\/ugoads_inner.';
adList[4406] = '\/ui\/adv.';
adList[4407] = '\/ui\/adv_';
adList[4408] = '\/uk.ads.';
adList[4409] = '\/ukc-ad.';
adList[4410] = '\/unibluead.';
adList[4411] = '\/update_layer\/layer_os_new.php';
adList[4412] = '\/uploads\/adv_';
adList[4413] = '\/us-ads.';
adList[4414] = '\/usenext16.';
adList[4415] = '\/user\/ads?';
adList[4416] = '\/userad.$domain=~userad.info';
adList[4417] = '\/usernext.';
adList[4418] = '\/utep_ad.js';
adList[4419] = '\/valueclick-ad.';
adList[4420] = '\/valueclick.';
adList[4421] = '\/valueclickbanner.';
adList[4422] = '\/valueclickvert.';
adList[4423] = '\/vast_ads_';
adList[4424] = '\/vastadplugin.';
adList[4425] = '\/vastads.';
adList[4426] = '\/vbvua.js';
adList[4427] = '\/vclkads.';
adList[4428] = '\/vendor-ads-';
adList[4429] = '\/vericaladtitle.';
adList[4430] = '\/vert728ad.';
adList[4431] = '\/vert_ad.';
adList[4432] = '\/verticaladrotatorv2.';
adList[4433] = '\/vghd.gif';
adList[4434] = '\/vghd.swf';
adList[4435] = '\/vghd2.gif';
adList[4436] = '\/viagogoads.';
adList[4437] = '\/vice-ads.';
adList[4438] = '\/vidadv.';
adList[4439] = '\/video-ad-overlay.';
adList[4440] = '\/video-ads-management.';
adList[4441] = '\/video-ads-player.';
adList[4442] = '\/video.ads.';
adList[4443] = '\/video2adrenderer.';
adList[4444] = '\/video_ad.';
adList[4445] = '\/video_ad_';
adList[4446] = '\/video_ads.';
adList[4447] = '\/videoad.';
adList[4448] = '\/videoad_new.';
adList[4449] = '\/videoadcontent?';
adList[4450] = '\/videoadrenderer.';
adList[4451] = '\/videoads.';
adList[4452] = '\/videojs.ads.';
adList[4453] = '\/videostreaming_ads.';
adList[4454] = '\/videowall-ad.';
adList[4455] = '\/view_banner.';
adList[4456] = '\/viewad.';
adList[4457] = '\/viewad?';
adList[4458] = '\/viewbannerad.';
adList[4459] = '\/viewer\/rad?';
adList[4460] = '\/virtuagirl.';
adList[4461] = '\/virtuagirl3.';
adList[4462] = '\/virtuagirlhd.';
adList[4463] = '\/virtual_girl_';
adList[4464] = '\/virtualgirlhd-';
adList[4465] = '\/visitoursponsors.';
adList[4466] = '\/vnads.';
adList[4467] = '\/vpaidad3.';
adList[4468] = '\/vpaidadrenderer.';
adList[4469] = '\/vplayerad.';
adList[4470] = '\/vrdinterads-';
adList[4471] = '\/vtextads.';
adList[4472] = '\/vxlayerad-';
adList[4473] = '\/w\/d\/capu.php?z=$script,third-party';
adList[4474] = '\/wahoha.';
adList[4475] = '\/watchit_ad.';
adList[4476] = '\/wave-ad-';
adList[4477] = '\/web-ad_';
adList[4478] = '\/web-ads.';
adList[4479] = '\/webad.';
adList[4480] = '\/webad?';
adList[4481] = '\/webads.';
adList[4482] = '\/webads_';
adList[4483] = '\/webadserver.';
adList[4484] = '\/webadvert.';
adList[4485] = '\/webmailad.';
adList[4486] = '\/weborama.js';
adList[4487] = '\/weeklyadslabel.';
adList[4488] = '\/welcome_ad.';
adList[4489] = '\/welcomead.';
adList[4490] = '\/welcomeadredirect.';
adList[4491] = '\/widget-advert.';
adList[4492] = '\/widget\/ads.';
adList[4493] = '\/widgetad.';
adList[4494] = '\/widgetadsense.';
adList[4495] = '\/widgets\/ads.';
adList[4496] = '\/wix-ad.';
adList[4497] = '\/wmads.';
adList[4498] = '\/wp-content\/plugins\/bhcb\/lock.js';
adList[4499] = '\/wp_ad_250_';
adList[4500] = '\/wpads\/iframe.';
adList[4501] = '\/wpbanners_show.php';
adList[4502] = '\/wpproadds.';
adList[4503] = '\/wpproads.';
adList[4504] = '\/writelayerad.';
adList[4505] = '\/wwe_ads.';
adList[4506] = '\/x5advcorner.';
adList[4507] = '\/xads.php';
adList[4508] = '\/xadvertisement.';
adList[4509] = '\/xbanner.js';
adList[4510] = '\/xbanner.php?';
adList[4511] = '\/xclicks.';
adList[4512] = '\/xlayer\/layer.php?uid=$script';
adList[4513] = '\/xml\/ads_';
adList[4514] = '\/xmladparser.';
adList[4515] = '\/xnxx-ads.';
adList[4516] = '\/xpiads.';
adList[4517] = '\/xpopunder.';
adList[4518] = '\/xtendmedia.$domain=~xtendmedia.dk';
adList[4519] = '\/xwords.';
adList[4520] = '\/xxxmatch_';
adList[4521] = '\/yads-';
adList[4522] = '\/yads.';
adList[4523] = '\/yads_';
adList[4524] = '\/yahoo-ad-';
adList[4525] = '\/yahoo\/ads.';
adList[4526] = '\/yahoo_overture.';
adList[4527] = '\/yahooad_';
adList[4528] = '\/yahooads.';
adList[4529] = '\/yahooadsapi.';
adList[4530] = '\/yahooadsobject.';
adList[4531] = '\/yahoofeedproxy.';
adList[4532] = '\/yesbaby.';
adList[4533] = '\/yhs\/ads?';
adList[4534] = '\/yieldads.';
adList[4535] = '\/yieldlab.';
adList[4536] = '\/yieldmo-';
adList[4537] = '\/your-ad-';
adList[4538] = '\/your-ad.';
adList[4539] = '\/your_ad.';
adList[4540] = '\/yourad1.';
adList[4541] = '\/youradhere.';
adList[4542] = '\/youradhere468-';
adList[4543] = '\/youradhere_';
adList[4544] = '\/ysc_csc_news';
adList[4545] = '\/ysmads.';
adList[4546] = '\/ysmwrapper.js';
adList[4547] = '\/yume_ad_library_';
adList[4548] = '\/z-ads.';
adList[4549] = '\/zagcookie_';
adList[4550] = '\/zalando-ad-';
adList[4551] = '\/zaz-admanager.';
adList[4552] = '\/zedo_';
adList[4553] = ':\/\/a.ads.';
adList[4554] = ':\/\/adcl.$domain=~adcl.com';
adList[4555] = ':\/\/ads.$domain=~ads.msstate.edu|~ads.nc|~ads.route.cc|~ads.sk';
adList[4556] = ':\/\/adv.$domain=~adv.ru|~adv.vg|~advids.co|~farapp.com|~forex-tv-online.com|~r7.com|~typeform.com|~welaika.com';
adList[4557] = ':\/\/affiliate.$third-party';
adList[4558] = ':\/\/affiliates.$third-party';
adList[4559] = ':\/\/banner.$third-party';
adList[4560] = ':\/\/banners.$third-party';
adList[4561] = ':\/\/pop-over.';
adList[4562] = ':\/\/promo.$third-party';
adList[4563] = ':\/\/synad.';
adList[4564] = ':8080\/ads\/';
adList[4565] = ';adsense_';
adList[4566] = ';cue=pre;$object-subrequest';
adList[4567] = ';iframeid=ad_';
adList[4568] = '=ad-leaderboard-';
adList[4569] = '=ad-rectangle-';
adList[4570] = '=ad320x50-';
adList[4571] = '=ad_iframe&';
adList[4572] = '=adcenter&';
adList[4573] = '=adcode&';
adList[4574] = '=adexpert&';
adList[4575] = '=adlabs&';
adList[4576] = '=admeld&';
adList[4577] = '=admenu&';
adList[4578] = '=admodeliframe&';
adList[4579] = '=adscallback&';
adList[4580] = '=adscripts&';
adList[4581] = '=adshow&';
adList[4582] = '=adslot&';
adList[4583] = '=adspremiumplacement&';
adList[4584] = '=adunit&';
adList[4585] = '=advert\/';
adList[4586] = '=advertiser\/';
adList[4587] = '=advertorial&';
adList[4588] = '=adview&';
adList[4589] = '=banners_ad&';
adList[4590] = '=clkads\/';
adList[4591] = '=com_ads&';
adList[4592] = '=deliveradframe&';
adList[4593] = '=display_ad&';
adList[4594] = '=displayad&';
adList[4595] = '=displayads&';
adList[4596] = '=dynamicads&';
adList[4597] = '=dynamicwebad&';
adList[4598] = '=getsponsorads&';
adList[4599] = '=half-page-ad&';
adList[4600] = '=iframe_adv&';
adList[4601] = '=js_ads&';
adList[4602] = '=searchadslider|';
adList[4603] = '=showsearchgoogleads&';
adList[4604] = '=simpleads\/';
adList[4605] = '=textads&';
adList[4606] = '=web&ads=';
adList[4607] = '=webad2&';
adList[4608] = '?action=ads&';
adList[4609] = '?ad_ids=';
adList[4610] = '?ad_partner=';
adList[4611] = '?ad_size=';
adList[4612] = '?ad_tag=';
adList[4613] = 'ad_type=';
adList[4614] = '?ad_width=';
adList[4615] = '?adarea=';
adList[4616] = '?adclass=';
adList[4617] = '?adcontext=';
adList[4618] = '?adcount=';
adList[4619] = '?adflashid=';
adList[4620] = '?adformat=';
adList[4621] = '?adfox_';
adList[4622] = '?adloc=';
adList[4623] = '?adlocation=';
adList[4624] = '?adpage=';
adList[4625] = '?adpartner=';
adList[4626] = '?ads=';
adList[4627] = '?adsdata=';
adList[4628] = '?adsite=';
adList[4629] = '?adsize=';
adList[4630] = '?adslot=';
adList[4631] = '?adtag=';
adList[4632] = '?adtagurl=';
adList[4633] = '?adtarget=';
adList[4634] = '?adtechplacementid=';
adList[4635] = '?adtype=';
adList[4636] = '?adunit_id=';
adList[4637] = '?adunitid=';
adList[4638] = '?adunitname=';
adList[4639] = '?adv\/id=';
adList[4640] = '?adv_type=';
adList[4641] = '?adversion=';
adList[4642] = '?advert_key=';
adList[4643] = '?advertisement=';
adList[4644] = '?advertiser=';
adList[4645] = '?advertiser_id=$domain=~panel.rightflow.com';
adList[4646] = '?advertiserid=$domain=~adadyn.com|~outbrain.com|~seek.co.nz|~seek.com.au';
adList[4647] = '?advertising=';
adList[4648] = '?advideo_';
adList[4649] = '?advsystem=';
adList[4650] = '?advtile=';
adList[4651] = '?advurl=';
adList[4652] = '?adx=';
adList[4653] = '?adzone=';
adList[4654] = '?banner.id=';
adList[4655] = '?banner_id=';
adList[4656] = '?bannerid=';
adList[4657] = '?bannerxgroupid=';
adList[4658] = '?dfpadname=';
adList[4659] = '?file=ads&';
adList[4660] = '?getad=&$~object-subrequest';
adList[4661] = '?goto=ad|';
adList[4662] = '?handler=ads&';
adList[4663] = '?idaffiliation=';
adList[4664] = '?module=ads\/';
adList[4665] = '?oastagurl=';
adList[4666] = '?phpads_';
adList[4667] = '?popad=';
adList[4668] = '?service=ad&';
adList[4669] = '?sid=ads';
adList[4670] = '?simple_ad_';
adList[4671] = '?type=ad&';
adList[4672] = '?type=oas_pop&';
adList[4673] = '?view=ad&';
adList[4674] = '?wpproadszoneid=';
adList[4675] = '^pid=ads^';
adList[4676] = '_125ad.';
adList[4677] = '_160_ad_';
adList[4678] = '_160x550.';
adList[4679] = '_250ad.';
adList[4680] = '_300x250banner_';
adList[4681] = '_468x60ad.';
adList[4682] = '_728x90ad_';
adList[4683] = '_acorn_ad_';
adList[4684] = '_ad&zone=';
adList[4685] = '_ad-125x125.';
adList[4686] = '_ad.gif|';
adList[4687] = '_ad.jsp?';
adList[4688] = '_ad.php?';
adList[4689] = '_ad.png?';
adList[4690] = '_ad\/display?';
adList[4691] = '_ad\/full_';
adList[4692] = '_ad\/jquery.';
adList[4693] = '_ad\/public\/';
adList[4694] = '_ad\/section_';
adList[4695] = '_ad01.';
adList[4696] = '_ad01_';
adList[4697] = '_ad1.$~stylesheet';
adList[4698] = '_ad103.';
adList[4699] = '_ad120x120_';
adList[4700] = '_ad125.';
adList[4701] = '_ad1a.';
adList[4702] = '_ad1b.';
adList[4703] = '_ad2.';
adList[4704] = '_ad234x90-';
adList[4705] = '_ad3.';
adList[4706] = '_ad300.';
adList[4707] = '_ad300x250.';
adList[4708] = '_ad6.';
adList[4709] = '_ad728x90.';
adList[4710] = '_ad9.';
adList[4711] = '_ad?darttag=';
adList[4712] = '_ad?size=';
adList[4713] = '_ad_125x125.';
adList[4714] = '_ad_2012.';
adList[4715] = '_ad_250.';
adList[4716] = '_ad_300.';
adList[4717] = '_ad_350x250.';
adList[4718] = '_ad_728_';
adList[4719] = '_ad_actron.';
adList[4720] = '_ad_article_';
adList[4721] = '_ad_background.';
adList[4722] = '_ad_banner.';
adList[4723] = '_ad_banner_';
adList[4724] = '_ad_big.';
adList[4725] = '_ad_block&';
adList[4726] = '_ad_bottom.';
adList[4727] = '_ad_box.';
adList[4728] = '_ad_bsb.';
adList[4729] = '_ad_center.';
adList[4730] = '_ad_change.';
adList[4731] = '_ad_choices.';
adList[4732] = '_ad_choices_';
adList[4733] = '_ad_close.';
adList[4734] = '_ad_code.';
adList[4735] = '_ad_content.';
adList[4736] = '_ad_controller.';
adList[4737] = '_ad_count.';
adList[4738] = '_ad_count=';
adList[4739] = '_ad_courier.';
adList[4740] = '_ad_desktop_';
adList[4741] = '_ad_div=';
adList[4742] = '_ad_domain_';
adList[4743] = '_ad_end_';
adList[4744] = '_ad_engine\/';
adList[4745] = '_ad_expand_';
adList[4746] = '_ad_feed.';
adList[4747] = '_ad_footer.';
adList[4748] = '_ad_footer_';
adList[4749] = '_ad_frame.';
adList[4750] = '_ad_handler.';
adList[4751] = '_ad_harness.';
adList[4752] = '_ad_head.';
adList[4753] = '_ad_header.';
adList[4754] = '_ad_heading.';
adList[4755] = '_ad_homepage.';
adList[4756] = '_ad_ids=';
adList[4757] = '_ad_iframe.';
adList[4758] = '_ad_image_';
adList[4759] = '_ad_images\/';
adList[4760] = '_ad_init\/';
adList[4761] = '_ad_integration.';
adList[4762] = '_ad_interactive.';
adList[4763] = '_ad_label.';
adList[4764] = '_ad_layer_';
adList[4765] = '_ad_leaderboard.';
adList[4766] = '_ad_logo.';
adList[4767] = '_ad_middle_';
adList[4768] = '_ad_minileaderboard.';
adList[4769] = '_ad_new_';
adList[4770] = '_ad_number=';
adList[4771] = '_ad_one.';
adList[4772] = '_ad_over_';
adList[4773] = '_ad_page_';
adList[4774] = '_ad_placeholder-';
adList[4775] = '_ad_position_';
adList[4776] = '_ad_promo2.';
adList[4777] = '_ad_render_';
adList[4778] = '_ad_renderer_';
adList[4779] = '_ad_right.';
adList[4780] = '_ad_right_';
adList[4781] = '_ad_run.';
adList[4782] = '_ad_service.';
adList[4783] = '_ad_serving.';
adList[4784] = '_ad_show&';
adList[4785] = '_ad_side.';
adList[4786] = '_ad_sidebar_';
adList[4787] = '_ad_size.';
adList[4788] = '_ad_sky.';
adList[4789] = '_ad_skyscraper.';
adList[4790] = '_ad_slot=';
adList[4791] = '_ad_small.';
adList[4792] = '_ad_sponsor\/';
adList[4793] = '_ad_square.';
adList[4794] = '_ad_tall.';
adList[4795] = '_ad_teaserarticledetail\/';
adList[4796] = '_ad_template_';
adList[4797] = '_ad_top_';
adList[4798] = '_ad_url=';
adList[4799] = '_ad_utils-';
adList[4800] = '_ad_vertical.';
adList[4801] = '_ad_view=';
adList[4802] = '_ad_widesky.';
adList[4803] = '_ad_wrapper.';
adList[4804] = '_ad_yellow.';
adList[4805] = '_ad_zone_';
adList[4806] = '_adagency\/';
adList[4807] = '_adaptvad.';
adList[4808] = '_adbanner.';
adList[4809] = '_adbanner\/';
adList[4810] = '_adbanner_';
adList[4811] = '_adbanners.';
adList[4812] = '_adbar.';
adList[4813] = '_adbg1a.';
adList[4814] = '_adbg2.';
adList[4815] = '_adbg2a.';
adList[4816] = '_adbit.';
adList[4817] = '_adblue.';
adList[4818] = '_adbox.';
adList[4819] = '_adbox_';
adList[4820] = '_adbreak.';
adList[4821] = '_adcall.';
adList[4822] = '_adcall_';
adList[4823] = '_adchoice.';
adList[4824] = '_adchoices.';
adList[4825] = '_adcode_';
adList[4826] = '_adcom.';
adList[4827] = '_adcontent\/';
adList[4828] = '_adcount=';
adList[4829] = '_adengage.';
adList[4830] = '_adengage_';
adList[4831] = '_adengine_';
adList[4832] = '_adframe.';
adList[4833] = '_adframe\/';
adList[4834] = '_adframe_';
adList[4835] = '_adfunction.';
adList[4836] = '_adhesion.';
adList[4837] = '_adhoc?';
adList[4838] = '_adhome.';
adList[4839] = '_adhome_';
adList[4840] = '_adhoriz.';
adList[4841] = '_adhub_';
adList[4842] = '_adify.';
adList[4843] = '_adjug.';
adList[4844] = '_adlabel_';
adList[4845] = '_adlesse.';
adList[4846] = '_adlib.';
adList[4847] = '_adlinkbar.';
adList[4848] = '_adlog.';
adList[4849] = '_admanager\/';
adList[4850] = '_admarking_';
adList[4851] = '_admin\/ads\/';
adList[4852] = '_adminka\/';
adList[4853] = '_adnetwork.';
adList[4854] = '_adobjects.';
adList[4855] = '_adpage=';
adList[4856] = '_adpartner.';
adList[4857] = '_adplugin.';
adList[4858] = '_adright.';
adList[4859] = '_adright2.';
adList[4860] = '_adrotator.';
adList[4861] = '_adrow-';
adList[4862] = '_ads-affiliates_';
adList[4863] = '_ads.cgi';
adList[4864] = '_ads.cms?';
adList[4865] = '_ads.html';
adList[4866] = '_ads.js?';
adList[4867] = '_ads.php?';
adList[4868] = '_ads\/css\/';
adList[4869] = '_ads\/horiz\/';
adList[4870] = '_ads\/horiz_';
adList[4871] = '_ads\/iframe.';
adList[4872] = '_ads\/inhouse\/';
adList[4873] = '_ads\/ip\/';
adList[4874] = '_ads\/js\/';
adList[4875] = '_ads\/square\/';
adList[4876] = '_ads1.';
adList[4877] = '_ads12.';
adList[4878] = '_ads2.';
adList[4879] = '_ads3.';
adList[4880] = '_ads8.';
adList[4881] = '_ads9.';
adList[4882] = '_ads?';
adList[4883] = '_ads_async.';
adList[4884] = '_ads_cached.';
adList[4885] = '_ads_contextualtargeting_';
adList[4886] = '_ads_home.';
adList[4887] = '_ads_iframe.';
adList[4888] = '_ads_iframe_';
adList[4889] = '_ads_index_';
adList[4890] = '_ads_multi.';
adList[4891] = '_ads_new.';
adList[4892] = '_ads_only&';
adList[4893] = '_ads_reporting.';
adList[4894] = '_ads_single_';
adList[4895] = '_ads_targeting.';
adList[4896] = '_ads_text.';
adList[4897] = '_ads_top.';
adList[4898] = '_ads_v8.';
adList[4899] = '_adsbgd.';
adList[4900] = '_adscript.';
adList[4901] = '_adsdaq.';
adList[4902] = '_adsense.';
adList[4903] = '_adsense_';
adList[4904] = '_adserve.';
adList[4905] = '_adserve\/';
adList[4906] = '_adserved.';
adList[4907] = '_adserver.';
adList[4908] = '_adserver\/';
adList[4909] = '_adsetup.';
adList[4910] = '_adsframe.';
adList[4911] = '_adshare.';
adList[4912] = '_adshow.';
adList[4913] = '_adsjs.';
adList[4914] = '_adskin.';
adList[4915] = '_adskin_';
adList[4916] = '_adsonar.';
adList[4917] = '_adspace-';
adList[4918] = '_adspace_';
adList[4919] = '_adsperfectmarket\/';
adList[4920] = '_adsrv=';
adList[4921] = '_adsrv?';
adList[4922] = '_adssource.';
adList[4923] = '_adstat.';
adList[4924] = '_adsys.';
adList[4925] = '_adsys_';
adList[4926] = '_adsystem\/';
adList[4927] = '_adtags.';
adList[4928] = '_adtech&';
adList[4929] = '_adtech-';
adList[4930] = '_adtech.';
adList[4931] = '_adtech\/$~stylesheet';
adList[4932] = '_adtech_';
adList[4933] = '_adtext_';
adList[4934] = '_adtitle.';
adList[4935] = '_adtoma.';
adList[4936] = '_adtop.';
adList[4937] = '_adtxt.';
adList[4938] = '_adunit.';
adList[4939] = '_adv\/300.';
adList[4940] = '_adv\/leaderboard_';
adList[4941] = '_adv\/overlay\/';
adList[4942] = '_adv_banner_';
adList[4943] = '_adv_label.';
adList[4944] = '_advert.';
adList[4945] = '_advert\/';
adList[4946] = '_advert1.';
adList[4947] = '_advert_1.';
adList[4948] = '_advert_2.';
adList[4949] = '_advert_label.';
adList[4950] = '_advert_overview.';
adList[4951] = '_advert_vert';
adList[4952] = '_advertise-$domain=~linkedin.com';
adList[4953] = '_advertise.';
adList[4954] = '_advertise180.';
adList[4955] = '_advertisehere.';
adList[4956] = '_advertisement-';
adList[4957] = '_advertisement.';
adList[4958] = '_advertisement\/';
adList[4959] = '_advertisement_';
adList[4960] = '_advertisementbar.';
adList[4961] = '_advertisements\/';
adList[4962] = '_advertisementtxt_';
adList[4963] = '_advertising.';
adList[4964] = '_advertising\/';
adList[4965] = '_advertising_header.';
adList[4966] = '_advertising_iframe.';
adList[4967] = '_advertisment.';
adList[4968] = '_advertorial.';
adList[4969] = '_advertorial3.';
adList[4970] = '_advertorial_';
adList[4971] = '_advertorials\/';
adList[4972] = '_advertphoto.';
adList[4973] = '_adverts.js';
adList[4974] = '_adverts\/';
adList[4975] = '_adverts3.';
adList[4976] = '_advertsarea.';
adList[4977] = '_advertsimgs\/';
adList[4978] = '_adview?';
adList[4979] = '_adview_';
adList[4980] = '_advservices.';
adList[4981] = '_adwrap.';
adList[4982] = '_adwriter.';
adList[4983] = '_afd_ads.';
adList[4984] = '_affiliate\/banners\/';
adList[4985] = '_affiliate_ad.';
adList[4986] = '_afs_ads.';
adList[4987] = '_alt\/ads\/';
adList[4988] = '_argus_ad_';
adList[4989] = '_assets\/ads\/';
adList[4990] = '_background_ad.';
adList[4991] = '_background_ad\/';
adList[4992] = '_banner_ad-';
adList[4993] = '_banner_ad.';
adList[4994] = '_banner_ad_';
adList[4995] = '_banner_ads.';
adList[4996] = '_banner_ads_';
adList[4997] = '_banner_adv300x250px.';
adList[4998] = '_banner_adv_';
adList[4999] = '_bannerad.';
adList[5000] = '_bannerad_';
adList[5001] = '_bannerads_';
adList[5002] = '_bg_ad_left.';
adList[5003] = '_blank_ads.';
adList[5004] = '_blogads.';
adList[5005] = '_blogads_';
adList[5006] = '_bottom_ads.';
adList[5007] = '_bottom_ads_';
adList[5008] = '_box_ad_';
adList[5009] = '_btnad_';
adList[5010] = '_button_ad_';
adList[5011] = '_buttonad.';
adList[5012] = '_centre_ad.';
adList[5013] = '_cgbanners.php?';
adList[5014] = '_chatad_';
adList[5015] = '_commonad.';
adList[5016] = '_companionad.';
adList[5017] = '_content_ad.';
adList[5018] = '_content_ad_';
adList[5019] = '_contest_ad_';
adList[5020] = '_custom_ad.';
adList[5021] = '_custom_ad_';
adList[5022] = '_dart_ads.';
adList[5023] = '_dart_interstitial.';
adList[5024] = '_dashad_';
adList[5025] = '_dfp.php?';
adList[5026] = '_displayad_';
adList[5027] = '_displaytopads.';
adList[5028] = '_doubleclick.';
adList[5029] = '_doubleclick_ad.';
adList[5030] = '_down_ad_';
adList[5031] = '_dropdown_ad.';
adList[5032] = '_dynamicads\/';
adList[5033] = '_elements\/ads\/';
adList[5034] = '_engine_ads_';
adList[5035] = '_english\/adv\/';
adList[5036] = '_externalad.';
adList[5037] = '_fach_ad.';
adList[5038] = '_fbadbookingsystem&';
adList[5039] = '_feast_ad.';
adList[5040] = '_files\/ad.';
adList[5041] = '_fixed_ad.';
adList[5042] = '_floating_ad_';
adList[5043] = '_floatingad_';
adList[5044] = '_flyad.';
adList[5045] = '_footer_ad_';
adList[5046] = '_framed_ad\/';
adList[5047] = '_friendlyduck.';
adList[5048] = '_fullscreen_ad.';
adList[5049] = '_gads_bottom.';
adList[5050] = '_gads_footer.';
adList[5051] = '_gads_top.';
adList[5052] = '_gallery_ads.';
adList[5053] = '_gallery_image_ads_$~stylesheet';
adList[5054] = '_genads\/';
adList[5055] = '_generic_ad.';
adList[5056] = '_geobanner.';
adList[5057] = '_google_ad.';
adList[5058] = '_google_ads.';
adList[5059] = '_google_ads\/';
adList[5060] = '_google_ads_';
adList[5061] = '_googlead.';
adList[5062] = '_grid_ad?';
adList[5063] = '_header_ad.';
adList[5064] = '_header_ad_';
adList[5065] = '_headerad.';
adList[5066] = '_headline_ad.';
adList[5067] = '_homad.';
adList[5068] = '_homadconfig.';
adList[5069] = '_home_ad.';
adList[5070] = '_home_ad_';
adList[5071] = '_hosting_ad.';
adList[5072] = '_house_ad_';
adList[5073] = '_hr_advt\/';
adList[5074] = '_iad.html?';
adList[5075] = '_id\/ads\/';
adList[5076] = '_iframe_ad_';
adList[5077] = '_images\/ad.';
adList[5078] = '_images\/ad_';
adList[5079] = '_images\/ads\/';
adList[5080] = '_index_ad.';
adList[5081] = '_inline_advert&';
adList[5082] = '_inlineads.';
adList[5083] = '_js\/ads.js';
adList[5084] = '_js_ads.';
adList[5085] = '_js_ads\/';
adList[5086] = '_jtads\/';
adList[5087] = '_juiceadv.';
adList[5088] = '_juicyads.';
adList[5089] = '_layerad.';
adList[5090] = '_lazy_ads\/';
adList[5091] = '_leaderboard_ad_';
adList[5092] = '_left_ad.';
adList[5093] = '_link_ads-';
adList[5094] = '_live\/ad\/';
adList[5095] = '_load_ad?';
adList[5096] = '_logadslot&';
adList[5097] = '_longad_';
adList[5098] = '_mailloginad.';
adList[5099] = '_main_ad.';
adList[5100] = '_mainad.';
adList[5101] = '_maxi_ad\/';
adList[5102] = '_media\/ads\/';
adList[5103] = '_mid_ad.';
adList[5104] = '_middle_ads.';
adList[5105] = '_mmsadbanner\/';
adList[5106] = '_mobile_ad_';
adList[5107] = '_mpu_widget?';
adList[5108] = '_online_ad.';
adList[5109] = '_onlinead_';
adList[5110] = '_openx.';
adList[5111] = '_openx\/';
adList[5112] = '_org_ad.';
adList[5113] = '_overlay_ad.';
adList[5114] = '_paid_ads\/';
adList[5115] = '_paidadvert_';
adList[5116] = '_panel_ads.';
adList[5117] = '_partner_ad.';
adList[5118] = '_platform_ads.';
adList[5119] = '_platform_ads_';
adList[5120] = '_player_ads_';
adList[5121] = '_plus\/ads\/';
adList[5122] = '_pop_ad.';
adList[5123] = '_pop_ad\/';
adList[5124] = '_pop_under.';
adList[5125] = '_popunder.';
adList[5126] = '_popunder_';
adList[5127] = '_popupunder.';
adList[5128] = '_post_ads.';
adList[5129] = '_preorderad.';
adList[5130] = '_prime_ad.';
adList[5131] = '_promo_ad\/';
adList[5132] = '_psu_ad.';
adList[5133] = '_pushads.';
adList[5134] = '_radio_ad_';
adList[5135] = '_railads.';
adList[5136] = '_rectangle_ads.';
adList[5137] = '_reklama_$domain=~youtube.com';
adList[5138] = '_reporting_ads.';
adList[5139] = '_request_ad.';
adList[5140] = '_response_ad.';
adList[5141] = '_right_ad.';
adList[5142] = '_right_ads.';
adList[5143] = '_right_ads\/';
adList[5144] = '_right_ads_';
adList[5145] = '_rightad.';
adList[5146] = '_rightad1.';
adList[5147] = '_rightad_';
adList[5148] = '_rightmn_ads.';
adList[5149] = '_search\/ads.js';
adList[5150] = '_sectionfront_ad.';
adList[5151] = '_show_ads.';
adList[5152] = '_show_ads=';
adList[5153] = '_show_ads_';
adList[5154] = '_sidead.';
adList[5155] = '_sidebar_ad.';
adList[5156] = '_sidebar_ad_';
adList[5157] = '_sidebarad_';
adList[5158] = '_site_sponsor';
adList[5159] = '_skinad.';
adList[5160] = '_skybannerview.';
adList[5161] = '_skyscraper160x600.';
adList[5162] = '_slider_ad.';
adList[5163] = '_slot_adv_';
adList[5164] = '_small_ad.';
adList[5165] = '_smartads_';
adList[5166] = '_sponsor\/css\/';
adList[5167] = '_sponsoredlinks_';
adList[5168] = '_spot-ad_';
adList[5169] = '_square_ad.';
adList[5170] = '_static\/ads\/';
adList[5171] = '_static_ads.';
adList[5172] = '_sticky_ad.';
adList[5173] = '_stickyad.';
adList[5174] = '_stickyadfunc.';
adList[5175] = '_survey_ad_';
adList[5176] = '_tagadvertising.';
adList[5177] = '_temp\/ad_';
adList[5178] = '_text_ads.';
adList[5179] = '_textad_$~media';
adList[5180] = '_textads.';
adList[5181] = '_textads\/';
adList[5182] = '_theme\/ads\/';
adList[5183] = '_tile_ad_';
adList[5184] = '_top_ad.';
adList[5185] = '_top_ad_';
adList[5186] = '_topad.';
adList[5187] = '_tribalfusion.';
adList[5188] = '_uim-ads_';
adList[5189] = '_valueclick.';
adList[5190] = '_vertical_ad.';
adList[5191] = '_video_ads\/';
adList[5192] = '_video_ads_';
adList[5193] = '_videoad.';
adList[5194] = '_vodaaffi_';
adList[5195] = '_web-advert.';
adList[5196] = '_web_ad.';
adList[5197] = '_web_ad_';
adList[5198] = '_webad.';
adList[5199] = '_webad_';
adList[5200] = '_webbannerad_';
adList[5201] = '_widget_ad.';
adList[5202] = '_yahooads\/';
adList[5203] = '_your_ad.';
adList[5204] = '_zedo.';
adList[5205] = 'takeover_background.';
adList[5206] = 'takeover_banner_';
adList[5207] = '||com\/banners\/$image,object,subdocument';
adList[5208] = '! prebid scripts';
adList[5209] = '\/prebid.$script';
adList[5210] = '! doubleclick';
adList[5211] = '\/jquery.dfp.js$script';
adList[5212] = '\/jquery.dfp.min.js$script';
adList[5213] = '! linkbucks.com script';
adList[5214] = '\/webservices\/jsparselinks.aspx?$script';
adList[5215] = '! cdn-based filters';
adList[5216] = '! common adserver string';
adList[5217] = '\/mediahosting.engine$script,third-party';
adList[5218] = '\/tag.eng$script,third-party';
adList[5219] = '\/tag.rb$script,third-party';
adList[5220] = '! white papers insert';
adList[5221] = '\/sl\/assetlisting\/?';
adList[5222] = '! peel script';
adList[5223] = '\/jquery.peelback.js';
adList[5224] = '! anti-adblock';
adList[5225] = '-adblocker-detection\/';
adList[5226] = '\/abdetect.js';
adList[5227] = '\/ad-blocker.js';
adList[5228] = '\/adb.min.js';
adList[5229] = '\/adb_detector.';
adList[5230] = '\/adblock-detect.';
adList[5231] = '\/adblock-detector.';
adList[5232] = '\/adblock.gif?';
adList[5233] = '\/adblock_detector.';
adList[5234] = '\/adblock_detector2.';
adList[5235] = '\/adblock_logger.';
adList[5236] = '\/adblockdetect.';
adList[5237] = '\/adblockdetection.';
adList[5238] = '\/adblocker-leader.';
adList[5239] = '\/adblocker.js';
adList[5240] = '\/adblockertrack_';
adList[5241] = '\/adblockkiller.';
adList[5242] = '\/adbuddy.';
adList[5243] = '\/adsblocker.';
adList[5244] = '\/anti_ab.';
adList[5245] = '\/antiadblock.';
adList[5246] = '\/blockblock\/blockblock.jquery.js';
adList[5247] = '\/disable%2badblock.';
adList[5248] = '\/fuckadb.js';
adList[5249] = '\/fuckingadblockplus.';
adList[5250] = ',160x600;';
adList[5251] = ',468x60-';
adList[5252] = ',468x60;';
adList[5253] = ',728x90,';
adList[5254] = ',970x90;';
adList[5255] = '-720';
adList[5256] = '-120_600_';
adList[5257] = '-120x240.';
adList[5258] = '-120x300.';
adList[5259] = '-120x400.';
adList[5260] = '-120x60-';
adList[5261] = '-120x60.';
adList[5262] = '-120x600-';
adList[5263] = '-120x600.';
adList[5264] = '-120x600_';
adList[5265] = '-120x600c.';
adList[5266] = '-125x40-';
adList[5267] = '-760';
adList[5268] = '-160x400-';
adList[5269] = '-160x600-';
adList[5270] = '-160x600.';
adList[5271] = '-160x600_';
adList[5272] = '-160x600b.';
adList[5273] = '-161x601-';
adList[5274] = '-550';
adList[5275] = '-300x250-$~xmlhttprequest';
adList[5276] = '-300x250_';
adList[5277] = '-300x600.';
adList[5278] = '-460x68.';
adList[5279] = '-568';
adList[5280] = '-468-60-';
adList[5281] = '-528';
adList[5282] = '-468-60_';
adList[5283] = '-468_60.';
adList[5284] = '-468by60.';
adList[5285] = '-468x060-';
adList[5286] = '-468x060_';
adList[5287] = '-468x60-';
adList[5288] = '-468x60.';
adList[5289] = '-468x60\/';
adList[5290] = '-468x60_';
adList[5291] = '-468x60px-';
adList[5292] = '-468x70.';
adList[5293] = '-468x80-';
adList[5294] = '-468x80.';
adList[5295] = '-468x80\/';
adList[5296] = '-468x80_';
adList[5297] = '-468x90.';
adList[5298] = '-480x120.';
adList[5299] = '-480x60-';
adList[5300] = '-480x60.';
adList[5301] = '-480x60\/';
adList[5302] = '-480x60_';
adList[5303] = '-486x60.';
adList[5304] = '-500x100.';
adList[5305] = '-600x70.';
adList[5306] = '-600x90-';
adList[5307] = '-900';
adList[5308] = '-720x120-';
adList[5309] = '-720x90-';
adList[5310] = '-720x90.';
adList[5311] = '-818';
adList[5312] = '-728.90.';
adList[5313] = '-728x90&';
adList[5314] = '-728x90-';
adList[5315] = '-728x90.';
adList[5316] = '-728x90\/';
adList[5317] = '-728x90_';
adList[5318] = '-728x90a_';
adList[5319] = '-728x90px2.';
adList[5320] = '-729x91-';
adList[5321] = '-780x90-';
adList[5322] = '-800x150.';
adList[5323] = '-980x60-';
adList[5324] = '-988x60.';
adList[5325] = '.120x600.';
adList[5326] = '.160x600.';
adList[5327] = '.160x600_';
adList[5328] = '.300x250.';
adList[5329] = '.300x250_';
adList[5330] = '.468x60-';
adList[5331] = '.468x60.';
adList[5332] = '.468x60\/';
adList[5333] = '.468x60_';
adList[5334] = '.468x80-';
adList[5335] = '.468x80.';
adList[5336] = '.468x80\/';
adList[5337] = '.468x80_';
adList[5338] = '.480x60-';
adList[5339] = '.480x60.';
adList[5340] = '.480x60\/';
adList[5341] = '.480x60_';
adList[5342] = '.650x100.';
adList[5343] = '.728x90-';
adList[5344] = '.728x90.';
adList[5345] = '.728x90\/';
adList[5346] = '.728x90_';
adList[5347] = '.900x100.';
adList[5348] = '\/120-600-';
adList[5349] = '\/120-600.';
adList[5350] = '\/1200x70_';
adList[5351] = '\/120_600.';
adList[5352] = '\/120_600_';
adList[5353] = '\/120x240_';
adList[5354] = '\/120x600-';
adList[5355] = '\/120x600.';
adList[5356] = '\/120x600_';
adList[5357] = '\/125x300_';
adList[5358] = '\/125x600-';
adList[5359] = '\/125x600_';
adList[5360] = '\/130x600-';
adList[5361] = '\/130x600.';
adList[5362] = '\/150-500.';
adList[5363] = '\/150_500.';
adList[5364] = '\/150x200-';
adList[5365] = '\/150x300_';
adList[5366] = '\/150x600_';
adList[5367] = '\/160-600-';
adList[5368] = '\/160-600.';
adList[5369] = '\/160.html$subdocument';
adList[5370] = '\/160_600.';
adList[5371] = '\/160_600_';
adList[5372] = '\/160x400-';
adList[5373] = '\/160x400_';
adList[5374] = '\/160x600-';
adList[5375] = '\/160x600.';
adList[5376] = '\/160x600_';
adList[5377] = '\/160x600partner.';
adList[5378] = '\/170x700.';
adList[5379] = '\/180x150-';
adList[5380] = '\/190_900.';
adList[5381] = '\/190x600.';
adList[5382] = '\/230x90_';
adList[5383] = '\/270x90-';
adList[5384] = '\/300-250-';
adList[5385] = '\/300-250.';
adList[5386] = '\/300.html$subdocument';
adList[5387] = '\/300_250_';
adList[5388] = '\/300x150_';
adList[5389] = '\/300x250-';
adList[5390] = '\/300x250.';
adList[5391] = '\/300x250_';
adList[5392] = '\/300x250b.';
adList[5393] = '\/300x250px-';
adList[5394] = '\/300x250px_';
adList[5395] = '\/300x350.';
adList[5396] = '\/300x90_';
adList[5397] = '\/320x250.';
adList[5398] = '\/335x205_';
adList[5399] = '\/336x280-';
adList[5400] = '\/336x280.';
adList[5401] = '\/336x280_';
adList[5402] = '\/340x85_';
adList[5403] = '\/4-6-8x60.';
adList[5404] = '\/400x297.';
adList[5405] = '\/428x60.';
adList[5406] = '\/460x60.';
adList[5407] = '\/460x80_';
adList[5408] = '\/468-20.';
adList[5409] = '\/468-60-';
adList[5410] = '\/468-60.';
adList[5411] = '\/468-60_';
adList[5412] = '\/468_60.';
adList[5413] = '\/468_60_';
adList[5414] = '\/468_80.';
adList[5415] = '\/468x060.';
adList[5416] = '\/468x060_';
adList[5417] = '\/468x280.';
adList[5418] = '\/468x280_';
adList[5419] = '\/468x60-';
adList[5420] = '\/468x60.';
adList[5421] = '\/468x60_';
adList[5422] = '\/468x60a.';
adList[5423] = '\/468x60a_';
adList[5424] = '\/468x60b.';
adList[5425] = '\/468x60v1_';
adList[5426] = '\/468x70-';
adList[5427] = '\/468x72.';
adList[5428] = '\/468x72_';
adList[5429] = '\/468x80-';
adList[5430] = '\/468x80.';
adList[5431] = '\/468x80_';
adList[5432] = '\/468x80b.';
adList[5433] = '\/468x80g.';
adList[5434] = '\/470x030_';
adList[5435] = '\/475x150-';
adList[5436] = '\/480x030.';
adList[5437] = '\/480x030_';
adList[5438] = '\/480x60-';
adList[5439] = '\/480x60.';
adList[5440] = '\/480x60_';
adList[5441] = '\/480x70_';
adList[5442] = '\/486x60_';
adList[5443] = '\/496_98_';
adList[5444] = '\/500x90.';
adList[5445] = '\/530x60_';
adList[5446] = '\/540x80_';
adList[5447] = '\/600-60.';
adList[5448] = '\/600-90.';
adList[5449] = '\/600_120_';
adList[5450] = '\/600_90_';
adList[5451] = '\/600x160_';
adList[5452] = '\/600x75_';
adList[5453] = '\/600x90.';
adList[5454] = '\/60x468.';
adList[5455] = '\/640x80-';
adList[5456] = '\/660x120_';
adList[5457] = '\/660x60.';
adList[5458] = '\/700_100_';
adList[5459] = '\/700_200.';
adList[5460] = '\/700x100.';
adList[5461] = '\/700x120.';
adList[5462] = '\/700x250.';
adList[5463] = '\/700x90.';
adList[5464] = '\/728-90-';
adList[5465] = '\/728-90.';
adList[5466] = '\/728-90_';
adList[5467] = '\/728.html$subdocument';
adList[5468] = '\/728_200.';
adList[5469] = '\/728_200_';
adList[5470] = '\/728_90.';
adList[5471] = '\/728_90_';
adList[5472] = '\/728_90n.';
adList[5473] = '\/728by90_';
adList[5474] = '\/728x15.';
adList[5475] = '\/728x180-';
adList[5476] = '\/728x79_';
adList[5477] = '\/728x90-';
adList[5478] = '\/728x90.';
adList[5479] = '\/728x901.';
adList[5480] = '\/728x90?';
adList[5481] = '\/728x90_';
adList[5482] = '\/728x90b.';
adList[5483] = '\/728x90d.';
adList[5484] = '\/728x90g.';
adList[5485] = '\/728x90h.';
adList[5486] = '\/728x90l.';
adList[5487] = '\/728x90top.';
adList[5488] = '\/750-100.';
adList[5489] = '\/750x100.';
adList[5490] = '\/760x120.';
adList[5491] = '\/760x120_';
adList[5492] = '\/760x90_';
adList[5493] = '\/768x90-';
adList[5494] = '\/768x90.';
adList[5495] = '\/780x90.';
adList[5496] = '\/800x90.';
adList[5497] = '\/80x468_';
adList[5498] = '\/900x130_';
adList[5499] = '\/900x350_';
adList[5500] = '\/950_250.';
adList[5501] = '\/960_60_';
adList[5502] = '\/980x90.';
adList[5503] = '\/_iframe728x90.';
adList[5504] = '\/ban468.';
adList[5505] = '\/bottom728.html';
adList[5506] = '\/bottom728x90.';
adList[5507] = '\/head486x60.';
adList[5508] = '\/img\/468_60';
adList[5509] = '\/img\/728_90';
adList[5510] = '\/lightake728x90.';
adList[5511] = '\/top468.html';
adList[5512] = '\/top728.html';
adList[5513] = '\/top728x90.';
adList[5514] = '120-600.gif|';
adList[5515] = '120x500.gif|';
adList[5516] = '120x600.gif?';
adList[5517] = '120x600.gif|';
adList[5518] = '120x600.html|';
adList[5519] = '120x600.htm|';
adList[5520] = '120x600.png|';
adList[5521] = '120x600.swf?';
adList[5522] = '120x600.swf|';
adList[5523] = '125x600.gif|';
adList[5524] = '125x600.swf?';
adList[5525] = '125x600.swf|';
adList[5526] = '133x394.gif|';
adList[5527] = '160x300.gif|';
adList[5528] = '160x600.gif|';
adList[5529] = '160x600.html|';
adList[5530] = '160x600.htm|';
adList[5531] = '160x600.jpg|';
adList[5532] = '160x600.php?';
adList[5533] = '160x600.php|';
adList[5534] = '160x600.png|';
adList[5535] = '160x600.swf?';
adList[5536] = '160x600.swf|';
adList[5537] = '160x6001.jpg|';
adList[5538] = '450x55.jpg|';
adList[5539] = '460x70.jpg|';
adList[5540] = '468-60.gif|';
adList[5541] = '468-60.swf?';
adList[5542] = '468-60.swf|';
adList[5543] = '468_60.gif|';
adList[5544] = '468x60.gif|';
adList[5545] = '468x60.html|';
adList[5546] = '468x60.htm|';
adList[5547] = '468x60.jpg|';
adList[5548] = '468x60.php?';
adList[5549] = '468x60.php|';
adList[5550] = '468x60.swf?';
adList[5551] = '468x60.swf|';
adList[5552] = '468x60_1.gif|';
adList[5553] = '468x60_2.jpg|';
adList[5554] = '468x80.gif|';
adList[5555] = '470x60.gif|';
adList[5556] = '470x60.jpg|';
adList[5557] = '470x60.swf?';
adList[5558] = '470x60.swf|';
adList[5559] = '480x60.png|';
adList[5560] = '480x80.jpg|';
adList[5561] = '700_200.gif|';
adList[5562] = '700_200.jpg|';
adList[5563] = '700x200.gif|';
adList[5564] = '728x290.gif|';
adList[5565] = '728x90.gif|';
adList[5566] = '728x90.html|';
adList[5567] = '728x90.htm|';
adList[5568] = '728x90.jpg|';
adList[5569] = '728x90.php?';
adList[5570] = '728x90.php|';
adList[5571] = '728x90.png|';
adList[5572] = '728x90.swf?';
adList[5573] = '728x90.swf|';
adList[5574] = '728x90_2.jpg|';
adList[5575] = '750x80.swf|';
adList[5576] = '750x90.gif|';
adList[5577] = '760x90.jpg|';
adList[5578] = '=120x600,';
adList[5579] = '=120x600;';
adList[5580] = '=160x160;';
adList[5581] = '=160x600&';
adList[5582] = '=160x600,';
adList[5583] = '=160x600;';
adList[5584] = '=234x60;';
adList[5585] = '=234x60_';
adList[5586] = '=300x250&';
adList[5587] = '=300x250,';
adList[5588] = '=300x250\/';
adList[5589] = '=300x250;';
adList[5590] = '=300x250_';
adList[5591] = '=300x300;';
adList[5592] = '=336x280,';
adList[5593] = '=336x280;';
adList[5594] = '=440x410;';
adList[5595] = '=468x60&';
adList[5596] = '=468x60,';
adList[5597] = '=468x60\/';
adList[5598] = '=468x60;';
adList[5599] = '=468x60_';
adList[5600] = '=468x80_';
adList[5601] = '=480x60;';
adList[5602] = '=728x90&';
adList[5603] = '=728x90,';
adList[5604] = '=728x90\/';
adList[5605] = '=728x90;';
adList[5606] = '=728x90_';
adList[5607] = '=760x120&';
adList[5608] = '=888x10;';
adList[5609] = '=900x60;';
adList[5610] = '_100x480_';
adList[5611] = '_115x220.';
adList[5612] = '_120_60.';
adList[5613] = '_120_600.';
adList[5614] = '_120_600_';
adList[5615] = '_120_x_600.';
adList[5616] = '_120h600.';
adList[5617] = '_120x240.';
adList[5618] = '_120x240_';
adList[5619] = '_120x500.';
adList[5620] = '_120x60.';
adList[5621] = '_120x600-';
adList[5622] = '_120x600.';
adList[5623] = '_120x600_';
adList[5624] = '_120x600a.';
adList[5625] = '_120x600px.';
adList[5626] = '_120x60_';
adList[5627] = '_120x800a.';
adList[5628] = '_125x600_';
adList[5629] = '_140x600.';
adList[5630] = '_140x600_';
adList[5631] = '_150x700_';
adList[5632] = '_160-600.';
adList[5633] = '_160_600.';
adList[5634] = '_160_600_';
adList[5635] = '_160by600_';
adList[5636] = '_160x1600.';
adList[5637] = '_160x290.';
adList[5638] = '_160x300.';
adList[5639] = '_160x300_';
adList[5640] = '_160x350.';
adList[5641] = '_160x400.';
adList[5642] = '_160x500.';
adList[5643] = '_160x600&';
adList[5644] = '_160x600-';
adList[5645] = '_160x600.';
adList[5646] = '_160x600\/';
adList[5647] = '_160x600_';
adList[5648] = '_160x600b.';
adList[5649] = '_180x300_';
adList[5650] = '_180x450_';
adList[5651] = '_200x600_';
adList[5652] = '_300-250-';
adList[5653] = '_300.htm';
adList[5654] = '_300_250.';
adList[5655] = '_300_250_';
adList[5656] = '_300_60_';
adList[5657] = '_300x160_';
adList[5658] = '_300x250-';
adList[5659] = '_300x250.';
adList[5660] = '_300x250_';
adList[5661] = '_300x250a_';
adList[5662] = '_300x250b.';
adList[5663] = '_300x250px.';
adList[5664] = '_300x250v2.';
adList[5665] = '_300x600.';
adList[5666] = '_300x600_';
adList[5667] = '_320x250_';
adList[5668] = '_323x120_';
adList[5669] = '_336x120.';
adList[5670] = '_336x280_';
adList[5671] = '_336x280a.';
adList[5672] = '_336x280s.';
adList[5673] = '_336x850.';
adList[5674] = '_350_100.';
adList[5675] = '_350_100_';
adList[5676] = '_350x100.';
adList[5677] = '_370x270.';
adList[5678] = '_400-80.';
adList[5679] = '_400x60.';
adList[5680] = '_400x68.';
adList[5681] = '_420x80.';
adList[5682] = '_420x80_';
adList[5683] = '_438x50.';
adList[5684] = '_438x60.';
adList[5685] = '_438x60_';
adList[5686] = '_460_60.';
adList[5687] = '_460x60.';
adList[5688] = '_465x110_';
adList[5689] = '_468-60.';
adList[5690] = '_468.gif';
adList[5691] = '_468.htm';
adList[5692] = '_468_60-';
adList[5693] = '_468_60.';
adList[5694] = '_468_60_';
adList[5695] = '_468_80.';
adList[5696] = '_468_80_';
adList[5697] = '_468x060-';
adList[5698] = '_468x060.';
adList[5699] = '_468x060_';
adList[5700] = '_468x100.';
adList[5701] = '_468x100_';
adList[5702] = '_468x120.';
adList[5703] = '_468x60-';
adList[5704] = '_468x60.';
adList[5705] = '_468x60\/';
adList[5706] = '_468x60_';
adList[5707] = '_468x60b.';
adList[5708] = '_468x60px_';
adList[5709] = '_468x6o_';
adList[5710] = '_468x80-';
adList[5711] = '_468x80.';
adList[5712] = '_468x80\/';
adList[5713] = '_468x80_';
adList[5714] = '_468x90.';
adList[5715] = '_468x90_';
adList[5716] = '_480_60.';
adList[5717] = '_480_80_';
adList[5718] = '_480x60-';
adList[5719] = '_480x60.';
adList[5720] = '_480x60\/';
adList[5721] = '_480x60_';
adList[5722] = '_486x60.';
adList[5723] = '_486x60_';
adList[5724] = '_490-90_';
adList[5725] = '_500x440.';
adList[5726] = '_540_70.';
adList[5727] = '_540_70_';
adList[5728] = '_550x150.';
adList[5729] = '_555x70.';
adList[5730] = '_580x100.';
adList[5731] = '_585x75-';
adList[5732] = '_585x75_';
adList[5733] = '_590x105.';
adList[5734] = '_600-90.';
adList[5735] = '_600x120_';
adList[5736] = '_600x160.';
adList[5737] = '_600x180.';
adList[5738] = '_600x80.';
adList[5739] = '_600x90.';
adList[5740] = '_620x203_';
adList[5741] = '_638x200_';
adList[5742] = '_650x350.';
adList[5743] = '_650x80_';
adList[5744] = '_672x120_';
adList[5745] = '_680x93_';
adList[5746] = '_682x90_';
adList[5747] = '_700_100_';
adList[5748] = '_700_150_';
adList[5749] = '_700_200_';
adList[5750] = '_700x200.';
adList[5751] = '_720_90.';
adList[5752] = '_720x90.';
adList[5753] = '_720x90_';
adList[5754] = '_728-90.';
adList[5755] = '_728-90_';
adList[5756] = '_728.htm';
adList[5757] = '_728_90.';
adList[5758] = '_728_90_';
adList[5759] = '_728_x_90_';
adList[5760] = '_728by90_';
adList[5761] = '_728x-90.';
adList[5762] = '_728x150.';
adList[5763] = '_728x60.';
adList[5764] = '_728x90&';
adList[5765] = '_728x90-';
adList[5766] = '_728x90.';
adList[5767] = '_728x90\/';
adList[5768] = '_728x901.';
adList[5769] = '_728x90_';
adList[5770] = '_728x90a.';
adList[5771] = '_728x90a_';
adList[5772] = '_728x90b_';
adList[5773] = '_728x90pg_';
adList[5774] = '_728x90px-';
adList[5775] = '_728x90px.';
adList[5776] = '_728x90px_';
adList[5777] = '_728x90v1.';
adList[5778] = '_730_440.';
adList[5779] = '_730x60_';
adList[5780] = '_730x90_';
adList[5781] = '_745_60.';
adList[5782] = '_745_90.';
adList[5783] = '_750x100.';
adList[5784] = '_760x100.';
adList[5785] = '_760x90_';
adList[5786] = '_764x70.';
adList[5787] = '_764x70_';
adList[5788] = '_768x90_';
adList[5789] = '_796x110_';
adList[5790] = '_798x99_';
adList[5791] = '_800x100.';
adList[5792] = '_800x80_';
adList[5793] = '_80x468.';
adList[5794] = '_900x350.';
adList[5795] = '_936x60.';
adList[5796] = '_960_90.';
adList[5797] = '_970x30_';
adList[5798] = '_980x100.';
adList[5799] = '_a468x60.';
adList[5800] = '&link_type=offer$popup,third-party';
adList[5801] = '&popunder=$popup';
adList[5802] = '&program=revshare&$popup';
adList[5803] = '-ads-campaign\/$popup';
adList[5804] = '.co\/ads\/$popup';
adList[5805] = '.com\/?adv=$popup';
adList[5806] = '.com\/ads?$popup';
adList[5807] = '.engine?placementid=$popup';
adList[5808] = '\/?redirect&placement=$popup';
adList[5809] = '\/?reef=$popup';
adList[5810] = '\/a\/display.php?$popup';
adList[5811] = '\/ad.php?tag=$popup';
adList[5812] = '\/ad.php?zone$popup';
adList[5813] = '\/ad.php|$popup';
adList[5814] = '\/ad\/display.php$popup';
adList[5815] = '\/ad\/window.php?$popup';
adList[5816] = '\/ad_pop.php?$popup';
adList[5817] = '\/adclick.$popup';
adList[5818] = '\/adhandler.aspx?$popup';
adList[5819] = '\/ads.htm$popup';
adList[5820] = '\/adserver.$popup';
adList[5821] = '\/adsxml.php$popup';
adList[5822] = '\/adsynserveuserid=$popup';
adList[5823] = '\/advlink.$popup';
adList[5824] = '\/afu.php?$popup';
adList[5825] = '\/bani\/index.php?id=$popup';
adList[5826] = '\/click?adv=$popup';
adList[5827] = '\/fp.eng?$popup';
adList[5828] = '\/fp.engine?$popup,third-party';
adList[5829] = '\/lr.php?zoneid=$popup';
adList[5830] = '\/popout.$popup';
adList[5831] = '\/popunder.$popup';
adList[5832] = '\/popunder_$popup';
adList[5833] = '\/popupads.$popup';
adList[5834] = '\/punder.php$popup';
adList[5835] = '\/redirect.a1b?$popup';
adList[5836] = '\/redirect.eng?$popup';
adList[5837] = '\/redirect.engine$popup';
adList[5838] = '\/redirect.rb?$popup';
adList[5839] = '\/redirect.spark?$popup,third-party';
adList[5840] = '\/rotator.php?$popup';
adList[5841] = '\/spopunder^$popup';
adList[5842] = '\/srvclk.php?$popup';
adList[5843] = '\/xdirect.html?$popup';
adList[5844] = '\/yesbaby.$popup';
adList[5845] = ':\/\/ads.$popup';
adList[5846] = ':\/\/adv.$popup';
adList[5847] = '=popunder&$popup';
adList[5848] = '=popunders&$popup';
adList[5849] = '?ad_domain=$popup';
adList[5850] = '?adurl=$popup';
adList[5851] = '?iiadext=$popup';
adList[5852] = '_popunder+$popup';

