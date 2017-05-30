<template>
  <div>
    <button @click="recreateField">Recreate field</button>
    <section class="field">
      <div
        v-for="i in itemsNumber"
        :key="i"
        class="field__item"
        :class="defineItemClass(i)"
        :style="{'order':i}">{{i}}</div>
    </section>
  </div>
</template>

<script>
  export default {
  	data(){
  		return {
        itemsNumber: 100,
        wallsNumber: 40,
        walls: [],
        players: []
      }
    },
		methods: {
			checkDevice() {
				this.$store.commit('checkDevice');
			},
      addWallBlocks(){
				let i = 0, wallPosition;
				while (i < this.wallsNumber){
					wallPosition = Math.floor(Math.random() * 100 + 1);
					if (this.walls.indexOf(wallPosition) == -1) {
						this.walls.push(wallPosition);
						i++;
					}
				}
      },
      addPlayer(){
      	let playerPosition;
				while (true) {
					playerPosition = Math.floor(Math.random() * 100 + 1);
					if (this.walls.indexOf(playerPosition) == -1) {
						this.players.push(playerPosition);
						break;
					}
				}
      },
			defineItemClass(item) {
        if (this.walls.indexOf(item) != -1) return 'field__item_wall';
        if (this.players.indexOf(item) != -1) return 'field__item_player';
			},
      recreateField(){
      	this.walls = [];
      	this.players = [];
				this.addWallBlocks();
				this.addPlayer();
      },
      movePlayer(event){
      	let pressedKey = event.key;
      	let direction;
      	switch (pressedKey){
          case 'w': direction = 'up'; break;
          case 'd': direction = 'right'; break;
          case 's': direction = 'downmn'; break;
          case 'a': direction = 'left'; break;
          default: direction = 'notSet'
        }
        console.log(direction);
      	function checkIfTheMoveIsPossible(currentPosition, direction) {

				}
      }
		},
		mounted(){
  		let vm = this;
			this.$nextTick(function() {
				window.addEventListener('resize', this.checkDevice);
				window.addEventListener('keydown', function(event){vm.movePlayer(event)}, true);
				this.checkDevice();
				this.addWallBlocks();
				this.addPlayer();
			})
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.checkDevice);
		}
  }
</script>