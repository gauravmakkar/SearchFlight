/**
 * Created by gaurav.m on 10/4/17.
 */
angular.module('myApp.search.service', []).factory('flightSearchService', function ($http, $q) {
    var service = {}


    function startDateOfObject(date) {
        var d = new Date(date)
        return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    }

    service.searchFlights = function (search) {
        var deferred = $q.defer();
        $http.get("http://localhost:8000/data/data.json").success(function (data) {
            let filteredData = data.filter(function (flight) {
                return (!search.from || flight.from.toLowerCase() === search.from.toLowerCase())
                    &&
                    (!search.to || flight.to.toLowerCase() === search.to.toLowerCase())
                    &&
                    (!search.depart || startDateOfObject(flight.departureTime).toString() === startDateOfObject(search.depart).toString())
                    ||
                    (search.return && ((!search.to || flight.from.toLowerCase() === search.to.toLowerCase()) && (!search.from || flight.to.toLowerCase() === search.from.toLowerCase())

                        && (startDateOfObject(flight.departureTime).toString() === startDateOfObject(search.return).toString())
                    ))

            })
            deferred.resolve(filteredData);
        }).error(function (data) {
            deferred.reject('There was an error');
        })

        return deferred.promise
    }

    return service;
})