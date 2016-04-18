/**
 * Created by Gfei on 2016/4/15.
 */
var app= angular.module('myApp',['ui.router','homepage','blogpage'])
    .config(function($stateProvider, $urlRouterProvider){

        $stateProvider
            .state('tab', {
                url:'',
                templateUrl: 'templates/index.html',
                abstract: true
            })
            .state('tab.home',{
                url:'/',
                controller: 'MainController',
                templateUrl:'templates/home.html'
            })
            .state('tab.blog',{
                url:'/bloglist',
                controller: 'BlogController',
                templateUrl:'templates/blog.html'
            })

        ;
        $urlRouterProvider.otherwise('/');


    })
    .config(function(WeatherProvider){

        WeatherProvider.setApiKey('56a2bd36bf0b58ca64811e43a61b3094')
    });
    angular.module('homepage',[])
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
        $scope.city = "wuhan";
        $scope.changeCity = function(){
            Weather.getWeatherForecast($scope.city)
                .then(function(data){

                    $scope.weather.basic = data.basic;
                    $scope.weather.now = data.now;
                    $scope.weather.aqi = data.aqi;
                    $scope.weather.daily_forecast = Weather.getIconUrl(data.daily_forecast.slice(0,4));
                });

        };


        Weather.getWeatherForecast($scope.city)
            .then(function(data){

                $scope.weather.basic = data.basic;
                $scope.weather.now = data.now;
                $scope.weather.aqi = data.aqi;
                $scope.weather.daily_forecast = Weather.getIconUrl(data.daily_forecast.slice(0,4));
            });



    });


    angular.module('blogpage',[])
        .config(function($stateProvider){

            $stateProvider

                .state('tab.blog.categories',{
                    url:'/categories/:category',
                    controller: 'BlogController',
                    templateUrl:'templates/blog/blog.tmpl.html'
                })

            ;

        })
        .controller('BlogController',function($scope,$stateParams){
            $scope.title = $stateParams.category;
            $scope.categories = [
                {"id": 0, "name": "Development"},
                {"id": 1, "name": "Design"},
                {"id": 2, "name": "Exercise"},
                {"id": 3, "name": "Humor"}
            ];
            $scope.bookmarks = [
                {"id":0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
                {"id":1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
                {"id":2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
                {"id":3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
                {"id":4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
                {"id":5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
                {"id":6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
                {"id":7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
                {"id":8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
            ];
            $scope.bookdata = [];
            for(var i in $scope.bookmarks){
                if($scope.bookmarks[i].category == $stateParams.category){
                    $scope.bookdata.push($scope.bookmarks[i])
                }
            }
    });