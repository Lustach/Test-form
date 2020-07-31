import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import 'reset-css'
import './assets/css/global.sass'
export const eventBus = new Vue()
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
	render: h => h(App)
}).$mount('#app')

