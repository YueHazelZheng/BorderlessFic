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
.controller('WelcomeCtrl', ['$scope','$location', 'CommonProp', '$firebase', '$firebaseAuth', function($scope,$location,CommonProp,$firebase,$firebaseAuth) {
     
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
            console.log('Authentication successful');
            var uid = firebaseObj.getAuth().uid;
            console.log(uid);
            CommonProp.setUser(uid);
            // get user info
            var userRef = firebaseObj.child('Users/'+uid);
            var userSync = $firebase(userRef);
            var user = userSync.$asObject();
            user.$loaded().then(function() {
                console.log(user.username);
                // set preferences
                CommonProp.setLangPref(user.languages);
                CommonProp.setFandomPref(user.fandoms);
                CommonProp.setGenrePref(user.genres);
                CommonProp.setUserName(user.username);
                $location.path('/account');
            });
            
        }, function(error) {
            //Failure callback
            alert('Authentication failure');
        });
    };
}])

.service('CommonProp', function() {
    var user = '';
    var langPref = [];
    var fandomPref = [];
    var genrePref = [];
    var username;
    var article = '';
    var fanficFLg = false;
    var originalFlg = false;
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        },
        getLangPref: function() {
            return langPref;
        },
        setLangPref: function(value) {
            if (value != 0) langPref = value;
        },
        getFandomPref: function() {
            return fandomPref;
        },
        setFandomPref: function(value) {
            if (value != 0) fandomPref = value;
        },
        getGenrePref: function() {
            return genrePref;
        },
        setGenrePref: function(value) {
            if (value != 0) genrePref = value;
        },
        getUserName: function() {
            return username;
        },
        setUserName: function(value) {
            if (value != 0) username = value;
        },
        getArticle: function() {
            return article;
        },
        setArticle: function(value) {
            if (value != 0) article = value;
        },
        getFanficFlg: function() {
            return fanficFLg;
        },
        setFanficFlg: function(value) {
            fanficFlg = value;
        },
        getOriginalFlg: function() {
            return originalFlg;
        },
        setOriginalFlg: function(value) {
            originalFlg = value;
        }
    };
});