/* MEGAN ST. HILAIRE
   peLightbox.js — This file contains JavaScript for displaying the lightbox ("modal") that gives more information about a specific park/event.
*/

function dispParkLB(pCode) {

	// Retrieve park data!
	var locURL = "https://developer.nps.gov/api/v1/parks?fields=images,addresses,contacts,entranceFees,entrancePasses,operatingHours&api_key=" + API_KEY + "&parkCode=" + pCode;
	$.getJSON(locURL, function(data) {
		// Extract park data
		const park = data.data[0];

		// Build template
		// Overall Lightbox
		var lbPlusBG = $("<div class='locLBBG'></div>");
		var lb = $("<div class='locLB'></div>");

		// LB HEADER
		var lbHeader = $("<div class='locLBHeader'></div>");
		var lbHeaderTxt = $("<h1></h1>").text(park.fullName);
		var lbCloseButton = $("<span class='lbClose'></span>").html("&times;");
		var lbSubtitle = $("<p>" + park.designation + " \u2022 " + "<a class='resLink' style='color: black;' href=" + park.url + "></a></p>");
		// Filling header div
		lbHeader.append(lbHeaderTxt);
		lbHeader.append(lbCloseButton);
		lbHeader.append(lbSubtitle);

		// LB BODY, contains both columns
		var lbBody = $("<div></div>");
		// Left column
		var leftCol = $("<div class='lbCol leftCol'></div>");
		// Img & description
		var imgDesc = $("<div></div>");
		var pImg = $("<img class='lbImg' src='" + park.images[0].url + "'></img>");
		var pDesc = $("<p class='lbDesc'></p>").text(park.description);
		// Filling imgDesc div
		imgDesc.append(pImg);
		imgDesc.append(pDesc);
		leftCol.append(imgDesc);

		// Cost & weather info
		var costWeath = $("<div></div>");
		var cwHeader = $("<h3 class='colHeader'></h3>").text("Coming to " + park.fullName);
		// Cost in left col
		var costDiv = $("<div class='leftCol'></div>");
		const cHeader = $("<h4></h4>").text("Costs");
		costDiv.append(cHeader);
		



		// Append to body
		lb.append(lbHeader);
		lb.append(lbBody);
		// Add footer
		lbPlusBG.append(lb);
		$("body").append(lbPlusBG);

		// Show!!
	});

}

// Displaying the event lightbox.
function dispEventLB(evID) {
	
}