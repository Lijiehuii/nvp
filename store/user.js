export default {
	// 开启user的命名空间
	namespaced: true,

	state: () => ({
		// 用户关注的
		followUserData: JSON.parse(uni.getStorageSync('followUserData') || "[]"),
		// 用户喜欢的
		like: JSON.parse(uni.getStorageSync('like') || "[]"),
		// 用户收藏的
		collection: JSON.parse(uni.getStorageSync('collection') || "[]"),
		// 用户作品
		creation: JSON.parse(uni.getStorageSync('creation') || "[]"),
		// 用户的token
		token: uni.getStorageSync('token') || "",
		// 用户的信息
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || "{}"),
		// 用户浏览过的
		footprint: JSON.parse(uni.getStorageSync('footprint') || "[]"),
		// 重定向的Object对象
		redirectInfo: null
	}),
	mutations: {
		updateFollowUser(state, user) {
			let followuser = {
				id: user.userinfo.id,
				username: user.userinfo.username,
				avatar: user.userinfo.avatar,
				follower: user.userinfo.count.count_follower
			}
			state.followUserData = [followuser, ...state.followUserData]
			this.commit('m_user/saveFollowUserToStorage')
		},
		filterFollowUser(state, id) {
			state.followUserData = state.followUserData.filter(f => {
				return f.id !== id
			})
			this.commit('m_user/saveFollowUserToStorage')
		},
		saveFollowUserToStorage(state) {
			uni.setStorageSync('followUserData', JSON.stringify(state.followUserData))
		},

		updateCollection(state, collection) {
			let newdata = {
				id: collection.id,
				cover: collection.cover,
				title: collection.title,
				duration: collection.duration,
				count: {
					count_view: collection.count.count_view,
					count_like: collection.count.count_like,
				},
				author: {
					avatar: collection.author.userinfo.avatar,
					username: collection.author.userinfo.username
				}
			}
			state.collection = [newdata, ...state.collection]
			this.commit('m_user/saveCollectionToStorage')
		},
		filterCollection(state, id) {
			state.collection = state.collection.filter(c => {
				return c.id !== id
			})
			this.commit('m_user/saveCollectionToStorage')
		},
		saveCollectionToStorage(state) {
			uni.setStorageSync('collection', JSON.stringify(state.collection))
		},

		updateLike(state, id) {
			state.like = [id, ...state.like]
			this.commit('m_user/saveLikeToStorage')
		},
		filterLike(state, id) {
			state.like = state.like.filter(l => {
				return l !== id
			})
			this.commit('m_user/saveLikeToStorage')
		},
		saveLikeToStorage(state) {
			uni.setStorageSync('like', JSON.stringify(state.like))
		},

		updateFootprint(state, footprint) {
			state.footprint = state.footprint.filter(f => {
				return f.id !== footprint.id
			});
			state.footprint = [footprint, ...state.footprint]
			this.commit('m_user/saveFootprintToStorage')

		},
		resetFootprint(state) {
			state.footprint = []
			this.commit('m_user/saveFootprintToStorage')
		},
		filterFootprint(state, footprint) {
			state.footprint = state.footprint.filter(f => {
				return f.id !== footprint.id
			})
			this.commit('m_user/saveFootprintToStorage')
		},
		saveFootprintToStorage(state) {
			uni.setStorageSync('footprint', JSON.stringify(state.footprint))
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
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
			console.log(state.redirectInfo);
		},
		reset(state) {
			state.creation = []
			state.collection = []
			state.like = []
			state.followUserData = []
			state.footprint = []
			uni.removeStorageSync("creation")
			uni.removeStorageSync("collection")
			uni.removeStorageSync("like")
			uni.removeStorageSync("followUserData")
			uni.removeStorageSync("footprint")
		}
	},
	getters: {
		followCount(state) {
			return state.followUserData.length
		},
		likeCount(state) {
			return state.like.length
		},
		collectionCount(state) {
			return state.collection.length
		},
		creationCount(state) {
			return state.creation.length
		}
	}
}
