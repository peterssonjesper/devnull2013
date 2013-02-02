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
		for(var i in stars) {
			var star = stars[i];
			var context = $canvas[0].getContext('2d');
			this.printSingle(context, star.x, star.y);
			$table.append('<tr><td>' + star.name + '</td><td>' + star.x + '</td><td>' + star.y + '</td></tr>');
		}
	}

	this.printSingle = function(context, x, y) {
		context.arc(x, y, 3, 0, 2*Math.PI, false);
		context.fillStyle = "yellow";
		context.fill();
	}
};

var map = new Map();
map.getMap(function(stars) {
	map.print(stars, $("#map"), $("table"));
});
