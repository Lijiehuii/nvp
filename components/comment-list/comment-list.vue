<template>
	<view class="comment-list">
		<view class="img" v-if="commentData.userInfo.avatar">
			<van-image width="100%" height="100%" round use-loading-slot show-loading show-error lazy-load
				:src="'https://images.weserv.nl/?url='+commentData.userInfo.avatar">
				<van-loading slot="loading" type="spinner" size="50" vertical />
			</van-image>
			<!-- <image :src="'https://images.weserv.nl/?url='+commentData.userInfo.avatar"></image> -->
		</view>
		<view class="user-info">
			<view class="top">
				{{commentData.userInfo.username}}
			</view>
			<view class="comment-content">
				{{commentData.content}}
			</view>
			<view class="bottom">
				<view class="left">
					<view class="add-time">
						{{addTime}}
					</view>
					<view class="dot" v-if="commentData.ip_location">
						·
					</view>
					<view class="">
						{{commentData.ip_location}}
					</view>
				</view>
				<!-- <view class="like">
					<uni-icons type="hand-up-filled" color="rgb(218, 84, 70)" size="25" v-if="videoData.like">
					</uni-icons>
					<uni-icons type="hand-up" size="25" v-else="!videoData.like"></uni-icons>
					<view class="num">{{like}}</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			commentData: {
				type: Object,
				default: {}
			}
		},
		name: "comment-list",
		data() {
			return {

			};
		},
		onLoad() {},
		computed: {
			addTime() {
				return this.$getTime(parseInt(this.commentData.addtime + "000"))
			},
		},
		methods: {


		},
	}
</script>

<style lang="scss">
	.comment-list {
		padding: 10rpx;
		box-sizing: border-box;
		display: flex;
		border-bottom: 1px solid #eee;

		.img {
			flex: 0 0 60rpx;
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;

			image {
				display: block;
				flex: 0 0 60rpx;
				width: 100%;
				height: 100%;
				border-radius: 999px;
			}
		}

		.user-info {
			width: 100%;

			.top {
				font-size: 26rpx;
				color: #666;
			}

			.comment-content {
				font-size: 30rpx;
				word-wrap: break-word;
				word-break: break-all;
				color: #000;
				padding: 10rpx 0;
			}

			.bottom {
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 20rpx;
					display: flex;

					.dot {
						margin: 0 10rpx;
					}
				}

				.like {
					display: flex;
					align-items: center;

					.num {
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>
