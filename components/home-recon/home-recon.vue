<template>
	<view class="recommend">
		<!-- <scroll-view class="recommend-scroll" scroll-y="true" :style="{height: wh+'px'}"> -->
		<view class="banner">
			<swiper :autoplay="true" :interval="3000" :duration="1000" circular @change="swiperChange">
				<swiper-item v-for="(item,i) in swiperList" :key="i">
					<view class="swiper-item">
						<image referrerPolicy="no-referrer" :src="item.model.cover" mode="widthFix"></image>
					</view>
					<text v-if="item.model.title">{{item.model.title}}</text>
				</swiper-item>
			</swiper>
			<view class="banner-current"><text class="current">{{current}}</text>/{{swiperList.length}}</view>
		</view>
		<view class="main">
			<middle-card v-for="(card,i) in recomCard" :key="i" :cardData="card"
			 @show-share="showShare"></middle-card>
		</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	export default {
		props: {
			recommendData: {
				type: Array,
				default: []
			},
			swiperList: {
				type: Array,
				default: []
			},
			recomCard: {
				type: Array,
				default: []
			}
		},
		name: "mian-recon",
		data() {
			return {
				current: 1,
				wh: 0,
			};
		},
		onLoad() {
		},
		methods: {
			swiperChange(e) {
				this.current = e.detail.current + 1
			},
			showShare(data) {
				this.$emit("show-share", {
					data,
					type: "recommend"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend {
		padding: 20rpx;
		box-sizing: border-box;
		height: calc(100vh - 44px);
		overflow: auto;

		.recommend-scroll {
			width: 100%;
			margin-top: 20rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
		}
	}

	swiper {
		width: 100%;
		height: 400rpx;
		border-radius: 10rpx;

		swiper-item {
			position: relative;
			border-radius: 10rpx;

			image {
				display: block;
				width: 100%;
				height: 400rpx;
				border-radius: 10rpx;
			}

			text {
				position: absolute;
				color: #fff;
				bottom: 5rpx;
				left: 0;
				right: 0;
				padding: 20rpx;
				background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
			}
		}


	}

	.banner {
		position: relative;

		.banner-current {
			position: absolute;
			right: 10px;
			bottom: 15rpx;
			padding: 10rpx 0;
			font-size: 28rpx;
			color: #fff;

			.current {
				font-weight: bold;
				font-size: 34rpx;
			}
		}
	}

	.main {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 20rpx;
	}
</style>
