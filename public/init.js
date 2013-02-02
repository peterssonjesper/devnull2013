var starMap = new Map($("#starMap"));
var planetMap = new Map($("#planetMap"));

var mapcontrol = new MapControl();
var planetcontrol = new PlanetControl();

var ship = new Ship(starMap, planetMap);
var updateInterval = 2000;

starMap.getMap("/stars", function(stars) {
	// Prints stars table
	printTable($("#stars"), stars, "name");

	// Print stars starMap
	mapcontrol.init($("#stars"));
	setInterval(function() {
		starMap.clear();
		starMap.print(stars, "yellow");
		ship.print_on_map();
	}, updateInterval);
});

setInterval(function() {
	planetMap.getMap("/planets", function(planets) {
		// Print planets on planet map
		planetMap.clear();
		planetMap.print(planets, "lime")

		planetcontrol.setPlanets(planets);
		// Prints planets table
		if(planets.length > 0) {
			planets.push({ planet_no : "edge", x : "", y : "" });
		}
		printTable($("#planets"), planets, "planet_no");
	});
}, updateInterval);
planetcontrol.init($("#planets"), $("#planetData"));


function printTable($table, atoms, keyName) {
	$table.find("tbody").html("");
	for(var i in atoms) {
		var atom = atoms[i];
		$table.find("tbody").append('<tr data-index="' + i + '"><td class="name">' + atom[keyName] + '</td><td class="xpos">' + atom.x + '</td><td class="ypos">' + atom.y + '</td></tr>');
	}
}
