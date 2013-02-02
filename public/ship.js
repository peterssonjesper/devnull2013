var Ship = function(starMap, planetMap) {
	this.starMap = starMap;
	this.planetMap = planetMap;
	var self = this;
	this.get_position = function(callback) {
		$.ajax({
			url: "/ship",
			dataType : "json",
		}).done(function(data) {
			self.system_x = data.systemx;
			self.system_y = data.systemy;
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
