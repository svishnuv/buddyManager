var myApp = angular.module('buddyList', ['ngRoute'])

//ng-route config
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'default.html',
    })
    .when('/buddy-info/:buddy_index', {
      templateUrl: 'buddy_info.html',
      controller: 'buddyInfoCtrl'
    })
    .when('/Add', {
      templateUrl: 'buddy_form.html',
      controller: 'addBuddyCtrl'
    })
    .when('/edit/:buddy_index', {
      templateUrl: 'buddy_form.html',
      controller: 'editBuddyCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
})

// controllers
.controller('navCtrl', function($scope) {
  $scope.nav = {
    navItems: ['Home', 'Add'],
    selectedIndex: 0,
    navClick: function($index) {
      $scope.nav.selectedIndex = $index;
    }
  };
})

.controller('homeCtrl', function($scope, BuddyService) {
  $scope.buddys = BuddyService.getBuddys();

  //Sorts Ascending Based on Option Selected
  $scope.sortBy = function(option) {
      $scope.sortOptionSelected = option;
    },

    //Prompts User Before Deleting
    $scope.removeBuddy = function(item) {
      if (confirm("Press [Ok] to Delete")) {
        var index = $scope.buddys.indexOf(item);
        $scope.buddys.splice(index, 1);
        $scope.removed = 'Buddy successfully removed.';
      }

    };

})

.controller('buddyInfoCtrl', function($scope, $routeParams) {
  var index = $routeParams.buddy_index;
  $scope.currentBuddy = $scope.buddys[index];
})

.controller('addBuddyCtrl', function($scope, $location) {
  //needed to show the correct button on the buddy form
  $scope.path = $location.path();

  $scope.addBuddy = function() {
    var buddy = $scope.currentBuddy;
    buddy.id = $scope.buddys.length;
    $scope.buddys.push(buddy);
  };

})

.controller('editBuddyCtrl', function($scope, $routeParams) {
  $scope.index = $routeParams.buddy_index;
  $scope.currentBuddy = $scope.buddys[$scope.index];
  $scope.currentBuddy.birthday = new Date($scope.currentBuddy.birthday);
})

// directives
.directive('buddy', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'buddy.html'
  }
})

// services
.factory('BuddyService', [function() {
  var factory = {};

  factory.getBuddys = function() {
    return buddyList;
  }

  // buddy list, mocking json received
  /*
  Data Generated Using : 
  http://www.json-generator.com/ 

  Generate Syntax: 
  [
  '{{repeat(10, 10)}}',
  {
    id: '{{index()}}',
    userName: '{{firstName()}} {{surname()}}',
    firstName:'{{firstName()}}',
    lastName:'{{surname()}}',
    status: '{{bool()}}',
    picture: 'http://placehold.it/32x32',
    birthday: '{{date(new Date(1985, 0, 1), new Date(), "YYYY-MM-dd hh:mm")}}',
    gender: '{{gender()}}',
    email: '{{email()}}',
    phone: '+1 {{phone()}}',
    bio: '{{lorem(1, "paragraphs")}}',
    lastSeen: '{{date(new Date(2016, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss")}}'
  }
]
  */
  var buddyList = [{
    id: 0,
    userName: 'Conner',
    firstName: 'Conner',
    lastName: 'Reese',
    status: 'Available',
    picture: 'http://placehold.it/150x200',
    birthday: '1999-12-10',
    gender: 'male',
    email: 'connerreese@immunics.com',
    phone: '(905) 450-2746',
    bio: 'Sit mollit elit laboris eu dolor laboris Lorem. Adipisicing officia labore laboris anim exercitation et. Esse fugiat ea ullamco occaecat tempor cillum est adipisicing. Deserunt commodo officia consequat non sunt dolor et aute consequat. Et ut tempor proident reprehenderit aute sunt. Tempor ex aute elit ea enim eiusmod incididunt.\r\n',
    lastSeen: '2016-01-11T02:04:23'
  }, {
    id: 1,
    userName: 'Goff',
    firstName: 'Goff',
    lastName: 'Wallace',
    status: 'Offline',
    picture: 'http://placehold.it/150x200',
    birthday: '2003-05-27',
    gender: 'male',
    email: 'goffwallace@immunics.com',
    phone: '(910) 588-2627',
    bio: 'Laborum et sint sint consectetur elit consequat excepteur eiusmod. Qui anim occaecat reprehenderit non deserunt est cupidatat aute eu elit ut anim. Sunt veniam culpa nulla eu nulla non veniam enim duis amet laborum nulla aliqua. Cillum amet quis sit cupidatat fugiat exercitation id fugiat. Irure sunt ea incididunt veniam ex labore irure ex Lorem eiusmod velit. Esse incididunt sunt aliqua sint consectetur sint officia eiusmod cillum eiusmod nulla eiusmod.\r\n',
    lastSeen: '2016-03-14T04:41:09'
  }, {
    id: 2,
    userName: 'Holland',
    firstName: 'Holland',
    lastName: 'Keith',
    status: 'Available',
    picture: 'http://placehold.it/150x200',
    birthday: '2004-06-15',
    gender: 'male',
    email: 'hollandkeith@immunics.com',
    phone: '(930) 437-3693',
    bio: 'Eiusmod in exercitation ea nisi tempor aliquip eu. Labore Lorem reprehenderit cillum sint dolore deserunt. Lorem veniam est ullamco laborum incididunt reprehenderit incididunt enim culpa ut nostrud aliqua. Cupidatat aliquip id officia tempor mollit culpa occaecat veniam velit mollit aliqua in. Labore veniam mollit ad fugiat et amet nulla in cillum sint qui Lorem fugiat et. Non esse sunt ut incididunt dolore mollit ut tempor adipisicing ut. Non nulla Lorem aute magna nostrud nostrud mollit velit ipsum fugiat adipisicing.\r\n',
    lastSeen: '2016-02-14T01:31:38'
  }, {
    id: 3,
    userName: 'Savannah',
    firstName: 'Savannah',
    lastName: 'Stark',
    status: 'Available',
    picture: 'http://placehold.it/150x200',
    birthday: '2010-06-06',
    gender: 'female',
    email: 'savannahstark@immunics.com',
    phone: '(946) 477-2407',
    bio: 'Irure in dolor veniam velit eu. Non nisi dolor et consequat minim consequat incididunt mollit magna. Non nisi aliqua nisi commodo sit excepteur cupidatat pariatur duis aliqua elit.\r\n',
    lastSeen: '2016-02-17T02:49:32'
  }, {
    id: 4,
    userName: 'Pace',
    firstName: 'Pace',
    lastName: 'Bray',
    status: 'Available',
    picture: 'http://placehold.it/150x200',
    birthday: '1994-10-09',
    gender: 'male',
    email: 'pacebray@immunics.com',
    phone: '(858) 593-2454',
    bio: 'Reprehenderit amet eiusmod fugiat enim non dolore consequat est consequat excepteur voluptate aliquip ad id. In non consequat cillum culpa aliqua voluptate amet veniam. Officia irure dolor ut nulla. Aliqua fugiat irure magna in Lorem laboris veniam exercitation amet. Magna deserunt consectetur magna sunt eiusmod elit adipisicing sint dolor cillum eu. Commodo excepteur ea laborum officia quis et tempor incididunt.\r\n',
    lastSeen: '2016-02-03T07:45:09'
  }, {
    id: 5,
    userName: 'Celina',
    firstName: 'Celina',
    lastName: 'Castillo',
    status: 'Offline',
    picture: 'http://placehold.it/150x200',
    birthday: '1990-03-20',
    gender: 'female',
    email: 'celinacastillo@immunics.com',
    phone: '(952) 457-3817',
    bio: 'Incididunt tempor nisi laboris do mollit. Do ad culpa occaecat quis dolore commodo. Culpa dolore qui incididunt dolore dolor adipisicing fugiat commodo aliqua. Voluptate officia sunt id eu ullamco ut eu in consequat magna id quis nulla ipsum. Ut laborum culpa esse amet velit officia labore nisi amet et occaecat. Irure dolor anim adipisicing velit esse anim laborum voluptate exercitation do.\r\n',
    lastSeen: '2016-03-23T09:41:00'
  }, {
    id: 6,
    userName: 'Stevens',
    firstName: 'Stevens',
    lastName: 'Kent',
    status: 'Offline',
    picture: 'http://placehold.it/150x200',
    birthday: '2013-09-05',
    gender: 'male',
    email: 'stevenskent@immunics.com',
    phone: '(916) 522-3270',
    bio: 'Incididunt adipisicing culpa aliqua labore proident do. Deserunt esse incididunt elit velit dolore duis. Ut do reprehenderit non cupidatat sit exercitation aliqua exercitation aute adipisicing aliqua exercitation.\r\n',
    lastSeen: '2016-03-22T08:59:05'
  }, {
    id: 7,
    userName: 'Lane',
    firstName: 'Lane',
    lastName: 'Morrison',
    status: 'Available',
    picture: 'http://placehold.it/150x200',
    birthday: '1998-06-03',
    gender: 'male',
    email: 'lanemorrison@immunics.com',
    phone: '(885) 488-3368',
    bio: 'Ea est fugiat proident ipsum. Ad minim Lorem irure officia duis veniam dolore tempor mollit reprehenderit incididunt reprehenderit sint. Consectetur fugiat culpa dolore adipisicing cupidatat occaecat mollit dolore quis. Velit ad exercitation dolor consectetur commodo. Sunt consectetur nisi exercitation labore officia consequat cillum ad mollit qui id culpa. Commodo sunt reprehenderit veniam esse irure proident non deserunt qui cupidatat ex.\r\n',
    lastSeen: '2016-02-24T01:52:06'
  }, {
    id: 8,
    userName: 'Rosales',
    firstName: 'Rosales',
    lastName: 'Burgess',
    status: 'Busy',
    picture: 'http://placehold.it/150x200',
    birthday: '2008-10-20',
    gender: 'male',
    email: 'rosalesburgess@immunics.com',
    phone: '(912) 467-2053',
    bio: 'Commodo exercitation incididunt sit enim quis non. Nulla aute occaecat cillum sunt velit sit anim laborum eiusmod mollit ullamco ullamco cillum veniam. Eu laborum irure ut velit fugiat tempor dolor ad do culpa nulla elit laboris. Pariatur ullamco velit aliqua do magna sunt ex culpa amet magna amet. Nisi cupidatat nulla quis et dolore tempor enim exercitation veniam sint officia. Non aute enim ut ea.\r\n',
    lastSeen: '2016-01-20T07:57:38'
  }, {
    id: 9,
    userName: 'Shelia',
    firstName: 'Shelia',
    lastName: 'Finley',
    status: 'Idle',
    picture: 'http://placehold.it/150x200',
    birthday: '2014-09-05',
    gender: 'female',
    email: 'sheliafinley@immunics.com',
    phone: '(947) 568-3135',
    bio: 'Ut irure veniam in do. Velit ullamco sint minim pariatur amet ullamco irure deserunt ullamco. Amet tempor elit aliquip Lorem deserunt duis laborum ad. Ipsum ex pariatur aliquip ad Lorem duis est adipisicing veniam cillum magna.\r\n',
    lastSeen: '2016-01-24T11:55:26'
  }];

  return factory;
}]);