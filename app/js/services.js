'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
/*angular.module('myApp.services', []).
  value('version', '0.1');
*/
angular.module('myApp.services', [], function ($provide) {
    $provide.factory('sessionService', ['$log', function ($log) {
        $log.log("initializing Session services...");
         var session = {
         userName: "",
         password: "",
         authenticated: false,
         country: "Singapore",
         places: [],
         loadedMap: false
         };
        //var sessionObj =  JSON.parse(session);
      // var position = {"lat" : "1", "lng" : "1"};

       // session.places.push(position);
        //console.log(JSON.stringify(session));
        //console.log("sessionObj " + sessionObj.country);
        var user = {email: "srirangan@gmail.com", password: "iLoveMongo", sex: "male"};
        $log.log("initializing Session services..." + session.authenticated.toString());
        return {
            session: function() {
                $log.log("check services." + session.authenticated.toString());
                return session;
            },
            getPlacesCount: function() {
              return session.places.length;
            },
            user: function() {
                return user;
            },
            logout : function () {
                this.session.authenticated = false;
            },
            doneLoadingMap : function () {
                return this.session().loadedMap;
            },
            setLoadedMap: function() {
                this.session().loadedMap = true;
            }
        };
    }]);
    $provide.factory("placeService", ['$http', '$compile', '$rootScope', '$location', 'sessionService', 'googleMapService', function($http, $compile, $rootScope, $location, sessionService, googleMapService) {
        return {
            add: function(id) {
               // var position = {lat: lat, lng: lng};
                var results = googleMapService.getPlaces();

                for (var i = 0; i < results.length; i++) {
                    if (results[i].id === id)
                    {
                        var place = {icon: results[i].icon, name: results[i].name, rating: results[i].rating};
                        sessionService.session().places.push(place);
                        break;
                    }
                }

                $http.post('/add/', sessionService.user()).success(function(data) {
                    console.log("success");

                });
            },
            remove : function () {
                this.session.authenticated = false;
            }
        };
    }]);
    $provide.factory("googleMapService", ['$compile', '$rootScope', '$location', 'sessionService', function($compile, $rootScope, $location, sessionService) {
        console.log(sessionService.session().country + "country");
        var initialize = sessionService.doneLoadingMap();
       if (!initialize)
        {
        var SJO, initPosition, initZoom, mapOptions;
        SJO = {
            lat: 9.993552791991132,
            lng: -84.20888416469096
        };
        initPosition = SJO;
        initZoom = 12;
        mapOptions = {
            rootScope: $rootScope,
            compile: $compile,
            location: $location,
            zoom: initZoom,
            mapType: 'm',
            country: sessionService.session().country,
            center: {
                lat: initPosition.lat,
                lng: initPosition.lng
            }
        };
        var places;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( {'address' : sessionService.session().country}, function(results, status) {
            var countryLoc = results[0].geometry.location;
            this.mapEl = $("#map");
            this.map = new google.maps.Map(this.mapEl[0], {
                zoom: mapOptions.zoom,
                center: new google.maps.LatLng(countryLoc.lat(), countryLoc.lng()),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            alert(sessionService.doneLoadingMap().toString());
            var request = {
                location: new google.maps.LatLng(countryLoc.lat(), countryLoc.lng()),
                radius: '100000',
                query: 'attractions'
            }
            var service = new google.maps.places.PlacesService(map);
            service.search(request, callback);
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
               // rootScope.places = results;
                places = results;
            }
        }

        function createMarker(place) {
            var placeLoc = place.geometry.location;

            var beachMarker = new google.maps.Marker({
                position: placeLoc,
                map: map,
                icon: place.icon.toString()
            });
            var infoWin = new google.maps.InfoWindow();
            google.maps.event.addListener(beachMarker, 'click', function() {
                console.log("Clicking");
                infoWin.setContent("<div id='gInfo' ng-controller='markerCtrl'><button ng-click=add('" + place.id + "')>addPlace</button><button ng-click=add(" +beachMarker.position.lat()+","+beachMarker.position.lng()+")>add</button></div>");
                infoWin.open(map, beachMarker);



                google.maps.event.addListener(infoWin, 'domready', function() {
                    console.log("dom ready");
                    var ginfo = $('#gInfo');
                    //angular.compile($container)().$apply();
                    //angular.bootstrap($('#gInfo')[0], ['myApp']);
                    $compile($('#gInfo')[0])($rootScope);
                });

            });

            function InfoWindow() {
                this.self = new google.maps.InfoWindow();
            }

        }

        return {
            getPlaces: function() {
               // $log.log("check services." + session.authenticated.toString());
                return places;
            }
        };
    }]);


}).value('version','0.1');
/*
function GMap(options){
    var countryLoc;
    var geocoder = new google.maps.Geocoder();
    var rootScope = options.rootScope;
    var compile = options.compile;
    console.log(this);
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
            }
            var service = new google.maps.places.PlacesService(map);
            service.search(request, callback);
        }
    });



    function createMarker(place) {
        var placeLoc = place.geometry.location;

        var beachMarker = new google.maps.Marker({
            position: placeLoc,
            map: map,
            icon: place.icon.toString()
        });
        var infoWin = new google.maps.InfoWindow();
        google.maps.event.addListener(beachMarker, 'click', function() {
            console.log("Clicking");
            infoWin.setContent("<div id='gInfo' ng-controller='markerCtrl'><button ng-click=add('" + place.id + "')>addPlace</button><button ng-click=add(" +beachMarker.position.lat()+","+beachMarker.position.lng()+")>add</button></div>");
            infoWin.open(map, beachMarker);



            google.maps.event.addListener(infoWin, 'domready', function() {
                console.log("dom ready");
                var ginfo = $('#gInfo');
                angular.bootstrap($('#gInfo')[0], ['myApp']);
            });

        });

        function InfoWindow() {
            this.self = new google.maps.InfoWindow();
        }

    }


}
*/