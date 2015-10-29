(function(){
	'use strict';
	angular
		.module('App')
		.controller('WikipediaViewerController', WikipediaViewer);

	WikipediaViewer.$inject = ['WikipediaApiService'];

	function WikipediaViewer(WikipediaApiService){
		var vm = this;
		var wikipediaApi = WikipediaApiService;
		vm.wikiList=[];
		vm.list=[];
		vm.search = '';
		vm.eventSearchHendler = eventSearchHendler;
		vm.selectFormDropdownMenu = selectFormDropdownMenu
		vm.searchAnimat = searchAnimat;
		

		function searchAnimat(){
			angular.element(document.querySelector('.search-input')).css({
				"width": "300px",
				"margin-left": "0px"
			});
		}

		function eventSearchHendler (event){
			if(event.keyCode==13){
				viewInfoFromWiki(vm.search);
			}else{
				viewAutocomplitSearchList(vm.search);			
			}
		};

		function selectFormDropdownMenu(event){
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
							angular.element(document.querySelector('.search-container')).removeClass('center').addClass('top');
							angular.element(document.querySelector('.dropdown-menu')).css("display", "none");
							console.log(vm.wikiList);
						});
			
		}		
	}
})();