angular.module('calendarApp')
    .controller('activitiesCtrl',
    function($scope, gridService, $http){
        //$scope.listData = [{_cod: '01', name: 'André2', password:'teste'},{_cod: '01', name: 'André2', password:'teste'}];
        gridService.listData = $scope.listData;

                    var urlData = gridService.urlGlobal + 'activities';
                    var urlUsers = gridService.urlGlobal + 'users';
                    var urlVehicles = gridService.urlGlobal + 'vehicles';
                    //var newData;

                    $http.get(urlVehicles).then(
                        function(response){
                            $scope.listVehicles = response.data;
                        }
                    );

                    $http.get(urlUsers).then(
                        function(response){
                            $scope.listUsers = response.data;
                        }
                    );

                    $http.get(urlData).then(
                        function(response){
                            $scope.listData = response.data;
                            console.log(response.data);
                        }
                    );

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

                    function updateRest(id,name) {
                        $http.put(urlData + '/' + id, {name: $scope.name} ).then(
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
                        $scope.name = '';
                        $scope.action = 'i';
                    }

                    $scope.show_edit = function(n,i){//name, password, index
                        $scope.name = n;
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
                            console.log('teste');
                            if($scope.action == 'i') {

                                var newData = { name: $scope.name };
                                $scope.listData.push(newData);
                                addRest(newData);
                            } else {
                                $scope.listData[$scope.index].name = $scope.name;
                                updateRest($scope.listData[$scope.index]._id);
                            }

                            $("#modalPush").modal('hide');
                        }
                    }
                }
            );