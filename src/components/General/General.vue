<template>
  <div class="general">
    <!--    {{$v}}-->
    <slot name="header"></slot>
    <form class="form">
      <div class="d-flex wrap">
        <my-input class="col w-100" label="Фамилия" required="*" v-model.trim="surName"/>
        <my-input class="col w-100" label="Имя" required="*" v-model.trim="name"/>
        <my-input class="col w-100" label="Отчество" v-model.trim="fatherName"/>
        <my-input class="col w-100" label="Телефон" required="*" type="tel" v-model="phone"/>
        <div class="d-flex wrap">
          <div class="d-flex input-container">
            <p>Пол:</p>
            <div :key="e" class="d-flex row-reverse" v-for="e in sex.values">
              {{e}}
              <input :value="e" id="e" type="radio" v-model="sex.picked">
            </div>
          </div>
          <div class="input-container">
            <label>Отправлять смс?</label>
            <input type="checkbox" v-model="sendSms">
          </div>
        </div>
        <div class="d-flex wrap w-100">
          <div class="d-flex wrap">
            <div class="input--group">
              <p class="input--title">Дата рождения<span class="required">*</span></p>
              <div class="d-flex wrap justify-center">
                <input @blur="$v.birthday.$touch()" class="input-container input--date"
                       required="*" type="date" v-model.trim="$v.birthday.$model">
                <div v-if="$v.birthday.$error">
                  Обязательное поле
                </div>
              </div>
            </div>
            <div class="input--group">
              <p class="input--title">Группа Клиентов<span class="required">*</span></p>
              <div class="d-flex wrap justify-center">
                <select @blur="$v.group.selectedCategory.$touch()" class="input-container select-field" multiple v-model="$v.group.selectedCategory.$model">
                  <option :key="key" v-bind:value="category.value" v-for="(category,key) in group.category">{{category.text}}</option>
                </select>
                <template v-if="$v.group.selectedCategory.$error && $v.group.$dirty">
                  Обязательное поле
                </template>
                <template v-else-if="$v.group.selectedCategory.$params.minLength.min > group.selectedCategory.length && $v.group.selectedCategory.$error">
                  <div class="d-flex" style="width:150px">Выберите минимум {{$v.group.selectedCategory.$params.minLength.min}} значения</div>
                </template>
              </div>
            </div>
          </div>
          <div class="input--group">
            <p class="input--title">Лечащий Врач</p>
            <select class="input-container select-field" v-model="doctor.selectedDoctor">
              <option :key="key" v-bind:value="item.value" v-for="(item,key) in doctor.list">{{item.text}}</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {minLength, required} from 'vuelidate/lib/validators'
import {eventBus} from '@/main.js'
import {bus, status} from "../../plugins/bus"

export default {
	name: 'General',
	components: {
		'my-input': () => import('../Fields/Input'),
	},
	data: () => {
		return {
			surName: '',
			name: '',
			fatherName: '',
			birthday: '',
			phone: '',
			sex: { values: ['Мужской', 'Женский'], picked: '' },
			group: {
				category: [
					{ text: 'VIP', value: 'vip', },
					{ text: 'Проблемные', value: 'problem', },
					{ text: 'ОМС', value: 'oms', },
				],
				selectedCategory: [],
			},
			doctor: {
				list: [
					{ text: 'Иванов', value: '1', },
					{ text: 'Захаров', value: '2', },
					{ text: 'Чернышева', value: '3', },
				],
				selectedDoctor: '1',
			},
			sendSms: '',
		}
	},
	validations: {
		birthday: {
			required,
		},
		group: {
			category: {
				required
			},
			selectedCategory: {
				required,
				minLength: minLength(2)
			}
		}
	},
	mounted() {
		console.log(this, 'General')
		bus(eventBus, status.bind(this))
	},
	props: {},
}
</script>
<style lang="sass" scoped src="./General.sass"></style>
