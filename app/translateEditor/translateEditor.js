'use strict';
 
angular.module('myApp.translateEditor', ['ngRoute', 'ng.ckeditor'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/translateEditor', {
        templateUrl: 'translateEditor/translateEditor.html',
        controller: 'TranslateEditorCtrl'
    });
}])

.controller('TranslateEditorCtrl', ['$scope', 'CommonProp', '$firebase', '$location', '$sce', function($scope,CommonProp,$firebase,$location,$sce) {
	var uid = CommonProp.getUser();
	//$scope.htmlEditor = CommonProp.getTrans();
	//$scope.origPost = 

	var orig_fb = new Firebase("https://resplendent-heat-9609.firebaseio.com/Articles/" + CommonProp.getArticle());
	var origPost = $firebase(orig_fb);
	$scope.origPost = origPost.$asObject();
	//alert($scope.origPost.title);
    
    var firebaseObject = new Firebase("https://resplendent-heat-9609.firebaseio.com");
    var syncLang = $firebase(firebaseObject.child('Tags/Language'));
    $scope.languages = syncLang.$asArray();

    $scope.renderHtml = function(str) {
        return $sce.trustAsHtml(str);
    };

    $scope.postTranslation = function(){
		var title = $scope.article.title;
        var post = $scope.htmlEditor;
		//Language, Genre, Comment ids
		var article_fb = new Firebase("https://resplendent-heat-9609.firebaseio.com/Articles/");
		var article_Object = $firebase(article_fb);
        var new_article_id;
        var selecLang = ['none'];
        selecLang.push($scope.selectedlanguage);

		var new_fb = article_Object.$push({
            title: title,
            post: post,
            uid: uid,
            username: CommonProp.getUserName(),
            transflag: 1,
            orig: CommonProp.getArticle(),
            translated: ['none'],
            comments: ['none'],
            fanFlg: $scope.origPost.fanFlg,
            fandom: $scope.origPost.fandom,
            genre: $scope.origPost.genre,
            language: selecLang})
        .then(function(ref) {
            console.log("success");
            //console.log(ref);
            article_fb.on('child_added', function(snapshot) {
                new_article_id = snapshot.key();
            });
            var original_article_Object = $firebase(article_fb.child('/'+CommonProp.getArticle()).child('/translated/'));
            original_article_Object.$push(new_article_id)
            .then(function(ref) {
                console.log(new_article_id);
                console.log(original_article_Object.$asObject());
                $location.path('/translate');
            }, function(error) {
                console.log("Error:", error);
            });
		}, function(error) {
            console.log("Error:", error);
		});

    };
}]);