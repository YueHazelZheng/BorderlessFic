'use strict';
 
angular.module('myApp.home', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.filter('filterMultiple',['$filter',function ($filter) {
    return function (items, keyObj) {
        var filterObj = {
            data:items,
            filteredData:[],
            applyFilter : function(obj,key){
                var fData = [];
                if (this.filteredData.length == 0)
                    this.filteredData = this.data;
                if (obj){
                    var fObj = {};
                    if (!angular.isArray(obj)){
                        fObj[key] = obj;
                        fData = fData.concat($filter('filter')(this.filteredData,fObj));
                    } else if (angular.isArray(obj)){
                        if (obj.length > 0){
                            for (var i=0;i<obj.length;i++){
                                if (angular.isDefined(obj[i])){
                                    fObj[key] = obj[i];
                                    fData = fData.concat($filter('filter')(this.filteredData,fObj));    
                                }
                            }

                        }
                    }
                    if (fData.length > 0){
                        this.filteredData = fData;
                    }
                }
            }
        };
        if (keyObj){
            angular.forEach(keyObj,function(obj,key){
                filterObj.applyFilter(obj,key);
            });
        }
        return filterObj.filteredData;
    };
}])
 
.controller('HomeCtrl', ['$scope', 'CommonProp', '$firebase', '$location', function($scope,CommonProp,$firebase,$location) {
 	var firebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com");
    $scope.userid = CommonProp.getUser();
 	$scope.langPref = CommonProp.getLangPref();
 	$scope.fandomPref = CommonProp.getFandomPref();
 	$scope.genrePref = CommonProp.getGenrePref();
    var syncLang = $firebase(firebaseObj.child('Tags/Language'));
    var syncFandom = $firebase(firebaseObj.child('Tags/Fandom'));
    var syncGenre = $firebase(firebaseObj.child('Tags/Genre'));
    $scope.languages = syncLang.$asArray();
    $scope.fandoms = syncFandom.$asArray();
    $scope.genres = syncGenre.$asArray();

    var articleSync = $firebase(firebaseObj.child('Articles'));
    //var allArticles = articleSync.$asArray();
    $scope.articles = articleSync.$asArray();

    // For new filter options
    $scope.langSelection = [];
    $scope.fandomSelection = [];
    $scope.genreSelection = [];

 	// for selecting preferred languages
    $scope.toggleLang = function(lang) {
        var idx = $scope.langSelection.indexOf(lang);
        if (idx > -1) {
            $scope.langSelection.splice(idx, 1);
        }
        else {
            $scope.langSelection.push(lang);
        }
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

    $scope.filter = function() {

    };

    $scope.readMore = function(id) {
        CommonProp.setArticle(id);
        $location.path('/article');
    };

     // if no preference is chosen
    /*if($scope.langPref==[]) 
        $scope.langPref = $scope.languages;
*/
}]);