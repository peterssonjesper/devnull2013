var map = new Map($("#map"));
var mapcontrol = new MapControl();
var ship = new Ship(map);
var updateInterval = 500;

map.getMap(function(stars) {
	map.list(stars, $("#stars"))
	mapcontrol.init($("#stars"));
	setInterval(function() {
		map.clear();
		map.print(stars, $("table"));
		ship.print_on_map();
	}, updateInterval);
});
