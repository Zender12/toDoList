(function(){
	angular.module('app')
		.directive('openEditNoteModal', function()
		{
			return {

				link: function($scope, element, attrs) {

					element.click(openEditNoteModal);

					function openEditNoteModal()
					{
						//element.html(element + '<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>');
					}
				}	
			};
		})
	;
})();