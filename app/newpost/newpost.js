'use strict';
 
angular.module('myApp.newpost', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/newpost', {
        templateUrl: 'newpost/newpost.html',
        controller: 'NewPostCtrl'
    });
}])
 
.controller('NewPostCtrl', ['$scope','$firebase','CommonProp', '$location', function($scope,$firebase,CommonProp,$location) {
	$scope.content="";
    var uid = CommonProp.getUser();
    var firebaseObject = new Firebase("https://resplendent-heat-9609.firebaseio.com");
    var syncLang = $firebase(firebaseObject.child('Tags/Language'));
    var syncFandom = $firebase(firebaseObject.child('Tags/Fandom'));
    var syncGenre = $firebase(firebaseObject.child('Tags/Genre'));
    $scope.languages = syncLang.$asArray();
    $scope.fandoms = syncFandom.$asArray();
    $scope.genres = syncGenre.$asArray();
    $scope.langSelection = [];
    $scope.fandomSelection = [];
    $scope.genreSelection = [];

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


    var firebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com/Articles");


    $scope.fileUpload = function(element){
        var reader = new FileReader();
        reader.onload = $scope.fileIsLoaded;
        reader.readAsText(element.files[0]);
    };

    $scope.fileIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.content=e.target.result;
        });
    };

    $scope.AddPost = function(){
		var title = $scope.article.title;
        var post = $scope.content;
		//Language, Genre, Comment ids

        var fb = $firebase(firebaseObj);
        var fanFlg = 1;
        var username = CommonProp.getUserName();

        if($scope.fanficFlg==false) {
            $scope.fandomSelection = $scope.fandoms;
            fanFlg = 0;
        }


		fb.$push({ title: title, post: post, uid: uid, username: username, transflag: 0, orig: "", fanFlg: fanFlg, fandom: $scope.fandomSelection, genre: $scope.genreSelection, language: $scope.langSelection}).then(function(ref) {
            console.log(ref); 
            $location.path('/account');
		}, function(error) {
            console.log("Error:", error);
		});

    };

    var sync = $firebase(firebaseObj.orderByChild("uid").equalTo(uid));
    $scope.articles = sync.$asArray();
}]);