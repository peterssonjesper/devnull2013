var Map = function($canvas) {

	this.context = $canvas[0].getContext('2d');

	this.getMap = function(url, callback) {
		$.ajax({
			url: url,
			dataType : "json",
		}).done(function(data) {
			callback(data);
		});
	};

	this.print = function(atoms, color) {
		for(var i in atoms) {
			var atom = atoms[i];
			this.printAtom(atom.x, atom.y, color);
		}
	}

	this.printAtom = function(x, y, color) {
		this.context.beginPath();
		this.context.arc(x, y, 3, 0, 2*Math.PI, false);
		this.context.fillStyle = color;
		this.context.fill();
	},

	this.clear = function() {
		this.context.clearRect(0, 0, 200, 200);
	}

};
