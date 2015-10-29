(function(){
	'use strict';
	angular
		.module('App')
		.controller('WikipediaViewerController', WikipediaViewer);

	WikipediaViewer.$inject = ['WikipediaApiService'];

	function WikipediaViewer(WikipediaApiService){
		var vm = this;
		vm.wikiList=[];
		vm.list=[];
		vm.search = '';
		var wikipediaApi = WikipediaApiService;

		

		vm.eventSearchHendler = function(event){
			if(event.keyCode==13){
				viewInfoFromWiki(vm.search);
			}else{
				viewAutocomplitSearchList(vm.search);			
			}
		};

		vm.selectFormDropdownMenu = function(event){
			vm.search = event.target.innerText;
			viewInfoFromWiki(vm.search);
			
		}

		var viewAutocomplitSearchList = function(searchText){
			wikipediaApi.getSearchList(searchText)
						.then(function(list){
							vm.list = list;
							if(vm.list.length>0){
								angular.element(document.querySelector('.dropdown-menu')).css("display", "block");
							}else if(angular.element(document.querySelector('.dropdown-menu')).css("display")=="block"){
								angular.element(document.querySelector('.dropdown-menu')).css("display", "none");
							}
						});
		}


		var viewInfoFromWiki = function(searchText){
			console.log('viewInfoFromWiki');
			wikipediaApi.getInfoFromWiki(searchText)
						.then(function(data){
							vm.wikiList = data;
							angular.element(document.querySelector('.search')).removeClass('center');
							angular.element(document.querySelector('.dropdown-menu')).css("display", "none");
							console.log(vm.wikiList);
						});
			
		}		
	}
})();