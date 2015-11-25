'use strict'


angular.module('services',[]);

angular.module('services', []).factory('serviceRepositories',
		[ '$http', function($http) {

			var serviceRepositories = {};

			serviceRepositories.getRepositories = function(input) {
				return $http({
					method : 'GET',
					url : "/search/" + input,
				})
			}

			serviceRepositories.getRepositoriesPerPage = function(input,page) {
				return $http({
					method : 'GET',
					url : "/search/" + input + '?page=' + page,
				})
			}
			
			
			serviceRepositories.getCommitsFromRepo = function(input) {
				return $http({
					method : 'GET',
					url : "/repositories/" + input,
				})
			}

			return serviceRepositories;

		} ])