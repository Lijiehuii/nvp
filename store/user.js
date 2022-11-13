export default {
	// 开启user的命名空间
	namespaced: true,

	state: () => ({
		// 用户的地址
		address: JSON.parse(uni.getStorageSync('address') || "{}"),
		// 用户的token
		token: uni.getStorageSync('token') || "",
		// 用户的信息
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || "{}"),
		// 重定向的Object对象
		redirectInfo: null
	}),
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, userInfo) {
			state.userinfo = userInfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', JSON.stringify(state.token))
		},
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
			console.log(state.redirectInfo);
		}
	},
	getters: {
		// 用户的收货地址
		addStr(state) {
			if (!state.address.provinceName) {
				return ""
			}
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}
