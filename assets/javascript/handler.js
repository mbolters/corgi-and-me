$(document).ready(function(){
    // Calls Google Maps API asynchronously
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBWQ-sFtacE3m0IMYrFlP7w_dgNQpL-bBw&libraries=places,geometry', function(){
        let geocoder = new google.maps.Geocoder;
        // Initialize user object
        let user = {
            location:{
                lat: 0,
                lng: 0,
            },
            latLng: {},
            place:{
                country: '',
                region: '',
                city: ''
            }
        }
        // Checks for Browser Geolocation
        if (navigator.geolocation){
            // Calls the browser location asynchronously
            navigator.geolocation.getCurrentPosition(function(position) {
                // Stores an object, User, with both coordinates and a google maps LatLng object
                user.location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                user.latLng = new google.maps.LatLng(user.location.lat, user.location.lng)
                // Retrieve place data (city, state, country) from reverse geocoding
                geocoder.geocode({'location': user.latLng}, function(results, status) {
                    if (status === 'OK') {
                      if (results[0]) {
                        user.place = {
                            country: results[0].address_components[6].long_name.replace(' ', '_'),
                            region: results[0].address_components[5].long_name.replace(' ', '_'),
                            city: results[0].address_components[3].long_name.replace(' ', '_'),
                        }
                      } else {
                        console.log('No place results found');
                      }
                    } else {
                      console.log('Geocoder failed due to: ' + status);
                    }
                    // Passes user information to mainInitializer function 
                    mainInitializer(user);
                });
            // If access blocked, then will get address as input from user 
            }, manualLocation(geocoder, user));
        }
        // If no Broswer Geolocation
        else {
            // Will get address as user input instead
            manualLocation(geocoder, user);
        }
    })

    function manualLocation(geocoder, user){
        return function(){
            $('#exampleModalCenter').modal('show');
            // Adds listener for submission of location
            $('#location-form').on('submit', function(e){
                e.preventDefault();
                geocoder.geocode({'address': $('#location-input').val()}, function(results, status){
                    if (status === 'OK'){
                        // Stores an object, User, with both coordinates and a google maps LatLng object
                        user.location = {
                                lat: results[0].geometry.location.lat(),
                                lng: results[0].geometry.location.lng(),
                            }
                        user.latLng = results[0].geometry.location;
                        user.place = {
                                country: results[0].address_components[6].long_name.replace(' ', '_'),
                                region: results[0].address_components[5].long_name.replace(' ', '_'),
                                city: results[0].address_components[3].long_name.replace(' ', '_'),
                            }
                        $('#exampleModalCenter').modal('hide');
                        mainInitializer(user);
                    }
                    else{
                        console.log('Geocoder failed due to: ' + status);
                        $('#location-input').val('');
                        $('#popup-text').text('Something went wrong! Double check your location and try again!');
                    }
                })
            })
        }
            // Uses places api to obtain coordinates of location
                // If valid location
                    // Initializes user object
                    // Closes Modal
                    // Calls mainInitializer
                // Else
                    // Prompts user to try again
    }

    function mainInitializer(user){
        // Calls initMap passing userLatLng for location
        initMap(user.latLng);
        // When initWeather and initPollen have resolved
        initTemp(user.location);
        initPollen(user.place);
        initShopping();
            // Call initShopping and pass tempData and pollenData
            // ...or not if the search is not at all initialized
            // even if search is not initialized, just need an array of product ids
            // that can easily be done
    }
})      