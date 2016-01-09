'use strict';
 
angular.module('myApp.translateEditor', ['ngRoute', 'ng.ckeditor'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/translateEditor', {
        templateUrl: 'translateEditor/translateEditor.html',
        controller: 'TranslateEditorCtrl'
    });
}])

.controller('TranslateEditorCtrl', ['$scope', 'CommonProp', '$firebase', function($scope,CommonProp,$firebase) {
	$scope.userid = CommonProp.getUser();
	$scope.htmlEditor = "Happy translating!";
	$scope.submit = function() {
		alert($scope.htmlEditor);
	};
}]);