<template>
	<view class="my-settle">
		<label class="all-select-radio" @click="changeAllState">
			<radio color="#C00000" :checked="isAllSelect" /><text>全选</text>
		</label>
		<view class="total-box">
			合计: <text class="total-price">￥{{checkedGoodsTotalPrice}}</text>
		</view>
		<view class="settle-btn">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from "vuex"
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeAllState() {
				console.log(this.isAllSelect);
				this.updateAllGoodsState(!this.isAllSelect)
			}
		},
		computed: {
			...mapGetters("m_cart", ["checkedCount", "total", "checkedGoodsTotalPrice"]),
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
