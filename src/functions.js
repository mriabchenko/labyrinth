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
	checkIfTheMoveIsPossible(field, direction) {
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

		//if player has neighbor item in this direstion and it is not a wall
		if ((Object.keys(neighbours).indexOf(direction) != -1)&&(neighbours[direction] != 'w')) return true
		else return false;
  },
  autoPilotChooseDirection(movementMap, wallsMap){
		return 'up'
	}
}