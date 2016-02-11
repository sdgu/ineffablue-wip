var app = angular.module("ineffablue", ["ui.router", "ngSanitize", "ngMaterial"]);




app.factory("auth", function($http)
{
	var auth = 
	{
		
	};

	auth.getUser = function()
	{
		$http.get("/profile").success(function(data)
		{
			angular.copy(data, auth);
		});
	}


	return auth;
});


app.controller("MainCtrl", function($scope, $http, auth)
{

	$scope.auth = auth;
	// alert($scope.auth.toSource());
	// alert($scope.auth.username);



});

app.controller("TestCtrl", function($scope, $http, auth)
{

	$scope.auth = auth;
	// alert($scope.auth.toSource());
	// alert($scope.auth.username);



});


app.config([
  "$stateProvider",
  "$urlRouterProvider",
  "$locationProvider",
  function($stateProvider, $urlRouterProvider, $locationProvider)
  {
  		//$locationProvider.html5Mode(true);

  		$stateProvider.state('/', 
  		{
	        url: '/',
	        templateUrl: '/views/main.html',
	        controller: "MainCtrl as m",
	        resolve:
	      	{
	        	postPromise: ["auth", function(auth)
	        	{
	          		return auth.getUser();
	        	}]
	      	}

      	})

  		$stateProvider.state("test",
  		{
  			url: "/test",
  			templateUrl: "/views/test.html",
  			controller: "TestCtrl as t",
	        resolve:
	      	{
	        	postPromise: ["auth", function(auth)
	        	{
	          		return auth.getUser();
	        	}]
	      	}
  		})

  		// $stateProvider.state("logging",
  		// {
  		// 	url: "/login/twitter"
  		// })

  		$urlRouterProvider.otherwise("/");
  }]);