/* 
	MEGAN ST. HILAIRE
	searchResults.js -- This file's code implements display of different kinds of search results!
*/

const API_KEY = "";

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

/* SHOWING PARKS RESULTS */
function dispLocRes() {

	// URL for retrieving data from API.
	var locURL = "https://developer.nps.gov/api/v1/parks?api_key=" + API_KEY ;
	// Check if given query term from search bar.
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
				resBox.append(pStates);
				// Apparently park data doesn't come with pics... I was lied to?
				if (park.images) {
					const pImgURL = park.images[0].url;
					const pImg = $("<img class='resBoxImg' src='" + pImgURL + "'></img>");
					resBox.append(pImg);
				}
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
function dispEventRes() {

	// URL for getting API data
	var evURL = "https://developer.nps.gov/api/v1/events?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	evURL += isolateQuery();

	$.getJSON(evURL, function(data) { // Make request to API
		// div displaying results
		var eventDisplay = $("#eventResults");
		// Remove "Loading results..." filler.
		eventDisplay.empty();

		// List of all parks
		var eventList = data.data;
		console.log("Results Found: " + eventList.length);

		if (eventList.length > 0) {
			// Populate with name header and state locat for each park.
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
	dispNRRes(query);
	dispAlRes(query);

	return;
}

// News releases.
function dispNRRes(query) {

	// URL for request to API
	var newsURL = "https://developer.nps.gov/api/v1/newsreleases?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	newsURL += query;

	$.getJSON(newsURL, function(data) {
		// div displaying results
		var newsDisplay = $("#newsResults");
		// Remove "Loading results..." filler.
		newsDisplay.empty();

		// List of all parks
		var newsList = data.data;

		if (newsList.length > 0) {
			// Populate with name header and state locat for each park.
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
function dispAlRes(query) {

	var alURL = "https://developer.nps.gov/api/v1/alerts?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	alURL += query;

	$.getJSON(alURL, function(data) {
		// div displaying results
		var alDisplay = $("#alertsResults");
		// Remove "Loading results..." filler.
		alDisplay.empty();

		// List of all parks
		var alList = data.data;

		if (alList.length > 0) {
			// Populate with name header and state locat for each park.
			for(alIndex = 0; alIndex < alList.length; alIndex++) {
				const alert = alList[alIndex]; // Select-a-release!

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
	dispLPRes(query);
	dispArRes(query);
	dispPplRes(query);
	dispPlRes(query);

	return;
}

// Lesson plans.
function dispLPRes(query) {

	var lpURL = "https://developer.nps.gov/api/v1/lessonplans?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	lpURL += query;

	$.getJSON(lpURL, function(data) {
		// div displaying results
		var lpDisplay = $("#lpResults");
		// Remove "Loading results..." filler.
		lpDisplay.empty();

		// List of all parks
		var lpList = data.data;

		if (lpList.length > 0) {
			// Populate with name header and state locat for each park.
			for(lpIndex = 0; lpIndex < lpList.length; lpIndex++) {
				const lPlan = lpList[lpIndex]; // Select-a-release!
				var resBox = $("<div class='resBox'></div>"); // Box it!

				const lpLink = $("<a class='resLink' href=" + lPlan.url + "></a>").text(lPlan.title);
				const lpTitle = $("<h3></h3>").html(lpLink);
				// Extract release date
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
function dispArRes(query) {

	var arURL = "https://developer.nps.gov/api/v1/articles?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	arURL += query;

	$.getJSON(arURL, function(data) {
		// div displaying results
		var arDisplay = $("#arResults");
		// Remove "Loading results..." filler.
		arDisplay.empty();

		// List of all parks
		var arList = data.data;

		if (arList.length > 0) {
			// Populate with name header and state locat for each park.
			for(arIndex = 0; arIndex < arList.length; arIndex++) {
				const article = arList[arIndex]; // Select-a-release!
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
function dispPplRes(query) {

	var pplURL = "https://developer.nps.gov/api/v1/people?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	pplURL += query;

	$.getJSON(pplURL, function(data) {
		// div displaying results
		var pplDisplay = $("#pplResults");
		// Remove "Loading results..." filler.
		pplDisplay.empty();

		// List of all parks
		var pplList = data.data; 

		if (pplList.length > 0) {
			// Populate with name header and state locat for each park.
			for(pplIndex = 0; pplIndex < pplList.length; pplIndex++) {
				const person = pplList[pplIndex]; // Select-a-release!
				var resBox = $("<div class='resBox'></div>"); // Box it!

				const pplLink = $("<a class='resLink' href=" + person.url + "></a>").text(person.title);
				const pplTitle = $("<h3></h3>").html(pplLink);
				const pplImg = $("<img class='resBoxImg' src=" + person.listingimage.url + "></img>");
				// Extract description
				const pplDesc = $("<p></p>").text(person.listingdescription);
				// const lpGrade = $("<p></p>").text(lPlan.gradelevel);

				resBox.append(pplTitle);
				resBox.append(pplImg);
				resBox.append(pplDesc);
				// resBox.append(lpGrade);

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
function dispPlRes(query) {

	var plURL = "https://developer.nps.gov/api/v1/places?api_key=" + API_KEY ;
	// Check if given query term from search bar.
	plURL += query;

	$.getJSON(plURL, function(data) {
		// div displaying results
		var plDisplay = $("#plResults");
		// Remove "Loading results..." filler.
		plDisplay.empty();

		// List of all parks
		var plList = data.data;

		if (plList.length > 0) {
			// Populate with name header and state locat for each park.
			for(plIndex = 0; plIndex < plList.length; plIndex++) {
				const place = plList[plIndex]; // Select-a-release!
				var resBox = $("<div class='resBox'></div>"); // Box it!

				const plLink = $("<a class='resLink' href=" + place.url + "></a>").text(place.title);
				const plTitle = $("<h3></h3>").html(plLink);
				const plImg = $("<img class='resBoxImg' src=" + place.listingimage.url + "></img>");
				// Extract description.
				const plDesc = $("<p></p>").text(place.listingdescription);
				// const lpGrade = $("<p></p>").text(lPlan.gradelevel);

				resBox.append(plTitle);
				resBox.append(plImg);
				resBox.append(plDesc);
				// resBox.append(lpGrade);

				plDisplay.append(resBox);
			}
		}
		else {
			plDisplay.append($('<p></p>').text('No results found.'));
		}
	});

	return;
}