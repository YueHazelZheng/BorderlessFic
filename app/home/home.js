'use strict';
 
angular.module('myApp.home', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])
 
.controller('HomeCtrl', ['$scope', 'CommonProp', '$firebase', function($scope,CommonProp, $firebase) {
 	$scope.userid = CommonProp.getUser();
 	var langPref = CommonProp.getLangPref();
 	var fandomPref = CommonProp.getFandomPref();
 	var genrePref = CommonProp.getGenrePref();

 	var firebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com");
 	var syncLang = $firebase(firebaseObj.child('Tags/Language'));
    var syncFandom = $firebase(firebaseObj.child('Tags/Fandom'));
    var syncGenre = $firebase(firebaseObj.child('Tags/Genre'));
    $scope.languages = syncLang.$asArray();
    $scope.fandoms = syncFandom.$asArray();
    $scope.genres = syncGenre.$asArray();
    $scope.langSelection = [];
    $scope.fandomSelection = [];
    $scope.genreSelection = [];
 	/*var articleSync = $firebase(firebaseObj.child('Articles'));
 	$scope.articles = articleSync.$asArray();*/

 	// for selecting preferred languages
    $scope.toggleLang = function(lang) {
        var idx = $scope.langSelection.indexOf(lang);
        if (idx > -1) {
            $scope.langSelection.splice(idx, 1);
        }
        else {
            $scope.langSelection.push(lang);
        }
    };

    // for selecting preferred fandoms
    $scope.toggleFandom = function(fandom) {
        var idx = $scope.fandomSelection.indexOf(fandom);
        if (idx > -1) {
            $scope.fandomSelection.splice(idx, 1);
        }
        else {
            $scope.fandomSelection.push(fandom);
        }
    };

    // for selecting preferred genres
    $scope.toggleGenre = function(genre) {
        var idx = $scope.genreSelection.indexOf(genre);
        if (idx > -1) {
            $scope.genreSelection.splice(idx, 1);
        }
        else {
            $scope.genreSelection.push(genre);
        }
    };

}]);