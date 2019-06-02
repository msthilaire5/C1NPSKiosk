/* 
	MEGAN ST. HILAIRE
	locationResults.js -- This file's code implements display of park/visitor center/campground locations!
*/

const API_KEY = "k8aznKvAdbVkBiEUBIuYA7h4Aq1z8154urrJZLD8"

function dispLocRes() {

	$.ajax({
		url: "https://developer.nps.gov/api/v1/parks",
		dataType: "json",
		headers: {"Authorization": API_KEY},
		success: function(data) {

			// div displaying results
			var parkDisplay = $("#locationResults");

			var parkList = data.data;

			for(pIndex = 0; pIndex < 50; pIndex++) {
				park = parkList[pIndex];

				var pContent = "<h3>" + park.fullName + "</h3>";
				pContent = pContent + "<p>" + park.states + "</p>";

				parkDisplay.append(pContent);

			}

		}
	});

}