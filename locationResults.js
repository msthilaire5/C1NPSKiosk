/* 
	MEGAN ST. HILAIRE
	locationResults.js -- This file's code implements display of park/visitor center/campground locations!
*/

const API_KEY = "k8aznKvAdbVkBiEUBIuYA7h4Aq1z8154urrJZLD8";

const locURL = "https://developer.nps.gov/api/v1/parks?api_key=" + API_KEY ;

var apiReq = new XMLHTTPRequest();

apiReq.open('GET', locURL, true);
apiReq.onload = function() {
	// div displaying results
	var parkDisplay = document.getElementById('locationResults');

	var parkList = JSON.parse(this.response);

	for(pIndex = 0; pIndex < 50; pIndex++) {
		park = parkList[pIndex];

		const pTitle = document.createElement('h3');
		pTitle.textContent = park.fullName;

		const pStates = document.createElement('p');
		pStates.textContent = park.states;

		parkDisplay.appendChild(pTitle);
		parkDisplay.appendChild(pStates);
	}
};
apiReq.send();