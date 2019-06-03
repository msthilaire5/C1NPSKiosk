/* 
	MEGAN ST. HILAIRE
	searchResults.js -- This file's code implements display of different kinds of search results!
*/

const API_KEY = "";

function dispLocRes() {

	const locURL = "https://developer.nps.gov/api/v1/parks?api_key=" + API_KEY ;

	var apiReq = new XMLHttpRequest();

	apiReq.open('GET', locURL, true);
	apiReq.onload = function() {
		// div displaying results
		var parkDisplay = document.getElementById('locationResults');
		while (parkDisplay.firstChild) {
	    	parkDisplay.removeChild(parkDisplay.firstChild);
		}

		var parkList = JSON.parse(this.response).data;

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

	return;
}