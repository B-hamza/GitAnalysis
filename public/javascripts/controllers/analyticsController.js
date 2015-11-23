angular.module('routeAppControllers').controller('AnalyticsController',
				function($scope, $routeParams, $http) {
					$scope.input = $routeParams.input;
					$scope.itemPage = 10;
					$scope.commits = null;
					$scope.CommitersCount = [];
					$scope.doGetCommitsFromRepo = function(callback) {
					$http({
						method : 'GET',
						url : "/repositories/" + $scope.input,
						async: false
					}).success(
					function(data, status) {
						$scope.commits = data;
						/* somme le nombre de commit par
						 *	committers rends => ObjectJson :
						 *	{"committer":"n (nombre de
						 *	commit)"}
						 */
						var committersCount = data
								.reduce(
										function(acc, curr) {
											curr = curr.commit.committer.name;
											if (typeof acc[curr] == 'undefined') {
												acc[curr] = 1;
											} else {
												acc[curr] += 1;
											}
	
											return acc;
										}, {});
						/*
						 * pour google chart accepte une
						 * array of elements utilisation de
						 * map pour transformer l'objet
						 * committersCount a un tableau de
						 * committer et nmbr de commit
						 */
						$scope.CommitersCount = Object
								.keys(committersCount)
								.map(
										function(curr) {
											var newObj = [];
											newObj.push(curr,
															committersCount[curr]);
											return newObj;
										})
						
	
					}).error(function(arg) {
									alert("error ");
								});

					};

					$scope.doGetCommitsFromRepo();
				});

