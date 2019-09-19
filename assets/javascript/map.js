function initMap(location){
    $("#spinnerMap").hide(); //hides the spinner once results load

    // Initializes map upon loading of Google Maps API
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 13
    })
    const service = new google.maps.places.PlacesService(map);
    const infowindow = new google.maps.InfoWindow(); 
    // Centers Map on user
    map.setCenter(location);
    // Populate the map with the results of 4 different type-constrained searches
    const typeBank = ['name', 'pet_store', 'park', 'veterinary_care']
    typeBank.forEach(type => {
        // Initializing request query for "dog" "places" in your area constrained by type
        let request = {
            location: location,
            radius: '200',
            query: 'dog',
            type: type
        }
        // Each search returns a list of results
        service.textSearch(request, function(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                // Creates a marker for each result
                results.forEach(result => {
                    createMarker(result);
                })
            }
        })
    });

    // Map marker factory 
    function createMarker(place){
        // Initializes icon
        let icon = {
            url: 'Images/CorgiAfraidofSun.png',
            scaledSize: new google.maps.Size(50, 50),
        }
        // Initializes marker
        let marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: icon
        });
        // When marker is clicked, an infowindow with relevant information pops up
        google.maps.event.addListener(marker, 'click', function(){
            // Initializes getDetails call request
            let request = {
                placeId: place.place_id,
                fields: ['name', 'formatted_address', 'price_level', 'rating',
                 'formatted_phone_number', 'opening_hours', 'photos', 'website'],
            };
            // A getDetails call is neccessary to get many specific fields of information
            service.getDetails(request, function(result, status){
                let infoHTML;
                if (status == google.maps.places.PlacesServiceStatus.OK){
                    infoHTML = showDetails(result);
                }
                // If error infoHTML will contain basic information from current place result
                else {
                    infoHTML = `
                    ${place.name}<br>
                    ${place.formatted_address}<br>
                    ${place.price_level}<br>
                    ${place.rating}
                    `;
                }
                infowindow.setContent(infoHTML);
                infowindow.open(map, marker);
            });
        });
    }

    function showDetails(place) {
        let dayOfWeek = moment().isoWeekday() - 1;
        // Parses the relevant fields of place into readable output
        let name = (place.name !== undefined) ? place.name : 'Unnamed';
        let address = (place.formatted_address !== undefined) ? place.formatted_address : 'No Address Given';
        let price = (place.price_level !== undefined) ? place.price_level : '';
        let rating = (place.name !== undefined) ? `Rating: ${place.name}` : 'No rating';
        let phone = (place.phone !== undefined) ? place.formatted_phone_number : 'No phone #';
        let hours = (place.opening_hours !== undefined) ? place.opening_hours.weekday_text[dayOfWeek] : ''; 
        let website = (place.website !== undefined) ? `<a href="${place.website}">Website</a>` : '';
        let image = (place.photos !== undefined) ? `<img src='${place.photos[0].getUrl({maxWidth: 150, maxHeight: 150})}'><br>` : '';
        // Compiles the place variables into one html string to return
        output = 
            `${image}
            ${name}<br>
            ${address}<br>
            ${price}<br>
            ${rating}<br>
            ${phone}<br>
            ${hours}<br>
            ${website}`;
        return output
    }
}