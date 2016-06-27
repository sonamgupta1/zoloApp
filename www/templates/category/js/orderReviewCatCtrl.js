appControllers.controller('orderReviewCatCtrl', function ($scope, $rootScope,$state, $stateParams,OrderReviewService,$cordovaNetwork) {
  
  var id =  window.localStorage['id'];
  var booking_id = window.localStorage['booking_id'];
  $scope.isChecked = true;
  var access_token = window.localStorage['access_token'];
  window.localStorage['cat_id'] = $stateParams.cat_id;
  window.localStorage['product_id'] = $stateParams.product_id;

  OrderReviewService.booking_info_orp(booking_id,id).then(function(data){
      $scope.orp_result = data.data.data;
    });

  if($cordovaNetwork.isOnline() == true){
    $scope.online = true;
  }
  else{
    $scope.online = false;
  }

  $scope.try_again = function(){
    $rootScope.$broadcast('loading:show');
    if($cordovaNetwork.isOnline() == true){
      $scope.online = true;
      $rootScope.$broadcast('loading:hide');
      OrderReviewService.booking_info_orp(booking_id,id).then(function(data){
        $scope.orp_result = data.data.data;
      });
    }
    else{
      $scope.online = false;
      $rootScope.$broadcast('loading:hide');
    }
  };
  
  $scope.payment = function(){
    $state.go('app.add_address');
  };

  $scope.add_address = function(){
    $state.go('app.address');
  };
  
  $scope.payment_option = function(){
    $state.go('app.paymentOption');
  };
  
  $scope.back_to_cat_pdp = function(){
    $state.go('app.cat_product_desc',{'cat_id':$stateParams.cat_id,'sub_cat_id': $stateParams.sub_cat_id,'product_id':$stateParams.product_id});

  };
});

