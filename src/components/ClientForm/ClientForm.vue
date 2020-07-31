<template>
  <div class="tabs__container">
    <div class="tabs">
      <button :key="i" @click="activeTab(i,tab.value)" class="tab__btn" ref="tabs" v-for="(tab,i) in tabs">
        {{tab.text}}
      </button>
    </div>
    <div class="tab__component">
      <keep-alive>
        <component ref="component" v-bind:is="currentTab">
          <template v-slot:header>
            <div class="card__header"><h2>Карточка клиента</h2></div>
          </template>
        </component>
      </keep-alive>
      <div v-if="statusIsOkay===false">Сначала заполните обязательные поля во всех вкладках!</div>
      <div v-if="statusIsOkay===true">
        Клиент создан
        <button @click="statusIsOkay=null">Закрыть</button>
      </div>
      <div class="d-flex justify-center mb-30 btn__container">
        <button :disabled="this.tabStatus.length<3" :title="btnTitle" @click="addClient()" class="btn">Добавить клиента</button>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from '@/main.js'

export default {
	name: 'ClientForm',
	components: {
		'Address': () => import('../Address/Address'),
		'General': () => import('../General/General'),
		'Passport': () => import('../Passport/Passport'),
	},
	props: {
		msg: String
	},
	mounted() {
		this.$refs.tabs[0].classList.add(this.setTab)
		eventBus.$on('status', e => {
			this.status.push(e())
		})
	},
	data: () => {
		return {
			tabs: [{ text: 'Общие', value: 'General' },
				{ text: 'Адрес', value: 'Address' },
				{ text: 'Паспорт', value: 'Passport' },
			],
			currentTab: 'General',
			tabStatus: ['General'],// пока пользователь не зайдёт на все три вкладки, то кнопка не разлочится
			status: [],// статус валидности полей true/false undefined??
			statusIsOkay: null,
		}
	},
	computed: {
		setTab: () => {
			return 'tab__btn--active'
		},
		btnTitle: (vm) => {
			if (vm.tabStatus.length < 3)
				return 'Сначала заполните обязательные поля во вкладках'
			return 'Добавить клиента'
		}
	},
	methods: {
		addClient() {
			eventBus.$emit('addClient', 'shit')
			this.statusIsOkay = this.status.indexOf(true) === -1
			this.status = []
		},
		activeTab(index, tabComponent) {
			if (!this.tabStatus.find((e) => e === tabComponent)) this.tabStatus.push(tabComponent)// проверяем был ли пользователь на вкладке
			// работа с классами
      this.$refs.tabs[index].classList.add(this.setTab)
			this.currentTab = tabComponent
			this.tabs.forEach((e, i) => {
				if (i !== index)
					this.$refs.tabs[i].classList.remove(this.setTab)
			})
		}
	}
}
</script>
<style lang="sass" scoped src="./ClientForm.sass"></style>
