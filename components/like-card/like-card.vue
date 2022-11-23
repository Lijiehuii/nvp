<template>
	<view class="like-card" @click="goToVideoDetail(likeData.id)">
		<view class="img" v-if="likeData.cover">
			<van-image width="100%" height="100%" use-loading-slot show-loading show-error lazy-load
				:src="'https://images.weserv.nl/?url='+likeData.cover">
				<van-loading slot="loading" type="spinner" size="20" vertical />
			</van-image>
			<view class="duration">{{duration}}</view>
		</view>
		<view class="vider-info">
			<view class="video-title">
				{{likeData.title}}
			</view>
			<view class="video-data">
				<view class="play-count">
					{{"播放量" + view}}
				</view>
				<view class="dot">
					·
				</view>
				<view class="like-count">
					{{"喜欢" + like}}
				</view>
			</view>
			<view class="author">
				<image :src="'https://images.weserv.nl/?url='+likeData.author.avatar"></image>
				{{likeData.author.username}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			likeData: {
				type: Object,
				default: {}
			}
		},
		name: "video-likecard",
		data() {
			return {};
		},
		computed: {
			view() {
				return this.$dataSet(this.likeData.count?.count_view)
			},
			like() {
				return this.$dataSet(this.likeData.count?.count_like)
			},
			duration() {
				return this.$duration(this.likeData.duration)
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

<style lang="scss">
	.like-card {
		display: flex;
		padding: 20rpx 0;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;

		.img {
			flex: 0 0 320rpx;
			width: 320rpx;
			height: 175rpx;
			margin-right: 20rpx;
			box-sizing: border-box;
			position: relative;

			image {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
			}

			.duration {
				position: absolute;
				bottom: 10rpx;
				right: 20rpx;
				font-size: 24rpx;
				color: #fff;
			}
		}

		.vider-info {
			font-size: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.video-title {
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.video-data {
				display: flex;
				color: #999;

				.dot {
					margin: 0 10rpx;
				}
			}

			.author {
				display: flex;
				align-items: center;
				font-weight: 300;

				image {
					display: block;
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
					border-radius: 999px;
				}
			}


		}
	}
</style>
