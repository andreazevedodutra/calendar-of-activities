angular.module('calendarApp')
    .component("gridForm", {
        templateUrl: 'src/utils/grid-form.html'
    }).factory('gridService', function(){
        return {
            htmlHead: '',
            htmlItems: '',
            listData: '',
            urlGlobal: 'http://192.168.123.197:3000/'
        }
    })
    .controller('gridCtrl', function($scope ,$rootScope, gridService){
        $scope.htmlHead = gridService.htmlHead;
        $scope.htmlItems = gridService.htmlItems;
        $scope.listData = gridService.listData;
    });