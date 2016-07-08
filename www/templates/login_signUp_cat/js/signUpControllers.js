
appControllers.controller('signUpCatCtrl', function ($scope,$stateParams, $timeout, signUpService, $state, $auth,
                                                        $mdToast,$http, serverConfig,$rootScope,$ionicHistory,
                                                        $ionicViewSwitcher,profileService) {
  
    $scope.redirection = function (){
        $state.go('app.cat_product_desc',{'cat_id':$stateParams.cat_id,'sub_cat_id': $stateParams.sub_cat_id,'product_id':$stateParams.product_id});
    };
    
    $scope.user = {};
    $scope.optional_page = function(){
        $state.go('app.optional_cat',{'cat_id':$stateParams.cat_id,'sub_cat_id': $stateParams.sub_cat_id,'product_id':$stateParams.product_id});
    };
    signUpData = function () {
        data = {
            "email": $scope.user.email,
            "mobile": $scope.user.mobile,
            "name": $scope.user.name,
            "password": $scope.user.password,
            "password_confirmation": $scope.user.password,
        }
    };



    $scope.signUp = function () {
        signUpData();
        if(($scope.user.name)&&($scope.user.email)&&($scope.user.mobile)&&($scope.user.password)){
            if(($scope.user.mobile.toString().length == 10) && ($scope.user.password.length >= 6)){
                var email =$scope.user.email;
                var pass = $scope.user.password;
                signUpService.signUp(data).then(function (data) {
                    $scope.credentials = data;
                    if($scope.credentials.status == 200){
                        var user_1 = {
                            "email": email,
                            "password": pass,
                            "grant_type": "password",
                            "client_id": "client_1",
                            "client_secret": "client_secret",
                            "username":email
                        }
                        $scope.get_token(user_1);
                    }
                });
            }
            else{
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Password should have 6 characters at-least and mobile should have 10 digits!'
                        }
                    }
                });
            }
        }
        else{
            $mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 800,
                position: 'top',
                locals: {
                    displayOption: {
                        title: 'Please, fill above required fields!'
                    }
                }
            });
        }

    };

    $scope.get_token = function(user){
        $auth.login(user)
            .then(function (response) {
                if(response.status == '200'){
                    profileService.get_profile(response.data.access_token).then(function(data){
                        window.localStorage['profile_name'] = data.data.data.name;
                        window.localStorage['profile_img'] = data.data.data.image;
                    })
                    window.localStorage['access_token']=response.data.access_token;
                    $rootScope.$broadcast('logged_in', { message: 'login successfully' });
                    $state.go('app.cat_product_desc',{'cat_id':$stateParams.cat_id,'sub_cat_id': $stateParams.sub_cat_id,'product_id':$stateParams.product_id});

                }
            })
            .catch(function (response) {
                window.localStorage['access_token']=undefined;
                $auth.logout();
                $state.go('app.cat_product_desc',{'cat_id':$stateParams.cat_id,'sub_cat_id': $stateParams.sub_cat_id,'product_id':$stateParams.product_id});
            });
    };
});
