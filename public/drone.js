var Drone = function() {
	
	this.releaseAgain = function(ship, droneIndex){
		if(ship.drones === undefined || droneIndex > ship.drones.length){
			return;
		}
		var droneReleased = false;
		var drone = ship.drones[droneIndex];
		$.post("/release_drone", {x: ship.system_x, y: ship.system_x, drone_id: drone.droneid}, function(data){
			if(!data.isReleased) {
				droneReleased = true;
			}
			else {
				this.release(ship, droneIndex+1);
			}
		}, "json");
	}; 
	this.release = function(ship) {
		this.releaseAgain(ship, 0);
	};
};
