<template>
	<view class="">
		<view class="goods-item">
			<view class="goods-item-left">
				<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
			</view>
			<view class="goods-item-right">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info-box">
					<view class="goods-price">￥{{goods.goods_price + ".00"}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},

	}
</script>
<style lang="scss" scoped>
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			.goods-pic {
				display: block;
				width: 100px;
				height: 100px;
				margin-right: 10px;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				.goods-price {
					color: #C00000;
					font-size: 16px;
				}
			}
		}
	}
</style>
