'use strict';
 
angular.module('myApp.translate', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/translate', {
        templateUrl: 'translate/translate.html',
        controller: 'TranslateCtrl'
    });
}])

.controller('TranslateCtrl', ['$scope', 'CommonProp', '$firebase', '$sce', function($scope,CommonProp, $firebase, $sce) {
	$scope.userid = CommonProp.getUser();

	var firebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com/Articles");
	var sync = $firebase(firebaseObj.orderByChild("uid").equalTo($scope.userid));
	$scope.articles = sync.$asArray();
	$scope.renderHtml = function(str) {
        return $sce.trustAsHtml(str);
    };
}]);