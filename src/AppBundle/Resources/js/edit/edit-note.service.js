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