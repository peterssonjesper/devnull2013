var MapControl = function() {
	this.init = function($table){
		$table.on("click", "tr", function(){
			var $star = $(this);
			$.ajax({
				url : '/set_direction',
				type : 'POST',
				data: JSON.stringify({
					name: $star.find(".name").html()
				}),
				dataType : 'json',
				contentType : 'application/json; charset=utf-8'
			});
		});
	};
};
