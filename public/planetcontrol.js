var PlanetControl = function() {
	this.planets = [];
	this.init = function($table, $content) {
		this.$content = $content;
		this.current_index = -1;
		var self = this;
		$table.on("click", "tr", function(){
			var $planet = $(this);
			var index = $(this).data('index');
			self.current_index = index;
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
	this.drawPlanetDetails = function(planets) {
		if(this.current_index < 0) {
			return;
		}
		var planet = this.planets[this.current_index];
		this.$content.html('');
		if(planet !== undefined && planet.density) {
			this.$content.append(_.template($('#extendedPlanet').html(), planet));
		}
		else if(planet.day){
			this.$content.append(_.template($('#regularPlanet').html(), planet));
		}
	}
};
