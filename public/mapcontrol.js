var MapControl = function(){
	this.init = function($table){
		$table.on("click", ".name", function(){
			var $star = $(this).parent();
			$.ajax({
				url : '/set_direction',
				type : 'POST',
				data: JSON.stringify({
					name: $(this).html()
				}),
				dataType : 'json',
				contentType : 'application/json; charset=utf-8',
				success : function(data) {
					$table.find(".selected").removeClass("selected");
					$star.addClass("selected");
				}
			});
		});
	};
};
