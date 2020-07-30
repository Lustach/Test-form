export function bus(bus, status) {
	bus.$on('myEvent', () => {
		bus.$emit('testEmit', () => {
			return status()
		})
	})
}
export function status() {
	if (this.$v) {
		this.$v.$touch()//error
		if (this.$v.$invalid) { //equal to return !!this.$v.$invalid;
			return true
		} else {
			return false
		}
	}
}
// export function validate() {
// 			if (this.required) {
// 			if (this.type === 'tel') {
// 				return {
// 					value: {
// 						required,
// 						telField(value) {
// 							return (
// 								// eslint-disable-next-line no-useless-escape
// 								/7([\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value) &&
// 								value.length === 11// ?
// 							)
// 						}
// 					}
// 				}
// 			} else {
// 				return {
// 					value: {
// 						required,
// 						maxLength: maxLength(25),
// 						minLength: minLength(2),
// 						textField(value) {
// 							return (
// 								/^[A-zА-яЁё]/.test(value) &&
// 								value.length >= 2 && value.length <= 25// ?
// 							)
// 						},
// 					}
// 				}
// 			}
// 		} else {
// 			return {
// 				value: {
// 					minLength: minLength(0),
// 					maxLength: maxLength(25)
// 				}
// 			}
// 		}
// }
