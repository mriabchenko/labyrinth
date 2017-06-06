export default {
	random(MaxNumber){
    return Math.floor(Math.random() * MaxNumber)
  },
  defineDirection(pressedKey){
		switch (pressedKey){//determination of the desired moving direction
			case 'w': return 'up';
			case 'd': return 'right';
			case 's': return 'down';
			case 'a': return 'left';
			default: return 'notSet';
		}
  },
	defineNeighbours(field){
		let fi, playerPos, neighbours, up, right, down, left;
		fi = field.items;
		playerPos = fi.indexOf('p');
		neighbours = {};
		up = fi[playerPos - field.width];
		right = fi[playerPos + 1];
		down = fi[playerPos + field.width];
		left = fi[playerPos - 1];
		if (typeof(up) != 'undefined') neighbours.up = up;
		if ((typeof(right) != 'undefined') && ((playerPos + 1)%field.width != 0)) neighbours.right = right;
		if (typeof(down) != 'undefined') neighbours.down = down;
		if ((typeof(left) != 'undefined') && (playerPos%field.width != 0)) neighbours.left = left;
		return neighbours;
	},
	checkIfTheMoveIsPossible(field, direction) {
		let neighbours = this.defineNeighbours(field);
		//if player has neighbor item in this direstion and it is not a wall
		if ((Object.keys(neighbours).indexOf(direction) != -1)&&(neighbours[direction] != 'w')) return true
		else return false;
  },
  autoPilotChooseDirection(movementMap, wallsMap){
		let neighbours, neighboursValues, posibilities, minItem;
		neighbours = this.defineNeighbours(wallsMap);
		//go to exit, if it is neighbour
		if (this.gotoNeighbourExit(neighbours)) return this.gotoNeighbourExit(neighbours);
		neighboursValues = Object.values(neighbours);
		// neighboursValues.find(function (element, index, array) {
		// 	parseInt(array[index])
		// });
		this.isDeadEnd(neighbours);

		return 'up'
	},
	gotoNeighbourExit(neighbours){
		let neighboursValues = Object.values(neighbours);
		if (neighboursValues.indexOf('e') != -1){
			console.log(Object.keys(neighbours)[neighboursValues.indexOf('e')]);
			return Object.keys(neighbours)[neighboursValues.indexOf('e')]
		}
		else return false
	},
	isDeadEnd(neighbours){
		for(var key in neighbours){
			console.log(key);
		}
	}
}