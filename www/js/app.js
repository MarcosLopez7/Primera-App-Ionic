// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function(){
var app = angular.module('starter', ['ionic', 'angularMoment'])

app.controller('RedditCtrl', function($scope, $http){
    $scope.posts = [];
    $http.get('https://www.reddit.com/r/gaming/new/.json').success(function(posts){
        //console.log(posts);
        angular.forEach(posts.data.children, function(post){
            $scope.posts.push(post.data);
            //console.log(post);
        });
    });
    
    $scope.loadMore = function(){
        var params = {};
        if($scope.posts.length > 0){
            params['after'] = $scope.posts[$scope.posts.length - 1].name;
        }
        $http.get('https://www.reddit.com/r/gaming/new/.json', {params:params}).success(function(posts){
        //console.log(posts);
            angular.forEach(posts.data.children, function(post){
                $scope.posts.push(post.data);
            //console.log(post);
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    
    $scope.doRefresh = function(){
        if($scope.posts.length > 0){
            var params = {'before': $scope.posts[0].name};
        } else {
            return;
        }
        $http.get('https://www.reddit.com/r/gaming/new/.json', {params:params}).success(function(posts){
        //console.log(posts);
            var newPosts = []; 
            angular.forEach(posts.data.children, function(post){
                newPosts.push(post.data);
            //console.log(post);
            });
            $scope.posts = newPosts.concat($scope.posts)
           $scope.$broadcast('scroll.refreshComplete');
        });
    };
    
    $scope.openLink = function(url){
        window.open(url, '_blank')
    }
});

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
      if(window.cordova && window.cordova.InAppBrowser){
            window.open = cordova.InAppBrowser.open;
      }
      
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());