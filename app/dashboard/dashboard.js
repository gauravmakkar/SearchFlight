/**
 * Created by gaurav.m on 10/4/17.
 */
'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'ui.bootstrap', 'myApp.search.service'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }]).controller('DashboardCtrl', ['$scope', 'flightSearchService', function ($scope, flightSearchService) {

    $scope.searchFlight = function (boolean) {
        $scope.search.loaded = false
        $scope.flights=[]
        flightSearchService.searchFlights($scope.search).then(function (data) {
            $scope.search.loaded = true
            $scope.search.filtered=boolean
            $scope.flights = data;
        })
    }
    $scope.reset = function () {
        $scope.search = {
            opened: {
                depart: false,
                return: false,
                loaded: false
            },
            from: "",
            to: "",
            depart: "",
            return: ""
        }
        $scope.searchFlight(false)
    }
    $scope.reset()
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.datepicker = function (key) {
        $scope.search.opened[key] = !$scope.search.opened[key]
    }


}]);