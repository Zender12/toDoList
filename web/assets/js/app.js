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
(function(){
	angular.module('app')
		.factory('NoteService', function($http)
		{
			return {
				getNotes: getNotes,
				saveNote: saveNote,
				deleteNote: deleteNote,
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

			function deleteNote(note)
			{
				return $http.delete('/note/' + note.id)
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