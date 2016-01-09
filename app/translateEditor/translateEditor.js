'use strict';
 
angular.module('myApp.translateEditor', ['ngRoute', 'ng.ckeditor'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/translateEditor', {
        templateUrl: 'translateEditor/translateEditor.html',
        controller: 'TranslateEditorCtrl'
    });
}])

.controller('TranslateEditorCtrl', ['$scope', 'CommonProp', '$firebase', function($scope,CommonProp,$firebase) {
	var uid = CommonProp.getUser();
	//$scope.htmlEditor = CommonProp.getTrans();
	//$scope.origPost = 

	var fb = new Firebase("https://resplendent-heat-9609.firebaseio.com/Articles/" + CommonProp.getArticle());
	var origPost = $firebase(fb);
	$scope.origPost = origPost.$asObject();
	//alert($scope.origPost.title);

    $scope.AddPost = function(){
		var title = $scope.article.title;
        var post = $scope.htmlEditor;
		//Language, Genre, Comment ids

		fb.$push({ title: title, post: post, uid: uid, transflag: 1, orig: CommonProp.getArticle()}).then(function(ref) {
            console.log(ref); 
            $location.path('/translate');
		}, function(error) {
            console.log("Error:", error);
		});

    };
}]);