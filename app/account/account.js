'use strict';
 
angular.module('myApp.account', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/account', {
        templateUrl: 'account/account.html',
        controller: 'AccountCtrl'
    });
}])
 
.controller('AccountCtrl', ['$scope', 'CommonProp', '$firebase', function($scope,CommonProp, $firebase) {
	$scope.userid = CommonProp.getUser();

	var firebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com/Articles");
	var sync = $firebase(firebaseObj.orderByChild("uid").equalTo($scope.userid));
	$scope.articles = sync.$asArray();
}]);