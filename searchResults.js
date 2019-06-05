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
		for(pIndex = 0; pIndex < 50; pIndex++) {
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