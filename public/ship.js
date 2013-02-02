var Ship = function(map) {
	this.map = map;
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
			self.map.printAtom(position.x, position.y, "red");
		});
	}
};
