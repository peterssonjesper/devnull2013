var map = new Map();
var ship = new Ship();

map.getMap(function(stars) {
	map.print(stars, $("#map"), $("table"));

	ship.get_position(function(position) {
		map.printSingle(position.x, position.y, "red");
	});
});

