<template>
	<view class="cate">
		<view class="search">
			<view class="search-bar" @click="goToSearch">
				<my-search :bgcolor="'#fff'"></my-search>
			</view>
		</view>
		<view class="mian">
			<view class="banner">
				<swiper :autoplay="true" circular :interval="3000" :duration="1000" @change="swiperChange">
					<swiper-item v-for="(item,i) in swiperList" :key="i">
						<view class="swiper-item">
							<image :src="item.cover"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="banner-current"><text class="current">{{current}}</text>/{{swiperList.length}}</view>
			</view>
			<!-- <view class="recommended">
				<view class="recommended-list" v-for="r in recommended" :key="r.title">
					<view class="img">
						<image :src="r.icon" mode=""></image>
					</view>
					<view class="recommended-title">{{r.title}}</view>
				</view>
			</view> -->
			<view class="categories">
				<view class="creation">作品</view>
				<view class="categories-item">
					<view class="img" v-for="c in categories" :key="c.id" @click="goToCateList(c)">
						<van-image width="100%" height="100%" use-loading-slot show-loading show-error lazy-load
							radius="10" :src="'https://images.weserv.nl/?url='+c.cover">
							<van-loading slot="loading" type="spinner" size="20" vertical />
						</van-image>
						<view class="categories-title">{{c.category_name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cateData from "../../static/apijs/cateData.js"
	import getTime from "../../utils/index.js"
	export default {
		data() {
			return {
				current: 1,
				discoverData: {},
				swiperList: [],
				recommended: [],
				categories: [],
			};
		},
		onLoad() {
			this.getDiscover()
		},
		methods: {
			swiperChange(e) {
				this.current = e.detail.current + 1
			},
			async getDiscover() {
				this.discoverData = cateData
				this.swiperList = this.discoverData.banners
				this.recommended = this.discoverData.recommended_position
				this.categories = this.discoverData.categories
				console.log("this.discoverData=>", this.discoverData);
				console.log("this.swiperList=>", this.swiperList);
				console.log("this.recommended=>", this.recommended);
				console.log("this.categories=>", this.categories);
			},
			goToSearch() {
				console.log(123);
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			},
			goToCateList(c) {
				console.log(c);
				uni.navigateTo({
					url: "/subpkg/cate_list/cate_list?cate_id=" + c.id + "&cate_title=" + c.category_name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		position: sticky;
		top: 0;
		left: 0;
		border-bottom: 1px solid #eee;
		background-color: #fff;
		z-index: 999;

		.search-bar {

			.ticps {
				margin-left: 20rpx;
				color: #666;
			}
		}
	}


	.mian {
		padding: 20rpx;
		box-sizing: border-box;
	}

	swiper {
		width: 100%;
		height: 350rpx;

		swiper-item {
			height: 350rpx;
		}

		image {
			display: block;
			width: 100%;
			height: 350rpx;
			border-radius: 8px;
		}
	}


	.line {
		position: absolute;
		display: block;
		width: 100vw;
		height: 1px;
		background-color: #000;
	}

	.banner {
		position: relative;
		margin-bottom: 30rpx;

		.banner-current {
			position: absolute;
			right: 10px;
			bottom: 0;
			padding: 10rpx 0;
			font-size: 28rpx;
			color: #fff;

			.current {
				font-weight: bold;
				font-size: 34rpx;
			}
		}
	}

	.recommended {
		display: flex;
		font-size: 12px;

		.recommended-list {
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.img {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 80rpx;
				height: 80rpx;
				border: 1px solid #eee;
				border-radius: 999px;
				box-shadow: 1rpx 5rpx 10rpx 8rpx rgba(225, 225, 225, 1.0);
				margin-bottom: 30rpx;

				image {
					display: block;
					width: 50rpx;
					height: 50rpx;
				}
			}

		}
	}

	.categories {
		margin-top: 30rpx;

		.creation {
			font-size: 16px;
			margin-bottom: 30rpx;
		}

		.categories-item {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.img {
				width: 45vmin;
				height: 35vmin;
				position: relative;
				margin-bottom: 30rpx;

				image {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}

				.categories-title {
					position: absolute;
					top: 20rpx;
					left: 20rpx;
					color: #fff;
				}
			}
		}
	}
</style>
