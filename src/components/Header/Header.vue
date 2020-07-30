<template>
  <div class="Header">
    <div class="header">
      <router-link to="/about">Список клиентов</router-link>
      <router-link to="/clientForm">Добавить клиента</router-link>
    </div>
  </div>
</template>

<script>
export default {
	props: {},
	computed: {
		message: {
			get() {
				return this.$store.state.general
			},
			set(value) {
				this.$store.commit('ADD_GENERAL', value)
			}
		}
	}
}
</script>
<style lang="sass" scoped src="./Header.sass">

</style>
