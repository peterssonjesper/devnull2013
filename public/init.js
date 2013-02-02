var map = new Map($("#map"));
var mapcontrol = new MapControl();
var ship = new Ship(map);
var updateInterval = 500;

map.getMap(function(stars) {
	mapcontrol.init($("table"));
	setInterval(function() {
		map.clear();
		map.print(stars, $("table"));
		ship.print_on_map();
	}, updateInterval);
});
