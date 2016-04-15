/**
 * Created by Gfei on 2016/4/15.
 */
var app= angular.module('myApp',['ngRoute'])
    .config(function($routeProvider){

        $routeProvider
            .when('/',{
                templateUrl: 'templates/home.html',
                controller: 'MainController'
            })

            .otherwise({redirectTo: '/'});

    })
    .config(function(WeatherProvider){

        WeatherProvider.setApiKey('56a2bd36bf0b58ca64811e43a61b3094')
    })
    .controller('MainController',function($scope,$timeout,Weather){

        //构建data对象
        $scope.date = {};

        //更新函数
        var updateTime = function(){

            $scope.date.raw = new Date();

            $timeout(updateTime,1000);

        };

        //启动函数
        updateTime();
        $scope.weather = {};
        $scope.map = {};

        Weather.getWeatherForecast('wuhan')
            .then(function(data){

                $scope.weather.basic = data.basic;
            });


    });