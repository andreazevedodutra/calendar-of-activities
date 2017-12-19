angular.module('calendarApp')
    .controller('MenuController', function($scope, $state){
        $scope.goCalendar = function(){
            $state.go('calendar');
        }
        $scope.goUser = function(){
            $state.go('user');
        }
    });