var Ship = function(starMap, planetMap) {
	this.starMap = starMap;
	this.planetMap = planetMap;

	this.get_position = function(callback) {
		$.ajax({
			url: "/ship_position",
			dataType : "json",
		}).done(function(data) {
			callback(data);
		});
	};

	this.print_on_map = function() {
		var self = this;
		ship.get_position(function(position) {
			self.starMap.printAtom(position.x, position.y, "red");
			self.planetMap.printAtom(position.system_x, position.system_y, "red");
		});
	}
};
