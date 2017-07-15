app.controller('myCtrl', ['$scope', function($scope){
  const positions = ['Technical Support', 'Writer', 'Associate Director', 'Program Manager', 'Manager', 'Developer', 'Coder'];
  const avatars = ["barred_owl.jpg", "beautiful_bird.jpg", "bird.jpg", "bird2.jpg", "penguin_love_couple.jpg", "puffin.jpg", "royal_albatross3.jpg", "swan_sad_love.jpg"];
  chance.mixin({
    'user': () => {
      return {
        fname: chance.first(),
        lname: chance.last(),
        position: chance.pickone(positions),
        avatar: chance.pickone(avatars),
        useAvatar: chance.bool({likelihood: 70})
      }
    }
  });
  const users = [];
  for (var i = 0; i < 9; i++) {
    users.push(chance.user());
  }
  $scope.users = users;
}]);