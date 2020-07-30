export default {
	state: {
		username:{},
		general:{},
		address:{},
		passport:{}
	},
	getters: {
		username: state => state.username,
		general:state=>state.general,
		address:state=>state.address,
		passport:state=>state.passport,
	},
	// actions: {
	// 	addUserName({commit}, username) {
	// 		commit('ADD_USERNAME', username);
	// 	},
	// 	addGeneral({commit}, general){
	// 		commit('ADD_GENERAL',general)
	// 	}
	// },
	mutations: {
		ADD_USERNAME(state, name) {
			state.username = name;
		},
		ADD_GENERAL(state,general){
			state.general = general
		},
		ADD_ADDRESS(state,address){
			state.address = address
		},
		ADD_PASSPORT(state,passport){
			state.passport = passport
		}
	}
}
