var MapControl = function(){
	this.init = function($table){
		$table.find('.name').click(function(){
			var $star = $(this).parent();
			$.post('/set_direction', {name: $(this).html()}, function(data){
				$star.css('background', '#999');
			}, 'json');
		});
	};
};
