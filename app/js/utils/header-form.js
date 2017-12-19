angular.module('calendarApp')
    .component('headerForm',{
        bindings: {
            data: '@'
        },
        templateUrl: 'src/utils/header-form.html'
    });