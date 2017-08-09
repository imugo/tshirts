angular.module("myApp", ["ui.router", "ngProgress", "ngAnimate"])
		.run(['$rootScope', '$state', function($rootScope, $state) {
			$rootScope.$on('$stateChangeStart', function() {
				$rootScope.stateIsLoading = true;
			});
			
			$rootScope.$on('$stateChangeSuccess', function() {
				$rootScope.stateIsLoading = false;
			});
		}])
		.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
			$locationProvider.hashPrefix('');
			if (window.history && history.pushState) {
				$locationProvider.html5Mode(true);
			}
	
	
			var profile = {
				name: 'profile',
				url: '/profile',
				component: 'profile'
			};
			
			var skills = {
				name: 'skills',
				url: '/skills',
				component: 'skills'
			};
			
			var library = {
				name: 'library',
				url: '/library',
				component: 'library'
			};
			
			var contact = {
				name: 'contact',
				url: '/contact',
				component: 'contact'
			};
			
			var chat = {
				name: 'chat',
				url: '/chat',
				component: 'chat'
			};
			
			var thankYou = {
				name: 'thankYou',
				url: '/thankYou',
				component: 'thankYou'
			};
			
			$urlRouterProvider.otherwise('/profile');
			
			$stateProvider.state(profile);
			$stateProvider.state(skills);
			$stateProvider.state(library);
			$stateProvider.state(contact);
			$stateProvider.state(chat);
			$stateProvider.state(thankYou);
		})
		.controller("navBarCtrl", function($scope, $state, ngProgressFactory) {
			$scope.profile = function() {
				$state.transitionTo('profile');
			};
			
			$scope.skills = function() {
				$state.transitionTo('skills');
			};
			
			$scope.library = function() {
				$state.transitionTo('library');
			};
			
			$scope.contact = function() {
				$state.transitionTo('contact');
			};
			
			$scope.chat = function() {
				$state.transitionTo('chat');
			};
			
			$scope.closeSideBar = function() {
				if ($(window).width() < 992) {
					$('.button-collapse').sideNav("hide");
				}
			};
		})
		
		.filter('myDateFormat', function myDateFormat($filter) {
			return function (text) {
				var tempdate = new Date(text.replace(/-/g, "/"));
				return $filter('date')(tempdate, "MMM dd yy");
			};
		});