<template>
  <div class="input-container">
    <input :class="{'field__error':$v.value.$error,'field__success':!$v.value.$error && $v.value.$dirty && required}" :type="type" :value="value" @change="input" class="mb-5"
           required=""
           v-on:blur='$v.value.$touch()'/>
    <label>{{label}}<span class="required">{{required}}</span></label>
    <div class="error" v-if="$v.value.$error">
      <template v-if="required && value.length===0">Обязательное поле</template>
      <template v-else-if="required && !$v.value.textField && type==='text'">
        Длина поля должна быть от {{$v.value.$params.minLength.min}} до {{$v.value.$params.maxLength.max}} символов
      </template>
      <template v-else-if="required && !$v.value.telField && type==='tel'">
        Номер должен начинаться с "7" и иметь 11 символов
      </template>
    </div>
  </div>
</template>

<script>
import {maxLength, minLength, required} from 'vuelidate/lib/validators'
import {eventBus} from '@/main.js'
import {bus, status} from "../../plugins/bus"

export default {
	name: "Input",
	props: {
		value: {
			type: [Number, String],
			default: '',
		},
		label: {
			type: String
		},
		required: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: 'text',
		}
	},
	mounted() {
		bus(eventBus, status.bind(this))
	},
	data: () => {
		return {
			test: '',

		}
	},
	methods: {
		input(e) {
			this.$v.value.$touch()
			this.$emit('input', e.target.value)
		},
	},
	computed: {},
	validations() {
		if (this.required) {
			if (this.type === 'tel') {
				return {
					value: {
						required,
						telField(value) {
							return (
								// eslint-disable-next-line no-useless-escape
								/7([\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value) &&
								value.length === 11// ?
							)
						}
					}
				}
			} else {
				return {
					value: {
						required,
						maxLength: maxLength(25),
						minLength: minLength(2),
						textField(value) {
							return (
								/^[A-zА-яЁё]/.test(value) &&
								value.length >= 2 && value.length <= 25// ?
							)
						},
					}
				}
			}
		} else {
			return {
				value: {
					minLength: minLength(0),
					maxLength: maxLength(25)
				}
			}
		}
	}
}
</script>

<style lang="sass" scoped>
@import '/src/assets/css/global'

.form__group
  width: 100%
/*flex: 1*/


.input-container label
  position: absolute
  top: 0px
  left: 0px
  font-size: 16px
  color: black
  pointer-event: none
  transition: all 0.5s ease

.input-container input
  border: 0
  border-bottom: 1px solid #555
  background: transparent
  width: 100%
  padding: 8px 0 5px 0
  font-size: 16px
  color: black

  &.field
    &__error
      border-bottom: 1px solid #b20000
      background-color: #d8dfe8

    &__success
      border-bottom: 1px solid #31b838

    &__require
      border-bottom: 1px solid $primary-success

.input-container input:focus
  border: none
  outline: none
  border-bottom: 1px solid $primary-success


.input-container input:focus ~ label,
.input-container input:valid ~ label
  top: -12px
  font-size: 12px
  color: $primary-success

</style>
