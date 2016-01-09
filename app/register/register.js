'use strict';
 
angular.module('myApp.register', ['ngRoute', 'firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}])
 
// Register controller
.controller('RegisterCtrl', ['$scope','$location','$firebaseAuth', 'CommonProp', '$firebase', function($scope,$location,$firebaseAuth,CommonProp,$firebase) {
	var firebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com");
	var auth = $firebaseAuth(firebaseObj);
    var uid = 0;
    var syncLang = $firebase(firebaseObj.child('Tags/Language'));
    var syncFandom = $firebase(firebaseObj.child('Tags/Fandom'));
    //var syncGenre = $firebase(firebaseObj.child('Tags/Genre'));
    $scope.languages = syncLang.$asArray();
    $scope.fandoms = syncFandom.$asArray();
    //$scope.genres = syncGenre.$asArray();
    $scope.langSelection = [];
    $scope.fandomSelection = [];
    //$scope.genreSelection = [];

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
    /*$scope.toggleGenre = function(genre) {
        var idx = $scope.genreSelection.indexOf(genre);
        if (idx > -1) {
            $scope.genreSelection.splice(idx, 1);
        }
        else {
            $scope.genreSelection.push(genre);
        }
    };*/

	$scope.signUp = function() {
    	if (!$scope.regForm.$invalid) {
        	var email = $scope.user.email;
            var password = $scope.user.password;
            var username = $scope.user.username;
            if (email && password) {
                auth.$createUser(email, password)
                    .then(function() {
                        // print if success
                        console.log('User creation success');
                        console.log($scope.langSelection);

                        // log newly created user in
                        var newFirebaseObj = new Firebase("https://resplendent-heat-9609.firebaseio.com"); 
                        var loginObj = $firebaseAuth(newFirebaseObj);
                        loginObj.$authWithPassword({
                            email: email,
                            password: password
                        })
                        .then(function(user) {
                            //Success callback
                            console.log('Authentication successful');
                            uid = newFirebaseObj.getAuth().uid;
                            console.log(uid);
                            // set user
                            CommonProp.setUser(uid);
                            // create user database info
                            var userInfo = $firebase(newFirebaseObj.child('Users/'+uid));
                            userInfo.$set({ username: username, languages: $scope.langSelection, fandoms: $scope.fandomSelection, genres: ''/*$scope.genreSelection*/}).then(function(ref) {
                                console.log(ref); 
                                $location.path('/account');
                            }, function(error) {
                                console.log("Error:", error);
                            });
                            // set preferences
                            CommonProp.setLangPref($scope.langSelection);
                            CommonProp.setFandomPref($scope.fandomSelection);

                            $location.path('/account');
                        }, function(error) {
                            //Failure callback
                            alert('Authentication failure');
                        });

                    }, function(error) {
                        // do things if failure
                        console.log(error);
                        $scope.regError = true;
						$scope.regErrorMessage = error.message;
                    });
            }
            
    	}
       
    };
}]);