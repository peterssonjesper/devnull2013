var Drone = function() {
	
	this.releaseAgain = function(ship, droneIndex, callback){
		if(droneIndex > ship.drones.length){
			return;
		}
		var droneReleased = false;
		var drone = ship.drones[droneIndex];
		$.post("/release_drone", {x: ship.system_x, y: ship.system_x, drone_id: drone.droneid}, function(data){
			if(!data.isReleased) {
				droneReleased = true;
				callback(data.droneID);
			}
			else {
				this.release(ship, droneIndex+1);
			}
		}, "json");
	}; 

	this.release = function(ship, callback) {
		this.releaseAgain(ship, 0, callback);
	};

	this.scan = function(droneID, callback){
		$.post("drone_scan", {drone_id: droneID}, function(data){
			callback(data);
		}, "json");
	};
};
