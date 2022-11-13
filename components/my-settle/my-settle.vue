<template>
	<view class="my-settle">
		<label class="all-select-radio" @click="changeAllState">
			<radio color="#C00000" :checked="isAllSelect" /><text>全选</text>
		</label>
		<view class="total-box">
			合计: <text class="total-price">￥{{checkedGoodsTotalPrice}}</text>
		</view>
		<view class="settle-btn" @click="settleBtn">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from "vuex"
	export default {
		name: "my-settle",
		data() {
			return {
				// 3秒后跳转至登录页面
				seconds: 3,
				timer: null
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['updateRedirectInfo']),
			changeAllState() {
				console.log(this.isAllSelect);
				this.updateAllGoodsState(!this.isAllSelect)
			},
			settleBtn() {
				if (!this.checkedCount) {
					return uni.$showMsg('请选择需要结算的商品!')
				} else if (!this.addStr) {
					return uni.$showMsg('请选择收货地址!')
				} else if (!this.token) {
					return this.delayNavigate()
				}
				console.log(this.cart);
				console.log("结算");
				this.payOrder()
			},
			// 结算创建订单
			async payOrder() {
				// 创建订单
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.addStr,
					goods: this.cart.filter(g => g.goods_state).map(g => ({
						goods_id: g.goods_id,
						goods_number: g.goods_count,
						goods_price: g.goods_price
					}))
				}
				console.log(orderInfo);
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				console.log("payOrder res=>", res);
				if (res.meta.status !== 200) {
					return uni.$showMsg("创建订单失败!")
				}

				const orderNumber = res.message.order_number
				console.log(orderNumber);
				// 订单预支付
				const {
					data: res2
				} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
					order_number: orderNumber
				})
				console.log("payOrder res2=>", res2);
				if (res2.meta.status !== 200) {
					return uni.$showMsg("预付订单生成失败!")
				}

				const payInfo = res2.message.pay
				console.log("payInfo=>", payInfo);

				// 发起微信支付功能
				const [err, succ] = await uni.requestPayment(payInfo)
				if (err) {
					console.log(111);
					return uni.$showMsg("订单未支付!")
				}
				const {
					data: res3
				} = await uni.$http.post("/api/public/v1/my/orders/chkOrder", {
					order_number: orderNumber
				})
				if (res3.meta.status !== 200) {
					console.log(222);
					return uni.$showMsg("订单未支付!")
				}
				uni.showToast({
					title: "订单支付成功!",
					icon: "success"
				})
			},
			delayNavigate() {
				this.showTicps(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: "/pages/mine/mine",
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return this.seconds = 3
					}
					this.showTicps(this.seconds)
				}, 1000)
			},
			showTicps(n) {
				uni.showToast({
					icon: "none",
					title: "请登录后再结算" + n + "秒之后自动跳转至登录页面",
					mask: true,
					duration: 1500
				})
			}
		},
		computed: {
			...mapState("m_user", ["token"]),
			...mapState("m_cart", ["cart"]),
			...mapGetters("m_cart", ["checkedCount", "total", "checkedGoodsTotalPrice"]),
			...mapGetters("m_user", ["addStr"]),
			isAllSelect() {
				return this.checkedCount === this.total
			}
		}
	}
</script>

<style lang="scss">
	.my-settle {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #efefef;
		font-size: 14px;
		z-index: 800;
		padding-left: 5px;

		.all-select-radio {
			display: flex;
			align-items: center;
		}

		.total-box {
			.total-price {
				color: #C00000;
				font-weight: bold;
			}
		}

		.settle-btn {
			background-color: #e43518;
			height: 50px;
			color: #fff;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
			text-align: center;
		}
	}
</style>
