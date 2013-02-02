var starMap = new Map($("#starMap"));
var planetMap = new Map($("#planetMap"));

var planetTable = new Table($("#planets"), "planet_no");
var starTable = new Table($("#stars"), "name");

var mapControl = new MapControl();
var planetcontrol = new PlanetControl();
planetcontrol.init($("#planets"), $("#planetData"));

var ship = new Ship(starMap, planetMap);
var drone = new Drone();
var updateInterval = 500;

starMap.getMap("/stars", {},function(stars) {
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
	planetMap.getMap("/planets", {x: ship.system_x, y: ship.system_y},function(data) {
		//Check if ship has reached a planet
		if(data.reachedPlanet === true) {
			planetcontrol.updateVisited();
		}
		var planets = data.planets;
		planetcontrol.setPlanets(planets);
		planetcontrol.drawPlanetDetails(planets);

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

setInterval(function() {
	var name = get_next_visit();
	var autoPilotEnabled = $("#autopilot").is(":checked")
	if(name && autoPilotEnabled)
		planetcontrol.go_to_planet(name);
}, updateInterval*2);

function get_next_visit() {
	planets = $("#planets").find("tbody tr");
	for(var i=0; i < planets.length; ++i) {
		planet = $(planets[i]);
		var name = planet.find("td.name").html();
		if(name == "edge")
			continue;
		var already_visited = false
		$("#visitedPlanets table tr").each(function() {
			if($(this).data("name") === name) {
				already_visited = true;
			}
		});
		if(already_visited === false) {
			return name;
		}
	}
	return false;
}
planetcontrol.updateVisited();

$('#planet > button').on('click', function(){
	drone.release(ship, function(droneID){
		drone.scan(droneID, function(data){
			console.log(data);
		});
	});
});
