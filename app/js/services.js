'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
/*angular.module('myApp.services', []).
  value('version', '0.1');
*/
angular.module('myApp.services', [], function($provide) {
    $provide.factory('sessionService', ['$log', function($log) {

         $log.log("initializing Session services...");
         var session = {
         userName: "<your email>",
         password: "",
         authenticated: false,
         country: "Singapore"
         };
        $log.log("initializing Session services..." + session.authenticated.toString());
        return {
            session: function() {
                $log.log("check services." + session.authenticated.toString());
                return session;
            },
            logout : function () {
                this.session.authenticated = false;
            }
        };
    }]);

    $provide.factory("GoogleMap", ['$rootScope', '$location', 'sessionService', function($rootScope, $location, sessionService) {
        console.log(sessionService.session().country + "country");
        var SJO, initPosition, initZoom, mapOptions;
        SJO = {
            lat: 9.993552791991132,
            lng: -84.20888416469096
        };
        initPosition = SJO;
        initZoom = 12;
        mapOptions = {
            rootScope: $rootScope,
            location: $location,
            zoom: initZoom,
            mapType: 'm',
            country: sessionService.session().country,
            center: {
                lat: initPosition.lat,
                lng: initPosition.lng
            }
        };
        return new GMap(mapOptions);
    }]);


}).value('version','0.1');

function GMap(options){
    var countryLoc;
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( {'address' : options.country}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            countryLoc = results[0].geometry.location;
            console.log("creating the map...");
            this.mapEl = $("#map");
            this.map = new google.maps.Map(this.mapEl[0], {
                zoom: options.zoom,
                center: new google.maps.LatLng(countryLoc.lat(), countryLoc.lng()),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var request = {
                location: new google.maps.LatLng(countryLoc.lat(), countryLoc.lng()),
                radius: '100000',
                query: 'attractions'
            };
            var service = new google.maps.places.PlacesService(map);
            service.search(request, callback);
        }
    });



}
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

    var beachMarker = new google.maps.Marker({
        position: placeLoc,
        map: map,
        icon: place.icon.toString()
    });
    var infoWin = new InfoWindow();
    google.maps.event.addListener(beachMarker, 'click', function() {
        console.log("Clicking");
        infoWin.self.open(map, beachMarker);
    });

}

function InfoWindow() {
    this.self = new google.maps.InfoWindow({
        content: "<div class=\"modal-header\">\n  <a href=\"#\" class=\"delete btn\">Delete</a>\n  <a href=\"#\" class=\"undelete btn\" style=\"display: none\">UnDelete</a>\n  <a href=\"#/place\" class=\"edit btn btn-primary\">Edit</a>\n  <a href=\"#/map\" id=\"place-item-move\" class=\"btn\" data-dismiss=\"modal\" >Move</a>\n  <a href=\"#/place/:id/directions\" id=\"place-item-directions\" class=\"btn\" data-dismiss=\"modal\" >Directions</a>\n  <a href=\"#/map\" class=\"btn\" data-dismiss=\"modal\" >Close</a>\n</div>\n<div class=\"modal-body\">\n  <form class=\"form-horizontal\">\n    <fieldset>\n      <div class=\"control-group\">    &nbsp;&nbsp;Marker#:&nbsp;    {{markerno}}</div>\n    </fieldset>\n  </form>\n</div>        "
    });
}