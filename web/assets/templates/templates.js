angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("note.html","<div class=\"card hoverable\">\r\n	<div open-edit-note-modal class=\"card-content\">\r\n		<span class=\"card-title\" ng-bind=note.title></span>\r\n		<p ng-bind=note.content></p>\r\n	</div>\r\n</div>");
$templateCache.put("edit/edit-note.html","<!-- Modal Structure -->\r\n<div id=\"modal1\" class=\"modal\">\r\n	<div class=\"modal-content\">\r\n		<h4>Modal Header</h4>\r\n		<p>A bunch of text</p>\r\n	</div>\r\n	<div class=\"modal-footer\">\r\n		<a href=\"#!\" class=\" modal-action modal-close waves-effect waves-green btn-flat\">Agree</a>\r\n	</div>\r\n</div>\r\n         ");
$templateCache.put("new/new-note.html","<div class=\"card\">\r\n	<div class=\"card-content\" ng-hide=blankNote ng-click=\"createNote()\" style=\"cursor: pointer;\">\r\n		Add note\r\n	</div>\r\n	<div class=\"card-content\" ng-if=blankNote>\r\n		<div class=\"input-field\">\r\n			<input id=\"new-note-title\" type=\"text\" ng-model=\"blankNote.title\" />\r\n			<label for=\"new-note-title\">Note title</label>\r\n		</div>\r\n		<div class=\"input-field\">\r\n			<textarea id=\"new-note-content\" class=\"materialize-textarea\" ng-model=\"blankNote.content\"></textarea>\r\n			<label for=\"new-note-content\">Note content</label>\r\n		</div>\r\n		<div class=\"card-action\">\r\n			<a href=\"#\" ng-click=\"saveNote()\">Done</a>\r\n		</div>\r\n	</div>\r\n</div>\r\n<a class=\"waves-effect waves-light btn modal-trigger\" href=\"#modal1\">Modal</a>\r\n<div id=\"modal1\" class=\"modal\">\r\n	<div class=\"modal-content\">\r\n		<h4>Modal Header</h4>\r\n		<p>A bunch of text</p>\r\n	</div>\r\n	<div class=\"modal-footer\">\r\n		<a href=\"#!\" class=\" modal-action modal-close waves-effect waves-green btn-flat\">Agree</a>\r\n	</div>\r\n</div>");}]);