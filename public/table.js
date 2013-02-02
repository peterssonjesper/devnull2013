var Table = function($table, keyName) {
	this.$table = $table;
	this.keyName = keyName;
	this.print = function(atoms) {
		$table.find("tbody").html("");
		for(var i in atoms) {
			var atom = atoms[i];
			this.$table.find("tbody").append('<tr data-index="' + i + '"><td class="name">' + atom[this.keyName] + '</td><td class="xpos">' + atom.x + '</td><td class="ypos">' + atom.y + '</td></tr>');
		}
	}
};
