<template>
  <div id="app">
    <Header/>
    <client-form id="content"/>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'

export default {
	name: 'Home',
	components: {
		Header,
		'client-form': () => import('./components/ClientForm/ClientForm'),
	}
}
</script>
<style lang="scss">
#content{
  margin: 70px 15px 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
