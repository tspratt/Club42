angular.module('club42')
  .controller('MainCtrl', ['$rootScope','$scope', '$state', 'memberData',
    function ($rootScope, $scope, $state, memberData) {
      $scope.activeState = 'sign-in';
      $scope.isLoggedIn = false;
      $scope.username = '';
      $scope.password = '';
      $scope.isFormValid = false;

      $scope.validateForm = function(){
        $scope.isFormValid = (this.password.length > 0)
      };

      $scope.$watch('isLoggedIn', function(){
        if ($scope.isLoggedIn) {
          $scope.goView('member-list');
        }
        else {
          $scope.goView('log-in');
        }
      });

      $scope.logIn = function (){
        $scope.isLoggedIn = true;
      };

      $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
          var sState = toState.name;
          $scope.activeState = sState;
        });
      $scope.goView = function (state) {
        $state.go(state)
      };

    }]);
