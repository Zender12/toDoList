(function(){
	angular.module('app', ['templates']);
})();

(function(){
	angular.module('app')
		.controller('IndexController', function($scope, NoteService)
		{
			NoteService.getNotes().then(function(notes)
			{
				$scope.notes = notes;
			});
		})
	;
})();
(function(){
	angular.module('app')
		.directive('note', function()
		{
			return {
				templateUrl: "note.html"
			};
		})
	;
})();
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
				return $http.post('/note', note)
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
})();
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
(function(){
	angular.module('app')
		.factory('EditNoteService', function($http)
		{
			return {
				test: test
			};

			function test(error)
			{
				alert("test");
			}

			function getErrorMessage(error)
			{
				return 'Error ' + error.status  + ': ' + error.statusText;
			}
		})
	;
})();
(function(){
	angular.module('app')
		.directive('newNote', function()
		{
			return {
				templateUrl: "new/new-note.html",
				scope: {
					notes: '='
				},
				controller: NewNoteController
			};

			function NewNoteController($scope, NoteService)
			{
				$scope.blankNote = null;

				$scope.createNote = createNote;
				$scope.saveNote = saveNote;

				function createNote()
				{
					$scope.blankNote = NoteService.createBlankNote();
				}

				function saveNote()
				{
					if ($scope.blankNote && ($scope.blankNote.title.length > 0 || $scope.blankNote.content.length > 0))
					{
						NoteService.saveNote($scope.blankNote).then(function(savedNote)
						{
							$scope.notes.unshift(savedNote);
						});
					}

					$scope.blankNote = null;
				}
			}
		})
	;
})();