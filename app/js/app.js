var app = angular.module('calendarApp')
    .config(['$stateProvider', function($stateProvider){
        $stateProvider
            .state('calendar',
                {
                    name: 'calendar',
                    url: '/calendar.html',
                    templateUrl: 'src/calendar.html'
                }
            ).state('user',
                {
                    name: 'user',
                    url: '/user.html',
                    templateUrl: 'src/views/user.html'
                }
            ).state('activities',
            {
                name: 'activities',
                url: '/activities.html',
                templateUrl: 'src/views/activities.html'
            }
            ).state('vehicles',
            {
                name: 'vehicles',
                url: '/vehicles.html',
                templateUrl: 'src/views/vehicles.html'
            }
            )
    }]);

app.run(function($rootScope, $state) {
    $state.go('calendar');
});