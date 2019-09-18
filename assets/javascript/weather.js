const APIKey = "0c6668971156042fde49c6adad3e262d";
const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=Austin,US&cnt=8&appid=" + APIKey;

$.ajax({
    url: queryURL,
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

function tempColor(temp) {
    if (temp > 110) {
        $("#temp-val").css("background-color", "rgb(150,0,0)");
    } else if (temp > 100) {
        $("#temp-val").css("background-color", "rgb(200,0,0)");
    } else if (temp > 90) {
        $("#temp-val").css("background-color", "rgb(255,0,0)");
    } else if (temp > 80) {
        $("#temp-val").css("background-color", "rgb(255,130,0)");
    } else if (temp > 70) {
        $("#temp-val").css("background-color", "rgb(255,192,0)");
    } else if (temp > 60) {
        $("#temp-val").css("background-color", "rgb(255,255,0)");
    } else if (temp > 50) {
        $("#temp-val").css("background-color", "rgb(204,230,40)");
    } else if (temp > 40) {
        $("#temp-val").css("background-color", "rgb(146,208,80)");
    } else {
        $("#temp-val").css("background-color", "rgb(115,190,211)");
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