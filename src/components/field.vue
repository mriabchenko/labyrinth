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
    <section
      class="field"
      ref="field"
      :style="fieldStyle">
      <div
        v-for="i in field.width * field.height"
        :key="i"
        class="field__item"
        :class="defineItemClass(i-1)"
        :style="fieldItemStyle">{{i-1}}</div>
    </section>
  </div>
</template>

<script>
  import f from './../functions'
  export default {
  	data(){
  		return {
        field: {
          widthPx: '',
          heightPx: '',
          width: 20, //blocks number
          height: 20, //blocks number
          limits: { //hardcoded limits
            max: {
              width: 20, //block number
              height: 20 //block number
            },
            min: {
              width: 2, //blocks number
              height: 2 //blocks number
            }
          },
        },
        walls: {
          number: 30, //blocks number
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
			checkDevice() { //update info about device (width, height, scroll position ... )
				this.$store.commit('checkDevice');
			},
      addWallBlocks(){
				let i = 0, wallPosition;
				while (i < this.walls.number){
					wallPosition = f.random(this.fieldItemsNumber);
					if (this.walls.position.indexOf(wallPosition) == -1) {
						this.walls.position.push(wallPosition);
						i++;
					}
				}
      },
      addPlayer(){
      	let playerPosition;
				while (true) {
					playerPosition = f.random(100);
					if (this.walls.position.indexOf(playerPosition) == -1) {
						this.player.position = playerPosition;
						break;
					}
				}
      },
			defineItemClass(item) { //is the block is wall or player or just empty field
        if (this.walls.position.indexOf(item) != -1) return 'field__item_wall';
        if (this.player.position == item) return 'field__item_player';
			},
      createField(){//functions sequence to create new field
        this.calcFieldActualSize();
        this.calcFieldItemStyle();
        this.calcFieldStyle();
        this.addWallBlocks();
        this.addPlayer();
      },
      recreateField(){//functions sequence to recreate new field
      	this.walls.position = [];
      	this.player.position = '';
				this.calcFieldItemStyle();
				this.calcFieldStyle();
				this.addWallBlocks();
				this.addPlayer();
      },
      movePlayer(event){//moving player around the field
      	let direction = f.defineDirection(event.key);
      	console.log(f.checkIfTheMoveIsPossible(this.fieldState, direction))
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
      handleWidthInput(event){ //ensure that inputted value is not collapsing anything
        let value = Number(event.target.value);
        if (value > this.field.limits.max.width) this.field.width = this.field.limits.max.width
        else if (value < this.field.limits.min.width || Number.isNaN(value)) this.field.width = this.field.limits.min.width
        else this.field.width = value;
        //check if all that walls can fit into new size field
        this.handleWallsNumber();
        this.recreateField();
      },
      handleHeightInput(event){ //ensure that inputted value is not collapsing anything
        let value = Number(event.target.value);
        if (value > this.field.limits.max.height) this.field.height = this.field.limits.max.height
        else if (value < this.field.limits.min.height || Number.isNaN(value)) this.field.height = this.field.limits.min.height
        else this.field.height = value;
        //check if all that walls can fit into new size field
        this.handleWallsNumber();
        this.recreateField();
      },
      handleWallsNumberInput(event){ //ensure that inputted value is not collapsing anything
        let value = Number(event.target.value);
        if (value > this.fieldItemsNumber - 1) this.walls.number = this.fieldItemsNumber - 1
        else if (value < 0 || Number.isNaN(value)) this.walls.number = 0
        else this.walls.number = value;
				//check if all that walls can fit into new size field
        this.recreateField();
      },
      handleWallsNumber() { //check if all that walls can fit into the field
      	if (this.walls.number > this.fieldItemsNumber - 1) this.walls.number = this.fieldItemsNumber - 1;
      }
		},
    computed: {
  	  fieldItemsNumber(){ //how many field items are in the field
  	    return this.field.height * this.field.width;
      },
      fieldState(){//two-dimensional array which represents a current field state. w - wall item, p - player item
  	  	let fieldItems = new Array(this.fieldItemsNumber);
  	  	for (var i = 0; i < this.fieldItemsNumber; i++) {
          if (i == this.player.position) fieldItems[i] = 'p'
          else if (this.walls.position.indexOf(i) != -1) fieldItems[i] = 'w'
          else fieldItems[i] = 0;
				}
        return {
  	  		height: this.field.height,
          width: this.field.width,
          items: fieldItems
				};
      }
    },
    watch: { //recreate field when someone define a new walls number
  	  'walls.number'(){
  	    this.recreateField();
      }
    },
		mounted(){
  		let vm = this;
			this.$nextTick(function() {
        this.checkDevice();
				window.addEventListener('resize', this.checkDevice);
				window.addEventListener('keydown', function(event){vm.movePlayer(event)});
				this.createField();
			})
		},
		beforeDestroy() {//removing event listeners
			window.removeEventListener('resize', this.checkDevice);
			window.removeEventListener('keydown', function(event){vm.movePlayer(event)});
		}
  }
</script>