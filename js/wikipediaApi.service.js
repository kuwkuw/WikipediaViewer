(function(){
	'use strict';
	angular
		.module('App')
		.factory('WikipediaApiService', WikipediaApi);

		WikipediaApi.$inject = ['$http','$q'];

		function WikipediaApi($http, $q){
			var getId=function(pages, title){
				for(var pageId in pages){
					if(pages[pageId].title===title){
						return pageId;
					}
				}
			}			

			function getSearchList (searchText){
				var deferred = $q.defer();
				$http
					.jsonp('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch='+searchText+'&callback=JSON_CALLBACK')
					.success(function(data){
						deferred.resolve(data.query.search.map(function(item){return item.title;}));
					});
				return deferred.promise;
			}

			function getInfoFromWiki(searchText){
				var deferred = $q.defer();
				$http
					.jsonp('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch='+searchText+'&generator=search&gsrsearch='+searchText+'&callback=JSON_CALLBACK')					
					.success(function(data){
						var mapedData = data.query.search.map(function(ele){
								return {
									id: getId(data.query.pages, ele.title),
									snippet: ele.snippet.replace(/<(\D+?)>/g, ''),
									title: ele.title
								};
							});
						console.log(mapedData);
						deferred.resolve(mapedData);
					});
				return deferred.promise;
			}

			return {
				getSearchList: getSearchList,
				getInfoFromWiki: getInfoFromWiki
			};
		}
})();