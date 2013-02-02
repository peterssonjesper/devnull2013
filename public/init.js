var map = new Map();
var mapcontrol = new MapControl();
var ship = new Ship(map);
var updateInterval = 10000;

map.getMap(function(stars) {
	map.print(stars, $("#map"), $("table"));
	mapcontrol.init($("#table"));

	setInterval(function() {
		ship.print_on_map();
	}, updateInterval);
	ship.print_on_map();
});
