export function bus(bus, status) {
	// прослушка события после которой произойдёт вызов события и пуш состояния валидации в клиентформ
	bus.$on('addClient', () => {
		bus.$emit('status', () => {
			return status()
		})
	})
}
export function status() {
	if (this.$v) {
		this.$v.$touch()
		if (this.$v.$invalid) { //equal to return !!this.$v.$invalid;
			return true
		} else {
			return false
		}
	}
}
