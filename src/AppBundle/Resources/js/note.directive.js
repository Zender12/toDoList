(function(){
	angular.module('app')
		.directive('note', function()
		{
			return {
				templateUrl: "note.html",
				controller: NoteController
			};

			function NoteController($scope, NoteService)
			{
				$scope.deleteNote = deleteNote;
				
				function deleteNote()
				{
					NoteService.deleteNote($scope.note);
				}				
			}
		})
	;
})();