var PlanetControl = function() {
	this.planets = [];
	this.init = function($table, $content) {
		var self = this;
		$table.on("click", "tr", function(){
			var index = $(this).data('index');
			var planet = self.planets[index];
			$content.html("<h1>" + planet.planet_no + "</h1>");
			$content.append("<table>");
			$content.append("<tr><td>Day</td><td>" + planet.day + "</td><tr>");
			$content.append("<tr><td>Radius</td><td>" + planet.radius + "</td><tr>");
			$content.append("</table>");
		});
	}
	this.setPlanets = function(planets) {
		this.planets = planets;
	}
};
