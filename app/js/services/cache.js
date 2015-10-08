angular.module('starter')
    .factory('cache',function($cacheFactory,RESOURCES){
        return $cacheFactory('appcache');
    })

