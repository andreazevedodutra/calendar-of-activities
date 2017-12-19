angular.module('calendarApp')
    .controller('userCtrl', function($scope, gridService){
        $scope.listData = [{_cod: '01', name: 'André', password:'teste'},{_cod: '01', name: 'André', password:'teste'}];
        gridService.listData = $scope.listData;
    })
    .component('gridTable',{
        templateUrl: 'src/views/user-table.html'
    });
