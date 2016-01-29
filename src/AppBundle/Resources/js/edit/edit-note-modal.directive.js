(function(){
	angular.module('app')
		.directive('editNoteModal', function($timeout)
		{
			return {
				templateUrl: 'edit/edit-note-modal.html',
		
				link: function() {
					$timeout(function() {
						$('#editModal').openModal();
					});
				}
			};
		})
	;
})();