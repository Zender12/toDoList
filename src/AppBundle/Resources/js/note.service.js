(function(){
	angular.module('app')
		.factory('NoteService', function($http)
		{
			return {
				getNotes: getNotes,
				saveNote: saveNote,
				createBlankNote: createBlankNote
			};

			function getNotes()
			{
				return $http.get('/note')
					.then(function(response)
					{
						console.log(response.data);
						return response.data;
					})
					.catch(function(error)
					{
						alert(getErrorMessage(error));
					})
				;
			}

			function saveNote(note)
			{
				return 	notes.unshift(note);;
			}

			function createBlankNote()
			{
				return {
					title: "",
					content: ""
				};
			}

			function getErrorMessage(error)
			{
				return 'Error ' + error.status  + ': ' + error.statusText;
			}
		})
	;
})()