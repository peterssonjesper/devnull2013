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
		ship.get_position(function(position) {
			this.map.printSingle(position.x, position.y, "red");
		});
	}
};
