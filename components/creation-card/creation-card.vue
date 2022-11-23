<template>
	<view class="creation-card">
		<view class="img" v-if="creationData.resource.cover">
			<van-image width="100%" height="100%" use-loading-slot show-loading show-error lazy-load
				:src="'https://images.weserv.nl/?url='+creationData.resource.cover">
				<van-loading slot="loading" type="spinner" size="20" vertical />
			</van-image>
			<view class="duration">
				{{duration}}
			</view>
		</view>
		<view class="creation-info">
			<view class="creation-msg">
				<view class="creation-title">
					{{creationData.resource.title}}
				</view>
				<view class="push-time">
					{{publishTime}}
				</view>
			</view>
			<view class="creation-data">
				<view class="like-count">
					{{"喜欢 " + like}}
				</view>
				<view class="dot">
					·
				</view>
				<view class="play-count">
					{{"播放量 " + view}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import getTime from "../../utils/index.js"
	export default {
		props: {
			creationData: {
				type: Object,
				default: {}
			}
		},
		name: "creation-card",
		data() {
			return {

			};
		},
		computed: {
			duration() {
				return this.$duration(this.creationData?.resource?.duration)
			},
			publishTime() {
				return this.$getTime(parseInt(this.creationData?.resource?.publish_time + "000"))
			},
			like() {
				return this.$dataSet(this.creationData?.resource?.count?.count_like)
			},
			view() {
				return this.$dataSet(this.creationData?.resource?.count?.count_view)
			}
		},
		methods: {
			data(count) {
				if (count > 1000 && count < 10000) {
					let newCount = Math.ceil(count / 100) / 10
					if (newCount % parseInt(newCount) === 0) {
						return newCount + ".0k"
					} else {
						return newCount + "k"
					}
				} else if (count > 10000) {
					let newCount = Math.ceil(count / 1000) / 10
					if (newCount % parseInt(newCount) === 0) {
						return newCount + ".0w"
					} else {
						return newCount + "w"
					}
				}
				return count
			},
		}
	}
</script>

<style lang="scss">
	.creation-card {
		padding: 20rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #999;
		display: flex;

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

		.creation-info {
			// height: 100%;
			font-size: 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.creation-title {
				font-size: 28rpx;
				font-weight: bold;
			}

			.push-time {
				color: #999;
				margin-top: 10rpx;
			}

			.creation-data {
				display: flex;
				font-weight: 400;
				color: #666;

				.dot {
					margin: 0 10rpx;
				}
			}
		}
	}
</style>
