export default {
	namespaced: true,
	state: () => ({
		// 购物车的数组，用来存储购物车中每一个商品的信息对象
		// 每一个商品的信息对象，都需包含相同的属性
		cart: JSON.parse(uni.getStorageSync('cart') || "[]")
	}),
	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find(g => g.goods_id === goods.goods_id)
			console.log(findResult);
			if (!findResult) {
				console.log("新的商品加入了购物车中!");
				state.cart = [goods, ...state.cart]
			} else {
				console.log("商品数量+1!");
				findResult.goods_count++
			}
			console.log(state.cart);
			this.commit("m_cart/saveToStorage")
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(g => g.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit("m_cart/saveToStorage")
			}
		},
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(g => g.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit("m_cart/saveToStorage")
			}
		},
		removeGoods(state, goods_id) {
			state.cart = state.cart.filter(g => g.goods_id !== goods_id)
			this.commit("m_cart/saveToStorage")
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(g => g.goods_state = newState)
			this.commit("m_cart/saveToStorage")
		}
	},
	getters: {
		total(state) {
			// let c = 0
			// state.cart.forEach(g => c += g.goods_count)
			// return c
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		checkedCount(state) {
			return state.cart.filter(g => g.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		checkedGoodsTotalPrice(state) {
			return state.cart.filter(g => g.goods_state).reduce((total, item) => total += item.goods_count * item
					.goods_price, 0)
				.toFixed(2)
		}
	},
	action: {}
}
