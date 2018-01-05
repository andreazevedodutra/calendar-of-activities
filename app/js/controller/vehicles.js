/*
Regras
o usuário do tiṕo administrador só vai cadastrar usuários do tipo gerente
o usuário do tipo gerente só vai cadastrar usuários do tipo funcionário
*/

angular.module('calendarApp')
.controller('vehiclesCtrl',
    function($scope, gridService, $http){
        //$scope.listData = [{_cod: '01', name: 'André', password:'teste'},{_cod: '01', name: 'André', password:'teste'}];
        gridService.listData = $scope.listData;

        var urlData = gridService.urlGlobal + 'vehicles';
        //var newData;


        $http.get(urlData).then(
            function(response){
                $scope.listData = response.data;
                //console.log(response.data);
            }
        );

        /*
        $scope.add = function() {
            console.log("f add");
            $http.post("http://192.168.123.197:3000/users", {"name": "teste"})
                .then(function(success){ console.log("succes: " + success) }, function(error){console.log("err: " + JSON.stringify( error))});
           // refreshData();
        }*/

        function addRest( newObj ) {
            $http.post(urlData, newObj).then(
                function(success){
                    console.log('sucess: ' + JSON.stringify(success) );
                },
                function(error){
                    console.log('error: ' + JSON.stringify(error) );
                }
            )
        }

        function updateRest(id) {
            $http.put(urlData + '/' + id, {plate: $scope.plate} ).then(
                function(success){
                    console.log('sucess: ' + JSON.stringify(success) );
                },
                function(error){
                    console.log('error: ' + JSON.stringify(error) );
                }
            );
        }

        $scope.action = ''; //i - include | e - edit

        $scope.include = function(){
            $scope.plate = '';
            $scope.action = 'i';
        }

        $scope.show_edit = function(p,i){//plate,
            $scope.plate = p;
            $scope.index = i;
            $scope.action = 'e';
            console.log(i);
            $("#modalPush").modal();
        }

        $scope.delete = function(i){//index
            $http.delete(urlData + '/' + $scope.listData[i]._id).then(
                function(success){
                    $scope.listData.splice(i,1);
                    console.log($scope.listData);
                    console.log('sucess: ' + JSON.stringify(success) );
                },
                function(error){
                    console.log('error: ' + JSON.stringify(error) );
                }
            );
        }

        $scope.save_push = function(){
            if( $('.ng-invalid').lenght ) {
                //
            } else {
                if($scope.action == 'i') {
                    var newData = { plate: $scope.plate };
                    $scope.listData.push(newData);
                    addRest(newData);
                } else {
                    $scope.listData[$scope.index].plate = $scope.plate;
                    updateRest($scope.listData[$scope.index]._id);
                }

                $("#modalPush").modal('hide');
            }
        }
    }
);