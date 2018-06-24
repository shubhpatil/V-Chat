// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// >>>>>>>>> 'ngCordova', 'ion-floating-menu' <<<<<<<< DEPENDENCY
var app = angular.module('starter', ['ionic','firebase','ion-floating-menu'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
      /*
      var config = {
            apiKey: "AIzaSyDCWHsbYEU8qunDohhUveS2UfslKLQ4sBE",
            authDomain: "vchat-1dd6b.firebaseapp.com",
            databaseURL: "https://vchat-1dd6b.firebaseio.com",
            projectId: "vchat-1dd6b",
            storageBucket: "vchat-1dd6b.appspot.com",
            messagingSenderId: "510754233130"
        };
      firebase.initializeApp(config);
      */
  });
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })
    
    .state('app.welcome', {
      url: '/welcome',
      views: {
        'menuContent': {
          templateUrl: 'templates/welcome.html'
        }
      }
    })
    
    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })

    .state('app.chat', {
      url: '/chat',
      views: {
        'menuContent': {
          templateUrl: 'templates/chat.html',
          controller: 'chatCtrl'
        }
      }
    });
    
    $urlRouterProvider.otherwise('/app/welcome');
});

app.controller('loginCtrl',function($scope,$window){
    
    $scope.loginFunc = function(name)
    {
        var user = name;
        sessionStorage.setItem("pname",user);
        location.href = 'main.html';
    }
    
});

app.controller('menuCtrl',function($scope){
    $scope.pname = sessionStorage.getItem("pname");
});

app.controller('chatCtrl',function($scope,$firebaseArray,$ionicScrollDelegate){
    $scope.pname = sessionStorage.getItem("pname");
    
    var ref = firebase.database().ref().child('Messages');
    //var ref = new firebase("https://vchat-1dd6b.firebaseio.com");
    $scope.messages = $firebaseArray(ref);
    
    $scope.scroll = function(){
        $ionicScrollDelegate.scrollBottom();
    }
     
    $scope.fireSend = function(chat){
        $scope.chat = "";
        $scope.messages.$add({
            user: $scope.pname,
            message: chat,
            date: Date.now()
        });
        $ionicScrollDelegate.scrollBottom();
    }
    
    /*
    $scope.chats = [{
        "pic": "img/pdp.jpg",
        "text": '"Hii !"'
        }];
    
    $scope.addChat = function(chat){
        $scope.chats.push({"pic":"img/pdp.jpg","text":chat});
        $scope.chat = "";
    }*/
    
});