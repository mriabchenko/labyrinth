export default {
	random(MaxNumber){
    return Math.floor(Math.random() * MaxNumber + 1)
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

  }
}