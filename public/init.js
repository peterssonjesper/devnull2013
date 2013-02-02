var starMap = new Map($("#starMap"));
var planetMap = new Map($("#planetMap"));

var mapcontrol = new MapControl();
var ship = new Ship(starMap);
var updateInterval = 500;

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
		// Prints planets table
		printTable($("#planets"), planets, "planet_no");

		// Print planets on planet map
		planetMap.clear();
		planetMap.print(planets, "lime")
	});
}, updateInterval);

function printTable($table, atoms, keyName) {
	$table.find("tbody").html("");
	for(var i in atoms) {
		var atom = atoms[i];
		$table.find("tbody").append('<tr class="star"><td class="name">' + atom[keyName] + '</td><td class="xpos">' + atom.x + '</td><td class="ypos">' + atom.y + '</td></tr>');
	}
}
