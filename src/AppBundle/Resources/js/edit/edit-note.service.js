(function(){
	angular.module('app')
		.factory('EditNoteService', function($http)
		{
			return {
				editNote: editNote
			};

			function editNote(note)
			{
				return $http.put('/note/'+ note.id, note)
					.then(function(response)
					{
						return response.data;
					})
					.catch(function(error)
					{
						alert(getErrorMessage(error));
					})
				;
			}

			function getErrorMessage(error)
			{
				return 'Error ' + error.status  + ': ' + error.statusText;
			}
		})
	;
})();