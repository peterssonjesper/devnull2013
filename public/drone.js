var Drone = function() {
	
	this.releaseAgain = function(ship, droneIndex, callback) {
		console.log(droneIndex);
		if(ship.ship_data.drones === undefined || droneIndex > ship.ship_data.drones.length-1) {
			return;
		}
		var drone = ship.ship_data.drones[droneIndex];
		var self = this;
		$.ajax({
			url : "/release_drone",
			data: JSON.stringify({
				x: ship.ship_data.systemx, y : ship.ship_data.systemy, drone_id: drone.droneid
			}),
			type : "POST",
			dataType : "json",
			contentType : 'application/json; charset=utf-8',
			success : function(data) {
				console.log(data);
				if(data.isReleased) {
					callback(data.droneID);
				}
				else {
					self.releaseAgain(ship, droneIndex+1, callback);
				}
			}
		});
	}; 

	this.release = function(ship, callback) {
		this.releaseAgain(ship, 0, callback);
	};

	this.scan = function(droneID, callback){
		$.post("drone_scan", JSON.stringify({drone_id: droneID}), function(data) {
			callback(data);
		}, "json");
	};
};
