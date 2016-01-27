(function(){
	angular.module('app')
		.directive('openEditNoteModal', function($compile, $timeout)
		{
			return {
				template: '<a class="btn-floating yellow darken-1"><i class="material-icons">airplay</i></a>',
				
				link: function($scope, element, attrs) {

					element.click(openEditNoteModal);

					function openEditNoteModal()
					{
						//при условии что такого окна ещё нет иначе просто открыть

						var linkFn = $compile(angular.element('<edit-note-modal>'));
						var modal = linkFn($scope);
						angular.element(document.body).append(modal); // https://docs.angularjs.org/api/ng/service/$compile
						
					}
				}	
			};
		})
	;
})();