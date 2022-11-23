<template>
	<view class="search-card" @click="goToVideoDetail(CardData.id)">
		<view class="img">
			<van-image width="100%" height="100%" use-loading-slot radius="10" show-loading show-error lazy-load
				:src="'https://images.weserv.nl/?url='+CardData.cover">
				<van-loading slot="loading" type="spinner" size="20" vertical />
			</van-image>
			<view class="duration">{{duration}}</view>
		</view>
		<view class="card-info">
			<view class="title">{{CardData.title}}</view>
			<view class="data">
				<view class="played-count">
					{{"播放量 " + view}}
				</view>
				<text class="dot">·</text>
				<view class="played-count">
					{{"喜欢 " + like}}
				</view>
			</view>
			<view class="author">
				<image class="avator" :src="'https://images.weserv.nl/?url='+CardData.author.userinfo.avatar"></image>
				<text class="username">{{CardData.author.userinfo.username}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			CardData: {
				type: Object,
				default: {}
			}
		},
		name: "search-card",
		data() {
			return {

			};
		},
		computed: {
			view() {
				return this.$dataSet(this.CardData.count?.count_view)
			},
			like() {
				return this.$dataSet(this.CardData.count?.count_like)
			},
			duration() {
				return this.$duration(this.CardData.duration)
			}
		},
		methods: {
			goToVideoDetail(id) {
				console.log(id);
				uni.navigateTo({
					url: "/subpkg/video_detail/video_detail?video_id=" + id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-card {
		padding: 20rpx 10rpx;
		display: flex;
		border-bottom: 1px solid #eee;

		.img {
			flex: 0 0 40vw;
			margin: 20rpx;
			width: 40vw;
			height: 25vw;
			position: relative;

			image {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 15rpx;
			}

			.duration {
				position: absolute;
				bottom: 10rpx;
				right: 10rpx;
				color: #fff;
				font-size: 26rpx;
			}
		}

		.card-info {
			padding: 20rpx 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.title {
				font-size: 28rpx;
				color: #000;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.data {
				display: flex;
				font-size: 24rpx;
				color: #aaa;

				.dot {
					margin: 0 10rpx;
				}
			}

			.author {
				display: flex;
				font-size: 24rpx;
				align-items: center;
				color: #666;

				.avator {
					display: block;
					width: 40rpx;
					height: 40rpx;
					border-radius: 999px;
					margin-right: 10rpx;
				}
			}


		}


	}
</style>
