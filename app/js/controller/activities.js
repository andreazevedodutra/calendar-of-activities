angular.module('calendarApp')
.controller('activitiesCtrl', function($scope, gridService){
    gridService.listData = [{_cod: '01', name: 'André2', password:'teste'},{_cod: '01', name: 'André2', password:'teste'}];
    gridService.htmlHead = '<th>Nome2</th><th>Senha2</th>';

});