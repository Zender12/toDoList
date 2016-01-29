(function(){
	angular.module('app')
		.directive('note', function()
		{
			return {
				templateUrl: "note.html",
				controller: NoteController
			};

			function NoteController($scope, $timeout, NoteService)
			{
				$scope.deleteNote = deleteNote;

				function deleteNote()
				{					
					NoteService.deleteNote($scope.note).then(function(notes)
					{
						$scope.notes.length = 0;
						$.merge($scope.notes, notes);
					});
				}	
			}
		})
	;
})();