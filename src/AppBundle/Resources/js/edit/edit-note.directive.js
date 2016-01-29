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
						$scope.originalNote = {
							title: $scope.note.title,
							content: $scope.note.content
						}
						var linkFn = $compile(angular.element('<edit-note-modal>'));
						var modal = linkFn($scope);
						angular.element(document.body).append(modal); 
					}
				},
				controller: EditNoteController
			};

			function EditNoteController($scope, EditNoteService)
			{
				$scope.editNote = editNote;
				$scope.closeModal = closeModal;

				function editNote()
				{
					if($scope.originalNote.title != $scope.note.title
						|| $scope.originalNote.content != $scope.note.content
					)
					{
						EditNoteService.editNote($scope.note);
					}

					$timeout(function() {
						$('edit-note-modal').remove();
					});
				}

				function closeModal()
				{
					$scope.note.title = $scope.originalNote.title;
					$scope.note.content = $scope.originalNote.content;

					$timeout(function() {
						$('edit-note-modal').remove();
					});
				}
			}
		})
	;
})();