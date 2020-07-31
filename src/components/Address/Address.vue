<template>
  <div class="general">
    <slot name="header"></slot>
    <form class="form">
      <my-input label="Индекс" v-model.trim="index"/>
      <my-input label="Страна" v-model.trim="country"/>
      <my-input label="Область" v-model.trim="region"/>
      <my-input label="Город" required="*" v-model.trim="city"/>
      <my-input label="Улица" v-model.trim="street"/>
      <my-input label="Дом" v-model="house"/>
    </form>
  </div>
</template>

<script>
import {eventBus} from '@/main.js'
import {bus, status} from "../../plugins/bus"

export default {
	name: 'Address',
	components: {
		'my-input': () => import('../Fields/Input'),
	},
	data: () => {
		return {
			index: '',
			country: '',
			region: '',
			city: '',
			street: '',
			house: '',
		}
	},
	mounted() {
		console.log(this, 'Address')
		bus(eventBus, status.bind(this))
	},
	props: {},
}
</script>
<style lang="sass" scoped src="./Address.sass"></style>
