var Map = function() {

	this.getMap = function(callback) {

		$.ajax({
			url: "/stars",
			dataType : "json",
		}).done(function(data) {
			var stars = data["stars"];
			callback(stars);
		});
	};
	this.print = function(stars, $canvas, $table) {
		this.context = $canvas[0].getContext('2d');
		for(var i in stars) {
			var star = stars[i];
			this.printSingle(star.x, star.y, "yellow");
			$table.append('<tr><td>' + star.name + '</td><td>' + star.x + '</td><td>' + star.y + '</td></tr>');
		}
	}

	this.printSingle = function(x, y, color) {
		this.context.beginPath();
		this.context.arc(x, y, 3, 0, 2*Math.PI, false);
		this.context.fillStyle = color;
		this.context.fill();
	}

};

