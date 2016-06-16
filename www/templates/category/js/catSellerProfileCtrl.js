appControllers.controller('catSellerProfileCtrl', function ($scope, $mdUtil,productService,SellerProfileService,
                                                            $state,$stateParams) {

    productService.getProductDescription($stateParams.product_id).then(function(data){
        $scope.package = data.data.data;
        if($scope.package.seller_profile.user_id){
            SellerProfileService.getSellerInfo($scope.package.seller_profile.user_id).then(function (data) {
                $scope.seller_info = data.data.data;
            });
        }
    });

    $scope.back_to_cat_pdp = function () {
        $state.go('app.cat_product_desc',{'cat_id':$stateParams.cat_id,'sub_cat_id': $stateParams.sub_cat_id,'product_id':$stateParams.product_id})
    };

    $scope.getPdpForCat = function(parent_id,sub_cat_id,p_id){
        $state.go('app.cat_product_desc',{'cat_id':parent_id,'sub_cat_id':sub_cat_id,'product_id':p_id});
    };
});

