var PlanetControl = function() {
	this.planets = [];
	this.init = function($table, $content) {
		var self = this;
		$table.on("click", "tr", function(){
			var $planet = $(this);
			var index = $(this).data('index');
			var planet = self.planets[index];
			$content.html("<h1>" + planet.planet_no + "</h1>");
			if(planet.day) {
				$content.append("<table>");
				$content.append("<tr><td>Day</td><td>" + planet.day + "</td><tr>");
				$content.append("<tr><td>Radius</td><td>" + planet.radius + "</td><tr>");
				$content.append("</table>");
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
