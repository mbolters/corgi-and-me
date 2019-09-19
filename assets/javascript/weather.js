const APIKey = "0c6668971156042fde49c6adad3e262d";

function initTemp(location) {
    $("#spinnerTemp").hide(); //hides the spinner once results load

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&cnt=8&appid=${APIKey}`,
        method: "GET"
    }).then(function(response) {
        const tempK = response.list[0].main.temp;
        console.log(tempK);
        const tempF = Math.round((tempK - 273.15) * 9/5 + 32);
        console.log(tempF);
        $("#temp-card").append("<h3 id='temp-val'>" + tempF + "° F</h3>");
        $("#temp-val").css("margin-left", "30%");
        $("#temp-val").css("margin-right", "30%");
        tempColor(tempF);

    }).catch(function(error) {
        console.log("AJAX GET failed");
    });
}

function tempColor(temp) {
    if (temp > 110) {
        $("#temp-val").css("background-color", "rgba(150,0,0,0.66)");
    } else if (temp > 100) {
        $("#temp-val").css("background-color", "rgba(200,0,0,0.66)");
    } else if (temp > 90) {
        $("#temp-val").css("background-color", "rgba(255,0,0,0.66)");
    } else if (temp > 80) {
        $("#temp-val").css("background-color", "rgba(255,130,0,0.66)");
    } else if (temp > 70) {
        $("#temp-val").css("background-color", "rgba(255,192,0,0.66)");
    } else if (temp > 60) {
        $("#temp-val").css("background-color", "rgba(255,255,0,0.66)");
    } else if (temp > 50) {
        $("#temp-val").css("background-color", "rgba(204,230,40,0.66)");
    } else if (temp > 40) {
        $("#temp-val").css("background-color", "rgba(146,208,80,0.66)");
    } else {
        $("#temp-val").css("background-color", "rgba(115,190,211,0.66)");
    };
}
    
// Above 110F: Extremely hot
// 100 to 110F: Excessively hot
// 90 to 100F: Very hot
// 80 to 90F: Hot
// 70 to 80F: Very warm
// 60 to 70F: Warm
// 50 to 60F: Mild
// 40 to 50F: Cool
// 30 to 40F: Chilly

function initPollen(location){
    let station = pollenStations[location.country][location.region][location.city];
    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/http://pollen.aaaai.org/nab/index.cfm?p=allergenreport&stationid=${station}`,
        method: "GET"
    }).then(function(response) {
        let startHere = "<!-- BEGIN CONTENT -->";
        let endHere = "View Calendar of Data";
        let startIndex = response.search(startHere);
        let endIndex = response.search(endHere);
        
        const slicedResponse = response.slice(startIndex,endIndex);

        // for Trees
        startHere = '<div class="box-1">';
        endHere = '<div class="box-2">';
        startIndex = slicedResponse.search(startHere);
        endIndex = slicedResponse.search(endHere);

        const forTrees = slicedResponse.slice(startIndex,endIndex);
        const pollenTrees = getPollen(forTrees);

        // for Weeds
        startHere = '<div class="box-2">';
        endHere = '<div class="box-3">';
        startIndex = slicedResponse.search(startHere);
        endIndex = slicedResponse.search(endHere);

        const forWeeds = slicedResponse.slice(startIndex,endIndex);
        const pollenWeeds = getPollen(forWeeds);

        // for Grass
        startHere = '<div class="box-3">';
        endHere = '<div class="box-4">';
        startIndex = slicedResponse.search(startHere);
        endIndex = slicedResponse.search(endHere);

        const forGrass = slicedResponse.slice(startIndex,endIndex);
        const pollenGrass = getPollen(forGrass);

        // for Mold
        startHere = '<div class="box-4">';
        startIndex = slicedResponse.search(startHere);

        const forMold = slicedResponse.slice(startIndex);
        const pollenMold = getPollen(forMold);

        // display the four pollen counts
        const pollenCounts = [];
        pollenCounts.push(pollenTrees);
        pollenCounts.push(pollenWeeds);
        pollenCounts.push(pollenGrass);
        pollenCounts.push(pollenMold);
        const pollenColors = [];
        for (i=0; i<pollenCounts.length; i++) {
            if (pollenCounts[i] === "reportveryhigh") {
                pollenCounts[i] = "very high";
                pollenColors[i] = "rgba(255,0,0,0.66)";
            } else if (pollenCounts[i] === "reporthigh") {
                pollenCounts[i] = "high";
                pollenColors[i] = "rgba(255,204,0,0.66)";
            } else if (pollenCounts[i] === "reportmoderate") {
                pollenCounts[i] = "moderate";
                pollenColors[i] = "rgba(255,255,102,0.66)";
            } else if (pollenCounts[i] === "reportlow") {
                pollenCounts[i] = "low";
                pollenColors[i] = "rgba(204,255,204,0.66)";
            } else {
                pollenColors[i] = "transparent";
            }
        }
        displayPollen(pollenCounts,pollenColors);

    }).catch(function(error) {
        console.log(error.code);
        console.log("error as above");
    });
}

function displayPollen(counts,colors) {
    const pollenCard = $("<br><div><h4>Pollen Counts</h4></div>");
    pollenCard.append("<h3 style='background-color: " + colors[0] + "'>Trees: " + counts[0] + "</h3>");
    pollenCard.append("<h3 style='background-color: " + colors[1] + "'>Weeds: " + counts[1] + "</h3>");
    pollenCard.append("<h3 style='background-color: " + colors[2] + "'>Grass: " + counts[2] + "</h3>");
    pollenCard.append("<h3 style='background-color: " + colors[3] + "'>Mold: " + counts[3] + "</h3>");

    $("#temp-card").append(pollenCard);
}

function getPollen(data) {

    const startHere = '<div class="nabCount">';
    const endHere = '<div class="nabInfo">';
    const startIndex = data.search(startHere);
    const endIndex = data.search(endHere);
    
    const slicedData = data.slice(startIndex,endIndex);

    const leadStr = '<img src="images/';
    const trailStr = '.gif" border="0">';

    return slicedData.match(new RegExp(leadStr + "(.*)" + trailStr))[1];
}