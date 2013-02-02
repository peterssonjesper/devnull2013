var PlanetControl = function() {
	this.planets = [];
	this.init = function($table, $content) {
		var self = this;
		$table.on("click", "tr", function(){
			var $planet = $(this);
			var index = $(this).data('index');
			var planet = self.planets[index];
			$content.html('');
			if(planet.density) {
				$content.append(_.template($('#extendedPlanet').html(), planet));
			}
			else if(planet.day){
				$content.append(_.template($('#regularPlanet').html(), planet));
			}
			$.ajax({
				url : '/set_in_system_direction',
				type : 'POST',
				data: JSON.stringify({
					name: $planet.find(".name").html()
				}),
				dataType : 'json',
				contentType : 'application/json; charset=utf-8'
			});
		});
	}
	this.setPlanets = function(planets) {
		this.planets = planets;
	}
};
