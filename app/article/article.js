'use strict';
 
angular.module('myApp.article', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/article', {
        templateUrl: 'article/article.html',
        controller: 'ArticleCtrl'
    });
}])

.controller('ArticleCtrl', ['$scope', 'CommonProp', '$firebase', function($scope,CommonProp,$firebase) {
	//var uid = CommonProp.getUser();

	var fb = new Firebase("https://resplendent-heat-9609.firebaseio.com/Articles/" + CommonProp.getArticle());
	var article = $firebase(fb);
	$scope.article = article.$asObject();
}]);