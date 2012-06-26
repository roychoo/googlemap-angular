'use strict';

/* Directives */


var directives = angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);


directives.directive('myApp.directives', []).
  directive('map', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {
            console.log(element);

            var myOptions = {
                zoom: 6,
                center: new google.maps.LatLng(46.87916, -3.32910),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);

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