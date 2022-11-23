import Vue from 'vue'
import Vuex from 'vuex'
import userModule from "@/store/user.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		"m_user": userModule,
	}
})

export default store
