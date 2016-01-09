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

		fb.$push({ title: title, post: post, uid: uid, transflag: 0, orig: ""}).then(function(ref) {
            console.log(ref); 
            $location.path('/account');
		}, function(error) {
            console.log("Error:", error);
		});

    };

    var sync = $firebase(firebaseObj.orderByChild("uid").equalTo(uid));
    $scope.articles = sync.$asArray();

    $scope.translatePost = function(id){
        CommonProp.setArticle(id);
    };
}]);