import {
	mapState,
	mapGetters
} from "vuex"
export default {
	computed: {
		...mapState('m_cart', ['cart']),
		...mapGetters('m_cart', ['total'])
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		// 设置底部导航栏购物车的徽标
		setBadge() {
			if (this.total > 0) {
				uni.setTabBarBadge({
					index: 2,
					text: this.total + ''
				})
			}
		}
	},
	watch: {
		total: {
			handler(newVal) {
				if (newVal === 0) {
					return uni.removeTabBarBadge({
						index: 2,
						text: ''
					})
				}
				this.setBadge()
			},
			immediate: true
		}
	}
}
