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

                    function addSelectItens(id,selectItem){
                        $('#' + id + ' option').each(function(){
                                selectItem.push( $(this).val());
                        });
                        return selectItem;
                    }

                    function getJSONData(){
                        return {name: $scope.name,
                                dt_start: $scope.dt_start,
                                dt_end: $scope.dt_end,
                                local: $scope.local,
                                users: addSelectItens("textarea2E", $scope.insertListUsers),
                                vehicles: addSelectItens("textarea2V", $scope.insertListVehicles),
                                value: $scope.value,
                                resourceType: $scope.resourceType};
                    }

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
                        $http.put(urlData + '/' + id, getJSONData() ).then(
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
                        $scope.dt_start = '';
                        $scope.dt_end = '';
                        $scope.local = '';
                        $scope.insertListUsers = [];
                        $scope.insertListVehicles = [];
                        $scope.value = '';
                        $scope.resourceType = '';
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
                            if($scope.action == 'i') {

                                var newData = getJSONData();
                                $scope.listData.push(newData);
                                addRest(newData);
                            } else {
                                $scope.listData[$scope.index].name = $scope.name;
                                updateRest($scope.listData[$scope.index]._id);
                            }

                            $("#modalPush").modal('hide');
                        }
                    }



                    function setSelectItens(copy, textarea2, textarea, remove){
                        $(function(){
                            $(copy).on("click", function(){
                                $(".options option:selected").each(function(){
                                   $(textarea2).append('<option value='+$(this).text()+'>'+$(this).text()+'</option>');
                                    $('option:selected', textarea).remove();
                                });
                            });
                            $(remove).on("click", function(){
                                $(".remove option:selected").each(function(){
                                   $(textarea).append('<option>'+$(this).text()+'</option>');
                                    $('option:selected', textarea2).remove();
                                });
                            });
                        });
                    }

                    setSelectItens("#copyE","#textarea2E","#textareaE","#removeE");
                    setSelectItens("#copyV","#textarea2V","#textareaV","#removeV");

                }
            );