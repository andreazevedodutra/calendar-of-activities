angular.module('calendarApp')
    .controller('userCtrl',
        function($scope, gridService, $http){
            $scope.listData = [{_cod: '01', name: 'André', password:'teste'},{_cod: '01', name: 'André', password:'teste'}];
            gridService.listData = $scope.listData;

            $scope.add = function() {
                console.log("f add");
                $http.post("http://192.168.123.197:3000/activities", {name: "teste"})
                    .then(function(success){ console.log("succes: " + success) }, function(error){console.log("err: " + JSON.stringify( error))});
               // refreshData();
            }

            $scope.action = ''; //i - include | e - edit

            $scope.include = function(){
                $scope.name = '';
                $scope.password = '';
                $scope.action = 'i';
            }

            $scope.show_edit = function(n,p,i){//name, password, index
                $scope.name = n;
                $scope.password = p;
                $scope.index = i;
                $scope.action = 'e';
                console.log(i);
                $("#modalPush").modal();
            }

            $scope.save_push = function(){
                if( $('.ng-invalid').lenght ) {
                    //
                } else {
                    if($scope.i_e == 'i') {
                        $scope.listData.push({_cod: '01', name: $scope.name, password: $scope.password });
                    } else {
                        $scope.listData[$scope.index].name = $scope.name;
                        $scope.listData[$scope.index].password = $scope.password;
                    }

                    $("#modalPush").modal('hide');
                }
            }
        }
    );