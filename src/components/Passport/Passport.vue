<template>
  <div class="general">
    <slot name="header"></slot>
    <form class="form">
      <div class="d-flex wrap">
        <my-input class="col w-100" label="Серия" v-model.trim="series"/>
        <my-input class="col w-100" label="Номер" v-model.trim="number"/>
        <my-input class="col w-100" label="Кем выдан" type="tel" v-model="issued"/>
        <div class="input--group">
          <p class="input--title">Дата выдачи<span class="required">*</span></p>
          <div class="d-flex wrap justify-center">
            <input @blur="$v.issueDate.$touch()" class="input-container input--date"
                   type="date" v-model.trim="$v.issueDate.$model">
            <template v-if="$v.issueDate.$error && $v.issueDate.$dirty">
              Обязательное поле
            </template>
          </div>
        </div>
        <div class="input--group">
          <p class="input--title">Тип документа<span class="required">*</span></p>
          <div class="d-flex wrap justify-center">
            <select @blur="$v.docType.$touch()" class="input-container select-field" v-model="docType.selectedType">
              <option disabled value="">Выберите один из вариантов</option>
              <option :key="key" v-bind:value="item.value" v-for="(item,key) in docType.list">{{item.text}}</option>
            </select>
            <template v-if="$v.docType.selectedType.$error && $v.docType.$dirty">
              Обязательное поле
            </template>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import {eventBus} from '@/main.js'
import {bus, status} from "../../plugins/bus"

export default {
	name: 'Passport',
	components: {
		'my-input': () => import('../Fields/Input'),
	},
	data: () => {
		return {
			docType: {
				list: [
					{ text: 'Паспорт', value: '1' },
					{ text: 'Свидетельство о рождении', value: '2' },
					{ text: 'Вод. удостоверение', value: '3' }],
				selectedType: '',
			},
			series: '',
			number: '',
			issued: '',
			issueDate: '',
		}
	},
	validations: {
		issueDate: {
			required,
		},
		docType: {
			list: {
				required
			},
			selectedType: {
				required
			}
		}
	},
	mounted() {
		console.log(this, 'Passport')
		bus(eventBus, status.bind(this))
	},
	props: {},
}
</script>
<style lang="sass" scoped src="./Passport.sass"></style>
