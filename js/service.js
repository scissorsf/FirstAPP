/**
 * Created by Gfei on 2016/4/15.
 */
app.provider('Weather',function(){

    var apiKey ="";

    this.setApiKey = function(key){

        if(key)  this.apiKey = key;
    };

    this.$get = function($q,$http){
        var self = this;
        return {
            //服务对象

            getWeatherForecast: function(city){

                var d = $q.defer();

                $http({

                    method: 'GET',
                    url:self.getUrl(city),
                    cache: true,
                    headers:{
                        'apikey': self.apiKey
                    }
                }).success(function(data){

                    d.resolve(data['HeWeather data service 3.0'][0]);

                }).error(function(err){
                    d.reject(err);
                });

                return d.promise;

            }


        }
    };

    this.getUrl = function(location) {
        return "http://apis.baidu.com/heweather/weather/free?city=" +location;
    };

});


