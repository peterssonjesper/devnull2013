var Ship = function(starMap, planetMap) {
	this.starMap = starMap;
	this.planetMap = planetMap;
	this.get_position = function(callback) {
		var self = this;
		$.ajax({
			url: "/ship",
			dataType : "json",
		}).done(function(data) {
			self.ship_data = data;
			callback(data);
		});
	};

	this.print_on_map = function() {
		var self = this;
		ship.get_position(function(ship_data) {
			self.starMap.printAtom(ship_data.unix, ship_data.uniy, "red");
			self.planetMap.printAtom(ship_data.systemx, ship_data.systemy, "red");
		});
	}
};
