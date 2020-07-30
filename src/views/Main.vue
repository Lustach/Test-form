<template>
  <div class="home">
    <client-form msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import ClientForm from '../components/ClientForm'

export default {
	name: 'Home',
	components: {
		'client-form': () => import('../components/ClientForm/ClientForm'),
	}
}
</script>
