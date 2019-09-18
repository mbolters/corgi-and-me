//start jQuery
$(document).ready(function(){


//this is the Walmart API search 

var productID = "17018181";

var walmartObjects = [];

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://feeditem-walmart.p.rapidapi.com/itemID/" + productID,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "feeditem-walmart.p.rapidapi.com",
		"x-rapidapi-key": "290be0fd14mshdbddbf002f394adp1bd091jsn91fedda5b4f3"
	}
}

$.ajax(settings).done(function (response) {
    $("#spinner").hide(); //hides the spinner once results load
    let image = response.Item.PictureURL[4];
    let title = response.Item.Title;
    let price = response.Item.CurrentPrice.Value;
    $( "<img>" ).addClass("imageSize").attr( "src", image).appendTo( "#imageSpace1" );

    // $(".image").css("image", url("image"));

    $(".title1").append(title);
    $(".price1").append(price);







    // walmartObjects[0] = response.Item;
	console.log(response.Item.Title);
    console.log(response.Item.CurrentPrice.Value);
    console.log(response.Item.PictureURL[5]);
});
});
//Get 'er done Marie
    //make the spinner hide when the API loads the items    
    //create about page and link
    //select 5 items per weather condition to display
    //make 5 items show up in box
        //make sure this includes price, image, and title
    //add any spinners necessary for teammates
    //adorable corgi images for weather
