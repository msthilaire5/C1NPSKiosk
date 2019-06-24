/* 
	MEGAN ST. HILAIRE
	searchResults.js -- This file's code implements display of different kinds of search results!
*/

// if no API key given, prompt user for one to use for rest of requests!
const API_KEY = (localStorage.API_KEY && ((localStorage != null) || (localStorage.API_KEY != ""))) ? (localStorage.API_KEY) : getAPIKey();

function getAPIKey() {
	
	var userInput = prompt("Please enter your NPS API key: ");
	localStorage.setItem("API_KEY", userInput);
	return userInput;

}

/* ISOLATING QUERY TERM FROM SEARCH BAR */
function isolateQuery() {

	var qTerm = "";
	// Check if given query term from search bar.
	var pageURL = window.location.href;
	var kwPosit = pageURL.indexOf('='); // locate 'keywords' in URL, if there
	// Isolate query term and use for search, if any.
	if ((kwPosit != -1) && (kwPosit + 1 != pageURL.length)) {
		qTerm = ("&q=" + pageURL.substring(kwPosit + 1, pageURL.length));
	}
	
	return qTerm;
}


/* LOADING SCROLLING ALERTS BAR MESSAGES */
function loadAlertsBar() {

	// List of meesages
	var alerts = "";

	// Pull messages from storage if already there
	if (sessionStorage.alMessages) {
		alerts = sessionStorage.alMessages;
		// div displaying results
		var scrollDisplay = $("#alertsText");
		scrollDisplay.text(alerts);
	} else {
		var alTxtList = []; // List of alerts
		var alertsURL = "https://developer.nps.gov/api/v1/alerts?limit=10&api_key=" + API_KEY ;

		$.getJSON(alertsURL, function(data) { // Make request to API
			
			// List of alerts
			var alertList = data.data;

			// Populate with name header and state locat for each park.
			for(aIndex = 0; aIndex < alertList.length; aIndex++) {
				var alert = alertList[aIndex]; // Select-an-alert!
				var alertTxt = alert.category.toUpperCase() + ": " + alert.title + ".";
				alTxtList.push(alertTxt);
			}

			alerts = alTxtList.join(" \u26FA ");
			sessionStorage.setItem("alMessages", alerts);

			// div displaying results
			var scrollDisplay = $("#alertsText");
			scrollDisplay.text(alerts);

		});
	}

	return;
}

/* SHOWING PARKS RESULTS */
function dispLocRes() {

	// URL for retrieving data from API.
	var locURL = "https://developer.nps.gov/api/v1/parks?fields=images&api_key=" + API_KEY ;
	// Add search term, if any.
	locURL += isolateQuery();

	$.getJSON(locURL, function(data) { // Make request to API
		// div displaying results
		var parkDisplay = $("#locationResults");
		// Remove "Loading results..." filler.
		parkDisplay.empty();

		// List of all parks
		var parkList = data.data;

		if (parkList.length > 0) {
			// Populate with name header and state locat for each park.
			for(pIndex = 0; pIndex < parkList.length; pIndex++) {
				const park = parkList[pIndex]; // Select-a-park!
				var resBox = $("<div class='resBox'></div>"); // Box it!

				// URL for filling template.
				const pCode = park.parkCode;
				const templateUrl = "park.html?parkCode=" + pCode;

				const pLink = $("<a class='resLink' href=" + templateUrl + "></a>").text(park.fullName);
				const pTitle = $("<h3></h3>").html(pLink);
				const pStates = $("<p></p>").text( "(" + park.states + ")");


				resBox.append(pTitle);
				if (park.images) {
					const pImgURL = park.images[0].url;
					const pImg = $("<img class='resBoxImg' src='" + pImgURL + "'></img>");
					resBox.append(pImg);
				}
				resBox.append(pStates);
				parkDisplay.append(resBox);
			}
		}
		else {
			parkDisplay.append($('<p></p>').text('No results found.'));
		}
	});

	return;
}

// Visitor Centers.
function dispVCRes(pTitle, pCode, query) {

	const vcURL = "https://developer.nps.gov/api/v1/visitorcenters?api_key=" + API_KEY + "&parkCode=" + pCode;

	$.getJSON(vcURL, function(data) {
		// div displaying results
		var vcDisplay = $("#vcResults");
		// Remove "Loading results..." filler.
		// vcDisplay.empty();

		// List of all parks
		var vcList = data.data;

		// Populate with name header and state locat for each park.
		for(vcIndex = 0; vcIndex < vcList.length; vcIndex++) {
			const vc = vcList[vcIndex]; // Select-a-VC!
			var resBox = $("<div class='resBox'></div>"); // Box it!

			/* 
			// URL for filling template.
			const pCode = park.parkCode;
			const templateUrl = "park.html?parkCode=" + pCode;
			*/

			// const pLink = $("<a class='resLink' href=" + templateUrl + "></a>").text(park.fullName);
			const vcTitle = $("<h3></h3>").text(vc.name);
			const vcPark = $("<p></p>").text(pTitle);


			resBox.append(vcTitle);
			resBox.append(vcPark);
			vcDisplay.append(resBox);
		}
	});

	return;
}

// Campgrounds.
function dispCGRes(pTitle, pCode, query) {

	const cgURL = "https://developer.nps.gov/api/v1/campgrounds?api_key=" + API_KEY + "&parkCode=" + pCode;

	$.getJSON(cgURL, function(data) {
		// div displaying results
		var cgDisplay = $("#cgResults");
		// Remove "Loading results..." filler.
		// cgDisplay.empty();

		// List of all parks
		var cgList = data.data;

		// Populate with name header and state locat for each park.
		for(cgIndex = 0; cgIndex < cgList.length; cgIndex++) {
			const cg = cgList[cgIndex]; // Select-a-VC!
			var resBox = $("<div class='resBox'></div>"); // Box it!

			/* 
			// URL for filling template.
			const pCode = park.parkCode;
			const templateUrl = "park.html?parkCode=" + pCode;
			*/

			// const pLink = $("<a class='resLink' href=" + templateUrl + "></a>").text(park.fullName);
			const cgTitle = $("<h3></h3>").text(cg.name);
			const cgPark = $("<p></p>").text(pTitle);


			resBox.append(cgTitle);
			resBox.append(cgPark);
			cgDisplay.append(resBox);
		}
	});

	return;
}



/* SHOWING EVENT RESULTS */
function dispEventRes(pCode) {

	// URL for getting API data
	var evURL = "https://developer.nps.gov/api/v1/events?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	evURL += isolateQuery();
	// Isolate pCode!
	if (pCode != "") {
		evURL += ("&parkCode=" + pCode);
	}

	$.getJSON(evURL, function(data) { // Make request to API
		// div displaying results
		var eventDisplay = $("#eventResults");
		// Remove "Loading results..." filler.
		eventDisplay.empty();

		// List of all events
		var eventList = data.data;
		console.log("Results Found: " + eventList.length);

		if (eventList.length > 0) {
			// Populate with event title, location, start date, and potential image.
			for(eIndex = 0; eIndex < eventList.length; eIndex++) {
				const event = eventList[eIndex]; // Select-an-event!
				var resBox = $("<div class='resBox'></div>"); // Box it!

				const eTitle = $("<h3></h3>").text(event.title);
				const eLocat = $("<p></p>").text(event.parkfullname);
				const eDate = new Date(event.date);
				const eDateStr = eDate.toLocaleDateString('en-US');
				const eDatePar = $("<p></p>").text(eDateStr);


				resBox.append(eTitle);
				if (event.images.length > 0) {
					const evImgURL = event.images[0].url;
					const evImg = $("<img class='resBoxImg' src='http://www.nps.gov/" + evImgURL + "'></img>");
					resBox.append(evImg);
				}
				resBox.append(eLocat);
				resBox.append(eDatePar);
				eventDisplay.append(resBox);
			}
		}
		else {
			eventDisplay.append($('<p></p>').text('No results found.'));
		}
	});

	return;
}



/* SHOWING NEWS (NR/ALERTS) RESULTS */
function dispNewsRes() {

	var query = isolateQuery();
	dispNRRes(query, "");
	dispAlRes(query, "");

	return;
}

// News releases.
function dispNRRes(query, pCode) {

	// URL for request to API
	var newsURL = "https://developer.nps.gov/api/v1/newsreleases?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	newsURL += query;
	if (pCode != "") {
		newsURL += ("&parkCode=" + pCode);
	}

	$.getJSON(newsURL, function(data) {
		// div displaying results
		var newsDisplay = $("#newsResults");
		// Remove "Loading results..." filler.
		newsDisplay.empty();

		// List of all news releases
		var newsList = data.data;

		if (newsList.length > 0) {
			// Populate with title, date, and summary of news release.
			for(nIndex = 0; nIndex < newsList.length; nIndex++) {
				const release = newsList[nIndex]; // Select-a-release!

				const rLink = $("<a class='resLink' style='color: black;' href=" + release.url + "></a>").text(release.title);
				const rTitle = $("<h3></h3>").html(rLink);
				// Extract release date
				const rDate = new Date(Date.parse(release.releasedate.substring(0,10)));
				const rText = rDate.toLocaleDateString('en-US') + " \u2022 " + release.abstract;
				const rPara = $("<p></p>").text(rText);

				newsDisplay.append(rTitle);
				newsDisplay.append(rPara);
			}
		}
		else {
			newsDisplay.append($('<p></p>').text('No results found.'));
		}
	});

	return;
}

// Alerts.
function dispAlRes(query, pCode) {

	var alURL = "https://developer.nps.gov/api/v1/alerts?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	alURL += query;
	if (pCode != "") {
		alURL += ("&parkCode=" + pCode);
	}

	$.getJSON(alURL, function(data) {
		// div displaying results
		var alDisplay = $("#alertsResults");
		// Remove "Loading results..." filler.
		alDisplay.empty();

		// List of all alerts
		var alList = data.data;

		if (alList.length > 0) {
			// Populate with category, title, and summary of alert.
			for(alIndex = 0; alIndex < alList.length; alIndex++) {
				const alert = alList[alIndex]; // Select-an-alert!

				const alLink = $("<a class='resLink' style='color: black;' href=" + alert.url + "></a>").text(alert.category + ": " + alert.title);
				const alTitle = $("<h3></h3>").html(alLink);
				// Extract release date
				const alPara = $("<p></p>").text(alert.description);

				alDisplay.append(alTitle);
				alDisplay.append(alPara);
			}
		}
		else {
			alDisplay.append($('<p></p>').text('No results found.'));
		}
	});

	return;
}



/* SHOWING EDUCATION (LP/ARTICLES/PEOPLE/PLACES) RESULTS */
function dispEduRes() {

	var query = isolateQuery();
	dispLPRes(query, "");
	dispArRes(query, "");
	dispPplRes(query, "");
	dispPlRes(query, "");

	return;
}

// Lesson plans.
function dispLPRes(query, pCode) {

	var lpURL = "https://developer.nps.gov/api/v1/lessonplans?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	lpURL += query;
	if (pCode != "") {
		lpURL += ("&parkCode=" + pCode);
	}

	$.getJSON(lpURL, function(data) {
		// div displaying results
		var lpDisplay = $("#lpResults");
		// Remove "Loading results..." filler.
		lpDisplay.empty();

		// List of all lesson plans
		var lpList = data.data;

		if (lpList.length > 0) {
			// Populate with name, subject, and grade level of each plan.
			for(lpIndex = 0; lpIndex < lpList.length; lpIndex++) {
				const lPlan = lpList[lpIndex]; // Select-a-lesson-plan!
				var resBox = $("<div class='resBox'></div>"); // Box it!

				const lpLink = $("<a class='resLink' href=" + lPlan.url + "></a>").text(lPlan.title);
				const lpTitle = $("<h3></h3>").html(lpLink);
				const lpSub = $("<p></p>").text(lPlan.subject);
				const lpGrade = $("<p></p>").text(lPlan.gradelevel);

				resBox.append(lpTitle);
				resBox.append(lpSub);
				resBox.append(lpGrade);

				lpDisplay.append(resBox);
			}
		}
		else {
			lpDisplay.append($('<p></p>').text('No results found.'));
		}
	});

	return;
}

// Articles.
function dispArRes(query, pCode) {

	var arURL = "https://developer.nps.gov/api/v1/articles?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	arURL += query;
	if (pCode != "") {
		arURL += ("&parkCode=" + pCode);
	}

	$.getJSON(arURL, function(data) {
		// div displaying results
		var arDisplay = $("#arResults");
		// Remove "Loading results..." filler.
		arDisplay.empty();

		// List of all articles
		var arList = data.data;

		if (arList.length > 0) {
			// Populate with title, image, and description of each article
			for(arIndex = 0; arIndex < arList.length; arIndex++) {
				const article = arList[arIndex]; // Select-an-article!
				var resBox = $("<div class='resBox' style='color: black;'></div>"); // Box it!

				const arLink = $("<a class='resLink' href=" + article.url + "></a>").text(article.title);
				const arTitle = $("<h3></h3>").html(arLink);
				const arImg = $("<img class='resBoxImg' src=" + article.listingimage.url + "></img>");
				// Extract description
				const arPara = $("<p></p>").text(article.listingdescription);

				resBox.append(arTitle);
				resBox.append(arImg);
				resBox.append(arPara);

				arDisplay.append(resBox);
			}
		}
		else {
			arDisplay.append($('<p></p>').text('No results found.'));
		}
	});

	return;
}

// People.
function dispPplRes(query, pCode) {

	var pplURL = "https://developer.nps.gov/api/v1/people?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	pplURL += query;
	if (pCode != "") {
		pplURL += ("&parkCode=" + pCode);
	}

	$.getJSON(pplURL, function(data) {
		// div displaying results
		var pplDisplay = $("#pplResults");
		// Remove "Loading results..." filler.
		pplDisplay.empty();

		// List of all people
		var pplList = data.data; 

		if (pplList.length > 0) {
			// Populate with name, image, and description of each person.
			for(pplIndex = 0; pplIndex < pplList.length; pplIndex++) {
				const person = pplList[pplIndex]; // Select-a-person!
				var resBox = $("<div class='resBox'></div>"); // Box them!

				const pplLink = $("<a class='resLink' href=" + person.url + "></a>").text(person.title);
				const pplTitle = $("<h3></h3>").html(pplLink);
				const pplImg = $("<img class='resBoxImg' src=" + person.listingimage.url + "></img>");
				const pplDesc = $("<p></p>").text(person.listingdescription);

				resBox.append(pplTitle);
				resBox.append(pplImg);
				resBox.append(pplDesc);

				pplDisplay.append(resBox);
			}
		}
		else {
			pplDisplay.append($('<p></p>').text('No results found.'));
		}
	});

	return;
}

// Places.
function dispPlRes(query, pCode) {

	var plURL = "https://developer.nps.gov/api/v1/places?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	plURL += query;
	if (pCode != "") {
		plURL += ("&parkCode=" + pCode);
	}

	$.getJSON(plURL, function(data) {
		// div displaying results
		var plDisplay = $("#plResults");
		// Remove "Loading results..." filler.
		plDisplay.empty();

		// List of all places
		var plList = data.data;

		if (plList.length > 0) {
			// Populate with name header and state locat for each park.
			for(plIndex = 0; plIndex < plList.length; plIndex++) {
				const place = plList[plIndex]; // Select-a-place!
				var resBox = $("<div class='resBox'></div>"); // Box it!

				const plLink = $("<a class='resLink' href=" + place.url + "></a>").text(place.title);
				const plTitle = $("<h3></h3>").html(plLink);
				const plImg = $("<img class='resBoxImg' src=" + place.listingimage.url + "></img>");
				const plDesc = $("<p></p>").text(place.listingdescription);

				resBox.append(plTitle);
				resBox.append(plImg);
				resBox.append(plDesc);

				plDisplay.append(resBox);
			}
		}
		else {
			plDisplay.append($('<p></p>').text('No results found.'));
		}
	});

	return;
}


/* PARK-SPECIFIC PAGES */
function loadParkInfo() {

	// Get parkCode from URL.
	var pageURL = window.location.href;
	var pcPosit = pageURL.indexOf("="); // Locating pCode in URL
	const pCode = pageURL.substring(pcPosit + 1, pageURL.length);

	// URL for retrieving data from API.
	var locURL = "https://developer.nps.gov/api/v1/parks?fields=images,addresses,contacts,entranceFees,entrancePasses,operatingHours&api_key=" + API_KEY + "&parkCode=" + pCode;

	$.getJSON(locURL, function(data){

		// Extract park data
		const park = data.data[0];


		// FILLING IN TEMPLATE
		$("title").text(park.name + " | NPS Virtual Kiosk");
		// Header w/ park name
		$('#parkName').text(park.fullName);
		// Designation & URL
		$('#parkDesig').html(park.designation + " &#8226; <a style='color: black; text-decoration: underline;' href='" + park.url + "'>" + park.url + "</a></p>");

		// Img + description
		$('#parkImg').attr("src", park.images[0].url); // Image
		$('#parkDescr').text(park.description); // Description

		// Cost + weather info
		$('#cwHeader').text("Coming to " + park.name); // Cost & weather section header
		// Cost info
		var costDiv = $('#costDiv');
		const costList = [...park.entranceFees,...park.entrancePasses]; // array of fees
		for(cIndex = 0; cIndex < costList.length; cIndex++) {
			var cTitle = $("<h5></h5>"); // Cost type and price
			cTitle.text(costList[cIndex].title + ", $" + parseInt(costList[cIndex].cost).toFixed(2));
			var cDescr = $("<p></p>"); // More info
			cDescr.text(costList[cIndex].description);

			costDiv.append(cTitle);
			costDiv.append(cDescr);
		}
		// Weather info
		$('#weatherPara').text(park.weatherInfo);

		// [VC & CG INFO!!!!!!!!]

		// News releases
		dispNRRes("", pCode);

		// Education section (lesson plans, articles, people, places)
		dispLPRes("", pCode);
		dispArRes("", pCode);
		dispPplRes("", pCode);
		dispPlRes("", pCode);

		// Alerts & events side bar
		dispAlRes("", pCode);
		dispEventRes(pCode);

		// Contact info! "Getting in Touch"
		// Addresses
		var addrDisplay = $('#addressDiv');
		const pAddresses = park.addresses;
		for (addrIndex = 0; addrIndex < pAddresses.length; addrIndex++) {

			addrDisplay.append($("<h5></h5>").text(pAddresses[addrIndex].type));
			addrDisplay.append($("<p style='margin: 0px;'></p>").text(pAddresses[addrIndex].line1));
			if (pAddresses[addrIndex].line2 != "") {
				addrDisplay.append($("<p style='margin: 0px;'></p>").text(pAddresses[addrIndex].line2));
			}
			if (pAddresses[addrIndex].line3 != "") {
				addrDisplay.append($("<p style='margin: 0px;'></p>").text(pAddresses[addrIndex].line3));
			}
			addrDisplay.append($("<p style='margin: 0px;'></p>").text(pAddresses[addrIndex].city + ", " + pAddresses[addrIndex].stateCode + " " + pAddresses[addrIndex].postalCode));
		}
		// Directions
		var directInfo = $("<p></p>").html(park.directionsInfo + " For more information, see <a style='color: black; text-decoration: underline;' href=" + park.directionsUrl + ">" + park.directionsUrl + ".</a></p>")
		$('#directInfo').append(directInfo);
		// Phone
		var phoneList = park.contacts.phoneNumbers;
		for (phIndex = 0; phIndex < phoneList.length; phIndex++) {
			var headline = phoneList[phIndex].type;
			if (phoneList[phIndex].description != "") {
				headline += (", " + phoneList[phIndex].description);
			}
			$('#pDigits').append($("<h5></h5>").text(headline));
			var numLine = phoneList[phIndex].phoneNumber;
			if (phoneList[phIndex].extension != "") {
				numLine += (", " + phoneList[phIndex].extension);
			}
			$('#pDigits').append($("<p style='margin: 0px;'></p>").text(numLine));
		}
		// Email
		var emList = park.contacts.emailAddresses;
		for (emIndex = 0; emIndex < emList.length; emIndex++) {
			if (emList[emIndex].description != "") {
				$('#pEmail').append($("<h5></h5>").text(emList[emIndex].description));
			}
			$('#pEmail').append($("<p style='margin: 0px;'></p>").html("<a style='color: black;, text-decoration: none;' href='mailto:" + emList[emIndex].emailAddress+ "'>" + emList[emIndex].emailAddress + "</a></p>"));
		}
		// Hours
		var hoursList = park.operatingHours;
		var hrsDiv = $('#hoursInfo');
		for (hrIndex = 0; hrIndex < hoursList.length; hrIndex++) {
			var hrs = hoursList[hrIndex];
			hrsDiv.append($('<h5></h5>').text(hrs.name));
			hrsDiv.append($('<p style="margin: 0px;"></p>').text(hrs.description));
			hrsDiv.append($('<h6></h6>').text("Standard Hours"));

			// Each day
			var dayHrs = $('<p style="margin: 0px;"></p>').html("Sunday: <span style='text-align: right;'>" + hrs.standardHours.sunday + "</span>");
			hrsDiv.append(dayHrs);
			var dayHrs = $('<p style="margin: 0px;"></p>').html("Monday: <span style='text-align: right;'>" + hrs.standardHours.monday + "</span>");
			hrsDiv.append(dayHrs);
			var dayHrs = $('<p style="margin: 0px;"></p>').html("Tuesday: <span style='text-align: right;'>" + hrs.standardHours.tuesday + "</span>");
			hrsDiv.append(dayHrs);
			var dayHrs = $('<p style="margin: 0px;"></p>').html("Wednesday: <span style='text-align: right;'>" + hrs.standardHours.wednesday + "</span>");
			hrsDiv.append(dayHrs);
			var dayHrs = $('<p style="margin: 0px;"></p>').html("Thursday: <span style='text-align: right;'>" + hrs.standardHours.thursday + "</span>");
			hrsDiv.append(dayHrs);
			var dayHrs = $('<p style="margin: 0px;"></p>').html("Friday: <span style='text-align: right;'>" + hrs.standardHours.friday + "</span>");
			hrsDiv.append(dayHrs);
			var dayHrs = $('<p style="margin: 0px;"></p>').html("Saturday: <span style='text-align: right;'>" + hrs.standardHours.saturday + "</span>");
			hrsDiv.append(dayHrs);
		}

	});

	return;
}



