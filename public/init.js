var map = new Map();
var mapcontrol = new MapControl();
var ship = new Ship();

map.getMap(function(stars) {
	map.print(stars, $("#map"), $("table"));
	mapcontrol.init($("#table"));
	ship.get_position(function(position) {
		map.printSingle(position.x, position.y, "red");
	});
});

