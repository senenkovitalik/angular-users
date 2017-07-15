var app = angular.module("myApp", []);
app.directive('myUser', () => {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      user: '=user'
    },
    controller: ['$scope', function myUserController($scope) {
      function randomColor() {
        let i = 0;
        let color = "#";
        for (i; i<3; i++) {
          let c = Math.floor((Math.random() * 256) + 1).toString(16);
          if (c.length == 1) {
            c = "0" + c;
          }
          color += c;
        }
        return color;
      }
      if (!$scope.user.useAvatar) {
        $scope.user.initials = $scope.user.fname.slice(0,1) + $scope.user.lname.slice(0,1);
        $scope.user.color = randomColor();
        console.log($scope.user.color);        
      }
    }],
    templateUrl: 'templates/my-user.html'
  };
});