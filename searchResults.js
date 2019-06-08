/* 
	MEGAN ST. HILAIRE
	searchResults.js -- This file's code implements display of different kinds of search results!
*/

const API_KEY = "";

/* SHOWING PARKS RESULTS */
function dispLocRes() {

	const locURL = "https://developer.nps.gov/api/v1/parks?api_key=" + API_KEY ;
	query = "";

	$.getJSON(locURL, function(data) {
		// div displaying results
		var parkDisplay = $("#locationResults");
		// Remove "Loading results..." filler.
		parkDisplay.empty();

		// List of all parks
		var parkList = data.data;

		// Populate with name header and state locat for each park.
		for(pIndex = 0; pIndex < 52; pIndex++) {
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
			/* Apparently park data doesn't come with pics... I was lied to?
			if (park.images) {
				const pImgURL = park.images[0].url;
				const pImg = $("<img class='resBoxImg' src='" + pImgURL + "'></img>");
				resBox.append(pImg);
			}
			*/
			parkDisplay.append(resBox);
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

	const evURL = "https://developer.nps.gov/api/v1/events?api_key=" + API_KEY ;

	$.getJSON(evURL, function(data) {
		// div displaying results
		var eventDisplay = $("#eventResults");
		// Remove "Loading results..." filler.
		eventDisplay.empty();

		// List of all parks
		var eventList = data.data;

		// Populate with name header and state locat for each park.
		for(eIndex = 0; eIndex < 50; eIndex++) {
			const event = eventList[eIndex]; // Select-an-event!
			var resBox = $("<div class='resBox'></div>"); // Box it!

			const eTitle = $("<h3></h3>").text(event.title);
			const eLocat = $("<p></p>").text(event.parkfullname);
			const eDate = new Date(event.date);
			const eDateStr = eDate.toDateString();
			const eDatePar = $("<p></p>").text(eDateStr);


			resBox.append(eTitle);
			resBox.append(eLocat);
			resBox.append(eDatePar);
			eventDisplay.append(resBox);
		}
	});

	return;
}



/* SHOWING NEWS (NR/ALERTS) RESULTS */
function dispNewsRes() {

	dispNRRes();
	dispAlRes();

	return;
}

// News releases.
function dispNRRes() {

	const newsURL = "https://developer.nps.gov/api/v1/newsreleases?api_key=" + API_KEY ;

	$.getJSON(newsURL, function(data) {
		// div displaying results
		var newsDisplay = $("#newsResults");
		// Remove "Loading results..." filler.
		newsDisplay.empty();

		// List of all parks
		var newsList = data.data;

		// Populate with name header and state locat for each park.
		for(nIndex = 0; nIndex < 52; nIndex++) {
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
	});

	return;
}

// Alerts.
function dispAlRes() {

	const alURL = "https://developer.nps.gov/api/v1/alerts?api_key=" + API_KEY ;

	$.getJSON(alURL, function(data) {
		// div displaying results
		var alDisplay = $("#alertsResults");
		// Remove "Loading results..." filler.
		alDisplay.empty();

		// List of all parks
		var alList = data.data;

		// Populate with name header and state locat for each park.
		for(alIndex = 0; alIndex < 52; alIndex++) {
			const alert = alList[alIndex]; // Select-a-release!

			const alLink = $("<a class='resLink' style='color: black;' href=" + alert.url + "></a>").text(alert.category + ": " + alert.title);
			const alTitle = $("<h3></h3>").html(alLink);
			// Extract release date
			const alPara = $("<p></p>").text(alert.description);

			alDisplay.append(alTitle);
			alDisplay.append(alPara);
		}
	});

	return;
}



/* SHOWING EDUCATION (LP/ARTICLES/PEOPLE/PLACES) RESULTS */
function dispEduRes() {

	dispLPRes();
	dispArRes();
	dispPplRes();
	dispPlRes();

	return;
}

// Lesson plans.
function dispLPRes() {

	const lpURL = "https://developer.nps.gov/api/v1/lessonplans?api_key=" + API_KEY ;

	$.getJSON(lpURL, function(data) {
		// div displaying results
		var lpDisplay = $("#lpResults");
		// Remove "Loading results..." filler.
		lpDisplay.empty();

		// List of all parks
		var lpList = data.data;

		// Populate with name header and state locat for each park.
		for(lpIndex = 0; lpIndex < 52; lpIndex++) {
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
	});

	return;
}

// Articles.
function dispArRes() {

	const arURL = "https://developer.nps.gov/api/v1/articles?api_key=" + API_KEY ;

	$.getJSON(arURL, function(data) {
		// div displaying results
		var arDisplay = $("#arResults");
		// Remove "Loading results..." filler.
		arDisplay.empty();

		// List of all parks
		var arList = data.data;

		// Populate with name header and state locat for each park.
		for(arIndex = 0; arIndex < 52; arIndex++) {
			const article = arList[arIndex]; // Select-a-release!
			var resBox = $("<div class='resBox'></div>"); // Box it!

			const arLink = $("<a class='resLink' href=" + article.url + "></a>").text(article.title);
			const arTitle = $("<h3></h3>").html(arLink);
			// Extract description
			const arPara = $("<p></p>").text(article.listingdescription);

			arDisplay.append(arTitle);
			arDisplay.append(arPara);
		}
	});

	return;
}

// People.
function dispPplRes() {

	const pplURL = "https://developer.nps.gov/api/v1/people?api_key=" + API_KEY ;

	$.getJSON(pplURL, function(data) {
		// div displaying results
		var pplDisplay = $("#pplResults");
		// Remove "Loading results..." filler.
		pplDisplay.empty();

		// List of all parks
		var pplList = data.data;

		// Populate with name header and state locat for each park.
		for(pplIndex = 0; pplIndex < 52; pplIndex++) {
			const person = pplList[pplIndex]; // Select-a-release!
			var resBox = $("<div class='resBox'></div>"); // Box it!

			const pplLink = $("<a class='resLink' href=" + person.url + "></a>").text(person.title);
			const pplTitle = $("<h3></h3>").html(pplLink);
			// Extract description
			const pplDesc = $("<p></p>").text(ppl.listingdescription);
			// const lpGrade = $("<p></p>").text(lPlan.gradelevel);

			resBox.append(pplTitle);
			resBox.append(pplDesc);
			// resBox.append(lpGrade);

			pplDisplay.append(resBox);
		}
	});

	return;
}

// Places.
function dispPlRes() {

	const plURL = "https://developer.nps.gov/api/v1/places?api_key=" + API_KEY ;

	$.getJSON(plURL, function(data) {
		// div displaying results
		var plDisplay = $("#plResults");
		// Remove "Loading results..." filler.
		plDisplay.empty();

		// List of all parks
		var plList = data.data;

		// Populate with name header and state locat for each park.
		for(plIndex = 0; plIndex < 52; plIndex++) {
			const place = plList[plIndex]; // Select-a-release!
			var resBox = $("<div class='resBox'></div>"); // Box it!

			const plLink = $("<a class='resLink' href=" + place.url + "></a>").text(place.title);
			const plTitle = $("<h3></h3>").html(plLink);
			// Extract description.
			const plDesc = $("<p></p>").text(person.listingdescription);
			// const lpGrade = $("<p></p>").text(lPlan.gradelevel);

			resBox.append(plTitle);
			resBox.append(plDesc);
			// resBox.append(lpGrade);

			plDisplay.append(resBox);
		}
	});

	return;
}