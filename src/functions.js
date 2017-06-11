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
		console.log('______________________');
		console.log('movementMap:',movementMap);
		console.log('wallsMap:',wallsMap);
		let neighbours, pp, minVal;
		pp = wallsMap.items.indexOf('p'); //pp - player postion
		neighbours = this.defineNeighbours(wallsMap);
		console.log('neighbours:',neighbours);
		console.log('player position:',pp);
		//define neighbours values from walls map
		for (var direction in neighbours){
			if (direction == 'up') neighbours[direction] = movementMap[pp - wallsMap.width];
			if (direction == 'right') neighbours[direction] = movementMap[pp + 1];
			if (direction == 'down') neighbours[direction] = movementMap[pp + wallsMap.width];
			if (direction == 'left') neighbours[direction] = movementMap[pp - 1];
		}
		console.log('neighbours movement values:', neighbours);
		//difine minimum neighbour value
		minVal = 9999;
		for (var direction in neighbours){
			if (neighbours[direction] < minVal) minVal = neighbours[direction]
		}
		//search for direction with minimal value
		for (var direction in neighbours){
			if (neighbours[direction] == minVal) return direction
		}
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
		// for(var key in neighbours){
		// 	console.log(key);
		// }
	}
}