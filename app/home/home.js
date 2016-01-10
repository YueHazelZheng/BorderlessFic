'use strict';
 
angular.module('myApp.home', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', 'CommonProp', '$firebase', '$location', '$sce', '$route', function($scope,CommonProp,$firebase,$location,$sce,$route) {

 	var firebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com");
    $scope.userid = CommonProp.getUser();
 	$scope.langPref = CommonProp.getLangPref();
 	$scope.fandomPref = CommonProp.getFandomPref();
 	$scope.genrePref = CommonProp.getGenrePref();
    var fanFlgPref = CommonProp.getFanficFlg();
    var origFlgPref = CommonProp.getOriginalFlg();
    var syncLang = $firebase(firebaseObj.child('Tags/Language'));
    var syncFandom = $firebase(firebaseObj.child('Tags/Fandom'));
    var syncGenre = $firebase(firebaseObj.child('Tags/Genre'));
    $scope.languages = syncLang.$asArray();
    $scope.fandoms = syncFandom.$asArray();
    $scope.genres = syncGenre.$asArray();
    var articleSync = '';

    if (fanFlgPref == origFlgPref)
        articleSync = $firebase(firebaseObj.child('Articles'));
    else if(fanFlgPref == true)
        articleSync = $firebase(firebaseObj.child('Articles').orderByChild("fanFlg").equalTo(1));
    else
        articleSync = $firebase(firebaseObj.child('Articles').orderByChild("fanFlg").equalTo(0));
    $scope.articles = articleSync.$asArray();

    //var allArticles = articleSync.$asArray();
    //console.log(allArticles);

    // if all preferences are chosen
    if($scope.langPref==$scope.languages) 
        $scope.langPref = [];
    if($scope.genrePref==$scope.genres)
        $scope.genrePref = [];
    if($scope.fandomPref==$scope.fandoms)
        $scope.fandomPref = [];

    //$scope.articles = $filter('myFilter')(allArticles, $scope.langPref, $scope.genrePref, $scope.fandomPref);

    $scope.filter = function(article) {
        var langFlg = false;
        var genreFlg = false;
        var fandomFlg = false;
        console.log(article);
        console.log($scope.langPref);
        console.log($scope.genrePref);
        console.log($scope.fandomPref);
        //if (!((origFlgPref == false && article.fanFlg == false) || (fanFlgPref == false && article.fanFlg == true))) {
            if ($scope.langPref.length > 1) {
                for (var i = 0; i < article.language.length; i++) {
                    //console.log(article.language[i]);
                    //console.log($scope.langPref);
                    if (article.language[i] != 'none' && $scope.langPref.indexOf(article.language[i]) > -1) langFlg = true;
                }
            }
            else langFlg = true;
            if (langFlg == true) {
                if ($scope.genrePref.length > 1) {
                    for (var j = 0; j < article.genre.length; j++) {
                        //console.log(article.genre[j]);
                        //console.log($scope.genrePref);
                        if (article.genre[j] != 'none' && $scope.genrePref.indexOf(article.genre[j]) > -1) genreFlg = true;
                    }
                }
                else genreFlg = true;
                if (genreFlg == true) {
                    if (article.fanFlg == true && $scope.fandomPref.length > 1) {
                        for(var k = 0; k < article.fandom.length; k++) {
                            //console.log(article.fandom[k]);
                            //console.log($scope.fandomPref);
                            if (article.fandom[k] != 'none' && $scope.fandomPref.indexOf(article.fandom[k]) > -1) fandomFlg = true;
                        }
                    }
                    else fandomFlg = true;
                }
            }
        //}
        if (langFlg && genreFlg && fandomFlg) return true;
        else return false;
    };

    $scope.renderHtml = function(str) {
        return $sce.trustAsHtml(str);
    };

    // For new filter options
    $scope.fanficFlg = false;
    $scope.originalFlg = false;
    $scope.langSelection = ['none'];
    $scope.fandomSelection = ['none'];
    $scope.genreSelection = ['none'];

 	// for selecting preferred languages
    $scope.toggleLang = function(lang) {
        var idx = $scope.langSelection.indexOf(lang);
        if (idx > -1) {
            $scope.langSelection.splice(idx, 1);
        }
        else {
            $scope.langSelection.push(lang);
        }
        console.log($scope.langSelection);
    };

    // for selecting preferred fandoms
    $scope.toggleFandom = function(fandom) {
        var idx = $scope.fandomSelection.indexOf(fandom);
        if (idx > -1) {
            $scope.fandomSelection.splice(idx, 1);
        }
        else {
            $scope.fandomSelection.push(fandom);
        }
    };

    // for selecting preferred genres
    $scope.toggleGenre = function(genre) {
        var idx = $scope.genreSelection.indexOf(genre);
        if (idx > -1) {
            $scope.genreSelection.splice(idx, 1);
        }
        else {
            $scope.genreSelection.push(genre);
        }
    };

    $scope.newFilter = function() {
        CommonProp.setFanficFlg($scope.fanficFlg);
        CommonProp.setOriginalFlg($scope.originalFlg);
        CommonProp.setLangPref($scope.langSelection);
        CommonProp.setGenrePref($scope.genreSelection);
        CommonProp.setFandomPref($scope.fandomSelection);
        //console.log($scope.genreSelection);
        //console.log(CommonProp.getGenrePref());
        $route.reload();
        //$scope.$apply();
    };

    $scope.readMore = function(id) {
        CommonProp.setArticle(id);
        $location.path('/article');
    };

}]);