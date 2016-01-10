'use strict';
 
angular.module('myApp.article', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/article', {
        templateUrl: 'article/article.html',
        controller: 'ArticleCtrl'
    });
}])

.controller('ArticleCtrl', ['$scope', 'CommonProp', '$firebase', '$sce', function($scope,CommonProp,$firebase,$sce) {
	//var uid = CommonProp.getUser();
    $scope.translated = [];
    var articles_fb = new Firebase("https://resplendent-heat-9609.firebaseio.com/Articles/");
	var fb = articles_fb.child('/'+CommonProp.getArticle());
	var article = $firebase(fb);
    var artObj = article.$asObject();
	$scope.article = article.$asObject();
    $scope.translated = [];
    $scope.originTitle = function(article) {
        return article.origin;
    };
    $scope.transTitle = function(article) {
        return article.translated;
    };
    /*console.log("transflag",artObj.transflag);
    if (artObj.transflag == 1) {
        var origin_fb = articles_fb.child('/'+artObj.origin);
        $scope.origin = $firebase(origin_fb);
    }
    else{
        console.log(artObj.translated.length);
        for (var i = 0; i < artObj.translated.length; i++) {
            if (artObj.translated[i] != 'none') {
                var trans_fb = articles_fb.child('/'+artObj.translated[i]);
                var trans = $firebase(trans_fb);
                $scope.translated.push(trans);
            }
        }
    }*/

    $scope.transflag = 
	$scope.renderHtml = function(str) {
        return $sce.trustAsHtml(str);
    };
    
    $scope.postComment = function() {
        
    };
}]);