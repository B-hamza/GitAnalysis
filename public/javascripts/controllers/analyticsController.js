angular.module('routeAppControllers').controller('AnalyticsController',['$scope','$routeParams','serviceRepositories',
				function($scope, $routeParams, serviceRepositories) {
					$scope.input = $routeParams.input;
					$scope.itemPage = 10;
					$scope.commits = null;
					$scope.CommitersCount = [];
					$scope.shortlistcommiters = [];
					$scope.error=null;
					$scope.isSearching = true;
					
					$scope.doGetCommitsFromRepo = function() {
					serviceRepositories.getCommitsFromRepo($scope.input).success(
							function(data, status) {
						$scope.commits = data;
						$scope.isSearching = false;
					}).error(function(arg) {
									$scope.isSearching = false;
									$scope.error = arg;
								});

					};

					$scope.$watch('commits', function(){
						/* somme le nombre de commit par
						 *	committers rends => ObjectJson :
						 *	{"committer":"n (nombre de
						 *	commit)"}
						 */
						if($scope.commits!=null){
						var committersCount = $scope.commits
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
											newObj.push(curr,committersCount[curr]);
											return newObj;
										})
								.sort(function (a, b) {// trier par nombre de commit
								    if (a[1] > b[1])
								        return 1;
								      if (a[1] < b[1])
								        return -1;
								      // a doit être égale à b
								      return 0;
								  });
						
						$scope.shortlistcommiters = $scope.commits.map(function(curr){
							var newObj=[];
							newObj.push(curr.commit.committer.name, new Date(curr.commit.committer.date), new Date(curr.commit.committer.date));
							return newObj;
						});
						
						}
						
					})
					
					$scope.doGetCommitsFromRepo();
				}]);

