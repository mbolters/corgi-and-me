$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBWQ-sFtacE3m0IMYrFlP7w_dgNQpL-bBw&libraries=places,geometry', function(){
    // Initializes map upon loading of Google Maps API
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 13
    })
    const service = new google.maps.places.PlacesService(map);
    const infowindow = new google.maps.InfoWindow(); 
    let latLng;
    // Calls W3C geolocation feature of user's browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let userLat = position.coords.latitude;
            let userLng = position.coords.longitude;
            // Casts user coordinates as a Google Maps LatLng object
            latLng = new google.maps.LatLng(userLat, userLng);
            // Centers the Map on user
            map.setCenter(latLng);
            // Have a search for each individual type
            // This will populate the map with the results of 4 different type-constrained searches
            const typeBank = ['name', 'pet_store', 'park', 'veterinary_care']
            typeBank.forEach(type => {
                // Initializing request query for "dog" "places" in your area constrained by type
                let request = {
                    location: latLng,
                    radius: '200',
                    query: 'dog',
                    type: type
                }
                service.textSearch(request, function(results, status){
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        results.forEach(result => {
                            createMarker(result);
                        })
                    }
                })
            });
        })
    }

    // Map marker factory with CorgiAfraidofSun.jpeg as placeholder icon
    function createMarker(place){
        let icon = {
            url: 'Images/CorgiAfraidofSun.jpeg',
            scaledSize: new google.maps.Size(50, 50),
        }
        let marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: icon
        });
        google.maps.event.addListener(marker, 'click', function() {
            let request = {
                placeId: place.place_id,
                fields: ['name', 'formatted_address', 'price_level', 'rating',
                 'formatted_phone_number', 'opening_hours', 'photos', 'website'],
            };
            service.getDetails(request, function(result, status){
                console.log(result);
                let newPlace;
                if (status == google.maps.places.PlacesServiceStatus.OK){
                    newPlace = 'test';
                    console.log(newPlace);
                    let dayOfWeek = moment().isoWeekday() - 1;
                    let html = `
                    <img src='${result.photos[0].getUrl({maxWidth: 150, maxHeight: 150})}'><br>
                    ${result.name}<br>
                    ${result.formatted_address}<br>
                    ${result.price_level}<br>
                    ${result.rating}<br>
                    ${result.formatted_phone_number}<br>
                    ${result.opening_hours.weekday_text[dayOfWeek]}<br>
                    <a href="${result.website}">Website</a>`;
                    infowindow.setContent(html);
                }
                else {
                    let html = `
                    ${place.name}<br>${place.formatted_address}<br>${place.price_level}<br>${place.rating}`;
                    infowindow.setContent(html);
                }
            })
            infowindow.open(map, this);
        });
    }
})