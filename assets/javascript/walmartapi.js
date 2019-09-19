function initShopping(){
	//this is the Walmart API search 
	let walmartLink = "https://www.walmart.com/ip/";
	let productID = ["417529705", "161250671", "15580429"]

	var settings = [{
		"async": true,
		"crossDomain": true,
		"url": "https://feeditem-walmart.p.rapidapi.com/itemID/" + productID[0],
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "feeditem-walmart.p.rapidapi.com",
			"x-rapidapi-key": "290be0fd14mshdbddbf002f394adp1bd091jsn91fedda5b4f3"
		}
	},
	{
		"async": true,
		"crossDomain": true,
		"url": "https://feeditem-walmart.p.rapidapi.com/itemID/" + productID[1],
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "feeditem-walmart.p.rapidapi.com",
			"x-rapidapi-key": "290be0fd14mshdbddbf002f394adp1bd091jsn91fedda5b4f3"
		}
	},
	{
		"async": true,
		"crossDomain": true,
		"url": "https://feeditem-walmart.p.rapidapi.com/itemID/" + productID[2],
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "feeditem-walmart.p.rapidapi.com",
			"x-rapidapi-key": "290be0fd14mshdbddbf002f394adp1bd091jsn91fedda5b4f3"
		}
	}];


	$.ajax(settings[0]).done(function (response) {
		$("#spinner").hide(); //hides the spinner once results load
		let price = response.Item.CurrentPrice.Value;
		$("#firstLink").attr("href", walmartLink + productID[0]);
		$( "<img>" ).addClass("imageSize").attr( "src", response.Item.PictureURL[2]).appendTo( "#firstLink" );
		$("#price1").append("$" + price);



	});



	$.ajax(settings[1]).done(function (response) {
		$("#spinner").hide(); //hides the spinner once results load
		let price = response.Item.CurrentPrice.Value;
		$("#secondLink").attr("href", walmartLink + productID[1]);
		$( "<img>" ).addClass("imageSize").attr( "src", response.Item.PictureURL[0]).appendTo( "#secondLink" );
		$("#price2").append("$" + price);
	});


	$.ajax(settings[2]).done(function (response) {
		$("#spinner").hide(); //hides the spinner once results load
		let price = response.Item.CurrentPrice.Value;
		$("#thirdLink").attr("href", walmartLink + productID[2]);
		$( "<img>" ).addClass("imageSize").attr( "src", response.Item.PictureURL[1]).appendTo( "#thirdLink" );
		$("#price3").append("$" + price);
	});
}
	//Get 'er done Marie
		//create about page and link
		//select items per weather condition to display
		//adorable corgi images for weather