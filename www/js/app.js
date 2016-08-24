// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('timerApp', ['ionic', 'angular-svg-round-progressbar']);

app.controller('timerController', function($scope, $timeout) {
  // var view-model
  var vm = this;

  vm.myTimerFixed = 10;
  vm.myTimer = 10;

  vm.radius = document.getElementsByClassName('round-progress')[0].getBoundingClientRect().width/2;
  
  var myTimerVariable;

  vm.myCustomTimer = function() {
    vm.myTimer--;

    if(vm.myTimer == 0) {
      $timeout.cancel(myTimerVariable);
      complete(false);
      return false;
    }
    myTimerVariable = $timeout(vm.myCustomTimer, 1000);
  }

  vm.start = function() {
    myTimerVariable = $timeout(vm.myCustomTimer, 1000);
  }

  vm.pause = function() {
    $timeout.cancel(myTimerVariable);
    complete(true);
  }

  vm.stop = function() {
    vm.myTimer = 10;
    $timeout.cancel(myTimerVariable);
    complete(true);
  }

  var complete = function(forceFulAbort) {
    if(forceFulAbort) {
      alert('You killed the timer');
    } else {
      alert('Timer completed');
    }
  }

  vm.getStyle = function(){
    var transform = 'translateY(-50%) translateX(-50%)';
    return {
        'top': '50%',
        'bottom': 'auto',
        'left': '50%',
        'transform': transform,
        '-moz-transform': transform,
        '-webkit-transform': transform,
        'font-size': vm.radius/3.5 + 'px'
    };
  };

}); //timerController


// run application
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
  });
})
