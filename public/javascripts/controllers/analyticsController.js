angular.module('routeAppControllers').controller('AnalyticsController',
				function($scope, $routeParams, $http) {
					$scope.input = $routeParams.input;
					$scope.itemPage = 10;
					$scope.commits = [];
					$scope.doGetCommitsFromRepo = function(callback) {
					$http({
						method : 'GET',
						url : "/repositories/" + $scope.input,
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
	
					// Callback qui crée et affiche la datatable, et la piechart
						function drawChart() {
							// Create the data table.
							var data = new google.visualization.DataTable();
							data.addColumn('string',
									'committers');
							data.addColumn('number',
									'Number of committers');
							data.addRows($scope.CommitersCount);
	
							var options = {
								title : 'My Daily Activities'
							};
	
							var chart = new google.visualization.PieChart(
									document.getElementById('piechart'));
	
							chart.draw(data, options);
	
						}
						drawChart();
	
					}).error(function(arg) {
									alert("error ");
								});

					};

					$scope.doGetCommitsFromRepo();
				});

