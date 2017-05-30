<template>
  <div>
    <div class="control">
      <h3>Field parameters</h3>
      <p>
        <label>Field width</label>
        <input
          type="number"
          :value="field.width"
          @input="handleWidthInput"
          :max="field.limits.max.width"
          :min="field.limits.min.width">
      </p>
      <p>
        <label>Field height</label>
        <input
          type="number"
          :value="field.height"
          @input="handleHeightInput"
          :max="field.limits.max.height"
          :min="field.limits.min.height">
      </p>
      <p>
        <label>Walls number</label>
        <input
          type="number"
          :value="walls.number"
          @input="handleWallsNumberInput"
          :max="fieldItemsNumber - 1"
          :min="0">
      </p>
      <p>
        <button class="btn" @click="recreateField">Recreate field</button>
      </p>
    </div>

    <section class="field" ref="field" :style="fieldStyle">
      <div
        v-for="i in field.width * field.height"
        :key="i"
        class="field__item"
        :class="defineItemClass(i)"
        :style="fieldItemStyle">{{i}}</div>
    </section>
  </div>
</template>

<script>
  export default {
  	data(){
  		return {
        field: {
          widthPx: '',
          heightPx: '',
          width: 20,
          height: 20,
          limits: { //hardcoded limits
            max: {
              width: 20,
              height: 20
            },
            min: {
              width: 2,
              height: 2
            }
          },
        },
        walls: {
          number: 30,
          position: []
        },
        player: {
          position: ''
        },
        fieldStyle: {},
        fieldItemStyle: {}
      }
    },
		methods: {
			checkDevice() {
				this.$store.commit('checkDevice');
			},
      addWallBlocks(){
				let i = 0, wallPosition;
				while (i < this.walls.number){
					wallPosition = Math.floor(Math.random() * this.fieldItemsNumber + 1);
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
      createField(){
        this.calcFieldActualSize();
        this.calcFieldItemStyle();
        this.calcFieldStyle();
        this.addWallBlocks();
        this.addPlayer();
      },
      recreateField(){
      	this.walls.position = [];
      	this.player.position = '';
				this.calcFieldItemStyle();
				this.calcFieldStyle();
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
      },
      calcFieldActualSize(){
        this.field.heightPx = this.$refs.field.clientHeight;
        this.field.widthPx = this.$refs.field.clientWidth;
      },
      calcFieldItemStyle(){
        let styleObj = {
          'flex-basis' : Math.floor(Math.sqrt((this.field.widthPx * this.field.heightPx) / (this.fieldItemsNumber))) + 'px'
        };
        this.fieldItemStyle = styleObj;
      },
      calcFieldStyle(){
        let fieldItemSideLenght =  parseInt(this.fieldItemStyle['flex-basis']);
        let styleObj = {
          'width' : fieldItemSideLenght * this.field.width + 'px',
          'height' : fieldItemSideLenght * this.field.height + 'px'
        };
        this.fieldStyle = styleObj;
      },
      handleWidthInput(event){
        let value = Number(event.target.value);
        if (value > this.field.limits.max.width) this.field.width = this.field.limits.max.width
        else if (value < this.field.limits.min.width || Number.isNaN(value)) this.field.width = this.field.limits.min.width
        else this.field.width = value
        this.recreateField();
      },
      handleHeightInput(event){
        let value = Number(event.target.value);
        if (value > this.field.limits.max.height) this.field.height = this.field.limits.max.height
        else if (value < this.field.limits.min.height || Number.isNaN(value)) this.field.height = this.field.limits.min.height
        else this.field.height = value
        this.recreateField();
      },
      handleWallsNumberInput(event){
        let value = Number(event.target.value);
        if (value > this.fieldItemsNumber - 1) this.walls.number = this.fieldItemsNumber - 1
        else if (value < 0 || Number.isNaN(value)) this.walls.number = 0
        else this.walls.number = value
        this.recreateField();
      }
		},
    computed: {
  	  fieldItemsNumber(){
  	    return this.field.height * this.field.width;
      }
    },
    watch: {
  	  'walls.number'(){
  	    console.log('walls');
  	    this.recreateField();
      }
    },
		mounted(){
  		let vm = this;
			this.$nextTick(function() {
        this.checkDevice();
        window.addEventListener('resize', this.checkDevice);
        window.addEventListener('keydown', function(event){vm.movePlayer(event)}, true);
        this.createField();
			})
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.checkDevice);
		}
  }
</script>