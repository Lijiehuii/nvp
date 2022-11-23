<template>
	<view class="card" @click="goToVideoDetail(cardData.id)">
		<view class="card-img">
			<van-image width="100%" height="100%" use-loading-slot show-loading show-error lazy-load
				:src="'https://images.weserv.nl/?url='+cardData.cover">
				<van-loading slot="loading" type="spinner" size="20" vertical />
			</van-image>
			<!-- <image :src="'https://images.weserv.nl/?url='+cardData.cover"></image> -->
			<view class="img-bottom">
				<view class="date">
					<view class="views">
						<uni-icons type="eye" size="12" color="#fff"></uni-icons>
						<text class="num">{{view}}</text>
					</view>
					<view class="like">
						<uni-icons type="hand-up" size="12" color="#fff"></uni-icons>
						<text class="num">{{like}}</text>
					</view>
				</view>
				<view class="duration">{{duration}}</view>
			</view>
		</view>
		<view class="card-info">
			<view class="card-title">{{cardData.title}}</view>
			<view class="card-author">
				<view class="username">
					{{cardData.author.userinfo.username}}
				</view>
				<view class="more" @click.stop="showShare(cardData)">
					<uni-icons type="more-filled" color="#ddd" size="18"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			cardData: {
				type: Object,
				default: {}
			}
		},
		name: "recom-card",
		data() {
			return {

			};
		},
		computed: {
			view() {
				return this.$dataSet(this.cardData.count?.count_view)
			},
			like() {
				return this.$dataSet(this.cardData.count?.count_like)
			},
			duration() {
				return this.$duration(this.cardData.duration)
			}
		},
		methods: {
			goToVideoDetail(id) {
				console.log(id);
				uni.navigateTo({
					url: "/subpkg/video_detail/video_detail?video_id=" + id
				})
			},
			showShare(data) {
				this.$emit("show-share", data)
			}
		}
	}
</script>

<style lang="scss">
	.card {
		width: 46vmin;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 20rpx;

		.card-img {
			width: 100%;
			height: 25vmin;
			position: relative;

			image {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}

			.img-bottom {
				background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .2));
				padding: 10rpx 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				color: #fff;
				font-size: 24rpx;


				.date {
					display: flex;
					align-items: center;
					text-align: left;

					.views {
						margin-right: 10rpx;
					}

					.num {
						margin-left: 10rpx;
					}
				}
			}
		}

		.card-info {
			padding: 20rpx;
			font-size: 28rpx;

			.card-title {
				height: 40px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.card-author {
				font-size: 26rpx;
				color: #999;
				margin-top: 15rpx;
				display: flex;
				justify-content: space-between;

				.username {
					max-width: 30vmin;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.more {
					display: flex;
					flex: 0 0 18px;
					transform: rotateZ(90deg);
				}
			}
		}
	}
</style>
