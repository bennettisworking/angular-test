let myApp = angular
.module("AngularJSTest", [])
.controller("MainController", MainController)
.directive('headerDiv', header)
.directive('sidebarDiv', sidebar)
.directive('profileDiv', profile)
.directive('ratingDiv', rating)
.directive('likesDiv', likes)
.factory('dataService', dataService);

// CONTROLLERS

function MainController($scope, dataService){
	$scope.keyword = "";
	$scope.currentrec = 0;
	$scope.records = [];
	dataService.getPeople().then(function(data){
		$scope.records = data.People;
		$scope.$apply();
	});

	$scope.sendMessage = function(name){
		window.location = 'mailto:' + name + '@gmail.com';
	}
}

// DIRECTIVES

function header(){
	return {
        template: '<div class="header__content">\
        <div class="col-lg-3 col-md-6 col-sm-6 col-10 search">\
        <span class="fa fa-search"></span>\
        <input ng-model="keyword" type="text" class="text-input" placeholder="Search"></div>\
        <div class="col-lg-3 offset-lg-9">\
        <div class="header__userinfo"><span class="header__username">Peter Hoang</span> <i class="fas fa-user-circle"></i>\
        </div>\
        </div>\
        </div>'
    };
}

function likes(){
	return {
		template: '<div class="row likes">\
		<div class="col-lg-6 col-md-6 col-12">\
		<h4 class="likes__header"><i class="far fa-thumbs-up"></i> Likes</h4>\
		<ul class="fa-ul">\
		<li ng-repeat="like in records[currentrec].Likes">\
		<span class="fa-li"><i class="fas fa-heart"></i></span>{{like}}\
		</li>\
		</ul>\
		</div>\
		<div class="col-lg-6 col-md-6 col-12">\
		<h4 class="likes__header"><i class="far fa-thumbs-down"></i> Disikes</h4>\
		<ul class="fa-ul">\
		<li ng-repeat="like in records[currentrec].Dislikes">\
		<span class="fa-li"><i class="fas fa-heart-broken"></i></span>{{like}}\
		</li>\
		</ul>\
		</div>\
		</div>'
	}
}

function sidebar(){
      return{
		template: '<div class="sidebar">\
          <ul>\
            <div class="list" ng-repeat="rec in records | filter: {name:keyword}" ng-click="$parent.currentrec = $index">\
            <img height="40" ng-src="{{rec.img}}"> {{rec.name}}</div>\
          </ul>\
        </div>'
    }
}

function profile(){
	return {
		template: '<section class="profile row">\
            <div class="col-lg-3 col-md-5 col-sm-4 col-12">\
            	<img class="profile__image" ng-src="{{records[currentrec].img}}">\
            </div>\
            <div class="col-lg-9 col-md-7 col-sm-8">\
            <h3 class="profile__name">{{records[currentrec].name}}</h3>\
            <div rating-div></div>\
              <button ng-click="sendMessage()" class="button button--main">SEND MESSAGE</button><br>\
            </div>\
            <div class="col-12">\
            <p class="profile__description pl-3">{{records[currentrec].Description}}</p>\
            </div>\
            <div class="col-12" likes-div></div>\
          </section>'
	}
}

function rating(){
	return{

		template: '<div rating class="rating">\
			<i class="far fa-heart" ng-class="{fas: records[currentrec].rating > $index}" ng-repeat="x in [].constructor(5) track by $index"></i>\
        </div>'
	}

}

//// DATA FACTORY

function dataService(){
	return{
		getPeople: function(){
			return(
			fetch('people.json')
  			.then(function(response) {
    			return response.json();
  			}).then(function(myJson) {
  				console.log(myJson);
  				return myJson;
  			})
  			)
		}
	}
}

