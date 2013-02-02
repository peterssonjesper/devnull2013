var map = new Map();
var ship = new Ship(map);
var updateInterval = 10000;

map.getMap(function(stars) {
	map.print(stars, $("#map"), $("table"));

	setInterval(function() {
		ship.print_on_map();
	}, updateInterval);
	ship.print_on_map();
});
