'use strict';

/* Controllers */
function loginController() {}
loginController.$inject = [];

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function SessionController(sessionService, $location, $route, $log) {
    $log.log("testing" + sessionService.session().authenticated);

    if (sessionService.session().authenticated) {
        $location.path('/partial1');
    } else {
        $location.path('/login');
    }


}

SessionController.$inject = [ 'sessionService', '$location', '$route', '$log' ];

function LoginController(sessionService, $location, $log, $scope) {

    $scope.authenticateUser = function(user) {
        $log.log('submitting ' + user.userName + ' ' + user.password);
       // $log.log('submitting' + user.userName + ' ' + user.password );
        //var user = sessionService.session();

        if ((user.userName !== "") && (user.password === "angular") && (user.country !== "")) {
            sessionService.session().authenticated = true;
            sessionService.session().userName = user.userName;
            sessionService.session().password = user.password;
            sessionService.session().country = user.country;
            $log.log('submitting' + user.userName + ' ' + user.password );
            user.authenticated = true;
            $location.path('/view2');
        } else {
            $scope.invalidUserOrPwd = true;
        }
    };
}

LoginController.$inject = ['sessionService', '$location' ,'$log', '$scope'];

function MapController (sessionService, $location, $log, $scope) {
    $log.log('submitting country' );
    $scope.country =  sessionService.session().country;
    alert($scope.country);

}

MapController.$inject = ['sessionService', '$location' ,'$log', '$scope'];

function markerCtrl($rootScope, $scope, placeService) {
    console.log("i am in markCtrl ");
    $scope.add = function (lat, lng) {
       console.log("adding " + $rootScope.places);
        placeService.add();
    };
}

markerCtrl.$inject = ['$rootScope', '$scope', 'placeService'];