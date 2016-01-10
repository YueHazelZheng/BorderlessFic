'use strict';
 
angular.module('myApp.account', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/account', {
        templateUrl: 'account/account.html',
        controller: 'AccountCtrl'
    });
}])
 
.controller('AccountCtrl', ['$scope', 'CommonProp', '$firebase', '$sce', '$location', function($scope,CommonProp,$firebase,$sce, $location) {
 	$scope.username = CommonProp.getUserName();
 	var firebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com/Articles");
 	var sync = $firebase(firebaseObj);
 	$scope.articles = sync.$asArray();
     $scope.renderHtml = function(str) {
        return $sce.trustAsHtml(str);
    };
    $scope.readMore = function(id) {
        CommonProp.setArticle(id);
        $location.path('/article');
    };
}]);