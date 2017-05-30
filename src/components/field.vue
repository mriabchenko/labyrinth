<template>
  <div>
    <button @click="recreateField">Recreate field</button>
    <section class="field">
      <div
        v-for="i in field.width*field.height"
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
        field: {
          width: 10,
          height: 10
        },
        walls: {
          number: 40,
          position: []
        },
        player: {
          position: ''
        },
      }
    },
		methods: {
			checkDevice() {
				this.$store.commit('checkDevice');
			},
      addWallBlocks(){
				let i = 0, wallPosition;
				while (i < this.walls.number){
					wallPosition = Math.floor(Math.random() * 100 + 1);
					if (this.walls.position.indexOf(wallPosition) == -1) {
						this.walls.position.push(wallPosition);
						i++;
					}
				}
      },
      addPlayer(){
      	let playerPosition;
				while (true) {
					playerPosition = Math.floor(Math.random() * 100 + 1);
					if (this.walls.position.indexOf(playerPosition) == -1) {
						this.player.position = playerPosition;
						break;
					}
				}
      },
			defineItemClass(item) {
        if (this.walls.position.indexOf(item) != -1) return 'field__item_wall';
        if (this.player.position == item) return 'field__item_player';
			},
      recreateField(){
      	this.walls.position = [];
      	this.player.position = '';
				this.addWallBlocks();
				this.addPlayer();
      },
      movePlayer(event){
      	let pressedKey = event.key;
      	let direction;
      	switch (pressedKey){
          case 'w': direction = 'up'; break;
          case 'd': direction = 'right'; break;
          case 's': direction = 'down'; break;
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