<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
  import field from './components/field.vue'
	export default {
		components: {
			field
		},
	}
</script>

<script src="./assets/style/main.sass" lang="sass"></script>