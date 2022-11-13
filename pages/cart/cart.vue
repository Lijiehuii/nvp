<template>
	<view class="cart-view" v-if="cart.length !== 0">
		<!-- 购物车的地址 -->
		<MyAddress></MyAddress>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 购物车的商品列表 -->

		<uni-swipe-action>
			<block v-for="(goods,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
					<my-goods :showRadio="true" :goods="goods" @radio-change="radioChangeHandle" :showNum="true"
						@num-change="numberChangeHandler">
					</my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算组件 -->
		<my-settle></my-settle>
	</view>
	<view class="empty-cart" v-else>
		<img src="/static/cart-images/empty-cart.png">
		<text class="tip-text">您的购物车空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from "@/mixins/tabbar-badge.js"
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: "删除",
					style: {
						backgroundColor: "#C00000"
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoods']),
			radioChangeHandle(e) {
				console.log("商品的勾选状态发生了改变!");
				this.updateGoodsState(e)
			},
			numberChangeHandler(e) {
				console.log("商品的数值发生了改变!");
				this.updateGoodsCount(e)
			},
			swipeItemClickHandler(goods) {
				console.log("商品被删除了!");
				this.removeGoods(goods.goods_id)
				this.setBadge()
				console.log(this.cart);
			},
		}

	}
</script>

<style lang="scss" scoped>
	.cart-view {
		padding-bottom: 50px;
	}

	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;

		image {
			display: block;
			width: 100%;
		}
	}
</style>
