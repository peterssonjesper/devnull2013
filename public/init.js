var starMap = new Map($("#starMap"));
var planetMap = new Map($("#planetMap"));

var planetTable = new Table($("#planets"), "planet_no");
var starTable = new Table($("#stars"), "name");

var mapControl = new MapControl();
var planetcontrol = new PlanetControl();

var ship = new Ship(starMap, planetMap);
var updateInterval = 500;

starMap.getMap("/stars", function(stars) {
	// Prints stars table
	starTable.print(stars);

	// Print stars starMap
	mapControl.init($("#stars"));
	setInterval(function() {
		starMap.clear();
		starMap.print(stars, "yellow");
		ship.print_on_map();
	}, updateInterval);
});

setInterval(function() {
	planetMap.getMap("/planets", function(planets) {
		planetcontrol.setPlanets(planets);

		// Print planets on planet map
		planetMap.clear();
		planetMap.print(planets, "lime")

		// Prints planets table
		if(planets.length > 0) {
			planets.push({ planet_no : "edge", x : "", y : "" });
		}
		planetTable.print(planets);
	});
}, updateInterval);
planetcontrol.init($("#planets"), $("#planetData"));
