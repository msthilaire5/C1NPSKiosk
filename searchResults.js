/* 
	MEGAN ST. HILAIRE
	searchResults.js -- This file's code implements display of different kinds of search results!
*/

const API_KEY = "";

function dispLocRes() {

	const locURL = "https://developer.nps.gov/api/v1/parks?api_key=" + API_KEY ;

	$.getJSON(locURL, function(data) {
		// div displaying results
		var parkDisplay = $("#locationResults");
		// Remove "Loading results..." filler.
		parkDisplay.empty();

		// List of all parks
		var parkList = data.data;

		// Populate with name header and state locat for each park.
		for(pIndex = 0; pIndex < 52; pIndex++) {
			park = parkList[pIndex]; // Select-a-park!
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
			event = eventList[eIndex]; // Select-an-event!
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

function dispNewsRes() {

	const newsURL = "https://developer.nps.gov/api/v1/news?api_key=" + API_KEY ;

	$.getJSON(newsURL, function(data) {
		// div displaying results
		var newsDisplay = $("#newsResults");
		// Remove "Loading results..." filler.
		newsDisplay.empty();

		// List of all parks
		var newsList = data.data;

		// Populate with name header and state locat for each park.
		for(nIndex = 0; nIndex < 52; nIndex++) {
			release = newsList[nIndex]; // Select-a-release!

			const rLink = $("<a class='resLink' href=" + release.url + "></a>").text(release.title);
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