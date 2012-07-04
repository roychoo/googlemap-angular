'use strict';

/* Directives */


var directives = angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

/*
directives.directive('myApp.directives', []).
  directive('map', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {
            console.log(element);
            console.log(scope.country);
            var country = scope.country;



            var myOptions = {
                zoom: 6,
               // center: new google.maps.LatLng(46.87916, -3.32910),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
            var geocoder = new google.maps.Geocoder();
            var countryLoc;
            geocoder.geocode( {'address' : country}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    countryLoc = results[0].geometry.location;
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(8);


                    var latlng = new google.maps.LatLng(countryLoc.lat(), countryLoc.lng());
                    console.log("logging..." + countryLoc.lat());
                    //var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
                    var request = {
                        location: latlng,
                        radius: '100000',
                        query: 'attractions'
                    }
                    var service = new google.maps.places.PlacesService(map);
                    service.search(request, callback);

                }
            });

            function callback(results, status) {
                console.log("Coming in " + status.toString());
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    console.log(results.toString());

                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];

                        createMarker(results[i]);
                        console.log(results[i].icon.toString() + "result123s");
                    }
                }
            }

            function createMarker(place) {
                var placeLoc = place.geometry.location;


                // var myLatLng = new google.maps.LatLng(test.geometry.location.lat(), test.geometry.location.lng());
               //console.log(test["geometry"].location + "results");
                var beachMarker = new google.maps.Marker({
                    position: placeLoc,
                    map: map,
                    icon: place.icon.toString()
                });

            }

           google.maps.event.addListener(map, 'click', function(e) {
                scope.$apply(function() {
                    addMarker({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    });

                    console.log(e);
                });

            }); // end click listener

            var addMarker= function(pos){
                var myLatlng = new google.maps.LatLng(pos.lat,pos.lng);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title:"Hello World!"
                });
            } //end addMarker

        }
    };
});
    */