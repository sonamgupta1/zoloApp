appControllers.controller('packagesCtrl', function ($scope, $timeout, $mdUtil, packagesService, $ionicModal,
                                                    MaxPriceService, $mdSidenav, $log, $ionicHistory, $state,
                                                    $stateParams, algolia,$rootScope) {
    
    $scope.price_list = true;
    $scope.sorting_value = false;
    $scope.sort_by = false;
    $scope.price_range = [];
    $scope.choice={
        val:-1
    };
    var stringFilter = '';
    var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

    var index = client.initIndex('candybrush_packages');

    $scope.filter = {price: false};
    packagesService.getPackagesList($stateParams.sub_cat_id).then(function (data) {
        $scope.packages_list = data.data.data;
    });

    $scope.go_home = function(){
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.home');
    };

    $scope.productDescription = function (id) {
        $state.go('app.product_desc', {'cat_id':$stateParams.sub_cat_id,'product_id': id})
    };
    $scope.sorting_type = 'sort';
    $scope.filter_clear = function(){
        $scope.filter.price1 = '';
        $scope.filter.price2 = '';
        $scope.filter.price3 = '';
        $scope.filter.price4 = '';
        $scope.filter.price5 = '';

    };

    $ionicModal.fromTemplateUrl('templates/home/html/search_package_short_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openSortAndFilterModal = function () {
        $scope.modal.show();
    };
    $scope.closeSortAndFilterModal = function () {
        $scope.modal.hide();
    };

    $scope.price_list_option = function () {
        $scope.sorting_type = 'price';
        $scope.sort_by = false;
        $scope.price_list = true;
        $scope.sorting_value = false;
    };
    $scope.sorting_option = function () {
        $scope.sorting_type = 'sort';
        $scope.sort_by = true;
        $scope.price_list = false;
        $scope.sorting_value = true;

    };

    MaxPriceService.getMaxPrice().then(function (data) {
        $scope.max_price = data.data.data;
        $scope.range = {};
        $scope.range.from = 0;
        $scope.range.to = parseInt($scope.max_price);
        $scope.RangeOptions = {
            floor: 0,
            ceil: $scope.max_price,
            step: 500
        };
    });
    $scope.makefilters = function () {

        var my_maximum = Math.max.apply(null, $scope.price_range);
        var my_minimum = Math.min.apply(null, $scope.price_range);
        stringFilter = "deal_price : " + my_minimum + " TO " + my_maximum;
    };





    $scope.search_packages = function(stringFilter,load_option){
        if(load_option == false){
            $rootScope.$broadcast('loading:show');
            if(stringFilter==''){
                stringFilter='(isCompleted:true'+' OR '+'isCompleted:1)';
            }else {
                stringFilter = stringFilter + ' AND ' + '(isCompleted:true' + ' OR ' + 'isCompleted:1)';
            }
            stringFilter=stringFilter + ' AND ' + '(category_id:'+$stateParams.sub_cat_id + ' OR ' + 'subcategory_id:'+$stateParams.sub_cat_id+')';
            index.search(
                "", {
                    hitsPerPage: 5,
                    facets: '*',
                    filters: stringFilter,
                    maxValuesPerFacet: 10
                }).then(
                function(content){
                    $scope.packages = content.hits;
                    $scope.total_page=content.nbPages;
                    $scope.current_page=content.page;
                    $rootScope.$broadcast('loading:hide');

                }
            ).catch(function (error) {
                console.log("error",error);
                $rootScope.$broadcast('loading:hide');

            });

        }
        else{
            $rootScope.$broadcast('loading:show');
            if($scope.current_page <= $scope.total_page){
                if(stringFilter==''){
                    stringFilter='(isCompleted:true'+' OR '+'isCompleted:1)';
                }else {
                    stringFilter = stringFilter + ' AND ' + '(isCompleted:true' + ' OR ' + 'isCompleted:1)';
                }
                stringFilter=stringFilter + ' AND ' + '(category_id:'+$stateParams.sub_cat_id + ' OR ' + 'subcategory_id:'+$stateParams.sub_cat_id+')';
                index.search(
                    "", {
                        hitsPerPage: 5,
                        facets: '*',
                        filters: stringFilter,
                        maxValuesPerFacet: 10,
                        page:++$scope.current_page
                    }).then(
                    function(content){
                        angular.forEach(content.hits,function(obj){
                            $scope.packages.push(obj);
                        });
                        $rootScope.$broadcast('loading:hide');
                    }
                ).catch(function (error) {
                    console.log("error",error);
                    $rootScope.$broadcast('loading:hide');

                });
            }
            return;

        }

    };
     $scope.search_packages(stringFilter,false);
    
    $scope.filter_apply = function (filter) {
        $rootScope.$broadcast('loading:show');
        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

        var index = client.initIndex('candybrush_packages');

        //remove the draft packages from being shown in the search
        if(stringFilter==''){
            stringFilter='(isCompleted:true'+' OR '+'isCompleted:1)';
        }else {
            stringFilter = stringFilter + ' AND ' + '(isCompleted:true' + ' OR ' + 'isCompleted:1)';
        }
        stringFilter=stringFilter + ' AND ' + '(category_id:'+$stateParams.sub_cat_id + ' OR ' + 'subcategory_id:'+$stateParams.sub_cat_id+')';
        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            }).then(
            function(content){
                $scope.packages = content.hits;
                $scope.closeSortAndFilterModal();
                $rootScope.$broadcast('loading:hide');

            }
        ).catch(function (error) {
            console.log("error",error);
            $rootScope.$broadcast('loading:hide');

        });
    };

    $scope.load_more = function(){
        $scope.search_packages(stringFilter,true);
    };


    $scope.pricehtol = function (filter) {
        $rootScope.$broadcast('loading:show');

        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

        var index = client.initIndex('deal_price_desc');

        if(stringFilter==''){
            stringFilter='(isCompleted:true'+' OR '+'isCompleted:1)';
        }else {
            stringFilter = stringFilter + ' AND ' + '(isCompleted:true' + ' OR ' + 'isCompleted:1)';
        }
        stringFilter=stringFilter + ' AND ' + '(category_id:'+$stateParams.sub_cat_id + ' OR ' + 'subcategory_id:'+$stateParams.sub_cat_id+')';
        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            }).then(
            function(content){
                $scope.packages = content.hits;
                $scope.closeSortAndFilterModal();
                $rootScope.$broadcast('loading:hide');
            }
        ).catch(function (error) {
            console.log("error",error);
            $rootScope.$broadcast('loading:hide');

        });

    };
    $scope.priceltoh = function (filter) {
        $rootScope.$broadcast('loading:show');

        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');

        var index = client.initIndex('deal_price_asc');

        if(stringFilter==''){
            stringFilter='(isCompleted:true'+' OR '+'isCompleted:1)';
        }else {
            stringFilter = stringFilter + ' AND ' + '(isCompleted:true' + ' OR ' + 'isCompleted:1)';
        }
        stringFilter=stringFilter + ' AND ' + '(category_id:'+$stateParams.sub_cat_id + ' OR ' + 'subcategory_id:'+$stateParams.sub_cat_id+')';
        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            }).then(
            function(content){
                $scope.packages = content.hits;
                $scope.closeSortAndFilterModal();
                $rootScope.$broadcast('loading:hide');
            }
        ).catch(function (error) {
            console.log("error",error);
            $rootScope.$broadcast('loading:hide');

        });

    };
    $scope.newfirst = function (filter) {
        $rootScope.$broadcast('loading:show');
        var client = algolia.Client('ORMLLAUN2V', '48e614067141870003ebf7c9a1ba4b59');
        var index = client.initIndex('new_packages_first');

        if(stringFilter==''){
            stringFilter='(isCompleted:true'+' OR '+'isCompleted:1)';
        }else {
            stringFilter = stringFilter + ' AND ' + '(isCompleted:true' + ' OR ' + 'isCompleted:1)';
        }
        stringFilter=stringFilter + ' AND ' + '(category_id:'+$stateParams.sub_cat_id + ' OR ' + 'subcategory_id:'+$stateParams.sub_cat_id+')';
        index.search(
            "", {
                hitsPerPage: 5,
                facets: '*',
                filters: stringFilter,
                maxValuesPerFacet: 10
            }).then(
            function(content){
                $scope.packages = content.hits;
                $scope.closeSortAndFilterModal();
                $rootScope.$broadcast('loading:hide');
            }
        ).catch(function (error) {
            console.log("error",error);
            $rootScope.$broadcast('loading:show');

        });

    };

    $scope.addPrice = function (initial, final) {
        console.log($scope.filter);
        $scope.price_range = [];
        if ($scope.filter.price1) {
            $scope.price_range.push(0, 1000);
        }
        if ($scope.filter.price2) {
            $scope.price_range.push(1001, 10000);
        }
        if ($scope.filter.price3) {
            $scope.price_range.push(10001, 50000);
        }
        if ($scope.filter.price4) {
            $scope.price_range.push(50001, 100000);
        }
        if ($scope.filter.price5) {
            $scope.price_range.push(100001, $scope.max_price);
        }
        $scope.makefilters();
    };
    $scope.makeSort=function(val){
        switch($scope.choice.val){
            case 1:{$scope.pricehtol();
                break;}
            case 2:{$scope.priceltoh();break;}
            case 3:{$scope.newfirst();break;}
        }
    }
});