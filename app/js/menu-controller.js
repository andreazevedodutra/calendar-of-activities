angular.module('calendarApp')
    .controller('MenuController', function($scope, $state){
        $scope.goCalendar = function(){
            $state.go('calendar');
        }
        $scope.goUser = function(){
            $state.go('user');
        }
        $scope.goActivities = function(){
            $state.go('activities');
        }
        $scope.goVehicles = function(){
            $state.go('vehicles');
        }
    });