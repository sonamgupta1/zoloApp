//
//Welcome to app.js
//This is main application config of project. You can change a setting of :
//  - Global Variable
//  - Theme setting
//  - Icon setting
//  - Register View
//  - Spinner setting
//  - Custom style
//
//Global variable use for setting color, start page, message, oAuth key.
var db = null; //Use for SQLite database.
window.globalVariable = {
    //custom color style variable
    color: {
        appPrimaryColor: "",
        dropboxColor: "#017EE6",
        facebookColor: "#3C5C99",
        foursquareColor: "#F94777",
        googlePlusColor: "#D73D32",
        instagramColor: "#517FA4",
        wordpressColor: "#0087BE"
    },// End custom color style variable
    startPage: {
        url: "/app/dashboard",//Url of start page.
        state: "app.dashboard"//State name of start page.
    },
    message: {
        errorMessage: "Technical error please try again later." //Default error message.
    },
    oAuth: {
        dropbox: "your_api_key",//Use for Dropbox API clientID.
        facebook: "your_api_key",//Use for Facebook API appID.
        foursquare: "your_api_key", //Use for Foursquare API clientID.
        instagram: "your_api_key",//Use for Instagram API clientID.
        googlePlus: "your_api_key",//Use for Google API clientID.
    },
    adMob: "your_api_key" //Use for AdMob API clientID.
};// End Global variable



angular.module('starter', ['ionic','ngIOS9UIWebViewPatch', 'starter.controllers', 'starter.services', 'ngMaterial',
        'ionic.contrib.drawer','ngMessages', 'ngCordova','satellizer','algoliasearch','ngSanitize'])
    .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state,profileService,$cordovaSplashscreen,
                   $mdDialog, $mdBottomSheet,$ionicPopup) {


        function initialSQLite() {
            db = window.cordova ? $cordovaSQLite.openDB("contract.db") : window.openDatabase("contract.db", "1.0", "IonicMaterialDesignDB", -1);
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS contracts " +
                "( id           integer primary key   , " +
                "  firstName    text                  , " +
                "  lastName     text                  , " +
                "  telephone    text                  , " +
                "  email        text                  , " +
                "  note         text                  , " +
                "  createDate   dateTime              , " +
                "  age          integer               , " +
                "  isEnable     Boolean)                ");
        };
        // End creating SQLite database table.

        // Create custom defaultStyle.
        function getDefaultStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important; " +
                "   border-style            : none;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        }// End create custom defaultStyle

        // Create custom style for product view.
        function getProductStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important;" +
                "   border-style            : none;" +
                "   background-image        : url('img/background_cover_pixels.png') !important;" +
                "   background-size         : initial !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        }// End create custom style for product view.

        // Create custom style for contract us view.
        function getContractUsStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : transparent !important;" +
                "   border-style            : none;" +
                "   background-image        : none !important;" +
                "   background-position-y   : 4px !important;" +
                "   background-size         : initial !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        } // End create custom style for contract us view.

        // Create custom style for Social Network view.
        function getSocialNetworkStyle(socialColor) {
            return "" +
                ".material-background-nav-bar {" +
                "   background              : " + socialColor + " !important;" +
                "   border-style            : none;" +
                "} " +
                "md-ink-bar {" +
                "   color                   : " + socialColor + " !important;" +
                "   background              : " + socialColor + " !important;" +
                "}" +
                "md-tab-item {" +
                "   color                   : " + socialColor + " !important;" +
                "}" +
                " md-progress-circular.md-warn .md-inner .md-left .md-half-circle {" +
                "   border-left-color       : " + socialColor + " !important;" +
                "}" +
                " md-progress-circular.md-warn .md-inner .md-left .md-half-circle, md-progress-circular.md-warn .md-inner .md-right .md-half-circle {" +
                "    border-top-color       : " + socialColor + " !important;" +
                "}" +
                " md-progress-circular.md-warn .md-inner .md-gap {" +
                "   border-top-color        : " + socialColor + " !important;" +
                "   border-bottom-color     : " + socialColor + " !important;" +
                "}" +
                "md-progress-circular.md-warn .md-inner .md-right .md-half-circle {" +
                "  border-right-color       : " + socialColor + " !important;" +
                " }" +
                ".spinner-android {" +
                "   stroke                  : " + socialColor + " !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                   : " + socialColor + " !important;" +
                "}" +
                "a.md-button.md-primary, .md-button.md-primary {" +
                "   color                   : " + socialColor + " !important;" +
                "}";
        }// End create custom style for Social Network view.


        function initialRootScope() {
            $rootScope.appPrimaryColor = appPrimaryColor;// Add value of appPrimaryColor to rootScope for use it to base color.
            $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
            $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
        };

        function hideActionControl() {
            //For android if user tap hardware back button, Action and Dialog should be hide.
            $mdBottomSheet.cancel();
            $mdDialog.cancel();
        };


        // createCustomStyle will change a style of view while view changing.
        // Parameter :
        // stateName = name of state that going to change for add style of that page.
        function createCustomStyle(stateName) {
            var customStyle =
                ".material-background {" +
                "   background-color          : " + appPrimaryColor + " !important;" +
                "   border-style              : none;" +
                "}" +
                ".spinner-android {" +
                "   stroke                    : " + appPrimaryColor + " !important;" +
                "}";

            switch (stateName) {
                case "app.productList" :
                case "app.productDetail":
                case "app.productCheckout":
                case "app.clothShop" :
                case "app.catalog" :
                    customStyle += getProductStyle();
                    break;
                case "app.dropboxLogin" :
                case "app.dropboxProfile":
                case "app.dropboxFeed" :
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.dropboxColor);
                    break;
                case "app.facebookLogin" :
                case "app.facebookProfile":
                case "app.facebookFeed" :
                case "app.facebookFriendList":
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.facebookColor);
                    break;
                case "app.foursquareLogin" :
                case "app.foursquareProfile":
                case "app.foursquareFeed" :
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.foursquareColor);
                    break;
                case "app.googlePlusLogin" :
                case "app.googlePlusProfile":
                case "app.googlePlusFeed" :
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.googlePlusColor);
                    break;
                case "app.instagramLogin" :
                case "app.instagramProfile":
                case "app.instagramFeed" :
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.instagramColor);
                    break;
                case "app.wordpressLogin" :
                case "app.wordpressFeed":
                case "app.wordpressPost" :
                    customStyle += getSocialNetworkStyle(window.globalVariable.color.wordpressColor);
                    break;
                case "app.contractUs":
                    customStyle += getContractUsStyle();
                    break;
                default:
                    customStyle += getDefaultStyle();
                    break;
            }
            return customStyle;
        }// End createCustomStyle

        // Add custom style while initial application.
        $rootScope.customStyle = createCustomStyle(window.globalVariable.startPage.state);

        $ionicPlatform.ready(function () {
            ionic.Platform.isFullScreen = true;
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            setTimeout(function () {
                $cordovaSplashscreen.hide();
            }, 500);

            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                            title: "Internet Disconnected",
                            content: "The internet is disconnected on your device."
                        })
                        .then(function(result) {
                            if(!result) {
                                ionic.Platform.exitApp();
                            }
                        });
                }
            }


            initialSQLite();
            initialRootScope();





            //Checking if view is changing it will go to this function.
            $rootScope.$on('$ionicView.beforeEnter', function () {
                //hide Action Control for android back button.
                hideActionControl();
                // Add custom style ti view.
                $rootScope.customStyle = createCustomStyle($ionicHistory.currentStateName());
            });


            
            var access_token = window.localStorage['access_token'];

            $rootScope.$on('logged_in', function (event, args) {
                if(access_token && access_token != 'undefined'){
                    profileService.get_profile(access_token).then(function(data){
                        $rootScope.profile = data.data.data;
                        console.log("sonam",JSON.stringify($rootScope.profile))
                    })
                }
            });
        });
    })
    .config(
        function ($authProvider, serverConfig) {
            $authProvider.httpInterceptor = function() { return true; },
                $authProvider.tokenName = 'access_token';
            $authProvider.google({
                url: serverConfig.address + 'api/auth/google',
                // clientId: '982638547625-ui0lp1pteh6moug1sgct1ag0ub0aen7g.apps.googleusercontent.com',
                clientId: '936213911318-1mnllojl5hqu2b4o17e47hpbk2e4s66c.apps.googleusercontent.com',
                clientSecret: '3_FHOlRYTrJffGBhGAMr59b_',
                redirectUri: 'http://'+location.hostname+'/'
                // redirectUri: 'http://localhost/'
            });
            $authProvider.facebook({
                url: serverConfig.address + 'api/auth/facebook',
                clientId: '953913041345816',
                clientSecret: 'e9652fa4cea1dca0a1d6658adaa0ab36',
                redirectUri: 'http://'+location.hostname+'/'
            });
            $authProvider.loginUrl = serverConfig.address + 'oauth/access_token';
        })

    .config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $mdColorPalette, $mdIconProvider) {
        // Use for change ionic spinner to android pattern.
        $ionicConfigProvider.spinner.icon("android");
        $ionicConfigProvider.views.swipeBackEnabled(false);

        $ionicConfigProvider.backButton.previousTitleText(false).text('');


        // mdIconProvider is function of Angular Material.
        // It use for reference .SVG file and improve performance loading.
        $mdIconProvider
            .icon('facebook', 'img/icons/facebook.svg')
            .icon('twitter', 'img/icons/twitter.svg')
            .icon('mail', 'img/icons/mail.svg')
            .icon('message', 'img/icons/message.svg')
            .icon('share-arrow', 'img/icons/share-arrow.svg')
            .icon('more', 'img/icons/more_vert.svg');


        //Learn more about_us material color patten: https://www.materialpalette.com/
        //Learn more about_us material theme: https://material.angularjs.org/latest/#/Theming/01_introduction
        $mdThemingProvider
            .theme('default')
            .primaryPalette('deep-purple')
            .accentPalette('pink');

        appPrimaryColor = $mdColorPalette[$mdThemingProvider._THEMES.default.colors.primary.name]["500"]; //Use for get base color of theme.

        //$stateProvider is using for add or edit HTML view to navigation bar.
        //
        //Schema :
        //state_name(String)      : Name of state to use in application.
        //page_name(String)       : Name of page to present at localhost url.
        //cache(Bool)             : Cache of view and controller default is true. Change to false if you want page reload when application navigate back to this view.
        //html_file_path(String)  : Path of html file.
        //controller_name(String) : Name of Controller.
        //
        //Learn more about_us ionNavView at http://ionicframework.com/docs/api/directive/ionNavView/
        //Learn more about_us  AngularUI Router's at https://github.com/angular-ui/ui-router/wiki
        $stateProvider
            .state('get_started',{
                url: "/mainWalkthrough",
                templateUrl: "templates/MainWalkthrough/html/mainWalkthrough.html",
                controller: 'mainWalkthroughCtrl'
            })
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu/html/index.html",
                controller: 'MenuCtrl'
            })

              .state('app.home', {
                url: "/home",
                  cache:false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/index.html",
                        controller: "MenuCtrl"
                    }
                }
            })
            .state('app.subCategory', {
                url: "/subCategory/:cat_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/subCategory.html",
                        controller: "subCategoryCtrl"
                    }
                },
                resolve: {
                    cat_id: function($stateParams) {
                    }
                }
            })
            .state('app.orp', {
                url: "/orp/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/orp.html",
                        controller: "orderReviewCtrl"
                    }
                }
            })
            .state('app.search_info', {
                url: "/search_info/:search_text",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search/html/index.html",
                        controller: "searchCtrl"
                    }
                },
                resolve: {
                    search_text: function($stateParams) {
                    }
                }
            })
            .state('app.search_pdp', {
                url: "/search_pdp/:search_text/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search/html/search_pdp.html",
                        controller: "searchPdpCtrl"
                    }
                },
                resolve: {
                    search_text: function($stateParams) {
                    }
                }
            })

            .state('app.orp_search', {
                url: "/orp_search/:search_text/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search/html/orp_search.html",
                        controller: "orderReviewSearchCtrl"
                    }
                },
                resolve: {
                    search_text: function($stateParams) {
                    }
                }
            })


            .state('app.seller_profile_search', {
                url: "/seller_profile_search/:search_text/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search/html/seller_profile_search.html",
                        controller: "sellerProfileSearchCtrl"
                    }
                },
                resolve: {
                    search_text: function($stateParams) {
                    }
                }
            })

            .state('app.full_description_search', {
                url: "/full_description_search/:search_text/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search/html/full_description_search.html",
                        controller: "fullDescriptionSearchCtrl"
                    }
                },
                resolve: {
                    search_text: function($stateParams) {
                    }
                }
            })
            
            

            .state('app.optional_login_search', {
                url: "/optional_login_search/:search_text/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_search/html/optional.html",
                        controller: "optionalSearchCtrl"
                    }
                },
                resolve: {
                    search_text: function($stateParams) {
                    }
                }
            })
            .state('app.login_search', {
                url: "/login_search/:search_text/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_search/html/login.html",
                        controller: "LoginSearchCtrl"
                    }
                },
                resolve: {
                    search_text: function($stateParams) {
                    }
                }
            })
            .state('app.signUp_search', {
                url: "/signUp_search/:search_text/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_search/html/signUp.html",
                        controller: "signUpSearchCtrl"
                    }
                },
                resolve: {
                    search_text: function($stateParams) {
                    }
                }
            })
            

            .state('app.forget_pwd_search', {
                url: "/forget_pwd_search/:search_text/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_search/html/forget_pwd_search.html",
                        controller: "ForgetPwdSearchCtrl"
                    }
                },
                resolve: {
                    search_text: function($stateParams) {
                    }
                }
            })

            .state('app.package_list', {
                url: "/package_list/:sub_cat_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/packages.html",
                        controller: "packagesCtrl"
                    }
                },
                resolve: {
                    sub_cat_id: function($stateParams) {
                    }
                }
            })
            .state('app.paymentOption', {
                url: "/paymentOption",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/payment_option.html",
                        controller: "paymentCtrl"
                    }
                }
            })
           
           .state('app.allCategory', {
                url: "/allCategory",
                views: {
                    'menuContent': {
                         templateUrl: "templates/category/html/index.html",
                        controller: "CategoryCtrl"
                    }
                }
            })
            .state('app.cat_sub_cat_list', {
                url: "/cat_sub_cat_list/:cat_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category/html/cat_sub_cat.html",
                        controller: "catSubCategoryCtrl"
                    }
                },
                resolve: {
                    cat_id: function($stateParams) {
                    }
                }
            })


            .state('app.cat_package_list', {
                url: "/cat_package_list/:cat_id/:sub_cat_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category/html/cat_packages_list.html",
                        controller: "catPackagesCtrl"
                    }
                },
                resolve: {
                    sub_cat_id: function($stateParams) {
                    }
                }
            })
            .state('app.cat_product_desc', {
                url: "/cat_product_desc/:cat_id/:sub_cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category/html/cat_product_description.html",
                        controller: "catProductDescriptionCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.orp_cat', {
                url: "/orp_cat/:cat_id/:sub_cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category/html/orp_cat.html",
                        controller: "orderReviewCatCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.cat_seller_profile', {
                url: "/cat_seller_profile/:cat_id/:sub_cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category/html/cat_seller_profile.html",
                        controller: "catSellerProfileCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.cat_full_description', {
                url: "/cat_full_description/:cat_id/:sub_cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category/html/cat_full_description.html",
                        controller: "catFullDescriptionCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })

            .state('app.optional_cat', {
                url: "/optional_cat/:cat_id/:sub_cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_cat/html/optional.html",
                        controller: "optionalCatCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.login_cat', {
                url: "/login_cat/:cat_id/:sub_cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_cat/html/login.html",
                        controller: "LoginCatCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.signUp_cat', {
                url: "/signUp_cat/:cat_id/:sub_cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_cat/html/signUp.html",
                        controller: "signUpCatCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.forget_pwd_cat', {
                url: "/forget_pwd_cat/:cat_id/:sub_cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_cat/html/forget_pwd_cat.html",
                        controller: "ForgetPwdCatCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })

            .state('app.about_us', {
                url: "/aboutUs",
                views: {
                    'menuContent': {
                        templateUrl: "templates/about_us/html/index.html"
                    }
                }
            })
            .state('app.address', {
                url: "/address",
                cache:false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/address/html/index.html",
                        controller:'addressCtrl'
                    }
                }
            })

            .state('app.address_fill', {
                url: "/address_fill",
                views: {
                    'menuContent': {
                        templateUrl: "templates/address/html/address_fill.html",
                        controller:'addAddressCtrl'
                    }
                }
            })

            .state('app.edit_address', {
                url: "/edit_address/:edit_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/address/html/edit_address.html",
                        controller:'editAddressCtrl'
                    },

                    resolve: {
                        edit_id: function($stateParams) {
                        }
                    }
                }
            })


            .state('app.contact_us', {
                url: "/contactUs",
                views: {
                    'menuContent': {
                        templateUrl: "templates/contact_us/html/index.html",
                        controller:'contactCtrl'
                    }
                }
            })
            .state('app.term_n_con', {
                url: "/term_n_con",
                views: {
                    'menuContent': {
                        templateUrl: "templates/tNc/html/index.html"
                    }
                }
            })
            .state('app.refund_policy', {
                url: "/refund_policy",
                views: {
                    'menuContent': {
                        templateUrl: "templates/refundsPolicy/html/index.html"
                    }
                }
            })
            .state('app.cancellationPolicy', {
                url: "/cancellationPolicy",
                views: {
                    'menuContent': {
                        templateUrl: "templates/cancellationPolicy/html/index.html"
                    }
                }
            })
            .state('app.privacy_policy', {
                url: "/privacy_policy",
                views: {
                    'menuContent': {
                        templateUrl: "templates/PrivacyPolicy/html/index.html"
                    }
                }
            })
            .state('app.optional_index', {
                url: "/optional_index",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp/html/optional.html",
                        controller:"optionalCtrl"
                    }
                }
            })
            .state('app.login_index', {
                url: "/login_index",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp/html/login.html",
                        controller:"optionalLoginCtrl"
                    }
                }
            })
            .state('app.signUp_index', {
                url: "/signUp_index",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp/html/signUp.html",
                        controller:"signUpCtrl"
                    }
                }
            })
            .state('app.optional_index_pdp', {
                url: "/optional_index_pdp/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_pdp/html/optional.html",
                        controller:"optionalPdpCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.login_pdp', {
                url: "/login_pdp/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_pdp/html/login.html",
                        controller:"LoginPdpCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.signUpPdp', {
                url: "/signUpPdp/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_pdp/html/signUp.html",
                        controller:"signUpPdpCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.forgetPwdPdp', {
                url: "/forgetPwdPdp/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login_signUp_pdp/html/forgetPwdPdp.html",
                        controller:"ForgetPwdPdpCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.forget_password', {
                url: "/forget_password",
                views: {
                    'menuContent': {
                        templateUrl: "templates/forget_password/html/index.html",
                        controller: "ForgetPasswordCtrl"
                    }
                }
            })
            .state('app.product_desc', {
                url: "/product_desc/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/pdp.html",
                        controller: "productDescriptionCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })

            .state('app.payment_success', {
                url: "/payment_success/:b_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/payment_success.html",
                        controller:'paymentSuccessCtrl'
                    }
                },
                resolve: {
                    b_id: function($stateParams) {
                    }
                }
            })

            .state('app.payment_fail', {
                url: "/payment_fail/:t_id/:b_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/payment_fail.html",
                        controller:'paymentFailCtrl'
                        
                    }
                },
                resolve: {
                    t_id: function($stateParams) {
                    }
                }
            })
            .state('app.order_list', {
                url: "/order_list",
                views: {
                    'menuContent': {
                        templateUrl: "templates/order/html/index.html",
                        controller:'oderListCtrl'
                    }
                }
            })
            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile/html/index.html",
                        controller:'profileCtrl'
                    }
                }
            })
            .state('app.more', {
                url: "/more",
                views: {
                    'menuContent': {
                        templateUrl: "templates/more/html/index.html",
                        controller:'moreCtrl'
                    }
                }
            })
            .state('app.order_detail', {
                url: "/order_detail/:order_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/order/html/detail.html",
                        controller:'oderDetailCtrl'
                    },
                    resolve: {
                        order_id: function($stateParams) {
                        }
                    }
                }
            })
            
            .state('app.full_description', {
                url: "/full_description/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/full_description.html",
                        controller:"fullDescriptionCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })
            .state('app.seller_profile', {
                url: "/seller_profile/:cat_id/:product_id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home/html/seller_profile.html",
                        controller:"sellerProfileCtrl"
                    }
                },
                resolve: {
                    product_id: function($stateParams) {
                    }
                }
            })

            .state('app.wishlist', {
                url: "/wishlist",
                views: {
                    'menuContent': {
                        templateUrl: "templates/wishlist/html/index.html",
                        controller:'wishListCtrl'
                    }
                }
            })
        if(window.localStorage['SkipIntro']== 'true'){
            $urlRouterProvider.otherwise("app/home");
        }else{
            $urlRouterProvider.otherwise("/mainWalkthrough");
        }
    })

.constant("serverConfig", {
    "address": "http://54.169.76.224/"
})

    // .config(function($httpProvider) {
    //     $httpProvider.interceptors.push(function($rootScope,$q) {
    //         return {
    //             request: function(config) {
    //                 $rootScope.$broadcast('loading:show');
    //                 return config
    //             },
    //             response: function(response) {
    //                 $rootScope.$broadcast('loading:hide');
    //                 return response
    //             },
    //             responseError:function(rejection) {
    //                 $rootScope.$broadcast('loading:hide');
    //                 return $q.reject(rejection);
    //             }
    //         }
    //     })
    // })
.run(function($rootScope, $ionicLoading) {
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({template: '<div class="ui-progress-circular"><ion-spinner ng-if="!isAndroid" class="progress-circular">' +
        '</ion-spinner><md-progress-circular ng-if="isAndroid" md-mode="indeterminate"></md-progress-circular>' +
        '</div>'})
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
    })
})


.run(function($ionicPlatform, $ionicPopup) {
    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function(event) {
        if (true) { // your check here
            $ionicPopup.confirm({
                title: 'Zolo',
                template: 'Are you sure, you want to exit?'
            }).then(function(res) {
                if (res) {
                    ionic.Platform.exitApp();
                }
            })
        }
    }, 100);
});




