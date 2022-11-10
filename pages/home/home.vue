<template>
	<view class="home-view">
		<view class="search-box">
			<my-search @mySearch="goToSearch"></my-search>
		</view>
		<!-- 首页轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
			indicator-color="#fff">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 首页导航栏 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClick(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<!-- 首页主要商品列表 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<view class="floor-img-box">
					<navigator class="floor-left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix">
						</image>
					</navigator>
					<view class="floor-right">
						<navigator class="right-img" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !== 0"
							:url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList(),
				this.getNavList(),
				this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/swiperdata")
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.swiperList = res.message
				console.log("this.swiperList=>", this.swiperList);
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/catitems")
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.navList = res.message
				console.log("this.navList=>", this.navList);
			},
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/floordata")
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				res.message.forEach(f => {
					f.product_list.forEach(p => {
						p.url = '/subpkg/goods_list/goods_list?' + p.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
				console.log("this.floorList=>", this.floorList);
			},
			navClick(item) {
				console.log(item);
				if (item.name == "分类") {
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			},
			goToSearch() {
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-view {
		background-color: #fff;
	}

	.search-box {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 999;
	}

	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-item {
			width: 128rpx;
			height: 140rpx;

			image {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
	}

	.floor-item {
		margin-bottom: 20rpx;


		.floor-title {
			width: 100%;
			height: 60rpx;
		}

		.floor-img-box {
			display: flex;
			justify-content: space-around;
			padding-left: 10rpx;

			.floor-right {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
		}

	}
</style>
