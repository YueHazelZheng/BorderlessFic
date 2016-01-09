'use strict';
 
angular.module('myApp.welcome', ['ngRoute', 'firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])
 
// Welcome controller
.controller('WelcomeCtrl', ['$scope','$location', 'CommonProp', '$firebaseAuth', function($scope,$location,CommonProp,$firebaseAuth) {
     
    // Auth Logic will be here
    var firebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com"); 
    var loginObj = $firebaseAuth(firebaseObj);

    $scope.SignIn = function(e) {
        e.preventDefault();
        var username = $scope.user.email;
        var password = $scope.user.password;
        loginObj.$authWithPassword({
                email: username,
                password: password
            })
            .then(function(user) {
                //Success callback
                alert('Authentication successful');
                alert(firebaseObj.getAuth().uid);
                CommonProp.setUser(firebaseObj.getAuth().uid);
                $location.path('/account');
            }, function(error) {
                //Failure callback
                alert('Authentication failure');
            });
    };
}])
.service('CommonProp', function() {
    var user = '';
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
});