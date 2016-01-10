'use strict';
 
angular.module('myApp.account', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/account', {
        templateUrl: 'account/account.html',
        controller: 'AccountCtrl'
    });
}])
 
.controller('AccountCtrl', ['$scope', 'CommonProp', '$firebase', '$sce', function($scope,CommonProp,$firebase,$sce) {
 	$scope.username = CommonProp.getUserName();
 	var firebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com/Articles");
 	var sync = $firebase(firebaseObj);
 	$scope.articles = sync.$asArray();
     $scope.renderHtml = function(str) {
        return $sce.trustAsHtml(str);
    };
}]);